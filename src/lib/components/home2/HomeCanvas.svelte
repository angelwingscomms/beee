<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { glState, glActive } from '$lib/gl/store';
  import type { GlHandle } from '$lib/gl';

  let canvas: HTMLCanvasElement | undefined = $state();
  let gl: GlHandle = null;
  let unsub: () => void = () => {};

  onMount(() => {
    let cancelled = false;
    (async () => {
      const { createGl } = await import('$lib/gl');
      if (!canvas || cancelled) return;
      gl = await createGl(canvas);
      if (!gl) {
        glActive.set(false);
        return;
      }
      glActive.set(true);
      unsub = glState.subscribe((s) => gl?.setState(s.section, s.progress));
    })();

    return () => {
      cancelled = true;
    };
  });

  onDestroy(() => {
    unsub();
    gl?.dispose();
  });
</script>

<canvas bind:this={canvas} class="gl" aria-hidden="true"></canvas>

<style>
  .gl {
    position: fixed;
    inset: 0;
    z-index: var(--z-gl);
    pointer-events: none;
    mix-blend-mode: screen;
    width: 100%;
    height: 100%;
  }
</style>
