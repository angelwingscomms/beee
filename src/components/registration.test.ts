import { describe, it, expect } from 'vitest';

interface Player {
	name: string;
	email: string;
	chessRating: string;
}

function create_empty_players(count: number): Player[] {
	return Array.from({ length: count }, () => ({
		name: '',
		email: '',
		chessRating: ''
	}));
}

function validate_players(players: Player[]): string[] {
	const errors: string[] = [];
	players.forEach((p, i) => {
		if (!p.name.trim()) {
			errors.push(`Player ${i + 1} name is required`);
		}
	});
	return errors;
}

describe('Player Registration', () => {
	it('should create 4 empty players', () => {
		const players = create_empty_players(4);
		expect(players).toHaveLength(4);
		players.forEach(p => {
			expect(p.name).toBe('');
			expect(p.email).toBe('');
			expect(p.chessRating).toBe('');
		});
	});

	it('should require all player names', () => {
		const players = create_empty_players(4);
		const errors = validate_players(players);
		expect(errors).toHaveLength(4);
	});

	it('should validate players with all names filled', () => {
		const players = create_empty_players(4);
		players.forEach((p, i) => { p.name = `Player ${i + 1}`; });
		const errors = validate_players(players);
		expect(errors).toHaveLength(0);
	});
});
