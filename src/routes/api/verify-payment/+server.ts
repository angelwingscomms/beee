import { json } from '@sveltejs/kit';
import type { RequestHandler } from '@sveltejs/kit';
import { get, set } from '$lib/db';
import type { Registration } from '$lib/types/registration';

export const POST: RequestHandler = async ({ request }) => {
	try {
		const data = await request.json();

		if (!data.registrationId || !data.reference) {
			return json({ error: 'Missing required fields' }, { status: 400 });
		}

		const reg = await get<Registration>(data.registrationId);
		if (!reg) {
			return json({ error: 'Registration not found' }, { status: 404 });
		}

		await set(data.registrationId, { st: 'paid', r: data.reference });

		return json({ success: true, status: 'success', message: 'Payment verified successfully' });
	} catch (error) {
		console.error('Verification error:', error);
		return json({ error: 'Failed to verify payment' }, { status: 500 });
	}
};
