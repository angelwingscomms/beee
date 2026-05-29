// Registration entity (tenant-id 'reg')
export interface Registration {
	s: 'reg'; // tenant id
	n: string; // school name
	e: string; // school email
	p: string; // school phone
	l: { lat: number; lng: number; address: string }; // location
	pl: Array<{ name: string; email: string; chessRating: string }>; // players
	st: 'pending' | 'paid'; // status
	d: number; // created timestamp
	r?: string; // payment reference
}
