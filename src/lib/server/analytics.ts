import { collection } from '$lib/constants';
import { get_qdrant } from '$lib/db/get_qdrant';

export type AnalyticsKind = 'pv' | 'click' | 'api' | 'reg_start' | 'reg_success';

export interface AnalyticsEvent {
	s: 'ae';
	k: AnalyticsKind;
	u: string;
	r?: string;
	co?: string;
	ci?: string;
	ua?: string;
	lang?: string;
	ref?: string;
	ip_hash?: string;
	ip_trunc?: string;
	sid?: string;
	c?: string;
	d: number;
}

function trunc_ip(ip: string): string {
	if (!ip) return '';
	if (ip.includes(':')) return ip.split(':').slice(0, 3).join(':') + ':xxx';
	const parts = ip.split('.');
	if (parts.length === 4) return parts.slice(0, 3).join('.') + '.xxx';
	return ip.slice(0, 8) + 'xxx';
}

async function hash_ip(ip: string, salt: string): Promise<string> {
	const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(ip + salt));
	return [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, '0')).slice(0, 16).join('');
}

export async function record_analytics_event(
	kind: AnalyticsKind,
	url: string,
	request: Request,
	platform: App.Platform | undefined,
	extra: Partial<AnalyticsEvent> = {}
): Promise<void> {
	try {
		const ip = request.headers.get('cf-connecting-ip') || request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || '0.0.0.0';
		const co = (request as any).cf?.country as string | undefined || request.headers.get('cf-ipcountry') || '';
		const ci = (request as any).cf?.city as string | undefined || '';
		const ua = request.headers.get('user-agent')?.slice(0, 300) || '';
		const lang = request.headers.get('accept-language')?.slice(0, 40) || '';
		const referer = request.headers.get('referer')?.slice(0, 500) || '';
		const salt = new Date().toISOString().slice(0, 10);
		const ip_hash = await hash_ip(ip, salt);
		const ip_trunc = trunc_ip(ip);
		const full_url = url.slice(0, 500);
		const c = new URL(request.url).searchParams.get('c')?.slice(0, 20) || extra.c || '';

		const payload: AnalyticsEvent = {
			s: 'ae',
			k: kind,
			u: full_url,
			r: referer || extra.r || '',
			co: co || extra.co || '',
			ci: ci || extra.ci || '',
			ua,
			lang,
			ip_hash,
			ip_trunc,
			c,
			d: Date.now(),
			...extra
		};

		const id = crypto.randomUUID();
		const vector = { i: new Array(4096).fill(0) };
		const q = await get_qdrant();
		await q.upsert(collection, {
			points: [{ id, vector: vector as unknown as number[], payload: payload as unknown as Record<string, unknown> }],
			wait: false
		});
	} catch (e) {
		console.warn('[analytics] record failed', e);
	}
}

export function should_skip_analytics(pathname: string): boolean {
	if (pathname.startsWith('/369')) return true;
	if (pathname.startsWith('/api/analytics')) return true;
	if (pathname.startsWith('/.well-known')) return true;
	if (pathname.match(/\.(js|css|png|jpg|svg|woff2|ico|json)$/)) return true;
	return false;
}
