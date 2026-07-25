import type { PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';
import Sqids from 'sqids';
import { find_user_by_email, search_by_payload, edit_point } from '$lib/db';
import type { User } from '$lib/types';
import type { Registration } from '$lib/types/registration';

const sqids = new Sqids({ minLength: 6 });

export const load: PageServerLoad = async ({ locals }) => {
	console.log('[partner dashboard] === LOAD ===');
	console.log('[partner dashboard] locals.user:', locals.user ? JSON.stringify({ id: locals.user.id, email: locals.user.email }) : 'null');

	if (!locals.user) {
		console.log('[partner dashboard] no user -> redirect to login');
		throw redirect(302, '/login/google?next=/dashboard/partner');
	}

	const email = locals.user.email ?? '';
	console.log('[partner dashboard] email from session:', email);

	console.log('[partner dashboard] looking up user by email...');
	const user = await find_user_by_email(email) as (User & { i: string }) | undefined;
	if (!user) {
		console.warn('[partner dashboard] user not found in DB -> redirect to login');
		throw redirect(302, '/login/google?next=/dashboard/partner');
	}
	console.log('[partner dashboard] user found, id:', user.i, 'classifications:', user.c, 'ac:', user.ac);

	let c = user.c ?? [];
	let ac = user.ac;
	let did_upgrade = false;
	if (!c.includes('fab')) {
		console.log('[partner dashboard] user missing fab classification, adding it');
		c = [...c, 'fab'];
		did_upgrade = true;
	}
	if (!ac) {
		ac = sqids.encode([Math.floor(Date.now() / 1000), Math.floor(Math.random() * 9000) + 1000]);
		console.log('[partner dashboard] no partner code, generated:', ac);
		did_upgrade = true;
	}
	if (did_upgrade) {
		console.log('[partner dashboard] upgrading user in DB with c:', c, 'ac:', ac);
		await edit_point(user.i, { s: 'u', e: user.e, c, ac });
		console.log('[partner dashboard] upgrade complete');
	}

	let registrations: Registration[] = [];
	if (ac) {
		console.log('[partner dashboard] fetching registrations for ac:', ac);
		try {
			registrations = await search_by_payload<Registration>({ s: 'reg', ac }, ['fn', 'ln', 'e', 'sn', 'st', 'ref', 'amt', 'd'], 100);
			console.log('[partner dashboard] registrations found:', registrations.length);
		} catch (e) {
			console.error('[partner dashboard] failed to load registrations', e);
		}
	} else {
		console.log('[partner dashboard] no ac, skipping registration fetch');
	}

	console.log('[partner dashboard] returning data');
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
