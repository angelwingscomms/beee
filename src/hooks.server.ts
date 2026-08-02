import type { Handle } from '@sveltejs/kit';
import { decode_session, SESSION_COOKIE_DELETE } from '$lib/server/session';
import { set_platform } from '$lib/server/secrets';

export const handle: Handle = async ({ event, resolve }) => {
  set_platform(event.platform);

  const session_id = event.cookies.get('session');
  event.locals.user = null;
  if (session_id) {
    try {
      const s = await decode_session(session_id);
      if (s) {
        event.locals.user = s.user;
      } else {
        event.cookies.delete('session', SESSION_COOKIE_DELETE);
      }
    } catch {
      event.cookies.delete('session', SESSION_COOKIE_DELETE);
    }
  }
  return resolve(event);
};
