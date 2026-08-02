import { describe, it, expect, vi, beforeEach, beforeAll } from 'vitest';
import { createQdrantStore, createPaystackMock } from '../../test/harness';
import type { payout_point_id as payout_point_id_t } from '../../lib/partner';

// Full-flow integration: real register-init-payment + verify-payment/webhook +
// real partner payout, with Paystack + Qdrant mocked.
// payout_point_id is imported dynamically below (not statically) so that this
// module's own `db`/`ps` are initialized before `$lib/partner` pulls in the
// `$lib/db` mock factory, which reads from `db` , a static top-level import
// here would hit that mock factory before `const db = ...` runs (TDZ error).

const db = createQdrantStore();
const ps = createPaystackMock();
let payout_point_id!: typeof payout_point_id_t;

vi.mock('$app/environment', () => ({ get dev() { return false; }, get browser() { return false; } }));
vi.mock('$lib/db', () => ({
    create: db.create, get: db.get, find_or_create_player_user: db.find_or_create_player_user,
    find_or_create_user: db.find_or_create_user,
    search_by_payload: db.search_by_payload, new_id: db.new_id, edit_point: db.edit_point
}));
vi.mock('$lib/paystack', () => ({
    paystack_init: ps.mock.paystack_init,
    paystack_verify: ps.mock.paystack_verify,
    paystack_resolve_bank: ps.mock.paystack_resolve_bank,
    paystack_create_recipient: ps.mock.paystack_create_recipient,
    paystack_transfer: ps.mock.paystack_transfer,
    paystack_balance: ps.mock.paystack_balance,
    get_bank_code: ps.mock.get_bank_code,
    verify_webhook_sig: ps.mock.verify_webhook_sig
}));
vi.mock('$lib/server/secrets', () => ({ get_secret: vi.fn(async (k: string) => (k === 'SECRET' ? 'test-secret' : '')) }));
vi.mock('$lib/server/session', () => ({ encode_session: vi.fn(async () => 'sess') }));
vi.mock('$lib/email', () => ({ send_partner_notification: vi.fn(async () => {}) }));

const flush = () => new Promise((r) => setTimeout(r, 30));

function seedPartner(withBank = true) {
    const p: any = { s: 'u', i: 'aff1', ac: 'AFF123', c: ['fab'], e: 'partner@example.com', n: 'Partner' };
    if (withBank) { p.ba = '1234567890'; p.bn = 'Zenith Bank'; p.bk = '057'; }
    db.store.set('aff1', p);
}

async function register(ac?: string) {
    const { POST } = await import('../../routes/api/register/+server');
    const req = new Request('http://localhost/api/register', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ firstName: 'Play', lastName: 'Er', email: 'player@example.com', phone: '+234801234567', school: 'S', password: 'password123', partnerCode: ac })
    });
    const res = await POST({ request: req, url: new URL('http://localhost/api/register'), cookies: { set: vi.fn() } } as any);
    return res.json();
}

async function verify(regId: string) {
    const { POST } = await import('../../routes/api/verify-payment/+server');
    const req = new Request('http://localhost/api/verify-payment', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reference: regId, registrationId: regId })
    });
    return POST({ request: req, cookies: { set: vi.fn() } as any, platform: {} as any } as any);
}

async function webhookCharge(regId: string) {
    const { POST } = await import('../../routes/api/webhooks/paystack/+server');
    const req = new Request('http://localhost/api/webhooks/paystack', {
        method: 'POST', headers: { 'Content-Type': 'application/json', 'x-paystack-signature': 'sig' },
        body: JSON.stringify({ event: 'charge.success', data: { reference: regId } })
    });
    return POST({ request: req, platform: {} as any } as any);
}

describe('integration: register → payment → immediate partner payout', () => {
    beforeAll(async () => {
        ({ payout_point_id } = await import('../../lib/partner'));
    });

    beforeEach(() => {
        db.reset();
        for (const c of Object.values(ps.controls)) c.mockClear();
        ps.controls.verify.mockImplementation(async (r: string) => ({ status: 'success', reference: r, amount: 0, customer: { email: '' }, metadata: {} }));
    });

    it('I2: verify-payment path creates paid reg + rpb user + successful payout (10% net)', async () => {
        seedPartner();
        const init = await register('AFF123');
        expect(init.discounted).toBe(true);
        const amt = init.amount;
        ps.controls.verify.mockImplementation(async (r: string) => ({ status: 'success', reference: r, amount: amt, customer: { email: '' }, metadata: {} }));
        await verify(init.registrationId);
        await flush();
        const reg = db.store.get(init.registrationId);
        expect(reg.st).toBe('i');
        const user = [...db.store.values()].find(u => u.s === 'u' && u.e === 'player@example.com');
        expect(user.c).toContain('rpb');
        const payout = db.store.get(await payout_point_id(init.registrationId));
        expect(payout).toBeTruthy();
        expect(payout.st).toBe('s');
        expect(payout.amt).toBe(5400); // TEMP flat N54 prod payout (partner.ts payout_amount)
        expect(ps.controls.transfer).toHaveBeenCalledTimes(1);
    });

    it('I3: webhook charge.success path yields the identical final state', async () => {
        seedPartner();
        const init = await register('AFF123');
        const amt = init.amount;
        ps.controls.verify.mockImplementation(async (r: string) => ({ status: 'success', reference: r, amount: amt, customer: { email: '' }, metadata: {} }));
        await webhookCharge(init.registrationId);
        await flush();
        const reg = db.store.get(init.registrationId);
        expect(reg.st).toBe('i');
        const payout = db.store.get(await payout_point_id(init.registrationId));
        expect(payout.st).toBe('s');
        expect(payout.amt).toBe(5400);
    });

    it('I4: partner with no bank → retryable failed payout, recovered after bank added + retry', async () => {
        seedPartner(false);
        const init = await register('AFF123');
        const amt = init.amount;
        ps.controls.verify.mockImplementation(async (r: string) => ({ status: 'success', reference: r, amount: amt, customer: { email: '' }, metadata: {} }));
        await verify(init.registrationId);
        const failed = db.store.get(await payout_point_id(init.registrationId));
        expect(failed.st).toBe('f');
        expect(ps.controls.transfer).not.toHaveBeenCalled();
        // Partner adds bank details, then the cron retry runs.
        const partner = db.store.get('aff1');
        partner.ba = '1234567890'; partner.bn = 'Zenith Bank'; partner.bk = '057';
        const { retry_failed_payouts } = await import('../../lib/partner');
        const res = await retry_failed_payouts({} as any);
        expect(res.retried).toBe(1);
        expect(res.succeeded).toBe(1);
        expect(ps.controls.transfer).toHaveBeenCalledTimes(1);
    });

    it('I5: payout amount is the configured flat payout (5400 kobo, TEMP)', async () => {
        seedPartner();
        const init = await register('AFF123');
        const amt = init.amount;
        ps.controls.verify.mockImplementation(async (r: string) => ({ status: 'success', reference: r, amount: amt, customer: { email: '' }, metadata: {} }));
        await verify(init.registrationId);
        await flush();
        const payout = db.store.get(await payout_point_id(init.registrationId));
        expect(payout.amt).toBe(5400);
    });

    it('B10: verify-payment and webhook firing concurrently do not create two payout records', async () => {
        seedPartner();
        const init = await register('AFF123');
        const amt = init.amount;
        ps.controls.verify.mockImplementation(async (r: string) => ({ status: 'success', reference: r, amount: amt, customer: { email: '' }, metadata: {} }));
        // Fire both entry points at the same registration simultaneously.
        await Promise.all([verify(init.registrationId), webhookCharge(init.registrationId)]);
        await flush();
        const reg = db.store.get(init.registrationId);
        expect(reg.st).toBe('i');
        // Exactly one payout document exists (get/set overwrites under the race).
        const payouts = [...db.store.values()].filter(r => r.s === 'po');
        expect(payouts.length).toBe(1);
        const payout = db.store.get(await payout_point_id(init.registrationId));
        expect(payout.st).toBe('s');
        // Every transfer (if two fired) reuses the SAME reference → Paystack's
        // duplicate-reference dedupe prevents a double credit.
        const calls = ps.controls.transfer.mock.calls;
        expect(calls.length).toBeGreaterThanOrEqual(1);
        for (const c of calls) expect(c[3]).toBe(`po-${init.registrationId}`);
    });
});
