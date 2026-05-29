import { json } from '@sveltejs/kit';
import type { RequestHandler } from '@sveltejs/kit';
import { create, new_id } from '$lib/db';
import type { Registration } from '$lib/types/registration';

// NGN 50,000 = 5,000,000 kobo
const AMOUNT_KOBO = 5_000_000;

export const POST: RequestHandler = async ({ request }) => {
	try {
		const data = await request.json();

		if (!data.schoolName || !data.schoolEmail || !data.schoolPhone || !data.location) {
			return json({ error: 'Missing required fields' }, { status: 400 });
		}

		const i = new_id();
		const payload: Registration = {
			s: 'reg',
			n: data.schoolName,
			e: data.schoolEmail,
			p: data.schoolPhone,
			l: data.location,
			pl: data.players || [],
			st: 'pending',
			amt: AMOUNT_KOBO,
			d: Date.now()
		};

		await create(payload, undefined, i);

		return json({ success: true, registrationId: i, message: 'Registration created successfully' });
	} catch (error) {
		console.error('Registration error:', error);
		return json({ error: 'Failed to process registration' }, { status: 500 });
	}
};
