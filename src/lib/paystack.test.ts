import { describe, it, expect, vi, beforeEach } from 'vitest';
import { get_bank_code } from './paystack';

vi.mock('$app/environment', () => ({
  get dev() { return false; },
  get browser() { return false; }
}));

vi.mock('$lib/server/secrets', () => ({
  get_secret: vi.fn(async (k: string) => {
    if (k === 'PAYSTACK_TEST') return undefined; // -> live mode
    if (k === 'PAYSTACK_SECRET_KEY_LIVE') return 'sk_live_test';
    return undefined;
  })
}));

describe('paystack_transfer', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('returns success for a normal 200 response', async () => {
    const { paystack_transfer } = await import('./paystack');
    vi.stubGlobal('fetch', vi.fn(async () => ({
      ok: true,
      text: async () => '{"status":true,"data":{"transfer_code":"TRF_1","status":"success"}}'
    })));
    const r = await paystack_transfer('RCP_1', 10000, 'Commission', 'po-reg1');
    expect(r).toEqual({ transfer_code: 'TRF_1', status: 'success' });
  });

  it('treats a duplicate transfer reference as idempotent success (no double payout)', async () => {
    const { paystack_transfer } = await import('./paystack');
    vi.stubGlobal('fetch', vi.fn(async () => ({
      ok: false,
      status: 409,
      text: async () => '{"status":false,"message":"Transfer with reference po-reg1 already exists"}'
    })));
    const r = await paystack_transfer('RCP_1', 10000, 'Commission', 'po-reg1');
    expect(r).toEqual({ transfer_code: 'po-reg1', status: 'success' });
  });

  it('throws on a non-duplicate transfer error', async () => {
    const { paystack_transfer } = await import('./paystack');
    vi.stubGlobal('fetch', vi.fn(async () => ({
      ok: false,
      status: 400,
      text: async () => '{"status":false,"message":"Invalid recipient"}'
    })));
    await expect(paystack_transfer('RCP_1', 10000, 'Commission', 'po-reg1')).rejects.toThrow(/Transfer failed/);
  });
});

describe('get_bank_code (B6: single source of truth via banks.ts)', () => {
  it('resolves canonical codes that match the UI list, not the old divergent map', () => {
    expect(get_bank_code('Globus Bank')).toBe('00103');
    expect(get_bank_code('PalmPay')).toBe('999991');
    expect(get_bank_code('OPay')).toBe('999992');
  });

  it('resolves by alias and is case/space insensitive', () => {
    expect(get_bank_code('access bank')).toBe('044');
    expect(get_bank_code('  GTBank ')).toBe('058');
    expect(get_bank_code('United Bank for Africa')).toBe('033');
  });

  it('returns null for an unknown bank', () => {
    expect(get_bank_code('Not A Real Bank')).toBeNull();
  });
});
