import { describe, it, expect, vi, beforeEach } from 'vitest';
import { MIN_PMNT_AMNT, MIN_TRANSFER_AMNT } from '$lib/constants';

let mock_dev = false;

vi.mock('$app/environment', () => ({
    get dev() { return mock_dev; },
    get browser() { return false; },
}));

const store = new Map<string, any>();
let lastInit: { email: string; amount: number; registrationId: string; p_name: string; callback_url: string; reg_data: Record<string, unknown> } | null = null;

vi.mock('$lib/db', () => ({
    get: vi.fn(async (id: string) => store.get(id) ?? null),
    new_id: vi.fn(() => 'x'),
    search_by_payload: vi.fn(async () => []),
    create: vi.fn(async () => 'x'),
}));

vi.mock('$lib/paystack', () => ({
    paystack_init: vi.fn(async (email: string, amount: number, registrationId: string, p_name: string, callback_url: string, reg_data?: Record<string, unknown>) => {
        lastInit = { email, amount, registrationId, p_name, callback_url, reg_data: reg_data ?? {} };
        return {
            authorization_url: 'https://paystack.com/authorize',
            access_code: 'mock_access_code',
            reference: registrationId,
        };
    }),
}));

function seed_reg(overrides: Record<string, unknown> = {}) {
    const reg: any = {
        s: 'reg', i: 'reg_1', fn: 'John', ln: 'Doe', e: 'john@example.com',
        sn: 'School', st: 'r', v: 0, d: Date.now(), amt: 1_500_000,
        ...overrides
    };
    store.set('reg_1', reg);
    return reg;
}

function mock_handler(body: Record<string, unknown>, locals?: { user?: { email?: string; ph?: string[] } }) {
    const req = new Request('http://localhost/api/register-init-payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
    });
    return { request: req, url: new URL('http://localhost/api/register-init-payment'), locals };
}

describe('register-init-payment (unlock existing registration)', () => {
    beforeEach(() => {
        mock_dev = false;
        store.clear();
        lastInit = null;
    });

    it('rejects a missing registrationId with 400', async () => {
        const { POST } = await import('./+server');
        const res = await POST(mock_handler({}) as any);
        expect(res.status).toBe(400);
        expect((await res.json()).error).toBe('Missing registrationId');
    });

    it('rejects an unknown registration with 404', async () => {
        const { POST } = await import('./+server');
        const res = await POST(mock_handler({ registrationId: 'nope' }, { user: { email: 'john@example.com' } }) as any);
        expect(res.status).toBe(404);
        expect((await res.json()).error).toBe('Registration not found');
    });

    it('rejects a registration owned by someone else with 403', async () => {
        seed_reg();
        const { POST } = await import('./+server');
        const res = await POST(mock_handler({ registrationId: 'reg_1' }, { user: { email: 'other@example.com' } }) as any);
        expect(res.status).toBe(403);
        expect((await res.json()).error).toBe('Not your registration');
    });

    it('rejects with no session at all with 403', async () => {
        seed_reg();
        const { POST } = await import('./+server');
        const res = await POST(mock_handler({ registrationId: 'reg_1' }) as any);
        expect(res.status).toBe(403);
        expect((await res.json()).error).toBe('Not your registration');
    });

    it('rejects an already-unlocked registration with 400', async () => {
        seed_reg({ st: 'i' });
        const { POST } = await import('./+server');
        const res = await POST(mock_handler({ registrationId: 'reg_1' }, { user: { email: 'john@example.com' } }) as any);
        expect(res.status).toBe(400);
        expect((await res.json()).error).toBe('Already unlocked');
    });

    it('inits paystack for a pending discounted reg with the session phone', async () => {
        seed_reg({ amt: 1_350_000 });
        const { POST } = await import('./+server');
        const res = await POST(mock_handler({ registrationId: 'reg_1' }, { user: { email: 'john@example.com', ph: ['2348011112222'] } }) as any);
        expect(res.status).toBe(200);
        const d = await res.json();
        expect(d.success).toBe(true);
        expect(d.amount).toBe(1_350_000);
        expect(d.discounted).toBe(true);
        expect(d.access_code).toBe('mock_access_code');
        expect(d.authorization_url).toBe('https://paystack.com/authorize');
        expect(d.reference).toBe('reg_1');
        expect(d.registrationId).toBe('reg_1');
        expect(lastInit).toEqual({
            email: 'john@example.com',
            amount: 1_350_000,
            registrationId: 'reg_1',
            p_name: 'John Doe',
            callback_url: 'http://localhost/payment/callback',
            reg_data: { a: 'beee', regId: 'reg_1', phone: '2348011112222' }
        });
    });

    it('full-price reg reports discounted false', async () => {
        seed_reg({ amt: 1_500_000 });
        const { POST } = await import('./+server');
        const res = await POST(mock_handler({ registrationId: 'reg_1' }, { user: { email: 'john@example.com' } }) as any);
        const d = await res.json();
        expect(d.amount).toBe(1_500_000);
        expect(d.discounted).toBe(false);
    });

    it('dev mode: a dev-priced reg is not reported discounted', async () => {
        mock_dev = true;
        seed_reg({ amt: MIN_PMNT_AMNT + MIN_TRANSFER_AMNT });
        const { POST } = await import('./+server');
        const res = await POST(mock_handler({ registrationId: 'reg_1' }, { user: { email: 'john@example.com' } }) as any);
        const d = await res.json();
        expect(d.amount).toBe(MIN_PMNT_AMNT + MIN_TRANSFER_AMNT);
        expect(d.discounted).toBe(false);
    });
});
