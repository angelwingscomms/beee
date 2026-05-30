import { json } from '@sveltejs/kit';
import type { RequestHandler } from '@sveltejs/kit';
import { create, new_id } from '$lib/db';
import type { Registration } from '$lib/types/registration';

const AMOUNT_KOBO = 1_250_000;

export const POST: RequestHandler = async ({ request }) => {
	try {
		const data = await request.json();

		if (!data.schoolName || !data.playerName || !data.playerEmail || !data.playerPhone) {
			return json({ message: 'Missing required fields' }, { status: 400 });
		}

		const i = new_id();
		const payload: Registration = {
			s: 'reg',
			sn: data.schoolName,
			n: data.playerName,
			e: data.playerEmail,
			p: data.playerPhone,
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
