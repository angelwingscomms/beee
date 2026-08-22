<script lang="ts">
	let { children } = $props();
</script>

<div class="docs">
	<div class="docs-inner">
		{@render children()}
	</div>
</div>

<style>
	.docs {
		background: var(--canvas);
		padding: 112px 0 80px;
		min-height: 100dvh;
	}
	.docs-inner {
		width: min(820px, calc(100% - 48px));
		margin: 0 auto;
	}
	:global(.docs h1) {
		font-family: var(--font-hero);
		font-size: clamp(2.2rem, 5vw, 3.2rem);
		font-weight: 700;
		letter-spacing: -0.03em;
		color: var(--ink);
		margin: 0 0 12px;
	}
	:global(.docs .docs-lead) {
		color: var(--body);
		font-size: 17px;
		line-height: 1.7;
		margin: 0 0 44px;
	}
	:global(.docs h2) {
		font-family: var(--font-hero);
		font-size: 1.4rem;
		font-weight: 600;
		color: var(--ink);
		margin: 40px 0 12px;
	}
	:global(.docs p),
	:global(.docs li) {
		font-size: 16px;
		line-height: 1.7;
		color: var(--body);
		margin: 0 0 12px;
	}
	:global(.docs ul) {
		padding-left: 20px;
	}
	:global(.docs a) {
		color: var(--primary);
		text-underline-offset: 3px;
	}
	:global(.docs code) {
		font-family: var(--font-code);
		font-size: 14px;
		background: color-mix(in srgb, var(--ink) 6%, transparent);
		padding: 2px 5px;
		border-radius: 4px;
		color: var(--ink);
	}
	:global(.docs table) {
		width: 100%;
		border-collapse: collapse;
		margin: 16px 0;
		font-size: 15px;
	}
	:global(.docs th),
	:global(.docs td) {
		text-align: left;
		padding: 10px 12px;
		border-bottom: 1px solid color-mix(in srgb, var(--ink) 12%, transparent);
		color: var(--body);
	}
	:global(.docs th) {
		color: var(--ink);
		font-weight: 600;
	}
	:global(.docs .docs-toc) {
		list-style: none;
		padding: 0;
		margin: 0 0 40px;
		display: grid;
		gap: 8px;
	}
</style>
