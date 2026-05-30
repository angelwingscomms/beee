import { describe, it, expect } from 'vitest';

interface Player {
	first_name: string;
	last_name: string;
	email: string;
	phone: string;
}

function create_player(first_name = '', last_name = '', email = '', phone = ''): Player {
	return { first_name, last_name, email, phone };
}

function validate_player_first_name(p: Player): string | null {
	if (!p.first_name.trim()) return 'First name is required';
	return null;
}

function validate_player_last_name(p: Player): string | null {
	if (!p.last_name.trim()) return 'Surname is required';
	return null;
}

function validate_player_email(p: Player): string | null {
	if (!p.email.trim()) return 'Player email is required';
	return null;
}

function validate_player_phone(p: Player): string | null {
	if (!p.phone.trim()) return 'Player phone is required';
	return null;
}

describe('Player Registration', () => {
	it('should create a single player with empty fields', () => {
		const player = create_player();
		expect(player.first_name).toBe('');
		expect(player.last_name).toBe('');
		expect(player.email).toBe('');
		expect(player.phone).toBe('');
	});

	it('should require first name', () => {
		const player = create_player('', 'Doe', 'p@test.com', '+2348000000000');
		expect(validate_player_first_name(player)).toBe('First name is required');
	});

	it('should require surname', () => {
		const player = create_player('John', '', 'p@test.com', '+2348000000000');
		expect(validate_player_last_name(player)).toBe('Surname is required');
	});

	it('should require player email', () => {
		const player = create_player('John', 'Doe', '', '+2348000000000');
		expect(validate_player_email(player)).toBe('Player email is required');
	});

	it('should require player phone', () => {
		const player = create_player('John', 'Doe', 'john@test.com', '');
		expect(validate_player_phone(player)).toBe('Player phone is required');
	});

	it('should accept valid player data', () => {
		const player = create_player('John', 'Doe', 'john@school.edu', '+2348000000000');
		expect(validate_player_first_name(player)).toBeNull();
		expect(validate_player_last_name(player)).toBeNull();
		expect(validate_player_email(player)).toBeNull();
		expect(validate_player_phone(player)).toBeNull();
	});
});
