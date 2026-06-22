<script lang="ts">
	import { Trophy, Sword, Shield, UserPlus, Puzzle, BookOpen } from '@lucide/svelte';

	let active = $state(-1);

	const steps = [
		{ icon: UserPlus, title: 'Register', desc: "Secure your child's place in the programme" },
		{ icon: Puzzle, title: 'T.E.A.M.U.P.', desc: 'Begin the six-pillar developmental journey' },
		{ icon: BookOpen, title: 'Development Passport', desc: 'Earn badges, stamps, and certificates' },
		{ icon: Sword, title: 'Preliminary Rounds', desc: 'School-level qualifying competitions' },
		{ icon: Shield, title: 'Advanced Stages', desc: 'Regional semi-finals and playoffs' },
		{ icon: Trophy, title: 'Grand Finale', desc: 'The BEEE Spectacular Chess Championship' },
	];

	function toggle(i: number) {
		active = active === i ? -1 : i;
	}
</script>

<section class="section-band section-soft" id="journey">
	<div class="container">
		<h2 class="display-lg" style="text-align:center">Championship Journey</h2>
		<div class="timeline-wrapper">
			<div class="timeline-line" aria-hidden="true"></div>
			<div class="milestone-strip">
				{#each steps as step, i}
					<div
						class="milestone milestone-{i + 1}"
						class:active={active === i}
						role="button"
						tabindex="0"
						onclick={() => toggle(i)}
						onkeydown={(e) => e.key === 'Enter' && toggle(i)}
					>
						<div class="milestone-icon-wrap">
							<span class="milestone-icon">
								<step.icon size={28} />
							</span>
							<div class="milestone-dot" aria-hidden="true"></div>
						</div>
						<div class="milestone-body">
							<strong>{step.title}</strong>
							<p>{step.desc}</p>
						</div>
						{#if active === i}
							<div class="milestone-detail">
								<span>Learn more about {step.title} &rarr;</span>
							</div>
						{/if}
					</div>
				{/each}
			</div>
		</div>
	</div>
</section>

<style>
	.timeline-wrapper {
		position: relative;
		margin-top: 52px;
		padding-bottom: 8px;
	}

	.timeline-line {
		position: absolute;
		top: 44px;
		left: 6%;
		right: 6%;
		height: 3px;
		background: var(--hairline);
		border-radius: 2px;
		z-index: 0;
		transform-origin: left center;
	}

	.milestone-strip {
		display: flex;
		gap: 12px;
		position: relative;
		z-index: 1;
	}

	.milestone {
		flex: 1;
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;
		padding: 12px 12px 20px;
		border-radius: 12px;
		background: var(--surface-card);
		cursor: pointer;
		transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1),
					box-shadow 0.35s cubic-bezier(0.16, 1, 0.3, 1),
					background 0.35s cubic-bezier(0.16, 1, 0.3, 1);
		border: none;
		color: var(--ink);
		font-family: inherit;
	}

	.milestone:hover {
		transform: translateY(-6px);
		box-shadow: 0 10px 32px rgba(242, 120, 48, 0.12);
		background: color-mix(in srgb, var(--surface-card) 94%, var(--primary));
	}

	.milestone:focus-visible {
		outline: 2px solid var(--primary);
		outline-offset: 2px;
	}

	.milestone.active {
		box-shadow: 0 0 0 2px var(--primary), 0 10px 32px rgba(242, 120, 48, 0.15);
	}

	.milestone-icon-wrap {
		position: relative;
		display: flex;
		flex-direction: column;
		align-items: center;
		margin-bottom: 14px;
	}

	.milestone-icon {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 52px;
		height: 52px;
		border-radius: 50%;
		background: var(--primary);
		color: var(--on-primary);
		flex-shrink: 0;
		position: relative;
		z-index: 2;
		transition: background 0.3s ease, transform 0.3s ease;
	}

	.milestone.active .milestone-icon {
		background: var(--primary-active);
		transform: scale(1.08);
	}

	.milestone .milestone-icon :global(svg) {
		transition: transform 0.3s ease;
	}

	.milestone:hover .milestone-icon :global(svg) {
		transform: scale(1.1);
	}

	.milestone-dot {
		position: absolute;
		bottom: -18px;
		left: 50%;
		translate: -50% 0;
		width: 10px;
		height: 10px;
		border-radius: 50%;
		background: var(--primary);
		border: 2px solid var(--surface-card);
		z-index: 3;
		transition: background 0.3s ease, transform 0.3s ease;
	}

	.milestone.active .milestone-dot {
		background: var(--primary-active);
		transform: scale(1.25);
	}

	.milestone-body {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 4px;
	}

	.milestone strong {
		font-family: var(--font-sans);
		font-weight: 600;
		font-size: 14px;
		line-height: 1.3;
	}

	.milestone p {
		margin: 0;
		font-size: 12.5px;
		color: var(--muted);
		line-height: 1.45;
		max-width: 22ch;
	}

	.milestone-detail {
		margin-top: 12px;
		padding-top: 10px;
		border-top: 1px solid var(--hairline);
		width: 100%;
		animation: detail-in 0.3s cubic-bezier(0.16, 1, 0.3, 1);
	}

	.milestone-detail span {
		font-size: 12.5px;
		color: var(--primary);
		font-weight: 500;
	}

	@keyframes detail-in {
		from {
			opacity: 0;
			transform: translateY(-6px) scale(0.96);
		}
		to {
			opacity: 1;
			transform: translateY(0) scale(1);
		}
	}

	@media (max-width: 1023px) {
		.timeline-wrapper {
			margin-top: 36px;
		}

		.milestone-strip {
			flex-wrap: wrap;
			justify-content: center;
		}

		.milestone {
			flex: 0 0 calc(33.33% - 12px);
			min-width: 180px;
		}

		.timeline-line {
			display: none;
		}

		.milestone-dot {
			display: none;
		}
	}

	@media (max-width: 766px) {
		.timeline-line {
			display: none;
		}

		.milestone-strip {
			flex-direction: column;
			gap: 10px;
		}

		.milestone {
			flex-direction: row;
			text-align: left;
			padding: 16px 20px;
			padding-left: 48px;
			position: relative;
			align-items: flex-start;
		}

		.milestone::before {
			content: '';
			position: absolute;
			left: 22px;
			top: 28px;
			bottom: -10px;
			width: 2px;
			background: var(--hairline);
			z-index: 0;
		}

		.milestone:last-child::before {
			display: none;
		}

		.milestone-icon-wrap {
			margin-bottom: 0;
			margin-right: 14px;
			flex-shrink: 0;
		}

		.milestone-icon {
			width: 40px;
			height: 40px;
		}

		.milestone-icon :global(svg) {
			width: 20px;
			height: 20px;
		}

		.milestone-dot {
			display: none;
		}

		.milestone-body {
			align-items: flex-start;
		}

		.milestone strong {
			font-size: 14px;
		}

		.milestone p {
			font-size: 12px;
			max-width: none;
		}

		.milestone-detail {
			margin-top: 8px;
			padding-top: 8px;
		}
	}
</style>
