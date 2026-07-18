import { describe, it, expect, vi, beforeEach } from 'vitest';
import type { Registration } from '$lib/types/registration';
import { MIN_TRANSFER_AMNT } from '$lib/constants';

let mock_dev = false;

vi.mock('$app/environment', () => ({
    get dev() { return mock_dev; },
    get browser() { return false; },
}));

const store = new Map<string, any>();

vi.mock('$lib/db', () => ({
  search_by_payload: vi.fn(async (filter: Record<string, unknown>) => {
    if (filter.s === 'u' && filter.ac) return mockUsers.filter(u => u.ac === filter.ac);
    if (filter.s === 'u' && filter.i) return mockUsers.filter(u => u.i === filter.i);
    if (filter.s === 'po') {
      return [...store.values()].filter(p =>
        p.s === 'po' &&
        (filter.st === undefined || p.st === filter.st) &&
        (filter.ref === undefined || p.ref === filter.ref)
      );
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
  paystack_balance: vi.fn(async () => 1_000_000_000),
  paystack_transfer: (...args: any[]) => mock_transfer(...args)
}));

vi.mock('$lib/email', () => ({
  send_partner_notification: vi.fn(async () => {})
}));

const mockUsers: Array<any> = [];

const AFF = {
  s: 'u', i: 'aff1', ac: 'AFF123', c: ['fab'], e: 'partner@example.com',
  n: 'Partner', ba: '1234567890', bn: 'Zenith Bank', bk: '057'
};

function reg(over: Partial<any> = {}): Registration {
  return { s: 'reg', e: 'player@example.com', fn: 'Play', ln: 'Er', p: '+234801234567', st: 'r', v: 0, d: Date.now(), amt: 1_350_000, ac: 'AFF123', ...over };
}

describe('process_partner_payout', () => {
  beforeEach(() => {
    store.clear();
    mockUsers.length = 0;
    mockUsers.push({ ...AFF });
    mock_transfer.mockReset();
    mock_transfer.mockResolvedValue({ transfer_code: 'TRF_1', status: 'success' });
  });

  it('blocks self-referral and never transfers', async () => {
    const { process_partner_payout } = await import('./partner');
    await process_partner_payout(reg({ e: 'partner@example.com' }), 'reg_self', undefined);
    expect(mock_transfer).not.toHaveBeenCalled();
    const rec = store.get('po_reg_self');
    expect(rec.st).toBe('b');
  });

  it('uses a deterministic lowercase transfer reference po-<reg_id>', async () => {
    const { process_partner_payout } = await import('./partner');
    await process_partner_payout(reg(), 'reg1', undefined);
    expect(mock_transfer).toHaveBeenCalledTimes(1);
    expect(mock_transfer).toHaveBeenCalledWith('RCP_1', expect.any(Number), 'Commission: reg1', 'po-reg1');
  });

  it('is a no-op on a second call (record already exists)', async () => {
    const { process_partner_payout } = await import('./partner');
    await process_partner_payout(reg(), 'reg2', undefined);
    await process_partner_payout(reg(), 'reg2', undefined);
    expect(mock_transfer).toHaveBeenCalledTimes(1);
  });

  it('marks payout failed when the transfer genuinely errors', async () => {
    const { process_partner_payout } = await import('./partner');
    mock_transfer.mockRejectedValueOnce(new Error('Transfer failed: network down'));
    await process_partner_payout(reg(), 'reg3', undefined);
    const rec = store.get('po_reg3');
    expect(rec.st).toBe('f');
  });

    it('stores the payout as success after a real transfer', async () => {
      const { process_partner_payout } = await import('./partner');
      await process_partner_payout(reg(), 'reg4', undefined);
      const rec = store.get('po_reg4');
      expect(rec.st).toBe('s');
      expect(rec.ref).toBe('po-reg4');
      expect(rec.tr).toBe('TRF_1');
      expect(rec.amt).toBe(135_000);
    });

    it('transfers the minimum transfer amount to the affiliate in dev mode', async () => {
      mock_dev = true;
      const { process_partner_payout } = await import('./partner');
      // tiny reg fee so a commission % would fall below Paystack's transfer floor
      await process_partner_payout(reg({ amt: 15_000 }), 'regDev', undefined);
      expect(mock_transfer).toHaveBeenCalledWith('RCP_1', MIN_TRANSFER_AMNT, 'Commission: regDev', 'po-regDev');
      const rec = store.get('po_regDev');
      expect(rec.amt).toBe(MIN_TRANSFER_AMNT);
    });
});

describe('retry_failed_payouts', () => {
  beforeEach(() => {
    store.clear();
    mockUsers.length = 0;
    mockUsers.push({ ...AFF });
    mock_transfer.mockReset();
    mock_transfer.mockResolvedValue({ transfer_code: 'TRF_2', status: 'success' });
  });

  it('re-runs a failed payout with the same reference and marks it success', async () => {
    const { retry_failed_payouts } = await import('./partner');
    // seed a failed payout + its registration
    store.set('po_regR', { s: 'po', reg_id: 'regR', partner_id: 'aff1', ac: 'AFF123', amt: 135_000, st: 'f', ref: 'po-regR', at: 1, d: Date.now() });
    store.set('regR', reg({ amt: 1_350_000 }));
    const res = await retry_failed_payouts(undefined);
    expect(res.retried).toBe(1);
    expect(res.succeeded).toBe(1);
    const rec = store.get('po_regR');
    expect(rec.st).toBe('s');
    expect(rec.at).toBe(2);
  });

  it('does not double-credit: transfer called once for an existing success', async () => {
    const { retry_failed_payouts } = await import('./partner');
    store.set('po_regR', { s: 'po', reg_id: 'regR', partner_id: 'aff1', ac: 'AFF123', amt: 135_000, st: 's', ref: 'po-regR', at: 1, d: Date.now() });
    store.set('regR', reg());
    const res = await retry_failed_payouts(undefined);
    expect(res.scanned).toBe(0);
    expect(mock_transfer).not.toHaveBeenCalled();
  });
});

describe('reconcile_transfer_payout', () => {
  beforeEach(() => { store.clear(); mockUsers.length = 0; });

  it('updates payout status from a transfer webhook', async () => {
    const { reconcile_transfer_payout } = await import('./partner');
    store.set('po_regX', { s: 'po', reg_id: 'regX', partner_id: 'aff1', ac: 'AFF123', amt: 135_000, st: 'r', ref: 'po-regX', at: 1, d: Date.now() });
    await reconcile_transfer_payout('po-regX', 's');
    expect(store.get('po_regX').st).toBe('s');
  });
});

describe('bug regressions', () => {
  beforeEach(() => {
    store.clear();
    mockUsers.length = 0;
    mockUsers.push({ ...AFF });
    mock_transfer.mockReset();
    mock_transfer.mockResolvedValue({ transfer_code: 'TRF_1', status: 'success' });
  });

  it('B2: missing bank details records a retryable failed payout (no silent loss)', async () => {
    const { process_partner_payout } = await import('./partner');
    mockUsers.length = 0;
    mockUsers.push({ s: 'u', i: 'aff_nobank', ac: 'AFF123', c: ['fab'], e: 'partner@example.com', n: 'Partner' });
    await process_partner_payout(reg(), 'reg_nb', undefined);
    const rec = store.get('po_reg_nb');
    expect(rec).toBeTruthy();
    expect(rec.st).toBe('f');
    expect(mock_transfer).not.toHaveBeenCalled();
  });

  it('B3: retry_failed_payouts also retries stuck processing payouts', async () => {
    const { retry_failed_payouts } = await import('./partner');
    store.set('po_proc', { s: 'po', reg_id: 'regProc', partner_id: 'aff1', ac: 'AFF123', amt: 135_000, st: 'p', ref: 'po-regProc', at: 1, d: Date.now() });
    store.set('regProc', reg({ amt: 1_350_000 }));
    const res = await retry_failed_payouts(undefined);
    expect(res.retried).toBe(1);
    expect(mock_transfer).toHaveBeenCalled();
  });

  it('B9: missing registration amount records failed (no NaN transfer)', async () => {
    const { process_partner_payout } = await import('./partner');
    await process_partner_payout(reg({ amt: undefined as any }), 'regNaN', undefined);
    const rec = store.get('po_regNaN');
    expect(rec.st).toBe('f');
    expect(mock_transfer).not.toHaveBeenCalled();
  });

  it('B12: reconcile updates the exact payout when refs are duplicated', async () => {
    const { reconcile_transfer_payout } = await import('./partner');
    store.set('po_regA', { s: 'po', reg_id: 'regA', partner_id: 'aff1', ac: 'AFF123', amt: 1, st: 'r', ref: 'po-regA', at: 1, d: Date.now() });
    store.set('po_regB', { s: 'po', reg_id: 'regB', partner_id: 'aff1', ac: 'AFF123', amt: 1, st: 'r', ref: 'po-regA', at: 1, d: Date.now() });
    await reconcile_transfer_payout('po-regA', 's');
    expect(store.get('po_regA').st).toBe('s');
    expect(store.get('po_regB').st).toBe('r');
  });

  // B11: cross-email self-referral. Email-match self-referral IS blocked (see
  // the "blocks self-referral" test above). But a partner registering a second
  // account under a DIFFERENT email is currently NOT detected — that requires
  // authenticated linking. Documented here as a known limitation pending the
  // product decision; the assertion pins the CURRENT permissive behavior.
  it('B11: cross-email self-referral is currently allowed (known gap — needs auth to prevent)', async () => {
    const { process_partner_payout } = await import('./partner');
    await process_partner_payout(reg({ e: 'other-alt@example.com' }), 'reg_xemail', undefined);
    expect(mock_transfer).toHaveBeenCalledTimes(1);
    expect(store.get('po_reg_xemail').st).toBe('s');
  });
});
