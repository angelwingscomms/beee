<script lang="ts">
	import { Chess } from 'svelte-chess';
	import { LearnEngine, DIFFICULTY_PRESETS } from '$lib/util/chess/engine';
	import type { Color } from '$lib/util/chess/engine';

	let level = $state(3);
	let turn = $state<Color>('w');
	let moveNum = $state(0);
	let inCheck = $state(false);
	let gameOver = $state(false);
	let resultMsg = $state('');
	let ready = $state(false);
	let chessRef = $state<Chess | null>(null);

	const presets = DIFFICULTY_PRESETS;
	const labels = ['Bgnr', 'Nov', 'Cas', 'Int', 'Int+', 'Adv', 'Str', 'Exp', 'Mst', 'GM'];

	function buildEngine() {
		const p = presets[level - 1];
		return new LearnEngine({ elo: p.elo, depth: p.depth, moveTime: p.moveTime, color: 'b' });
	}

	let engine = $derived.by(() => buildEngine());

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
			</div>
		</div>
	</div>
</main>
