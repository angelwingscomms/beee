import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createQdrantStore, createPaystackMock } from '../../test/harness';

// Full-flow integration: real register-init-payment + verify-payment/webhook +
// real partner payout, with Paystack + Qdrant mocked.

const db = createQdrantStore();
const ps = createPaystackMock();

vi.mock('$app/environment', () => ({ get dev() { return false; }, get browser() { return false; } }));
vi.mock('$lib/db', () => ({
    create: db.create, get: db.get, find_or_create_player_user: db.find_or_create_player_user,
    search_by_payload: db.search_by_payload, new_id: db.new_id
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
    const { POST } = await import('../../routes/api/register-init-payment/+server');
    const req = new Request('http://localhost/api/register-init-payment', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ firstName: 'Play', lastName: 'Er', email: 'player@example.com', phone: '+234801234567', school: 'S', password: 'password123', partnerCode: ac })
    });
    const res = await POST({ request: req, url: new URL('http://localhost/api/register-init-payment') } as any);
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
        expect(reg.st).toBe('paid');
        const user = [...db.store.values()].find(u => u.s === 'u' && u.e === 'player@example.com');
        expect(user.c).toContain('rpb');
        const payout = db.store.get(`po_${init.registrationId}`);
        expect(payout).toBeTruthy();
        expect(payout.st).toBe('success');
        expect(payout.amt).toBe(135_000); // 10% of 1_350_000 net
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
        expect(reg.st).toBe('paid');
        const payout = db.store.get(`po_${init.registrationId}`);
        expect(payout.st).toBe('success');
        expect(payout.amt).toBe(135_000);
    });

    it('I4: partner with no bank → retryable failed payout, recovered after bank added + retry', async () => {
        seedPartner(false);
        const init = await register('AFF123');
        const amt = init.amount;
        ps.controls.verify.mockImplementation(async (r: string) => ({ status: 'success', reference: r, amount: amt, customer: { email: '' }, metadata: {} }));
        await verify(init.registrationId);
        const failed = db.store.get(`po_${init.registrationId}`);
        expect(failed.st).toBe('failed');
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

    it('I5: commission is exactly 10% of the net amount actually paid', async () => {
        seedPartner();
        const init = await register('AFF123');
        const amt = init.amount;
        ps.controls.verify.mockImplementation(async (r: string) => ({ status: 'success', reference: r, amount: amt, customer: { email: '' }, metadata: {} }));
        await verify(init.registrationId);
        await flush();
        const payout = db.store.get(`po_${init.registrationId}`);
        expect(payout.amt).toBe(Math.round(amt * 0.1));
    });
});
