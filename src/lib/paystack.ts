// Shared Paystack utilities — server-side only
// All amounts are in kobo (NGN × 100)

import { PAYSTACK_SECRET_KEY } from '$env/static/private';
import { createHmac } from 'crypto';

const BASE = 'https://api.paystack.co';

const headers = () => ({
	Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
	'Content-Type': 'application/json'
});

export interface PaystackInitResult {
	authorization_url: string;
	access_code: string;
	reference: string;
}

export interface PaystackVerifyResult {
	status: string; // 'success' | 'failed' | 'abandoned' | 'pending'
	reference: string;
	amount: number; // in kobo
	customer: { email: string };
	metadata: Record<string, unknown>;
}

/** Initialize a Paystack transaction. Returns authorization_url to redirect user to. */
export async function paystack_init(
	email: string,
	amount_kobo: number,
	registration_id: string,
	school_name: string,
	callback_url: string
): Promise<PaystackInitResult> {
	const res = await fetch(`${BASE}/transaction/initialize`, {
		method: 'POST',
		headers: headers(),
		body: JSON.stringify({
			email,
			amount: amount_kobo,
			// Use registration_id as reference so we can look up on callback/webhook
			reference: registration_id,
			callback_url,
			metadata: JSON.stringify({
				registration_id,
				school_name,
				custom_fields: [
					{
						display_name: 'School Name',
						variable_name: 'school_name',
						value: school_name
					},
					{
						display_name: 'Registration ID',
						variable_name: 'registration_id',
						value: registration_id
					}
				]
			})
		})
	});

	if (!res.ok) {
		const err = await res.text();
		throw new Error(`Paystack init failed: ${err}`);
	}

	const body = await res.json();
	if (!body.status) throw new Error(`Paystack init error: ${body.message}`);
	return body.data as PaystackInitResult;
}

/** Verify a transaction by reference. Always verify server-side after callback. */
export async function paystack_verify(
	reference: string
): Promise<PaystackVerifyResult> {
	const res = await fetch(
		`${BASE}/transaction/verify/${encodeURIComponent(reference)}`,
		{ headers: headers() }
	);

	if (!res.ok) {
		const err = await res.text();
		throw new Error(`Paystack verify failed: ${err}`);
	}

	const body = await res.json();
	if (!body.status) throw new Error(`Paystack verify error: ${body.message}`);
	return body.data as PaystackVerifyResult;
}

/**
 * Verify the HMAC SHA512 signature on an incoming Paystack webhook.
 * raw_body must be the raw request body string — not a parsed object.
 */
export function verify_webhook_sig(
	raw_body: string,
	signature: string
): boolean {
	const hash = createHmac('sha512', PAYSTACK_SECRET_KEY)
		.update(raw_body)
		.digest('hex');
	return hash === signature;
}
