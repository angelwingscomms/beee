import { json } from '@sveltejs/kit';
import type { RequestHandler } from '@sveltejs/kit';
import { GEMINI } from '$env/static/private';
import { GoogleGenAI, ThinkingLevel } from '@google/genai';

function build_prompt(fen: string, move: string, score: number, depth: number): string {
	const score_str = score > 90000 ? 'Mate' : score < -90000 ? '-Mate' : (score / 100).toFixed(2);
	return [
		'Output exactly 3 bullet points analyzing why Stockfish recommends this move. No paragraphs, no intro, no conclusion — just 3 bullets. Max 4 lines total.',
		'',
		`FEN: ${fen}  Move: ${move}  Eval: ${score_str}  Depth: ${depth}`,
		'',
		'Each bullet covers ONE of these (in order):',
		'• **What** — concrete point of the move (attack, defend, develop, gain space, threaten, improve piece)',
		'• **Why** — named pattern or principle (fork, pin, outpost, prophylaxis, pawn break, center control, king safety, etc.)',
		'• **Next** — what to watch for or opponent counterplay',
		'',
		'Rules: No filler words. Use **bold** for key terms. Assume the student knows basics but wants advanced insight.',
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
