import { describe, expect, it } from 'vitest';
import { chess_board_cells } from './chess_visual';

describe('chess_board_cells', () => {
	it('builds an 8 by 8 alternating board', () => {
		const c = chess_board_cells();

		expect(c).toHaveLength(64);
		expect(c[0]).toEqual({ i: 0, d: false });
		expect(c[1]).toEqual({ i: 1, d: true });
		expect(c[8]).toEqual({ i: 8, d: true });
		expect(c[9]).toEqual({ i: 9, d: false });
	});
});
