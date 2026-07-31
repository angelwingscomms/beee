import { json } from '@sveltejs/kit';
import type { RequestHandler } from '@sveltejs/kit';
import bcrypt from 'bcryptjs';
import { create, find_user_by_email, new_id } from '$lib/db';
import { encode_session } from '$lib/server/session';
import { gen_partner_code } from '$lib/partner_code';
import type { User } from '$lib/types';

export const POST: RequestHandler = async ({ request, cookies }) => {
  console.log('[partner signup] === NEW SIGNUP REQUEST ===');
  const raw = await request.json();
  const { email, password, name, sc } = raw;
  console.log('[partner signup] email:', email, 'password length:', password?.length ?? 0, 'name:', name);

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    console.warn('[partner signup] REJECTED: invalid email');
    return json({ error: 'Valid email required' }, { status: 400 });
  }
  if (!password || password.length < 8) {
    console.warn('[partner signup] REJECTED: password too short');
    return json({ error: 'Password must be at least 8 characters' }, { status: 400 });
  }
  console.log('[partner signup] basic validation passed');

  console.log('[partner signup] checking for existing user with email:', email);
  const existing = await find_user_by_email(email) as (User & { i: string }) | undefined;
  if (existing) {
    console.warn('[partner signup] REJECTED: email already exists');
    return json({
      error: 'An account with this email already exists.',
      signInUrl: '/login/google?next=/dashboard/partner'
    }, { status: 409 });
  }
  console.log('[partner signup] email is unique');

  console.log('[partner signup] hashing password...');
  const hash = await bcrypt.hash(password, 10);
  console.log('[partner signup] password hashed');

  const ac = gen_partner_code();
  console.log('[partner signup] generated partner code:', ac);

  const user_id = new_id();
  console.log('[partner signup] new user id:', user_id);

  const u: User = {
    s: 'u',
    e: email,
    p: hash,
    n: name || email.split('@')[0],
    sc: sc || undefined,
    c: ['fab'],
    ac,
    d: Date.now()
  };
  console.log('[partner signup] creating user in DB...');
  console.log('[partner signup] user payload:', JSON.stringify({ ...u, p: '***' }));
  await create(u, undefined, user_id);
  console.log('[partner signup] user created in DB');

  console.log('[partner signup] encoding session...');
  const session = await encode_session({ id: user_id, name: u.n, email });
  console.log('[partner signup] session encoded, setting cookie');
  cookies.set('session', session, { path: '/', httpOnly: true, maxAge: 604800, sameSite: 'lax' });
  console.log('[partner signup] session cookie set');

  console.log('[partner signup] SUCCESS: redirecting to /dashboard/partner');
  return json({ success: true, redirect: '/dashboard/partner' });
};
