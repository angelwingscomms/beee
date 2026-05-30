<script lang="ts">
	import { Chess } from 'svelte-chess';
	import { Chess as ChessJS } from 'chess.js';
	import { marked } from 'marked';
	import { browser } from '$app/environment';
	import { LearnEngine, DIFFICULTY_PRESETS, getHints } from '$lib/util/chess/engine';
	import type { Color, Hint } from '$lib/util/chess/engine';

	let level = $state(3);
	let turn = $state<Color>('w');
	let moveNum = $state(0);
	let fen = $state('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1');
	let inCheck = $state(false);
	let gameOver = $state(false);
	let resultMsg = $state('');
	let ready = $state(false);
	let chessRef = $state<Chess | null>(null);

	let show_hints = $state(false);
	let hints = $state<Hint[]>([]);
	let hint_index = $state(0);
	let hint_loading = $state(false);

	let analysis_text = $state('');
	let analysis_loading = $state(false);
	let analysis_abort = $state<AbortController | null>(null);

	let model = $state(browser && localStorage.getItem('explain_model') || 'gemini-3.5-flash');
	let show_settings = $state(false);
	$effect(() => { if (browser) localStorage.setItem('explain_model', model); });

	const presets = DIFFICULTY_PRESETS;
	const labels = ['Bgnr', 'Nov', 'Cas', 'Int', 'Int+', 'Adv', 'Str', 'Exp', 'Mst', 'GM'];

	function buildEngine() {
		const p = presets[level - 1];
		return new LearnEngine({ elo: p.elo, depth: p.depth, moveTime: p.moveTime, color: 'b' });
	}

	let engine = $derived.by(() => buildEngine());

	function uciToSan(fen: string, uci: string): string {
		try {
			const c = new ChessJS(fen);
			const m = c.move(uci);
			if (!m) return uci;
			const sym: Record<string, string> = { k: '♔', q: '♕', r: '♖', b: '♗', n: '♘', p: '♙' };
			return (sym[m.piece] || '') + m.san;
		} catch {
			return uci;
		}
	}

	function fmtScore(s: number): string {
		if (s >= 100000) return 'Mate';
		if (s <= -100000) return '-Mate';
		const v = (s / 100).toFixed(2);
		return s > 0 ? '+' + v : v;
	}

	function onReady() { ready = true; }

	function onMove(e: CustomEvent<{ color: Color }>) {
		const m = e.detail;
		turn = m.color === 'w' ? 'b' : 'w';
		moveNum++;
		inCheck = (e.detail as any).check ?? false;
		if (show_hints) hideHints();
	}

	function onGameOver(e: CustomEvent<{ reason: string; result: number }>) {
		gameOver = true;
		const { reason, result } = e.detail;
		if (result === 1) resultMsg = 'White wins!';
		else if (result === 0) resultMsg = 'Black wins!';
		else resultMsg = `Draw (${reason})`;
	}

	function resetGame() {
		if (!chessRef) return;
		chessRef.reset();
		resultMsg = '';
		gameOver = false;
		moveNum = 0;
		turn = 'w';
		inCheck = false;
		hideHints();
	}

	function undoMove() {
		if (!chessRef) return;
		if (moveNum >= 2) {
			chessRef.undo();
			chessRef.undo();
			moveNum = Math.max(0, moveNum - 2);
		} else if (moveNum === 1) {
			chessRef.undo();
			moveNum = 0;
			turn = 'w';
		}
		gameOver = false;
		resultMsg = '';
	}

	async function showHint() {
		if (hint_loading) return;
		if (gameOver) return;
		hint_loading = true;
		show_hints = true;
		try {
			hints = await getHints(fen, 5);
			hint_index = 0;
		} catch (e) {
			console.error('getHints failed:', e);
			hints = [];
		} finally {
			hint_loading = false;
		}
	}

	function nextHint() {
		if (hint_index < hints.length - 1) hint_index++;
	}

	function prevHint() {
		if (hint_index > 0) hint_index--;
	}

	function hideHints() {
		show_hints = false;
		hints = [];
		hint_index = 0;
		dismissAnalysis();
	}

	async function explainHint() {
		if (analysis_loading) return;
		if (!hints[hint_index]) return;
		analysis_loading = true;
		analysis_text = '';
		const ac = new AbortController();
		analysis_abort = ac;
		try {
			const h = hints[hint_index];
			const res = await fetch('/chess/learn/explain', {
				method: 'POST',
				body: JSON.stringify({ fen, move: h.move, score: h.score, depth: h.depth, m: model }),
				signal: ac.signal,
			});
			if (!res.ok || !res.body) throw Error('Request failed');
			const reader = res.body.getReader();
			const dec = new TextDecoder();
			while (true) {
				const { done, value } = await reader.read();
				if (done) break;
				analysis_text += dec.decode(value, { stream: true });
			}
		} catch (e) {
			if (e instanceof DOMException && e.name === 'AbortError') return;
			analysis_text += '\n[Failed to load analysis]';
		} finally {
			analysis_loading = false;
			analysis_abort = null;
		}
	}

	function stopAnalysis() {
		if (analysis_abort) {
			analysis_abort.abort();
			analysis_abort = null;
			analysis_loading = false;
		}
	}

	function dismissAnalysis() {
		analysis_text = '';
		analysis_loading = false;
		if (analysis_abort) {
			analysis_abort.abort();
			analysis_abort = null;
		}
	}
</script>

<main class="page-shell">
	<div class="container" style="padding-block:var(--xxl)48px">
		<div class="flex flex-col items-center gap-6 max-w-[640px] mx-auto">
			<h1 class="display-sm" style="margin:0">Chess — Learn</h1>
			<p class="text-muted text-sm" style="margin:0">Play against Stockfish. Adjust difficulty to match your level.</p>

			<div class="w-full">
			{#key level}
				<Chess
					class="cg-default-style board-themed"
					bind:this={chessRef}
					bind:fen
					engine={engine as any}
					bind:turn
					bind:moveNumber={moveNum}
					bind:inCheck
					bind:isGameOver={gameOver}
					on:ready={onReady}
					on:move={onMove}
					on:gameOver={onGameOver}
				/>
			{/key}
			</div>

			<div class="w-full rounded-xl bg-surface-card p-6 space-y-4">
				<div class="flex items-center gap-3">
					<span class="text-sm font-medium text-muted w-20">Difficulty</span>
					<input
						type="range"
						min="1"
						max="10"
						bind:value={level}
						class="flex-1 accent-primary"
					/>
					<span class="text-sm font-medium text-ink w-20 text-right">{labels[level - 1]}</span>
				</div>

				<div class="flex items-center gap-3 text-sm text-muted justify-between">
					<span>Easy</span>
					<span class="text-xs">
						Elo: {presets[level - 1].elo ?? '∞'} · Depth: {presets[level - 1].depth} · Time: {presets[level - 1].moveTime}ms
					</span>
					<span>Hard</span>
				</div>

				<hr class="border-hairline" />

				<div class="flex items-center gap-4 text-sm">
					<span class="text-muted">Turn:</span>
					<span class="font-medium text-ink">{turn === 'w' ? 'White' : 'Black'}</span>
					<span class="text-muted">Move:</span>
					<span class="font-medium text-ink">{moveNum}</span>
					{#if inCheck}
						<span class="text-error font-medium">Check!</span>
					{/if}
					{#if gameOver}
						<span class="font-medium text-primary">{resultMsg}</span>
					{/if}
					{#if !ready}
						<span class="text-amber font-medium animate-pulse">Loading engine...</span>
					{/if}
				</div>

				<div class="flex gap-2">
					<button class="button-primary" onclick={resetGame} disabled={!ready}>
						New Game
					</button>
					<button class="button-secondary" onclick={undoMove} disabled={!ready || moveNum === 0 || gameOver}>
						Undo
					</button>
				</div>

				<div class="flex gap-2">
					{#if show_hints}
						<button class="button-secondary" onclick={hideHints}>
							Hide Hints
						</button>
						<button class="button-secondary-dark" onclick={prevHint} disabled={hint_index === 0 || hint_loading}>
							&lt; Prev
						</button>
						<button class="button-secondary-dark" onclick={nextHint} disabled={hint_loading || hint_index >= hints.length - 1}>
							Next >
						</button>
						{#if hint_loading}
							<span class="text-xs text-amber animate-pulse self-center">Analyzing...</span>
						{:else if hints.length > 0}
							<span class="text-sm font-mono text-ink self-center whitespace-nowrap">
								{uciToSan(fen, hints[hint_index].move)}
								<span class="text-xs text-muted font-sans ml-1.5">
									{fmtScore(hints[hint_index].score)} d{hints[hint_index].depth} [{hint_index + 1}/{hints.length}]
								</span>
							</span>
							<button class="button-secondary-dark" onclick={explainHint} disabled={analysis_loading}>
								{analysis_loading ? 'Thinking...' : 'Explain Hint'}
							</button>
						{/if}
					{:else}
						<button class="button-primary" onclick={showHint} disabled={!ready || gameOver || hint_loading}>
							{hint_loading ? 'Thinking...' : 'Hint'}
						</button>
					{/if}
				</div>

				{#if analysis_loading || analysis_text}
					<div class="w-full rounded-xl bg-surface-card border border-hairline p-4 space-y-2">
						<div class="flex items-center justify-between">
							<span class="text-sm font-medium text-ink">Analysis</span>
							{#if analysis_loading}
								<button class="text-xs text-error" onclick={stopAnalysis}>Stop</button>
							{:else}
								<button class="text-xs text-muted" onclick={dismissAnalysis}>Dismiss</button>
							{/if}
						</div>
						<div class="text-sm text-muted max-h-60 overflow-y-auto space-y-2 analysis-body">
							{@html marked.parse(analysis_text)}
							{#if analysis_loading}<span class="animate-pulse">▊</span>{/if}
						</div>
					</div>
				{/if}

				<button class="button-secondary text-xs ml-auto" onclick={() => show_settings = true}>
					Settings
				</button>
			</div>
		</div>
	</div>
</main>

{#if show_settings}
	<div class="modal-backdrop" role="presentation" onkeydown={(e) => e.key === 'Escape' && (show_settings = false)} onclick={() => show_settings = false}>
		<div class="modal-card max-w-sm" role="dialog" aria-modal="true" tabindex="-1" onkeydown={(e) => e.key === 'Escape' && (show_settings = false)} onclick={(e) => e.stopPropagation()}>
			<div class="modal-header">
				<h2 id="settings-title" class="text-sm font-medium text-ink">Settings</h2>
				<p>Analysis preferences</p>
			</div>
			<div class="modal-body">
				<section class="modal-section">
					<h3 class="field-label">Analysis Model</h3>
					<select bind:value={model} class="w-full min-h-[40px] rounded-lg border border-hairline bg-canvas text-ink px-3.5 py-2.5 text-sm outline-none transition-[border-color,box-shadow] duration-150 ease-in-out focus:border-primary focus:shadow-[0_0_0_3px_rgba(204,120,92,0.15)] appearance-none">
						<option value="gemini-3.5-flash">Gemini 3.5 Flash</option>
						<option value="gemma-4-26b-a4b-it">Gemma 4 (26B)</option>
					</select>
				</section>
			</div>
			<div class="modal-actions">
				<button class="button-secondary" onclick={() => show_settings = false}>Cancel</button>
				<button class="button-primary" onclick={() => show_settings = false}>Done</button>
			</div>
		</div>
	</div>
{/if}
