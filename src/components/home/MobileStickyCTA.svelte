<script lang="ts">
  import { inView } from 'motion';
  let visible = $state(false);
  let cta_ref: HTMLDivElement;

  $effect(() => {
    if (!cta_ref) return;
    const cleanup = inView(cta_ref, () => {
      // This triggers the entrance animation when hero leaves viewport
      // We watch for the sticky CTA itself entering view from below
      visible = true;
      return () => { visible = false; };
    }, { amount: 0.1 });
    return () => cleanup?.();
  });

  // Also show when user scrolls past 80vh
  let ticking = false;
  $effect(() => {
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          visible = window.scrollY > window.innerHeight * 0.7;
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  });
</script>

<div class="sticky-cta" class:visible>
  <div bind:this={cta_ref} class="sticky-inner">
    <span>Join BEEE Today</span>
    <a class="button-primary" href="/register">Register Child</a>
  </div>
</div>

<style>
  .sticky-cta {
    display: none;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: var(--sticky-cta-z, 90);
    background: var(--surface-dark);
    border-top: 1px solid rgba(255, 255, 255, 0.10);
    padding: 12px calc(max(16px, (100vw - 1180px) / 2));
    box-shadow: 0 -8px 30px rgba(0, 0, 0, 0.3);
  }

  .sticky-cta.visible {
    display: block;
  }

  .sticky-inner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    max-width: 1180px;
    margin: 0 auto;
  }

  .sticky-inner span {
    color: var(--on-dark);
    font-weight: 600;
    font-size: 15px;
  }

  @media (min-width: 769px) {
    .sticky-cta {
      display: none !important;
    }
  }
</style>
