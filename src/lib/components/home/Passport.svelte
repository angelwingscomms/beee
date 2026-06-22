<script lang="ts">
	import { Check } from '@lucide/svelte';
	import { motionFadeUp } from '$lib/actions/motion';
	import { observe } from '$lib/actions/observe';

	let hovered = $state<number | null>(null);
	let selected = $state<number | null>(null);

	const items = [
		'Attendance', 'Achievements', 'Badges', 'Leadership Activities',
		'Projects', 'Mentorship Records', 'Certificates', 'Milestones',
	];

	const pillars = [
		{ label: 'Technology', desc: 'Problem Solving \u2022 Digital Literacy \u2022 Innovation Mindset' },
		{ label: 'Enterprise', desc: 'Financial Literacy \u2022 Entrepreneurship \u2022 Business Skills' },
		{ label: 'Art', desc: 'Creative Expression \u2022 Visual Arts \u2022 Design Thinking' },
		{ label: 'Mentorship', desc: 'Guided Growth \u2022 Role Models \u2022 Professional Coaching' },
		{ label: 'Upskill', desc: 'Practical Mastery \u2022 Workshops \u2022 Certifications' },
	];

	const colors = [
		'var(--primary)',
		'var(--accent-amber)',
		'var(--accent-teal)',
		'var(--primary)',
		'var(--accent-teal)',
	];
</script>

<section class="section-band section-dark" id="passport">
	<div class="bg-orbs" aria-hidden="true">
		<div class="orb orb-1"></div>
		<div class="orb orb-2"></div>
		<div class="orb orb-3"></div>
	</div>

	<div class="container" use:motionFadeUp>
		<div class="passport-grid">
			<!-- Left: Passport content -->
			<div class="passport-left" use:observe>
				<h2 class="display-lg passport-heading">Development Passport</h2>
				<p class="passport-sub">
					Every participant receives a T.E.A.M.U.P. Development Passport —
					their complete record of growth, achievement, and progress
					across all five pillars.
				</p>
				<ul class="checklist">
					{#each items as item}
						<li>
							<span class="check-icon"><Check size={14} /></span>
							<span>{item}</span>
						</li>
					{/each}
				</ul>
				<span class="badge-coral passport-badge">Parent Access Included</span>
			</div>

			<!-- Right: Pentagon framework -->
			<div class="passport-right" use:observe>
				<div class="pillar-label">T.E.A.M.U.P</div>

				<div class="pentagon-wrap">
					<div class="pentagon">
						{#each pillars as p, i}
							<button
								class="pent-point"
								class:active={selected === i}
								style="--pc: {colors[i]}"
								onmouseenter={() => hovered = i}
								onmouseleave={() => hovered = null}
								onclick={() => selected = selected === i ? null : i}
								onfocus={() => hovered = i}
								onblur={() => hovered = null}
								aria-label={p.label}
							>
								<span class="point-label">{p.label}</span>
							</button>
						{/each}
					</div>
				</div>

				<div class="desc-shell">
					<div class="desc-panel">
						{#if hovered !== null}
							<p class="desc-label">{pillars[hovered].label}</p>
							<p class="desc-body">{pillars[hovered].desc}</p>
						{:else if selected !== null}
							<p class="desc-label">{pillars[selected].label}</p>
							<p class="desc-body">{pillars[selected].desc}</p>
						{:else}
							<p class="desc-body" style="opacity: 0.45">Tap or hover a pillar</p>
						{/if}
					</div>
				</div>
			</div>
		</div>
	</div>
</section>

<style>
	/* ── Background orbs ── */
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
		width: 400px; height: 400px;
		top: -10%; right: -5%;
		background: radial-gradient(circle, rgba(242, 120, 48, 0.10), transparent 70%);
		animation: orb-float 20s ease-in-out infinite;
	}

	.orb-2 {
		width: 300px; height: 300px;
		bottom: 10%; left: -8%;
		background: radial-gradient(circle, rgba(93, 184, 166, 0.07), transparent 70%);
		animation: orb-float 25s ease-in-out infinite reverse;
	}

	.orb-3 {
		width: 350px; height: 350px;
		bottom: -5%; right: 20%;
		background: radial-gradient(circle, rgba(255, 178, 0, 0.05), transparent 70%);
		animation: orb-float 18s ease-in-out infinite 5s;
	}

	@keyframes orb-float {
		0%, 100% { translate: 0 0; }
		33% { translate: 20px -30px; }
		66% { translate: -15px 20px; }
	}

	/* ── Grid: side‑by‑side on desktop ── */
	.passport-grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 64px;
		align-items: start;
	}

	.passport-left {
		padding-top: 12px;
	}
	.passport-left:not(.in-view) { opacity: 0; translate: 0 20px; }
	.passport-left { transition: opacity 0.8s cubic-bezier(0.32, 0.72, 0, 1) 0.1s, translate 0.8s cubic-bezier(0.32, 0.72, 0, 1) 0.1s; }

	.passport-right {
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.passport-right:not(.in-view) { opacity: 0; translate: 0 24px; }
	.passport-right { transition: opacity 0.8s cubic-bezier(0.32, 0.72, 0, 1) 0.25s, translate 0.8s cubic-bezier(0.32, 0.72, 0, 1) 0.25s; }

	/* ── Passport left content ── */
	.passport-heading {
		color: var(--on-dark) !important;
		margin: 0 0 16px;
	}

	.passport-sub {
		color: var(--on-dark-soft);
		font-size: 16px;
		line-height: 1.55;
		margin: 0 0 28px;
		max-width: 460px;
	}

	.checklist {
		list-style: none;
		padding: 0;
		margin: 0 0 28px;
		display: flex;
		flex-direction: column;
		gap: 10px;
	}

	.checklist li {
		display: flex;
		align-items: center;
		gap: 10px;
		color: var(--on-dark);
		font-size: 15px;
		line-height: 1.4;
	}

	.check-icon {
		display: grid;
		width: 22px; height: 22px;
		place-items: center;
		border-radius: 50%;
		flex-shrink: 0;
		background: color-mix(in srgb, var(--primary) 18%, transparent);
		color: var(--primary);
	}

	.passport-badge {
		display: inline-flex;
	}

	/* ── Pillar label (eyebrow for right column) ── */
	.pillar-label {
		display: inline-flex;
		padding: 5px 14px;
		margin-bottom: 24px;
		border-radius: 999px;
		background: rgba(255, 255, 255, 0.05);
		border: 1px solid rgba(255, 255, 255, 0.08);
		color: var(--on-dark-soft);
		font-size: 11px;
		font-weight: 500;
		letter-spacing: 0.14em;
		text-transform: uppercase;
		backdrop-filter: blur(8px);
	}

	/* ── Pentagon ── */
	.pentagon-wrap {
		display: flex;
		justify-content: center;
		width: 100%;
		margin-bottom: 28px;
	}

	.pentagon {
		position: relative;
		width: 100%;
		max-width: 340px;
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
		background: radial-gradient(circle at 50% 50%, rgba(255,255,255,0.02), transparent 70%);
		clip-path: polygon(50% 0, 100% 38%, 81% 100%, 19% 100%, 0 38%);
		pointer-events: none;
	}

	.pent-point {
		position: absolute;
		width: 52px; height: 52px;
		border-radius: 50%;
		border: 2px solid var(--pc);
		background: rgba(255, 255, 255, 0.03);
		transform: translate(-50%, -50%);
		cursor: pointer;
		backdrop-filter: blur(6px);
		display: flex;
		align-items: center;
		justify-content: center;
		transition:
			box-shadow 0.5s cubic-bezier(0.32, 0.72, 0, 1),
			transform 0.5s cubic-bezier(0.32, 0.72, 0, 1),
			background 0.35s cubic-bezier(0.32, 0.72, 0, 1);
	}

	.pent-point::after {
		content: '';
		position: absolute;
		inset: 4px;
		border-radius: inherit;
		background: radial-gradient(circle at 30% 30%, rgba(255,255,255,0.08), transparent);
		pointer-events: none;
	}

	.pent-point:focus-visible { outline: 2px solid var(--on-dark); outline-offset: 3px; }

	.pent-point:hover,
	.pent-point.active {
		box-shadow: 0 0 18px var(--pc), 0 0 36px color-mix(in srgb, var(--pc) 35%, transparent);
		transform: translate(-50%, -50%) scale(1.18);
		background: color-mix(in srgb, var(--pc) 12%, transparent);
	}

	.pent-point.active .point-label { opacity: 1; }

	.pent-point:nth-child(4) { filter: hue-rotate(250deg) saturate(0.75) brightness(1.25); }
	.pent-point:nth-child(5) { box-shadow: 0 0 10px var(--pc), 0 0 24px color-mix(in srgb, var(--pc) 35%, transparent); }
	.pent-point:nth-child(5):hover,
	.pent-point:nth-child(5).active { box-shadow: 0 0 22px var(--pc), 0 0 44px color-mix(in srgb, var(--pc) 45%, transparent); }

	.point-label {
		position: absolute;
		white-space: nowrap;
		font-size: 12px;
		font-weight: 600;
		color: var(--on-dark);
		letter-spacing: 0.03em;
		top: calc(100% + 10px);
		left: 50%;
		transform: translateX(-50%);
		opacity: 0.75;
		transition: opacity 0.3s cubic-bezier(0.32, 0.72, 0, 1);
	}
	.pent-point:hover .point-label { opacity: 1; }

	.pent-point:nth-child(3) .point-label,
	.pent-point:nth-child(4) .point-label {
		top: auto;
		bottom: calc(100% + 10px);
	}

	.pent-point:nth-child(1) { left: 50%; top: 15%; }
	.pent-point:nth-child(2) { left: 83%; top: 39%; }
	.pent-point:nth-child(3) { left: 71%; top: 78%; }
	.pent-point:nth-child(4) { left: 29%; top: 78%; }
	.pent-point:nth-child(5) { left: 17%; top: 39%; }

	/* ── Description panel (double‑bezel) ── */
	.desc-shell {
		width: 100%;
		max-width: 400px;
		padding: 1.5px;
		border-radius: calc(10px + 1.5px);
		background: linear-gradient(135deg, rgba(255,255,255,0.07), rgba(255,255,255,0.02));
	}
	.desc-shell:not(.in-view) { opacity: 0; translate: 0 20px; }
	.desc-shell { transition: opacity 0.7s cubic-bezier(0.32, 0.72, 0, 1) 0.35s, translate 0.7s cubic-bezier(0.32, 0.72, 0, 1) 0.35s; }

	.desc-panel {
		text-align: center;
		padding: 24px 20px;
		background: var(--surface-dark-elevated);
		border-radius: 10px;
		min-height: 88px;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		box-shadow: inset 0 1px 1px rgba(255,255,255,0.05);
		transition: box-shadow 0.35s cubic-bezier(0.32, 0.72, 0, 1);
	}
	.desc-panel:hover { box-shadow: inset 0 1px 2px rgba(255,255,255,0.1); }

	.desc-label {
		font-family: var(--font-display);
		font-size: 20px;
		font-weight: 500;
		color: var(--on-dark);
		margin: 0 0 4px;
	}

	.desc-body {
		font-size: 15px;
		line-height: 1.5;
		color: var(--on-dark-soft);
		margin: 0;
	}

	/* ── Mobile collapse ── */
	@media (max-width: 767px) {
		.passport-grid {
			grid-template-columns: 1fr;
			gap: 40px;
		}

		.passport-left {
			padding-top: 0;
		}

		.pentagon { max-width: 260px; }
		.pent-point { width: 44px; height: 44px; }
		.desc-shell { max-width: 100%; }
	}
</style>
