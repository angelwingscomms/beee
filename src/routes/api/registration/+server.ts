import { json } from '@sveltejs/kit';
import type { RequestHandler } from '@sveltejs/kit';

// Mock database storage
const registrations = new Map();

export const POST: RequestHandler = async ({ request }) => {
	try {
		const data = await request.json();

		// Validate request
		if (!data.schoolName || !data.schoolEmail || !data.schoolPhone || !data.location) {
			return json(
				{ error: 'Missing required fields' },
				{ status: 400 }
			);
		}

		// Generate registration ID
		const registrationId = `REG-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

		// Store registration
		registrations.set(registrationId, {
			...data,
			createdAt: new Date().toISOString(),
			status: 'pending'
		});

		console.log('[v0] Registration created:', registrationId);

		return json({
			success: true,
			registrationId,
			message: 'Registration created successfully'
		});
	} catch (error) {
		console.error('[v0] Registration error:', error);
		return json(
			{ error: 'Failed to process registration' },
			{ status: 500 }
		);
	}
};
