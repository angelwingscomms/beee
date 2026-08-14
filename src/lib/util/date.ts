const at_utc = (iso: string) => new Date(`${iso}T00:00:00Z`);

export function long_date(iso: string): string {
	return at_utc(iso).toLocaleDateString('en-GB', {
		day: 'numeric',
		month: 'long',
		year: 'numeric',
		timeZone: 'UTC'
	});
}

export function short_date(iso: string): string {
	return at_utc(iso).toLocaleDateString('en-GB', {
		day: '2-digit',
		month: 'short',
		year: 'numeric',
		timeZone: 'UTC'
	});
}
