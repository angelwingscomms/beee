import { json } from '@sveltejs/kit';
import type { RequestHandler } from '@sveltejs/kit';
import { search_by_payload } from '$lib/db';
import { dev } from '$app/environment';
import { REG_AMOUNT, REG_AMOUNT_DEV, DISCOUNT_PCT } from '$lib/constants';
import type { User } from '$lib/types';

export const POST: RequestHandler = async ({ request }) => {
    const data = await request.json();
    if (!data.code || typeof data.code !== 'string') {
        return json({ valid: false });
    }

    const base = dev ? REG_AMOUNT_DEV : REG_AMOUNT;
    const discounted = Math.round(base * (100 - DISCOUNT_PCT) / 100);

    const affs = await search_by_payload<User>({ s: 'u', ac: data.code.trim() });
    const valid = affs.some(u => u.c?.includes('fab'));

    return json({
        valid,
        amount: valid ? discounted : base,
        full_amount: base
    });
};
