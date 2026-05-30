import { json } from '@sveltejs/kit';
import type { RequestHandler } from '@sveltejs/kit';
import { GEMINI } from '$env/static/private';
import { GoogleGenAI, ThinkingLevel } from '@google/genai';

function build_prompt(fen: string, move: string, score: number, depth: number): string {
	const score_str = score > 90000 ? 'Mate' : score < -90000 ? '-Mate' : (score / 100).toFixed(2);
	return [
		'You are a chess coach analyzing a position for a student. Make your explanation easy to understand while still covering real chess concepts — openings, tactics, strategy, pawn structures, piece play, and endgame ideas when relevant.',
		'',
		`Position (FEN): ${fen}`,
		`Stockfish recommends: ${move}`,
		`Evaluation: ${score_str}`,
		`Depth searched: ${depth}`,
		'',
		'Write 3-4 paragraphs. Use **bold** for key ideas. Cover:',
		'1. **What the move does** — the concrete point: does it attack, defend, develop, gain space, threaten something, or improve piece position?',
		'2. **The strategic or tactical idea** — name the pattern when relevant (fork, pin, discovered attack, prophylaxis, outpost, pawn break, etc.). Connect it to broader principles like center control, king safety, piece activity, development, or pawn structure.',
		'3. **Pros and risks** — what the move achieves and what the opponent might counter with.',
		'4. **Follow-up plan** — what comes next, what the player should be thinking about.',
		'',
		'Keep it clear and instructive. Explain jargon briefly when you use it. Focus on teaching the student to think about positions, not just memorize moves.',
	].join('\n');
}

export const POST: RequestHandler = async ({ request }) => {
	const body = await request.json().catch(() => null);
	if (!body || !body.fen || !body.move) {
		return json({ error: 'Missing fen or move' }, { status: 400 });
	}

	const { fen, move, score = 0, depth = 0, m } = body;

	const ai = new GoogleGenAI({ apiKey: GEMINI });

	const stream = new ReadableStream({
		async start(controller) {
			try {
				const response = await ai.models.generateContentStream({
					model: m || 'gemini-3.5-flash',
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
