import { json } from '@sveltejs/kit';
import type { RequestHandler } from '@sveltejs/kit';
import { SERPER_API_KEY } from '$env/static/private';
import { create, get } from '$lib/db';
import { paystack_verify } from '$lib/paystack';
import type { Registration } from '$lib/types/registration';

async function search_maps(q: string): Promise<boolean> {
	try {
		const res = await fetch('https://google.serper.dev/places', {
			method: 'POST',
			headers: {
				'X-API-KEY': SERPER_API_KEY,
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ q, gl: 'ng', hl: 'en' })
		});
		const data = await res.json();
		if (data.places?.length > 0) {
			for (const place of data.places) {
				const types = [place.type, place.category, ...(place.types || [])].filter(Boolean);
				if (types.some(t => typeof t === 'string' && t.toLowerCase().includes('school'))) {
					return true;
				}
			}
		}
		return false;
	} catch (e) {
		console.error('[verify-payment] Serper API error:', e);
		return false;
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
		const is_school = await search_maps(school_name);
		const v: 0 | 1 = is_school ? 1 : 0;
		console.log(`[POST /api/verify-payment] Maps lookup result: is_school=${is_school}, v=${v}`);

		// Write full registration to DB now that payment is confirmed
		console.log(`[POST /api/verify-payment] Payment confirmed! Writing registration to DB for ID: ${reg_id}...`);
		const payload: Registration = {
			s: 'reg',
			n: reg_data.n as string,
			e: reg_data.e as string,
			p: reg_data.p as string,
			pl: (reg_data.pl || []) as Array<{ name: string; email: string; chessRating: string }>,
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
