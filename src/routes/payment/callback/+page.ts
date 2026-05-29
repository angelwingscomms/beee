import type { PageLoad } from './$types';

export const load: PageLoad = ({ url }) => ({
	reference: url.searchParams.get('reference') ?? ''
});
