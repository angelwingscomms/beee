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
</script>

<svelte:head>
	<title>FAQ — BEEE Spectacular Chess Championship Abuja 2026</title>
	<meta name="description" content="Frequently asked questions about the BEEE Spectacular Chess Championship Abuja 2026 and T.E.A.M.U.P. Development Programme — registration, participation, awards, and more." />
</svelte:head>

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
				<FaqAccordion qs={c.qs} category_label={c.n} />
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
	}

	.container {
		width: min(1200px, calc(100% - 48px));
		margin: 0 auto;
	}

	.faq-toolbar {
		display: flex;
		flex-direction: column;
		gap: 20px;
		padding-bottom: 40px;
	}

	.faq-list {
		padding-bottom: 16px;
	}

	.faq-category {
		margin-bottom: 8px;
	}

	.faq-category:last-child {
		margin-bottom: 0;
	}

	.faq-cat-title {
		margin: 0 0 4px;
		color: var(--ink);
		font-family: var(--font-display);
		font-size: 22px;
		font-weight: 500;
		letter-spacing: -0.01em;
		line-height: 1.3;
	}

	.faq-empty {
		padding: 64px 0;
		text-align: center;
		color: var(--muted);
		font-size: 15px;
	}

	@media (max-width: 767px) {
		.faq-toolbar {
			padding-bottom: 24px;
		}
	}
</style>
