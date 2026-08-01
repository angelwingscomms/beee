import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

const css = readFileSync(resolve(process.cwd(), 'src/styles/fonts.css'), 'utf8');

describe('fonts.css loaded families', () => {
  it('drops the unused Playfair Display and Montserrat families', () => {
    expect(css).not.toContain('Playfair');
    expect(css).not.toContain('Montserrat');
  });

  it('loads the 600 weight for Open Sans used by .welcome-text', () => {
    expect(css).toContain('Open+Sans:wght@400;600');
  });
});
