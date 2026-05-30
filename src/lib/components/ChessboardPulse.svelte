<script lang="ts">
  // import { onMount } from 'svelte';
  // import { animate, stagger } from 'animejs';
  // import type { JSAnimation } from 'animejs';

  // let r: HTMLDivElement[] = $state([]);
  // let a: JSAnimation | undefined = $state();

  // onMount(() => {
  //   a = animate(r, {
  //     opacity: [
  //       { to: 1, duration: 800, ease: 'outQuad' },
  //       { to: 0, duration: 800, ease: 'inQuad' },
  //     ],
  //     delay: stagger(1200),
  //     loop: true,
  //   });
  //   return () => a?.cancel();
  // });
</script>

<div class="flex justify-center">
  {#each Array(8) as _, i}
    <div
      class="w-10 h-10 md:w-12 md:h-12"
      style="{i % 2 === 0 ? 'background-color: var(--primary)' : 'background-color: transparent; border: 1px solid var(--primary)'}"
    ></div>
  {/each}
</div>
