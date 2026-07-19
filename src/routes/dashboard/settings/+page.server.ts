import type { PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';
import { find_user_by_email } from '$lib/db';
import type { User } from '$lib/types';

export const load: PageServerLoad = async ({ locals }) => {
	if (!locals.user) throw redirect(302, '/login?next=/dashboard/settings');
	const email = locals.user.email ?? '';
	const user = await find_user_by_email(email) as (User & { i: string }) | undefined;
	return {
		email: user?.e ?? email,
		name: user?.n,
		phone: user?.ph,
		picture: user?.pic
	};
};
