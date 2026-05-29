import { json } from '@sveltejs/kit';
import type { RequestHandler } from '@sveltejs/kit';
import { GEMINI } from '$env/static/private';
import { GoogleGenAI, ThinkingLevel } from '@google/genai';

function build_prompt(fen: string, move: string, score: number, depth: number): string {
	const score_str = score > 90000 ? 'Mate' : score < -90000 ? '-Mate' : (score / 100).toFixed(2);
	return [
		'You are a friendly chess coach explaining to a kid (age 9-12) who is learning chess.',
		'Be encouraging and use simple words everyone can understand.',
		'',
		`Position (FEN): ${fen}`,
		`Stockfish recommends: ${move}`,
		`Computer evaluation: ${score_str}`,
		`How deep the computer looked: ${depth} moves ahead`,
		'',
		'Write 3-4 short paragraphs (2-3 sentences each). Use **bold** for key ideas.',
		'1. What does this move do? Why is it a good choice?',
		'2. What is the big idea behind the move? (like attacking, defending, or bringing pieces out)',
		'3. What are the good things about this move? Any risks?',
		'4. What should happen next? What is the plan after this move?',
		'',
		'Use simple language like talking to a friend who is learning. No long chess jargon. Be positive and fun!',
	].join('\n');
}

export const POST: RequestHandler = async ({ request }) => {
	const body = await request.json().catch(() => null);
	if (!body || !body.fen || !body.move) {
		return json({ error: 'Missing fen or move' }, { status: 400 });
	}

	const { fen, move, score = 0, depth = 0 } = body;

	const ai = new GoogleGenAI({ apiKey: GEMINI });

	const stream = new ReadableStream({
		async start(controller) {
			try {
				const response = await ai.models.generateContentStream({
					model: 'gemma-4-26b-a4b-it',
					contents: build_prompt(fen, move, score, depth),
					config: {
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
					controller.enqueue(new TextEncoder().encode('\n[Analysis error: ' + msg + ']'));
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
