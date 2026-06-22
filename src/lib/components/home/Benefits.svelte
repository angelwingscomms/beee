<script lang="ts">
	import { BrainCircuit, Crown, MessageCircle, Lightbulb, Zap, Puzzle } from '@lucide/svelte';
	import { observe } from '$lib/actions/observe';

	const cards = [
		{ icon: BrainCircuit, title: 'Strategic Thinking', desc: 'Problem-solving, planning, and foresight through advanced chess and pillar training.' },
		{ icon: Crown, title: 'Leadership', desc: 'Public speaking, team coordination, and decision-making skills for tomorrow\'s leaders.' },
		{ icon: MessageCircle, title: 'Communication', desc: 'Effective expression, active listening, and collaborative dialogue.' },
		{ icon: Lightbulb, title: 'Creativity', desc: 'Artistic expression, design thinking, and innovative problem-solving approaches.' },
		{ icon: Zap, title: 'Confidence', desc: 'Self-advocacy, resilience, and the courage to take on new challenges.' },
		{ icon: Puzzle, title: 'Problem Solving', desc: 'Analytical thinking, pattern recognition, and structured solution-finding.' },
	];
</script>

<section class="section-band">
	<div class="container">
		<div class="section-header">
			<h2 class="display-lg">Skills That Last a Lifetime</h2>
			<p>Every child leaves the BEEE programme with more than chess skills — they gain the tools to thrive in school, career, and life.</p>
		</div>
		<div class="benefits-grid">
			{#each cards as card, i}
				<div class="benefit-card" use:observe style="transition-delay: {i * 100}ms">
					<svelte:component this={card.icon} size={28} color="var(--primary)" />
					<h3>{card.title}</h3>
					<p>{card.desc}</p>
				</div>
			{/each}
		</div>
	</div>
</section>

<style>
	.benefit-card h3 {
		margin: 20px 0 8px;
		font-family: var(--font-sans);
		font-weight: 600;
		font-size: 16px;
		color: var(--ink);
		line-height: 1.3;
	}

	.benefit-card p {
		margin: 0;
		font-size: 14px;
		color: var(--body);
		line-height: 1.55;
	}
</style>
