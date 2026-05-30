<script lang="ts">
  import { onMount } from 'svelte';
  import { animate, stagger } from 'animejs';
  import type { JSAnimation } from 'animejs';

  let r: HTMLDivElement[] = $state([]);
  let a: JSAnimation | undefined = $state();

  onMount(() => {
    a = animate(r, {
      opacity: [
        { to: 1, duration: 800, ease: 'outQuad' },
        { to: 0, duration: 800, ease: 'inQuad' },
      ],
      delay: stagger(1200),
      loop: true,
    });
    return () => a?.cancel();
  });
</script>

<div class="flex justify-center">
  {#each Array(8) as _, i}
    <div
      bind:this={r[i]}
      class="w-5 h-5 md:w-6 md:h-6 opacity-0"
      style="background-color: var(--primary)"
    ></div>
  {/each}
</div>
