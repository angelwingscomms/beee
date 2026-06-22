<script lang="ts">
  import { onMount } from 'svelte';
  import { animate } from 'motion';

  let x = $state(-100);
  let y = $state(-100);
  let hovered = $state(false);

  onMount(() => {
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isTouch || reduced) return;

    let mx = -100, my = -100;
    let raf: number;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX - 12;
      my = e.clientY - 12;
      if (x < 0) { x = mx; y = my; }
    };
    const onOver = (e: MouseEvent) => {
      const t = (e.target as HTMLElement)?.closest?.('a, button, [role="button"]');
      hovered = !!t;
    };

    function tick() {
      x += (mx - x) * 0.18;
      y += (my - y) * 0.18;
      raf = requestAnimationFrame(tick);
    }
    raf = requestAnimationFrame(tick);

    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseover', onOver);

    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover', onOver);
    };
  });
</script>

{#if x >= 0}
  <div
    bind:this={el}
    class="cursor"
    class:cursor-hover={hovered}
    style="transform: translate({x}px, {y}px)"
  ></div>
{/if}

<style>
  .cursor {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 99999;
    width: 24px;
    height: 24px;
    border: 2px solid rgba(245, 184, 75, 0.7);
    border-radius: 999px;
    background: rgba(245, 184, 75, 0.08);
    pointer-events: none;
    transition: width 240ms ease, height 240ms ease, border-color 240ms ease, background 240ms ease;
  }

  .cursor-hover {
    width: 40px;
    height: 40px;
    border-color: var(--gold);
    background: rgba(245, 184, 75, 0.12);
  }
</style>
