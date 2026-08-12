import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

describe('register page partner-code warning', () => {
  const page = readFileSync(resolve(process.cwd(), 'src/routes/register/+page.svelte'), 'utf8');

  it('bolds the partner code label', () => {
    expect(page).toContain('@layer utilities');
    expect(page).toContain('font-weight: 700 !important');
  });

  it('warns under the input when the typed valid code differs from the ?c= URL code', () => {
    expect(page).toContain("const urlCode = $derived(($page.url.searchParams.get('c') || '').trim());");
    expect(page).toContain('acValid === true');
    expect(page).toContain('ac.trim().toLowerCase() !== urlCode.toLowerCase()');
    expect(page).toContain('class="reg-partner-warning"');
    expect(page).toContain('This is not the partner code you came with');
  });

  it('only warns once the code is confirmed valid (not while checking)', () => {
    expect(page).toContain('!acLoading');
  });
});
