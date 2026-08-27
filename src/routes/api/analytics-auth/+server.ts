import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import {
	verify_password,
	create_analytics_token,
	ANALYTICS_COOKIE,
	check_rate_limit,
	record_fail,
	clear_attempts
} from '$lib/server/analytics_auth';

export const POST: RequestHandler = async ({ request, cookies, getClientAddress }) => {
	const ip = getClientAddress() || request.headers.get('cf-connecting-ip') || 'unknown';
	const rl = check_rate_limit(ip);
	if (!rl.allowed) {
		return json({ error: `too many attempts, try again in ${rl.retry_after}s` }, { status: 429, headers: { 'Cache-Control': 'no-store' } });
	}

	let body: { password?: string } = {};
	try {
		body = await request.json();
	} catch {
		return json({ error: 'invalid body' }, { status: 400, headers: { 'Cache-Control': 'no-store' } });
	}

	const pw = typeof body.password === 'string' ? body.password : '';
	if (!pw) {
		record_fail(ip);
		await new Promise((r) => setTimeout(r, 400));
		return json({ error: 'invalid password' }, { status: 401, headers: { 'Cache-Control': 'no-store' } });
	}

	const ok = await verify_password(pw);
	if (!ok) {
		record_fail(ip);
		await new Promise((r) => setTimeout(r, 500));
		return json({ error: 'invalid password' }, { status: 401, headers: { 'Cache-Control': 'no-store' } });
	}

	clear_attempts(ip);
	const token = await create_analytics_token();
	cookies.set('analytics_auth', token, ANALYTICS_COOKIE as any);

	return json({ success: true }, { headers: { 'Cache-Control': 'no-store' } });
};

export const DELETE: RequestHandler = async ({ cookies }) => {
	cookies.delete('analytics_auth', { path: '/369' });
	return json({ success: true });
};
