import type { PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';
import Sqids from 'sqids';
import { find_user_by_email, search_by_payload, edit_point } from '$lib/db';
import type { User } from '$lib/types';
import type { Registration } from '$lib/types/registration';

const sqids = new Sqids({ minLength: 6 });

export const load: PageServerLoad = async ({ locals }) => {
	if (!locals.user) throw redirect(302, '/login/google?next=/dashboard/partner');
	const email = locals.user.email ?? '';
	const user = await find_user_by_email(email) as (User & { i: string }) | undefined;
	if (!user) throw redirect(302, '/login/google?next=/dashboard/partner');

	let c = user.c ?? [];
	let ac = user.ac;
	let did_upgrade = false;
	if (!c.includes('fab')) {
		c = [...c, 'fab'];
		did_upgrade = true;
	}
	if (!ac) {
		ac = sqids.encode([Math.floor(Date.now() / 1000), Math.floor(Math.random() * 9000) + 1000]);
		did_upgrade = true;
	}
	if (did_upgrade) {
		await edit_point(user.i, { s: 'u', e: user.e, c, ac });
	}

	let registrations: Registration[] = [];
	if (ac) {
		try {
			registrations = await search_by_payload<Registration>({ s: 'reg', ac }, ['fn', 'ln', 'e', 'sn', 'st', 'ref', 'amt', 'd'], 100);
		} catch (e) {
			console.error('partner dashboard: failed to load registrations', e);
		}
	}

	return {
		email: user.e,
		name: user.n,
		ac,
		ba: user.ba,
		bn: user.bn,
		bk: user.bk,
		registrations
	};
};
