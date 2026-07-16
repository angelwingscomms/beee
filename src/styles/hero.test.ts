import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

const css = readFileSync(resolve(process.cwd(), 'src/styles/hero.css'), 'utf8');

describe('hero.css display type scale', () => {
  it('makes .display-xl fluid using the new token', () => {
    expect(css).toContain('.display-xl {\n  max-width: 780px;\n  font-size: var(--fs-display-2xl);\n  line-height: 1.05;\n}');
  });

  it('makes .display-lg, .display-md, .display-sm fluid using the new tokens', () => {
    expect(css).toContain('font-size: var(--fs-display-xl);');
    expect(css).toContain('font-size: var(--fs-display-lg);');
    expect(css).toContain('font-size: var(--fs-display-md);');
  });
});
