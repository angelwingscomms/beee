import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

const forms = readFileSync(resolve(process.cwd(), 'src/styles/forms.css'), 'utf8');
const modal = readFileSync(resolve(process.cwd(), 'src/styles/modal.css'), 'utf8');

describe('forms.css focus states', () => {
  it('gives text inputs and textareas a visible border', () => {
    expect(forms).toContain('border: 1px solid var(--hairline);');
  });

  it('wires up the focus-visible ring documented on the /design page', () => {
    expect(forms).toContain(
      '.text-input:focus-visible,\n.text-area:focus-visible {\n  border-color: var(--primary);\n  box-shadow: 0 0 0 3px rgba(255, 102, 0, 0.15);\n}'
    );
  });
});

describe('modal.css depth', () => {
  it('gives modal-card a layered shadow', () => {
    expect(modal).toContain('box-shadow: 0 24px 70px rgba(10, 15, 26, 0.28), 0 4px 16px rgba(10, 15, 26, 0.12);');
  });
});
