// Shared Paystack utilities — server-side only
// All amounts are in kobo (NGN × 100)

import { dev } from '$app/environment';
import { createHmac } from 'crypto';
import { get_secret } from '$lib/server/secrets';

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
  const secret_key = await get_secret_key();
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

// ── Bank code map ──────────────────────────────────────────

const BANK_CODES: Record<string, string> = {
  'access bank': '044',
  'access bank (diamond)': '063',
  'citibank': '023',
  'ecobank': '050',
  'fidelity bank': '070',
  'first bank': '011',
  'first city monument bank': '214',
  'fcmb': '214',
  'globus bank': '001',
  'guaranty trust bank': '058',
  'gtbank': '058',
  'heritage bank': '030',
  'jaiz bank': '301',
  'keystone bank': '082',
  'kuda bank': '50211',
  'kuda': '50211',
  'moniepoint': '50515',
  'opay': '100004',
  'palmpay': '50563',
  'parallex bank': '526',
  'polaris bank': '076',
  'providus bank': '101',
  'stanbic ibtc bank': '221',
  'stanbic ibtc': '221',
  'standard chartered bank': '068',
  'sterling bank': '232',
  'suntrust bank': '100',
  'titan trust bank': '102',
  'union bank': '032',
  'united bank for africa': '033',
  'uba': '033',
  'unity bank': '215',
  'wema bank': '035',
  'zenith bank': '057',
};

export function get_bank_code(bn: string): string | null {
  const key = bn.trim().toLowerCase().replace(/\s+/g, ' ');
  return BANK_CODES[key] || null;
}

// ── Transfer API ───────────────────────────────────────────

export async function paystack_resolve_bank(account_number: string, bank_code: string): Promise<{ account_name: string }> {
  const secret_key = await get_secret_key();
  const res = await fetch(`${BASE}/bank/resolve`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${secret_key}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ account_number, bank_code })
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Bank resolve failed: ${err}`);
  }
  const body = await res.json();
  if (!body.status) throw new Error(`Bank resolve error: ${body.message}`);
  return body.data as { account_name: string };
}

export async function paystack_create_recipient(name: string, account_number: string, bank_code: string): Promise<{ recipient_code: string; active: boolean }> {
  const secret_key = await get_secret_key();
  const res = await fetch(`${BASE}/transferrecipient`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${secret_key}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ type: 'nuban', name, account_number, bank_code, currency: 'NGN' })
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Create recipient failed: ${err}`);
  }
  const body = await res.json();
  if (!body.status) throw new Error(`Create recipient error: ${body.message}`);
  return body.data as { recipient_code: string; active: boolean };
}

export async function paystack_transfer(recipient_code: string, amount_kobo: number, reason: string): Promise<{ transfer_code: string; status: string }> {
  const secret_key = await get_secret_key();
  const res = await fetch(`${BASE}/transfer`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${secret_key}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ source: 'balance', amount: amount_kobo, recipient: recipient_code, reason })
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Transfer failed: ${err}`);
  }
  const body = await res.json();
  if (!body.status) throw new Error(`Transfer error: ${body.message}`);
  return body.data as { transfer_code: string; status: string };
}

/**
 * Verify the HMAC SHA512 signature on an incoming Paystack webhook.
 * raw_body must be the raw request body string — not a parsed object.
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
