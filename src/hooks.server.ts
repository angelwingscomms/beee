import type { Handle } from '@sveltejs/kit';
import { decode_session, SESSION_COOKIE_DELETE } from '$lib/server/session';
import { set_platform } from '$lib/server/secrets';
import { markdown_for, markdown_404 } from '$lib/markdown';

const wants_markdown = (req: Request) =>
	(req.headers.get('accept') || '').toLowerCase().includes('text/markdown');

const markdown_headers = {
	'Content-Type': 'text/markdown; charset=utf-8',
	Vary: 'Accept, Accept-Encoding',
	'Cache-Control': 'no-store'
};

export const handle: Handle = async ({ event, resolve }) => {
	set_platform(event.platform);

	const session_id = event.cookies.get('session');
	event.locals.user = null;
	if (session_id) {
		try {
			const s = await decode_session(session_id);
			if (s) {
				event.locals.user = s.user;
			} else {
				event.cookies.delete('session', SESSION_COOKIE_DELETE);
			}
		} catch {
			event.cookies.delete('session', SESSION_COOKIE_DELETE);
		}
	}

	const path = event.url.pathname;

	// acceptmarkdown.com: answer known public pages with a markdown body when the
	// client asks for it, and mark the response with Vary so caches keep the
	// HTML and markdown variants apart.
	if (wants_markdown(event.request)) {
		const md = markdown_for(path);
		if (md) {
			return new Response(md, { status: 200, headers: markdown_headers });
		}
	}

	const response = await resolve(event);

	// Agent-friendly 404: for a missing path requested as markdown, send a short
	// markdown body that points at the sitemap and site index.
	if (wants_markdown(event.request) && response.status === 404) {
		return new Response(markdown_404(path), { status: 404, headers: markdown_headers });
	}

	return response;
};
