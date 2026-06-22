<script lang="ts">
  import { onMount } from 'svelte';
  import { animate, spring } from 'motion';

  let x = $state(-100);
  let y = $state(-100);
  let hovered = $state(false);
  let el: HTMLDivElement | undefined = $state(undefined);

  onMount(() => {
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isTouch || reduced) return;

    const spring_x = spring({ stiffness: 350, damping: 28 });
    const spring_y = spring({ stiffness: 350, damping: 28 });
    spring_x.on('update', (v) => { x = v; });
    spring_y.on('update', (v) => { y = v; });

    const onMove = (e: MouseEvent) => {
      spring_x.set(e.clientX - 12);
      spring_y.set(e.clientY - 12);
    };
    const onOver = (e: MouseEvent) => {
      const t = (e.target as HTMLElement)?.closest?.('a, button, [role="button"]');
      hovered = !!t;
    };
    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseover', onOver);

    return () => {
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
