<script lang="ts">
	import { Chess } from 'svelte-chess';
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

	const presets = DIFFICULTY_PRESETS;
	const labels = ['Bgnr', 'Nov', 'Cas', 'Int', 'Int+', 'Adv', 'Str', 'Exp', 'Mst', 'GM'];

	function buildEngine() {
		const p = presets[level - 1];
		return new LearnEngine({ elo: p.elo, depth: p.depth, moveTime: p.moveTime, color: 'b' });
	}

	let engine = $derived.by(() => buildEngine());

	function fmtHintMove(m: string): string {
		return m.slice(0, 2) + '\u2192' + m.slice(2, 4);
	}

	function fmtScore(s: number): string {
		if (s >= 100000) return 'Mate';
		if (s <= -100000) return '-Mate';
		return (s / 100).toFixed(2);
	}

	function onReady() { ready = true; }

	function onMove(e: CustomEvent<{ color: Color }>) {
		const m = e.detail;
		turn = m.color === 'w' ? 'b' : 'w';
		moveNum++;
		inCheck = (e.detail as any).check ?? false;
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
							<span class="text-xs text-amber animate-pulse self-center ml-auto">Analyzing...</span>
						{:else if hints.length > 0}
							<span class="text-sm font-mono text-ink self-center ml-auto">
								{fmtHintMove(hints[hint_index].move)}
							</span>
							<span class="text-xs text-muted self-center whitespace-nowrap">
								Hint {hint_index + 1}/{hints.length}
								· {fmtScore(hints[hint_index].score)}
								· d{hints[hint_index].depth}
							</span>
						{/if}
					{:else}
						<button class="button-primary" onclick={showHint} disabled={!ready || gameOver || hint_loading}>
							{hint_loading ? 'Thinking...' : 'Hint'}
						</button>
					{/if}
				</div>
			</div>
		</div>
	</div>
</main>
