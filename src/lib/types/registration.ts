export interface Registration {
	s: 'reg';
	sn: string; // school name
	e: string;  // school email
	p: string;  // school phone
	ps: string[][]; // [[first, last], ...]
	st: 'pending' | 'paid';
	v: 0 | 1 | 2;
	d: number;
	amt: number;
	ref?: string;
}
