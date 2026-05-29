import { json } from '@sveltejs/kit';
import type { RequestHandler } from '@sveltejs/kit';
import { create, new_id } from '$lib/db';
import type { Registration } from '$lib/types/registration';

// NGN 50,000 = 5,000,000 kobo
const AMOUNT_KOBO = 5_000_000;

export const POST: RequestHandler = async ({ request }) => {
	console.log(`[POST /api/registration] Received registration request`);
	try {
		const data = await request.json();
		console.log(`[POST /api/registration] Request body:`, JSON.stringify(data));

		if (!data.schoolName || !data.schoolEmail || !data.schoolPhone || !data.location) {
			console.warn(`[POST /api/registration] Missing required fields`, {
				schoolName: data.schoolName,
				schoolEmail: data.schoolEmail,
				schoolPhone: data.schoolPhone,
				location: data.location
			});
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

		console.log(`[POST /api/registration] Storing registration in DB with ID: ${i}...`);
		await create(payload, undefined, i);
		console.log(`[POST /api/registration] Registration stored successfully in DB`);

		return json({ success: true, registrationId: i, message: 'Registration created successfully' });
	} catch (error) {
		console.error('[POST /api/registration] Exception caught:', error);
		return json({ error: 'Failed to process registration' }, { status: 500 });
	}
};
