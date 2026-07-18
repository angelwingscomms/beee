import { describe, it, expect, vi, beforeEach } from 'vitest';
import bcrypt from 'bcryptjs';
import { createQdrantStore } from '../../../test/harness';

const db = createQdrantStore();
let verify: any = vi.fn();
let payout: any = vi.fn(async () => {});

vi.mock('$app/environment', () => ({ get dev() { return false; }, get browser() { return false; } }));

vi.mock('$lib/server/secrets', () => ({
    get_secret: vi.fn(async (k: string) => (k === 'SECRET' ? 'test-secret-key' : ''))
}));

vi.mock('$lib/db', () => ({
    create: db.create,
    get: db.get,
    edit_point: db.edit_point,
    find_or_create_player_user: db.find_or_create_player_user,
    search_by_payload: db.search_by_payload,
    new_id: db.new_id
}));

vi.mock('$lib/paystack', () => ({
    paystack_verify: (...a: any[]) => verify(...a)
}));

vi.mock('$lib/partner', () => ({
    process_partner_payout: (...a: any[]) => payout(...a)
}));

vi.mock('$lib/email', () => ({ send_partner_notification: vi.fn(async () => {}) }));

vi.mock('$lib/server/session', () => ({
    encode_session: vi.fn(async () => 'mock-session-token')
}));

const REG_ID = 'reg_verify_1';
const PW_HASH = await bcrypt.hash('password123', 10);

function seedPending(ac?: string) {
    db.store.clear();
    db.store.set(REG_ID, {
        s: 'reg', fn: 'Play', ln: 'Er', e: 'player@example.com', p: '+234801234567',
        st: 'r', v: 0, d: Date.now(), amt: 1_350_000, ac, pw: PW_HASH, i: REG_ID
    });
}

function handler(body: Record<string, unknown>) {
    const request = new Request('http://localhost/api/verify-payment', {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body)
    });
    const cookies = { set: vi.fn() } as any;
    return { request, cookies, platform: {} as any };
}

describe('verify-payment', () => {
    beforeEach(() => {
        verify = vi.fn();
        payout = vi.fn(async () => {});
        seedPending('AFF123');
    });

    it('P6: rejects when Paystack status is not success (402)', async () => {
        verify.mockResolvedValue({ status: 'failed', reference: REG_ID, amount: 1_350_000, customer: { email: '' }, metadata: {} });
        const { POST } = await import('./+server');
        const { request, cookies, platform } = handler({ reference: REG_ID, registrationId: REG_ID });
        const res = await POST({ request, cookies, platform } as any);
        expect(res.status).toBe(402);
        expect(db.store.get(REG_ID).st).toBe('r');
    });

    it('P7: rejects amount mismatch (400) — anti-fraud', async () => {
        verify.mockResolvedValue({ status: 'success', reference: REG_ID, amount: 999, customer: { email: '' }, metadata: {} });
        const { POST } = await import('./+server');
        const { request, cookies, platform } = handler({ reference: REG_ID, registrationId: REG_ID });
        const res = await POST({ request, cookies, platform } as any);
        expect(res.status).toBe(400);
        expect(db.store.get(REG_ID).st).toBe('r');
    });

    it('P8: on success writes paid reg (no pw), creates rpb user, sets cookie', async () => {
        verify.mockResolvedValue({ status: 'success', reference: REG_ID, amount: 1_350_000, customer: { email: 'player@example.com' }, metadata: {} });
        const { POST } = await import('./+server');
        const { request, cookies, platform } = handler({ reference: REG_ID, registrationId: REG_ID });
        const res = await POST({ request, cookies, platform } as any);
        expect(res.status).toBe(200);
        const reg = db.store.get(REG_ID);
        expect(reg.st).toBe('i');
        expect(reg.pw).toBeUndefined();
        const user = [...db.store.values()].find(u => u.s === 'u' && u.e === 'player@example.com');
        expect(user.c).toContain('rpb');
        expect(cookies.set).toHaveBeenCalledWith('session', expect.any(String), expect.any(Object));
    });

    it('P10: fires process_partner_payout when a partner code is present', async () => {
        verify.mockResolvedValue({ status: 'success', reference: REG_ID, amount: 1_350_000, customer: { email: '' }, metadata: {} });
        const { POST } = await import('./+server');
        const { request, cookies, platform } = handler({ reference: REG_ID, registrationId: REG_ID });
        await POST({ request, cookies, platform } as any);
        expect(payout).toHaveBeenCalledTimes(1);
        expect(payout).toHaveBeenCalledWith(expect.objectContaining({ ac: 'AFF123' }), REG_ID, expect.anything());
    });

    it('B5: the created user password is the stored bcrypt hash, never plaintext', async () => {
        verify.mockResolvedValue({ status: 'success', reference: REG_ID, amount: 1_350_000, customer: { email: '' }, metadata: {} });
        const { POST } = await import('./+server');
        const { request, cookies, platform } = handler({ reference: REG_ID, registrationId: REG_ID });
        await POST({ request, cookies, platform } as any);
        const user = [...db.store.values()].find(u => u.s === 'u' && u.e === 'player@example.com');
        expect(user.p).toBe(PW_HASH);
        expect(user.p).not.toBe('password123');
    });

    it('P9: is idempotent — a second call on a paid reg returns success without re-firing payout', async () => {
        verify.mockResolvedValue({ status: 'success', reference: REG_ID, amount: 1_350_000, customer: { email: '' }, metadata: {} });
        const { POST } = await import('./+server');
        const { request: r1, cookies: c1, platform: p1 } = handler({ reference: REG_ID, registrationId: REG_ID });
        await POST({ request: r1, cookies: c1, platform: p1 } as any);
        payout.mockClear();
        const { request: r2, cookies: c2, platform: p2 } = handler({ reference: REG_ID, registrationId: REG_ID });
        const res2 = await POST({ request: r2, cookies: c2, platform: p2 } as any);
        expect(res2.status).toBe(200);
        expect(payout).not.toHaveBeenCalled();
    });

    it('returns 404 when no local registration exists', async () => {
        db.store.clear();
        verify.mockResolvedValue({ status: 'success', reference: 'nope', amount: 1_350_000, customer: { email: '' }, metadata: {} });
        const { POST } = await import('./+server');
        const { request, cookies, platform } = handler({ reference: 'nope', registrationId: 'nope' });
        const res = await POST({ request, cookies, platform } as any);
        expect(res.status).toBe(404);
    });

    it('B15: replay of a paid registration cannot trigger a second payout', async () => {
        verify.mockResolvedValue({ status: 'success', reference: REG_ID, amount: 1_350_000, customer: { email: '' }, metadata: {} });
        const { POST } = await import('./+server');
        const { request: r1, cookies: c1, platform: p1 } = handler({ reference: REG_ID, registrationId: REG_ID });
        await POST({ request: r1, cookies: c1, platform: p1 } as any);
        payout.mockClear();
        // Same reference replayed (attacker re-sends the callback) — must be a no-op.
        const { request: r2, cookies: c2, platform: p2 } = handler({ reference: REG_ID, registrationId: REG_ID });
        const res2 = await POST({ request: r2, cookies: c2, platform: p2 } as any);
        expect(res2.status).toBe(200);
        expect(payout).not.toHaveBeenCalled();
    });
});
