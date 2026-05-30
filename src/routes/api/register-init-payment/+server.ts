import { json } from '@sveltejs/kit';
import type { RequestHandler } from '@sveltejs/kit';
import { new_id } from '$lib/db';
import { paystack_init } from '$lib/paystack';

const AMOUNT_KOBO = 1_250_000;

export const POST: RequestHandler = async ({ request, url }) => {
	console.log(`[POST /api/register-init-payment] Received request`);
	try {
		const data = await request.json();
		console.log(`[POST /api/register-init-payment] Request body:`, JSON.stringify(data));

		if (!data.schoolName || !data.playerName || !data.playerEmail || !data.playerPhone) {
			console.warn(`[POST /api/register-init-payment] Missing required fields`);
			return json({ error: 'Missing required fields' }, { status: 400 });
		}

		const i = new_id();

		const reg_data = {
			s: 'reg',
			sn: data.schoolName,
			n: data.playerName,
			e: data.playerEmail,
			p: data.playerPhone,
			amt: AMOUNT_KOBO
		};

		console.log(`[POST /api/register-init-payment] Generated ID: ${i}, initializing Paystack...`);
		const callback_url = `${url.origin}/payment/callback`;

		const result = await paystack_init(
			data.playerEmail,
			AMOUNT_KOBO,
			i,
			data.schoolName,
			callback_url,
			reg_data
		);

		console.log(`[POST /api/register-init-payment] Paystack init succeeded, ref: ${result.reference}`);
		console.log(`[POST /api/register-init-payment] NOT writing to DB — waiting for payment confirmation`);

		return json({
			success: true,
			authorization_url: result.authorization_url,
			access_code: result.access_code,
			reference: result.reference,
			registrationId: i
		});
	} catch (error) {
		console.error('[POST /api/register-init-payment] Exception caught:', error);
		return json({ error: 'Failed to initialize registration payment' }, { status: 500 });
	}
};
