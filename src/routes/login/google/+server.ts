import { generateState, generateCodeVerifier, google_client } from '$lib/server/oauth';
import { get_secret } from '$lib/server/secrets';
import type { RequestEvent } from '@sveltejs/kit';

export async function GET(event: RequestEvent): Promise<Response> {
  const id = await get_secret('GOOGLE_ID');
  const secret = await get_secret('GOOGLE_SECRET');
  const origin = event.url.origin;
  console.log('[google login] origin:', origin);
  console.log('[google login] GOOGLE_ID:', id ? id.slice(0, 20) + '...' : 'EMPTY', 'GOOGLE_SECRET:', secret ? '***' : 'MISSING');
  const state = generateState();
  const verifier = generateCodeVerifier();
  const redirect_uri = `${origin}/google`;
  console.log('[google login] redirect_uri:', redirect_uri);
  console.log('[google login] state.length:', state.length, 'verifier.length:', verifier.length);
  console.log('[google login] scopes:', ['openid', 'profile', 'email']);
  const url = google_client(origin, id, secret)
    .createAuthorizationURL(state, verifier, ['openid', 'profile', 'email'])
    .toString();
  console.log('[google login] authorization URL generated, length:', url.length);
  console.log('[google login] setting cookies: oauth_state, oauth_verifier, oauth_next');
  console.log('[google login] next param:', event.url.searchParams.get('next') || '(default /)');
  event.cookies.set('oauth_state', state, { path: '/', httpOnly: true, maxAge: 600, sameSite: 'lax' });
  event.cookies.set('oauth_verifier', verifier, { path: '/', httpOnly: true, maxAge: 600, sameSite: 'lax' });
  const next = event.url.searchParams.get('next') || '/';
  event.cookies.set('oauth_next', next, { path: '/', httpOnly: true, maxAge: 600, sameSite: 'lax' });
  console.log('[google login] redirecting to Google authorization endpoint');
  return new Response(null, { status: 302, headers: { Location: url } });
}
