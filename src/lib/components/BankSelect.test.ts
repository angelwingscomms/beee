import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import { banks } from '$lib/data/banks';

const bank_select = readFileSync(resolve(process.cwd(), 'src/lib/components/BankSelect.svelte'), 'utf8');

describe('BankSelect component', () => {
  it('renders trigger with placeholder', () => {
    expect(bank_select).toContain('Select bank...');
  });

  it('has search input inside dropdown', () => {
    expect(bank_select).toContain('Search bank...');
    expect(bank_select).toContain('searchbox');
  });

  it('shows no-results message', () => {
    expect(bank_select).toContain('No banks found');
  });

  it('has keyboard navigation handlers', () => {
    expect(bank_select).toContain('ArrowDown');
    expect(bank_select).toContain('ArrowUp');
    expect(bank_select).toContain('Enter');
    expect(bank_select).toContain('Escape');
  });

  it('filters by both name and aliases', () => {
    // Filtering checks bank.n and bank.a
    expect(bank_select).toContain('b.n.toLowerCase().includes(search.toLowerCase())');
    expect(bank_select).toContain('b.a.some(a => a.toLowerCase().includes(search.toLowerCase()))');
  });
});

describe('banks data file', () => {
  it('has 257 banks', () => {
    expect(banks.length).toBe(257);
  });

  it('includes major Nigerian banks with correct codes', () => {
    const access = banks.find(b => b.n === 'Access Bank');
    expect(access?.c).toBe('044');

    const gtb = banks.find(b => b.n === 'Guaranty Trust Bank');
    expect(gtb?.c).toBe('058');

    const uba = banks.find(b => b.n === 'United Bank For Africa');
    expect(uba?.c).toBe('033');

    const first = banks.find(b => b.n === 'First Bank of Nigeria');
    expect(first?.c).toBe('011');

    const zenith = banks.find(b => b.n === 'Zenith Bank');
    expect(zenith?.c).toBe('057');

    const kuda = banks.find(b => b.n === 'Kuda Bank');
    expect(kuda?.c).toBe('50211');
  });

  it('has common aliases', () => {
    const gtb = banks.find(b => b.n === 'Guaranty Trust Bank');
    expect(gtb?.a).toContain('GTBank');

    const uba = banks.find(b => b.n === 'United Bank For Africa');
    expect(uba?.a).toContain('UBA');

    const fcmb = banks.find(b => b.n === 'First City Monument Bank');
    expect(fcmb?.a).toContain('FCMB');

    const paystack_banks = banks.filter(b => b.c.length > 0);
    expect(paystack_banks.length).toBe(257);
  });

  it('has unique codes for distinct banks', () => {
    const codes = banks.map(b => b.c);
    const dupes = codes.filter((c, i) => codes.indexOf(c) !== i);
    // Allow same-code entries that are the same bank (e.g. BANKIT MFB variants)
    for (const code of dupes) {
      const same = banks.filter(b => b.c === code);
      const names = same.map(b => b.n);
      // They should share at least one common word
      const share = names.some(n1 => names.some(n2 => n1 !== n2 && n1.split(' ').some(w => w.length > 2 && n2.includes(w))));
      expect(share).toBe(true);
    }
  });
});
