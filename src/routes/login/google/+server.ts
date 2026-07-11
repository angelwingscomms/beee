import { generateState, generateCodeVerifier, google_client } from '$lib/server/oauth';
import { env_val } from '$lib/server/env';
import type { RequestEvent } from '@sveltejs/kit';

export async function GET(event: RequestEvent): Promise<Response> {
  let id = '';
  let secret = '';
  try {
    const env = event.platform?.env;
    id = await env_val(env, 'GOOGLE_ID');
    secret = await env_val(env, 'GOOGLE_SECRET');
  } catch (e) {
    console.error('[google login] env error:', e);
    return new Response(null, { status: 302, headers: { Location: '/' } });
  }
  console.log('[google login] GOOGLE_ID:', id, 'GOOGLE_SECRET:', secret ? '***' : 'MISSING');
  const state = generateState();
  const verifier = generateCodeVerifier();
  const url = google_client(event.url.origin, id, secret)
    .createAuthorizationURL(state, verifier, ['openid', 'profile', 'email'])
    .toString();
  event.cookies.set('oauth_state', state, { path: '/', httpOnly: true, maxAge: 600, sameSite: 'lax' });
  event.cookies.set('oauth_verifier', verifier, { path: '/', httpOnly: true, maxAge: 600, sameSite: 'lax' });
  const next = event.url.searchParams.get('next') || '/';
  event.cookies.set('oauth_next', next, { path: '/', httpOnly: true, maxAge: 600, sameSite: 'lax' });
  return new Response(null, { status: 302, headers: { Location: url } });
}
