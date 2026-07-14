import { describe, it, expect } from 'vitest';
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

	it('marks T.E.A.M.U.P. + Partner from profile classes', () => {
		const b = derive_badges([], { c: ['rpb', 'fab'] } as any, null);
		expect(b.find((x) => x.label === 'T.E.A.M.U.P. Enrolled')?.done).toBe(true);
		expect(b.find((x) => x.label === 'Partner')?.done).toBe(true);
	});

	it('marks E4 Linked when an e4 account is present', () => {
		const b = derive_badges([], null, { balance: 0, games: 3 });
		expect(b.find((x) => x.label === 'E4 Linked')?.done).toBe(true);
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
