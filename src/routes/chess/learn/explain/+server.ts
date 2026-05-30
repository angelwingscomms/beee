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
		'Write a short analysis. 2-3 **concise bullet points**. Each bullet is one dense insight — no fluff, no filler paragraphs:',
		'• **Concrete point** — what does the move actually do? (attack, defend, develop, gain space, threaten, improve piece).',
		'• **Core concept** — name the pattern or principle (fork, pin, outpost, prophylaxis, pawn break, center control, king safety, etc.). Connect it to bigger strategic ideas.',
		'• **Follow-up** — what to watch for next or what the opponent might try.',
		'',
		'Maximum 4 lines total. Be brief but deep. Assume the student knows basic rules but wants to think like an advanced player. Use **bold** for key terms.',
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
