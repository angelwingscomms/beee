import { json } from '@sveltejs/kit';
import type { RequestHandler } from '@sveltejs/kit';
import { get, set } from '$lib/db';
import { paystack_init } from '$lib/paystack';
import type { Registration } from '$lib/types/registration';

export const POST: RequestHandler = async ({ request, url }) => {
	try {
		const data = await request.json();

		if (!data.registrationId || !data.email) {
			return json({ error: 'Missing required fields' }, { status: 400 });
		}

		const reg = await get<Registration>(data.registrationId);
		if (!reg) {
			return json({ error: 'Registration not found' }, { status: 404 });
		}

		// Use the stored amount — never trust the client-sent amount
		const amount_kobo = reg.amt;

		// Build callback URL: /payment/callback?reference=<registrationId>
		const callback_url = `${url.origin}/payment/callback`;

		const result = await paystack_init(
			reg.e,
			amount_kobo,
			data.registrationId,
			reg.n,
			callback_url
		);

		// Store the Paystack reference on the registration
		await set(data.registrationId, { ref: result.reference });

		return json({
			success: true,
			authorization_url: result.authorization_url,
			access_code: result.access_code,
			reference: result.reference
		});
	} catch (error) {
		console.error('Payment init error:', error);
		return json({ error: 'Failed to initialize payment' }, { status: 500 });
	}
};
