import { error } from '@sveltejs/kit';
import { get_post } from '$lib/data/news';
import type { PageLoad } from './$types';

export const load: PageLoad = ({ params }) => {
	const p = get_post(params.slug);
	if (!p) error(404, 'Post not found');
	return { p };
};
