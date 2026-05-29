import { json } from '@sveltejs/kit';
import type { RequestHandler } from '@sveltejs/kit';
import { get, set } from '$lib/db';
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
	// Read RAW body — must not parse before verifying signature
	const raw = await request.text();
	const signature = request.headers.get('x-paystack-signature') ?? '';
	console.log(`[POST /api/webhooks/paystack] Signature header: ${signature}`);

	// Reject immediately if signature is missing or invalid
	if (!signature || !verify_webhook_sig(raw, signature)) {
		console.warn('[POST /api/webhooks/paystack] Paystack webhook: invalid or missing signature');
		return new Response('Unauthorized', { status: 401 });
	}
	console.log(`[POST /api/webhooks/paystack] Signature verified successfully`);

	// Parse after verification
	let event: { event: string; data: Record<string, unknown> };
	try {
		event = JSON.parse(raw);
		console.log(`[POST /api/webhooks/paystack] Parsed event type: ${event.event}`);
	} catch {
		console.error('[POST /api/webhooks/paystack] Failed to parse webhook raw body');
		return new Response('Bad Request', { status: 400 });
	}

	// Respond 200 immediately so Paystack doesn't retry
	// Process asynchronously (fire-and-forget after returning)
	const process = async () => {
		console.log(`[POST /api/webhooks/paystack] [async process] Starting process for event: ${event.event}`);
		try {
			if (event.event === 'charge.success') {
				const ref = event.data.reference as string;

				// The reference IS the registrationId (set during init)
				const reg = await get<Registration>(ref);
				console.log(`[POST /api/webhooks/paystack] [async process] DB registration retrieved:`, JSON.stringify(reg));
				if (!reg) {
					console.error(`Webhook charge.success: registration not found for ref ${ref}`);
					return;
				}

				// Idempotent — skip if already marked paid
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

				// Anti-fraud: amount must match what we stored
				if (verified.amount !== reg.amt) {
					console.error(
						`Webhook amount mismatch for ${ref}: expected ${reg.amt}, got ${verified.amount}`
					);
					return;
				}

				await set(ref, { st: 'paid', ref: verified.reference });
				console.log(`Webhook charge.success: marked ${ref} as paid`);
			}
		} catch (err) {
			console.error('Webhook processing error:', err);
		}
	};

	// Non-blocking — respond before processing
	process();

	return new Response(null, { status: 200 });
};
