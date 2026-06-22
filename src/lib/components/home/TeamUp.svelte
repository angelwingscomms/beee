<script lang="ts">
	import { motionFadeUp } from '$lib/actions/motion';
	import { observe } from '$lib/actions/observe';
	import { fly } from 'svelte/transition';

	let hovered = $state<number | null>(null);

	const pillars = [
		{ label: 'Technology', desc: 'Problem Solving • Digital Literacy • Innovation Mindset' },
		{ label: 'Enterprise', desc: 'Financial Literacy • Entrepreneurship • Business Skills' },
		{ label: 'Art', desc: 'Creative Expression • Visual Arts • Design Thinking' },
		{ label: 'Mentorship', desc: 'Guided Growth • Role Models • Professional Coaching' },
		{ label: 'Upskill', desc: 'Practical Mastery • Workshops • Certifications' },
	];

	const colors = [
		'var(--primary)',
		'var(--accent-amber)',
		'var(--accent-teal)',
		'var(--primary)',
		'var(--accent-teal)',
	];

	const ptPcts: [number, number][] = [
		[50, 15],
		[83, 39],
		[71, 78],
		[29, 78],
		[17, 39],
	];

	/* SVG viewBox coords for pentagon edges (420x420 box) */
	const pts = ptPcts.map(([px, py]) => ({
		x: (px / 100) * 420,
		y: (py / 100) * 420,
	}));
</script>

<section class="section-band section-dark teamp-section" id="teamp">
	<div class="bg-orbs" aria-hidden="true">
		<div class="orb orb-1"></div>
		<div class="orb orb-2"></div>
		<div class="orb orb-3"></div>
		<div class="orb orb-4"></div>
	</div>
	<div class="orbital-ring" aria-hidden="true"></div>

	<div class="container" use:motionFadeUp>
		<div class="eyebrow-wrap" use:observe>
			<span class="eyebrow-badge">Developmental Framework</span>
		</div>

		<h2 class="display-lg section-title" use:observe>
			The T.E.A.M.U.P. Experience
		</h2>
		<p class="section-sub" use:observe>
			Five pillars. One integrated developmental journey. Every child grows across every dimension.
		</p>

		<div class="pentagon-wrap" use:observe>
			<div class="pentagon" data-hovered={hovered}>
				{#each pillars as p, i}
					<button
						class="pent-point"
						style="--pc: {colors[i]}"
						onmouseenter={() => hovered = i}
						onfocus={() => hovered = i}
						onmouseleave={() => hovered = null}
						onblur={() => hovered = null}
						aria-label={p.label}
					>
						<span class="point-dot"></span>
						<span class="point-label">{p.label}</span>
					</button>
				{/each}
				<svg class="pent-lines" viewBox="0 0 420 420" aria-hidden="true">
					{#each [0, 1, 2, 3, 4] as ei}
						<line
							class="edge edge-{ei}"
							x1={pts[ei].x}
							y1={pts[ei].y}
							x2={pts[(ei + 1) % 5].x}
							y2={pts[(ei + 1) % 5].y}
						/>
					{/each}
				</svg>
			</div>
		</div>

		<div class="mobile-list" use:observe>
			{#each pillars as p, i}
				<button
					class="mobile-item"
					style="--pc: {colors[i]}"
					onmouseenter={() => hovered = i}
					onfocus={() => hovered = i}
					onmouseleave={() => hovered = null}
					onblur={() => hovered = null}
				>
					<span class="mobile-dot" style="background: {colors[i]}"></span>
					<span class="mobile-name">{p.label}</span>
				</button>
			{/each}
		</div>

		<div
			class="desc-shell"
			class:has-hint={hovered !== null}
			style={hovered !== null ? `--hint-c: ${colors[hovered]}` : ''}
			use:observe
		>
			<div class="desc-panel">
				{#key hovered}
					<div class="panel-content">
						{#if hovered !== null}
							<p class="desc-label" in:fly={{ y: 6, duration: 300 }}>{pillars[hovered].label}</p>
							<p class="desc-body" in:fly={{ y: 6, duration: 300, delay: 40 }}>{pillars[hovered].desc}</p>
						{:else}
							<p class="desc-body placeholder-text" in:fly={{ y: 6, duration: 300 }}>Hover a pillar to explore</p>
						{/if}
					</div>
				{/key}
			</div>
		</div>
	</div>
</section>

<style>
	/* ── Section background orbs ── */
	.teamp-section {
		position: relative;
		overflow: hidden;
	}

	.bg-orbs {
		position: absolute;
		inset: 0;
		pointer-events: none;
		z-index: 0;
	}

	.orb {
		position: absolute;
		border-radius: 50%;
		filter: blur(80px);
		will-change: transform;
	}

	.orb-1 {
		width: 420px;
		height: 420px;
		top: -12%;
		right: -6%;
		background: radial-gradient(circle, rgba(242, 120, 48, 0.14), transparent 70%);
		animation: orb-float 20s ease-in-out infinite;
	}

	.orb-2 {
		width: 320px;
		height: 320px;
		bottom: 8%;
		left: -10%;
		background: radial-gradient(circle, rgba(93, 184, 166, 0.10), transparent 70%);
		animation: orb-float 25s ease-in-out infinite reverse;
	}

	.orb-3 {
		width: 360px;
		height: 360px;
		bottom: -6%;
		right: 18%;
		background: radial-gradient(circle, rgba(255, 178, 0, 0.08), transparent 70%);
		animation: orb-float 18s ease-in-out infinite 5s;
	}

	.orb-4 {
		width: 240px;
		height: 240px;
		top: 20%;
		left: 6%;
		background: radial-gradient(circle, rgba(242, 120, 48, 0.06), transparent 70%);
		animation: orb-float 22s ease-in-out infinite -8s;
	}

	@keyframes orb-float {
		0%, 100% { translate: 0 0; }
		33% { translate: 24px -34px; }
		66% { translate: -18px 24px; }
	}

	/* ── Orbital ring ── */
	.orbital-ring {
		position: absolute;
		width: 560px;
		height: 560px;
		top: 50%;
		left: 50%;
		translate: -50% -50%;
		border: 1px solid rgba(255, 255, 255, 0.03);
		border-radius: 50%;
		pointer-events: none;
		z-index: 0;
		animation: orbit-spin 50s linear infinite;
	}

	.orbital-ring::before {
		content: '';
		position: absolute;
		top: -3px;
		left: 50%;
		width: 6px;
		height: 6px;
		margin-left: -3px;
		border-radius: 50%;
		background: var(--primary);
		opacity: 0.25;
		box-shadow: 0 0 14px var(--primary);
	}

	@keyframes orbit-spin {
		to { rotate: 360deg; }
	}

	/* ── Eyebrow badge ── */
	.eyebrow-wrap {
		display: flex;
		justify-content: center;
		margin-bottom: 20px;
	}
	.eyebrow-wrap:not(.in-view) {
		opacity: 0;
		translate: 0 16px;
	}
	.eyebrow-wrap {
		transition: opacity 0.8s cubic-bezier(0.32, 0.72, 0, 1),
			translate 0.8s cubic-bezier(0.32, 0.72, 0, 1);
	}

	.eyebrow-badge {
		display: inline-flex;
		padding: 6px 16px;
		border-radius: 999px;
		background: rgba(255, 255, 255, 0.06);
		border: 1px solid rgba(255, 255, 255, 0.10);
		color: var(--on-dark-soft);
		font-size: 11px;
		font-weight: 500;
		letter-spacing: 0.15em;
		text-transform: uppercase;
		backdrop-filter: blur(12px);
	}

	/* ── Section header ── */
	.section-title {
		color: var(--on-dark) !important;
		text-align: center;
		margin: 0 0 16px;
	}
	.section-title:not(.in-view) {
		opacity: 0;
		translate: 0 20px;
	}
	.section-title {
		transition: opacity 0.8s cubic-bezier(0.32, 0.72, 0, 1) 0.1s,
			translate 0.8s cubic-bezier(0.32, 0.72, 0, 1) 0.1s;
	}

	.section-sub {
		color: var(--on-dark-soft);
		text-align: center;
		max-width: 560px;
		margin: 0 auto 56px;
		font-size: 17px;
		line-height: 1.55;
	}
	.section-sub:not(.in-view) {
		opacity: 0;
		translate: 0 20px;
	}
	.section-sub {
		transition: opacity 0.8s cubic-bezier(0.32, 0.72, 0, 1) 0.2s,
			translate 0.8s cubic-bezier(0.32, 0.72, 0, 1) 0.2s;
	}

	/* ── Pentagon ── */
	.pentagon-wrap {
		display: flex;
		justify-content: center;
		margin-bottom: 48px;
	}
	.pentagon-wrap:not(.in-view) {
		opacity: 0;
		translate: 0 24px;
	}
	.pentagon-wrap {
		transition: opacity 0.8s cubic-bezier(0.32, 0.72, 0, 1) 0.3s,
			translate 0.8s cubic-bezier(0.32, 0.72, 0, 1) 0.3s;
	}

	.pentagon {
		position: relative;
		width: 100%;
		max-width: 420px;
		aspect-ratio: 1;
	}

	.pentagon::before {
		content: '';
		position: absolute;
		inset: 9%;
		border: 1px solid color-mix(in srgb, var(--on-dark) 10%, transparent);
		clip-path: polygon(50% 0, 100% 38%, 81% 100%, 19% 100%, 0 38%);
		pointer-events: none;
	}

	.pentagon::after {
		content: '';
		position: absolute;
		inset: 9%;
		background: radial-gradient(circle at 50% 50%, rgba(255,255,255,0.03), transparent 70%);
		clip-path: polygon(50% 0, 100% 38%, 81% 100%, 19% 100%, 0 38%);
		pointer-events: none;
	}

	/* ── SVG connecting lines ── */
	.pent-lines {
		position: absolute;
		inset: 9%;
		width: 82%;
		height: 82%;
		pointer-events: none;
		z-index: 0;
	}

	.edge {
		stroke: var(--on-dark);
		stroke-width: 1;
		stroke-opacity: 0.06;
		transition: stroke-opacity 0.5s ease;
	}

	.pentagon[data-hovered] .edge {
		stroke-opacity: 0.2;
	}

	/* ── Pentagon points ── */
	.pent-point {
		position: absolute;
		width: 60px;
		height: 60px;
		border-radius: 50%;
		border: 2px solid var(--pc);
		background: rgba(255, 255, 255, 0.04);
		transform: translate(-50%, -50%);
		cursor: pointer;
		backdrop-filter: blur(8px);
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 1;
		transition:
			box-shadow 0.6s cubic-bezier(0.32, 0.72, 0, 1),
			transform 0.6s cubic-bezier(0.32, 0.72, 0, 1),
			background 0.4s cubic-bezier(0.32, 0.72, 0, 1);
	}

	.pent-point::after {
		content: '';
		position: absolute;
		inset: 4px;
		border-radius: inherit;
		background: radial-gradient(circle at 30% 30%, rgba(255,255,255,0.1), transparent);
		pointer-events: none;
	}

	.pent-point:focus-visible {
		outline: 2px solid var(--on-dark);
		outline-offset: 4px;
	}

	.pent-point:hover {
		box-shadow:
			0 0 20px var(--pc),
			0 0 40px color-mix(in srgb, var(--pc) 40%, transparent);
		transform: translate(-50%, -50%) scale(1.15);
		background: color-mix(in srgb, var(--pc) 15%, transparent);
	}

	.pent-point:nth-child(4) {
		filter: hue-rotate(250deg) saturate(0.75) brightness(1.25);
	}

	.pent-point:nth-child(5) {
		box-shadow: 0 0 10px var(--pc), 0 0 30px color-mix(in srgb, var(--pc) 40%, transparent);
	}
	.pent-point:nth-child(5):hover {
		box-shadow: 0 0 25px var(--pc), 0 0 50px color-mix(in srgb, var(--pc) 50%, transparent);
	}

	.point-dot {
		width: 10px;
		height: 10px;
		border-radius: 50%;
		background: var(--pc);
		box-shadow: 0 0 12px var(--pc);
		transition: transform 0.4s cubic-bezier(0.32, 0.72, 0, 1);
	}
	.pent-point:hover .point-dot {
		transform: scale(1.4);
	}

	.point-label {
		position: absolute;
		white-space: nowrap;
		font-size: 13px;
		font-weight: 600;
		color: var(--on-dark);
		letter-spacing: 0.04em;
		top: calc(100% + 12px);
		left: 50%;
		transform: translateX(-50%);
		opacity: 0.8;
		transition: opacity 0.3s cubic-bezier(0.32, 0.72, 0, 1);
	}
	.pent-point:hover .point-label {
		opacity: 1;
	}

	.pent-point:nth-child(3) .point-label,
	.pent-point:nth-child(4) .point-label {
		top: auto;
		bottom: calc(100% + 12px);
	}

	.pent-point:nth-child(1) { left: 50%; top: 15%; }
	.pent-point:nth-child(2) { left: 83%; top: 39%; }
	.pent-point:nth-child(3) { left: 71%; top: 78%; }
	.pent-point:nth-child(4) { left: 29%; top: 78%; }
	.pent-point:nth-child(5) { left: 17%; top: 39%; }

	/* ── Mobile list ── */
	.mobile-list {
		display: none;
	}
	.mobile-list:not(.in-view) {
		opacity: 0;
		translate: 0 20px;
	}
	.mobile-list {
		transition: opacity 0.8s cubic-bezier(0.32, 0.72, 0, 1) 0.3s,
			translate 0.8s cubic-bezier(0.32, 0.72, 0, 1) 0.3s;
	}

	/* ── Description panel (double-bezel) ── */
	.desc-shell {
		max-width: 480px;
		margin: 0 auto;
		padding: 1.5px;
		border-radius: calc(12px + 1.5px);
		background: linear-gradient(135deg, rgba(255,255,255,0.08), rgba(255,255,255,0.02));
		transition: background 0.5s ease;
	}
	.desc-shell:not(.in-view) {
		opacity: 0;
		translate: 0 24px;
	}
	.desc-shell {
		transition: opacity 0.8s cubic-bezier(0.32, 0.72, 0, 1) 0.4s,
			translate 0.8s cubic-bezier(0.32, 0.72, 0, 1) 0.4s;
	}

	.desc-shell.has-hint {
		background: linear-gradient(135deg,
			color-mix(in srgb, var(--hint-c, rgba(255,255,255,0.08)) 25%, transparent),
			rgba(255,255,255,0.03)
		);
	}

	.desc-panel {
		text-align: center;
		padding: 28px 24px;
		background: var(--surface-dark-elevated);
		border-radius: 12px;
		min-height: 100px;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		box-shadow: inset 0 1px 1px rgba(255,255,255,0.06);
		transition: box-shadow 0.4s cubic-bezier(0.32, 0.72, 0, 1);
	}
	.desc-panel:hover {
		box-shadow: inset 0 1px 2px rgba(255,255,255,0.1);
	}

	.desc-label {
		font-family: var(--font-display);
		font-size: 22px;
		font-weight: 500;
		color: var(--on-dark);
		margin: 0 0 6px;
	}

	.desc-body {
		font-size: 16px;
		line-height: 1.55;
		color: var(--on-dark-soft);
		margin: 0;
	}

	@media (max-width: 640px) {
		.pentagon-wrap {
			display: none;
		}

		.mobile-list {
			display: flex;
			flex-direction: column;
			gap: 10px;
			margin-bottom: 24px;
		}

		.mobile-item {
			display: flex;
			align-items: center;
			gap: 14px;
			padding: 14px 18px;
			background: var(--surface-dark-elevated);
			border-radius: 10px;
			border: 1px solid color-mix(in srgb, var(--on-dark) 6%, transparent);
			color: var(--on-dark);
			cursor: pointer;
			text-align: left;
			width: 100%;
			font-size: 15px;
			font-weight: 500;
			transition:
				background 0.3s cubic-bezier(0.32, 0.72, 0, 1),
				border-color 0.3s cubic-bezier(0.32, 0.72, 0, 1);
		}

		.mobile-item:hover,
		.mobile-item:focus-visible {
			background: color-mix(in srgb, var(--on-dark) 7%, transparent);
			border-color: color-mix(in srgb, var(--on-dark) 15%, transparent);
		}

		.mobile-item:focus-visible {
			outline: 2px solid var(--on-dark-soft);
			outline-offset: 2px;
		}

		.mobile-dot {
			width: 12px;
			height: 12px;
			border-radius: 50%;
			flex-shrink: 0;
			box-shadow: 0 0 8px var(--pc);
		}

		.mobile-name {
			font-weight: 600;
		}
	}
</style>
