import { describe, it, expect, vi, beforeEach } from 'vitest';
import bcrypt from 'bcryptjs';
import { MIN_PMNT_AMNT, MIN_TRANSFER_AMNT } from '$lib/constants';

let mock_dev = false;

vi.mock('$app/environment', () => ({
    get dev() { return mock_dev; },
    get browser() { return false; },
}));

const mockUsers: Array<{ s: string; ac: string; c?: string[] }> = [];
let lastCreate: any = null;
const createdRecords: any[] = [];
const userStore = new Map<string, any>();
let lastFindOrCreate: { email: string; hash?: string; phones?: string[] } | null = null;

vi.mock('$lib/db', () => ({
    new_id: vi.fn(() => 'mock-reg-id-123'),
    search_by_payload: vi.fn(async (filter: Record<string, unknown>) => {
        if (filter.s === 'u' && filter.ac) {
            return mockUsers.filter(u => u.ac === filter.ac);
        }
        return [];
    }),
    create: vi.fn(async (payload: any) => { lastCreate = payload; createdRecords.push(payload); return 'mock-reg-id-123'; }),
    get: vi.fn(async () => null),
    find_or_create_user: vi.fn(async (email: string, hash?: string, phones?: string[]) => {
        lastFindOrCreate = { email, hash, phones };
        const existing = [...userStore.values()].find((u) => u.s === 'u' && u.e === email);
        if (existing) return existing.i;
        const id = `u_${userStore.size + 1}`;
        userStore.set(id, { s: 'u', e: email, i: id });
        if (hash) userStore.get(id).p = hash;
        if (phones?.length) userStore.get(id).ph = phones;
        return id;
    }),
}));

vi.mock('$lib/server/session', () => ({
    encode_session: vi.fn(async () => 'tok'),
}));

const cookieSet = vi.fn();

function mock_handler(body: Record<string, unknown>, locals?: { user?: { email?: string; ph?: string[] } }) {
    const req = new Request('http://localhost/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
    });
    return { request: req, url: new URL('http://localhost/api/register'), locals, cookies: { set: cookieSet } };
}

describe('api/register free registration', () => {
    beforeEach(() => {
        mock_dev = false;
        mockUsers.length = 0;
        lastCreate = null;
        createdRecords.length = 0;
        userStore.clear();
        lastFindOrCreate = null;
        cookieSet.mockClear();
    });

    it('success without partner code: pending reg, no paystack fields', async () => {
        const { POST } = await import('./+server');
        const res = await POST(mock_handler({
            firstName: 'John', lastName: 'Doe', email: 'john@example.com',
            phone: '+234801234567', school: 'Test School', password: 'password123'
        }) as any);
        expect(res.status).toBe(200);
        const d = await res.json();
        expect(d.success).toBe(true);
        expect(d.registrationId).toBe('mock-reg-id-123');
        expect(d.amount).toBe(1_500_000);
        expect(d.discounted).toBe(false);
        expect(d.authorization_url).toBeUndefined();
        expect(d.access_code).toBeUndefined();
        expect(lastCreate.st).toBe('r');
    });

    it('rejects invalid partner code with 400', async () => {
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

    it('valid partner code: discounted amount baked into the pending reg', async () => {
        mockUsers.push({ s: 'u', ac: 'AFF123', c: ['fab'] });
        const { POST } = await import('./+server');
        const res = await POST(mock_handler({
            firstName: 'John', lastName: 'Doe', email: 'john@example.com',
            phone: '+234801234567', school: 'Test School', password: 'password123',
            partnerCode: 'AFF123'
        }) as any);
        const d = await res.json();
        expect(d.success).toBe(true);
        expect(d.amount).toBe(1_350_000);
        expect(d.discounted).toBe(true);
        expect(lastCreate.amt).toBe(1_350_000);
        expect(lastCreate.ac).toBe('AFF123');
    });

    it('uses dev pricing in dev mode', async () => {
        mock_dev = true;
        const { POST } = await import('./+server');
        const res = await POST(mock_handler({
            firstName: 'Dev', lastName: 'User', email: 'dev@example.com',
            phone: '+234801234569', school: 'Dev School', password: 'password123'
        }) as any);
        const d = await res.json();
        expect(d.amount).toBe(MIN_PMNT_AMNT + MIN_TRANSFER_AMNT);
    });

    it('password is bcrypt-hashed on the reg and passed to find_or_create_user', async () => {
        const { POST } = await import('./+server');
        await POST(mock_handler({
            firstName: 'John', lastName: 'Doe', email: 'john@example.com',
            phone: '+234801234567', school: 'Test School', password: 'password123'
        }) as any);
        expect(lastCreate.pw).toBeDefined();
        expect(lastCreate.pw).not.toBe('password123');
        expect(lastCreate.pw.startsWith('$2')).toBe(true);
        expect(await bcrypt.compare('password123', lastCreate.pw)).toBe(true);
        expect(lastFindOrCreate?.hash).toBe(lastCreate.pw);
    });

    it('find_or_create_user receives the stripped phone', async () => {
        const { POST } = await import('./+server');
        await POST(mock_handler({
            firstName: 'John', lastName: 'Doe', email: 'john@example.com',
            phone: '+234801234567', school: 'Test School', password: 'password123'
        }) as any);
        expect(lastFindOrCreate?.phones).toEqual(['234801234567']);
    });

    it('sets a session cookie so the registrant lands logged in', async () => {
        const { POST } = await import('./+server');
        await POST(mock_handler({
            firstName: 'John', lastName: 'Doe', email: 'john@example.com',
            phone: '+234801234567', school: 'Test School', password: 'password123'
        }) as any);
        expect(cookieSet).toHaveBeenCalledWith('session', 'tok', expect.objectContaining({ path: '/', httpOnly: true }));
    });

    it('logged-in parent: falls back to session email and phone', async () => {
        const { POST } = await import('./+server');
        const res = await POST(mock_handler({
            firstName: 'Kid', lastName: 'Two', school: 'School C'
        }, { user: { email: 'mom@example.com', ph: ['2348011112222'] } }) as any);
        expect(res.status).toBe(200);
        const d = await res.json();
        expect(d.success).toBe(true);
        expect(lastCreate.e).toBe('mom@example.com');
        expect(lastFindOrCreate?.email).toBe('mom@example.com');
    });

    it('rejects an invalid email with 400', async () => {
        const { POST } = await import('./+server');
        const res = await POST(mock_handler({
            firstName: 'John', lastName: 'Doe', email: 'not-an-email',
            phone: '+234801234567', school: 'Test School', password: 'password123'
        }) as any);
        expect(res.status).toBe(400);
    });

    it('rejects an invalid phone with 400', async () => {
        const { POST } = await import('./+server');
        const res = await POST(mock_handler({
            firstName: 'John', lastName: 'Doe', email: 'john@example.com',
            phone: '123', school: 'Test School', password: 'password123'
        }) as any);
        expect(res.status).toBe(400);
    });

    it('rejects a too-short password with 400', async () => {
        const { POST } = await import('./+server');
        const res = await POST(mock_handler({
            firstName: 'John', lastName: 'Doe', email: 'john@example.com',
            phone: '+234801234567', school: 'Test School', password: '123'
        }) as any);
        expect(res.status).toBe(400);
    });

    it('allows a parent to register a second kid with the same email', async () => {
        const { POST } = await import('./+server');
        const body = {
            firstName: 'Kid', lastName: 'One', email: 'mom@example.com',
            phone: '+234801234567', school: 'School A', password: 'password123'
        };
        const a = await POST(mock_handler({ ...body, school: 'School A' }) as any);
        const b = await POST(mock_handler({ ...body, school: 'School B' }) as any);
        expect((await a.json()).success).toBe(true);
        expect((await b.json()).success).toBe(true);
        const regs = createdRecords.filter((r) => r.s === 'reg' && r.e === 'mom@example.com');
        expect(regs.length).toBe(2);
        expect(regs[0].sn).toBe('School A');
        expect(regs[1].sn).toBe('School B');
        expect(regs[0]).not.toBe(regs[1]);
    });
});
