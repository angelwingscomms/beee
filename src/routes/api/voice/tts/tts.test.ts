import { readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';

const route = readFileSync(resolve(dirname(fileURLToPath(import.meta.url)), '+server.ts'), 'utf8');

describe('/api/voice/tts route', () => {
	it('calls Azure TTS REST API', () => {
		expect(route).toContain('tts.speech.microsoft.com/cognitiveservices/v1');
		expect(route).toContain('AZURE_SPEECH_KEY');
		expect(route).toContain('AZURE_SPEECH_REGION');
	});

	it('sends SSML with en-US-AriaNeural voice', () => {
		expect(route).toContain('en-US-AriaNeural');
		expect(route).toContain('application/ssml+xml');
	});

	it('returns audio/mpeg stream', () => {
		expect(route).toContain('audio/mpeg');
		expect(route).toContain('audio-24khz-48kbitrate-mono-mp3');
	});

	it('handles missing config and text', () => {
		expect(route).toContain('Missing AZURE_SPEECH_KEY');
		expect(route).toContain('Missing text');
	});
});
