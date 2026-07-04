import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

const page = readFileSync('src/routes/+page.svelte', 'utf8');

describe('home journey scroll', () => {
  it('uses animejs onScroll for sticky horizontal scroll', () => {
    expect(page).toContain("import { animate, onScroll } from 'animejs'");
    expect(page).toContain("autoplay: onScroll({");
    expect(page).toContain("sync: true");
  });
});
