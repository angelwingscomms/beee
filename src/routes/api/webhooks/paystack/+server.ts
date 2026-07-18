import { json } from '@sveltejs/kit';
import type { RequestHandler } from '@sveltejs/kit';
import { verify_webhook_sig } from '$lib/paystack';
import { reconcile_transfer_payout } from '$lib/partner';
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

	if (!signature || !(await verify_webhook_sig(raw, signature))) {
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
				// Reconcile partner payout terminal status from transfer events.
				if (event.event === 'transfer.success' || event.event === 'transfer.failed' || event.event === 'transfer.reversed') {
					const ref = event.data.reference as string;
					const st = event.event === 'transfer.success' ? 's' : event.event === 'transfer.reversed' ? 'v' : 'f';
					console.log(`[POST /api/webhooks/paystack] Transfer event ${event.event} for ref ${ref} -> ${st}`);
					await reconcile_transfer_payout(ref, st);
					return;
				}

				if (event.event === 'charge.success') {
				const ref = event.data.reference as string;
				console.log(`[POST /api/webhooks/paystack] charge.success for ${ref} -> confirm()`);
				await confirm(ref, platform);
			}
		} catch (err) {
			console.error('Webhook processing error:', err);
		}
	};

	process();

	return new Response(null, { status: 200 });
};
