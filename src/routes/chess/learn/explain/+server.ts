import { json } from '@sveltejs/kit';
import type { RequestHandler } from '@sveltejs/kit';
import { GEMINI } from '$env/static/private';
import { GoogleGenAI, ThinkingLevel } from '@google/genai';

function build_prompt(fen: string, move: string, score: number, depth: number): string {
	const score_str = score > 90000 ? 'Mate' : score < -90000 ? '-Mate' : (score / 100).toFixed(2);
	return [
		'You are a chess coach. Analyze a position for a student who is learning chess.',
		'',
		`Position (FEN): ${fen}`,
		`Stockfish suggests: ${move}`,
		`Evaluation: ${score_str}`,
		`Depth searched: ${depth}`,
		'',
		'Explain in 3-4 paragraphs:',
		'1. What this move accomplishes and why the engine likes it',
		'2. The strategic or tactical idea behind it (development, attack, defense, positional play, etc.)',
		'3. Potential upsides and any downsides or risks',
		'4. What plan or follow-up moves this sets up',
		'',
		'Keep the analysis educational and helpful for a learner. Avoid overly complex variations.',
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
