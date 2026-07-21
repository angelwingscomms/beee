import { describe, it, expect, vi, beforeEach } from 'vitest';

const updatePoint = vi.fn(async (_id: string, _data: Record<string, unknown>) => {});
const searchByPayload = vi.fn(async (_filter: Record<string, unknown>) => [] as any[]);
const checkCode = vi.fn(async (_code: string) => ({ ok: true, reason: 'looks good' }));

vi.mock('$lib/db', () => ({
	search_by_payload: (...args: any[]) => (searchByPayload as any)(...args),
	update_point: (...args: any[]) => (updatePoint as any)(...args)
}));

vi.mock('$lib/groq', () => ({
	check_partner_code_sounds_ok: (...args: any[]) => (checkCode as any)(...args)
}));

const USER = { id: 'user_1', email: 'p@b.com' };

async function call(body: unknown, user: { id: string } | null = USER) {
	const req = new Request('http://localhost/api/partner/set-code', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(body)
	});
	const { POST } = await import('./+server');
	return POST({ request: req, locals: { user } } as any);
}

describe('partner set-code endpoint', () => {
	beforeEach(() => {
		updatePoint.mockClear();
		searchByPayload.mockClear();
		checkCode.mockReset();
		checkCode.mockResolvedValue({ ok: true, reason: 'looks good' });
		searchByPayload.mockResolvedValue([]);
	});

	it('rejects unauthenticated requests', async () => {
		const res = await call({ code: 'chesskids' }, null);
		expect(res.status).toBe(401);
		expect(updatePoint).not.toHaveBeenCalled();
	});

	it('rejects empty code', async () => {
		const res = await call({ code: '   ' });
		expect(res.status).toBe(400);
		expect(updatePoint).not.toHaveBeenCalled();
	});

	it('rejects invalid characters and length', async () => {
		for (const bad of ['ab', 'a b', 'bad code!', 'x'.repeat(25)]) {
			const res = await call({ code: bad });
			expect(res.status).toBe(400);
		}
		expect(updatePoint).not.toHaveBeenCalled();
	});

	it('normalizes mixed case before checking', async () => {
		const res = await call({ code: 'ChessKids' });
		expect(res.status).toBe(200);
		expect(updatePoint).toHaveBeenCalledWith('user_1', { ac: 'chesskids' });
	});

	it('rejects a code already taken by another user', async () => {
		searchByPayload.mockResolvedValue([{ s: 'u', ac: 'taken', i: 'other_user' }]);
		const res = await call({ code: 'taken' });
		expect(res.status).toBe(409);
		expect(updatePoint).not.toHaveBeenCalled();
	});

	it('allows a code that matches only the caller own id', async () => {
		searchByPayload.mockResolvedValue([{ s: 'u', ac: 'mine', i: 'user_1' }]);
		const res = await call({ code: 'mine' });
		expect(res.status).toBe(200);
		expect(updatePoint).toHaveBeenCalledWith('user_1', { ac: 'mine' });
	});

	it('rejects when the Groq check says not ok', async () => {
		checkCode.mockResolvedValue({ ok: false, reason: 'too close to a brand name' });
		const res = await call({ code: 'chesskids' });
		expect(res.status).toBe(422);
		expect(updatePoint).not.toHaveBeenCalled();
	});

	it('saves the code when the Groq check passes', async () => {
		checkCode.mockResolvedValue({ ok: true, reason: 'brandable' });
		const res = await call({ code: 'chesskids' });
		expect(res.status).toBe(200);
		const d = await res.json();
		expect(d.success).toBe(true);
		expect(d.code).toBe('chesskids');
		expect(updatePoint).toHaveBeenCalledWith('user_1', { ac: 'chesskids' });
	});
});
