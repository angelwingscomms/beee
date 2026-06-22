import type { RequestHandler } from '@sveltejs/kit';
import { AZURE_SPEECH_KEY, AZURE_SPEECH_REGION } from '$env/static/private';

export const POST: RequestHandler = async ({ request }) => {
	const key = AZURE_SPEECH_KEY;
	const region = AZURE_SPEECH_REGION;
	if (!key || !region) return new Response('Missing AZURE_SPEECH_KEY or AZURE_SPEECH_REGION', { status: 500 });

	const body = await request.json().catch(() => null);
	const text = (body?.t as string)?.trim();
	if (!text) return new Response('Missing text', { status: 400 });

	const ssml = `<speak version='1.0' xml:lang='en-US'><voice name='en-US-AriaNeural'>${esc(text)}</voice></speak>`;

	const res = await fetch(
		`https://${region}.tts.speech.microsoft.com/cognitiveservices/v1`,
		{
			method: 'POST',
			headers: {
				'Ocp-Apim-Subscription-Key': key,
				'Content-Type': 'application/ssml+xml',
				'X-Microsoft-OutputFormat': 'audio-24khz-48kbitrate-mono-mp3',
			},
			body: ssml,
		},
	);

	if (!res.ok) {
		const e = await res.text().catch(() => 'azure tts error');
		console.log('[tts] error:', e);
		return new Response(e, { status: 502 });
	}

	return new Response(res.body, {
		headers: {
			'Content-Type': 'audio/mpeg',
			'Cache-Control': 'no-cache',
		},
	});
};

function esc(s: string) {
	return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}
