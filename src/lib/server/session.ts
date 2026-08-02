import { get_secret } from '$lib/server/secrets';
import { env } from '$env/dynamic/private';

const cookie_domain = env.COOKIE_DOMAIN || undefined;

type CookieOpts = {
	path: string;
	httpOnly: boolean;
	maxAge?: number;
	sameSite: 'lax';
	domain?: string;
};

export const SESSION_COOKIE: CookieOpts = {
	path: '/',
	httpOnly: true,
	maxAge: 604800,
	sameSite: 'lax',
	...(cookie_domain && { domain: cookie_domain })
};
export const SESSION_COOKIE_DELETE: { path: string; domain?: string } = {
	path: '/',
	...(cookie_domain && { domain: cookie_domain })
};

function b64(s: string): string {
  return btoa(s).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

function ub64(s: string): string {
  s = s.replace(/-/g, '+').replace(/_/g, '/');
  while (s.length % 4) s += '=';
  return atob(s);
}

async function get_key(): Promise<CryptoKey> {
  const secret = new TextEncoder().encode(await get_secret('SECRET')).slice(0, 32);
  return crypto.subtle.importKey('raw', secret, { name: 'HMAC', hash: 'SHA-256' }, false, ['sign', 'verify']);
}

export async function encode_session(data: { id: string; name?: string; picture?: string; email?: string; ph?: string[] }): Promise<string> {
  const p = { u: data.id, n: data.name, p: data.picture, m: data.email, t: data.ph, e: Date.now() + 604800000 };
  const raw = b64(JSON.stringify(p));
  const k = await get_key();
  const sig = await crypto.subtle.sign('HMAC', k, new TextEncoder().encode(raw));
  const token = raw + '.' + b64(String.fromCharCode(...new Uint8Array(sig)));
  console.log('[session] encode: id=' + data.id + ' email=' + data.email + ' token.length=' + token.length);
  return token;
}

export async function decode_session(c: string | undefined | null): Promise<{ user: { id: string; name?: string; picture?: string; email?: string; ph?: string[] } } | null> {
  if (!c) {
    console.log('[session] decode: no cookie');
    return null;
  }
  const [raw, sig] = c.split('.');
  if (!raw || !sig) {
    console.warn('[session] decode: malformed cookie (missing dot-separated parts)');
    return null;
  }
  try {
    const k = await get_key();
    const sig_buf = Uint8Array.from(ub64(sig), c => c.charCodeAt(0)).buffer as ArrayBuffer;
    const valid = await crypto.subtle.verify('HMAC', k, sig_buf, new TextEncoder().encode(raw));
    if (!valid) {
      console.warn('[session] decode: HMAC signature invalid');
      return null;
    }
    const p = JSON.parse(ub64(raw));
    if (p.e < Date.now()) {
      console.log('[session] decode: token expired');
      return null;
    }
    console.log('[session] decode: valid session for id=' + p.u + ' email=' + p.m);
    return { user: { id: p.u, name: p.n, picture: p.p, email: p.m, ph: p.t } };
  } catch (e) {
    console.warn('[session] decode: exception:', e);
    return null;
  }
}
