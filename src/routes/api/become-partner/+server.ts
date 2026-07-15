import { json } from '@sveltejs/kit';
import type { RequestHandler } from '@sveltejs/kit';
import { get, update_point } from '$lib/db';
import type { User } from '$lib/types';

export const POST: RequestHandler = async ({ locals }) => {
	if (!locals.user) {
		return json({ error: 'Not authenticated' }, { status: 401 });
	}
	try {
		const user = await get<User>(locals.user.id);
		if (!user) return json({ error: 'User not found' }, { status: 404 });
		const c = user.c || [];
		if (!c.includes('fab')) {
			await update_point<User>(locals.user.id, { c: [...c, 'fab'] });
		}
		return json({ success: true });
	} catch {
		return json({ error: 'Failed to upgrade account' }, { status: 500 });
	}
};
