<script lang="ts">
  import { onMount } from 'svelte';
  import RegisterBtn from '$lib/components/RegisterBtn.svelte';

  let hero: HTMLElement | undefined = $state();
  let visual: HTMLElement | undefined = $state();

  onMount(() => {
    requestAnimationFrame(() => hero?.classList.add('is-visible'));

    if (!matchMedia('(prefers-reduced-motion: reduce)').matches) {
      let ticking = false;
      const onScroll = () => {
        if (ticking) return;
        ticking = true;
        requestAnimationFrame(() => {
          const y = scrollY;
          if (visual) visual.style.transform = `translateY(${y * 0.6}px)`;
          ticking = false;
        });
      };
      addEventListener('scroll', onScroll, { passive: true });
      return () => removeEventListener('scroll', onScroll);
    }
  });
</script>

<section class="hero" bind:this={hero} aria-label="Championship hero">
  <div class="hero__container">
    <div class="hero__content">
      <span class="hero__kicker">AGES 10–14 · ABUJA SCHOOLS · 2026</span>
      <img class="hero__wordmark" src="/logo-wm.svg" alt="BEEE" width="180" height="48" />
      <h1 class="hero__headline">Building Leaders<br><span class="hero__gold">Not Just Winners</span></h1>
      <p class="hero__subheadline">The BEEE® Spectacular Chess Championship — a 5-month journey of competitive chess, leadership mentorship, and personal growth for students aged 10 to 14 across Abuja.</p>
      <ul class="hero__stats">
        <li>Starts July 20, 2026</li>
        <li>Grand Finale · Oct 2026</li>
        <li>Schools-Only Entry</li>
      </ul>
      <div class="hero__cta">
        <RegisterBtn href="/register" class="hero__reg-btn">Register Now</RegisterBtn>
        <a href="#journey" class="btn btn--secondary">Explore the Journey</a>
      </div>
      <p class="hero__micro">Chess is not the destination. It is the platform.</p>
    </div>
    <div class="hero__visual" bind:this={visual}>
      <img class="hero__photo" src="/images/hero.png" alt="Young chess player from an Abuja school competing in the BEEE Spectacular Chess Championship." width="720" height="880" fetchpriority="high" />

    </div>
  </div>
  <div class="hero__trust">
    <span>Instagram @thebeeeproject</span>
    <span>X @beeeproject</span>
    <a href="mailto:info@beeeproject.com">info@beeeproject.com</a>
    <a href="tel:+2349026824439">+234 902 682 4439</a>
  </div>
</section>

<style>
  .hero {
    position: relative;
    overflow: hidden;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background: #fff;
    --gold: var(--primary);
    --gold-hover: var(--primary-active);
    --ease-out: cubic-bezier(.16,1,.3,1);
  }

  .hero__container {
    position: relative;
    z-index: 1;
    max-width: 1280px;
    margin: 0 auto;
    padding: 0 80px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 48px;
    align-items: center;
    min-height: calc(100vh - 80px);
  }

  .hero__kicker {
    display: inline-block;
    background: var(--gold);
    color: #000;
    font: 700 12px/1 var(--font-body);
    letter-spacing: .08em;
    text-transform: uppercase;
    padding: 8px 16px;
    border-radius: 999px;
  }

  .hero__wordmark {
    height: 32px;
    width: auto;
    display: block;
    margin: 20px 0;
  }

  .hero__headline {
    font-family: var(--font-display);
    font-weight: 800;
    font-size: clamp(2.25rem, 1.2rem + 3.5vw, 4rem);
    line-height: 1.05;
    color: var(--ink);
    margin: 0 0 16px;
  }

  .hero__gold {
    color: var(--gold);
  }

  .hero__subheadline {
    max-width: 60ch;
    font-size: 1.125rem;
    line-height: 1.6;
    color: var(--body);
    margin: 0 0 32px;
  }

  .hero__stats {
    display: flex;
    flex-wrap: wrap;
    gap: 0;
    list-style: none;
    padding: 0;
    margin: 0 0 40px;
    font-size: 14px;
    color: var(--body);
  }

  .hero__stats li {
    padding: 0 24px;
    border-left: 1px solid var(--hairline);
  }

  .hero__stats li:first-child {
    padding-left: 0;
    border-left: none;
  }

  .hero__cta {
    display: flex;
    gap: 16px;
    flex-wrap: wrap;
    margin-bottom: 24px;
  }

  .btn {
    height: 56px;
    padding: 0 32px;
    border-radius: 999px;
    font-weight: 700;
    font-size: 16px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    text-decoration: none;
    transition: all .25s var(--ease-out);
  }

  .btn--secondary {
    background: #fff;
    color: var(--ink);
    border: 1px solid var(--hairline);
  }

  .btn--secondary:hover {
    border-color: var(--gold);
    color: var(--gold);
    background: var(--surface-soft);
  }

  :global(.hero__reg-btn) {
    min-height: 56px;
    padding: 0 32px;
    font-size: 16px;
  }

  .btn:focus-visible {
    outline: 2px solid #fff;
    outline-offset: 2px;
  }

  .hero__micro {
    font-style: italic;
    font-size: 13px;
    color: var(--muted);
    margin: 0;
  }

  .hero__visual {
    position: relative;
    justify-self: end;
    width: 100%;
    max-width: 560px;
  }

  .hero__photo {
    width: 100%;
    aspect-ratio: 720/880;
    object-fit: cover;
    border-radius: 12px;
  }

  .hero__float {
    position: absolute;
  }

  .hero__trust {
    position: relative;
    z-index: 2;
    height: 80px;
    background: var(--surface-soft);
    border-top: 1px solid var(--hairline);
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 40px;
    flex-wrap: wrap;
    font-size: 13px;
    color: var(--body);
  }

  .hero__trust a {
    color: inherit;
    text-decoration: none;
  }

  .hero__trust a:hover {
    color: var(--primary);
  }

  /* Motion */
  .hero__content > * {
    opacity: 0;
    transform: translateY(12px);
    transition: opacity .5s var(--ease-out) var(--delay,0ms), transform .5s var(--ease-out) var(--delay,0ms);
  }

  .hero__kicker { --delay: 0ms; }
  .hero__wordmark { --delay: 80ms; }
  .hero__headline { --delay: 160ms; }
  .hero__subheadline { --delay: 240ms; }
  .hero__stats { --delay: 320ms; }
  .hero__cta { --delay: 520ms; }
  .hero__micro { --delay: 600ms; }

  .hero:global(.is-visible) .hero__content > * {
    opacity: 1;
    transform: translateY(0);
  }

  .hero__photo {
    opacity: 0;
    transform: scale(.96);
    transition: opacity .9s var(--ease-out) .2s, transform .9s var(--ease-out) .2s;
  }

  .hero:global(.is-visible) .hero__photo {
    opacity: 1;
    transform: scale(1);
  }

  @media (max-width: 1024px) {
    .hero__container {
      gap: 40px;
    }
    .hero__stats {
      gap: 16px;
    }
  }

  @media (max-width: 768px) {
    .hero__container {
      grid-template-columns: 1fr;
      padding: 0 24px;
    }
    .hero__visual {
      order: -1;
      height: 240px;
      overflow: hidden;
      justify-self: center;
      max-width: 320px;
    }
    .hero__visual::after {
      content: '';
      position: absolute;
      inset: 0;
      background: linear-gradient(to bottom, transparent, #fff);
      pointer-events: none;
    }
    .hero__photo {
      height: 100%;
      object-fit: cover;
    }
    .hero__float--none {
      transform: scale(.6);
    }
    .hero__stats {
      flex-direction: column;
    }
    .hero__stats li {
      padding: 0;
      border-left: none;
    }
    .hero__trust {
      gap: 16px;
      padding: 0 16px;
    }
  }

  @media (max-width: 480px) {
    .hero__headline {
      font-size: 2rem;
    }
    .hero__cta {
      flex-direction: column;
    }
    .hero__cta .btn {
      width: 100%;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .hero__content > *,
    .hero__photo,
    .hero__float {
      transition: opacity .3s linear !important;
      transform: none !important;
      animation: none !important;
    }
  }
</style>
