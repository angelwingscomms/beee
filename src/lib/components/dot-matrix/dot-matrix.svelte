<script lang="ts">
  import type { DotMatrixProps, DotMatrixCommonProps } from './types.js';

  let { ref, class: className, children, ...rest }: DotMatrixProps & { children?: import('svelte').Snippet } = $props();
</script>

<div bind:this={ref} class={className} {...rest}>
  {#if children}{@render children()}{/if}
</div>
