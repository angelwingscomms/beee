import { dev } from '$app/environment';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from '@sveltejs/kit';
import { SERPAPI_KEY } from '$env/static/private';
import { create, get } from '$lib/db';
import { paystack_verify } from '$lib/paystack';
import type { Registration } from '$lib/types/registration';

async function search_maps(q: string): Promise<0 | 1 | 2> {
	try {
		const p = new URLSearchParams({
			engine: 'google_maps',
			q,
			ll: '@9.076,7.398,15z',
			hl: 'en',
			gl: 'ng'
		});
		const res = await fetch(`https://serpapi.com/search.json?${p}&api_key=${SERPAPI_KEY}`);
		const data = await res.json();
		if (dev) console.log('[verify-payment] SerpAPI result:', JSON.stringify(data, null, 2));
		const pr = data.place_results;
		if (pr && Array.isArray(pr.type)) {
			return pr.type.some(t => typeof t === 'string' && t.toLowerCase().includes('school')) ? 1 : 0;
		}
		return 0;
	} catch {
		return 2;
	}
}

export const POST: RequestHandler = async ({ request }) => {
	console.log(`[POST /api/verify-payment] Received payment verification request`);
	try {
		const data = await request.json();
		console.log(`[POST /api/verify-payment] Request body:`, JSON.stringify(data));

		if (!data.reference) {
			console.warn(`[POST /api/verify-payment] Missing reference`);
			return json({ error: 'Missing reference' }, { status: 400 });
		}

		const reg_id = data.registrationId || data.reference;
		console.log(`[POST /api/verify-payment] Checking if registration already exists in DB: ${reg_id}`);
		const existing = await get<Registration>(reg_id);
		if (existing && existing.st === 'paid') {
			console.log(`[POST /api/verify-payment] Registration ${reg_id} is already paid (idempotent path)`);
			return json({ success: true, status: 'success', message: 'Already verified' });
		}

		console.log(`[POST /api/verify-payment] Calling paystack_verify with reference: ${data.reference}...`);
		const verified = await paystack_verify(data.reference);
		console.log(`[POST /api/verify-payment] paystack_verify returned status: ${verified.status}`);

		if (verified.status !== 'success') {
			console.warn(`[POST /api/verify-payment] Payment was not successful, status: ${verified.status}`);
			return json(
				{ error: `Payment not successful: ${verified.status}` },
				{ status: 402 }
			);
		}

		// Extract registration data from Paystack metadata (stored during init)
		const reg_data = verified.metadata?.reg_data as Record<string, unknown> | undefined;
		if (!reg_data) {
			console.error(`[POST /api/verify-payment] No reg_data found in Paystack metadata for ${reg_id}`);
			return json({ error: 'Registration data not found in payment metadata' }, { status: 500 });
		}

		// Anti-fraud: confirm amount matches what we init'd
		const expected_amt = reg_data.amt as number;
		if (verified.amount !== expected_amt) {
			console.error(
				`[POST /api/verify-payment] Amount mismatch for ${reg_id}: expected ${expected_amt}, got ${verified.amount}`
			);
			return json({ error: 'Amount mismatch' }, { status: 400 });
		}

		// Look up school on Google Maps via Serper to verify it's a school
		const school_name = reg_data.n as string;
		console.log(`[POST /api/verify-payment] Searching maps for school: "${school_name}"...`);
		const v = await search_maps(school_name);
		console.log(`[POST /api/verify-payment] Maps lookup result for "${school_name}": v=${v}`);

		// Write full registration to DB now that payment is confirmed
		console.log(`[POST /api/verify-payment] Payment confirmed! Writing registration to DB for ID: ${reg_id}...`);
		const payload: Registration = {
			s: 'reg',
			n: reg_data.n as string,
			p: reg_data.p as string,
			pl: (reg_data.pl || []) as Array<{ name: string; email: string; phone: string }>,
			st: 'paid',
			v,
			amt: expected_amt,
			d: Date.now(),
			ref: verified.reference
		};

		await create(payload, undefined, reg_id);
		console.log(`[POST /api/verify-payment] Registration written to DB successfully with status 'paid'`);

		return json({ success: true, status: 'success', message: 'Payment verified and registration confirmed' });
	} catch (error) {
		console.error('[POST /api/verify-payment] Exception caught:', error);
		return json({ error: 'Failed to verify payment' }, { status: 500 });
	}
};
