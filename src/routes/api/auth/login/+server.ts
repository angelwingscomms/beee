import { json } from '@sveltejs/kit';
import type { RequestHandler } from '@sveltejs/kit';
import bcrypt from 'bcryptjs';
import { find_user_by_email } from '$lib/db';
import { encode_session, SESSION_COOKIE } from '$lib/server/session';
import type { User } from '$lib/types';

export const POST: RequestHandler = async ({ request, cookies }) => {
  const { email, password } = await request.json();
  if (!email || !password) {
    return json({ error: 'Email and password required' }, { status: 400 });
  }

  const existing = await find_user_by_email(email) as (User & { i: string }) | undefined;
  if (!existing || !existing.p) {
    return json({ error: existing && !existing.p ? 'Try signing in with Google' : 'Invalid email or password' }, { status: 401 });
  }

  const match = await bcrypt.compare(password, existing.p);
  if (!match) {
    return json({ error: 'Invalid email or password' }, { status: 401 });
  }

  const user_id = existing.i;

  const session = await encode_session({ id: user_id, name: existing.n, picture: existing.pic, email, ph: existing.ph });
  cookies.set('session', session, SESSION_COOKIE);

  return json({ success: true, user: { id: user_id, email, name: existing.n, picture: existing.pic } });
};
