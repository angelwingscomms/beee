import { readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';

const route = readFileSync(resolve(dirname(fileURLToPath(import.meta.url)), '+server.ts'), 'utf8');

describe('/api/chat/groq route', () => {
	it('streams from Groq chat completions', () => {
		expect(route).toContain('api.groq.com/openai/v1/chat/completions');
		expect(route).toContain('GROQ_API_KEY');
		expect(route).toContain('stream: true');
	});

	it('uses SSE text events like existing chat', () => {
		expect(route).toContain("event('text'");
		expect(route).toContain("event('error'");
	});

	it('preserves chess board context in user messages', () => {
		expect(route).toContain('[board_context]');
		expect(route).toContain('fen:');
		expect(route).toContain('hint:');
	});

	it('validates input format', () => {
		expect(route).toContain('Missing messages');
		expect(route).toContain('body?.x');
	});

	it('uses the same coaching system prompt', () => {
		expect(route).toContain('concise chess coach');
	});
});
