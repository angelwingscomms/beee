// Shared vitest harness for registration-payment + partner-payout tests.
// Provides an in-memory stand-in for Qdrant (collection 'i') plus controllable
// Paystack + secrets mocks. Each test file calls createQdrantStore() /
// createPaystackMock() at module scope and wires them into vi.mock factories.

import { vi } from 'vitest';
import type { PayloadFilter } from '$lib/db';

export interface QdrantStore {
	store: Map<string, any>;
	reset: () => void;
	search_by_payload: (filter: PayloadFilter, _wp?: any, limit?: number) => Promise<any[]>;
	get: (id: string) => Promise<any>;
	create: (payload: any, _embed?: string, i?: string) => Promise<string>;
	edit_point: (id: string, data: any) => Promise<any>;
	find_or_create_player_user: (email: string, name: string, ph?: string) => Promise<string>;
	new_id: () => string;
}

export function createQdrantStore(): QdrantStore {
	const store = new Map<string, any>();
	const id = (p?: string) => p || `id_${Math.random().toString(36).slice(2)}`;

	const matches = (r: any, filter: PayloadFilter): boolean =>
		Object.entries(filter).every(
			([k, v]) => v === undefined || v === null || v === '' || r[k] === v
		);

	const db: QdrantStore = {
		store,
		reset: () => store.clear(),
		search_by_payload: async (filter, _wp, limit = 144) =>
			[...store.values()].filter((r) => matches(r, filter)).slice(0, limit),
		get: async (i) => store.get(i) ?? null,
		create: async (payload, _embed, i) => {
			const key = id(i);
			store.set(key, { ...payload, i: key });
			return key;
		},
		edit_point: async (i, data) => {
			store.set(i, { ...store.get(i), ...data, i });
			return store.get(i);
		},
		find_or_create_player_user: async (email, name, ph) => {
			const existing = [...store.values()].find((u) => u.s === 'u' && u.e === email);
			if (existing) {
				if (!existing.c?.includes('rpb')) existing.c = [...(existing.c || []), 'rpb'];
				return existing.i;
			}
			const key = id();
			store.set(key, { s: 'u', e: email, n: name, d: Date.now(), c: ['rpb'], p: ph, i: key });
			return key;
		},
		new_id: () => id()
	};
	return db;
}

export interface PaystackControls {
	resolve_bank: ReturnType<typeof vi.fn>;
	create_recipient: ReturnType<typeof vi.fn>;
	balance: ReturnType<typeof vi.fn>;
	transfer: ReturnType<typeof vi.fn>;
	verify: ReturnType<typeof vi.fn>;
	init: ReturnType<typeof vi.fn>;
}

export function createPaystackMock(): { mock: Record<string, any>; controls: PaystackControls } {
	const resolve_bank = vi.fn(async () => ({ account_name: 'Test Account' }));
	const create_recipient = vi.fn(async () => ({ recipient_code: 'RCP_1', active: true }));
	const balance = vi.fn(async () => 1_000_000_000);
	const transfer = vi.fn(async () => ({ transfer_code: 'TRF_1', status: 'success' }));
	const verify = vi.fn(async (r: string) => ({
		status: 'success',
		reference: r,
		amount: 0,
		customer: { email: '' },
		metadata: {}
	}));
	const init = vi.fn(async (_email: string, _amt: number, registration_id: string) => ({
		authorization_url: 'https://paystack.test/x',
		access_code: 'ACC_1',
		reference: registration_id
	}));
	const mock = {
		paystack_resolve_bank: resolve_bank,
		paystack_create_recipient: create_recipient,
		paystack_balance: balance,
		paystack_transfer: transfer,
		paystack_verify: verify,
		paystack_init: init,
		get_bank_code: (bn: string) => (bn ? '057' : null),
		verify_webhook_sig: async () => true
	};
	return { mock, controls: { resolve_bank, create_recipient, balance, transfer, verify, init } };
}
