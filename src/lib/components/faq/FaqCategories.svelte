<script lang="ts">
	import type { FaqC } from '$lib/data/faq';

	let { cs, active = $bindable('all') }: { cs: FaqC[]; active?: string } = $props();
</script>

<div class="faq-tabs" role="tablist" aria-label="FAQ categories">
	<button
		class="tab"
		class:tab-active={active === 'all'}
		role="tab"
		aria-selected={active === 'all'}
		onclick={() => active = 'all'}
	>All</button>
	{#each cs as c}
		<button
			class="tab"
			class:tab-active={active === c.i}
			role="tab"
			aria-selected={active === c.i}
			onclick={() => active = c.i}
		>{c.n}</button>
	{/each}
</div>

<style>
	.faq-tabs {
		display: flex;
		flex-wrap: wrap;
		gap: 8px;
	}

	.tab {
		display: inline-flex;
		align-items: center;
		padding: 8px 16px;
		border: none;
		border-radius: 8px;
		background: var(--surface-card);
		color: var(--ink);
		font-size: 13px;
		font-weight: 500;
		line-height: 1.4;
		white-space: nowrap;
		cursor: pointer;
		transition: background 160ms ease, color 160ms ease;
	}

	.tab:hover {
		background: color-mix(in srgb, var(--surface-card) 88%, var(--primary));
	}

	.tab-active {
		background: var(--primary);
		color: var(--on-primary);
	}

	.tab-active:hover {
		background: var(--primary-active);
	}

	@media (max-width: 767px) {
		.faq-tabs {
			overflow-x: auto;
			flex-wrap: nowrap;
			padding-bottom: 4px;
			-webkit-overflow-scrolling: touch;
			scrollbar-width: none;
		}

		.faq-tabs::-webkit-scrollbar {
			display: none;
		}
	}
</style>
