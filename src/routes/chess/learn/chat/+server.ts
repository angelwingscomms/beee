import { json } from '@sveltejs/kit';
import type { RequestHandler } from '@sveltejs/kit';
import { GEMINI } from '$env/static/private';
import { GoogleGenAI, ThinkingLevel } from '@google/genai';

function build_prompt(fen: string, move: string, score: number, depth: number): string {
	const score_str = score > 90000 ? 'Mate' : score < -90000 ? '-Mate' : (score / 100).toFixed(2);
	return [
		'You are a chess coach analyzing a position. Keep answers concise and instructive. Use **bold** for key ideas.',
		'',
		`Position (FEN): ${fen}`,
		`Stockfish recommends: ${move}`,
		`Evaluation: ${score_str}`,
		`Depth searched: ${depth}`,
		'',
		'Cover: what the move does concretely, the pattern or principle at play, and a follow-up thought. Be brief but instructive.',
	].join('\n');
}

export const POST: RequestHandler = async ({ request }) => {
	const body = await request.json().catch(() => null);
	if (!body || !body.messages || !Array.isArray(body.messages)) {
		return json({ error: 'Missing messages array' }, { status: 400 });
	}

	const { messages, fen, move, score = 0, depth = 0, m } = body;

	const ai = new GoogleGenAI({ apiKey: GEMINI });

	const contents = messages.map((msg: { role: string; content: string }) => ({
		role: msg.role === 'assistant' ? 'model' : 'user',
		parts: [{ text: msg.content }],
	}));

	const sys = fen && move
		? build_prompt(fen, move, score, depth)
		: fen
			? `You are a chess coach analyzing a position. Keep answers concise and instructive. Use **bold** for key ideas.\n\nPosition (FEN): ${fen}\n\nAnswer the user's questions about this position.`
			: 'You are a chess coach. Answer concisely and instructively. Use **bold** for key ideas.';

	const stream = new ReadableStream({
		async start(controller) {
			try {
				const response = await ai.models.generateContentStream({
					model: m || 'gemini-3.5-flash',
					contents,
					config: {
						systemInstruction: { parts: [{ text: sys }] },
						thinkingConfig: { thinkingLevel: ThinkingLevel.HIGH },
					},
				});
				for await (const chunk of response) {
					if (request.signal.aborted) break;
					if (chunk.text) {
						controller.enqueue(new TextEncoder().encode(chunk.text));
					}
				}
			} catch (e) {
				if (!request.signal.aborted) {
					const msg = e instanceof Error ? e.message : 'Unknown error';
					controller.enqueue(new TextEncoder().encode('\n[Error: ' + msg + ']'));
				}
			} finally {
				if (!request.signal.aborted) controller.close();
			}
		},
	});

	return new Response(stream, {
		headers: { 'Content-Type': 'text/plain; charset=utf-8' },
	});
};
