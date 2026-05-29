import { describe, it, expect } from 'vitest';

interface Player {
	name: string;
	email: string;
}

function create_player(name = '', email = ''): Player {
	return { name, email };
}

function validate_player_name(p: Player): string | null {
	if (!p.name.trim()) return 'Player name is required';
	return null;
}

function validate_player_email(p: Player): string | null {
	if (!p.email.trim()) return 'Player email is required';
	return null;
}

describe('Player Registration', () => {
	it('should create a single player with empty fields', () => {
		const player = create_player();
		expect(player.name).toBe('');
		expect(player.email).toBe('');
	});

	it('should require player name', () => {
		const player = create_player('', 'p@test.com');
		expect(validate_player_name(player)).toBe('Player name is required');
	});

	it('should require player email', () => {
		const player = create_player('John', '');
		expect(validate_player_email(player)).toBe('Player email is required');
	});

	it('should accept valid player data', () => {
		const player = create_player('John Doe', 'john@school.edu');
		expect(validate_player_name(player)).toBeNull();
		expect(validate_player_email(player)).toBeNull();
	});
});
