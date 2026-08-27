import type { PageServerLoad } from './$types';
import { verify_analytics_token } from '$lib/server/analytics_auth';
import { search_by_payload } from '$lib/db';
import type { AnalyticsEvent } from '$lib/server/analytics';

export const prerender = false;

export const load: PageServerLoad = async ({ cookies, url }) => {
	const token = cookies.get('analytics_auth');
	const authed = await verify_analytics_token(token);
	if (!authed) {
		return { authed: false as const };
	}

	const range = url.searchParams.get('range') || '7d';
	const days = range === '30d' ? 30 : range === '24h' ? 1 : 7;
	const since = Date.now() - days * 86400000;

	let events: (AnalyticsEvent & { i: string })[] = [];
	try {
		events = await search_by_payload<AnalyticsEvent & { i: string }>({ s: 'ae' }, true, 200);
	} catch (e) {
		console.warn('[analytics dashboard] search failed', e);
	}

	const filtered = events.filter((e) => (e.d || 0) >= since);
	filtered.sort((a, b) => (b.d || 0) - (a.d || 0));

	const total = filtered.length;
	const pv = filtered.filter((e) => e.k === 'pv').length;
	const clicks = filtered.filter((e) => e.k === 'click').length;
	const unique_ips = new Set(filtered.map((e) => e.ip_hash).filter(Boolean)).size;

	const by_page: Record<string, number> = {};
	const by_ref: Record<string, number> = {};
	const by_country: Record<string, number> = {};
	const by_partner: Record<string, number> = {};
	const by_day: Record<string, number> = {};
	const recent = filtered.slice(0, 50);

	for (const e of filtered) {
		const path = (() => {
			try {
				return new URL(e.u).pathname || e.u;
			} catch {
				return e.u?.slice(0, 80) || '/';
			}
		})();
		by_page[path] = (by_page[path] || 0) + 1;
		const ref = e.r ? (() => { try { return new URL(e.r).hostname; } catch { return e.r.slice(0, 40); } })() : 'direct';
		by_ref[ref] = (by_ref[ref] || 0) + 1;
		const co = (e.co || 'unknown').toUpperCase();
		by_country[co] = (by_country[co] || 0) + 1;
		if (e.c) by_partner[e.c] = (by_partner[e.c] || 0) + 1;
		const day = new Date(e.d).toISOString().slice(0, 10);
		by_day[day] = (by_day[day] || 0) + 1;
	}

	const top_pages = Object.entries(by_page).sort((a, b) => b[1] - a[1]).slice(0, 10);
	const top_refs = Object.entries(by_ref).sort((a, b) => b[1] - a[1]).slice(0, 10);
	const top_countries = Object.entries(by_country).sort((a, b) => b[1] - a[1]).slice(0, 10);
	const top_partners = Object.entries(by_partner).sort((a, b) => b[1] - a[1]).slice(0, 10);
	const trend = Object.entries(by_day).sort((a, b) => a[0].localeCompare(b[0]));

	const live_cut = Date.now() - 30 * 60 * 1000;
	const live = filtered.filter((e) => e.d >= live_cut).length;

	return {
		authed: true as const,
		stats: { total, pv, clicks, unique_ips, live, days },
		top_pages,
		top_refs,
		top_countries,
		top_partners,
		trend,
		recent,
		range
	};
};
