import { json } from '@sveltejs/kit';
import type { RequestHandler } from '@sveltejs/kit';
import { get } from '$lib/db';
import { paystack_init } from '$lib/paystack';
import { dev } from '$app/environment';
import { DEV_REG_FEE, REG_AMOUNT } from '$lib/constants';
import type { Registration } from '$lib/types/registration';

const base_kobo = () => (dev ? DEV_REG_FEE : REG_AMOUNT * 100);

// Initiate the Paystack transaction for an EXISTING pending registration —
// the dashboard 'unlock full access' step. Registration is free; this is the
// optional ₦15,000 (or ₦13,500 with a partner code) payment. The Paystack
// reference IS the registration id (paystack_init reuses it), so the existing
// /payment/callback + /api/verify-payment + webhook confirm path works
// untouched: confirm() looks the reg up by that same reference.
export const POST: RequestHandler = async ({ request, url, locals }) => {
	console.log(`[register-init-payment] === NEW REQUEST ===`);
	try {
		const data = await request.json();
		const id = data.registrationId;
		console.log(`[register-init-payment] registrationId: ${id}`);
		if (!id) {
			console.warn(`[register-init-payment] Rejected: missing registrationId`);
			return json({ error: 'Missing registrationId' }, { status: 400 });
		}
		const reg = await get<Registration>(id);
		if (!reg) {
			console.warn(`[register-init-payment] Rejected: registration ${id} not found`);
			return json({ error: 'Registration not found' }, { status: 404 });
		}
		const owner = locals?.user?.email;
		if (!owner || reg.e !== owner) {
			console.warn(`[register-init-payment] Rejected: ${id} owned by ${reg.e}, session is ${owner ?? 'none'}`);
			return json({ error: 'Not your registration' }, { status: 403 });
		}
		if (reg.st === 'i') {
			console.warn(`[register-init-payment] Rejected: ${id} already unlocked`);
			return json({ error: 'Already unlocked' }, { status: 400 });
		}

		const p_name = `${reg.fn || ''} ${reg.ln || ''}`.trim();
		const phone = locals?.user?.ph?.[0] ? String(locals.user.ph[0]) : '';
		console.log(`[register-init-payment] calling paystack_init for ${id} | email=${reg.e} amount_kobo=${reg.amt} p_name=${p_name}`);
		const result = await paystack_init(reg.e, reg.amt, reg.i as string, p_name, `${url.origin}/payment/callback`, { a: 'beee', regId: reg.i, phone });
		console.log(`[register-init-payment] paystack_init OK for ${id} | access_code=${result.access_code ? 'present' : 'MISSING'} reference=${result.reference}`);

		return json({
			success: true,
			authorization_url: result.authorization_url,
			access_code: result.access_code,
			reference: result.reference,
			registrationId: reg.i,
			amount: reg.amt,
			discounted: reg.amt < base_kobo()
		});
	} catch (err) {
		console.error('[register-init-payment] UNCAUGHT ERROR:', err);
		return json(
			{ error: 'Server error', detail: (err as Error)?.message || String(err) },
			{ status: 500 }
		);
	}
};
