type Orientation = 'w' | 'b';
type Hint_square_kind = 'f' | 't';

interface Hint_square {
	s: string
	k: Hint_square_kind
	r: string
	c: string
	l: string
}

const rows = [
	'row-start-1',
	'row-start-2',
	'row-start-3',
	'row-start-4',
	'row-start-5',
	'row-start-6',
	'row-start-7',
	'row-start-8',
] as const;

const cols = [
	'col-start-1',
	'col-start-2',
	'col-start-3',
	'col-start-4',
	'col-start-5',
	'col-start-6',
	'col-start-7',
	'col-start-8',
] as const;

function is_square(s: string) {
	return /^[a-h][1-8]$/.test(s);
}

function hint_square(s: string, k: Hint_square_kind, orientation: Orientation): Hint_square {
	const file_i = s.charCodeAt(0) - 97;
	const rank = Number(s[1]);
	const row_i = orientation === 'w' ? 8 - rank : rank - 1;
	const col_i = orientation === 'w' ? file_i : 7 - file_i;
	return { s, k, r: rows[row_i], c: cols[col_i], l: k === 'f' ? 'from' : 'to' };
}

export function hint_squares(move: string, orientation: Orientation = 'w'): Hint_square[] {
	const from = move.slice(0, 2);
	const to = move.slice(2, 4);
	if (!is_square(from) || !is_square(to)) return [];
	return [hint_square(from, 'f', orientation), hint_square(to, 't', orientation)];
}
