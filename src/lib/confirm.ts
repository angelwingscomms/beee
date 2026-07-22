// Single source of truth for confirming a registration after payment.
// Used by both /api/verify-payment (callback) and /api/webhooks/paystack.
// Verifies with Paystack, flips the reg point to paid in-place, creates/updates
// the player user, and fires the partner payout. Idempotent via the st guard.

import { get, edit_point, find_or_create_player_user } from '$lib/db';
import type { User } from '$lib/types';
import { paystack_verify } from '$lib/paystack';
import { process_partner_payout } from '$lib/partner';
import { send_registration_confirmation } from '$lib/email';
import type { Registration } from '$lib/types/registration';

export interface ConfirmResult {
	ok: boolean;
	code?: number;
	status?: 'already' | 'success';
	user_id?: string;
	email?: string;
	name?: string;
	ph?: string[];
	error?: string;
}

export async function confirm(reference: string, platform?: App.Platform, phones?: string[]): Promise<ConfirmResult> {
	console.log(`[confirm] ═══ confirm START ═══ reference=${reference}`);
	const reg = await get<Registration>(reference);
	if (!reg) {
		console.warn(`[confirm] No local registration for ${reference} , 404`);
		return { ok: false, code: 404, error: 'Registration not found' };
	}
	if (reg.st === 'i') {
		console.log(`[confirm] ${reference} already paid (idempotent) , STOP`);
		return { ok: true, status: 'already' };
	}

	console.log(`[confirm] Verifying with Paystack reference=${reference}...`);
	const verified = await paystack_verify(reference);
	if (verified.status !== 'success') {
		console.warn(`[confirm] Paystack verify not successful: ${verified.status} , 402`);
		return { ok: false, code: 402, error: `Payment not successful: ${verified.status}` };
	}

	if (verified.amount !== reg.amt) {
		console.error(`[confirm] Amount mismatch for ${reference}: expected ${reg.amt}, got ${verified.amount} , 400`);
		return { ok: false, code: 400, error: 'Amount mismatch' };
	}

	console.log(`[confirm] Payment verified. Flipping reg ${reference} to paid (in-place).`);
	await edit_point(reference, { st: 'i', d: Date.now(), ref: verified.reference, ac: reg.ac, pw: undefined as unknown as string });

	const email = reg.e;
	const name = `${reg.fn || ''} ${reg.ln || ''}`.trim();

	// The parent phone travels through Paystack metadata (no phone on the stored
	// Registration), so read it back from the verified transaction; fall back to
	// the session user's phones (e.g. already-populated account).
	const metaPhone = (verified.metadata?.reg_data as { phone?: string } | undefined)?.phone;
	const resolvedPhones = phones?.length ? phones : (metaPhone ? [metaPhone] : undefined);
	console.log(`[confirm] phone resolution: sessionPhones=${phones ?? 'null'} metaPhone=${metaPhone ?? 'null'} -> resolvedPhones=${resolvedPhones ?? 'null'}`);
	const user_id = await find_or_create_player_user(email, name, reg.pw, resolvedPhones);
	console.log(`[confirm] Player user ensured: ${user_id}`);
	const user = await get<User>(user_id);
	const ph = user?.ph;

	console.log(`[confirm] Firing partner payout (fire-and-forget) for ${reference}`);
	process_partner_payout(reg, reference, platform).catch(e =>
		console.error(`[confirm] payout failed for ${reference}:`, e)
	);

	console.log(`[confirm] Firing registration confirmation email (fire-and-forget) for ${reference}`);
	send_registration_confirmation(platform, email, name || 'Your player', reg.amt, verified.reference).catch(e =>
		console.error(`[confirm] confirmation email failed for ${reference}:`, e)
	);

	console.log(`[confirm] ═══ confirm END ═══ reference=${reference} ok=true`);
	return { ok: true, status: 'success', user_id, email, name, ph };
}
