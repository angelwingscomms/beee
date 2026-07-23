import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

const css = readFileSync(resolve(process.cwd(), 'src/styles/variables.css'), 'utf8');

describe('variables.css SPEC-TRUM tokens', () => {
  it('defines the SPEC-TRUM palette', () => {
    expect(css).toContain('--cloud: #F1EEE7;');
    expect(css).toContain('--nightfall: #0A0F1A;');
    expect(css).toContain('--beam: #F27830;');
    expect(css).toContain('--honey: #FFB200;');
  });

  it('defines the SPEC-TRUM type scale', () => {
    expect(css).toContain('--fs-d1: clamp(44px, 10.14vw + 6px, 152px);');
  });

  it('defines the house easing and section padding', () => {
    expect(css).toContain('--ease-out: cubic-bezier(0.16, 1, 0.3, 1);');
    expect(css).toContain('--section-pad: clamp(96px, 9.77vw + 59.4px, 200px);');
  });

  it('extends the spacing scale', () => {
    expect(css).toContain('--space-0: 4px;');
    expect(css).toContain('--space-7: 96px;');
    expect(css).toContain('--space-8: 128px;');
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
