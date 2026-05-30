<script lang="ts">
  import { onMount } from 'svelte';
  import { animate, stagger } from 'animejs';
  import type { JSAnimation } from 'animejs';

  let r: HTMLDivElement[] = $state([]);
  let a: JSAnimation | undefined = $state();

  onMount(() => {
    a = animate(r, {
      opacity: { from: 1, to: 0 },
      delay: stagger(120, { ease: 'inOutQuad' }),
      duration: 800,
      alternate: true,
      loop: true,
      ease: 'inOutQuad',
    });
    return () => a?.cancel();
  });
</script>

<div class="flex gap-[3px] justify-center">
  {#each Array(8) as _, i}
    <div
      bind:this={r[i]}
      class="w-5 h-5 md:w-6 md:h-6 rounded-sm"
      style="background-color: var(--primary)"
    ></div>
  {/each}
</div>
