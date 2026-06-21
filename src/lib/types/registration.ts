export interface Registration {
	s: 'reg';
	fn: string; // first name
	ln: string; // last name
	e: string;  // email
	p: string;  // phone
	st: 'pending' | 'paid';
	v: 0 | 1 | 2;
	d: number;
	amt: number;
	ref?: string;
}
