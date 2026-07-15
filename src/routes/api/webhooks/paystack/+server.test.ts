import { describe, it, expect, vi, beforeEach } from 'vitest';
import bcrypt from 'bcryptjs';
import { createQdrantStore } from '../../../../test/harness';

const db = createQdrantStore();
let sig_ok = true;
let verify: any = vi.fn();
let process_payout: any = vi.fn(async () => {});
let reconcile: any = vi.fn(async () => {});

vi.mock('$app/environment', () => ({ get dev() { return false; }, get browser() { return false; } }));
vi.mock('$lib/db', () => ({
    create: db.create, get: db.get, find_or_create_player_user: db.find_or_create_player_user,
    search_by_payload: db.search_by_payload, new_id: db.new_id
}));
vi.mock('$lib/paystack', () => ({
    verify_webhook_sig: vi.fn(async () => sig_ok),
    paystack_verify: (...a: any[]) => verify(...a),
    get_bank_code: () => '057'
}));
vi.mock('$lib/partner', () => ({
    process_partner_payout: (...a: any[]) => process_payout(...a),
    reconcile_transfer_payout: (...a: any[]) => reconcile(...a)
}));
vi.mock('$lib/email', () => ({ send_partner_notification: vi.fn(async () => {}) }));

const REG_ID = 'reg_webhook_1';
const PW_HASH = await bcrypt.hash('password123', 10);
const flush = () => new Promise((r) => setTimeout(r, 30));

function seedPending() {
    db.store.clear();
    db.store.set(REG_ID, {
        s: 'reg', fn: 'Play', ln: 'Er', e: 'player@example.com', p: '+234801234567',
        st: 'pending', v: 0, d: Date.now(), amt: 1_350_000, ac: 'AFF123', pw: PW_HASH, i: REG_ID
    });
}

function post(event: Record<string, unknown>, signature = 'sig') {
    return new Request('http://localhost/api/webhooks/paystack', {
        method: 'POST', headers: { 'Content-Type': 'application/json', 'x-paystack-signature': signature },
        body: JSON.stringify(event)
    });
}

describe('Paystack webhook /api/webhooks/paystack', () => {
    beforeEach(() => {
        sig_ok = true;
        verify = vi.fn();
        process_payout = vi.fn(async () => {});
        reconcile = vi.fn(async () => {});
        seedPending();
    });

    it('W1: rejects a bad/missing signature with 401', async () => {
        sig_ok = false;
        const { POST } = await import('./+server');
        const res = await POST({ request: post({ event: 'charge.success', data: { reference: REG_ID } }) } as any);
        expect(res.status).toBe(401);
        expect(process_payout).not.toHaveBeenCalled();
    });

    it('W3: charge.success re-verifies with the API, writes paid reg + rpb user, fires payout', async () => {
        verify.mockResolvedValue({ status: 'success', reference: REG_ID, amount: 1_350_000, customer: { email: '' }, metadata: {} });
        const { POST } = await import('./+server');
        const res = await POST({ request: post({ event: 'charge.success', data: { reference: REG_ID } }) } as any);
        expect(res.status).toBe(200);
        await flush();
        expect(db.store.get(REG_ID).st).toBe('paid');
        const user = [...db.store.values()].find(u => u.s === 'u' && u.e === 'player@example.com');
        expect(user.c).toContain('rpb');
        expect(process_payout).toHaveBeenCalledTimes(1);
    });

    it('W4: charge.success is idempotent — a second delivery does not double-create', async () => {
        verify.mockResolvedValue({ status: 'success', reference: REG_ID, amount: 1_350_000, customer: { email: '' }, metadata: {} });
        const { POST } = await import('./+server');
        await POST({ request: post({ event: 'charge.success', data: { reference: REG_ID } }) } as any);
        await flush();
        process_payout.mockClear();
        await POST({ request: post({ event: 'charge.success', data: { reference: REG_ID } }) } as any);
        await flush();
        expect(process_payout).not.toHaveBeenCalled();
    });

    it('W5: amount mismatch is not written and handler still returns 200', async () => {
        verify.mockResolvedValue({ status: 'success', reference: REG_ID, amount: 999, customer: { email: '' }, metadata: {} });
        const { POST } = await import('./+server');
        const res = await POST({ request: post({ event: 'charge.success', data: { reference: REG_ID } }) } as any);
        expect(res.status).toBe(200);
        await flush();
        expect(db.store.get(REG_ID).st).toBe('pending');
        expect(process_payout).not.toHaveBeenCalled();
    });

    it('W6: transfer.success reconciles the payout to success', async () => {
        const { POST } = await import('./+server');
        const res = await POST({ request: post({ event: 'transfer.success', data: { reference: 'po-regX' } }) } as any);
        expect(res.status).toBe(200);
        await flush();
        expect(reconcile).toHaveBeenCalledWith('po-regX', 'success');
    });

    it('W7: transfer.failed reconciles the payout to failed', async () => {
        const { POST } = await import('./+server');
        await POST({ request: post({ event: 'transfer.failed', data: { reference: 'po-regX' } }) } as any);
        await flush();
        expect(reconcile).toHaveBeenCalledWith('po-regX', 'failed');
    });

    it('W8: transfer.reversed reconciles the payout to reversed', async () => {
        const { POST } = await import('./+server');
        await POST({ request: post({ event: 'transfer.reversed', data: { reference: 'po-regX' } }) } as any);
        await flush();
        expect(reconcile).toHaveBeenCalledWith('po-regX', 'reversed');
    });

    it('W9: a throwing payout does not crash the handler (fire-and-forget)', async () => {
        verify.mockResolvedValue({ status: 'success', reference: REG_ID, amount: 1_350_000, customer: { email: '' }, metadata: {} });
        process_payout = vi.fn(async () => { throw new Error('boom'); });
        const { POST } = await import('./+server');
        const res = await POST({ request: post({ event: 'charge.success', data: { reference: REG_ID } }) } as any);
        expect(res.status).toBe(200);
        await flush();
    });
});
