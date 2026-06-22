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
</script>

<section class="section-band section-soft">
	<div class="container">
		<h2 class="display-lg" style="text-align:center">Championship Journey</h2>
		<div class="timeline-track">
			<div class="timeline-line"></div>
			<div class="milestone-strip">
				{#each steps as step, i}
					<div
						class="milestone"
						class:active={active === i}
						style="animation-delay:{i * 0.15}s"
						role="button"
						tabindex="0"
						onclick={() => active = active === i ? -1 : i}
						onkeydown={(e) => e.key === 'Enter' && (active = active === i ? -1 : i)}
					>
						<span class="milestone-icon">
							<svelte:component this={step.icon} size={32} color="white" />
						</span>
						<strong>{step.title}</strong>
						<p>{step.desc}</p>
						{#if active === i}
							<div class="milestone-detail">
								<span>Learn more about {step.title} →</span>
							</div>
						{/if}
					</div>
				{/each}
			</div>
		</div>
	</div>
</section>

<style>
	.timeline-track {
		position: relative;
		margin-top: 48px;
	}

	.timeline-line {
		position: absolute;
		top: 28px;
		left: 0;
		right: 0;
		height: 3px;
		background: var(--hairline);
		border-radius: 2px;
		z-index: 0;
	}

	.milestone-strip {
		display: flex;
		gap: 16px;
		position: relative;
		z-index: 1;
	}

	.milestone {
		flex: 1;
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;
		padding: 32px 16px 24px;
		border-radius: 12px;
		background: var(--surface-card);
		cursor: pointer;
		transition: transform 0.3s ease, box-shadow 0.3s ease;
		animation: milestone-up 0.6s ease both;
		border: none;
		color: var(--ink);
		font-family: inherit;
	}

	.milestone:hover {
		transform: translateY(-4px);
		box-shadow: 0 8px 24px rgba(0,0,0,0.08);
	}

	.milestone:focus-visible {
		outline: 2px solid var(--primary);
		outline-offset: 2px;
	}

	.milestone-icon {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 56px;
		height: 56px;
		border-radius: 50%;
		background: var(--primary);
		margin-bottom: 16px;
		flex-shrink: 0;
	}

	.milestone strong {
		font-family: var(--font-sans);
		font-weight: 600;
		font-size: 15px;
		margin-bottom: 6px;
		line-height: 1.3;
	}

	.milestone p {
		margin: 0;
		font-size: 13px;
		color: var(--muted);
		line-height: 1.45;
	}

	.milestone-detail {
		margin-top: 12px;
		padding-top: 10px;
		border-top: 1px solid var(--hairline);
		width: 100%;
		animation: detail-in 0.3s ease;
	}

	.milestone-detail span {
		font-size: 13px;
		color: var(--primary);
		font-weight: 500;
	}

	@keyframes milestone-up {
		from {
			opacity: 0;
			transform: translateY(20px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	@keyframes detail-in {
		from {
			opacity: 0;
			transform: translateY(-4px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	@media (max-width: 766px) {
		.timeline-line {
			display: none;
		}

		.milestone-strip {
			flex-direction: column;
			gap: 12px;
		}

		.milestone {
			flex-direction: row;
			text-align: left;
			padding: 20px;
			padding-left: 52px;
			position: relative;
		}

		.milestone::before {
			content: '';
			position: absolute;
			left: 24px;
			top: 28px;
			bottom: -12px;
			width: 2px;
			background: var(--hairline);
			z-index: 0;
		}

		.milestone:last-child::before {
			display: none;
		}

		.milestone-icon {
			width: 40px;
			height: 40px;
			margin-bottom: 0;
			margin-right: 16px;
		}

		.milestone-icon :global(svg) {
			width: 20px;
			height: 20px;
		}

		.milestone strong {
			font-size: 14px;
		}

		.milestone p {
			font-size: 12px;
		}

		.milestone-detail {
			margin-top: 8px;
			padding-top: 8px;
		}
	}
</style>
