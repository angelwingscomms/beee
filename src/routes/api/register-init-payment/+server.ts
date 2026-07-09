import { json } from '@sveltejs/kit';
import type { RequestHandler } from '@sveltejs/kit';
import { new_id } from '$lib/db';
import { paystack_init } from '$lib/paystack';

const AMOUNT_KOBO = 1_250_000;

export const POST: RequestHandler = async ({ request, url }) => {
    const data = await request.json();
    if (!data.firstName || !data.lastName || !data.email || !data.phone || !data.school) {
        return json({ error: 'Missing required fields' }, { status: 400 });
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
        amt: AMOUNT_KOBO
    };
    if (data.affiliateCode) {
        reg_data.ac = data.affiliateCode;
    }

    const callback_url = `${url.origin}/payment/callback`;
    const result = await paystack_init(data.email, AMOUNT_KOBO, i, p_name, callback_url, reg_data);

    return json({
        success: true,
        authorization_url: result.authorization_url,
        access_code: result.access_code,
        reference: result.reference,
        registrationId: i
    });
};
