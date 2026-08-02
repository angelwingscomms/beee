import { describe, it, expect, vi, beforeEach } from 'vitest';

// Real find_or_create_user against an in-memory Qdrant stand-in.
// Verifies the plain-user path used by free registration: creates a login
// account WITHOUT the rpb class (rpb stays tied to payment / full access),
// reuses the same user for repeated emails, and never touches existing classes.

const store = new Map<string, any>();
const collection = 'i';

const fake_qdrant = {
	async upsert(_c: string, { points }: { points: any[] }) {
		for (const p of points) store.set(p.id, { ...p.payload, i: p.id });
		return {};
	},
	async scroll(_c: string, { filter, limit = 144 }: any) {
		const must = filter?.must ?? [];
		const rows = [...store.values()].filter((r) =>
			must.every((m: any) => r[m.key] === m.match?.value)
		);
		return { points: rows.slice(0, limit).map((r) => ({ id: r.i, payload: r })) };
	},
	async retrieve(_c: string, { ids }: any) {
		return ids.map((id: string) => ({ id, payload: store.get(id) ?? null })).filter((p: any) => p.payload);
	},
	async setPayload(_c: string, { points, payload }: any) {
		for (const id of points) store.set(id, { ...store.get(id), ...payload, i: id });
		return {};
	},
	async updateVectors() {
		return {};
	},
	async delete() {
		return {};
	}
};

vi.mock('$lib/db/get_qdrant', () => ({
	get_qdrant: async () => fake_qdrant
}));
vi.mock('$lib/server/secrets', () => ({
	get_secret: vi.fn(async (k: string) => (k === 'SECRET' ? 'test-secret' : ''))
}));

function user_rows_for(email: string): any[] {
	return [...store.values()].filter((r) => r.s === 'u' && r.e === email);
}

describe('find_or_create_user (real)', () => {
	beforeEach(() => {
		store.clear();
	});

	it('creates an email-only user with no classes', async () => {
		const { find_or_create_user } = await import('./index');
		const id = await find_or_create_user('mom@b.co', 'hash', ['2348012345678']);
		const u = store.get(id);
		expect(u.e).toBe('mom@b.co');
		expect(u.c).toBeUndefined();
		expect(u.p).toBe('hash');
		expect(u.ph).toEqual(['2348012345678']);
		expect(u.n).toBeUndefined();
	});

	it('reuses the same user for a second kid (same email), no duplicate', async () => {
		const { find_or_create_user } = await import('./index');
		const id1 = await find_or_create_user('mom@b.co');
		const id2 = await find_or_create_user('mom@b.co');
		expect(id1).toBe(id2);
		expect(user_rows_for('mom@b.co').length).toBe(1);
	});

	it('does not add rpb to an existing user', async () => {
		const { find_or_create_user } = await import('./index');
		const id = 'u_seed';
		store.set(id, { s: 'u', i: id, e: 'mom@b.co', c: ['fab'], d: 0 });
		await find_or_create_user('mom@b.co');
		const u = store.get(id);
		expect(u.c).toEqual(['fab']);
		expect(u.c).not.toContain('rpb');
	});

	it('backfills phone only when the user has none', async () => {
		const { find_or_create_user } = await import('./index');
		const id = 'u_seed';
		store.set(id, { s: 'u', i: id, e: 'mom@b.co', d: 0 });
		await find_or_create_user('mom@b.co', undefined, ['2348012345678']);
		expect(store.get(id).ph).toEqual(['2348012345678']);
		await find_or_create_user('mom@b.co', undefined, ['9999999999']);
		expect(store.get(id).ph).toEqual(['2348012345678']);
	});
});
