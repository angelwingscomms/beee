import { describe, expect, it, vi, beforeEach } from 'vitest';

vi.mock('$lib/server/secrets', () => ({ set_platform: vi.fn() }));
vi.mock('$lib/server/session', () => ({
	decode_session: vi.fn(async () => null),
	SESSION_COOKIE_DELETE: { path: '/', maxAge: 0 }
}));

import { handle } from './hooks.server';

function make_event(pathname: string, accept: string) {
	return {
		request: new Request(`https://beeeproject.com${pathname}`, { headers: { accept } }),
		url: new URL(`https://beeeproject.com${pathname}`),
		cookies: { get: vi.fn(() => null), delete: vi.fn() },
		platform: null,
		locals: { user: null }
	} as any;
}

describe('markdown content negotiation', () => {
	beforeEach(() => vi.clearAllMocks());

	it('serves a public page as markdown when Accept: text/markdown', async () => {
		const event = make_event('/about', 'text/markdown');
		const resolve = vi.fn(async () => new Response('<html>about</html>', { status: 200 }));
		const res = await handle({ event, resolve } as any);
		expect(res.status).toBe(200);
		expect(res.headers.get('content-type')).toContain('text/markdown');
		expect(res.headers.get('vary')).toContain('Accept');
		expect(await res.text()).toContain('BEEE');
		expect(resolve).not.toHaveBeenCalled();
	});

	it('returns a real 404 with a markdown body for a missing path', async () => {
		const event = make_event('/no-such-page', 'text/markdown');
		const resolve = vi.fn(async () => new Response('<html>not found</html>', { status: 404 }));
		const res = await handle({ event, resolve } as any);
		expect(res.status).toBe(404);
		expect(res.headers.get('content-type')).toContain('text/markdown');
		const body = await res.text();
		expect(body).toContain('llms.txt');
		expect(body).toContain('sitemap.xml');
	});

	it('leaves ordinary HTML requests alone', async () => {
		const event = make_event('/about', 'text/html');
		const resolve = vi.fn(async () => new Response('<html>about</html>', { status: 200 }));
		const res = await handle({ event, resolve } as any);
		expect(await res.text()).toContain('about');
		expect(resolve).toHaveBeenCalled();
	});

	it('falls through for private pages even when markdown is requested', async () => {
		const event = make_event('/dashboard', 'text/markdown');
		const resolve = vi.fn(async () => new Response('<html>dash</html>', { status: 200 }));
		const res = await handle({ event, resolve } as any);
		expect(resolve).toHaveBeenCalled();
		expect(res.status).toBe(200);
	});
});
