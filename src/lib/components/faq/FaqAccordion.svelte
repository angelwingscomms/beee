<script lang="ts">
	import type { FaqQ } from '$lib/data/faq';

	let { qs, category_label = '' }: { qs: FaqQ[]; category_label?: string } = $props();
	let open = $state<number | null>(null);

	function toggle(i: number) {
		open = open === i ? null : i;
	}
</script>

<div class="accordion" role="region" aria-label={category_label ? `${category_label} questions` : 'FAQ questions'}>
	{#each qs as item, i}
		<div class="accordion-item" class:accordion-open={open === i}>
			<button
				class="accordion-trigger"
				onclick={() => toggle(i)}
				aria-expanded={open === i}
				aria-controls="faq-answer-{i}"
				id="faq-question-{i}"
			>
				<span class="accordion-q">{item.q}</span>
				<svg class="accordion-chevron" width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
					<path d="M4.5 6.75l4.5 4.5 4.5-4.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
				</svg>
			</button>
			<div
				id="faq-answer-{i}"
				role="region"
				aria-labelledby="faq-question-{i}"
				class="accordion-panel"
				class:accordion-panel-open={open === i}
				style="--content-height: {item.a.length}px"
			>
				<div class="accordion-answer">
					<p>{item.a}</p>
				</div>
			</div>
		</div>
	{/each}
</div>

{#if qs.length === 0}
	<p class="no-results">No questions match your search. Try a different term.</p>
{/if}

<style>
	.accordion {
		display: grid;
		gap: 0;
	}

	.accordion-item {
		border-bottom: 1px solid var(--hairline-soft);
	}

	.accordion-item:first-child {
		border-top: 1px solid var(--hairline-soft);
	}

	.accordion-trigger {
		display: flex;
		align-items: center;
		justify-content: space-between;
		width: 100%;
		gap: 16px;
		padding: 20px 0;
		border: none;
		background: transparent;
		color: var(--ink);
		text-align: left;
		font-size: 16px;
		font-weight: 500;
		line-height: 1.45;
		cursor: pointer;
		transition: color 160ms ease;
	}

	.accordion-trigger:hover {
		color: var(--primary);
	}

	.accordion-q {
		flex: 1;
	}

	.accordion-chevron {
		flex-shrink: 0;
		color: var(--muted);
		transition: transform 240ms ease;
	}

	.accordion-open .accordion-chevron {
		transform: rotate(180deg);
	}

	.accordion-panel {
		display: grid;
		grid-template-rows: 0fr;
		transition: grid-template-rows 300ms cubic-bezier(0.16, 1, 0.3, 1);
	}

	.accordion-panel-open {
		grid-template-rows: 1fr;
	}

	.accordion-answer {
		overflow: hidden;
	}

	.accordion-answer p {
		margin: 0 0 20px;
		color: var(--body);
		font-size: 15px;
		line-height: 1.65;
		max-width: 680px;
	}

	.no-results {
		padding: 48px 0;
		text-align: center;
		color: var(--muted);
		font-size: 15px;
	}

	@media (prefers-reduced-motion: reduce) {
		.accordion-panel {
			transition: none;
		}

		.accordion-chevron {
			transition: none;
		}
	}

	@media (max-width: 767px) {
		.accordion-trigger {
			font-size: 15px;
			padding: 16px 0;
		}

		.accordion-answer p {
			font-size: 14px;
		}
	}
</style>
