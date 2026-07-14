import { json } from '@sveltejs/kit';
import type { RequestHandler } from '@sveltejs/kit';
import bcrypt from 'bcryptjs';
import { create, get, find_or_create_player_user } from '$lib/db';
import { verify_webhook_sig, paystack_verify } from '$lib/paystack';
import { process_partner_payout, reconcile_transfer_payout } from '$lib/partner';
import type { Registration } from '$lib/types/registration';

export const POST: RequestHandler = async ({ request, platform }) => {
	const raw = await request.text();
	const signature = request.headers.get('x-paystack-signature') ?? '';
	if (!signature || !(await verify_webhook_sig(raw, signature))) {
		return new Response('Unauthorized', { status: 401 });
	}
	let event: { event: string; data: Record<string, unknown> };
	try {
		event = JSON.parse(raw);
	} catch {
		return new Response('Bad Request', { status: 400 });
	}

	const process = async () => {
		try {
			if (event.event === 'transfer.success' || event.event === 'transfer.failed' || event.event === 'transfer.reversed') {
				const ref = event.data.reference as string;
				const st = event.event === 'transfer.success' ? 'success' : event.event === 'transfer.reversed' ? 'reversed' : 'failed';
				await reconcile_transfer_payout(ref, st);
				return;
			}
			if (event.event === 'charge.success') {
				const ref = event.data.reference as string;
				const reg = await get<Registration>(ref);
				if (!reg) {
					console.error(`Webhook charge.success: no local registration for ${ref}`);
					return;
				}
				if (reg.st === 'paid') {
					console.log(`Webhook charge.success: ${ref} already paid, skipping`);
					return;
				}
				const verified = await paystack_verify(ref);
				if (verified.status !== 'success') {
					console.error(`Webhook: verify returned ${verified.status} for ${ref}`);
					return;
				}
				const expected_amt = reg.amt;
				if (verified.amount !== expected_amt) {
					console.error(`Webhook amount mismatch for ${ref}: expected ${expected_amt}, got ${verified.amount}`);
					return;
				}
				const payload: Registration = {
					s: 'reg', fn: reg.fn, ln: reg.ln, sn: reg.sn, e: reg.e, p: reg.p,
					st: 'paid', v: 0, amt: expected_amt, d: Date.now(),
					ref: verified.reference, ac: reg.ac
				};
				await create(payload, undefined, ref);
				console.log(`Webhook charge.success: registration ${ref} created with status 'paid'`);
				const email = reg.e;
				const pw = reg.pw;
				let ph: string | undefined;
				if (pw) ph = await bcrypt.hash(pw, 10);
				await find_or_create_player_user(email, `${reg.fn || ''} ${reg.ln || ''}`.trim(), ph);
				process_partner_payout(reg, ref, platform).catch(e =>
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
