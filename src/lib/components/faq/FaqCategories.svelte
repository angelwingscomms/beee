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
		border: 1px solid var(--hairline);
		border-radius: var(--radius-pill);
		background: transparent;
		color: var(--ink);
		font-family: var(--font-mono);
		font-size: var(--fs-micro);
		font-weight: 500;
		letter-spacing: var(--ls-mono);
		text-transform: uppercase;
		line-height: 1.4;
		white-space: nowrap;
		cursor: pointer;
		transition: background var(--dur-micro) var(--ease-out), color var(--dur-micro) var(--ease-out), border-color var(--dur-micro) var(--ease-out);
	}

	.tab:hover {
		border-color: var(--beam);
		color: var(--beam);
	}

	.tab-active {
		border-color: var(--beam);
		background: transparent;
		color: var(--beam);
	}

	.tab-active:hover {
		border-color: var(--beam-active);
		color: var(--beam-active);
	}

	@media (--sm-down) {
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
