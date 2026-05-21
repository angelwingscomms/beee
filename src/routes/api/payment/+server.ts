import { json } from '@sveltejs/kit';
import type { RequestHandler } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ request }) => {
	try {
		const data = await request.json();

		// Validate request
		if (!data.registrationId || !data.email || !data.amount) {
			return json(
				{ error: 'Missing required fields' },
				{ status: 400 }
			);
		}

		// In a real app, this would initialize a Paystack payment
		// For demo, we'll generate a mock payment reference
		const paymentReference = `PAY-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

		console.log('[v0] Payment initialized:', {
			registrationId: data.registrationId,
			email: data.email,
			amount: data.amount,
			reference: paymentReference
		});

		return json({
			success: true,
			reference: paymentReference,
			message: 'Payment initialized successfully'
		});
	} catch (error) {
		console.error('[v0] Payment error:', error);
		return json(
			{ error: 'Failed to initialize payment' },
			{ status: 500 }
		);
	}
};
