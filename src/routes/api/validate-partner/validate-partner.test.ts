import { describe, it, expect, vi, beforeEach } from 'vitest';
import { DEV_REG_FEE_NAIRA } from '$lib/constants';

let mock_dev = false;

vi.mock('$app/environment', () => ({
    get dev() { return mock_dev; },
    get browser() { return false; },
}));

const mockUsers: Array<{ s: string; ac: string; c?: string[] }> = [];

vi.mock('$lib/db', () => ({
    search_by_payload: vi.fn(async (filter: Record<string, unknown>) => {
        if (filter.s === 'u' && filter.ac) {
            return mockUsers.filter(u => u.ac === filter.ac);
        }
        return [];
    }),
}));

describe('validate-partner endpoint', () => {
    beforeEach(() => {
        mock_dev = false;
        mockUsers.length = 0;
    });

    it('returns valid=false for non-existent code', async () => {
        const { POST } = await import('./+server');
        const req = new Request('http://localhost/api/validate-partner', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ code: 'NONEXISTENT' })
        });
        const res = await POST({ request: req } as any);
        const d = await res.json();
        expect(d.valid).toBe(false);
    });

    it('returns valid=false for a code that exists but is not a partner', async () => {
        mockUsers.push({ s: 'u', ac: 'PLAYER1', c: ['rpb'] });
        const { POST } = await import('./+server');
        const req = new Request('http://localhost/api/validate-partner', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ code: 'PLAYER1' })
        });
        const res = await POST({ request: req } as any);
        const d = await res.json();
        expect(d.valid).toBe(false);
    });

    it('returns valid=true for a valid partner code', async () => {
        mockUsers.push({ s: 'u', ac: 'AFF123', c: ['fab'] });
        const { POST } = await import('./+server');
        const req = new Request('http://localhost/api/validate-partner', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ code: 'AFF123' })
        });
        const res = await POST({ request: req } as any);
        const d = await res.json();
        expect(d.valid).toBe(true);
    });

    it('includes amount and full_amount in response for valid code', async () => {
        mockUsers.push({ s: 'u', ac: 'AFF456', c: ['fab'] });
        const { POST } = await import('./+server');
        const req = new Request('http://localhost/api/validate-partner', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ code: 'AFF456' })
        });
        const res = await POST({ request: req } as any);
        const d = await res.json();
        expect(d.amount).toBeTypeOf('number');
        expect(d.full_amount).toBeTypeOf('number');
        expect(d.amount).toBeLessThan(d.full_amount);
    });

    it('returns valid=false for empty code', async () => {
        const { POST } = await import('./+server');
        const req = new Request('http://localhost/api/validate-partner', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ code: '' })
        });
        const res = await POST({ request: req } as any);
        const d = await res.json();
        expect(d.valid).toBe(false);
    });

    it('returns the naira dev fee (₦90) with no discount in dev mode', async () => {
        mock_dev = true;
        mockUsers.push({ s: 'u', ac: 'AFFDEV', c: ['fab'] });
        const { POST } = await import('./+server');
        const req = new Request('http://localhost/api/validate-partner', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ code: 'AFFDEV' })
        });
        const res = await POST({ request: req } as any);
        const d = await res.json();
        expect(d.valid).toBe(true);
        expect(d.amount).toBe(DEV_REG_FEE_NAIRA);
        expect(d.full_amount).toBe(DEV_REG_FEE_NAIRA);
    });

    it('accepts the share link a partner actually copies (/i/CODE)', async () => {
        mockUsers.push({ s: 'u', ac: 'AFF789', c: ['fab'] });
        const { POST } = await import('./+server');
        const req = new Request('http://localhost/api/validate-partner', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ code: 'https://beeeproject.com/i/AFF789' })
        });
        const res = await POST({ request: req } as any);
        const d = await res.json();
        expect(d.valid).toBe(true);
        expect(d.code).toBe('AFF789');
    });

    it('accepts a custom code typed with a capital (stored lowercase)', async () => {
        mockUsers.push({ s: 'u', ac: 'edchess', c: ['fab'] });
        const { POST } = await import('./+server');
        const req = new Request('http://localhost/api/validate-partner', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ code: 'Edchess' })
        });
        const res = await POST({ request: req } as any);
        const d = await res.json();
        expect(d.valid).toBe(true);
        expect(d.code).toBe('edchess');
    });
});
