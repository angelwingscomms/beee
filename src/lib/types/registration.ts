// Registration entity (tenant-id 'reg')
export interface Registration {
	s: 'reg'; // tenant id
	n: string; // school name
	p: string; // school phone
	pl: Array<{ name: string; email: string; phone: string }>; // players
	st: 'pending' | 'paid'; // payment status
	v: 0 | 1 | 2; // verified (1=school, 0=not school, 2=lookup failed)
	d: number; // created timestamp (ms)
	amt: number; // amount in kobo — stored for anti-fraud verification
	ref?: string; // Paystack transaction reference
}
