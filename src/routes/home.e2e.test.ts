import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

const page = readFileSync(resolve(process.cwd(), 'src/routes/+page.svelte'), 'utf8');
const form = readFileSync(resolve(process.cwd(), 'src/components/RegistrationForm.svelte'), 'utf8');
const nav = readFileSync(resolve(process.cwd(), 'src/lib/components/FloatingNav.svelte'), 'utf8');

describe('homepage registration chess squares', () => {
	it('drives sticky scroll effects from tall wrappers with visible fallbacks', () => {
		expect(page).toContain('sticky-section hero-scroll');
		expect(page).toContain('sticky-section section-dark passport-scroll');
		expect(page).toContain('sticky-section section-soft timeline-scroll');
		expect(page).toContain('.hero-scroll { view-timeline-name: --hero;');
		expect(page).toContain('.passport-scroll { view-timeline-name: --passport;');
		expect(page).toContain('.timeline-scroll { view-timeline-name: --timeline;');
		expect(page).toContain('animation-range: cover 0% cover 25%');
		expect(page).toContain(':global(.supports-scroll-animation) .passport-step');
		expect(page).toContain(':global(.supports-scroll-animation) .milestone');
		expect(page).toContain(':global(html:not(.supports-scroll-animation)) .sticky-section');
		expect(page).toContain('stroke-dashoffset: 0;');
	});

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
		expect(form).toContain('hover:-translate-y-0.5');
		expect(form).toContain('hover:scale-[1.01]');
		expect(form).toContain('hover:shadow-[0_18px_42px_rgba(204,120,92,0.28)]');
	});

	it('shows participant fields', () => {
		expect(form).toContain('firstName');
		expect(form).toContain('lastName');
		expect(form).toContain('phone');
	});

	it('shows first and last name fields', () => {
		expect(form).toContain('label="First Name"');
		expect(form).toContain('label="Last Name"');
	});

	it('shows a single participant registration form', () => {
		expect(form).toContain('Register as a Participant');
	});
});
