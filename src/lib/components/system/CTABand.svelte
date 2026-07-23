<script lang="ts">
  import { revealLines, revealFade } from '$lib/motion/reveal';

  let {
    title = 'Every platform unlocks at registration.',
    sub = 'One fee. The whole journey. ₦15,000.',
    ctaLabel = 'Register your child',
    ctaHref = '/register'
  }: { title?: string; sub?: string; ctaLabel?: string; ctaHref?: string } = $props();
</script>

<section class="rv-field-night rv-section cta-band">
  <div class="rv-wrap cta-band-inner">
    <h2 class="rv-d3" use:revealLines>{title}</h2>
    <p class="rv-body cta-band-sub" use:revealFade>{sub}</p>
    <div use:revealFade>
      <a href={ctaHref} class="rv-btn rv-btn--beam rv-btn--big felt">{ctaLabel}</a>
    </div>
  </div>
</section>

<style>
  .cta-band-inner {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: var(--space-3);
  }

  .cta-band-sub {
    color: var(--dusk-body);
  }
</style>
