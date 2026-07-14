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
	<title>FAQ — BEEE Spectacular Chess Championship Abuja 2026</title>
	<meta name="description" content="Frequently asked questions about the BEEE Spectacular Chess Championship Abuja 2026 and T.E.A.M.U.P. Development Programme — registration, participation, awards, and more." />
</svelte:head>

<!-- SEO FAQPage schema -->
{@html '<script type="application/ld+json">' + faq_schema + '</script>'}

<div class="faq-page">
	<FaqHero />

	<div class="faq-toolbar container">
		<FaqSearch bind:value={search_q} />
		<FaqCategories cs={all_cs} bind:active={active_cat} />
	</div>

	<section class="faq-list container">
		{#each filtered as c}
			<div class="faq-category">
				<h2 class="faq-cat-title" id="cat-{c.i}">{c.n}</h2>
				<FaqAccordion qs={c.qs} category_label={c.n} cat_id={c.i} />
			</div>
		{/each}

		{#if filtered.length === 0}
			<div class="faq-empty">
				<p>No questions match your search. Try a different term or clear the filters.</p>
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

	@media (max-width: 767px) {
		.faq-list {
			gap: 20px;
		}
	}

	.faq-cat-title {
		margin: 0 0 4px;
		color: var(--muted);
		font-family: var(--font-hero);
		font-size: 13px;
		font-weight: 600;
		letter-spacing: 0.12em;
		text-transform: uppercase;
		line-height: 1.3;
	}

	@media (max-width: 767px) {
		.faq-page {
			gap: 48px;
			padding-bottom: 96px;
		}
	}

	.faq-empty {
		padding: 64px 0;
		text-align: center;
		color: var(--muted);
		font-size: 15px;
	}


</style>
