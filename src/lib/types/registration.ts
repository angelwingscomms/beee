// Registration entity (tenant-id 'reg')
export interface Registration {
	s: 'reg'; // tenant id
	n: string; // school name
	e: string; // school email
	p: string; // school phone
	pl: Array<{ name: string; email: string; chessRating: string }>; // players
	st: 'pending' | 'paid'; // payment status
	d: number; // created timestamp (ms)
	amt: number; // amount in kobo — stored for anti-fraud verification
	ref?: string; // Paystack transaction reference
}
