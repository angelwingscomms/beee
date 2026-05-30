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

describe('/chess/learn nav', () => {
	it('shows a home button via FloatingNav', () => {
		expect(page).toContain('FloatingNav');
		expect(page).toContain('href="/"');
		expect(page).toContain('home');
	});
});

describe('/chess/learn chat', () => {
	it('uses side by side desktop layout without widening the board or controls', () => {
		expect(page).toContain('max-w-[1328px]');
		expect(page).toContain('lg:grid-cols-[minmax(0,640px)_minmax(0,640px)]');
		expect(page).toContain('lg:items-start');
		expect(page).toContain('max-w-[640px]');
	});

	it('keeps desktop vertical chrome tight around the board', () => {
		expect(page).toContain('container py-4');
		expect(page).toContain('flex w-full max-w-[1328px] flex-col gap-4');
		expect(page).toContain('grid w-full grid-cols-1 gap-4');
		expect(page).not.toContain('container py-12');
		expect(page).not.toContain('flex w-full max-w-[1328px] flex-col gap-6');
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

describe('/chess/learn settings modal', () => {
	it('uses the warm product design system instead of the shared checkout modal shell', () => {
		expect(page).toContain('data-testid="learn-settings-modal"');
		expect(page).toContain('bg-canvas text-body shadow-[0_24px_80px_rgba(20,20,19,0.22)]');
		expect(page).toContain('font-display text-2xl font-medium text-ink');
		expect(page).toContain('bg-surface-card p-4');
		expect(page).toContain('rounded-lg border border-hairline bg-canvas');
		expect(page).not.toContain('modal-card max-w-sm');
	});

	it('moves difficulty into settings and uses compact icon controls above chat', () => {
		expect(page).toContain("import { Lightbulb, RotateCcw, Settings, Undo2 } from '@lucide/svelte';");
		expect(page).toContain('data-testid="learn-icon-toolbar"');
		expect(page).toContain('aria-label="New game"');
		expect(page).toContain('<RotateCcw');
		expect(page).toContain('aria-label="Undo move"');
		expect(page).toContain('<Undo2');
		expect(page).toContain('aria-label="Show hint"');
		expect(page).toContain('<Lightbulb');
		expect(page).toContain('aria-label="Settings"');
		expect(page).toContain('<Settings');
		expect(page).toContain('data-testid="settings-difficulty"');
		expect(page).not.toContain('<span class="text-muted">Move:</span>');
		expect(page).not.toContain('<button class="button-secondary text-xs ml-auto"');
	});

	it('uses a tiny coral round control for auto explain', () => {
		expect(page).toContain('sr-only');
		expect(page).toContain('rounded-full border border-primary');
		expect(page).toContain('bg-primary');
		expect(page).not.toContain('type="checkbox" bind:checked={autoexplain} class="h-4 w-4 accent-primary"');
	});

	it('can request hints automatically after load and after the computer moves', () => {
		expect(page).toContain("let auto_hint = $state(browser && localStorage.getItem('auto_hint') === 'true');");
		expect(page).toContain("let hint_on_start = $state(browser && localStorage.getItem('hint_on_start') === 'true');");
		expect(page).toContain("localStorage.setItem('auto_hint', String(auto_hint))");
		expect(page).toContain("localStorage.setItem('hint_on_start', String(hint_on_start))");
		expect(page).toContain('function request_hint()');
		expect(page).toContain('if (hint_on_start && !start_hint_done)');
		expect(page).toContain("if (m.color === 'b' && auto_hint) request_hint();");
		expect(page).toContain('Auto hint');
		expect(page).toContain('Hint on start');
	});
});
