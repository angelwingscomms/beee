import { readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';

const page = readFileSync(resolve(dirname(fileURLToPath(import.meta.url)), '+page.svelte'), 'utf8');

describe('/chess/learn hint highlights', () => {
	it('wires a visible board overlay to the current hint squares', () => {
		expect(page).toContain('hint_squares(');
		expect(page).toContain('data-testid={square.k === \'f\' ? \'hint-square-from\' : \'hint-square-to\'}');
		expect(page).toContain('aria-label={`Hint ${square.l} square ${square.s}`}');
		expect(page).toContain('const hint_nudge_x = \'-translate-x-1\'');
		expect(page).toContain('const hint_nudge_y = \'-translate-y-1\'');
		expect(page).toContain('bg-amber/45 border-amber ring-ink/25');
		expect(page).toContain('bg-teal/45 border-teal ring-ink/25');
		expect(page).toContain('can_reuse_hints(hints, hint_fen, fen)');
		expect(page).toContain('onclick={() => hideHints()}');
		expect(page).toContain('hideHints(true)');
		expect(page).toContain('hint_fen = fen;');
	});
});

describe('/chess/learn chat', () => {
	it('uses side by side desktop layout without widening the board or controls', () => {
		expect(page).toContain('max-w-[1328px]');
		expect(page).toContain('lg:grid-cols-[minmax(0,640px)_minmax(0,640px)]');
		expect(page).toContain('lg:items-start');
		expect(page).toContain('max-w-[640px]');
	});

	it('replaces analysis panel with chat interface', () => {
		expect(page).toContain('chat_messages');
		expect(page).toContain('chat_loading');
		expect(page).toContain('chat_abort');
		expect(page).toContain('sendChatMessage');
		expect(page).toContain('stopChat');
		expect(page).toContain('clearChat');
		expect(page).toContain('/chess/learn/chat');
		expect(page).toContain('Chat');
		expect(page).toContain('Ask about the position');
	});

	it('keeps board context hidden while sending interaction state', () => {
		expect(page).toContain('interaction_id');
		expect(page).toContain('successful_context');
		expect(page).toContain('build_chat_data(');
		expect(page).toContain('apply_chat_event(');
		expect(page).toContain('bind:history');
		expect(page).toContain('i: interaction_id');
		expect(page).toContain('d: build_chat_data(');
		expect(page).toContain('interaction_id = msg.i');
		expect(page).toContain('msg.content');
		expect(page).not.toContain('{msg.d');
	});
});
