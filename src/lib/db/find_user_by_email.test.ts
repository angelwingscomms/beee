import { describe, it, expect, vi, beforeEach } from 'vitest';

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

describe('find_user_by_email (legacy m fallback)', () => {
	beforeEach(() => {
		store.clear();
	});

	it('finds a legacy m-keyed record', async () => {
		store.set('legacy', { s: 'u', m: 'legacy@x.co', n: 'Old', i: 'legacy' });
		const { find_user_by_email } = await import('./index');
		const u = await find_user_by_email('legacy@x.co') as (import('$lib/types').User & { i: string }) | undefined;
		expect(u?.i).toBe('legacy');
		expect(u?.n).toBe('Old');
	});

	it('prefers the e-match when both exist', async () => {
		store.set('legacy', { s: 'u', m: 'both@x.co', n: 'Old', i: 'legacy' });
		store.set('canon', { s: 'u', e: 'both@x.co', n: 'New', i: 'canon' });
		const { find_user_by_email } = await import('./index');
		const u = await find_user_by_email('both@x.co') as (import('$lib/types').User & { i: string }) | undefined;
		expect(u?.i).toBe('canon');
		expect(u?.n).toBe('New');
	});

	it('returns undefined for an unknown email', async () => {
		const { find_user_by_email } = await import('./index');
		expect(await find_user_by_email('nobody@x.co')).toBeUndefined();
	});
});
