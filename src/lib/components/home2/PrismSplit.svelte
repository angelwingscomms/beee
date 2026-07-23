<script lang="ts">
  import { onMount } from 'svelte';
  import gsap from 'gsap';
  import { ScrollTrigger } from 'gsap/ScrollTrigger';
  import { REDUCED } from '$lib/motion/constants';
  import { glActive, glSection } from '$lib/gl/store';

  const PILLARS = [
    { letter: 't', name: 'Technology', line: 'SOLVE REAL PROBLEMS WITH REAL TOOLS' },
    { letter: 'e', name: 'Enterprise', line: 'INITIATIVE, INNOVATION, PRACTICAL THINKING' },
    { letter: 'a', name: 'Art', line: 'CREATIVITY, COMMUNICATION, DESIGN' },
    { letter: 'm', name: 'Mentorship', line: 'LEARN BESIDE PEOPLE WORTH COPYING' },
    { letter: 'u', name: 'Upskill', line: 'LEADERSHIP, TEAMWORK, LIFE SKILLS' }
  ];

  let section: HTMLElement | undefined = $state();
  let l1: HTMLElement | undefined = $state();
  let l2: HTMLElement | undefined = $state();
  let labels: HTMLElement[] = [];
  let exitLink: HTMLElement | undefined = $state();

  onMount(() => {
    if (REDUCED() || !section) return;
    const tl = gsap.timeline({
      scrollTrigger: { trigger: section, start: 'top top', end: 'bottom bottom', scrub: 0.5 }
    });
    if (l1) tl.fromTo(l1, { opacity: 0, y: 24 }, { opacity: 1, y: 0, ease: 'none' }, 0.05);
    if (l2) tl.fromTo(l2, { opacity: 0, y: 24 }, { opacity: 1, y: 0, ease: 'none' }, 0.3);
    labels.forEach((el, i) => {
      if (!el) return;
      tl.fromTo(el, { opacity: 0, y: 20 }, { opacity: 1, y: 0, ease: 'none' }, 0.45 + i * 0.07);
    });
    if (exitLink) tl.fromTo(exitLink, { opacity: 0 }, { opacity: 1, ease: 'none' }, 0.85);
  });
</script>

<section id="split" bind:this={section} class="rv-field-night split" use:glSection={'split'}>
  <div class="split-sticky">
    <p class="rv-micro split-eyebrow">
      <span class="split-eyebrow-full">TEAMUP™ · TECHNOLOGY · ENTERPRISE · ART · MENTORSHIP · UPSKILL</span>
      <span class="split-eyebrow-short">TEAMUP™</span>
    </p>
    <h2 class="rv-d2 split-title">
      <span bind:this={l1} class="split-line">One game in.</span>
      <span bind:this={l2} class="split-line">Five directions out.</span>
    </h2>

    <div class="split-hex-wrap">
      <svg class="split-hex" viewBox="0 0 96 96" width="72" height="72" aria-hidden="true">
        <polygon
          points="94,48 71,87.84 25,87.84 2,48 25,8.16 71,8.16"
          fill="none"
          stroke="color-mix(in srgb, var(--dusk-ink) 40%, transparent)"
          stroke-width="1.5"
        />
      </svg>
      {#if !$glActive}
        <div class="split-rays" aria-hidden="true">
          {#each [-24, -12, 0, 12, 24] as angle}
            <span class="split-ray" style:transform={`translateY(-50%) rotate(${angle}deg)`}></span>
          {/each}
        </div>
      {/if}
    </div>

    <div class="split-labels">
      {#each PILLARS as pillar, i (pillar.letter)}
        <div class="split-label" bind:this={labels[i]}>
          <span class="split-chip" style:background={`var(--spec-${pillar.letter})`}>{pillar.letter.toUpperCase()}</span>
          <p class="rv-title">{pillar.name}</p>
          <p class="rv-micro split-line-desc">{pillar.line}</p>
        </div>
      {/each}
    </div>

    <a bind:this={exitLink} href="/teamup" class="rv-micro rv-link split-exit">EXPLORE TEAMUP →</a>
  </div>
</section>

<style>
  .split {
    height: 300vh;
    position: relative;
  }

  .split-sticky {
    position: sticky;
    top: 0;
    height: 100svh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    gap: var(--space-4);
    padding-inline: var(--margin-x);
  }

  .split-eyebrow { color: var(--honey); }
  .split-eyebrow-short { display: none; }
  @media (--sm-down) {
    .split-eyebrow-full { display: none; }
    .split-eyebrow-short { display: inline; }
  }

  .split-title {
    display: flex;
    flex-direction: column;
  }

  .split-line + .split-line {
    margin-top: 4px;
  }

  .split-hex-wrap {
    position: relative;
    margin-block: var(--space-4);
  }

  .split-rays {
    position: absolute;
    inset: 0;
  }

  .split-ray {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 40vw;
    max-width: 480px;
    height: 1px;
    transform-origin: left center;
    background: linear-gradient(90deg, currentColor, transparent);
    opacity: 0.3;
  }

  .split-labels {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: var(--space-5);
    max-width: 1000px;
  }

  @media (--sm-down) {
    .split-labels { flex-direction: column; align-items: center; }
  }

  .split-label {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    max-width: 160px;
  }

  .split-chip {
    width: 32px;
    height: 32px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #0A0F1A;
    font-family: var(--font-mono);
    font-weight: 700;
    font-size: 14px;
  }

  .split-line-desc {
    color: var(--dusk-body);
  }

  .split-exit {
    color: var(--honey);
    margin-top: var(--space-3);
  }

  @media (prefers-reduced-motion: reduce) {
    .split { height: auto; }
    .split-sticky { position: static; height: auto; padding-block: var(--section-pad); }
  }
</style>
