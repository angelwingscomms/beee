import { describe, it, expect } from 'vitest';

interface Player {
	name: string;
	email: string;
	phone: string;
}

function create_player(name = '', email = '', phone = ''): Player {
	return { name, email, phone };
}

function validate_player_name(p: Player): string | null {
	if (!p.name.trim()) return 'Player name is required';
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
		expect(player.name).toBe('');
		expect(player.email).toBe('');
		expect(player.phone).toBe('');
	});

	it('should require player name', () => {
		const player = create_player('', 'p@test.com', '+2348000000000');
		expect(validate_player_name(player)).toBe('Player name is required');
	});

	it('should require player email', () => {
		const player = create_player('John', '', '+2348000000000');
		expect(validate_player_email(player)).toBe('Player email is required');
	});

	it('should require player phone', () => {
		const player = create_player('John', 'john@test.com', '');
		expect(validate_player_phone(player)).toBe('Player phone is required');
	});

	it('should accept valid player data', () => {
		const player = create_player('John Doe', 'john@school.edu', '+2348000000000');
		expect(validate_player_name(player)).toBeNull();
		expect(validate_player_email(player)).toBeNull();
		expect(validate_player_phone(player)).toBeNull();
	});
});
