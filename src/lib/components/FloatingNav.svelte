<script lang="ts">
	import RegisterBtn from '$lib/components/RegisterBtn.svelte';
	let { href, children }: { href: string; children?: import('svelte').Snippet } = $props();
</script>

<RegisterBtn {href} class="fixed right-5 top-5 z-40">
	{#if children}{@render children()}{/if}
</RegisterBtn>
