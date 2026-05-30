<script lang="ts">
	let { href, children }: { href: string; children?: import('svelte').Snippet } = $props();
</script>

<a {href} class="button-primary fixed right-5 top-5 z-40">
	{#if children}{@render children()}{/if}
</a>
