<script lang="ts">
	import { cs as all_cs, filterBySearch, filterByCategory } from '$lib/data/faq';
	import FaqHero from '$lib/components/faq/FaqHero.svelte';
	import FaqSearch from '$lib/components/faq/FaqSearch.svelte';
	import FaqCategories from '$lib/components/faq/FaqCategories.svelte';
	import FaqAccordion from '$lib/components/faq/FaqAccordion.svelte';
	import FaqContact from '$lib/components/faq/FaqContact.svelte';

	let active_cat = $state('all');
	let search_q = $state('');

	let filtered = $derived(filterByCategory(filterBySearch(all_cs, search_q), active_cat));
	let result_count = $derived(filtered.reduce((n, c) => n + c.qs.length, 0));

	function clear_filters() {
		search_q = '';
		active_cat = 'all';
	}

	let faq_schema = $derived(JSON.stringify({
		'@context': 'https://schema.org',
		'@type': 'FAQPage',
		mainEntity: all_cs.flatMap(c => c.qs.map(i => ({
			'@type': 'Question',
			name: i.q,
			acceptedAnswer: { '@type': 'Answer', text: i.a }
		})))
	}));
</script>

<svelte:head>
	<!-- SEO FAQPage schema -->
	{@html '<script type="application/ld+json">' + faq_schema + '</script>'}
</svelte:head>

<div class="faq-page">
	<FaqHero />

	<div class="faq-toolbar container">
		<FaqSearch bind:value={search_q} />
		<FaqCategories cs={all_cs} bind:active={active_cat} />
		<p class="faq-count">{result_count} {result_count === 1 ? 'question' : 'questions'}</p>
	</div>

	<section class="faq-list container">
		{#each filtered as c}
			<div class="faq-category">
				<h2 class="faq-cat-title" id="cat-{c.i}">
					<span class="faq-cat-dot" aria-hidden="true"></span>
					<span>{c.n}</span>
					<span class="faq-cat-rule" aria-hidden="true"></span>
				</h2>
				<FaqAccordion qs={c.qs} category_label={c.n} cat_id={c.i} />
			</div>
		{/each}

		{#if filtered.length === 0}
			<div class="faq-empty">
				<svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
					<circle cx="14" cy="14" r="9.5" stroke="currentColor" stroke-width="1.5"/>
					<path d="M27 27l-6.2-6.2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
				</svg>
				<p>
					{#if search_q}
						No results for &ldquo;{search_q}&rdquo;.
					{:else}
						No questions match the selected filters.
					{/if}
				</p>
				<button type="button" class="faq-empty-clear" onclick={clear_filters}>Clear filters</button>
			</div>
		{/if}
	</section>

	<FaqContact />
</div>

<style>
	.faq-page {
		min-height: 100vh;
		background: var(--canvas);
		display: flex;
		flex-direction: column;
		gap: 64px;
		padding-top: 36px;
		padding-bottom: 144px;
	}

	.container {
		width: min(1200px, calc(100% - 48px));
		margin: 0 auto;
	}

	.faq-toolbar {
		display: flex;
		flex-direction: column;
		gap: 20px;
		max-width: 860px;
	}

	.faq-list {
		display: flex;
		flex-direction: column;
		gap: 27px;
		max-width: 860px;
	}

	@media (--sm-down) {
		.faq-list {
			gap: 20px;
		}
	}

	.faq-count {
		margin: 0;
		color: var(--muted);
		font-size: 13px;
	}

	.faq-cat-title {
		display: flex;
		align-items: center;
		gap: 10px;
		position: sticky;
		top: 0;
		z-index: 2;
		margin: 0 0 4px;
		padding: 8px 0;
		background: var(--canvas);
		color: var(--muted);
		font-family: var(--font-hero);
		font-size: 13px;
		font-weight: 600;
		letter-spacing: 0.12em;
		text-transform: uppercase;
		line-height: 1.3;
	}

	.faq-cat-dot {
		flex-shrink: 0;
		width: 6px;
		height: 6px;
		border-radius: 50%;
		background: var(--primary);
	}

	.faq-cat-rule {
		flex: 1;
		height: 1px;
		background: var(--hairline);
	}

	@media (--sm-down) {
		.faq-page {
			gap: 48px;
			padding-bottom: 96px;
		}

		.faq-cat-title {
			font-size: 12px;
		}
	}

	.faq-empty {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 12px;
		padding: 64px 0;
		text-align: center;
		color: var(--muted);
		font-size: 15px;
	}

	.faq-empty svg {
		color: var(--muted-soft);
	}

	.faq-empty-clear {
		padding: 10px 20px;
		border: 1px solid var(--hairline);
		border-radius: 8px;
		background: transparent;
		color: var(--ink);
		font-size: 14px;
		font-weight: 500;
		cursor: pointer;
		transition: border-color 160ms ease, color 160ms ease;
	}

	.faq-empty-clear:hover {
		border-color: var(--primary);
		color: var(--primary);
	}
</style>
