import { search_by_payload, create, get } from '$lib/db';
import { get_bank_code, paystack_resolve_bank, paystack_create_recipient, paystack_transfer, paystack_balance } from '$lib/paystack';
import { send_partner_notification } from '$lib/email';
import { COMMISSION_PCT, MIN_TRANSFER_AMNT } from '$lib/constants';
import { dev } from '$app/environment';
import type { User } from '$lib/types';
import type { Registration } from '$lib/types/registration';
import type { Payout } from '$lib/types/payout';

export { gen_partner_code } from '$lib/partner_code';

const MAX_ATTEMPTS = 5;

/**
 * Commission paid to an affiliate for a registration. In dev we always pay the
 * minimum Paystack transfer amount (a tiny dev reg fee would otherwise compute
 * a commission below Paystack's transfer floor). In production we pay a
 * percentage of the registration amount.
 */
export function payout_amount(total_kobo: number, is_dev: boolean): number {
  // TEMP: prod payout flattened to N54 for testing while reg fee is N90. Revert to
  // percentage below once REG_AMOUNT is back to 15000.
  if (is_dev) return MIN_TRANSFER_AMNT;
  // return Math.round(total_kobo * COMMISSION_PCT / 100);
  return 5400;
}

export async function process_partner_payout(
  reg_data: Registration,
  reg_id: string,
  platform?: App.Platform
): Promise<void> {
  console.log(`[payout] ═══ process_partner_payout START ═══ reg_id=${reg_id}`);
  try {
    console.log(`[payout] reg summary:`, {
      reg_id,
      email: reg_data.e,
      name: `${reg_data.fn || ''} ${reg_data.ln || ''}`.trim(),
      amt_kobo: reg_data.amt,
      status: reg_data.st,
      partner_code: reg_data.ac || null,
      is_dev: dev
    });
    const ac = reg_data.ac as string | undefined;
    if (!ac) {
      console.log(`[payout] No partner code on reg ${reg_id} — nothing to pay out. STOP.`);
      return;
    }

    // Find partner by code
    console.log(`[payout] Looking up partner user by code ac=${ac} (s:'u')...`);
    let affs: User[] = [];
    try {
      affs = await search_by_payload<User>({ s: 'u', ac });
    } catch (e) {
      console.error(`[payout] DB ERROR looking up partner by code ac=${ac} (reg ${reg_id}):`, e);
      return;
    }
    console.log(`[payout] Found ${affs.length} user(s) with ac=${ac}; filtering for 'fab' classification`);
    const partner = affs.find(u => u.c?.includes('fab')) as (User & { i: string }) | undefined;
    if (!partner) {
      console.log(`[payout] No partner found for code ${ac} (reg ${reg_id}) — STOP.`);
      return;
    }

    const partner_id = partner.i;
    if (!partner_id) {
      console.log(`[payout] Partner for ${ac} has no ID — STOP.`);
      return;
    }
    console.log(`[payout] Partner resolved:`, {
      partner_id,
      email: partner.e,
      name: partner.n || '(none)',
      has_bank_account: !!partner.ba,
      bank_name: partner.bn || '(none)',
      bank_code: partner.bk || '(none)'
    });

    // Deterministic payout record id so concurrent verify-payment + webhook paths
    // collapse to a single record and a repeat call is a no-op.
    const pid = `po_${reg_id}`;
    console.log(`[payout] Deterministic payout record id: ${pid} (transfer ref will be po-${reg_id})`);

    // Self-referral guard: a partner must not earn commission on their own signup.
    if (reg_data.e && partner.e && reg_data.e.toLowerCase() === partner.e.toLowerCase()) {
      console.log(`[payout] Self-referral DETECTED (reg email == partner email) for ${ac} (reg ${reg_id}) — blocking commission.`);
      await store_payout(reg_id, partner_id, ac, 0, 'b', undefined, undefined, 'self-referral', 1, pid);
      console.log(`[payout] Stored 'blocked_self' record ${pid}. STOP.`);
      return;
    }
    console.log(`[payout] Self-referral check passed (reg=${reg_data.e} != partner=${partner.e}).`);

    // Check bank details. Persist a retryable record instead of silently
    // dropping the commission — once the partner adds bank details the cron
    // retry (retry_failed_payouts) will pick it up.
    if (!partner.ba || !partner.bn) {
      console.log(`[payout] Partner ${partner_id} (${ac}) has no bank details (ba=${!!partner.ba}, bn=${!!partner.bn}) — recording retryable failure and STOP.`);
      await store_failed_payout(reg_id, partner_id, ac, 'Missing bank details (ba/bn)', 1, pid);
      return;
    }
    console.log(`[payout] Bank details present. Proceeding to idempotency check.`);

    // Idempotency: skip if a record already exists for this registration.
    let existing: Payout | null = null;
    try {
      existing = await get<Payout>(pid);
    } catch (e) {
      console.error(`[payout] DB ERROR checking existing payout record ${pid} (reg ${reg_id}):`, e);
      return;
    }
    if (existing) {
      console.log(`[payout] Idempotency HIT: record ${pid} already exists (st=${existing.st}) — skipping. STOP.`);
      return;
    }
    console.log(`[payout] Idempotency check passed (no existing record ${pid}). Invoking run_payout attempt=1.`);

    await run_payout(reg_data, reg_id, partner, partner_id, ac, pid, platform, 1);
    console.log(`[payout] ═══ process_partner_payout END ═══ reg_id=${reg_id}`);
  } catch (e) {
    console.error(`[payout] UNCAUGHT ERROR in process_partner_payout for reg ${reg_id}:`, e);
  }
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
  console.log(`[payout] ═══ retry_failed_payouts START ═══`);
  let failedRows: Payout[] = [];
  let processingRows: Payout[] = [];
  try {
    failedRows = await search_by_payload<Payout>({ s: 'po', st: 'f' }, undefined, 200);
  } catch (e) {
    console.error(`[payout] Retry: DB ERROR scanning failed payouts:`, e);
  }
  try {
    processingRows = await search_by_payload<Payout>({ s: 'po', st: 'p' }, undefined, 200);
  } catch (e) {
    console.error(`[payout] Retry: DB ERROR scanning processing payouts:`, e);
  }
  const stuck = [...failedRows, ...processingRows];
  console.log(`[payout] Scan: ${failedRows.length} failed + ${processingRows.length} processing = ${stuck.length} candidate(s) to retry`);
  let retried = 0, succeeded = 0, failed = 0;
  for (const p of stuck) {
    const at = (p.at ?? 0) + 1;
    console.log(`[payout] ── candidate reg=${p.reg_id} partner=${p.partner_id} ac=${p.ac} prev_st=${p.st} prev_attempts=${p.at ?? 0} -> this attempt=${at}`);
    if (at > MAX_ATTEMPTS) {
      console.error(`[payout] Giving up on reg ${p.reg_id} after ${at} attempts (MAX_ATTEMPTS=${MAX_ATTEMPTS})`);
      failed++;
      continue;
    }
    let reg: Registration | null = null;
    try {
      reg = await get<Registration>(p.reg_id);
    } catch (e) {
      console.error(`[payout] Retry: DB ERROR loading registration ${p.reg_id}:`, e);
    }
    if (!reg) { console.error(`[payout] Retry: no registration ${p.reg_id} — skipping`); failed++; continue; }
    console.log(`[payout] Retry: loaded registration ${p.reg_id} (amt=${reg.amt} email=${reg.e})`);
    let affs: User[] = [];
    try {
      affs = await search_by_payload<User>({ s: 'u', i: p.partner_id });
    } catch (e) {
      console.error(`[payout] Retry: DB ERROR loading partner ${p.partner_id}:`, e);
    }
    const partner = affs[0] as (User & { i: string }) | undefined;
    if (!partner) { console.error(`[payout] Retry: no partner ${p.partner_id} — skipping`); failed++; continue; }
    console.log(`[payout] Retry: loaded partner ${p.partner_id} (${partner.e})`);

    // Gate on balance so we don't waste an attempt when funds are low.
    let bal = 0;
    try {
      bal = await paystack_balance();
    } catch (e) {
      console.error(`[payout] Retry: Paystack balance check FAILED for reg ${p.reg_id}:`, e);
    }
    console.log(`[payout] Retry: Paystack balance=${bal} kobo, needed=${p.amt + 10000} kobo (payout ${p.amt} + 10000 buffer)`);
    if (bal > 0 && bal < p.amt + 10000) {
      console.log(`[payout] Retry DEFERRED for reg ${p.reg_id}: balance ${bal} below threshold — not consuming an attempt`);
      continue;
    }

    retried++;
    const before = p.st;
    console.log(`[payout] Retry: invoking run_payout for reg ${p.reg_id} attempt=${at}`);
    try {
      await run_payout(reg, p.reg_id, partner, p.partner_id, p.ac, `po_${p.reg_id}`, platform, at);
    } catch (e) {
      console.error(`[payout] Retry: run_payout THREW for reg ${p.reg_id} attempt=${at}:`, e);
    }
    let updated: Payout | null = null;
    try {
      updated = await get<Payout>(`po_${p.reg_id}`);
    } catch (e) {
      console.error(`[payout] Retry: DB ERROR reading result for reg ${p.reg_id}:`, e);
    }
    console.log(`[payout] Retry: reg ${p.reg_id} status ${before} -> ${updated?.st ?? 'unknown'}`);
    if (updated?.st === 's') succeeded++;
    else if (updated?.st === 'f' && before !== 'f') failed++;
  }
  const summary = { scanned: stuck.length, retried, succeeded, failed };
  console.log(`[payout] ═══ retry_failed_payouts END ═══`, summary);
  return summary;
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
  console.log(`[payout] ── run_payout START ── reg=${reg_id} partner=${partner_id} ac=${ac} attempt=${at} pid=${pid}`);
  // Mark in-progress (overwrites any prior failed/processing state for this pid).
  console.log(`[payout] Step 1/6: marking record ${pid} as 'p' (ref=po-${reg_id})`);
  await store_payout(reg_id, partner_id, ac, 0, 'p', `po-${reg_id}`, undefined, undefined, at, pid);

  console.log(`[payout] Step 2/6: resolving bank code — partner.bk=${partner.bk || '(none)'} partner.bn=${partner.bn || '(none)'}`);
  const bank_code = partner.bk || get_bank_code(partner.bn || '');
  if (!bank_code) {
    console.log(`[payout] Unknown bank: ${partner.bn} (code: ${partner.bk}) for partner ${partner_id} — FAIL`);
    await store_failed_payout(reg_id, partner_id, ac, `Unknown bank: ${partner.bn}`, at, pid);
    return;
  }
  console.log(`[payout] Bank code resolved to ${bank_code}`);

  let account_name: string;
  try {
    console.log(`[payout] Step 3/6: resolving bank account (ba=${partner.ba ? String(partner.ba).slice(0, 4) + '...' : 'EMPTY'} code=${bank_code}) via Paystack`);
    const resolved = await paystack_resolve_bank(partner.ba as string, bank_code);
    account_name = resolved.account_name;
    console.log(`[payout] Account resolved: account_name="${account_name}"`);
  } catch (e) {
    console.error(`[payout] Bank resolve FAILED for ${partner_id}:`, e);
    await store_failed_payout(reg_id, partner_id, ac, `Bank resolve failed: ${(e as Error).message}`, at, pid);
    return;
  }

  const total_kobo = reg.amt as number;
  if (!total_kobo || Number.isNaN(total_kobo)) {
    console.error(`[payout] Missing/invalid registration amount for ${reg_id} (amt=${reg.amt}) — cannot compute commission — FAIL`);
    await store_failed_payout(reg_id, partner_id, ac, 'Missing registration amount', at, pid);
    return;
  }
  const amt_kobo = payout_amount(total_kobo, dev);
  console.log(`[payout] Step 4/6: commission computed — total=${total_kobo} kobo, is_dev=${dev}, commission_pct=${COMMISSION_PCT}% -> payout=${amt_kobo} kobo`);

  let recipient: { recipient_code: string; active: boolean };
  try {
    console.log(`[payout] Step 5/6: creating Paystack transfer recipient for "${account_name}"`);
    recipient = await paystack_create_recipient(account_name, partner.ba as string, bank_code);
    console.log(`[payout] Recipient created: recipient_code=${recipient.recipient_code} active=${recipient.active}`);
  } catch (e) {
    console.error(`[payout] Create recipient FAILED for ${partner_id}:`, e);
    await store_failed_payout(reg_id, partner_id, ac, `Recipient failed: ${(e as Error).message}`, at, pid);
    return;
  }

  let transfer: { transfer_code: string; status: string };
  try {
    console.log(`[payout] Step 6/6: initiating transfer of ${amt_kobo} kobo to ${recipient.recipient_code} (ref=po-${reg_id})`);
    transfer = await paystack_transfer(recipient.recipient_code, amt_kobo, `Commission: ${reg_id}`, `po-${reg_id}`);
    console.log(`[payout] Transfer initiated: transfer_code=${transfer.transfer_code} status=${transfer.status}`);
  } catch (e) {
    console.error(`[payout] Transfer FAILED for ${partner_id}:`, e);
    await store_payout(reg_id, partner_id, ac, amt_kobo, 'f', `po-${reg_id}`, undefined, (e as Error).message, at, pid);
    return;
  }

  const final_st = transfer.status === 'success' ? 's' : 'r';
  console.log(`[payout] Storing final record ${pid} st=${final_st} (transfer status was '${transfer.status}')`);
  await store_payout(reg_id, partner_id, ac, amt_kobo, final_st, `po-${reg_id}`, transfer.transfer_code, undefined, at, pid);

  try {
    const player_name = `${reg.fn || ''} ${reg.ln || ''}`.trim() || 'A player';
    console.log(`[payout] Sending partner notification email to ${partner.e} (player="${player_name}" commission=${amt_kobo} total=${total_kobo})`);
    await send_partner_notification(platform, partner.e, partner.n || 'Partner', amt_kobo, total_kobo, player_name);
    console.log(`[payout] Partner notification email dispatched to ${partner.e}`);
  } catch (e) {
    console.error(`[payout] Email notification FAILED for ${partner_id}:`, e);
  }
  console.log(`[payout] ── run_payout END ── reg=${reg_id} final_st=${final_st}`);
}

/**
 * Reconcile a payout's terminal status from a Paystack transfer webhook
 * (transfer.success / transfer.failed / transfer.reversed).
 */
export async function reconcile_transfer_payout(ref: string, st: Payout['st']): Promise<void> {
  console.log(`[payout] ── reconcile_transfer_payout START ── ref=${ref} target_st=${st}`);
  // The transfer reference is `po-<reg_id>`; resolve the exact payout record
  // by registration id rather than relying on list[0] (which is unsafe if
  // multiple payouts ever shared a reference).
  const reg_id = ref.startsWith('po-') ? ref.slice(3) : ref;
  console.log(`[payout] Reconcile: derived reg_id=${reg_id}, looking up record po_${reg_id}`);
  let existing: Payout | null = null;
  try {
    existing = await get<Payout>(`po_${reg_id}`);
  } catch (e) {
    console.error(`[payout] Reconcile: DB ERROR looking up record po_${reg_id}:`, e);
    return;
  }
  if (existing) {
    console.log(`[payout] Reconcile: found record po_${reg_id} (current st=${existing.st}) -> updating to ${st}`);
    try {
      await create({ ...existing, st }, undefined, `po_${reg_id}`);
    } catch (e) {
      console.error(`[payout] Reconcile: DB ERROR writing record po_${reg_id}:`, e);
      return;
    }
    console.log(`[payout] Reconcile: record po_${reg_id} updated to ${st}. END`);
    return;
  }
  console.log(`[payout] Reconcile: no direct record po_${reg_id}; falling back to search by ref=${ref}`);
  let list: Payout[] = [];
  try {
    list = await search_by_payload<Payout>({ s: 'po', ref });
  } catch (e) {
    console.error(`[payout] Reconcile: DB ERROR searching by ref=${ref}:`, e);
    return;
  }
  const p = list[0];
  if (!p) {
    console.log(`[payout] Reconcile: no payout for transfer ref ${ref} — nothing to reconcile. END`);
    return;
  }
  console.log(`[payout] Reconcile: matched payout for reg ${p.reg_id} via ref search -> updating to ${st}`);
  try {
    await create({ ...p, st }, undefined, `po_${p.reg_id}`);
  } catch (e) {
    console.error(`[payout] Reconcile: DB ERROR writing record po_${p.reg_id}:`, e);
    return;
  }
  console.log(`[payout] Reconcile: record po_${p.reg_id} updated to ${st}. END`);
}

async function store_failed_payout(reg_id: string, partner_id: string, ac: string, err: string, at: number, pid: string): Promise<void> {
    await store_payout(reg_id, partner_id, ac, 0, 'f', `po-${reg_id}`, undefined, err, at, pid);
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
  console.log(`[payout] store_payout: writing record ${pid || '(auto-id)'}`, {
    reg_id, partner_id, ac, amt, st, ref: ref || null, tr: tr || null, err: err || null, at: at ?? null
  });
  try {
    await create(p, undefined, pid);
    console.log(`[payout] store_payout: record ${pid || '(auto-id)'} written OK`);
  } catch (e) {
    console.error(`[payout] store_payout: FAILED to store record ${pid || '(auto-id)'}:`, e);
  }
}
