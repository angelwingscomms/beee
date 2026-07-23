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
    const style = document.createElement('style');
    style.textContent = '*,*::before,*::after{cursor:none!important}';
    document.head.appendChild(style);

    const onMove = (e: MouseEvent) => {
      mx = e.clientX - 5;
      my = e.clientY - 5;
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
      style.remove();
    };
  });
</script>

{#if x >= 0}
  <div
    class="cursor"
    class:cursor-hover={hovered}
    style="transform: translate({x}px, {y}px)"
  ></div>
{/if}

<style>
  .cursor {
    position: fixed; top: 0; left: 0; z-index: 99999;
    width: 10px; height: 10px; border-radius: 999px;
    background: #F2EFE8; mix-blend-mode: difference;
    pointer-events: none;
    transition: transform 0s, scale var(--dur-micro) var(--ease-out);
  }
  .cursor-hover { scale: 2.6; }
</style>
