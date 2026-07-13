import { dev } from '$app/environment';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from '@sveltejs/kit';
import { get_qdrant } from '$lib/db/get_qdrant';

export const DELETE: RequestHandler = async () => {
  if (!dev) {
    return json({ message: 'Not allowed' }, { status: 403 });
  }
  const q = await get_qdrant();
  await q.delete('i', { filter: {}, wait: true });
  return json({ success: true });
};
