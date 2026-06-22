import { readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';

const route = readFileSync(resolve(dirname(fileURLToPath(import.meta.url)), '+server.ts'), 'utf8');

describe('/api/voice/stt route', () => {
	it('forwards audio to Groq Whisper', () => {
		expect(route).toContain('api.groq.com/openai/v1/audio/transcriptions');
		expect(route).toContain('whisper-large-v3-turbo');
		expect(route).toContain('GROQ_API_KEY');
	});

	it('accepts multipart form with audio field', () => {
		expect(route).toContain('form?.get');
		expect(route).toContain("'audio'");
	});

	it('returns transcribed text as { t: string }', () => {
		expect(route).toContain('as any)?.text');
		expect(route).toContain('json({ t:');
	});

	it('handles missing key or audio with errors', () => {
		expect(route).toContain('Missing GROQ_API_KEY');
		expect(route).toContain('Missing audio');
	});
});
