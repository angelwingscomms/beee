import { json } from '@sveltejs/kit';
import type { RequestHandler } from '@sveltejs/kit';
import { find_partner_by_code } from '$lib/partner_lookup';
import { dev } from '$app/environment';
import { REG_AMOUNT, DEV_REG_FEE_NAIRA, DISCOUNT_PCT } from '$lib/constants';

export const POST: RequestHandler = async ({ request }) => {
    const data = await request.json();
    const base = dev ? DEV_REG_FEE_NAIRA : REG_AMOUNT;
    // In dev there is no discount , the registration fee is fixed at DEV_REG_FEE.
    const discounted = dev ? base : Math.round(base * (100 - DISCOUNT_PCT) / 100);

    if (!data.code || typeof data.code !== 'string') {
        return json({ valid: false, amount: base, full_amount: base });
    }

    // A lookup that never ran is not a wrong code. Say so, so the page can stay
    // quiet instead of calling a good code invalid.
    let partner;
    try {
        partner = await find_partner_by_code(data.code);
    } catch (err) {
        console.error('[validate-partner] lookup failed:', err);
        return json({ error: 'Could not check the code' }, { status: 503 });
    }

    return json({
        valid: !!partner,
        code: partner?.ac ?? null,
        amount: partner ? discounted : base,
        full_amount: base
    });
};
