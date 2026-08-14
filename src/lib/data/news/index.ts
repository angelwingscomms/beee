import type { NewsPost } from '$lib/types/news';
import { post as fide_world_amateur_abuja_2026 } from './fide-world-amateur-abuja-2026';

export const NEWS: NewsPost[] = [fide_world_amateur_abuja_2026].sort((a, b) =>
	b.d.localeCompare(a.d)
);

export function get_post(slug: string): NewsPost | undefined {
	return NEWS.find((p) => p.s === slug);
}

export function latest_posts(n: number): NewsPost[] {
	return NEWS.slice(0, n);
}
