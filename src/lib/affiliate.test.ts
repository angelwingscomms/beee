import { describe, it, expect, vi, beforeEach } from 'vitest';
import type { Registration } from '$lib/types/registration';

const store = new Map<string, any>();

vi.mock('$lib/db', () => ({
  search_by_payload: vi.fn(async (filter: Record<string, unknown>) => {
    if (filter.s === 'u' && filter.ac) {
      return mockUsers.filter(u => u.ac === filter.ac);
    }
    return [];
  }),
  get: vi.fn(async (id: string) => store.get(id) ?? null),
  create: vi.fn(async (payload: any, _embed?: string, i?: string) => {
    const id = i ?? `rand_${Math.random()}`;
    store.set(id, { ...payload, i });
    return id;
  })
}));

const mock_transfer = vi.fn();

vi.mock('$lib/paystack', () => ({
  paystack_resolve_bank: vi.fn(async () => ({ account_name: 'Test Account' })),
  paystack_create_recipient: vi.fn(async () => ({ recipient_code: 'RCP_1', active: true })),
  paystack_transfer: (...args: any[]) => mock_transfer(...args)
}));

vi.mock('$lib/email', () => ({
  send_affiliate_notification: vi.fn(async () => {})
}));

const mockUsers: Array<any> = [];

const AFF = {
  s: 'u', i: 'aff1', ac: 'AFF123', c: ['fab'], e: 'aff@example.com',
  n: 'Affiliate', ba: '1234567890', bn: 'Zenith Bank', bk: '057'
};

function reg(over: Partial<any> = {}): Registration {
  return { s: 'reg', e: 'player@example.com', fn: 'Play', ln: 'Er', p: '+234801234567', st: 'pending', v: 0, d: Date.now(), amt: 1_350_000, ac: 'AFF123', ...over };
}

describe('process_affiliate_payout', () => {
  beforeEach(() => {
    store.clear();
    mockUsers.length = 0;
    mockUsers.push({ ...AFF });
    mock_transfer.mockReset();
    mock_transfer.mockResolvedValue({ transfer_code: 'TRF_1', status: 'success' });
  });

  it('blocks self-referral and never transfers', async () => {
    const { process_affiliate_payout } = await import('./affiliate');
    await process_affiliate_payout(reg({ e: 'aff@example.com' }), 'reg_self', undefined);
    expect(mock_transfer).not.toHaveBeenCalled();
    const rec = store.get('po_reg_self');
    expect(rec.st).toBe('blocked_self');
  });

  it('uses a deterministic transfer reference PO-<reg_id>', async () => {
    const { process_affiliate_payout } = await import('./affiliate');
    await process_affiliate_payout(reg(), 'reg1', undefined);
    expect(mock_transfer).toHaveBeenCalledTimes(1);
    expect(mock_transfer).toHaveBeenCalledWith('RCP_1', expect.any(Number), 'Commission: reg1', 'PO-reg1');
  });

  it('is a no-op on a second call (record already exists)', async () => {
    const { process_affiliate_payout } = await import('./affiliate');
    await process_affiliate_payout(reg(), 'reg2', undefined);
    await process_affiliate_payout(reg(), 'reg2', undefined);
    expect(mock_transfer).toHaveBeenCalledTimes(1);
  });

  it('marks payout failed when the transfer genuinely errors', async () => {
    const { process_affiliate_payout } = await import('./affiliate');
    mock_transfer.mockRejectedValueOnce(new Error('Transfer failed: network down'));
    await process_affiliate_payout(reg(), 'reg3', undefined);
    const rec = store.get('po_reg3');
    expect(rec.st).toBe('failed');
  });

  it('stores the payout as success after a real transfer', async () => {
    const { process_affiliate_payout } = await import('./affiliate');
    await process_affiliate_payout(reg(), 'reg4', undefined);
    const rec = store.get('po_reg4');
    expect(rec.st).toBe('success');
    expect(rec.ref).toBe('PO-reg4');
    expect(rec.tr).toBe('TRF_1');
    expect(rec.amt).toBe(135_000);
  });
});
