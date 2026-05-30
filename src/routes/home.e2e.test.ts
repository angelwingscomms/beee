import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

const page = readFileSync(resolve(process.cwd(), 'src/routes/+page.svelte'), 'utf8');
const form = readFileSync(resolve(process.cwd(), 'src/components/RegistrationForm.svelte'), 'utf8');

describe('homepage registration chess squares', () => {
	it('uses full-width square cells at the bottom of the form instead of the page strip', () => {
		expect(page).not.toContain('ChessboardPulse');
		expect(form).not.toContain('absolute inset-x-0 top-0 grid h-2');
		expect(form).toContain('registration-checker-squares');
		expect(form).toContain('grid grid-cols-8');
		expect(form).toContain('aspect-square');
		expect(form).toContain("'aspect-square bg-primary'");
		expect(form).not.toContain('aspect-square bg-primary/45');
		expect(form.indexOf('submit-row')).toBeLessThan(form.indexOf('registration-checker-squares'));
	});
});
