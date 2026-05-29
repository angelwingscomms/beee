import { json } from '@sveltejs/kit';
import type { RequestHandler } from '@sveltejs/kit';
import { get, set } from '$lib/db';
import { paystack_init } from '$lib/paystack';
import type { Registration } from '$lib/types/registration';

export const POST: RequestHandler = async ({ request, url }) => {
	try {
		const data = await request.json();

		if (!data.registrationId) {
			return json({ message: 'Missing registrationId' }, { status: 400 });
		}

		const reg = await get<Registration>(data.registrationId);
		if (!reg) {
			return json({ message: 'Registration not found' }, { status: 404 });
		}

		const amount_kobo = reg.amt;
		const callback_url = `${url.origin}/payment/callback`;

		const result = await paystack_init(
			reg.e,
			amount_kobo,
			data.registrationId,
			reg.n,
			callback_url
		);

		await set(data.registrationId, { ref: result.reference });

		return json({
			success: true,
			transactionRef: result.reference,
			authorizationUrl: result.authorization_url,
			accessCode: result.access_code,
			message: 'Payment initialized. Redirecting to Paystack...'
		});
	} catch (error) {
		console.error('Payment initialization error:', error);
		return json({ message: 'Payment initialization failed. Please try again.' }, { status: 500 });
	}
};
