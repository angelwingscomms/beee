<script lang="ts">
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
</script>

<section class="section-band section-dark">
	<div class="container">
		<h2 class="display-lg" style="color: var(--on-dark); text-align: center; margin-bottom: 16px">
			The T.E.A.M.U.P. Experience
		</h2>
		<p class="body-md" style="color: var(--on-dark-soft); text-align: center; max-width: 560px; margin: 0 auto 48px;">
			Five pillars. One integrated developmental journey. Every child grows across every dimension.
		</p>

		<!-- Desktop: pentagon -->
		<div class="pentagon-wrap">
			<div class="pentagon">
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
						<span class="point-label">{p.label}</span>
					</button>
				{/each}
			</div>
		</div>

		<!-- Mobile: vertical list -->
		<div class="mobile-list">
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

		<!-- Description panel -->
		<div class="desc-panel">
			{#if hovered !== null}
				<p class="desc-label">{pillars[hovered].label}</p>
				<p class="desc-body">{pillars[hovered].desc}</p>
			{:else}
				<p class="desc-body" style="opacity: 0.5">Hover a pillar to explore</p>
			{/if}
		</div>
	</div>
</section>

<style>
	.pentagon-wrap {
		display: flex;
		justify-content: center;
		margin-bottom: 48px;
	}

	.pentagon {
		position: relative;
		width: 100%;
		max-width: 420px;
		aspect-ratio: 1;
	}

	/* pentagon outline connecting the points */
	.pentagon::before {
		content: '';
		position: absolute;
		inset: 9%;
		border: 1px solid color-mix(in srgb, var(--on-dark) 10%, transparent);
		clip-path: polygon(50% 0, 100% 38%, 81% 100%, 19% 100%, 0 38%);
		pointer-events: none;
	}

	.pent-point {
		position: absolute;
		width: 56px;
		height: 56px;
		border-radius: 50%;
		border: none;
		background: var(--pc);
		transform: translate(-50%, -50%);
		cursor: pointer;
		transition: box-shadow 0.3s, transform 0.3s;
		box-shadow: 0 0 14px var(--pc);
	}

	.pent-point:focus-visible {
		outline: 2px solid var(--on-dark);
		outline-offset: 3px;
	}

	.pent-point:hover {
		box-shadow: 0 0 28px var(--pc);
		transform: translate(-50%, -50%) scale(1.18);
	}

	/* hue-rotate Mentorship point (index 3) for a purple-ish tone */
	.pent-point:nth-child(4) {
		filter: hue-rotate(250deg) saturate(0.75) brightness(1.25);
	}

	/* slight visual distinction for Upskill */
	.pent-point:nth-child(5) {
		box-shadow: 0 0 10px var(--pc), 0 0 20px color-mix(in srgb, var(--pc) 50%, transparent);
	}

	.point-label {
		position: absolute;
		white-space: nowrap;
		font-size: 13px;
		font-weight: 600;
		color: var(--on-dark);
		letter-spacing: 0.02em;
		top: calc(100% + 10px);
		left: 50%;
		transform: translateX(-50%);
	}

	.pent-point:nth-child(3) .point-label,
	.pent-point:nth-child(4) .point-label {
		top: auto;
		bottom: calc(100% + 10px);
	}

	/* pentagon point positions */
	.pent-point:nth-child(1) { left: 50%; top: 15%; }
	.pent-point:nth-child(2) { left: 83%; top: 39%; }
	.pent-point:nth-child(3) { left: 71%; top: 78%; }
	.pent-point:nth-child(4) { left: 29%; top: 78%; }
	.pent-point:nth-child(5) { left: 17%; top: 39%; }

	/* Mobile list: hidden on desktop */
	.mobile-list {
		display: none;
	}

	.desc-panel {
		text-align: center;
		padding: 28px 24px;
		background: var(--surface-dark-elevated);
		border-radius: 12px;
		max-width: 480px;
		margin: 0 auto;
		min-height: 100px;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.desc-label {
		font-family: var(--font-display);
		font-size: 22px;
		font-weight: 500;
		color: var(--on-dark);
		margin: 0 0 6px;
	}

	.body-md {
		font-size: 18px;
		line-height: 1.55;
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
			transition: background 0.2s;
		}

		.mobile-item:hover,
		.mobile-item:focus-visible {
			background: color-mix(in srgb, var(--on-dark) 7%, transparent);
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
		}

		.mobile-name {
			font-weight: 600;
		}
	}
</style>
