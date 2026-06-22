export interface Registration {
	s: 'reg';
	fn?: string; // first name (individual) or school name
	ln?: string; // last name (individual) or school name
	e: string;  // email
	p: string;  // phone
	sn?: string; // school name
	ps?: unknown; // players
	st: 'pending' | 'paid';
	v: 0 | 1 | 2;
	d: number;
	amt: number;
	ref?: string;
}
