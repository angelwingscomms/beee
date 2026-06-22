import type { RequestHandler } from '@sveltejs/kit';
import { GROQ_API_KEY } from '$env/static/private';

type Msg = { r: 'user' | 'assistant'; c: string; d?: Record<string, string> };

const sys = 'You are a concise chess coach. Use the supplied board context when present. Use **bold** for key ideas.';
const enc = new TextEncoder();

function event(name: string, data: object) {
	return enc.encode(`event: ${name}\ndata: ${JSON.stringify(data)}\n\n`);
}

function fmt(m: Msg) {
	const d = m.d ?? {};
	const rows = [
		d.f && `fen: ${d.f}`,
		d.p && `move_history: ${d.p}`,
		d.u && `last_user_move: ${d.u}`,
		d.a && `last_ai_move: ${d.a}`,
		d.h && `hint: ${d.h}`,
	].filter(Boolean);

	const c = rows.length ? `${m.c}\n\n[board_context]\n${rows.join('\n')}\n[/board_context]` : m.c;

	return { role: m.r === 'assistant' ? 'assistant' : 'user', content: c };
}

export const POST: RequestHandler = async ({ request }) => {
	const key = GROQ_API_KEY;
	if (!key) {
		return new Response('Missing GROQ_API_KEY', { status: 500 });
	}

	const body = await request.json().catch(() => null);
	const raw = Array.isArray(body?.x) ? body.x : [];
	const msgs: Msg[] = raw.filter((v: any) => v && (v.r === 'user' || v.r === 'assistant'));
	if (!msgs.length) return new Response('Missing messages', { status: 400 });

	const m = (body?.m as string) || 'llama-3.3-70b-versatile';

	const stream = new ReadableStream({
		async start(controller) {
			try {
				const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
					method: 'POST',
					headers: {
						Authorization: `Bearer ${key}`,
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						model: m,
						messages: [{ role: 'system', content: sys }, ...msgs.map(fmt)],
						stream: true,
					}),
					signal: request.signal,
				});

				if (!res.ok) {
					const e = await res.text().catch(() => 'groq error');
					controller.enqueue(event('error', { e }));
					return;
				}

				const reader = res.body?.getReader();
				if (!reader) {
					controller.enqueue(event('error', { e: 'No response body' }));
					return;
				}

				const dec = new TextDecoder();
				let buf = '';

				while (true) {
					const { done, value } = await reader.read();
					if (done) break;

					buf += dec.decode(value, { stream: true });
					const lines = buf.split('\n');
					buf = lines.pop() ?? '';

					for (const line of lines) {
						const t = line.trim();
						if (!t || !t.startsWith('data: ')) continue;
						const d = t.slice(6);
						if (d === '[DONE]') break;
						try {
							const parsed = JSON.parse(d) as any;
							const delta = parsed?.choices?.[0]?.delta?.content;
							if (delta) controller.enqueue(event('text', { t: delta }));
						} catch { /* skip malformed */ }
					}
				}
			} catch (e) {
				if (request.signal.aborted) return;
				controller.enqueue(event('error', { e: e instanceof Error ? e.message : 'Unknown error' }));
			} finally {
				if (!request.signal.aborted) controller.close();
			}
		},
	});

	return new Response(stream, {
		headers: {
			'Content-Type': 'text/event-stream; charset=utf-8',
			'Cache-Control': 'no-cache',
		},
	});
};
