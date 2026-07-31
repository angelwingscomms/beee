import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

describe('Quotes Page', () => {
  it('page file exists', () => {
    const page = readFileSync(resolve(process.cwd(), 'src/routes/quotes/+page.svelte'), 'utf8');
    expect(page).toBeTruthy();
    expect(page.length).toBeGreaterThan(0);
  });

  it('page has an appropriate title about chess quotes', () => {
    const page = readFileSync(resolve(process.cwd(), 'src/routes/quotes/+page.svelte'), 'utf8');
    expect(page).toContain('Chess Quotes');
  });

  it('page has data-testid="quotes-page"', () => {
    const page = readFileSync(resolve(process.cwd(), 'src/routes/quotes/+page.svelte'), 'utf8');
    expect(page).toContain('data-testid="quotes-page"');
  });

  it('page has quote filter buttons', () => {
    const page = readFileSync(resolve(process.cwd(), 'src/routes/quotes/+page.svelte'), 'utf8');
    expect(page).toContain('data-testid="quote-filters"');
  });

  it('page has quote cards', () => {
    const page = readFileSync(resolve(process.cwd(), 'src/routes/quotes/+page.svelte'), 'utf8');
    expect(page).toContain('data-testid="quote-card-');
  });

  it('page has stories section with real stories', () => {
    const page = readFileSync(resolve(process.cwd(), 'src/routes/quotes/+page.svelte'), 'utf8');
    expect(page).toContain('data-testid="story-card-');
  });

  it('page has modal overlay for quote details', () => {
    const page = readFileSync(resolve(process.cwd(), 'src/routes/quotes/+page.svelte'), 'utf8');
    expect(page).toContain('data-testid="modal-overlay"');
  });

  it('quote cards have pastel background colors', () => {
    const page = readFileSync(resolve(process.cwd(), 'src/routes/quotes/+page.svelte'), 'utf8');
    expect(page).toContain('style="background-color: {quote.color}"');
  });

  it('quotes data has color field for each quote', () => {
    const quotes = JSON.parse(readFileSync(resolve(process.cwd(), 'src/lib/data/quotes.json'), 'utf8'));
    expect(quotes.length).toBeGreaterThan(0);
    quotes.forEach((q: { color: string }) => {
      expect(q).toHaveProperty('color');
      expect(q.color).toMatch(/^#[0-9A-Fa-f]{6}$/);
    });
  });
});