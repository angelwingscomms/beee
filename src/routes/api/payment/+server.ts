import { json } from '@sveltejs/kit';
import type { RequestHandler } from '@sveltejs/kit';
import { get, set } from '$lib/db';
import { paystack_init } from '$lib/paystack';
import type { Registration } from '$lib/types/registration';

export const POST: RequestHandler = async ({ request, url }) => {
	console.log(`[POST /api/payment] Received payment initialization request`);
	try {
		const data = await request.json();
		console.log(`[POST /api/payment] Request body:`, JSON.stringify(data));

		if (!data.registrationId || !data.email) {
			console.warn(`[POST /api/payment] Missing required fields`, { registrationId: data.registrationId, email: data.email });
			return json({ error: 'Missing required fields' }, { status: 400 });
		}

		console.log(`[POST /api/payment] Looking up registration in DB: ${data.registrationId}`);
		const reg = await get<Registration>(data.registrationId);
		if (!reg) {
			console.error(`[POST /api/payment] Registration not found for ID: ${data.registrationId}`);
			return json({ error: 'Registration not found' }, { status: 404 });
		}
		console.log(`[POST /api/payment] Registration found in DB:`, JSON.stringify(reg));

		// Use the stored amount — never trust the client-sent amount
		const amount_kobo = reg.amt;

		// Build callback URL: /payment/callback?reference=<registrationId>
		const callback_url = `${url.origin}/payment/callback`;
		console.log(`[POST /api/payment] Prepared callback URL: ${callback_url}`);

		console.log(`[POST /api/payment] Calling paystack_init...`);
		const result = await paystack_init(
			reg.e,
			amount_kobo,
			data.registrationId,
			reg.sn ?? '',
			callback_url
		);
		console.log(`[POST /api/payment] paystack_init succeeded:`, JSON.stringify(result));

		// Store the Paystack reference on the registration
		console.log(`[POST /api/payment] Storing Paystack reference on registration...`);
		await set(data.registrationId, { ref: result.reference });
		console.log(`[POST /api/payment] Paystack reference stored successfully`);

		return json({
			success: true,
			authorization_url: result.authorization_url,
			access_code: result.access_code,
			reference: result.reference
		});
	} catch (error) {
		console.error('[POST /api/payment] Exception caught:', error);
		return json({ error: 'Failed to initialize payment' }, { status: 500 });
	}
};
