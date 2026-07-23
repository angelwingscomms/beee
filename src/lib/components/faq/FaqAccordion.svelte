<script lang="ts">
	import type { FaqQ } from '$lib/data/faq';

	let { qs, category_label = '', cat_id = '' }: { qs: FaqQ[]; category_label?: string; cat_id?: string } = $props();
	let open = $state<number | null>(null);

	function toggle(i: number) {
		open = open === i ? null : i;
	}
</script>

{#if qs.length > 0}
	<div class="accordion" role="region" aria-label={category_label ? `${category_label} questions` : 'FAQ questions'}>
		{#each qs as item, i}
			<div class="accordion-item" class:accordion-open={open === i}>
				<button
					class="accordion-trigger"
					onclick={() => toggle(i)}
					aria-expanded={open === i}
					aria-controls="faq-answer-{cat_id}-{i}"
					id="faq-question-{cat_id}-{i}"
				>
					<span class="accordion-q">{item.q}</span>
					<svg class="accordion-chevron" width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
						<path d="M4.5 6.75l4.5 4.5 4.5-4.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
					</svg>
				</button>
				<div
					id="faq-answer-{cat_id}-{i}"
					role="region"
					aria-labelledby="faq-question-{cat_id}-{i}"
					class="accordion-panel"
					class:accordion-panel-open={open === i}
				>
					<div class="accordion-answer">
						<p>{item.a}</p>
					</div>
				</div>
			</div>
		{/each}
	</div>
{:else}
	<p class="no-results">No questions match your search. Try a different term.</p>
{/if}

<style>
	.accordion {
		display: grid;
	}

	.accordion-item {
		position: relative;
		border-top: 1px solid var(--hairline);
		padding: 0;
		transition: background var(--dur-micro) var(--ease-out);
	}

	.accordion:last-child .accordion-item:last-child,
	.accordion-item:last-child {
		border-bottom: 1px solid var(--hairline);
	}

	.accordion-open {
		background: color-mix(in srgb, var(--beam) 4%, transparent);
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
		font-family: var(--font-grotesk);
		font-size: 19px;
		font-weight: 600;
		line-height: 1.3;
		letter-spacing: -0.01em;
		cursor: pointer;
		transition: color var(--dur-micro) var(--ease-out);
	}

	.accordion-trigger:hover {
		color: var(--beam);
	}

	.accordion-open .accordion-trigger {
		color: var(--beam);
	}

	.accordion-q {
		flex: 1;
	}

	.accordion-chevron {
		flex-shrink: 0;
		color: var(--muted);
		transition: transform var(--dur-micro) var(--ease-out), color var(--dur-micro) var(--ease-out);
	}

	.accordion-open .accordion-chevron {
		transform: rotate(180deg);
		color: var(--beam);
	}

	.accordion-panel {
		display: grid;
		grid-template-rows: 0fr;
		transition: grid-template-rows 300ms var(--ease-out);
	}

	.accordion-panel-open {
		grid-template-rows: 1fr;
	}

	.accordion-answer {
		overflow: hidden;
	}

	.accordion-answer p {
		margin: 0 0 20px;
		font-family: var(--font-sans);
		color: var(--body);
		font-size: var(--fs-body-std);
		line-height: var(--lh-body);
		max-width: 66ch;
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

		.accordion-item {
			transition: none;
		}
	}

	@media (--sm-down) {
		.accordion-trigger {
			font-size: 15px;
			padding: 16px 0;
		}

		.accordion-answer p {
			font-size: 14px;
		}
	}
</style>
