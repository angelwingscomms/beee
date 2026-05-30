export interface Registration {
	s: 'reg';
	sn: string; // school name
	n: string;  // player name
	e: string;  // player email
	p: string;  // player phone
	st: 'pending' | 'paid';
	v: 0 | 1 | 2;
	d: number;
	amt: number;
	ref?: string;
}
