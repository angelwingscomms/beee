<script lang="ts">
  import { motionFadeUp } from '$lib/actions/motion';
  import RegisterBtn from '$lib/components/RegisterBtn.svelte';
</script>

<svelte:head>
  <title>e4™ AI Chess Coach — BEEE Spectacular Chess Championship Abuja 2026</title>
  <meta name="description" content="e4™ is an AI-powered chess coaching platform that provides real-time move analysis, personalised training, and game insights." />
</svelte:head>

<div class="overflow-x-hidden w-full max-w-full">
  <section class="page-hero">
    <div class="page-hero-bg"></div>
    <div class="page-hero-inner">
      <div class="page-hero-content" use:motionFadeUp>
        <h1 class="page-hero-title">e4™</h1>
        <p class="page-hero-sub">AI Chess Coach</p>
        <p class="page-hero-body">An AI-assisted chess learning platform that provides guided instruction, real-time game analysis, and personalised practice tailored to each participant's skill level.</p>
        <div class="page-hero-actions">
          <RegisterBtn href="/register" class="page-hero-btn">Get Started</RegisterBtn>
          <a href="/championship" class="button-secondary page-hero-btn">View Championship</a>
        </div>
      </div>
      <div class="page-hero-visual" use:motionFadeUp>
        <div class="page-hero-img-frame">
          <img src="/images/e4-ui.png" alt="e4 AI Chess Coach interface" class="page-hero-img" />
        </div>
      </div>
    </div>
  </section>

  <section class="page-features" use:motionFadeUp>
    <div class="container" style="padding: 120px 0;">
      <h2 class="page-features-title">What e4 Offers</h2>
      <div class="features-grid">
        <div class="feature-card">
          <h3>Real-Time Analysis</h3>
          <p>Every move is analysed instantly with AI-powered insights, helping participants understand strengths and areas for improvement.</p>
        </div>
        <div class="feature-card">
          <h3>Personalised Training</h3>
          <p>Adaptive learning paths that adjust to each player's style, skill level, and progress throughout the championship.</p>
        </div>
        <div class="feature-card">
          <h3>Game Library</h3>
          <p>Access a growing library of classic games,战术 exercises, and interactive puzzles designed to build strategic thinking.</p>
        </div>
        <div class="feature-card">
          <h3>Progress Tracking</h3>
          <p>Detailed performance metrics and visual progress charts help players and coaches monitor improvement over time.</p>
        </div>
        <div class="feature-card">
          <h3>AI Mentoring</h3>
          <p>An always-available AI mentor that answers questions, suggests alternatives, and explains concepts in plain language.</p>
        </div>
        <div class="feature-card">
          <h3>Tournament Prep</h3>
          <p>Simulated match environments and timed practice sessions prepare participants for live championship play.</p>
        </div>
      </div>
    </div>
  </section>

  <section class="page-cta" use:motionFadeUp>
    <div class="container" style="padding: 120px 0; text-align: center;">
      <h2 class="page-cta-title">Ready to Train Smarter?</h2>
      <p class="page-cta-body">Give your child the edge of AI-powered chess coaching.</p>
      <RegisterBtn href="/register" class="page-cta-btn">Start Your Child's Journey</RegisterBtn>
    </div>
  </section>
</div>

<style>
  .page-hero {
    position: relative;
    min-height: 100dvh;
    display: flex;
    align-items: center;
    overflow: hidden;
    background: var(--canvas);
    padding-top: 72px;
  }

  .page-hero-bg {
    position: absolute;
    inset: 0;
    pointer-events: none;
    background:
      radial-gradient(ellipse 70% 60% at 10% 50%, rgba(245, 230, 200, 0.15), transparent 70%),
      radial-gradient(ellipse 50% 50% at 90% 80%, rgba(126, 200, 227, 0.1), transparent 60%);
  }

  .page-hero-inner {
    position: relative;
    z-index: 1;
    width: min(1200px, calc(100% - 64px));
    margin: 0 auto;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 80px;
    align-items: center;
    padding: 80px 0;
  }

  .page-hero-content { max-width: 540px; }

  .page-hero-title {
    font-family: var(--font-display);
    font-size: clamp(2.8rem, 5vw, 4.5rem);
    font-weight: 500;
    line-height: 1.08;
    letter-spacing: -0.02em;
    color: var(--ink);
    margin: 0;
    text-wrap: balance;
  }

  .page-hero-sub {
    font-family: var(--font-display);
    font-size: clamp(1.1rem, 2vw, 1.4rem);
    font-weight: 500;
    letter-spacing: -0.01em;
    color: var(--body);
    margin: 20px 0 0;
    line-height: 1.4;
  }

  .page-hero-body {
    font-size: 17px;
    line-height: 1.65;
    color: var(--body);
    margin: 24px 0 0;
  }

  .page-hero-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    margin-top: 36px;
  }

  :global(.page-hero-btn) {
    min-height: 48px;
    padding: 14px 28px;
    font-size: 15px;
  }

  .page-hero-visual {
    display: grid;
    place-items: center;
  }

  .page-hero-img-frame {
    width: min(100%, 500px);
    border-radius: 16px;
    overflow: hidden;
    box-shadow: 0 20px 60px rgba(0,0,0,0.1);
  }

  .page-hero-img {
    width: 100%;
    height: auto;
    display: block;
  }

  .page-features {
    background: var(--surface-soft);
  }

  .page-features-title {
    font-family: var(--font-display);
    font-size: clamp(1.8rem, 3vw, 2.5rem);
    font-weight: 500;
    line-height: 1.15;
    letter-spacing: -0.01em;
    color: var(--ink);
    margin: 0 0 48px;
  }

  .features-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
  }

  .feature-card {
    padding: 32px;
    border-radius: 16px;
    background: var(--surface-card);
    border: 1px solid var(--hairline);
    transition: transform 300ms ease, box-shadow 300ms ease;
  }

  .feature-card:hover {
    transform: translateY(-3px);
    box-shadow: 0 12px 32px rgba(20, 20, 19, 0.08);
  }

  .feature-card h3 {
    font-family: var(--font-display);
    font-size: 18px;
    font-weight: 500;
    color: var(--ink);
    margin: 0 0 8px;
  }

  .feature-card p {
    font-size: 14px;
    line-height: 1.6;
    color: var(--body);
    margin: 0;
  }

  .page-cta {
    background: var(--canvas);
  }

  .page-cta-title {
    font-family: var(--font-display);
    font-size: clamp(1.8rem, 3vw, 2.5rem);
    font-weight: 500;
    color: var(--ink);
    margin: 0;
  }

  .page-cta-body {
    font-size: 17px;
    color: var(--body);
    margin: 16px 0 32px;
  }

  :global(.page-cta-btn) {
    min-height: 52px;
    padding: 16px 36px;
    font-size: 16px;
  }

  @media (max-width: 1024px) {
    .page-hero-inner {
      grid-template-columns: 1fr;
      gap: 48px;
      padding: 64px 0;
    }
    .page-hero-content { max-width: none; }
    .page-hero-visual { order: -1; }
    .page-hero-img-frame { max-width: 400px; }
    .features-grid { grid-template-columns: repeat(2, 1fr); }
  }

  @media (max-width: 767px) {
    .page-hero-title { font-size: clamp(2rem, 8vw, 2.8rem); }
    .page-hero-body { font-size: 15px; }
    .features-grid { grid-template-columns: 1fr; }
    .feature-card { padding: 24px; }
  }
</style>
