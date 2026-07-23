import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

const footer = readFileSync(resolve(process.cwd(), 'src/lib/components/home/Footer.svelte'), 'utf8');

describe('Footer SPEC-TRUM rework', () => {
  it('uses the nightfall field with grain', () => {
    expect(footer).toContain('rv-field-night noise footer');
  });

  it('renders the headline with the honey-highlighted word', () => {
    expect(footer).toContain('Be Everything <span style="color: var(--honey)">Excellent</span> Every Day.');
  });

  it('splits footer content into a 3-column grid on desktop and stacks it on mobile', () => {
    expect(footer).toContain('grid-template-columns: repeat(3, 1fr);');
    expect(footer).toContain('.footer-grid {\n      grid-template-columns: 1fr;');
  });

  it('filters the current path out of the map links', () => {
    expect(footer).toContain(".filter((l) => l.href !== p);");
  });

  it('renders the theme toggle in the bottom row', () => {
    expect(footer).toContain('<ThemeToggle />');
  });
});
