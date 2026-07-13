import { describe, it, expect, vi, beforeEach } from 'vitest';

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
      json: async () => ({ status: true, data: { transfer_code: 'TRF_1', status: 'success' } })
    })));
    const r = await paystack_transfer('RCP_1', 10000, 'Commission', 'PO-reg1');
    expect(r).toEqual({ transfer_code: 'TRF_1', status: 'success' });
  });

  it('treats a duplicate transfer reference as idempotent success (no double payout)', async () => {
    const { paystack_transfer } = await import('./paystack');
    vi.stubGlobal('fetch', vi.fn(async () => ({
      ok: false,
      status: 409,
      text: async () => '{"status":false,"message":"Transfer with reference PO-reg1 already exists"}'
    })));
    const r = await paystack_transfer('RCP_1', 10000, 'Commission', 'PO-reg1');
    expect(r).toEqual({ transfer_code: 'PO-reg1', status: 'success' });
  });

  it('throws on a non-duplicate transfer error', async () => {
    const { paystack_transfer } = await import('./paystack');
    vi.stubGlobal('fetch', vi.fn(async () => ({
      ok: false,
      status: 400,
      text: async () => '{"status":false,"message":"Invalid recipient"}'
    })));
    await expect(paystack_transfer('RCP_1', 10000, 'Commission', 'PO-reg1')).rejects.toThrow(/Transfer failed/);
  });
});
