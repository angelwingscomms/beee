import { redirect } from '@sveltejs/kit';
import { env as dyn } from '$env/dynamic/private';
import { find_user_by_email, search_by_payload } from '$lib/db';
import { E4_URL } from '$lib/constants';
import type { User } from '$lib/types';
import type { Registration } from '$lib/types/registration';

export interface DashboardProfile {
	i: string;
	n?: string;
	d: number;
	c?: string[];
	ac?: string;
}

export interface E4Link {
	joined?: number;
	balance: number;
	games: number;
}

export interface Badge {
	label: string;
	done: boolean;
	hint: string;
}

export function derive_badges(
	registrations: Registration[],
	profile: DashboardProfile | null,
	e4: E4Link | null
): Badge[] {
	const classes = profile?.c || [];
	return [
		{
			label: 'Registered',
			done: registrations.length > 0,
			hint: 'Signed up for the championship'
		},
		{
			label: 'Payment Confirmed',
			done: registrations.some((r) => r.st === 'paid'),
			hint: 'Registration fee paid'
		},
		{
			label: 'T.E.A.M.U.P. Enrolled',
			done: classes.includes('rpb'),
			hint: 'Qualified for the development stage'
		},
		{
			label: 'Partner',
			done: classes.includes('fab'),
			hint: 'BEEE referral partner'
		},
		{
			label: 'E4 Linked',
			done: !!e4,
			hint: 'Connected chess coach account'
		}
	];
}

export interface DashboardData {
	user: { id: string; name?: string; email?: string; picture?: string };
	profile: DashboardProfile | null;
	registrations: Registration[];
	e4: E4Link | null;
	badges: Badge[];
	e4Url: string;
}

async function load_e4(email: string): Promise<E4Link | null> {
	try {
		const eu = await search_by_payload<{ i: string; d?: number }>({ s: 'u', e: email });
		if (!eu.length) return null;
		const sub = eu[0].i.replace(/^u_/, '');
		const bal = await search_by_payload<{ t?: number }>({ u: sub }, ['t'], 50);
		const balance = (bal.find((p) => typeof p.t === 'number')?.t as number) || 0;
		const games = await search_by_payload<{ s: 'g' }>({ s: 'g', u: sub }, false, 1000);
		return { joined: eu[0].d, balance, games: games.length };
	} catch {
		return null;
	}
}

export async function load_dashboard(locals: App.Locals): Promise<DashboardData> {
	const user = locals.user;
	if (!user) redirect(302, '/login?next=/dashboard');

	const email = user.email ?? '';
	const profile = (await find_user_by_email(email)) as (User & { i: string }) | undefined;
	const registrations = await search_by_payload<Registration>({ s: 'reg', e: email });
	const e4 = await load_e4(email);
	const badges = derive_badges(registrations, profile ? (profile as DashboardProfile) : null, e4);
	const base = (dyn.E4_URL as string) || E4_URL;
	const e4Url = `${base}/login/google`;

	return {
		user: { id: user.id, name: user.name, email: user.email, picture: user.picture },
		profile: profile ? (profile as DashboardProfile) : null,
		registrations,
		e4,
		badges,
		e4Url
	};
}
