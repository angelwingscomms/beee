// Shared Paystack utilities — server-side only
// All amounts are in kobo (NGN × 100)

import {
	PAYSTACK_TEST,
	PAYSTACK_SECRET_KEY,
	PAYSTACK_SECRET_KEY_TEST,
	PAYSTACK_SECRET_KEY_LIVE,
} from '$env/static/private';
import { dev } from '$app/environment';
import { createHmac } from 'crypto';

console.log('[paystack] module loaded');

function mask(s: string): string {
	if (!s) return '(empty)';
	return s.length < 12 ? s : s.substring(0, 6) + '...' + s.slice(-4);
}

const BASE = 'https://api.paystack.co';

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

/** Get secret key dynamically based on PAYSTACK_TEST config or SvelteKit environment */
export function get_secret_key(): string {
	const is_test = PAYSTACK_TEST !== undefined && PAYSTACK_TEST !== null
		? PAYSTACK_TEST === '.'
		: dev;
	console.log(`[paystack] get_secret_key: PAYSTACK_TEST=${PAYSTACK_TEST}, dev=${dev}, is_test=${is_test}`);

	const all_keys = {
		test: PAYSTACK_SECRET_KEY_TEST ? mask(PAYSTACK_SECRET_KEY_TEST) : 'unset',
		live: PAYSTACK_SECRET_KEY_LIVE ? mask(PAYSTACK_SECRET_KEY_LIVE) : 'unset',
		legacy: PAYSTACK_SECRET_KEY ? mask(PAYSTACK_SECRET_KEY) : 'unset',
	};
	console.log(`[paystack] get_secret_key: all available keys`, all_keys);

	const key = is_test
		? (PAYSTACK_SECRET_KEY_TEST || PAYSTACK_SECRET_KEY)
		: (PAYSTACK_SECRET_KEY_LIVE || PAYSTACK_SECRET_KEY);
	console.log(`[paystack] get_secret_key: resolved key ${key ? mask(key) : 'EMPTY'}`);
	return key || '';
}

/** Initialize a Paystack transaction. Returns authorization_url to redirect user to. */
export async function paystack_init(
	email: string,
	amount_kobo: number,
	registration_id: string,
	p_name: string,
	callback_url: string,
	reg_data?: Record<string, unknown>
): Promise<PaystackInitResult> {
	const secret_key = get_secret_key();
	console.log(`[paystack_init] Starting transaction initialize`, {
		email,
		amount_kobo,
		registration_id,
		p_name,
		callback_url,
		has_reg_data: !!reg_data,
		secret_key_preview: secret_key ? secret_key.substring(0, 10) + '...' : 'undefined'
	});

	try {
		const metadata: Record<string, unknown> = {
			registration_id,
			p_name,
			custom_fields: [
				{
					display_name: 'Participant Name',
					variable_name: 'p_name',
					value: p_name
				},
				{
					display_name: 'Registration ID',
					variable_name: 'registration_id',
					value: registration_id
				}
			]
		};

		if (reg_data) {
			metadata.reg_data = reg_data;
		}

		const res = await fetch(`${BASE}/transaction/initialize`, {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${secret_key}`,
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				email,
				amount: amount_kobo,
				reference: registration_id,
				callback_url,
				metadata: JSON.stringify(metadata)
			})
		});

		console.log(`[paystack_init] Response status: ${res.status} ${res.statusText}`);

		if (!res.ok) {
			const err = await res.text();
			console.error(`[paystack_init] Error response body:`, err);
			throw new Error(`Paystack init failed: ${err}`);
		}

		const body = await res.json();
		console.log(`[paystack_init] Success response body:`, JSON.stringify(body));

		if (!body.status) {
			console.error(`[paystack_init] status was false in response body:`, body.message);
			throw new Error(`Paystack init error: ${body.message}`);
		}

		return body.data as PaystackInitResult;
	} catch (error) {
		console.error(`[paystack_init] Exception thrown:`, error);
		throw error;
	}
}

/** Verify a transaction by reference. Always verify server-side after callback. */
export async function paystack_verify(
	reference: string
): Promise<PaystackVerifyResult> {
	const secret_key = get_secret_key();
	console.log(`[paystack_verify] Starting transaction verification`, {
		reference,
		secret_key_preview: secret_key ? secret_key.substring(0, 10) + '...' : 'undefined'
	});

	try {
		const res = await fetch(
			`${BASE}/transaction/verify/${encodeURIComponent(reference)}`,
			{
				headers: {
					Authorization: `Bearer ${secret_key}`,
					'Content-Type': 'application/json'
				}
			}
		);

		console.log(`[paystack_verify] Response status: ${res.status} ${res.statusText}`);

		if (!res.ok) {
			const err = await res.text();
			console.error(`[paystack_verify] Error response body:`, err);
			throw new Error(`Paystack verify failed: ${err}`);
		}

		const body = await res.json();
		console.log(`[paystack_verify] Success response body:`, JSON.stringify(body));

		if (!body.status) {
			console.error(`[paystack_verify] status was false in response body:`, body.message);
			throw new Error(`Paystack verify error: ${body.message}`);
		}

		return body.data as PaystackVerifyResult;
	} catch (error) {
		console.error(`[paystack_verify] Exception thrown:`, error);
		throw error;
	}
}

/**
 * Verify the HMAC SHA512 signature on an incoming Paystack webhook.
 * raw_body must be the raw request body string — not a parsed object.
 */
export function verify_webhook_sig(
	raw_body: string,
	signature: string
): boolean {
	const secret_key = get_secret_key();
	console.log(`[verify_webhook_sig] Starting signature check`, {
		signature,
		body_length: raw_body.length,
		secret_key_preview: secret_key ? secret_key.substring(0, 10) + '...' : 'undefined'
	});

	if (!secret_key) {
		console.error(`[verify_webhook_sig] Secret key is empty, cannot compute hash`);
		return false;
	}

	const hash = createHmac('sha512', secret_key)
		.update(raw_body)
		.digest('hex');

	const match = hash === signature;
	console.log(`[verify_webhook_sig] Check completed`, {
		match,
		computed: hash.substring(0, 10) + '...'
	});

	return match;
}
