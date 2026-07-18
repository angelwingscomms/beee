import { describe, it, expect, vi, beforeEach } from 'vitest';

// Real find_or_create_player_user against an in-memory Qdrant stand-in.
// Verifies the parent-reuse path: same email twice -> same user, no duplicate,
// other classes preserved, and no display name (n) stored.

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

function reg_ids_for(email: string): string[] {
	return [...store.values()].filter((r) => r.s === 'u' && r.e === email).map((r) => r.i);
}

describe('find_or_create_player_user (real)', () => {
	beforeEach(() => {
		store.clear();
	});

	it('creates an email-only user with no display name (n)', async () => {
		const { find_or_create_player_user } = await import('./index');
		const id = await find_or_create_player_user('mom@b.co', 'Kid A', 'hash');
		const u = store.get(id);
		expect(u.e).toBe('mom@b.co');
		expect(u.c).toContain('rpb');
		expect(u.n).toBeUndefined();
		expect(u.p).toBe('hash');
	});

	it('reuses the same user for a second kid (same email) — no duplicate', async () => {
		const { find_or_create_player_user } = await import('./index');
		const id1 = await find_or_create_player_user('mom@b.co', 'Kid A');
		const id2 = await find_or_create_player_user('mom@b.co', 'Kid B');
		expect(id1).toBe(id2);
		expect(reg_ids_for('mom@b.co').length).toBe(1);
	});

	it('does not clobber existing classes when promoting to rpb', async () => {
		const { find_or_create_player_user } = await import('./index');
		// Pre-seed a partner user for this email.
		const id = 'u_seed';
		store.set(id, { s: 'u', i: id, e: 'mom@b.co', c: ['fab'], d: 0 });
		await find_or_create_player_user('mom@b.co', 'Kid A');
		const u = store.get(id);
		expect(u.c).toContain('fab');
		expect(u.c).toContain('rpb');
	});
});
