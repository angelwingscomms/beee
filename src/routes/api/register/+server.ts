import { json } from '@sveltejs/kit';
import type { RequestHandler } from '@sveltejs/kit';
import bcrypt from 'bcryptjs';
import { new_id, create, find_or_create_user } from '$lib/db';
import { find_partner_by_code } from '$lib/partner_lookup';
import { encode_session } from '$lib/server/session';
import { dev } from '$app/environment';
import { DEV_REG_FEE, REG_AMOUNT, DISCOUNT_PCT } from '$lib/constants';
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

export const POST: RequestHandler = async ({ request, cookies, locals }) => {
 try {
    const data = await request.json();
    // A logged-in parent registers under their own session email; password not required.
    const sessionEmail = locals?.user?.email;
    const email = data.email || sessionEmail;
    // The parent phone lives on the User (string[] of full dialed numbers, no '+').
    const toStored = (v: string) => String(v).replace(/[\s()-]/g, '').replace(/^\+/, '');
    const sessionPhone = locals?.user?.ph?.[0];
    const phone = sessionEmail
        ? (sessionPhone || (data.phone ? toStored(data.phone) : ''))
        : (data.phone ? toStored(data.phone) : '');
    if (!data.firstName || !data.lastName || !email) {
        return json({ error: 'Missing required fields' }, { status: 400 });
    }
    // A bare dial code ('+234' -> '234') is a placeholder, not a real number.
    const phoneReal = phone && !/^\d{1,3}$/.test(phone) ? phone : '';
    // Logged-out registrations must supply a phone on the form.
    if (!sessionEmail && !phoneReal) {
        return json({ error: 'Missing required fields' }, { status: 400 });
    }
    if (!EMAIL_RE.test(email)) {
        return json({ error: 'Invalid email' }, { status: 400 });
    }
    if (phoneReal && !/^\d{7,15}$/.test(phoneReal)) {
        return json({ error: 'Invalid phone' }, { status: 400 });
    }
    // Password only required for brand-new (logged-out) registrations.
    if (!sessionEmail && data.password && String(data.password).length < 8) {
        return json({ error: 'Password too short' }, { status: 400 });
    }

    let amount_kobo = get_base_amount();
    let discounted = false;
    let ac: string | undefined;

    if (data.partnerCode) {
        const partner = await find_partner_by_code(String(data.partnerCode));
        if (!partner) {
            return json({ error: 'Invalid partner code' }, { status: 400 });
        }
        amount_kobo = get_discounted_amount();
        discounted = true;
        ac = partner.ac;
    }

    const i = new_id();
    const p_name = `${data.firstName} ${data.lastName}`;

    // The registration is created PENDING and free of charge; full access is
    // unlocked later via the dashboard. The password is bcrypt-hashed here so
    // it never rests in the DB as plaintext.
    const pending: Registration = {
        s: 'reg',
        fn: data.firstName,
        ln: data.lastName,
        sn: data.school,
        e: email,
        amt: amount_kobo,
        st: 'r',
        v: 0,
        d: Date.now(),
        ac
    };
    if (data.password) {
        pending.pw = await bcrypt.hash(data.password, 10);
    }
    await create(pending, undefined, i);

    // Provision a login account immediately (no rpb — full access stays tied
    // to payment) and sign the registrant in so they land on the dashboard.
    const user_id = await find_or_create_user(email, pending.pw, phoneReal ? [phoneReal] : undefined);
    const session = await encode_session({ id: user_id, email, ph: phoneReal ? [phoneReal] : undefined });
    cookies.set('session', session, { path: '/', httpOnly: true, maxAge: 604800, sameSite: 'lax' });

    return json({ success: true, registrationId: i, amount: amount_kobo, discounted });
 } catch (err) {
    console.error('[register] UNCAUGHT ERROR:', err);
    return json(
        { error: 'Server error', detail: (err as Error)?.message || String(err) },
        { status: 500 }
    );
  }
};
