import { search_by_payload, create, get } from '$lib/db';
import { get_bank_code, paystack_resolve_bank, paystack_create_recipient, paystack_transfer } from '$lib/paystack';
import { send_affiliate_notification } from '$lib/email';
import { COMMISSION_PCT } from '$lib/constants';
import type { User } from '$lib/types';
import type { Registration } from '$lib/types/registration';
import type { Payout } from '$lib/types/payout';

export async function process_affiliate_payout(
  reg_data: Registration,
  reg_id: string,
  platform?: App.Platform
): Promise<void> {
  const ac = reg_data.ac as string | undefined;
  if (!ac) return;

  // Find affiliate by code
  const affs = await search_by_payload<User>({ s: 'u', ac });
  const aff = affs.find(u => u.c?.includes('fab')) as (User & { i: string }) | undefined;
  if (!aff) {
    console.log(`[payout] No affiliate found for code ${ac} (reg ${reg_id})`);
    return;
  }

  const aff_id = aff.i;
  if (!aff_id) {
    console.log(`[payout] Affiliate for ${ac} has no ID`);
    return;
  }

  // Deterministic payout record id so concurrent verify-payment + webhook paths
  // collapse to a single record and a repeat call is a no-op.
  const pid = `po_${reg_id}`;

  // Self-referral guard: an affiliate must not earn commission on their own signup.
  if (reg_data.e && aff.e && reg_data.e.toLowerCase() === aff.e.toLowerCase()) {
    console.log(`[payout] Self-referral blocked for ${ac} (reg ${reg_id})`);
    await store_payout(reg_id, aff_id, ac, 0, 'blocked_self', undefined, undefined, 'self-referral', pid);
    return;
  }

  // Check bank details
  if (!aff.ba || !aff.bn) {
    console.log(`[payout] Affiliate ${aff_id} (${ac}) has no bank details configured`);
    return;
  }

  // Idempotency: skip if a record already exists for this registration.
  const existing = await get<Payout>(pid);
  if (existing) {
    console.log(`[payout] Already processed for reg ${reg_id} (${existing.st}), skipping`);
    return;
  }

  // Claim the record early (processing) so the other path skips redundant work.
  await store_payout(reg_id, aff_id, ac, 0, 'processing', undefined, undefined, undefined, pid);

  const bank_code = aff.bk || get_bank_code(aff.bn);
  if (!bank_code) {
    console.log(`[payout] Unknown bank: ${aff.bn} (code: ${aff.bk}) for affiliate ${aff_id}`);
    await store_failed_payout(reg_id, aff_id, ac, `Unknown bank: ${aff.bn}`, pid);
    return;
  }

  // Resolve bank account
  let account_name: string;
  try {
    const resolved = await paystack_resolve_bank(aff.ba, bank_code);
    account_name = resolved.account_name;
  } catch (e) {
    console.error(`[payout] Bank resolve failed for ${aff_id}:`, e);
    await store_failed_payout(reg_id, aff_id, ac, `Bank resolve failed: ${(e as Error).message}`, pid);
    return;
  }

  // Calculate commission
  const total_kobo = reg_data.amt as number;
  const amt_kobo = Math.round(total_kobo * COMMISSION_PCT / 100);

  // Create transfer recipient
  let recipient: { recipient_code: string; active: boolean };
  try {
    recipient = await paystack_create_recipient(account_name, aff.ba, bank_code);
  } catch (e) {
    console.error(`[payout] Create recipient failed for ${aff_id}:`, e);
    await store_failed_payout(reg_id, aff_id, ac, `Recipient failed: ${(e as Error).message}`, pid);
    return;
  }

  // Initiate transfer. Deterministic reference lets Paystack dedupe so concurrent
  // paths can never create two disbursements for the same registration.
  let transfer: { transfer_code: string; status: string };
  try {
    transfer = await paystack_transfer(recipient.recipient_code, amt_kobo, `Commission: ${reg_id}`, `PO-${reg_id}`);
  } catch (e) {
    console.error(`[payout] Transfer failed for ${aff_id}:`, e);
    await store_payout(reg_id, aff_id, ac, amt_kobo, 'failed', `PO-${reg_id}`, undefined, (e as Error).message, pid);
    return;
  }

  // Store payout record
  await store_payout(reg_id, aff_id, ac, amt_kobo, transfer.status === 'success' ? 'success' : 'pending', `PO-${reg_id}`, transfer.transfer_code, undefined, pid);

  // Email affiliate
  try {
    const player_name = `${reg_data.fn || ''} ${reg_data.ln || ''}`.trim() || 'A player';
    await send_affiliate_notification(platform, aff.e, aff.n || 'Affiliate', amt_kobo, total_kobo, player_name);
  } catch (e) {
    console.error(`[payout] Email notification failed for ${aff_id}:`, e);
  }
}

async function store_failed_payout(reg_id: string, aff_id: string, ac: string, err: string, pid: string): Promise<void> {
  await store_payout(reg_id, aff_id, ac, 0, 'failed', undefined, undefined, err, pid);
}

async function store_payout(
  reg_id: string,
  aff_id: string,
  ac: string,
  amt: number,
  st: Payout['st'],
  ref?: string,
  tr?: string,
  err?: string,
  pid?: string
): Promise<void> {
  const p: Payout = { s: 'po', reg_id, aff_id, ac, amt, st, d: Date.now() };
  if (ref) p.ref = ref;
  if (tr) p.tr = tr;
  if (err) p.err = err;
  try {
    await create(p, undefined, pid);
  } catch (e) {
    console.error('[payout] Failed to store payout record:', e);
  }
}
