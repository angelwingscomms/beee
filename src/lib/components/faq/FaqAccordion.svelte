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
		gap: 8px;
	}

	.accordion-item {
		position: relative;
		background: var(--canvas);
		border: 1px solid var(--hairline-soft);
		border-radius: 12px;
		padding: 0 20px;
		transition: border-color 160ms ease, box-shadow 160ms ease, transform 160ms ease, background 160ms ease;
	}

	.accordion-item::before {
		content: '';
		position: absolute;
		top: 8px;
		bottom: 8px;
		left: 0;
		width: 3px;
		border-radius: 3px;
		background: var(--primary);
		transform: scaleY(0);
		transform-origin: center;
		transition: transform 200ms ease;
	}

	.accordion-item:hover {
		border-color: var(--hairline);
		box-shadow: var(--shadow-soft);
		transform: translateY(-1px);
	}

	.accordion-open {
		background: color-mix(in srgb, var(--surface-card) 55%, var(--canvas));
	}

	.accordion-open::before {
		transform: scaleY(1);
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
		font-family: var(--font-hero);
		font-size: 17px;
		font-weight: 600;
		line-height: 1.45;
		cursor: pointer;
		transition: color 160ms ease;
	}

	.accordion-trigger:hover {
		color: var(--primary);
	}

	.accordion-open .accordion-trigger {
		color: var(--primary);
	}

	.accordion-q {
		flex: 1;
	}

	.accordion-chevron {
		flex-shrink: 0;
		color: var(--muted);
		transition: transform 240ms ease, color 160ms ease;
	}

	.accordion-open .accordion-chevron {
		transform: rotate(180deg);
		color: var(--primary);
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
		color: var(--body-strong);
		font-size: 16px;
		line-height: 1.7;
		max-width: 62ch;
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

		.accordion-item,
		.accordion-item::before {
			transition: none;
		}

		.accordion-item:hover {
			transform: none;
		}
	}

	@media (--sm-down) {
		.accordion-item {
			padding: 0 16px;
		}

		.accordion-trigger {
			font-size: 15px;
			padding: 16px 0;
		}

		.accordion-answer p {
			font-size: 14px;
		}
	}
</style>
