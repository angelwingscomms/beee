import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

const css = readFileSync(resolve(process.cwd(), 'src/styles/cards.css'), 'utf8');

describe('cards.css shared card treatment', () => {
  it('gates feature-card hover lift behind (hover: hover)', () => {
    expect(css).toContain('@media (hover: hover) {\n  .feature-card:hover {');
  });

  it('adds a layered shadow and border glow on feature-card hover', () => {
    expect(css).toContain('box-shadow: 0 16px 40px rgba(242, 120, 48, 0.14), 0 4px 12px rgba(20, 20, 19, 0.06);');
  });

  it('scales the spike-mark icon on feature-card hover', () => {
    expect(css).toContain('.feature-card:hover .spike-mark {\n    transform: scale(1.12) rotate(-4deg);\n  }');
  });

  it('gates benefit-card hover behind (hover: hover) and removes the duplicate transition declaration', () => {
    expect(css).toContain('@media (hover: hover) {\n  .benefit-card:hover {');
    const block = css.slice(css.indexOf('.benefit-card {'), css.indexOf('.benefit-card.in-view'));
    const transitionCount = (block.match(/transition:/g) || []).length;
    expect(transitionCount).toBe(1);
  });
});
