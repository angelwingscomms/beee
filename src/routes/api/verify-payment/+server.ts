import { json } from '@sveltejs/kit';
import type { RequestHandler } from '@sveltejs/kit';
import { get, set } from '$lib/db';
import { paystack_verify } from '$lib/paystack';
import type { Registration } from '$lib/types/registration';

export const POST: RequestHandler = async ({ request }) => {
	console.log(`[POST /api/verify-payment] Received payment verification request`);
	try {
		const data = await request.json();
		console.log(`[POST /api/verify-payment] Request body:`, JSON.stringify(data));

		if (!data.reference) {
			console.warn(`[POST /api/verify-payment] Missing reference`);
			return json({ error: 'Missing reference' }, { status: 400 });
		}

		// The reference IS the registrationId (set during init)
		const reg_id = data.registrationId || data.reference;
		console.log(`[POST /api/verify-payment] Looking up registration in DB: ${reg_id}`);
		const reg = await get<Registration>(reg_id);
		if (!reg) {
			console.error(`[POST /api/verify-payment] Registration not found in DB: ${reg_id}`);
			return json({ error: 'Registration not found' }, { status: 404 });
		}
		console.log(`[POST /api/verify-payment] Registration found in DB:`, JSON.stringify(reg));

		// Idempotent — already paid, just return success
		if (reg.st === 'paid') {
			console.log(`[POST /api/verify-payment] Registration ${reg_id} is already marked paid (idempotent path)`);
			return json({ success: true, status: 'success', message: 'Already verified' });
		}

		console.log(`[POST /api/verify-payment] Calling paystack_verify with reference: ${data.reference}...`);
		// Call Paystack to verify
		const verified = await paystack_verify(data.reference);
		console.log(`[POST /api/verify-payment] paystack_verify returned status: ${verified.status}`);

		if (verified.status !== 'success') {
			console.warn(`[POST /api/verify-payment] Payment was not successful, status: ${verified.status}`);
			return json(
				{ error: `Payment not successful: ${verified.status}` },
				{ status: 402 }
			);
		}

		// Anti-fraud: confirm amount matches what we stored
		if (verified.amount !== reg.amt) {
			console.error(
				`[POST /api/verify-payment] Amount mismatch for ${reg_id}: expected ${reg.amt}, got ${verified.amount}`
			);
			return json({ error: 'Amount mismatch' }, { status: 400 });
		}

		// Mark as paid
		console.log(`[POST /api/verify-payment] Setting registration status to paid for ID: ${reg_id}...`);
		await set(reg_id, { st: 'paid', ref: verified.reference });
		console.log(`[POST /api/verify-payment] Status updated to paid successfully`);

		return json({ success: true, status: 'success', message: 'Payment verified successfully' });
	} catch (error) {
		console.error('[POST /api/verify-payment] Exception caught:', error);
		return json({ error: 'Failed to verify payment' }, { status: 500 });
	}
};
