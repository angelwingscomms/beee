import { json } from '@sveltejs/kit';
import type { RequestHandler } from '@sveltejs/kit';
import { GROQ_API_KEY } from '$env/static/private';

export const POST: RequestHandler = async ({ request }) => {
	const key = GROQ_API_KEY;
	if (!key) return json({ e: 'Missing GROQ_API_KEY' }, { status: 500 });

	const form = await request.formData().catch(() => null);
	const file = form?.get('audio');
	if (!file || typeof file === 'string') return json({ e: 'Missing audio' }, { status: 400 });

	const groq = await fetch('https://api.groq.com/openai/v1/audio/transcriptions', {
		method: 'POST',
		headers: { Authorization: `Bearer ${key}` },
		body: (() => {
			const fd = new FormData();
			fd.set('file', file, 'audio.webm');
			fd.set('model', 'whisper-large-v3-turbo');
			fd.set('response_format', 'json');
			return fd;
		})(),
	});

	if (!groq.ok) {
		const e = await groq.text().catch(() => 'groq stt error');
		console.log('[stt] error:', e);
		return json({ e }, { status: 502 });
	}

	const data = await groq.json().catch(() => null);
	return json({ t: (data as any)?.text ?? '' });
};
