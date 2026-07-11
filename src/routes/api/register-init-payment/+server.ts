import { json } from '@sveltejs/kit';
import type { RequestHandler } from '@sveltejs/kit';
import { new_id, search_by_payload } from '$lib/db';
import { paystack_init } from '$lib/paystack';
import { dev } from '$app/environment';
import type { User } from '$lib/types';

function get_base_amount(): number {
    return dev ? 150_000 : 1_500_000;
}

function get_discounted_amount(): number {
    return dev ? 135_000 : 1_350_000;
}

export const POST: RequestHandler = async ({ request, url }) => {
    const data = await request.json();
    if (!data.firstName || !data.lastName || !data.email || !data.phone) {
        return json({ error: 'Missing required fields' }, { status: 400 });
    }

    let amount_kobo = get_base_amount();
    let discounted = false;

    if (data.affiliateCode) {
        const affs = await search_by_payload<User>({ s: 'u', ac: data.affiliateCode });
        const valid = affs.some(u => u.c?.includes('fab'));
        if (!valid) {
            return json({ error: 'Invalid affiliate code' }, { status: 400 });
        }
        amount_kobo = get_discounted_amount();
        discounted = true;
    }

    const i = new_id();
    const p_name = `${data.firstName} ${data.lastName}`;

    const reg_data: Record<string, unknown> = {
        s: 'reg',
        fn: data.firstName,
        ln: data.lastName,
        sn: data.school,
        e: data.email,
        p: data.phone,
        amt: amount_kobo
    };
    if (data.affiliateCode) {
        reg_data.ac = data.affiliateCode;
    }
    if (data.password) {
        reg_data.pw = data.password;
    }

    const callback_url = `${url.origin}/payment/callback`;
    const result = await paystack_init(data.email, amount_kobo, i, p_name, callback_url, reg_data);

    return json({
        success: true,
        authorization_url: result.authorization_url,
        access_code: result.access_code,
        reference: result.reference,
        registrationId: i,
        amount: amount_kobo,
        discounted
    });
};
