import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

const page = readFileSync('src/routes/+page.svelte', 'utf8');

describe('home journey scroll', () => {
  it('does not leave extra page height after the pinned cards', () => {
    expect(page).not.toContain('h-[300vh]');
    expect(page).toContain('journey_scroll_distance');
  });
});
