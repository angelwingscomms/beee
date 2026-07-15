import { json } from '@sveltejs/kit';
import type { RequestHandler } from '@sveltejs/kit';
import bcrypt from 'bcryptjs';
import { new_id, create, search_by_payload } from '$lib/db';
import { paystack_init } from '$lib/paystack';
import { dev } from '$app/environment';
import { DEV_REG_FEE, REG_AMOUNT, DISCOUNT_PCT } from '$lib/constants';
import type { User } from '$lib/types';
import type { Registration } from '$lib/types/registration';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// In dev, the registration fee is the smallest payable unit: the minimum
// Paystack charge plus the minimum Paystack transfer (sent to the affiliate).
// In production, pricing is a single source of truth: REG_AMOUNT (naira) and
// DISCOUNT_PCT.
function get_base_amount(): number {
    return dev ? DEV_REG_FEE : REG_AMOUNT * 100;
}

function get_discounted_amount(): number {
    return dev ? DEV_REG_FEE : Math.round(REG_AMOUNT * 100 * (1 - DISCOUNT_PCT / 100));
}

export const POST: RequestHandler = async ({ request, url }) => {
    const data = await request.json();
    if (!data.firstName || !data.lastName || !data.email || !data.phone) {
        return json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Server-side validation (the UI validates too, but never trust the client).
    if (!EMAIL_RE.test(data.email)) {
        return json({ error: 'Invalid email' }, { status: 400 });
    }
    if (!/^\+?\d{7,15}$/.test(String(data.phone).replace(/[\s()-]/g, ''))) {
        return json({ error: 'Invalid phone' }, { status: 400 });
    }
    if (data.password && String(data.password).length < 6) {
        return json({ error: 'Password too short' }, { status: 400 });
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
        pp: data.proprietorPhone,
        amt: amount_kobo,
        st: 'pending',
        v: 0,
        d: Date.now(),
        ac
    };
    if (data.password) {
        // Hash immediately so the password never rests in the DB as plaintext.
        // verify-payment reuses this hash directly.
        pending.pw = await bcrypt.hash(data.password, 10);
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
