import { dev } from '$app/environment';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from '@sveltejs/kit';
import { qdrant } from '$lib/db';

export const POST: RequestHandler = async () => {
	if (!dev) {
		return json({ message: 'Not allowed' }, { status: 403 });
	}
	await qdrant.delete('i', { filter: {}, wait: true });
	return json({ success: true });
};
