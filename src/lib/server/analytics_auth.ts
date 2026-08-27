import bcrypt from 'bcryptjs';
import { get_secret } from '$lib/server/secrets';
import { env } from '$env/dynamic/private';

const COOKIE_NAME = 'analytics_auth';
const FALLBACK_HASH = '$2b$10$ZPpqOXRbNz9K6/zoWYcKWubEROWMgyTaLZ/Ajs1kwo416ATxtkxqW';
const MAX_AGE = 43200;

const cookie_domain = env.COOKIE_DOMAIN || undefined;

export const ANALYTICS_COOKIE = {
	path: '/369',
	httpOnly: true,
	secure: true,
	sameSite: 'lax' as const,
	maxAge: MAX_AGE,
	...(cookie_domain && { domain: cookie_domain })
};

export const ANALYTICS_COOKIE_DELETE = {
	path: '/369',
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
	const secret = new TextEncoder().encode((await get_secret('SECRET')).slice(0, 32));
	return crypto.subtle.importKey('raw', secret, { name: 'HMAC', hash: 'SHA-256' }, false, ['sign', 'verify']);
}

export async function verify_password(pw: string): Promise<boolean> {
	let hash = FALLBACK_HASH;
	try {
		const from_store = await get_secret('ANALYTICS_PASSWORD_HASH');
		if (from_store && from_store.startsWith('$2')) hash = from_store;
	} catch {}
	const ok = await bcrypt.compare(pw, hash);
	return ok;
}

export async function create_analytics_token(): Promise<string> {
	const p = { t: 'analytics', e: Date.now() + MAX_AGE * 1000, r: crypto.randomUUID().slice(0, 8) };
	const raw = b64(JSON.stringify(p));
	const k = await get_key();
	const sig = await crypto.subtle.sign('HMAC', k, new TextEncoder().encode(raw));
	const token = raw + '.' + b64(String.fromCharCode(...new Uint8Array(sig)));
	return token;
}

export async function verify_analytics_token(c: string | undefined | null): Promise<boolean> {
	if (!c) return false;
	const [raw, sig] = c.split('.');
	if (!raw || !sig) return false;
	try {
		const k = await get_key();
		const sig_buf = Uint8Array.from(ub64(sig), (ch) => ch.charCodeAt(0)).buffer as ArrayBuffer;
		const valid = await crypto.subtle.verify('HMAC', k, sig_buf, new TextEncoder().encode(raw));
		if (!valid) return false;
		const p = JSON.parse(ub64(raw));
		if (p.t !== 'analytics') return false;
		if (p.e < Date.now()) return false;
		return true;
	} catch {
		return false;
	}
}

const attempts = new Map<string, { n: number; until: number }>();

export function check_rate_limit(ip: string): { allowed: boolean; retry_after: number } {
	const now = Date.now();
	const entry = attempts.get(ip);
	if (entry && entry.until > now) {
		if (entry.n >= 5) return { allowed: false, retry_after: Math.ceil((entry.until - now) / 1000) };
	}
	if (entry && entry.until <= now) attempts.delete(ip);
	return { allowed: true, retry_after: 0 };
}

export function record_fail(ip: string): void {
	const now = Date.now();
	const entry = attempts.get(ip);
	if (!entry || entry.until <= now) {
		attempts.set(ip, { n: 1, until: now + 15 * 60 * 1000 });
	} else {
		entry.n += 1;
		if (entry.n >= 5) entry.until = now + 15 * 60 * 1000;
	}
}

export function clear_attempts(ip: string): void {
	attempts.delete(ip);
}

export { COOKIE_NAME };
