import { json } from '@sveltejs/kit';
import type { RequestHandler } from '@sveltejs/kit';
import { find_user_by_email, edit_point } from '$lib/db';
import type { User } from '$lib/types';

const PHONE_RE = /^\+?\d{7,15}$/;

export const POST: RequestHandler = async ({ request, locals }) => {
	if (!locals.user) return json({ error: 'Not authenticated' }, { status: 401 });

	const { phone } = await request.json();
	if (!phone || !PHONE_RE.test(String(phone).replace(/[\s()-]/g, ''))) {
		return json({ error: 'Invalid phone number' }, { status: 400 });
	}

	const email = locals.user.email ?? '';
	const user = await find_user_by_email(email) as (User & { i: string }) | undefined;
	if (!user) return json({ error: 'User not found' }, { status: 404 });

	await edit_point(user.i, { ph: phone, e: user.e, s: 'u' });

	return json({ success: true });
};
