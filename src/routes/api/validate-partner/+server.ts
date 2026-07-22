import { json } from '@sveltejs/kit';
import type { RequestHandler } from '@sveltejs/kit';
import { search_by_payload } from '$lib/db';
import { dev } from '$app/environment';
import { REG_AMOUNT, DEV_REG_FEE_NAIRA, DISCOUNT_PCT } from '$lib/constants';
import type { User } from '$lib/types';

export const POST: RequestHandler = async ({ request }) => {
    const data = await request.json();
    if (!data.code || typeof data.code !== 'string') {
        return json({ valid: false });
    }

    // A partner may paste the whole share link (/i/<code> or ?c=<code>)
    // instead of just the code , extract the trailing segment so it still resolves.
    const raw = data.code.trim();
    const m = raw.match(/\/i\/([^/?#\s]+)/);
    const code = m ? m[1] : raw;

    const base = dev ? DEV_REG_FEE_NAIRA : REG_AMOUNT;
    // In dev there is no discount , the registration fee is fixed at DEV_REG_FEE.
    const discounted = dev ? base : Math.round(base * (100 - DISCOUNT_PCT) / 100);

    const affs = await search_by_payload<User>({ s: 'u', ac: code });
    const valid = affs.some(u => u.c?.includes('fab'));

    return json({
        valid,
        amount: valid ? discounted : base,
        full_amount: base
    });
};
