<script lang="ts">
  import { onMount } from 'svelte';
  import gsap from 'gsap';
  import { ScrollTrigger } from 'gsap/ScrollTrigger';
  import { revealLines, revealFade, revealChildren } from '$lib/motion/reveal';
  import { REDUCED } from '$lib/motion/constants';
  import { getLenis } from '$lib/motion/smooth-scroll';
  import { glActive, glSection } from '$lib/gl/store';

  let section: HTMLElement | undefined = $state();
  let img: HTMLImageElement | undefined = $state();
  let h1: HTMLElement | undefined = $state();
  let introRan = $state(false);

  onMount(() => {
    introRan = typeof sessionStorage !== 'undefined' && sessionStorage.getItem('beee_intro') === '1';

    if (!REDUCED() && section && img) {
      gsap.fromTo(
        img,
        { scale: 1.08 },
        {
          scale: 1.0,
          ease: 'none',
          scrollTrigger: { trigger: section, start: 'top top', end: 'bottom top', scrub: 0.6 }
        }
      );
    }
  });

  function scrollToManifesto() {
    const target = document.querySelector('#manifesto');
    if (getLenis()) getLenis()?.scrollTo('#manifesto');
    else target?.scrollIntoView({ behavior: 'smooth' });
  }
</script>

<svelte:head>
  <link rel="preload" as="image" href="/images/rv/hero-stadium.webp" fetchpriority="high" />
</svelte:head>

<section id="hero" bind:this={section} class="rv-field-night hero" use:glSection={'hero'}>
  <div class="hero-bg">
    <img
      bind:this={img}
      src="/images/rv/hero-stadium.webp"
      alt="Empty national stadium at golden hour with a single chess table at the centre of the pitch"
      fetchpriority="high"
      decoding="async"
      width="2560"
      height="1440"
    />
    <div class="hero-scrim"></div>
    {#if !$glActive}
      <div class="rv-beam-fallback"></div>
    {/if}
  </div>

  <div class="rv-wrap hero-content">
    <p class="rv-micro hero-eyebrow">
      <span class="hero-eyebrow-full">BEEE SPECTACULAR CHESS CHAMPIONSHIP · ABUJA · OCTOBER 2026</span>
      <span class="hero-eyebrow-short">ABUJA · OCTOBER 2026</span>
    </p>
    <h1
      bind:this={h1}
      class="rv-d1 hero-title"
      use:revealLines={{ delay: introRan ? 0 : 0.2 }}
    >
      The stadium<br />is <span class="rv-note">waiting</span><br />for your child.
    </h1>
    <p class="rv-body-lg hero-sub" use:revealFade={{ delay: 0.5 }}>
      Chess, AI coaching, mentorship and a grand finale on the floor of the National Stadium. For ages 10 to 14. No experience needed.
    </p>
    <div class="hero-cta" use:revealFade={{ delay: 0.65 }}>
      <a href="/register" class="rv-btn rv-btn--beam rv-btn--big felt">Take your seat</a>
      <button class="rv-btn rv-btn--ghost felt" aria-label="Scroll to the next section" onclick={scrollToManifesto}>
        Walk in ↓
      </button>
    </div>
  </div>

  <div class="hero-stats" use:revealChildren>
    <div class="rv-micro hero-stat">AGES 10–14</div>
    <div class="rv-micro hero-stat">₦15,000 ALL-IN</div>
    <div class="rv-micro hero-stat">COACHING FROM JUL 28</div>
    <div class="rv-micro hero-stat">FINALE · NATIONAL STADIUM · OCT 2026</div>
  </div>
</section>

<style>
  .hero {
    min-height: 100svh;
    position: relative;
    overflow: hidden;
  }

  .hero-bg {
    position: absolute;
    inset: 0;
    z-index: 0;
  }

  .hero-bg img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .hero-scrim {
    position: absolute;
    inset: 0;
    background: rgba(10, 15, 26, 0.5);
  }

  .hero-content {
    position: relative;
    z-index: var(--z-content);
    padding-top: 28svh;
    padding-bottom: 140px;
  }

  @media (--sm-down) {
    .hero-content { padding-top: 24svh; }
  }

  .hero-eyebrow {
    color: var(--honey);
  }

  .hero-eyebrow-short { display: none; }

  @media (--sm-down) {
    .hero-eyebrow-full { display: none; }
    .hero-eyebrow-short { display: inline; }
  }

  .hero-title {
    margin-top: var(--space-3);
  }

  .hero-sub {
    color: var(--dusk-body);
    margin-top: var(--space-4);
  }

  .hero-cta {
    display: flex;
    gap: 16px;
    margin-top: var(--space-5);
    flex-wrap: wrap;
  }

  .hero-stats {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: var(--z-content);
    display: flex;
    border-top: 1px solid color-mix(in srgb, var(--dusk-ink) 18%, transparent);
  }

  .hero-stat {
    flex: 1;
    color: var(--dusk-body);
    padding-block: 20px;
    padding-inline: var(--margin-x);
    border-left: 1px solid color-mix(in srgb, var(--dusk-ink) 18%, transparent);
  }
  .hero-stat:first-child { border-left: none; }

  @media (--sm-down) {
    .hero-stats { flex-wrap: wrap; }
    .hero-stat { flex: 0 0 50%; border-left: none; border-top: 1px solid color-mix(in srgb, var(--dusk-ink) 18%, transparent); }
    .hero-stat:nth-child(-n+2) { border-top: none; }
  }
</style>
