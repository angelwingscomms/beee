export interface Registration {
	s: 'reg';
	sn: string; // school name
	fn: string; // player first name
	ln: string; // player last name
	e: string;  // player email
	p: string;  // player phone
	st: 'pending' | 'paid';
	v: 0 | 1 | 2;
	d: number;
	amt: number;
	ref?: string;
}
