<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	let { href, children }: { href: string; children?: import('svelte').Snippet } = $props();
</script>

<Button {href} class="fixed right-5 top-5 z-40">
	{#if children}{@render children()}{/if}
</Button>
