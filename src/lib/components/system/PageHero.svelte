<script lang="ts">
  import { revealLines, revealFade } from '$lib/motion/reveal';

  let {
    eyebrow,
    title,
    sub = '',
    field = 'cloud'
  }: { eyebrow: string; title: string; sub?: string; field?: 'cloud' | 'night' } = $props();
</script>

<section class="rv-section page-hero rv-field-{field}">
  <div class="rv-wrap">
    <p class="rv-micro page-hero-eyebrow">{eyebrow}</p>
    <h1 class="rv-d2" use:revealLines>{@html title}</h1>
    {#if sub}
      <p class="rv-body-lg page-hero-sub" use:revealFade>{sub}</p>
    {/if}
  </div>
</section>

<style>
  .page-hero {
    padding-top: calc(var(--section-pad) + 72px);
  }

  .page-hero-eyebrow {
    color: var(--beam);
  }

  .rv-field-night .page-hero-eyebrow {
    color: var(--honey);
  }

  .page-hero-sub {
    margin-top: var(--space-4);
  }

  .rv-field-night .page-hero-sub {
    color: var(--dusk-body);
  }
</style>
