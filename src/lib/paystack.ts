// Shared Paystack utilities , server-side only
// All amounts are in kobo (NGN × 100)

import { dev } from '$app/environment';
import { createHmac } from 'crypto';
import { get_secret } from '$lib/server/secrets';
import { banks } from '$lib/data/banks';

console.log('[paystack] module loaded');

// All Paystack payment channels we offer. Passing the full list on
// transaction/initialize makes the Checkout show every method (card, bank
// transfer, USSD, QR, mobile money, EFT, PayAttitude) instead of defaulting
// to card only. Channels unsupported in a given country are simply hidden by
// Paystack , safe to list them all.
const PAYMENT_CHANNELS = [
  'card',
  'bank',
  'ussd',
  'qr',
  'mobile_money',
  'bank_transfer',
  'eft',
  'payattitude',
  'apple_pay'
];

function mask(s: string): string {
  if (!s) return '(empty)';
  return s.length < 12 ? s : s.substring(0, 6) + '...' + s.slice(-4);
}

let _base: string | null = null;

async function resolve_base(): Promise<string> {
	if (_base === null) {
		_base = (await get_secret('PAYSTACK_BASE_URL')) || 'https://api.paystack.co';
	}
	return _base;
}

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
export async function get_secret_key(): Promise<string> {
  const paystack_test = await get_secret('PAYSTACK_TEST');
  const is_test = paystack_test !== undefined && paystack_test !== null
    ? paystack_test === '.'
    : dev;
  console.log(`[paystack] get_secret_key: PAYSTACK_TEST=${paystack_test}, dev=${dev}, is_test=${is_test}`);

  const key_test = await get_secret('PAYSTACK_SECRET_KEY_TEST');
  const key_live = await get_secret('PAYSTACK_SECRET_KEY_LIVE');
  const all_keys = {
    test: key_test ? mask(key_test) : 'unset',
    live: key_live ? mask(key_live) : 'unset',
  };
  console.log(`[paystack] get_secret_key: all available keys`, all_keys);

  const key = is_test ? key_test : key_live;
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
  const secret_key = await get_secret_key();
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

    const res = await fetch(`${await resolve_base()}/transaction/initialize`, {
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
        channels: PAYMENT_CHANNELS,
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
  const secret_key = await get_secret_key();
  console.log(`[paystack_verify] Starting transaction verification`, {
    reference,
    secret_key_preview: secret_key ? secret_key.substring(0, 10) + '...' : 'undefined'
  });

  try {
    const res = await fetch(
      `${await resolve_base()}/transaction/verify/${encodeURIComponent(reference)}`,
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

// ── Bank code resolution ──────────────────────────────────
// Single source of truth: the canonical list in src/lib/data/banks.ts (the
// same data the partner settings UI uses). Resolving by bank name + aliases
// keeps payouts consistent with what the UI shows.

const BANK_LOOKUP: Record<string, string> = {};
for (const b of banks) {
  BANK_LOOKUP[b.n.trim().toLowerCase()] = b.c;
  for (const alias of b.a) BANK_LOOKUP[alias.trim().toLowerCase()] = b.c;
}

export function get_bank_code(bn: string): string | null {
  const key = bn.trim().toLowerCase().replace(/\s+/g, ' ');
  return BANK_LOOKUP[key] || null;
}

// ── Transfer API ───────────────────────────────────────────

export async function paystack_resolve_bank(account_number: string, bank_code: string): Promise<{ account_name: string }> {
  const secret_key = await get_secret_key();
  console.log(`[paystack_resolve_bank] resolving account ${account_number ? account_number.slice(0, 4) + '...' : 'EMPTY'} bank_code=${bank_code}`);
  const url = `${await resolve_base()}/bank/resolve?account_number=${encodeURIComponent(account_number)}&bank_code=${encodeURIComponent(bank_code)}`;
  const res = await fetch(url, {
    method: 'GET',
    headers: { Authorization: `Bearer ${secret_key}` }
  });
  console.log(`[paystack_resolve_bank] response status: ${res.status} ${res.statusText}`);
  if (!res.ok) {
    const err = await res.text();
    console.error(`[paystack_resolve_bank] error body:`, err);
    throw new Error(`Bank resolve failed (${res.status}): ${err}`);
  }
  const body = await res.json();
  if (!body.status) {
    console.error(`[paystack_resolve_bank] status false:`, body.message);
    throw new Error(`Bank resolve error: ${body.message}`);
  }
  console.log(`[paystack_resolve_bank] resolved account_name=${body.data?.account_name}`);
  return body.data as { account_name: string };
}

export async function paystack_create_recipient(name: string, account_number: string, bank_code: string): Promise<{ recipient_code: string; active: boolean }> {
  const secret_key = await get_secret_key();
  console.log(`[paystack_create_recipient] creating for ${name} account ${account_number ? account_number.slice(0, 4) + '...' : 'EMPTY'} bank_code=${bank_code}`);
  const res = await fetch(`${await resolve_base()}/transferrecipient`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${secret_key}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ type: 'nuban', name, account_number, bank_code, currency: 'NGN' })
  });
  console.log(`[paystack_create_recipient] response status: ${res.status} ${res.statusText}`);
  if (!res.ok) {
    const err = await res.text();
    console.error(`[paystack_create_recipient] error body:`, err);
    throw new Error(`Create recipient failed: ${err}`);
  }
  const body = await res.json();
  if (!body.status) {
    console.error(`[paystack_create_recipient] status false:`, body.message);
    throw new Error(`Create recipient error: ${body.message}`);
  }
  console.log(`[paystack_create_recipient] recipient_code=${body.data?.recipient_code} active=${body.data?.active}`);
  return body.data as { recipient_code: string; active: boolean };
}

export async function paystack_transfer(
  recipient_code: string,
  amount_kobo: number,
  reason: string,
  reference?: string
): Promise<{ transfer_code: string; status: string }> {
  const secret_key = await get_secret_key();
  console.log(`[paystack_transfer] initiating transfer`, {
    recipient_code,
    amount_kobo,
    reason,
    reference: reference || '(none)'
  });
  const body_json: Record<string, unknown> = {
    source: 'balance',
    amount: amount_kobo,
    recipient: recipient_code,
    reason
  };
  if (reference) body_json.reference = reference;
  const res = await fetch(`${await resolve_base()}/transfer`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${secret_key}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(body_json)
  });
  console.log(`[paystack_transfer] response status: ${res.status} ${res.statusText}`);
  if (!res.ok) {
    const err = await res.text();
    // Paystack enforces unique transfer references. A duplicate means a prior
    // attempt already created the disbursement , treat as idempotent success
    // so concurrent verify-payment + webhook paths never double-pay.
    if (reference && /reference.*(already|exist|used)|transfer.*(already|exist)/i.test(err)) {
      console.log(`[paystack_transfer] Duplicate reference ${reference}, treating as already paid`);
      return { transfer_code: reference, status: 'success' };
    }
    console.error(`[paystack_transfer] error body:`, err);
    throw new Error(`Transfer failed: ${err}`);
  }
  const body = await res.json();
  if (!body.status) {
    console.error(`[paystack_transfer] status false:`, body.message);
    throw new Error(`Transfer error: ${body.message}`);
  }
  console.log(`[paystack_transfer] OK transfer_code=${body.data?.transfer_code} status=${body.data?.status}`);
  return body.data as { transfer_code: string; status: string };
}

/**
 * Fetch the available Paystack balance (kobo). Returns 0 if unavailable.
 * Used to gate payouts so we don't burn a retry attempt on insufficient funds.
 */
export async function paystack_balance(): Promise<number> {
  const secret_key = await get_secret_key();
  console.log(`[paystack_balance] fetching available balance`);
  try {
    const res = await fetch(`${await resolve_base()}/balance`, {
      headers: { Authorization: `Bearer ${secret_key}`, 'Content-Type': 'application/json' }
    });
    console.log(`[paystack_balance] response status: ${res.status} ${res.statusText}`);
    if (!res.ok) return 0;
    const body = await res.json();
    const row = (body.data || []).find((b: { currency: string }) => b.currency === 'NGN') || body.data?.[0];
    const bal = row ? Number(row.balance) || 0 : 0;
    console.log(`[paystack_balance] NGN balance = ${bal} kobo`);
    return bal;
  } catch (e) {
    console.error(`[paystack_balance] exception:`, e);
    return 0;
  }
}

/**
 * Verify the HMAC SHA512 signature on an incoming Paystack webhook.
 * raw_body must be the raw request body string , not a parsed object.
 */
export async function verify_webhook_sig(
  raw_body: string,
  signature: string
): Promise<boolean> {
  const secret_key = await get_secret_key();
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
