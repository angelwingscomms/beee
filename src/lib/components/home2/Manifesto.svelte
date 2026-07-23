<script lang="ts">
  import { onMount } from 'svelte';
  import gsap from 'gsap';
  import { ScrollTrigger } from 'gsap/ScrollTrigger';
  import { revealFade } from '$lib/motion/reveal';
  import { REDUCED } from '$lib/motion/constants';
  import { glSection } from '$lib/gl/store';

  let section: HTMLElement | undefined = $state();
  let l1: HTMLElement | undefined = $state();
  let l2: HTMLElement | undefined = $state();

  onMount(() => {
    if (REDUCED() || !section || !l1 || !l2) return;
    gsap.timeline({
      scrollTrigger: { trigger: section, start: 'top top', end: 'bottom bottom', scrub: 0.5 }
    })
      .to(l1, { opacity: 0.25, y: -24, ease: 'none' }, 0)
      .to(l2, { opacity: 1, y: 0, ease: 'none' }, 0.5);
  });
</script>

<section id="manifesto" bind:this={section} class="rv-field-night manifesto" use:glSection={'manifesto'}>
  <div class="manifesto-sticky">
    <div class="manifesto-lines">
      <p bind:this={l1} class="rv-d2 manifesto-line">Most championships end with a trophy.</p>
      <p bind:this={l2} class="rv-d2 manifesto-line manifesto-line--2">This one begins with a journey.</p>
    </div>
    <p class="rv-micro manifesto-caption" use:revealFade>MORE THAN A CHESS CHAMPIONSHIP</p>
  </div>
</section>

<style>
  .manifesto {
    height: 160vh;
    position: relative;
  }

  .manifesto-sticky {
    position: sticky;
    top: 0;
    height: 100svh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    gap: var(--space-4);
  }

  .manifesto-lines {
    position: relative;
  }

  .manifesto-line {
    max-width: 20ch;
  }

  .manifesto-line--2 {
    opacity: 0.15;
    position: absolute;
    inset: 0;
  }

  .manifesto-caption {
    color: var(--honey);
    margin-top: var(--space-5);
  }

  @media (prefers-reduced-motion: reduce) {
    .manifesto { height: auto; }
    .manifesto-sticky { position: static; height: auto; padding-block: var(--section-pad); }
    .manifesto-line, .manifesto-line--2 { opacity: 1; position: static; }
  }
</style>
