<script lang="ts">
  import RegistrationForm from '../../components/RegistrationForm.svelte';
  import { motionFadeUp, motionStaggered, motionScaleIn } from '$lib/actions/motion';

  const features = [
    {
      img: 'https://picsum.photos/seed/chess-arena/800/600',
      title: 'Preliminary Rounds',
      body: 'Competitive chess matches across Abuja in June 2026. Slots are limited and allocated on a first-registered, first-confirmed basis.'
    },
    {
      img: 'https://picsum.photos/seed/mentorship/800/600',
      title: 'T.E.A.M.U.P. Programme',
      body: 'Four weeks of advanced chess, creativity, innovation, strategic thinking, leadership, teamwork, and collaboration.'
    },
    {
      img: 'https://picsum.photos/seed/awards-ceremony/800/600',
      title: 'Grand Finale & Awards',
      body: 'The Championship Grand Finale in October 2026. Every participant receives achievement recognition and a development passport.'
    }
  ];

  let loaded = $state<Set<number>>(new Set());
  function on_img_load(i: number) {
    loaded.add(i);
    loaded = new Set(loaded);
  }
</script>

<svelte:head>
  <title>Register — BEEE Spectacular Chess Championship Abuja 2026</title>
  <meta name="description" content="Register your child for the BEEE T.E.A.M.U.P. programme and Spectacular Chess Championship Abuja 2026." />
</svelte:head>

<div class="overflow-x-hidden w-full max-w-full">
  <section class="reg-hero">
    <div class="reg-hero-noise"></div>
    <div class="reg-hero-glow"></div>
    <div class="container reg-hero-inner">
      <div class="reg-hero-content" use:motionFadeUp>
        <h1 class="reg-hero-title">
          Secure Your Child's
          <span class="inline-block w-20 h-9 md:w-28 md:h-12 rounded-full align-middle bg-cover bg-center mx-2 -mt-1 ring-2 ring-white/20" style="background-image: url(https://picsum.photos/seed/chess-knight/200/80);"></span>
          Place in the Championship
        </h1>
        <p class="reg-hero-sub">Registration for the BEEE Spectacular Chess Championship Abuja 2026 and the T.E.A.M.U.P. youth development programme.</p>
        <div class="reg-hero-actions">
          <a href="#form" class="button-primary reg-hero-btn">Begin Registration</a>
          <a href="/teamup" class="button-secondary reg-hero-btn">Learn About the Programme</a>
        </div>
      </div>
      <div class="reg-hero-chess" aria-hidden="true">
        <div class="chess-plane"></div>
        <div class="chess-pieces">
          <span class="chess-piece chess-king">&#9818;</span>
          <span class="chess-piece chess-queen">&#9819;</span>
          <span class="chess-piece chess-rook">&#9820;</span>
          <span class="chess-piece chess-bishop">&#9821;</span>
          <span class="chess-piece chess-knight">&#9822;</span>
        </div>
      </div>
    </div>
  </section>

  <section class="reg-bento-section" use:motionStaggered>
    <div class="container" style="padding: 120px 0;">
      <div class="reg-bento-header">
        <h2 class="reg-bento-title">The Championship Journey</h2>
        <p class="reg-bento-sub">From the first move to the grand finale — a complete developmental arc for young minds aged 10 to 14.</p>
      </div>
      <div class="reg-bento-grid">
        {#each features as feat, i}
          <div class="reg-bento-card" style="background-image: url({feat.img}); opacity: {loaded.has(i) ? 1 : 0};">
            <img src={feat.img} alt="" class="bento-hidden-img" onload={() => on_img_load(i)} />
            <div class="bento-overlay"></div>
            <div class="bento-content">
              <h3 class="bento-card-title">{feat.title}</h3>
              <p class="bento-card-body">{feat.body}</p>
            </div>
          </div>
        {/each}
      </div>
    </div>
  </section>

  <section class="reg-form-section" id="form">
    <div class="reg-form-bg"></div>
    <div class="container" style="padding: 100px 0 120px;">
      <div class="reg-form-card" use:motionScaleIn>
        <RegistrationForm />
      </div>
    </div>
  </section>

  <section class="reg-cta-strip" use:motionFadeUp>
    <div class="container" style="padding: 96px 0; text-align: center;">
      <p class="reg-cta-label">NGN 12,500 per participant</p>
      <h2 class="reg-cta-title">Limited slots available — register before June 18, 2026</h2>
      <a href="#form" class="button-primary reg-cta-btn">Register Now</a>
    </div>
  </section>
</div>

<style>
  .reg-hero {
    position: relative;
    min-height: 90dvh;
    display: flex;
    align-items: center;
    overflow: hidden;
    background: var(--canvas);
    padding-top: 80px;
  }

  .reg-hero-noise {
    position: absolute;
    inset: 0;
    opacity: 0.035;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
    background-repeat: repeat;
    background-size: 256px 256px;
    pointer-events: none;
    z-index: 0;
  }

  .reg-hero-glow {
    position: absolute;
    inset: 0;
    pointer-events: none;
    z-index: 0;
    background:
      radial-gradient(ellipse 60% 50% at 20% 40%, rgba(242, 120, 48, 0.08), transparent 70%),
      radial-gradient(ellipse 50% 50% at 80% 60%, rgba(255, 178, 0, 0.05), transparent 60%);
  }

  .reg-hero-inner {
    position: relative;
    z-index: 1;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 48px;
    align-items: center;
    padding: 80px 0;
    width: 100%;
  }

  .reg-hero-content {
    max-width: 560px;
  }

  .reg-hero-title {
    font-family: var(--font-display);
    font-size: clamp(2.8rem, 5vw, 4.5rem);
    font-weight: 500;
    line-height: 1.06;
    letter-spacing: -0.02em;
    color: var(--ink);
    margin: 0;
    max-width: 600px;
    text-wrap: balance;
  }

  .reg-hero-sub {
    font-size: 17px;
    line-height: 1.65;
    color: var(--body);
    margin: 24px 0 0;
    max-width: 480px;
  }

  .reg-hero-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    margin-top: 36px;
  }

  .reg-hero-btn {
    min-height: 44px;
    padding: 12px 24px;
  }

  .reg-hero-chess {
    position: relative;
    display: grid;
    place-items: center;
    min-height: 420px;
  }

  .chess-plane {
    position: absolute;
    width: min(85%, 340px);
    aspect-ratio: 1;
    border-radius: 8px;
    border: 1px solid rgba(0, 0, 0, 0.06);
    transform: rotateX(58deg) rotateZ(-35deg);
    transform-style: preserve-3d;
    background:
      linear-gradient(90deg, var(--hairline) 1px, transparent 1px),
      linear-gradient(var(--hairline) 1px, transparent 1px),
      linear-gradient(135deg, rgba(242, 120, 48, 0.06), rgba(250, 249, 245, 0.95));
    background-size: 12.5% 12.5%, 12.5% 12.5%, 100% 100%;
    box-shadow:
      0 30px 80px rgba(0, 0, 0, 0.08),
      inset 0 1px 0 rgba(255, 255, 255, 0.4);
  }

  .chess-plane::after {
    content: '';
    position: absolute;
    inset: 14%;
    border: 1px solid rgba(242, 120, 48, 0.12);
    border-radius: 4px;
  }

  .chess-pieces {
    position: absolute;
    inset: 0;
    display: grid;
    place-items: center;
  }

  .chess-piece {
    position: absolute;
    font-size: 30px;
    line-height: 1;
    color: var(--primary);
    opacity: 0.4;
  }

  .chess-king { top: 16%; left: 36%; font-size: 40px; opacity: 0.7; }
  .chess-queen { top: 26%; left: 56%; font-size: 36px; opacity: 0.45; }
  .chess-rook { top: 48%; left: 20%; font-size: 26px; opacity: 0.3; }
  .chess-bishop { top: 60%; left: 50%; font-size: 28px; opacity: 0.35; }
  .chess-knight { top: 38%; left: 70%; font-size: 30px; opacity: 0.25; }

  .reg-bento-section {
    position: relative;
    background: var(--surface-soft);
  }

  .reg-bento-section::before {
    content: '';
    position: absolute;
    inset: 0;
    opacity: 0.02;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
    background-repeat: repeat;
    background-size: 256px 256px;
    pointer-events: none;
    z-index: 0;
  }

  .reg-bento-section > .container {
    position: relative;
    z-index: 1;
  }

  .reg-bento-header {
    max-width: 560px;
    margin-bottom: 48px;
  }

  .reg-bento-title {
    font-family: var(--font-display);
    font-size: clamp(1.8rem, 3vw, 2.5rem);
    font-weight: 500;
    line-height: 1.15;
    letter-spacing: -0.01em;
    color: var(--ink);
    margin: 0;
  }

  .reg-bento-sub {
    font-family: var(--font-display);
    font-size: 20px;
    line-height: 1.3;
    color: var(--body);
    margin: 12px 0 0;
  }

  .reg-bento-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-auto-flow: dense;
    gap: 20px;
  }

  .reg-bento-card {
    position: relative;
    min-height: 300px;
    border-radius: 16px;
    overflow: hidden;
    background-size: cover;
    background-position: center;
    background-color: var(--surface-card);
    transition: transform 500ms ease, box-shadow 500ms ease;
    cursor: default;
  }

  .reg-bento-card:hover {
    transform: scale(1.02);
    box-shadow: 0 24px 64px rgba(0, 0, 0, 0.12);
  }

  .bento-hidden-img {
    position: absolute;
    width: 1px;
    height: 1px;
    opacity: 0;
    pointer-events: none;
  }

  .bento-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(180deg, rgba(24, 23, 21, 0.1) 0%, rgba(24, 23, 21, 0.78) 100%);
    transition: background 500ms ease;
  }

  .reg-bento-card:hover .bento-overlay {
    background: linear-gradient(180deg, rgba(24, 23, 21, 0.05) 0%, rgba(24, 23, 21, 0.68) 100%);
  }

  .bento-content {
    position: absolute;
    inset: 0;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    padding: 32px;
    color: var(--on-dark);
  }

  .bento-card-title {
    margin: 0;
    font-family: var(--font-display);
    font-size: 22px;
    font-weight: 500;
    line-height: 1.2;
    letter-spacing: -0.01em;
  }

  .bento-card-body {
    margin: 10px 0 0;
    font-size: 14px;
    line-height: 1.55;
    color: rgba(250, 249, 245, 0.78);
    max-width: 380px;
  }

  .reg-form-section {
    position: relative;
    background: var(--canvas);
    overflow: hidden;
  }

  .reg-form-bg {
    position: absolute;
    inset: 0;
    pointer-events: none;
    background:
      radial-gradient(ellipse 60% 40% at 30% 30%, rgba(242, 120, 48, 0.05), transparent 60%),
      radial-gradient(ellipse 40% 40% at 80% 70%, rgba(255, 178, 0, 0.03), transparent 50%);
  }

  .reg-form-card {
    position: relative;
    border-radius: 20px;
  }

  .reg-cta-strip {
    position: relative;
    background: var(--primary);
    color: white;
  }

  .reg-cta-label {
    font-size: 13px;
    font-weight: 500;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: rgba(255, 255, 255, 0.7);
    margin: 0 0 16px;
  }

  .reg-cta-title {
    font-family: var(--font-display);
    font-size: clamp(1.6rem, 3vw, 2.4rem);
    font-weight: 500;
    line-height: 1.15;
    color: white;
    margin: 0 auto;
    max-width: 600px;
  }

  .reg-cta-btn {
    margin-top: 32px;
    background: var(--ink);
    border-color: var(--ink);
    color: var(--on-dark);
    min-height: 48px;
    padding: 14px 32px;
    font-size: 15px;
    border: 1px solid var(--ink);
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: 999px;
    font-weight: 500;
    line-height: 1;
    transition: background-color 160ms ease, border-color 160ms ease, color 160ms ease, transform 160ms ease;
  }

  .reg-cta-btn:hover {
    opacity: 0.92;
  }

  @media (max-width: 1024px) {
    .reg-hero-inner {
      grid-template-columns: 1fr;
      gap: 40px;
      padding: 60px 0;
    }
    .reg-hero-content {
      max-width: none;
    }
    .reg-hero-chess {
      min-height: 300px;
    }
  }

  @media (max-width: 767px) {
    .reg-hero {
      min-height: auto;
      padding: 100px 0 60px;
    }
    .reg-hero-title {
      font-size: clamp(2rem, 8vw, 2.8rem);
    }
    .reg-hero-sub {
      font-size: 15px;
    }
    .reg-hero-chess {
      min-height: 220px;
    }
    .chess-plane {
      width: min(75%, 220px);
    }
    .chess-piece { font-size: 20px; }
    .chess-king { font-size: 28px; }
    .chess-queen { font-size: 24px; }
    .reg-bento-grid {
      grid-template-columns: 1fr;
    }
    .bento-content {
      padding: 24px;
    }
    .reg-bento-card {
      min-height: 240px;
    }
  }
</style>
