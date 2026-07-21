import { json } from '@sveltejs/kit';
import type { RequestHandler } from '@sveltejs/kit';
import { find_user_by_email, edit_point } from '$lib/db';
import type { User } from '$lib/types';

const PHONE_RE = /^\+?\d{7,15}$/;

export const POST: RequestHandler = async ({ request, locals }) => {
	if (!locals.user) return json({ error: 'Not authenticated' }, { status: 401 });

	const { phone } = await request.json();
	const normalized = String(phone ?? '').replace(/[\s()-]/g, '').replace(/^\+/, '');
	if (!phone || !PHONE_RE.test(normalized)) {
		return json({ error: 'Invalid phone number' }, { status: 400 });
	}

	const email = locals.user.email ?? '';
	const user = await find_user_by_email(email) as (User & { i: string }) | undefined;
	if (!user) return json({ error: 'User not found' }, { status: 404 });

	// ponytail: User.ph is string[]; settings edits the single stored number.
	await edit_point(user.i, { ph: [normalized], e: user.e, s: 'u' });

	return json({ success: true });
};
