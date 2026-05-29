import { json } from '@sveltejs/kit';
import type { RequestHandler } from '@sveltejs/kit';
import { get, set } from '$lib/db';
import type { Registration } from '$lib/types/registration';

export const POST: RequestHandler = async ({ request }) => {
	try {
		const data = await request.json();

		if (!data.registrationId || !data.email || !data.amount) {
			return json({ error: 'Missing required fields' }, { status: 400 });
		}

		const reg = await get<Registration>(data.registrationId);
		if (!reg) {
			return json({ error: 'Registration not found' }, { status: 404 });
		}

		const paymentReference = `PAY-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

		await set(data.registrationId, { r: paymentReference });

		return json({ success: true, reference: paymentReference, message: 'Payment initialized successfully' });
	} catch (error) {
		console.error('Payment error:', error);
		return json({ error: 'Failed to initialize payment' }, { status: 500 });
	}
};
