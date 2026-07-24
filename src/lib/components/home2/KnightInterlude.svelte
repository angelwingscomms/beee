<script lang="ts">
  import { onMount } from 'svelte';
  import gsap from 'gsap';
  import { ScrollTrigger } from 'gsap/ScrollTrigger';
  import { REDUCED } from '$lib/motion/constants';
  import { glActive, glSection } from '$lib/gl/store';
  import { KNIGHT_PATHS } from '$lib/gl/knight';

  let section: HTMLElement | undefined = $state();
  let caption: HTMLElement | undefined = $state();

  onMount(() => {
    if (REDUCED() || !section || !caption) return;
    gsap.timeline({
      scrollTrigger: { trigger: section, start: 'top top', end: 'bottom bottom', scrub: 0.5 }
    })
      .fromTo(caption, { opacity: 0 }, { opacity: 1, ease: 'none' }, 0.45)
      .to(caption, { opacity: 0, ease: 'none' }, 0.75);
  });
</script>

<section id="interlude" bind:this={section} class="rv-field-night interlude" use:glSection={'interlude'}>
  <div class="interlude-sticky">
    {#if !$glActive}
      <svg class="interlude-fallback" viewBox="0 0 50 50" aria-hidden="true">
        {#each KNIGHT_PATHS as d (d)}
          <path {d} fill="currentColor" />
        {/each}
      </svg>
    {/if}
    <p bind:this={caption} class="rv-micro interlude-caption">THE GAME IS THE VEHICLE.</p>
  </div>
</section>

<style>
  .interlude {
    height: 250vh;
    position: relative;
  }

  .interlude-sticky {
    position: sticky;
    top: 0;
    height: 100svh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: var(--space-5);
  }

  .interlude-caption {
    color: var(--dusk-body);
    letter-spacing: 0.2em;
    text-align: center;
  }

  .interlude-fallback {
    height: 40vh;
    color: var(--dusk-ink);
    opacity: 0.12;
  }

  @media (prefers-reduced-motion: reduce) {
    .interlude { height: auto; }
    .interlude-sticky { position: static; height: auto; padding-block: var(--section-pad); }
  }
</style>
