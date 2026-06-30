import { describe, it, expect, vi, beforeEach } from 'vitest';

let mock_dev = false;

const mock_env = vi.hoisted(() => ({
	PAYSTACK_TEST: undefined as string | undefined,
	PAYSTACK_SECRET_KEY: undefined as string | undefined,
	PAYSTACK_SECRET_KEY_TEST: undefined as string | undefined,
	PAYSTACK_SECRET_KEY_LIVE: undefined as string | undefined,
}));

vi.mock('$env/static/private', () => ({
	get PAYSTACK_TEST() { return mock_env.PAYSTACK_TEST; },
	get PAYSTACK_SECRET_KEY() { return mock_env.PAYSTACK_SECRET_KEY; },
	get PAYSTACK_SECRET_KEY_TEST() { return mock_env.PAYSTACK_SECRET_KEY_TEST; },
	get PAYSTACK_SECRET_KEY_LIVE() { return mock_env.PAYSTACK_SECRET_KEY_LIVE; },
}));

vi.mock('$app/environment', () => ({
	get dev() { return mock_dev; },
}));

describe('Paystack Key Selection Logic', () => {
	beforeEach(() => {
		mock_env.PAYSTACK_TEST = undefined;
		mock_env.PAYSTACK_SECRET_KEY = undefined;
		mock_env.PAYSTACK_SECRET_KEY_TEST = undefined;
		mock_env.PAYSTACK_SECRET_KEY_LIVE = undefined;
		mock_dev = false;
		vi.resetModules();
	});

	it('should use TEST key if PAYSTACK_TEST is dot "."', async () => {
		mock_env.PAYSTACK_TEST = '.';
		mock_env.PAYSTACK_SECRET_KEY_TEST = 'sk_test_123';
		mock_env.PAYSTACK_SECRET_KEY_LIVE = 'sk_live_456';
		const { get_secret_key } = await import('./paystack');
		expect(get_secret_key()).toBe('sk_test_123');
	});

	it('should use LIVE key if PAYSTACK_TEST is "0"', async () => {
		mock_env.PAYSTACK_TEST = '0';
		mock_env.PAYSTACK_SECRET_KEY_TEST = 'sk_test_123';
		mock_env.PAYSTACK_SECRET_KEY_LIVE = 'sk_live_456';
		const { get_secret_key } = await import('./paystack');
		expect(get_secret_key()).toBe('sk_live_456');
	});

	it('should fallback to dev check if PAYSTACK_TEST is undefined (dev = true => test key)', async () => {
		mock_dev = true;
		mock_env.PAYSTACK_SECRET_KEY_TEST = 'sk_test_123';
		mock_env.PAYSTACK_SECRET_KEY_LIVE = 'sk_live_456';
		const { get_secret_key } = await import('./paystack');
		expect(get_secret_key()).toBe('sk_test_123');
	});

	it('should fallback to dev check if PAYSTACK_TEST is undefined (dev = false => live key)', async () => {
		mock_dev = false;
		mock_env.PAYSTACK_SECRET_KEY_TEST = 'sk_test_123';
		mock_env.PAYSTACK_SECRET_KEY_LIVE = 'sk_live_456';
		const { get_secret_key } = await import('./paystack');
		expect(get_secret_key()).toBe('sk_live_456');
	});
});
