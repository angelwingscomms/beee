import { json } from '@sveltejs/kit';
import type { RequestHandler } from '@sveltejs/kit';
import bcrypt from 'bcryptjs';
import { create, get, find_or_create_player_user } from '$lib/db';
import { paystack_verify } from '$lib/paystack';
import { encode_session } from '$lib/server/session';
import { process_partner_payout } from '$lib/partner';
import type { Registration } from '$lib/types/registration';

// async function search_maps(q: string): Promise<0 | 1 | 2> {
// 	try {
// 		const p = new URLSearchParams({
// 			engine: 'google_maps',
// 			q,
// 			ll: '@9.076,7.398,15z',
// 			hl: 'en',
// 			gl: 'ng'
// 		});
// 		const res = await fetch(`https://serpapi.com/search.json?${p}&api_key=${SERPAPI_KEY}`);
// 		const data = await res.json();
// 		if (dev) console.log('[verify-payment] SerpAPI result:', JSON.stringify(data, null, 2));
// 		const pr = data.place_results;
// 		if (pr && Array.isArray(pr.type)) {
// 			return pr.type.some(t => typeof t === 'string' && t.toLowerCase().includes('school')) ? 1 : 0;
// 		}
// 		return 0;
// 	} catch {
// 		return 2;
// 	}
// }

export const POST: RequestHandler = async ({ request, cookies, platform }) => {
	console.log(`[POST /api/verify-payment] Received payment verification request`);
	try {
		const data = await request.json();
		console.log(`[POST /api/verify-payment] Request body:`, JSON.stringify(data));

		if (!data.reference) {
			console.warn(`[POST /api/verify-payment] Missing reference`);
			return json({ error: 'Missing reference' }, { status: 400 });
		}

		const reg_id = data.registrationId || data.reference;
		console.log(`[POST /api/verify-payment] Checking if registration already exists in DB: ${reg_id}`);
		const reg = await get<Registration>(reg_id);
		if (!reg) {
			console.error(`[POST /api/verify-payment] No local registration found for ${reg_id}`);
			return json({ error: 'Registration not found' }, { status: 404 });
		}
		if (reg.st === 'paid') {
			console.log(`[POST /api/verify-payment] Registration ${reg_id} is already paid (idempotent path)`);
			return json({ success: true, status: 'success', message: 'Already verified' });
		}

		console.log(`[POST /api/verify-payment] Calling paystack_verify with reference: ${data.reference}...`);
		const verified = await paystack_verify(data.reference);
		console.log(`[POST /api/verify-payment] paystack_verify returned status: ${verified.status}`);

		if (verified.status !== 'success') {
			console.warn(`[POST /api/verify-payment] Payment was not successful, status: ${verified.status}`);
			return json(
				{ error: `Payment not successful: ${verified.status}` },
				{ status: 402 }
			);
		}

		// Anti-fraud: confirm amount matches what we stored locally
		const expected_amt = reg.amt;
		if (verified.amount !== expected_amt) {
			console.error(
				`[POST /api/verify-payment] Amount mismatch for ${reg_id}: expected ${expected_amt}, got ${verified.amount}`
			);
			return json({ error: 'Amount mismatch' }, { status: 400 });
		}

		// Write full registration to DB now that payment is confirmed (no password persisted)
		console.log(`[POST /api/verify-payment] Payment confirmed! Writing registration to DB for ID: ${reg_id}...`);
		const payload: Registration = {
			s: 'reg',
			fn: reg.fn,
			ln: reg.ln,
			sn: reg.sn,
			e: reg.e,
			p: reg.p,
			st: 'paid',
			v: 0,
			amt: expected_amt,
			d: Date.now(),
			ref: verified.reference,
			ac: reg.ac
		};

		await create(payload, undefined, reg_id);
		console.log(`[POST /api/verify-payment] Registration written to DB successfully with status 'paid'`);

		// Create or update player user account. The pending record already holds
		// a bcrypt hash of the password (set at registration init), so reuse it
		// directly — the plaintext password never touches the DB.
		const email = reg.e;
		const ph = reg.pw;
		const user_id = await find_or_create_player_user(email, `${reg.fn || ''} ${reg.ln || ''}`.trim(), ph);

		const session = await encode_session({ id: user_id, email, name: `${reg.fn || ''} ${reg.ln || ''}`.trim() });
		cookies.set('session', session, { path: '/', httpOnly: true, maxAge: 604800, sameSite: 'lax' });

		// Fire-and-forget partner payout
		process_partner_payout(reg, reg_id, platform).catch(e =>
			console.error(`[payout] Failed for ${reg_id}:`, e)
		);

		return json({ success: true, status: 'success', message: 'Payment verified and registration confirmed', redirect: '/dashboard', userId: user_id });
	} catch (error) {
		console.error('[POST /api/verify-payment] Exception caught:', error);
		return json({ error: 'Failed to verify payment' }, { status: 500 });
	}
};
