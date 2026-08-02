import { json } from '@sveltejs/kit';
import type { RequestHandler } from '@sveltejs/kit';
import { SESSION_COOKIE_DELETE } from '$lib/server/session';

export const POST: RequestHandler = async ({ cookies }) => {
  cookies.delete('session', SESSION_COOKIE_DELETE);
  return json({ success: true });
};
