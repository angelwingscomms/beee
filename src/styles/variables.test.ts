import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

const css = readFileSync(resolve(process.cwd(), 'src/styles/variables.css'), 'utf8');

describe('variables.css design tokens', () => {
  it('defines the fluid display type scale', () => {
    expect(css).toContain('--fs-display-2xl: clamp(3rem, 1.4rem + 7vw, 7.5rem);');
    expect(css).toContain('--fs-display-xl: clamp(2.5rem, 1.4rem + 5vw, 5.75rem);');
    expect(css).toContain('--fs-display-lg: clamp(2.125rem, 1.4rem + 3.2vw, 4rem);');
    expect(css).toContain('--fs-display-md: clamp(1.75rem, 1.35rem + 1.8vw, 2.75rem);');
    expect(css).toContain('--fs-display-sm: clamp(1.375rem, 1.2rem + 0.8vw, 1.75rem);');
  });

  it('extends the spacing scale', () => {
    expect(css).toContain('--space-0: 4px;');
    expect(css).toContain('--space-7: 96px;');
    expect(css).toContain('--space-8: 128px;');
  });

  it('defines the premium easing tokens', () => {
    expect(css).toContain('--ease-out: cubic-bezier(0.22, 1, 0.36, 1);');
    expect(css).toContain('--ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1);');
  });

  it('removes dead legacy alias tokens', () => {
    expect(css).not.toContain('--gold:');
    expect(css).not.toContain('--muted-dark:');
    expect(css).not.toContain('--ink-dark:');
    expect(css).not.toContain('--cream:');
    expect(css).not.toContain('--panel:');
    expect(css).not.toContain('--panel-strong:');
    expect(css).not.toContain('--sticky-cta-z:');
  });

  it('keeps tokens that are still consumed elsewhere', () => {
    expect(css).toContain('--glass-blur: 16px;');
    expect(css).toContain('--noise-opacity: 0.03;');
  });
});
