import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

interface Player {
	first_name: string;
	last_name: string;
}

function create_player(first_name = '', last_name = ''): Player {
	return { first_name, last_name };
}

function validate_player_first_name(p: Player): string | null {
	if (!p.first_name.trim()) return 'First name is required';
	return null;
}

function validate_player_last_name(p: Player): string | null {
	if (!p.last_name.trim()) return 'Last name is required';
	return null;
}

describe('Player Registration', () => {
	it('should create a player with empty fields', () => {
		const player = create_player();
		expect(player.first_name).toBe('');
		expect(player.last_name).toBe('');
	});

	it('should require first name', () => {
		const player = create_player('', 'Doe');
		expect(validate_player_first_name(player)).toBe('First name is required');
	});

	it('should require last name', () => {
		const player = create_player('John', '');
		expect(validate_player_last_name(player)).toBe('Last name is required');
	});

	it('should accept valid player data', () => {
		const player = create_player('John', 'Doe');
		expect(validate_player_first_name(player)).toBeNull();
		expect(validate_player_last_name(player)).toBeNull();
	});

	it('shows the exact school-based registration details in a compact list', () => {
		const form = readFileSync(resolve(process.cwd(), 'src/components/RegistrationForm.svelte'), 'utf8');
		expect(form).toContain('Registration is through participating schools within the FCT.');
		expect(form).toContain('Participants must be between 10 and 14 years of age.');
		expect(form).toContain('Each participating school must register four (4) players.');
		expect(form).toContain('Total: ₦50,000 per school team');
		expect(form).toContain('Sponsorship of participants is by parent or other interested sponsor.');
		expect(form).toContain('Registration closes on June 18, 2026, or earlier if available placement slots are filled.');
		expect(form).toContain('Qualification slots are limited and will be allocated on a first-completed-registration basis.');
		expect(form).toContain('Registration will close once available placement slots have been filled.');
	});
});
