import { search_by_payload, create, get } from '$lib/db';
import { get_bank_code, paystack_resolve_bank, paystack_create_recipient, paystack_transfer, paystack_balance } from '$lib/paystack';
import { send_partner_notification } from '$lib/email';
import { COMMISSION_PCT, MIN_TRANSFER_AMNT } from '$lib/constants';
import { dev } from '$app/environment';
import type { User } from '$lib/types';
import type { Registration } from '$lib/types/registration';
import type { Payout } from '$lib/types/payout';

const MAX_ATTEMPTS = 5;

/**
 * Commission paid to an affiliate for a registration. In dev we always pay the
 * minimum Paystack transfer amount (a tiny dev reg fee would otherwise compute
 * a commission below Paystack's transfer floor). In production we pay a
 * percentage of the registration amount.
 */
export function payout_amount(total_kobo: number, is_dev: boolean): number {
  return is_dev ? MIN_TRANSFER_AMNT : Math.round(total_kobo * COMMISSION_PCT / 100);
}

export async function process_partner_payout(
  reg_data: Registration,
  reg_id: string,
  platform?: App.Platform
): Promise<void> {
  const ac = reg_data.ac as string | undefined;
  if (!ac) return;

  // Find partner by code
  const affs = await search_by_payload<User>({ s: 'u', ac });
  const partner = affs.find(u => u.c?.includes('fab')) as (User & { i: string }) | undefined;
  if (!partner) {
    console.log(`[payout] No partner found for code ${ac} (reg ${reg_id})`);
    return;
  }

  const partner_id = partner.i;
  if (!partner_id) {
    console.log(`[payout] Partner for ${ac} has no ID`);
    return;
  }

  // Deterministic payout record id so concurrent verify-payment + webhook paths
  // collapse to a single record and a repeat call is a no-op.
  const pid = `po_${reg_id}`;

  // Self-referral guard: an partner must not earn commission on their own signup.
  if (reg_data.e && partner.e && reg_data.e.toLowerCase() === partner.e.toLowerCase()) {
    console.log(`[payout] Self-referral blocked for ${ac} (reg ${reg_id})`);
    await store_payout(reg_id, partner_id, ac, 0, 'blocked_self', undefined, undefined, 'self-referral', 1, pid);
    return;
  }

  // Check bank details. Persist a retryable record instead of silently
  // dropping the commission — once the partner adds bank details the cron
  // retry (retry_failed_payouts) will pick it up.
  if (!partner.ba || !partner.bn) {
    console.log(`[payout] Partner ${partner_id} (${ac}) has no bank details configured — recording retryable failure`);
    await store_failed_payout(reg_id, partner_id, ac, 'Missing bank details (ba/bn)', 1, pid);
    return;
  }

  // Idempotency: skip if a record already exists for this registration.
  const existing = await get<Payout>(pid);
  if (existing) {
    console.log(`[payout] Already processed for reg ${reg_id} (${existing.st}), skipping`);
    return;
  }

  await run_payout(reg_data, reg_id, partner, partner_id, ac, pid, platform, 1);
}

/**
 * Re-runs payouts that previously failed (bank resolve / recipient / transfer
 * errors), plus reconciles any left stuck in `processing`. Reuses the same
 * deterministic transfer reference `po-<reg_id>` so Paystack deduplicates and
 * we never double-credit. Driven by the Cron Trigger -> /api/cron/retry-payouts.
 */
export async function retry_failed_payouts(
  platform?: App.Platform
): Promise<{ scanned: number; retried: number; succeeded: number; failed: number }> {
  // Retry both terminal `failed` and any left stuck in `processing` (e.g. a
  // transfer call that succeeded but whose webhook never arrived).
  const failed = await search_by_payload<Payout>({ s: 'po', st: 'failed' }, undefined, 200);
  const processing = await search_by_payload<Payout>({ s: 'po', st: 'processing' }, undefined, 200);
  const stuck = [...failed, ...processing];
  let retried = 0, succeeded = 0, failed = 0;
  for (const p of stuck) {
    const at = (p.at ?? 0) + 1;
    if (at > MAX_ATTEMPTS) {
      console.error(`[payout] Giving up on reg ${p.reg_id} after ${at} attempts`);
      failed++;
      continue;
    }
    const reg = await get<Registration>(p.reg_id);
    if (!reg) { console.error(`[payout] Retry: no registration ${p.reg_id}`); failed++; continue; }
    const affs = await search_by_payload<User>({ s: 'u', i: p.partner_id });
    const partner = affs[0] as (User & { i: string }) | undefined;
    if (!partner) { console.error(`[payout] Retry: no partner ${p.partner_id}`); failed++; continue; }

    // Gate on balance so we don't waste an attempt when funds are low.
    const bal = await paystack_balance();
    if (bal > 0 && bal < p.amt + 10000) {
      console.log(`[payout] Retry deferred for reg ${p.reg_id}: low balance ${bal}`);
      continue;
    }

    retried++;
    const before = p.st;
    await run_payout(reg, p.reg_id, partner, p.partner_id, p.ac, `po_${p.reg_id}`, platform, at);
    const updated = await get<Payout>(`po_${p.reg_id}`);
    if (updated?.st === 'success') succeeded++;
    else if (updated?.st === 'failed' && before !== 'failed') failed++;
  }
  return { scanned: stuck.length, retried, succeeded, failed };
}

/**
 * Core payout execution: resolve account -> create recipient -> transfer.
 * Marks the record `processing` then a final terminal status. Reuses `ref`
 * `po-<reg_id>` so retries/idempotent calls never create a second disbursement.
 */
async function run_payout(
  reg: Registration,
  reg_id: string,
  partner: User & { i: string },
  partner_id: string,
  ac: string,
  pid: string,
  platform: App.Platform | undefined,
  at: number
): Promise<void> {
  // Mark in-progress (overwrites any prior failed/processing state for this pid).
  await store_payout(reg_id, partner_id, ac, 0, 'processing', `po-${reg_id}`, undefined, undefined, at, pid);

  const bank_code = partner.bk || get_bank_code(partner.bn || '');
  if (!bank_code) {
    console.log(`[payout] Unknown bank: ${partner.bn} (code: ${partner.bk}) for partner ${partner_id}`);
    await store_failed_payout(reg_id, partner_id, ac, `Unknown bank: ${partner.bn}`, at, pid);
    return;
  }

  let account_name: string;
  try {
    const resolved = await paystack_resolve_bank(partner.ba as string, bank_code);
    account_name = resolved.account_name;
  } catch (e) {
    console.error(`[payout] Bank resolve failed for ${partner_id}:`, e);
    await store_failed_payout(reg_id, partner_id, ac, `Bank resolve failed: ${(e as Error).message}`, at, pid);
    return;
  }

  const total_kobo = reg.amt as number;
  if (!total_kobo || Number.isNaN(total_kobo)) {
    console.error(`[payout] Missing/invalid registration amount for ${reg_id} — cannot compute commission`);
    await store_failed_payout(reg_id, partner_id, ac, 'Missing registration amount', at, pid);
    return;
  }
  const amt_kobo = payout_amount(total_kobo, dev);

  let recipient: { recipient_code: string; active: boolean };
  try {
    recipient = await paystack_create_recipient(account_name, partner.ba as string, bank_code);
  } catch (e) {
    console.error(`[payout] Create recipient failed for ${partner_id}:`, e);
    await store_failed_payout(reg_id, partner_id, ac, `Recipient failed: ${(e as Error).message}`, at, pid);
    return;
  }

  let transfer: { transfer_code: string; status: string };
  try {
    transfer = await paystack_transfer(recipient.recipient_code, amt_kobo, `Commission: ${reg_id}`, `po-${reg_id}`);
  } catch (e) {
    console.error(`[payout] Transfer failed for ${partner_id}:`, e);
    await store_payout(reg_id, partner_id, ac, amt_kobo, 'failed', `po-${reg_id}`, undefined, (e as Error).message, at, pid);
    return;
  }

  await store_payout(reg_id, partner_id, ac, amt_kobo, transfer.status === 'success' ? 'success' : 'pending', `po-${reg_id}`, transfer.transfer_code, undefined, at, pid);

  try {
    const player_name = `${reg.fn || ''} ${reg.ln || ''}`.trim() || 'A player';
    await send_partner_notification(platform, partner.e, partner.n || 'Partner', amt_kobo, total_kobo, player_name);
  } catch (e) {
    console.error(`[payout] Email notification failed for ${partner_id}:`, e);
  }
}

/**
 * Reconcile a payout's terminal status from a Paystack transfer webhook
 * (transfer.success / transfer.failed / transfer.reversed).
 */
export async function reconcile_transfer_payout(ref: string, st: Payout['st']): Promise<void> {
  // The transfer reference is `po-<reg_id>`; resolve the exact payout record
  // by registration id rather than relying on list[0] (which is unsafe if
  // multiple payouts ever shared a reference).
  const reg_id = ref.startsWith('po-') ? ref.slice(3) : ref;
  const existing = await get<Payout>(`po_${reg_id}`);
  if (existing) {
    await create({ ...existing, st }, undefined, `po_${reg_id}`);
    return;
  }
  const list = await search_by_payload<Payout>({ s: 'po', ref });
  const p = list[0];
  if (!p) {
    console.log(`[payout] Reconcile: no payout for transfer ref ${ref}`);
    return;
  }
  await create({ ...p, st }, undefined, `po_${p.reg_id}`);
}

async function store_failed_payout(reg_id: string, partner_id: string, ac: string, err: string, at: number, pid: string): Promise<void> {
  await store_payout(reg_id, partner_id, ac, 0, 'failed', `po-${reg_id}`, undefined, err, at, pid);
}

async function store_payout(
  reg_id: string,
  partner_id: string,
  ac: string,
  amt: number,
  st: Payout['st'],
  ref?: string,
  tr?: string,
  err?: string,
  at?: number,
  pid?: string
): Promise<void> {
  const p: Payout = { s: 'po', reg_id, partner_id, ac, amt, st, d: Date.now() };
  if (ref) p.ref = ref;
  if (tr) p.tr = tr;
  if (err) p.err = err;
  if (at !== undefined) p.at = at;
  try {
    await create(p, undefined, pid);
  } catch (e) {
    console.error('[payout] Failed to store payout record:', e);
  }
}
