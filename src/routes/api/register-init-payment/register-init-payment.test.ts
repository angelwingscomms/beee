import { describe, it, expect, vi, beforeEach } from 'vitest';
import { MIN_PMNT_AMNT, MIN_TRANSFER_AMNT } from '$lib/constants';

let mock_dev = false;

vi.mock('$app/environment', () => ({
    get dev() { return mock_dev; },
    get browser() { return false; },
}));

const mockUsers: Array<{ s: string; ac: string; c?: string[] }> = [];

vi.mock('$lib/db', () => ({
    new_id: vi.fn(() => 'mock-reg-id-123'),
    search_by_payload: vi.fn(async (filter: Record<string, unknown>) => {
        if (filter.s === 'u' && filter.ac) {
            return mockUsers.filter(u => u.ac === filter.ac);
        }
        return [];
    }),
    create: vi.fn(async () => 'mock-reg-id-123'),
    get: vi.fn(async () => null),
}));

vi.mock('$lib/paystack', () => ({
    paystack_init: vi.fn(async () => ({
        authorization_url: 'https://paystack.com/authorize',
        access_code: 'mock_access_code',
        reference: 'mock_ref',
    })),
}));

function mock_handler(body: Record<string, unknown>) {
    const req = new Request('http://localhost/api/register-init-payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
    });
    return { request: req, url: new URL('http://localhost/api/register-init-payment') };
}

describe('register-init-payment partner code validation', () => {
    beforeEach(() => {
        mock_dev = false;
        mockUsers.length = 0;
    });

    it('accepts registration without partner code', async () => {
        const { POST } = await import('./+server');
        const res = await POST(mock_handler({
            firstName: 'John', lastName: 'Doe', email: 'john@example.com',
            phone: '+234801234567', school: 'Test School', password: 'password123'
        }) as any);
        const d = await res.json();
        expect(d.success).toBe(true);
    });

    it('rejects invalid partner code with 400 error', async () => {
        const { POST } = await import('./+server');
        const res = await POST(mock_handler({
            firstName: 'John', lastName: 'Doe', email: 'john@example.com',
            phone: '+234801234567', school: 'Test School', password: 'password123',
            partnerCode: 'INVALID_CODE'
        }) as any);
        expect(res.status).toBe(400);
        const d = await res.json();
        expect(d.error).toBe('Invalid partner code');
    });

    it('rejects non-partner code that exists in DB', async () => {
        mockUsers.push({ s: 'u', ac: 'PLAYER1', c: ['rpb'] });
        const { POST } = await import('./+server');
        const res = await POST(mock_handler({
            firstName: 'John', lastName: 'Doe', email: 'john@example.com',
            phone: '+234801234567', school: 'Test School', password: 'password123',
            partnerCode: 'PLAYER1'
        }) as any);
        expect(res.status).toBe(400);
        const d = await res.json();
        expect(d.error).toBe('Invalid partner code');
    });

    it('accepts valid partner code and returns discounted amount', async () => {
        mockUsers.push({ s: 'u', ac: 'AFF123', c: ['fab'] });
        const { POST } = await import('./+server');
        const res = await POST(mock_handler({
            firstName: 'John', lastName: 'Doe', email: 'john@example.com',
            phone: '+234801234567', school: 'Test School', password: 'password123',
            partnerCode: 'AFF123'
        }) as any);
        expect(res.status).toBe(200);
        const d = await res.json();
        expect(d.success).toBe(true);
        expect(d.discounted).toBe(true);
        expect(d.amount).toBe(1_350_000);
    });

    it('returns full amount without partner code', async () => {
        const { POST } = await import('./+server');
        const res = await POST(mock_handler({
            firstName: 'Jane', lastName: 'Doe', email: 'jane@example.com',
            phone: '+234801234568', school: 'Test School', password: 'password123'
        }) as any);
        const d = await res.json();
        expect(d.amount).toBe(1_500_000);
        expect(d.discounted).toBe(false);
    });

    it('uses dev pricing = min payment + min transfer in dev mode', async () => {
        mock_dev = true;
        const { POST } = await import('./+server');
        const res = await POST(mock_handler({
            firstName: 'Dev', lastName: 'User', email: 'dev@example.com',
            phone: '+234801234569', school: 'Dev School', password: 'password123'
        }) as any);
        const d = await res.json();
        expect(d.amount).toBe(MIN_PMNT_AMNT + MIN_TRANSFER_AMNT);
    });

    it('applies same dev fee on valid partner code in dev mode', async () => {
        mock_dev = true;
        mockUsers.push({ s: 'u', ac: 'DEV_AFF', c: ['fab'] });
        const { POST } = await import('./+server');
        const res = await POST(mock_handler({
            firstName: 'Dev', lastName: 'User', email: 'dev@example.com',
            phone: '+234801234569', school: 'Dev School', password: 'password123',
            partnerCode: 'DEV_AFF'
        }) as any);
        const d = await res.json();
        expect(d.amount).toBe(MIN_PMNT_AMNT + MIN_TRANSFER_AMNT);
        expect(d.discounted).toBe(true);
    });
});
