import { json } from '@sveltejs/kit';
import type { RequestHandler } from '@sveltejs/kit';
import { create, get } from '$lib/db';
import { verify_webhook_sig, paystack_verify } from '$lib/paystack';
import type { Registration } from '$lib/types/registration';

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
export const POST: RequestHandler = async ({ request }) => {
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

				// Check if registration already exists (idempotent)
				const existing = await get<Registration>(ref);
				if (existing && existing.st === 'paid') {
					console.log(`Webhook charge.success: ${ref} already paid, skipping`);
					return;
				}

				// Double-verify with Paystack API (never trust webhook payload alone)
				const verified = await paystack_verify(ref);
				if (verified.status !== 'success') {
					console.error(`Webhook: verify returned ${verified.status} for ${ref}`);
					return;
				}

				// Extract registration data from metadata
				const reg_data = verified.metadata?.reg_data as Record<string, unknown> | undefined;
				if (!reg_data) {
					console.error(`Webhook charge.success: no reg_data in metadata for ${ref}`);
					return;
				}

				// Anti-fraud: amount must match what we stored
				const expected_amt = reg_data.amt as number;
				if (verified.amount !== expected_amt) {
					console.error(
						`Webhook amount mismatch for ${ref}: expected ${expected_amt}, got ${verified.amount}`
					);
					return;
				}

				// Write full registration to DB
				const payload: Registration = {
					s: 'reg',
					n: reg_data.n as string,
					e: reg_data.e as string,
					p: reg_data.p as string,
					l: reg_data.l as { lat: number; lng: number; address: string },
					pl: (reg_data.pl || []) as Array<{ name: string; email: string; chessRating: string }>,
					st: 'paid',
					amt: expected_amt,
					d: Date.now(),
					ref: verified.reference
				};

				await create(payload, undefined, ref);
				console.log(`Webhook charge.success: registration ${ref} created with status 'paid'`);
			}
		} catch (err) {
			console.error('Webhook processing error:', err);
		}
	};

	process();

	return new Response(null, { status: 200 });
};
