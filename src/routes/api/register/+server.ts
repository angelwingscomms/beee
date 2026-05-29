import { json } from '@sveltejs/kit';
import type { RequestHandler } from '@sveltejs/kit';
import { create, new_id } from '$lib/db';
import type { Registration } from '$lib/types/registration';

// NGN 50,000 = 5,000,000 kobo
const AMOUNT_KOBO = 5_000_000;

export const POST: RequestHandler = async ({ request }) => {
	try {
		const data = await request.json();

		if (!data.schoolName || !data.schoolEmail || !data.schoolPhone || !data.players) {
			return json({ message: 'Missing required fields' }, { status: 400 });
		}

		if (data.players.length !== 4) {
			return json({ message: 'Exactly 4 players are required' }, { status: 400 });
		}

		const i = new_id();
		const payload: Registration = {
			s: 'reg',
			n: data.schoolName,
			e: data.schoolEmail,
			p: data.schoolPhone,
			pl: data.players,
			st: 'pending',
			v: 0,
			amt: AMOUNT_KOBO,
			d: Date.now()
		};

		await create(payload, undefined, i);

		return json({ success: true, registrationId: i, message: 'Registration successful. Proceed to payment.' });
	} catch (error) {
		console.error('Registration error:', error);
		return json({ message: 'Registration failed. Please try again.' }, { status: 500 });
	}
};
