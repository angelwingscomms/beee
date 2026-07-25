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

export const POST: RequestHandler = async ({ request, url, locals }) => {
 try {
    console.log(`[register-init-payment] === NEW REQUEST ===`);
    console.log(`[register-init-payment] dev=${dev}`);
    console.log(`[register-init-payment] locals.user:`, locals?.user ? JSON.stringify({ id: locals.user.id, email: locals.user.email }) : 'null');
    const data = await request.json();
    console.log(`[register-init-payment] raw data keys:`, Object.keys(data));
    // ponytail: a logged-in parent registers under their own session email; password not required.
    const sessionEmail = locals?.user?.email;
    const email = data.email || sessionEmail;
    console.log(`[register-init-payment] resolved email: "${email}" (from session: ${!!sessionEmail})`);
    // The parent phone lives on the User (string[] of full dialed numbers, no '+').
    // When logged in the field is hidden, so reuse the first stored number; otherwise
    // take the form value and strip the leading '+'.
    const toStored = (v: string) => String(v).replace(/[\s()-]/g, '').replace(/^\+/, '');
    const sessionPhone = locals?.user?.ph?.[0];
    const phone = sessionEmail
        ? (sessionPhone || (data.phone ? toStored(data.phone) : ''))
        : (data.phone ? toStored(data.phone) : '');
    console.log(`[register-init-payment] payload:`, {
        firstName: data.firstName,
        lastName: data.lastName,
        email,
        phone: data.phone,
        hasPassword: !!data.password,
        passwordLen: data.password ? String(data.password).length : 0,
        partnerCode: data.partnerCode || null,
        loggedIn: !!sessionEmail
    });
    console.log(`[register-init-payment] phone resolution: sessionEmail=${sessionEmail ?? 'null'} sessionPhone=${sessionPhone ?? 'null'} dataPhone=${data.phone ?? 'null'} -> resolved phone="${phone}"`);
    if (!data.firstName || !data.lastName || !email) {
        console.warn(`[register-init-payment] Rejected: missing required field`, {
            firstName: !!data.firstName, lastName: !!data.lastName, email: !!email, phone: !!phone
        });
        return json({ error: 'Missing required fields' }, { status: 400 });
    }
    // A bare dial code ('+234' -> '234') is a placeholder, not a real number.
    const phoneReal = phone && !/^\d{1,3}$/.test(phone) ? phone : '';
    console.log(`[register-init-payment] normalized phone: raw="${phone}" real="${phoneReal}"`);
    // Logged-out registrations must supply a phone on the form. For logged-in
    // parents the field is hidden , the phone resolves later from the session
    // or the Paystack metadata at confirmation time.
    if (!sessionEmail && !phoneReal) {
        console.warn(`[register-init-payment] Rejected: missing phone for logged-out registration`);
        return json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Server-side validation (the UI validates too, but never trust the client).
    if (!EMAIL_RE.test(email)) {
        console.warn(`[register-init-payment] Rejected: invalid email "${email}"`);
        return json({ error: 'Invalid email' }, { status: 400 });
    }
    if (phoneReal && !/^\d{7,15}$/.test(phoneReal)) {
        console.warn(`[register-init-payment] Rejected: invalid phone "${phoneReal}" (from sessionPhone=${sessionPhone ?? 'null'}, dataPhone=${data.phone ?? 'null'}, sessionEmail=${sessionEmail ?? 'null'})`);
        return json({ error: 'Invalid phone' }, { status: 400 });
    }
    // Password only required for brand-new (logged-out) registrations.
    if (!sessionEmail && data.password && String(data.password).length < 8) {
        console.warn(`[register-init-payment] Rejected: password too short (${String(data.password).length})`);
        return json({ error: 'Password too short' }, { status: 400 });
    }

    let amount_kobo = get_base_amount();
    let discounted = false;
    let ac: string | undefined;

    if (data.partnerCode) {
        // Normalize like /api/validate-partner: a pasted share link
        // (/i/<code> or ?c=<code>) should still resolve.
        const raw = String(data.partnerCode).trim();
        const m = raw.match(/\/i\/([^/?#\s]+)/);
        const code = m ? m[1] : raw;
        console.log(`[register-init-payment] partner code supplied: ${data.partnerCode} (normalized: ${code}) , looking up affiliate`);
        console.log(`[register-init-payment] searching for user with ac="${code}"`);
        const affs = await search_by_payload<User>({ s: 'u', ac: code });
        console.log(`[register-init-payment] affiliate candidates found: ${affs.length}`);
        if (affs.length > 0) {
            affs.forEach((a, i) => console.log(`[register-init-payment]  candidate ${i}: id=${(a as any).i} c=${a.c} ac=${a.ac}`));
        }
        const valid = affs.some(u => u.c?.includes('fab'));
        console.log(`[register-init-payment] valid(fab): ${valid}`);
        if (!valid) {
            console.warn(`[register-init-payment] Rejected: invalid partner code ${data.partnerCode}`);
            return json({ error: 'Invalid partner code' }, { status: 400 });
        }
        amount_kobo = get_discounted_amount();
        discounted = true;
        ac = code;
        console.log(`[register-init-payment] discount applied: amount_kobo now ${amount_kobo}`);
    } else {
        console.log(`[register-init-payment] no partner code , using base amount_kobo ${amount_kobo}`);
    }

    const i = new_id();
    console.log(`[register-init-payment] generated registration id: ${i}`);
    const p_name = `${data.firstName} ${data.lastName}`;

    // Store the registration locally as PENDING, including the password.
    // The password lives only in our own DB and is bcrypt-hashed on payment
    // confirmation , it is NEVER sent to Paystack as transaction metadata.
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
        // Hash immediately so the password never rests in the DB as plaintext.
        // verify-payment reuses this hash directly.
        console.log(`[register-init-payment] bcrypt-hashing password for ${i}...`);
        pending.pw = await bcrypt.hash(data.password, 10);
        console.log(`[register-init-payment] password hashed for ${i}`);
    }
    console.log(`[register-init-payment] writing PENDING registration to DB: ${i}`);
    await create(pending, undefined, i);
    console.log(`[register-init-payment] PENDING registration written: ${i}`);

    const callback_url = `${url.origin}/payment/callback`;
    // Only a reference goes to Paystack , no PII, no password.
    console.log(`[register-init-payment] calling paystack_init for ${i} | email=${email} amount_kobo=${amount_kobo} callback=${callback_url}`);
    const result = await paystack_init(email, amount_kobo, i, p_name, callback_url, { a: 'beee', regId: i, phone: phoneReal });
    console.log(`[register-init-payment] phone sent to Paystack metadata: "${phoneReal}"`);
    console.log(`[register-init-payment] paystack_init OK for ${i} | authorization_url=${result.authorization_url ? 'present' : 'MISSING'} access_code=${result.access_code ? 'present' : 'MISSING'} reference=${result.reference}`);

    return json({
        success: true,
        authorization_url: result.authorization_url,
        access_code: result.access_code,
        reference: result.reference,
        registrationId: i,
        amount: amount_kobo,
        discounted
    });
 } catch (err) {
    console.error('[register-init-payment] UNCAUGHT ERROR:', err);
    console.error('[register-init-payment] error name:', (err as Error)?.name);
    console.error('[register-init-payment] error message:', (err as Error)?.message);
    console.error('[register-init-payment] stack:', (err as Error)?.stack);
    return json(
        { error: 'Server error', detail: (err as Error)?.message || String(err) },
        { status: 500 }
    );
  }
};
