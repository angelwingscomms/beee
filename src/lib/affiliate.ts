import { search_by_payload, create } from '$lib/db';
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

  // Check bank details
  if (!aff.ba || !aff.bn) {
    console.log(`[payout] Affiliate ${aff_id} (${ac}) has no bank details configured`);
    return;
  }

  // Idempotency
  const existing = await search_by_payload<Payout>({ s: 'po', reg_id });
  if (existing.length > 0) {
    console.log(`[payout] Already processed for reg ${reg_id}, skipping`);
    return;
  }

  const bank_code = aff.bk || get_bank_code(aff.bn);
  if (!bank_code) {
    console.log(`[payout] Unknown bank: ${aff.bn} (code: ${aff.bk}) for affiliate ${aff_id}`);
    await store_failed_payout(reg_id, aff_id, ac, `Unknown bank: ${aff.bn}`);
    return;
  }

  // Resolve bank account
  let account_name: string;
  try {
    const resolved = await paystack_resolve_bank(aff.ba, bank_code);
    account_name = resolved.account_name;
  } catch (e) {
    console.error(`[payout] Bank resolve failed for ${aff_id}:`, e);
    await store_failed_payout(reg_id, aff_id, ac, `Bank resolve failed: ${(e as Error).message}`);
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
    await store_failed_payout(reg_id, aff_id, ac, `Recipient failed: ${(e as Error).message}`);
    return;
  }

  // Initiate transfer
  let transfer: { transfer_code: string; status: string };
  try {
    transfer = await paystack_transfer(recipient.recipient_code, amt_kobo, `Commission: ${reg_id}`);
  } catch (e) {
    console.error(`[payout] Transfer failed for ${aff_id}:`, e);
    await store_payout(reg_id, aff_id, ac, amt_kobo, 'failed', undefined, undefined, (e as Error).message);
    return;
  }

  // Store payout record
  await store_payout(reg_id, aff_id, ac, amt_kobo, transfer.status === 'success' ? 'success' : 'pending', transfer.transfer_code, transfer.transfer_code);

  // Email affiliate
  try {
    const player_name = `${reg_data.fn || ''} ${reg_data.ln || ''}`.trim() || 'A player';
    await send_affiliate_notification(platform, aff.e, aff.n || 'Affiliate', amt_kobo, total_kobo, player_name);
  } catch (e) {
    console.error(`[payout] Email notification failed for ${aff_id}:`, e);
  }
}

async function store_failed_payout(reg_id: string, aff_id: string, ac: string, err: string): Promise<void> {
  await store_payout(reg_id, aff_id, ac, 0, 'failed', undefined, undefined, err);
}

async function store_payout(
  reg_id: string,
  aff_id: string,
  ac: string,
  amt: number,
  st: Payout['st'],
  ref?: string,
  tr?: string,
  err?: string
): Promise<void> {
  const p: Payout = { s: 'po', reg_id, aff_id, ac, amt, st, d: Date.now() };
  if (ref) p.ref = ref;
  if (tr) p.tr = tr;
  if (err) p.err = err;
  try {
    await create(p);
  } catch (e) {
    console.error('[payout] Failed to store payout record:', e);
  }
}
