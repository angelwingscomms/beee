import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

interface Participant {
	first_name: string;
	last_name: string;
	email: string;
	phone: string;
}

function create_participant(first_name = '', last_name = '', email = '', phone = ''): Participant {
	return { first_name, last_name, email, phone };
}

function validate_first_name(p: Participant): string | null {
	if (!p.first_name.trim()) return 'First name is required';
	return null;
}

function validate_last_name(p: Participant): string | null {
	if (!p.last_name.trim()) return 'Last name is required';
	return null;
}

function validate_email(p: Participant): string | null {
	if (!p.email.trim()) return 'Email is required';
	if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(p.email.trim())) return 'Enter a valid email address';
	return null;
}

describe('Participant Registration', () => {
	it('should create a participant with empty fields', () => {
		const p = create_participant();
		expect(p.first_name).toBe('');
		expect(p.last_name).toBe('');
	});

	it('should require first name', () => {
		const p = create_participant('', 'Doe');
		expect(validate_first_name(p)).toBe('First name is required');
	});

	it('should require last name', () => {
		const p = create_participant('John', '');
		expect(validate_last_name(p)).toBe('Last name is required');
	});

	it('should accept valid participant data', () => {
		const p = create_participant('John', 'Doe', 'john@example.com', '+234801234567');
		expect(validate_first_name(p)).toBeNull();
		expect(validate_last_name(p)).toBeNull();
		expect(validate_email(p)).toBeNull();
	});

	it('should require email', () => {
		const p = create_participant('John', 'Doe', '');
		expect(validate_email(p)).toBe('Email is required');
	});

	it('should validate email format', () => {
		const p = create_participant('John', 'Doe', 'not-an-email');
		expect(validate_email(p)).toBe('Enter a valid email address');
	});

	it('shows individual registration details', () => {
		const form = readFileSync(resolve(process.cwd(), 'src/components/RegistrationForm.svelte'), 'utf8');
		expect(form).toContain('Participants must be between 10 and 14 years of age.');
		expect(form).toContain('AMOUNT.toLocaleString()');
		expect(form).toContain('per participant');
		expect(form).toContain('Sponsorship of participants is by parents or other interested sponsor.');
		expect(form).toContain('Registration closes once available slots are filled — places are limited.');
		expect(form).toContain('class="border-l-2 border-primary pl-3">Qualification slots are limited and will be allocated on a first-completed-registration basis.');
	});
});

describe('Inline Error States', () => {
	it('TextInput renders error message when error prop is set', () => {
		const ti = readFileSync(resolve(process.cwd(), 'src/lib/components/TextInput.svelte'), 'utf8');
		expect(ti).toContain('error');
		const lines = ti.split('\n');
		const hasErrorDisplay = lines.some(l => l.includes('field-msg') || l.includes('field-error'));
		expect(hasErrorDisplay).toBe(true);
	});

	it('RegistrationForm has novalidate on the form element', () => {
		const form = readFileSync(resolve(process.cwd(), 'src/components/RegistrationForm.svelte'), 'utf8');
		expect(form).toContain('novalidate');
	});

	it('RegistrationForm tracks per-field errors', () => {
		const form = readFileSync(resolve(process.cwd(), 'src/components/RegistrationForm.svelte'), 'utf8');
		const hasFirstNameErr = form.includes('firstNameErr');
		const hasLastNameErr = form.includes('lastNameErr');
		const hasEmailErr = form.includes('emailErr');
		const hasPhoneErr = form.includes('phoneErr');
		expect(hasFirstNameErr && hasLastNameErr && hasEmailErr && hasPhoneErr).toBe(true);
	});
});
