import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import { banks } from '$lib/data/banks';

const page = readFileSync(resolve(process.cwd(), 'src/routes/partner/settings/+page.svelte'), 'utf8');
const server = readFileSync(resolve(process.cwd(), 'src/routes/api/partner/settings/+server.ts'), 'utf8');
const page_server = readFileSync(resolve(process.cwd(), 'src/routes/partner/settings/+page.server.ts'), 'utf8');

describe('partner settings page', () => {
  it('imports BankSelect', () => {
    expect(page).toContain("import BankSelect from '$lib/components/BankSelect.svelte'");
  });

  it('has bank select field with validation', () => {
    expect(page).toContain('<BankSelect');
    expect(page).toContain('bke'); // bank code error state
    expect(page).toContain('onBankSelect');
  });

  it('sends bk in POST body', () => {
    expect(page).toContain('bk');
    expect(page).toContain("body: JSON.stringify({ ba: ba.trim(), bn, bk })");
  });

  it('validates bank code instead of bank name length', () => {
    expect(page).toContain("if (!bk) { bke = 'Please select your bank'; v = false; }");
    expect(page).not.toContain("bn.trim().length < 2");
  });
});

describe('API endpoint', () => {
  it('accepts and validates bk field', () => {
    expect(server).toContain('const { ba, bn, bk } = await request.json()');
    expect(server).toContain("if (!bk || typeof bk !== 'string' || bk.length < 1)");
    expect(server).toContain("Bank selection is required");
  });

  it('stores bk alongside ba and bn', () => {
    expect(server).toContain('bk: bk.trim()');
  });
});

describe('page server load', () => {
  it('passes bk to page data', () => {
    expect(page_server).toContain('bk: user.bk');
  });
});

describe('banks data coverage', () => {
  it('includes all banks from the old hardcoded map', () => {
    // Old map had these entries; verify they all still resolve
    const checks: [string, string][] = [
      ['Access Bank', '044'],
      ['Access Bank (Diamond)', '063'],
      ['Citibank Nigeria', '023'],
      ['Ecobank Nigeria', '050'],
      ['Fidelity Bank', '070'],
      ['First Bank of Nigeria', '011'],
      ['First City Monument Bank', '214'],
      ['Globus Bank', '00103'],
      ['Guaranty Trust Bank', '058'],
      ['Jaiz Bank', '301'],
      ['Keystone Bank', '082'],
      ['Kuda Bank', '50211'],
      ['Moniepoint MFB', '50515'],
      ['PalmPay', '999991'],
      ['Polaris Bank', '076'],
      ['Providus Bank', '101'],
      ['Stanbic IBTC Bank', '221'],
      ['Standard Chartered Bank', '068'],
      ['Sterling Bank', '232'],
      ['Suntrust Bank', '100'],
      ['Titan Bank', '102'],
      ['Union Bank of Nigeria', '032'],
      ['United Bank For Africa', '033'],
      ['Unity Bank', '215'],
      ['Wema Bank', '035'],
      ['Zenith Bank', '057'],
    ];
    for (const [name, code] of checks) {
      const b = banks.find(x => x.n === name);
      expect(b).toBeDefined();
      expect(b!.c).toBe(code);
    }
  });

  it('finds banks by alias', () => {
    expect(banks.find(b => b.a.includes('GTBank'))?.c).toBe('058');
    expect(banks.find(b => b.a.includes('UBA'))?.c).toBe('033');
    expect(banks.find(b => b.a.includes('FCMB'))?.c).toBe('214');
    expect(banks.find(b => b.a.includes('Kuda'))?.c).toBe('50211');
    expect(banks.find(b => b.a.includes('Moniepoint'))?.c).toBe('50515');
    expect(banks.find(b => b.a.includes('OPay'))?.c).toBe('999992');
    expect(banks.find(b => b.a.includes('First Bank'))?.c).toBe('011');
    expect(banks.find(b => b.a.includes('Skye Bank'))?.c).toBe('076');
  });
});
