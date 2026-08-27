import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { record_analytics_event } from '$lib/server/analytics';

export const POST: RequestHandler = async ({ request, platform }) => {
	let body: { k?: string; u?: string; c?: string; r?: string; x?: number; y?: number; el?: string } = {};
	try {
		body = await request.json();
	} catch {
		return json({ error: 'bad json' }, { status: 400 });
	}

	const k = (body.k || 'click') as 'pv' | 'click' | 'api' | 'reg_start' | 'reg_success';
	if (!['pv', 'click', 'api', 'reg_start', 'reg_success'].includes(k)) {
		return json({ error: 'bad kind' }, { status: 400 });
	}

	const u = typeof body.u === 'string' ? body.u.slice(0, 500) : request.headers.get('referer')?.slice(0, 500) || '/';
	const c = typeof body.c === 'string' ? body.c.slice(0, 20) : '';
	const r = typeof body.r === 'string' ? body.r.slice(0, 500) : '';
	const el = typeof body.el === 'string' ? body.el.slice(0, 120) : '';

	const ctx = (platform as any)?.ctx as { waitUntil: (p: Promise<unknown>) => void } | undefined;
	const p = record_analytics_event(k, u, request, platform as any, { c, r, sid: el } as any);
	if (ctx?.waitUntil) ctx.waitUntil(p);
	else await p.catch(() => {});

	return json({ ok: true }, { headers: { 'Cache-Control': 'no-store' } });
};
