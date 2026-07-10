import type { Handle } from '@sveltejs/kit';
import { decode_session } from '$lib/server/session';

export const handle: Handle = async ({ event, resolve }) => {
  let secret = '';
  try { secret = event.platform?.env?.SECRET ?? ''; } catch {}
  const session_id = event.cookies.get('session');
  event.locals.user = null;
  if (session_id && secret) {
    const s = await decode_session(session_id, secret);
    if (s) {
      event.locals.user = s.user;
    } else {
      event.cookies.delete('session', { path: '/' });
    }
  }
  return resolve(event);
};
