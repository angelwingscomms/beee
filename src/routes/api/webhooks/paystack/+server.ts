import { json } from '@sveltejs/kit';
import type { RequestHandler } from '@sveltejs/kit';
import bcrypt from 'bcryptjs';
import { create, get, find_or_create_player_user } from '$lib/db';
import { verify_webhook_sig, paystack_verify } from '$lib/paystack';
import { process_affiliate_payout } from '$lib/affiliate';
import type { Registration } from '$lib/types/registration';

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
// 		if (dev) console.log('[webhook] SerpAPI result:', JSON.stringify(data, null, 2));
// 		const pr = data.place_results;
// 		if (pr && Array.isArray(pr.type)) {
// 			return pr.type.some(t => typeof t === 'string' && t.toLowerCase().includes('school')) ? 1 : 0;
// 		}
// 		return 0;
// 	} catch {
// 		return 2;
// 	}
// }

/**
 * Paystack webhook endpoint.
 *
 * Paystack sends POST requests here for payment events.
 * We must:
 *   1. Respond 200 immediately (Paystack retries if we don't)
 *   2. Verify the HMAC SHA512 signature before trusting any data
 *   3. Handle charge.success idempotently
 *
 * Configure this URL in Paystack Dashboard → Settings → API Keys & Webhooks.
 * Paystack IPs: 52.31.139.75, 52.49.173.169, 52.214.14.220
 */
export const POST: RequestHandler = async ({ request, platform }) => {
	console.log(`[POST /api/webhooks/paystack] Webhook event received`);
	const raw = await request.text();
	const signature = request.headers.get('x-paystack-signature') ?? '';
	console.log(`[POST /api/webhooks/paystack] Signature header: ${signature}`);

	if (!signature || !verify_webhook_sig(raw, signature)) {
		console.warn('[POST /api/webhooks/paystack] Paystack webhook: invalid or missing signature');
		return new Response('Unauthorized', { status: 401 });
	}
	console.log(`[POST /api/webhooks/paystack] Signature verified successfully`);

	let event: { event: string; data: Record<string, unknown> };
	try {
		event = JSON.parse(raw);
		console.log(`[POST /api/webhooks/paystack] Parsed event type: ${event.event}`);
	} catch {
		console.error('[POST /api/webhooks/paystack] Failed to parse webhook raw body');
		return new Response('Bad Request', { status: 400 });
	}

	const process = async () => {
		console.log(`[POST /api/webhooks/paystack] [async process] Starting process for event: ${event.event}`);
		try {
			if (event.event === 'charge.success') {
				const ref = event.data.reference as string;

				// Load the local pending registration (password stored here, never in Paystack)
				const reg = await get<Registration>(ref);
				if (!reg) {
					console.error(`Webhook charge.success: no local registration for ${ref}`);
					return;
				}

				// Check if registration already exists (idempotent)
				if (reg.st === 'paid') {
					console.log(`Webhook charge.success: ${ref} already paid, skipping`);
					return;
				}

				// Double-verify with Paystack API (never trust webhook payload alone)
				const verified = await paystack_verify(ref);
				if (verified.status !== 'success') {
					console.error(`Webhook: verify returned ${verified.status} for ${ref}`);
					return;
				}

				// Anti-fraud: amount must match what we stored locally
				const expected_amt = reg.amt;
				if (verified.amount !== expected_amt) {
					console.error(
						`Webhook amount mismatch for ${ref}: expected ${expected_amt}, got ${verified.amount}`
					);
					return;
				}

				// Write full registration to DB (no password persisted)
			const payload: Registration = {
				s: 'reg',
				fn: reg.fn,
				ln: reg.ln,
				sn: reg.sn,
				e: reg.e,
				p: reg.p,
				st: 'paid',
				v: 0,
				amt: expected_amt,
				d: Date.now(),
				ref: verified.reference,
				ac: reg.ac
			};

				await create(payload, undefined, ref);
				console.log(`Webhook charge.success: registration ${ref} created with status 'paid'`);

				// Create or update player user account (hash the password stored on the pending record)
				const email = reg.e;
				const pw = reg.pw;
				let ph: string | undefined;
				if (pw) ph = await bcrypt.hash(pw, 10);
				const user_id = await find_or_create_player_user(email, `${reg.fn || ''} ${reg.ln || ''}`.trim(), ph);
				console.log(`Webhook charge.success: user ${user_id} created/updated for ${email}`);

				// Fire-and-forget affiliate payout
				process_affiliate_payout(reg, ref, platform).catch(e =>
					console.error(`[webhook payout] Failed for ${ref}:`, e)
				);
			}
		} catch (err) {
			console.error('Webhook processing error:', err);
		}
	};

	process();

	return new Response(null, { status: 200 });
};
