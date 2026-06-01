import { describe, it, expect } from 'vitest';

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
});
