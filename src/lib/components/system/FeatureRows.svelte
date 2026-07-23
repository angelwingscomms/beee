<script lang="ts">
  import { revealChildren } from '$lib/motion/reveal';

  let { items }: { items: { index: string; title: string; body?: string }[] } = $props();
</script>

<div class="feature-rows" use:revealChildren>
  {#each items as item (item.index)}
    <div class="rv-row">
      <span class="rv-micro feature-index">{item.index}</span>
      <div>
        <p class="rv-title">{item.title}</p>
        {#if item.body}<p class="rv-body">{item.body}</p>{/if}
      </div>
    </div>
  {/each}
</div>

<style>
  .feature-index {
    color: var(--beam);
  }
</style>
