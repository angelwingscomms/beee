import { readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';

const page = readFileSync(resolve(dirname(fileURLToPath(import.meta.url)), '+page.svelte'), 'utf8');

describe('/chess/learn hint highlights', () => {
	it('wires a visible board overlay to the current hint squares', () => {
		expect(page).toContain('hint_squares(');
		expect(page).toContain('data-testid={square.k === \'f\' ? \'hint-square-from\' : \'hint-square-to\'}');
		expect(page).toContain('aria-label={`Hint ${square.l} square ${square.s}`}');
		expect(page).toContain('const hint_nudge_x = \'-translate-x-1\'');
		expect(page).toContain('const hint_nudge_y = \'-translate-y-1\'');
		expect(page).toContain('bg-amber/45 border-amber ring-ink/25');
		expect(page).toContain('bg-teal/45 border-teal ring-ink/25');
	});
});
