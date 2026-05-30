export type ChessBoardCell = {
	i: number;
	d: boolean;
};

export function chess_board_cells(): ChessBoardCell[] {
	return Array.from({ length: 64 }, (_, i) => ({ i, d: (i + Math.floor(i / 8)) % 2 === 1 }));
}
