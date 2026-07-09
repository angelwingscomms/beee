import { json } from '@sveltejs/kit';
import type { RequestHandler } from '@sveltejs/kit';

const PAYSTACK_BANK_URL = 'https://api.paystack.co/bank?country=nigeria';

export const GET: RequestHandler = async () => {
  try {
    const r = await fetch(PAYSTACK_BANK_URL);
    if (!r.ok) throw new Error(`Paystack returned ${r.status}`);
    const body = await r.json();
    if (!body.status || !Array.isArray(body.data)) throw new Error('Unexpected Paystack response');

    const banks = body.data.map((b: any) => ({
      n: b.name,
      c: b.code,
    }));

    return json({ banks });
  } catch (e) {
    console.error('[banks] Failed to fetch from Paystack:', e);
    return json({ error: 'Failed to fetch banks' }, { status: 502 });
  }
};
