import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

const page = readFileSync(resolve(process.cwd(), 'src/routes/+page.svelte'), 'utf8');
const form = readFileSync(resolve(process.cwd(), 'src/components/RegistrationForm.svelte'), 'utf8');
const nav = readFileSync(resolve(process.cwd(), 'src/lib/components/FloatingNav.svelte'), 'utf8');

describe('homepage registration chess squares', () => {
	it('uses full-width square cells at the bottom of the form instead of the page strip', () => {
		expect(page).not.toContain('ChessboardPulse');
		expect(form).not.toContain('absolute inset-x-0 top-0 grid h-2');
		expect(form).toContain('registration-checker-squares');
		expect(form).toContain('mt-10 grid grid-cols-8');
		expect(form).toContain('aspect-square');
		expect(form).toContain("'aspect-square bg-[#DFD0BE]'");
		expect(form).toContain('rounded-tl-lg');
		expect(form).toContain('rounded-tr-lg');
		expect(form).toContain('rounded-bl-lg');
		expect(form).toContain('rounded-br-lg');
		expect(form).not.toContain('aspect-square bg-primary/45');
		expect(form.indexOf('submit-row')).toBeLessThan(form.indexOf('registration-checker-squares'));
	});

	it('uses the same primary button color class for the learn link', () => {
		expect(nav).toContain('button-primary');
		expect(page).toContain('FloatingNav');
		expect(page).not.toContain('bg-primary px-3 py-1.5');
	});

	it('adds dreamy hover motion to the fee card and registration button', () => {
		expect(form).toContain('hover:-translate-y-1');
		expect(form).toContain('hover:shadow-[0_24px_70px_rgba(204,120,92,0.22)]');
		expect(form).toContain('hover:bg-[#F7EDE4]');
		expect(form).toContain('hover:-translate-y-0.5');
		expect(form).toContain('hover:scale-[1.01]');
		expect(form).toContain('hover:shadow-[0_18px_42px_rgba(204,120,92,0.28)]');
	});

	it('shows school email and phone fields', () => {
		expect(form).toContain('schoolEmail');
		expect(form).toContain('schoolPhone');
	});

	it('removes the inner focus ring from school text fields', () => {
		expect(form).toContain('focus:ring-0');
		expect(form).toContain('focus-visible:ring-0');
		expect(form).toContain('focus:border-transparent');
	});

	it('shows school labels like faint placeholders without colons', () => {
		expect(form).toContain('text-[#c7beb4]');
		expect(form).toContain('>School Name</label>');
		expect(form).toContain('>School Email</label>');
		expect(form).not.toContain('School Name:');
		expect(form).not.toContain('School Email:');
	});

	it('shows 4 player entries', () => {
		expect(form).toContain('NUM_PLAYERS = 4');
		expect(form).toContain('{#each players as player, i}');
	});
});
