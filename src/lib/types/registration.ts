export interface Registration {
	s: 'reg';
	i?: string;
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
	ac?: string; // partner code
	pp?: string; // proprietor phone number
	pw?: string; // transient: only on the pending record, hashed on payment confirmation. Never sent to Paystack.
}
