import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

const footer = readFileSync(resolve(process.cwd(), 'src/lib/components/home/Footer.svelte'), 'utf8');

describe('Footer editorial rework', () => {
  it('layers a navy-blob gradient mesh behind the flat navy background', () => {
    expect(footer).toContain('radial-gradient(1100px 460px at 12% -15%, color-mix(in srgb, var(--navy-blob) 55%, transparent), transparent 70%),');
  });

  it('uses the fluid display token for the event headline', () => {
    expect(footer).toContain('font-size: var(--fs-display-md);');
  });

  it('splits footer-top into an asymmetric grid on desktop and stacks it on mobile', () => {
    expect(footer).toContain('grid-template-columns: minmax(0, 1.4fr) minmax(0, 1fr);');
    expect(footer).toContain('.footer-top {\n      grid-template-columns: 1fr;\n      gap: 20px;\n    }');
  });

  it('gates the footer nav hover shift behind (hover: hover)', () => {
    expect(footer).toContain('@media (hover: hover) {\n    .footer-nav a:hover {');
  });

  it('disables the hover transform transition under prefers-reduced-motion', () => {
    expect(footer).toContain('@media (prefers-reduced-motion: reduce) {\n    .footer-nav a {\n      transition: color 160ms ease;\n    }\n  }');
  });
});
