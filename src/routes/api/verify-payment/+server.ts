import { json } from '@sveltejs/kit';
import type { RequestHandler } from '@sveltejs/kit';
import { encode_session } from '$lib/server/session';
import { confirm } from '$lib/confirm';

// async function search_maps(q: string): Promise<0 | 1 | 2> {
// 	try {
// 		const p = new URLSearchParams({
// 			engine: 'google_maps',
// 			q,
// 			ll: '@9.076,7.398,15z',
// 			hl: 'en',
// 			gl: 'ng'
// 		});
// 		const res = await fetch(`https://serpapi.com/search.json?${p}&api_key=${SERPAPI_KEY}`);
// 		const data = await res.json();
// 		if (dev) console.log('[verify-payment] SerpAPI result:', JSON.stringify(data, null, 2));
// 		const pr = data.place_results;
// 		if (pr && Array.isArray(pr.type)) {
// 			return pr.type.some(t => typeof t === 'string' && t.toLowerCase().includes('school')) ? 1 : 0;
// 		}
// 		return 0;
// 	} catch {
// 		return 2;
// 	}
// }

export const POST: RequestHandler = async ({ request, cookies, platform }) => {
	console.log(`[POST /api/verify-payment] Received payment verification request`);
	try {
		const data = await request.json();
		console.log(`[POST /api/verify-payment] Request body:`, JSON.stringify(data));

		if (!data.reference) {
			console.warn(`[POST /api/verify-payment] Missing reference`);
			return json({ error: 'Missing reference' }, { status: 400 });
		}

		const r = await confirm(data.reference, platform);
		if (!r.ok) {
			const code = r.code ?? 500;
			console.warn(`[POST /api/verify-payment] confirm failed (${code}): ${r.error}`);
			return json({ error: r.error }, { status: code });
		}

		if (r.status === 'already') {
			return json({ success: true, status: 'success', message: 'Already verified' });
		}

		const session = await encode_session({ id: r.user_id!, email: r.email!, name: r.name! });
		cookies.set('session', session, { path: '/', httpOnly: true, maxAge: 604800, sameSite: 'lax' });

		return json({ success: true, status: 'success', message: 'Payment verified and registration confirmed', redirect: '/dashboard', userId: r.user_id });
	} catch (error) {
		console.error('[POST /api/verify-payment] Exception caught:', error);
		return json({ error: 'Failed to verify payment' }, { status: 500 });
	}
};
