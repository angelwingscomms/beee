import { describe, it, expect, vi } from 'vitest';
import { derive_badges } from './load';
import type { Registration } from '$lib/types/registration';

const reg = (st: Registration['st']): Registration => ({ s: 'reg', e: 'a@b.co', p: '', st }) as Registration;

describe('derive_badges', () => {
	it('marks Registered + Payment Confirmed from a paid registration', () => {
		const b = derive_badges([reg('paid')], null, null);
		expect(b.find((x) => x.label === 'Registered')?.done).toBe(true);
		expect(b.find((x) => x.label === 'Payment Confirmed')?.done).toBe(true);
	});

	it('leaves badges undone with no data', () => {
		const b = derive_badges([], null, null);
		expect(b.every((x) => x.done === false)).toBe(true);
	});

	it('marks TEAMUP + Partner from profile classes', () => {
		const b = derive_badges([], { c: ['rpb', 'fab'] } as any, null);
		expect(b.find((x) => x.label === 'TEAMUP Enrolled')?.done).toBe(true);
		expect(b.find((x) => x.label === 'Partner')?.done).toBe(true);
	});

	it('marks e4 Linked when an e4 account is present', () => {
		const b = derive_badges([], null, { balance: 0, games: 3 });
		expect(b.find((x) => x.label === 'e4 Linked')?.done).toBe(true);
	});
});

describe('load_dashboard', () => {
	it('redirects unauthenticated users to login', async () => {
		const { load_dashboard } = await import('./load');
		let thrown: { status?: number } | null = null;
		try {
			await load_dashboard({ user: null } as App.Locals);
		} catch (e) {
			thrown = e as { status?: number };
		}
		expect(thrown).not.toBeNull();
		expect(thrown?.status).toBe(302);
	});
});

describe('load_e4', () => {
  it('looks up the user by email (e), not the session field (m)', async () => {
    const { load_dashboard } = await import('./load');
    const calls: Record<string, unknown>[] = [];
    vi.spyOn(await import('$lib/db'), 'search_by_payload').mockImplementation(
      async (filter: Record<string, unknown>) => {
        calls.push(filter);
        if (filter.s === 'u' && filter.e === 'e4@b.co') return [{ i: 'u_abc', d: 123 } as any];
        if (filter.u === 'abc' && !('s' in filter)) return [{ t: 50 } as any];
        if (filter.s === 'g' && filter.u === 'abc')
          return [{ s: 'g', u: 'abc' } as any, { s: 'g', u: 'abc' } as any];
        return [] as any;
      }
    );
    const out = await load_dashboard({ user: { id: 'u_abc', email: 'e4@b.co' } } as App.Locals);
    expect(calls.some((c) => c.s === 'u' && c.e === 'e4@b.co' && !('m' in c))).toBe(true);
    expect(out.e4).toEqual({ joined: 123, balance: 50, games: 2 });
    vi.restoreAllMocks();
  });
});

describe('load_dashboard multi-kid (same parent email)', () => {
  it('returns all registrations for the parent email, including multiple paid', async () => {
    const { load_dashboard } = await import('./load');
    const paidA = { s: 'reg', i: 'reg_a', e: 'mom@b.co', fn: 'Kid', ln: 'A', sn: 'School1', st: 'paid', p: '', amt: 0, v: 0, d: 0 } as any;
    const paidB = { s: 'reg', i: 'reg_b', e: 'mom@b.co', fn: 'Kid', ln: 'B', sn: 'School2', st: 'paid', p: '', amt: 0, v: 0, d: 0 } as any;
    const pending = { s: 'reg', i: 'reg_c', e: 'mom@b.co', fn: 'Kid', ln: 'C', sn: 'School3', st: 'pending', p: '', amt: 0, v: 0, d: 0 } as any;
    const profile = { s: 'u', i: 'u_mom', e: 'mom@b.co', c: ['rpb'], d: 0 } as any;
    vi.spyOn(await import('$lib/db'), 'search_by_payload').mockImplementation(
      async (filter: Record<string, unknown>) => {
        if (filter.s === 'u' && filter.e === 'mom@b.co') return [profile];
        if (filter.s === 'reg' && filter.e === 'mom@b.co')
          return [paidA, paidB, pending];
        return [] as any;
      }
    );
    const out = await load_dashboard({ user: { id: 'u_mom', email: 'mom@b.co' } } as App.Locals);
    expect(out.registrations.length).toBe(3);
    expect(out.registrations.filter((r) => r.st === 'paid').length).toBe(2);
    expect(out.registrations.map((r) => r.i).sort()).toEqual(['reg_a', 'reg_b', 'reg_c']);
    vi.restoreAllMocks();
  });
});
