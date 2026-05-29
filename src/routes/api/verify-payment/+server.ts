import { json } from '@sveltejs/kit';
import type { RequestHandler } from '@sveltejs/kit';
import { get, set } from '$lib/db';
import { paystack_verify } from '$lib/paystack';
import type { Registration } from '$lib/types/registration';

export const POST: RequestHandler = async ({ request }) => {
	try {
		const data = await request.json();

		if (!data.reference) {
			return json({ error: 'Missing reference' }, { status: 400 });
		}

		// The reference IS the registrationId (set during init)
		const reg_id = data.registrationId || data.reference;
		const reg = await get<Registration>(reg_id);
		if (!reg) {
			return json({ error: 'Registration not found' }, { status: 404 });
		}

		// Idempotent — already paid, just return success
		if (reg.st === 'paid') {
			return json({ success: true, status: 'success', message: 'Already verified' });
		}

		// Call Paystack to verify
		const verified = await paystack_verify(data.reference);

		if (verified.status !== 'success') {
			return json(
				{ error: `Payment not successful: ${verified.status}` },
				{ status: 402 }
			);
		}

		// Anti-fraud: confirm amount matches what we stored
		if (verified.amount !== reg.amt) {
			console.error(
				`Amount mismatch for ${reg_id}: expected ${reg.amt}, got ${verified.amount}`
			);
			return json({ error: 'Amount mismatch' }, { status: 400 });
		}

		// Mark as paid
		await set(reg_id, { st: 'paid', ref: verified.reference });

		return json({ success: true, status: 'success', message: 'Payment verified successfully' });
	} catch (error) {
		console.error('Verification error:', error);
		return json({ error: 'Failed to verify payment' }, { status: 500 });
	}
};
