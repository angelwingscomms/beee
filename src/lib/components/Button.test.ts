import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

const button = readFileSync(resolve(process.cwd(), 'src/lib/components/Button.svelte'), 'utf8');

describe('Button component', () => {
  it('imports the magnetic hover action', () => {
    expect(button).toContain("import { motionMagnetic } from '$lib/actions/motion';");
  });

  it('applies magnetic hover to both the link and button variants', () => {
    expect(button).toContain('<a {href} class="btn {className}" style={bg_style} use:motionMagnetic>');
    expect(button).toContain('<button {disabled} {onclick} class="btn {className}" style={bg_style} use:motionMagnetic>');
  });
});
