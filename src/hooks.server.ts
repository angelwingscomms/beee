import type { Handle } from '@sveltejs/kit';
import { decode_session } from '$lib/server/session';
import { env_val } from '$lib/server/env';

export const handle: Handle = async ({ event, resolve }) => {
  const session_id = event.cookies.get('session');
  event.locals.user = null;
  if (session_id) {
    try {
      const secret = await env_val(event.platform?.env, 'SECRET');
      const s = await decode_session(session_id, secret);
      if (s) {
        event.locals.user = s.user;
      } else {
        event.cookies.delete('session', { path: '/' });
      }
    } catch {
      event.cookies.delete('session', { path: '/' });
    }
  }
  return resolve(event);
};
