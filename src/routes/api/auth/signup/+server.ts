import { json } from '@sveltejs/kit';
import type { RequestHandler } from '@sveltejs/kit';
import bcrypt from 'bcryptjs';
import { create, find_user_by_email, new_id } from '$lib/db';
import { encode_session, SESSION_COOKIE } from '$lib/server/session';
import type { User } from '$lib/types';

export const POST: RequestHandler = async ({ request, cookies }) => {
  const { email, password, name } = await request.json();
  if (!email || !password || password.length < 8) {
    return json({ error: 'Email required and password min 8 characters' }, { status: 400 });
  }

  const existing = await find_user_by_email(email);
  if (existing) {
    return json({ error: 'Email already registered' }, { status: 409 });
  }

  const hash = await bcrypt.hash(password, 10);
  const user_id = new_id();
  const u: User = { s: 'u', e: email, p: hash, n: name || email.split('@')[0], d: Date.now() };
  await create(u, undefined, user_id);

  const session = await encode_session({ id: user_id, name: u.n, email });
  cookies.set('session', session, SESSION_COOKIE);

  return json({ success: true, user: { id: user_id, email, name: u.n } });
};
