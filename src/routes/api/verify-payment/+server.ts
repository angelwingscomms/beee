import { json } from '@sveltejs/kit';
import type { RequestHandler } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ request }) => {
	try {
		const data = await request.json();

		// Validate request
		if (!data.registrationId || !data.reference) {
			return json(
				{ error: 'Missing required fields' },
				{ status: 400 }
			);
		}

		// In a real app, this would verify payment with Paystack API
		// For demo, we'll always return success
		console.log('[v0] Payment verified:', {
			registrationId: data.registrationId,
			reference: data.reference
		});

		return json({
			success: true,
			status: 'success',
			message: 'Payment verified successfully'
		});
	} catch (error) {
		console.error('[v0] Verification error:', error);
		return json(
			{ error: 'Failed to verify payment' },
			{ status: 500 }
		);
	}
};
