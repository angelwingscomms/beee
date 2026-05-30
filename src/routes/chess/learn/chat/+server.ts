import { json } from '@sveltejs/kit';
import type { RequestHandler } from '@sveltejs/kit';
import { GEMINI } from '$env/static/private';
import { GoogleGenAI, ThinkingLevel } from '@google/genai';

type Msg = { r: 'user' | 'assistant'; c: string; d?: Data };
type Data = { f?: string; p?: string; u?: string; a?: string; h?: string };

const sys = 'You are a concise chess coach. Use the supplied board context when present. Use **bold** for key ideas.';
const enc = new TextEncoder();

function event(name: string, data: object) {
	return enc.encode(`event: ${name}\ndata: ${JSON.stringify(data)}\n\n`);
}

function text(v: unknown) {
	return typeof v === 'string' ? v.trim() : '';
}

function build_input(msg: Msg) {
	const d = msg.d ?? {};
	const rows = [
		d.f && `fen: ${d.f}`,
		d.p && `move_history: ${d.p}`,
		d.u && `last_user_move: ${d.u}`,
		d.a && `last_ai_move: ${d.a}`,
		d.h && `hint: ${d.h}`,
	].filter(Boolean);

	return rows.length
		? `${msg.c}\n\n[board_context]\n${rows.join('\n')}\n[/board_context]`
		: msg.c;
}

function normalize_msg(v: any): Msg | null {
	const r = v?.r ?? v?.role;
	const c = text(v?.c ?? v?.content);
	if ((r !== 'user' && r !== 'assistant') || !c) return null;
	return { r, c, d: v?.d && typeof v.d === 'object' ? v.d : undefined };
}

function build_steps(messages: Msg[]) {
	return messages.map((m) => ({
		type: m.r === 'assistant' ? 'model_output' : 'user_input',
		content: [{ type: 'text', text: m.r === 'user' ? build_input(m) : m.c }],
	}));
}

function build_contents(messages: Msg[]) {
	return messages.map((m) => ({
		role: m.r === 'assistant' ? 'model' : 'user',
		parts: [{ text: m.r === 'user' ? build_input(m) : m.c }],
	}));
}

async function stream_fallback(controller: ReadableStreamDefaultController, request: Request, ai: GoogleGenAI, messages: Msg[], m: string) {
	const response = await ai.models.generateContentStream({
		model: m,
		contents: build_contents(messages),
		config: {
			systemInstruction: { parts: [{ text: sys }] },
			thinkingConfig: { thinkingLevel: ThinkingLevel.HIGH },
		},
	});
	for await (const chunk of response) {
		if (request.signal.aborted) break;
		if (chunk.text) controller.enqueue(event('text', { t: chunk.text }));
	}
}

export const POST: RequestHandler = async ({ request }) => {
	const body = await request.json().catch(() => null);
	const raw = Array.isArray(body?.x) ? body.x : Array.isArray(body?.messages) ? body.messages : [];
	const messages = raw.map(normalize_msg).filter(Boolean) as Msg[];
	if (!messages.length) return json({ error: 'Missing messages array' }, { status: 400 });

	const i = text(body?.i);
	const m = text(body?.m) || 'gemini-3.5-flash';
	const last = messages.findLast((msg) => msg.r === 'user');
	if (!last) return json({ error: 'Missing user message' }, { status: 400 });

	const ai = new GoogleGenAI({ apiKey: GEMINI });
	const stream = new ReadableStream({
		async start(controller) {
			let wrote = false;
			try {
				const response = await ai.interactions.create({
					model: m,
					input: i ? build_input(last) : build_steps(messages) as any,
					previous_interaction_id: i || undefined,
					stream: true,
					system_instruction: sys,
					generation_config: { thinking_level: 'high' },
				}, { signal: request.signal });
				for await (const chunk of response) {
					if (request.signal.aborted) break;
					if (chunk.event_type === 'step.delta' && chunk.delta.type === 'text') {
						wrote = true;
						controller.enqueue(event('text', { t: chunk.delta.text }));
					}
					if (chunk.event_type === 'interaction.completed') {
						controller.enqueue(event('interaction', { i: chunk.interaction.id }));
					}
				}
			} catch (e) {
				if (!request.signal.aborted) {
					if (!wrote) {
						try {
							await stream_fallback(controller, request, ai, messages, m);
						} catch (fallback) {
							controller.enqueue(event('error', { e: fallback instanceof Error ? fallback.message : 'Unknown error' }));
						}
					} else {
						controller.enqueue(event('error', { e: e instanceof Error ? e.message : 'Unknown error' }));
					}
				}
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
