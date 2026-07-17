import { json } from '@sveltejs/kit';
import type { RequestHandler } from '@sveltejs/kit';
import bcrypt from 'bcryptjs';
import { create, find_user_by_email, new_id } from '$lib/db';
import { encode_session } from '$lib/server/session';
import { gen_partner_code } from '$lib/partner_code';
import type { User } from '$lib/types';

export const POST: RequestHandler = async ({ request, cookies }) => {
  const { email, password, name } = await request.json();

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return json({ error: 'Valid email required' }, { status: 400 });
  }
  if (!password || password.length < 8) {
    return json({ error: 'Password must be at least 8 characters' }, { status: 400 });
  }

  const existing = await find_user_by_email(email) as (User & { i: string }) | undefined;
  if (existing) {
    return json({
      error: 'An account with this email already exists.',
      signInUrl: '/login/google?next=/dashboard/partner'
    }, { status: 409 });
  }

  const hash = await bcrypt.hash(password, 10);
  const ac = gen_partner_code();
  const user_id = new_id();
  const u: User = {
    s: 'u',
    e: email,
    p: hash,
    n: name || email.split('@')[0],
    c: ['fab'],
    ac,
    d: Date.now()
  };
  await create(u, undefined, user_id);

  const session = await encode_session({ id: user_id, name: u.n, email });
  cookies.set('session', session, { path: '/', httpOnly: true, maxAge: 604800, sameSite: 'lax' });

  return json({ success: true, redirect: '/dashboard/partner' });
};
