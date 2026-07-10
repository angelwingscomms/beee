import { decodeIdToken } from 'arctic';
import { google_client as get_google } from '$lib/server/oauth';
import { encode_session } from '$lib/server/session';
import { create, find_user_by_email, new_id } from '$lib/db';
import type { User } from '$lib/types';
import type { RequestEvent } from '@sveltejs/kit';

export async function GET(event: RequestEvent): Promise<Response> {
  let google_id = '';
  let google_secret = '';
  let session_secret = '';
  try {
    const env = event.platform?.env;
    google_id = await env?.GOOGLE_ID.get() ?? '';
    google_secret = await env?.GOOGLE_SECRET.get() ?? '';
    session_secret = await env?.SECRET.get() ?? '';
  } catch {
    return new Response(null, { status: 302, headers: { Location: '/' } });
  }

  const code = event.url.searchParams.get('code');
  const state = event.url.searchParams.get('state');
  const stored_state = event.cookies.get('oauth_state') ?? null;
  const verifier = event.cookies.get('oauth_verifier') ?? null;
  if (!code || !state || !stored_state || !verifier || state !== stored_state) {
    return new Response(null, { status: 400 });
  }

  try {
    const tokens = await get_google(event.url.origin, google_id, google_secret).validateAuthorizationCode(code, verifier);
    const claims = decodeIdToken(tokens.idToken()) as Record<string, unknown>;
    const email = claims.email as string | undefined;
    const name = claims.name as string | undefined;
    const picture = claims.picture as string | undefined;
    if (!email) return new Response(null, { status: 400 });

    const existing = await find_user_by_email(email) as (User & { i: string }) | undefined;
    let user_id: string;
    if (existing) {
      user_id = existing.i;
    } else {
      user_id = new_id();
      const u: User = { s: 'u', e: email, n: name, pic: picture, d: Date.now() };
      await create(u, undefined, user_id);
    }

    const session = await encode_session({ id: user_id, name, picture, email }, session_secret);
    event.cookies.set('session', session, { path: '/', httpOnly: true, maxAge: 604800, sameSite: 'lax' });
    event.cookies.delete('oauth_state', { path: '/' });
    event.cookies.delete('oauth_verifier', { path: '/' });
    const next = event.cookies.get('oauth_next') || '/';
    event.cookies.delete('oauth_next', { path: '/' });
    return new Response(null, { status: 302, headers: { Location: next } });
  } catch {
    return new Response(null, { status: 400 });
  }
}
