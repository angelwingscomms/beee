<script lang="ts">
  import { motionFadeUp } from '$lib/actions/motion';
  import Button from '$lib/components/Button.svelte';
</script>

<div class="overflow-x-hidden w-full max-w-full">
  <section class="page-hero">
    <div class="page-hero-bg"></div>
    <div class="page-hero-inner">
      <div class="page-hero-content" use:motionFadeUp>
        <h1 class="page-hero-title">e4™</h1>
        <p class="page-hero-sub">AI Chess Coach</p>
        <p class="page-hero-body">An AI-assisted chess learning platform providing guided instruction, game analysis, and personalised practice.</p>
        <p class="page-hero-body">e4 analyses every move as your child plays , flagging mistakes, suggesting better plans, and answering questions by voice or text.</p>
        <div class="page-hero-actions">
          <Button href="/register" class="page-hero-btn">Register your child →</Button>
        </div>
      </div>
      <div class="page-hero-visual" use:motionFadeUp>
        <div class="page-hero-img-frame">
           <img
             src="/images/e4-ui.webp"
             alt="The e4 AI chess coach interface showing live move analysis for a young player"
             class="page-hero-img"
             width="1536"
             height="1024"
             fetchpriority="high"
             decoding="async"
           />
        </div>
      </div>
    </div>
  </section>

  <section class="page-features" use:motionFadeUp>
    <div class="container" style="padding: 64px 0;">
      <h2 class="page-features-title">Benefits of e4™</h2>
      <div class="features-grid">
        <div class="feature-card">
          <h3>Guided AI Instruction</h3>
          <p>Learn and improve at your own pace with personalised AI feedback.</p>
        </div>
        <div class="feature-card">
          <h3>Step-by-step strategy coaching</h3>
          <p>Master sophisticated strategies and tactical patterns.</p>
        </div>
        <div class="feature-card">
          <h3>Train like the pros</h3>
          <p>The same engine-backed analysis top players prepare with.</p>
        </div>
        <div class="feature-card">
          <h3>Deep Game Analysis</h3>
          <p>Break down every move to reveal strengths and areas for improvement.</p>
        </div>
        <div class="feature-card">
          <h3>Virtual & Real Opponents</h3>
          <p>Play against AI or real opponents across different styles.</p>
        </div>
        <div class="feature-card">
          <h3>Custom Puzzles</h3>
          <p>Train with puzzles auto-generated from real game mistakes.</p>
        </div>
      </div>
    </div>
  </section>

  <section class="page-cta" use:motionFadeUp>
    <div class="container" style="padding: 64px 0; text-align: center;">
      <h2 class="page-cta-title">Ready to Train Smarter?</h2>
      <p class="page-cta-body">Give your child an edge with AI-powered chess coaching.</p>
      <Button href="/register" class="page-cta-btn">Start Your Child's Journey</Button>
    </div>
  </section>
</div>

<style>
  .page-hero {
    position: relative;
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
    gap: 56px;
    align-items: center;
    padding: 56px 0;
  }

  .page-hero-content { max-width: 540px; }

  .page-hero-title {
    font-family: var(--font-hero);
    font-size: clamp(2.8rem, 5vw, 4.5rem);
    font-weight: 700;
    line-height: 1.08;
    letter-spacing: -0.03em;
    color: var(--ink);
    margin: 0;
    text-wrap: balance;
  }

  .page-hero-sub {
    font-family: var(--font-display);
    font-size: clamp(1.1rem, 2vw, 1.4rem);
    font-weight: 700;
    letter-spacing: -0.01em;
    color: var(--ink);
    margin: 20px 0 0;
    line-height: 1.4;
  }

  .page-hero-body {
    font-size: 17px;
    line-height: 1.65;
    color: var(--ink);
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
    font-family: var(--font-hero);
    font-size: clamp(1.8rem, 3vw, 2.5rem);
    font-weight: 700;
    line-height: 1.15;
    letter-spacing: -0.01em;
    color: var(--ink);
    margin: 0 0 48px;
  }

  .features-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
    align-items: start;
  }

  .feature-card {
    padding: 28px 32px 32px;
    border-radius: 16px;
    background: var(--surface-card);
    border: 1px solid var(--hairline);
    border-top: 3px solid var(--primary);
    transition: transform 300ms ease, box-shadow 300ms ease;
  }

  @media (prefers-reduced-motion: no-preference) {
    .feature-card:hover {
      transform: translateY(-3px);
      box-shadow: 0 12px 32px rgba(20, 20, 19, 0.08);
    }
  }

  .feature-card h3 {
    font-family: var(--font-hero);
    font-size: 18px;
    font-weight: 600;
    letter-spacing: -0.01em;
    color: var(--ink);
    margin: 0 0 8px;
  }

  .feature-card p {
    font-size: 15px;
    line-height: 1.6;
    color: var(--body);
    margin: 0;
  }

  .page-cta {
    background: var(--canvas);
  }

  .page-cta-title {
    font-family: var(--font-hero);
    font-size: clamp(1.8rem, 3vw, 2.5rem);
    font-weight: 700;
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

  @media (--md-down) {
    .page-hero-inner {
      grid-template-columns: 1fr;
      gap: 40px;
      padding: 40px 0;
    }
    .page-hero-content { max-width: none; }
    .page-hero-visual { order: -1; }
    .page-hero-img-frame { max-width: 400px; }
    .features-grid { grid-template-columns: repeat(2, 1fr); }
  }

  @media (--sm-down) {
    .page-hero-title { font-size: clamp(2rem, 8vw, 2.8rem); }
    .page-hero-body { font-size: 15px; }
    .features-grid { grid-template-columns: 1fr; }
    .feature-card { padding: 24px; }
  }
</style>
