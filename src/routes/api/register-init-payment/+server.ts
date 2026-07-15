import { json } from '@sveltejs/kit';
import type { RequestHandler } from '@sveltejs/kit';
import { new_id, create, search_by_payload } from '$lib/db';
import { paystack_init } from '$lib/paystack';
import { dev } from '$app/environment';
import { DEV_REG_FEE } from '$lib/constants';
import type { User } from '$lib/types';
import type { Registration } from '$lib/types/registration';

// In dev, the registration fee is the smallest payable unit: the minimum
// Paystack charge plus the minimum Paystack transfer (sent to the affiliate).
function get_base_amount(): number {
    return dev ? DEV_REG_FEE : 1_500_000;
}

function get_discounted_amount(): number {
    return dev ? DEV_REG_FEE : 1_350_000;
}

export const POST: RequestHandler = async ({ request, url }) => {
    const data = await request.json();
    if (!data.firstName || !data.lastName || !data.email || !data.phone) {
        return json({ error: 'Missing required fields' }, { status: 400 });
    }

    let amount_kobo = get_base_amount();
    let discounted = false;
    let ac: string | undefined;

    if (data.partnerCode) {
        const affs = await search_by_payload<User>({ s: 'u', ac: data.partnerCode });
        const valid = affs.some(u => u.c?.includes('fab'));
        if (!valid) {
            return json({ error: 'Invalid partner code' }, { status: 400 });
        }
        amount_kobo = get_discounted_amount();
        discounted = true;
        ac = data.partnerCode;
    }

    const i = new_id();
    const p_name = `${data.firstName} ${data.lastName}`;

    // Store the registration locally as PENDING, including the password.
    // The password lives only in our own DB and is bcrypt-hashed on payment
    // confirmation — it is NEVER sent to Paystack as transaction metadata.
    const pending: Registration = {
        s: 'reg',
        fn: data.firstName,
        ln: data.lastName,
        sn: data.school,
        e: data.email,
        p: data.phone,
        amt: amount_kobo,
        st: 'pending',
        v: 0,
        d: Date.now(),
        ac
    };
    if (data.password) {
        pending.pw = data.password;
    }
    await create(pending, undefined, i);

    const callback_url = `${url.origin}/payment/callback`;
    // Only a reference goes to Paystack — no PII, no password.
    const result = await paystack_init(data.email, amount_kobo, i, p_name, callback_url, { a: 'beee', regId: i });

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
