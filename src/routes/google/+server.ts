import { decodeIdToken } from 'arctic';
import { google_client as get_google } from '$lib/server/oauth';
import { encode_session } from '$lib/server/session';
import { create, find_user_by_email } from '$lib/db';
import { get_secret } from '$lib/server/secrets';
import type { User } from '$lib/types';
import type { RequestEvent } from '@sveltejs/kit';

export async function GET(event: RequestEvent): Promise<Response> {
  const origin = event.url.origin;
  console.log('[google callback] === NEW CALLBACK ===');
  console.log('[google callback] origin:', origin);
  console.log('[google callback] full URL:', event.url.href);
  console.log('[google callback] all cookies:', event.cookies.getAll());

  console.log('[google callback] fetching GOOGLE_ID and GOOGLE_SECRET from secrets store...');
  const google_id = await get_secret('GOOGLE_ID');
  const google_secret = await get_secret('GOOGLE_SECRET');
  console.log('[google callback] GOOGLE_ID:', google_id ? google_id.slice(0, 20) + '...' : 'EMPTY');
  console.log('[google callback] GOOGLE_SECRET:', google_secret ? '***' : 'EMPTY');
  console.log('[google callback] expected redirect_uri:', `${origin}/google`);

  const code = event.url.searchParams.get('code');
  const state = event.url.searchParams.get('state');
  const stored_state = event.cookies.get('oauth_state') ?? null;
  const verifier = event.cookies.get('oauth_verifier') ?? null;
  console.log('[google callback] code present:', !!code, '| state present:', !!state);
  console.log('[google callback] stored_state present:', !!stored_state, '| verifier present:', !!verifier);
  console.log('[google callback] code length:', code?.length ?? 0, '| state length:', state?.length ?? 0);
  console.log('[google callback] stored_state length:', stored_state?.length ?? 0, '| verifier length:', verifier?.length ?? 0);
  if (stored_state && state) console.log('[google callback] state match:', state === stored_state);
  if (!code || !state || !stored_state || !verifier || state !== stored_state) {
    console.warn('[google callback] VALIDATION FAILED: returning 400');
    if (!code) console.warn('[google callback]  cause: code is missing');
    if (!state) console.warn('[google callback]  cause: state query param is missing');
    if (!stored_state) console.warn('[google callback]  cause: oauth_state cookie is missing (not set, expired, or not sent by browser)');
    if (!verifier) console.warn('[google callback]  cause: oauth_verifier cookie is missing');
    if (state && stored_state && state !== stored_state) {
      console.warn('[google callback]  cause: state mismatch');
      console.warn('[google callback]  state (from Google):', state);
      console.warn('[google callback]  stored_state (from cookie):', stored_state);
    }
    return new Response(null, { status: 400 });
  }
  console.log('[google callback] params validation passed');

  try {
    console.log('[google callback] exchanging authorization code for tokens...');
    console.log('[google callback] code (first 20):', code.slice(0, 20) + '...');
    console.log('[google callback] verifier (first 10):', verifier.slice(0, 10) + '...');
    const tokens = await get_google(origin, google_id, google_secret).validateAuthorizationCode(code, verifier);
    console.log('[google callback] token exchange succeeded');
    console.log('[google callback] access_token present:', !!tokens.accessToken());
    console.log('[google callback] id_token present:', !!tokens.idToken());
    console.log('[google callback] refresh_token present:', tokens.hasRefreshToken());

    console.log('[google callback] decoding ID token...');
    const claims = decodeIdToken(tokens.idToken()) as Record<string, unknown>;
    console.log('[google callback] ID token claims keys:', Object.keys(claims));
    const email = claims.email as string | undefined;
    const name = claims.name as string | undefined;
    const picture = claims.picture as string | undefined;
    console.log('[google callback] email:', email, '| name:', name, '| picture present:', !!picture);

    if (!email) {
      console.warn('[google callback] no email in ID token claims, returning 400');
      console.warn('[google callback] full claims:', JSON.stringify(claims));
      return new Response(null, { status: 400 });
    }

    console.log('[google callback] looking up existing user by email:', email);
    const existing = await find_user_by_email(email) as (User & { i: string }) | undefined;
    let user_id: string;
    if (existing) {
      user_id = existing.i;
      console.log('[google callback] existing user found, id:', user_id);
    } else {
      user_id = crypto.randomUUID();
      console.log('[google callback] no existing user, creating new user with id:', user_id);
      const u: User = { s: 'u', e: email, n: name, pic: picture, d: Date.now() };
      await create(u, undefined, user_id);
      console.log('[google callback] new user created');
    }

    console.log('[google callback] encoding session...');
    const session = await encode_session({ id: user_id, name, picture, email, ph: existing?.ph });
    console.log('[google callback] session encoded, setting cookie');
    const cookieOpts = { path: '/', httpOnly: true, maxAge: 604800, sameSite: 'lax' as const };
    event.cookies.set('session', session, cookieOpts);
    event.cookies.delete('oauth_state', { path: '/' });
    event.cookies.delete('oauth_verifier', { path: '/' });
    const next = event.cookies.get('oauth_next') || '/';
    console.log('[google callback] next redirect:', next);
    event.cookies.delete('oauth_next', { path: '/' });
    console.log('[google callback] SUCCESS: redirecting to', next);
    return new Response(null, { status: 302, headers: { Location: next } });
  } catch (e) {
    console.error('[google callback] EXCHANGE/LOGIN FAILED:', e);
    console.error('[google callback] error name:', (e as Error)?.name);
    console.error('[google callback] error message:', (e as Error)?.message);
    console.error('[google callback] error stack:', (e as Error)?.stack);
    return new Response(null, { status: 400 });
  }
}
