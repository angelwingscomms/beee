<script lang="ts">
  import { motionFadeUp } from '$lib/actions/motion';
  import Button from '$lib/components/Button.svelte';
</script>

<svelte:head>
  <title>BEEE® — Be Everything Excellent Every Day</title>
  <meta name="description" content="BEEE® is an integrated learning and development platform combining innovative programmes, digital tools, mentorship, and immersive experiences to inspire excellence." />
</svelte:head>

<div class="overflow-x-hidden w-full max-w-full">
  <section class="page-hero">
    <div class="page-hero-bg"></div>
    <div class="page-hero-inner">
      <div class="page-hero-content" use:motionFadeUp>
        <h1 class="page-hero-title">BEEE®</h1>
        <p class="page-hero-sub">A Vision and Mission Beyond Chess</p>
        <p class="page-hero-body">BEEE® (Be Everything Excellent Every Day) is an integrated learning and development platform that combines innovative programmes, digital tools, mentorship, and immersive experiences to inspire excellence and empower individuals to discover their potential, develop their abilities, and excel in education, leadership, enterprise, and life.</p>
        <div class="page-hero-actions">
          <Button href="/register" class="page-hero-btn">Get Started</Button>
          <a href="/championship" class="button-secondary page-hero-btn">View Championship</a>
        </div>
      </div>

    </div>
  </section>

  <section class="page-belief" use:motionFadeUp>
    <div class="container" style="padding: 120px 0;">
      <div class="belief-content">
        <p class="belief-text">We believe that every individual possesses extraordinary potential waiting to be discovered and developed. By providing opportunities for purposeful learning, mentorship, innovation, and meaningful engagement, BEEE® seeks to nurture a generation of thinkers, innovators, leaders, and changemakers equipped with the discipline, confidence, resilience, critical thinking, and problem-solving skills needed to thrive in an ever-changing world.</p>
      </div>
    </div>
  </section>

  <section class="page-features" use:motionFadeUp>
    <div class="container" style="padding: 120px 0;">
      <h2 class="page-features-title">Benefits of BEEE® Programmes</h2>
      <div class="features-grid">
        <div class="feature-card">
          <h3>Structured Learning</h3>
          <p>Participation in structured learning and development programmes designed to build skills and character.</p>
        </div>
        <div class="feature-card">
          <h3>Achievement Tracking</h3>
          <p>Tracking of achievements, with recognition for personal growth, skills development, and outstanding accomplishments across BEEE® programmes.</p>
        </div>
        <div class="feature-card">
          <h3>Network & Collaborate</h3>
          <p>Opportunities to network, collaborate, and share experiences with like-minded individuals.</p>
        </div>
        <div class="feature-card">
          <h3>Digital Tools & Mentorship</h3>
          <p>Access to innovative digital tools, mentorship, and immersive learning experiences.</p>
        </div>
        <div class="feature-card">
          <h3>Life Skills Development</h3>
          <p>Development of skills that support success in education, leadership, enterprise, and life.</p>
        </div>
      </div>
    </div>
  </section>

  <section class="page-cta" use:motionFadeUp>
    <div class="container" style="padding: 120px 0; text-align: center;">
      <h2 class="page-cta-title">Aspire to BEEE</h2>
      <p class="page-cta-body">Be Everything Excellent Every Day. Start your journey today.</p>
      <Button href="/register" class="page-cta-btn">Start Your Child's Journey</Button>
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
      radial-gradient(ellipse 70% 60% at 10% 50%, rgba(242, 120, 48, 0.12), transparent 70%),
      radial-gradient(ellipse 50% 50% at 90% 80%, rgba(126, 200, 227, 0.08), transparent 60%);
  }

  .page-hero-inner {
    position: relative;
    z-index: 1;
    width: min(1200px, calc(100% - 64px));
    margin: 0 auto;
    display: flex;
    justify-content: center;
    padding: 80px 0;
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
    font-style: italic;
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



  .page-belief {
    background: var(--surface-soft);
  }

  .belief-content {
    max-width: 720px;
    margin: 0 auto;
  }

  .belief-text {
    font-size: 18px;
    line-height: 1.7;
    color: var(--body);
    text-align: center;
    margin: 0;
  }

  .page-features {
    background: var(--canvas);
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
    padding: 22px 24px 14px;
    border-radius: 16px;
    background: var(--surface-card);
    border: 1px solid var(--hairline);
    border-top: 3px solid var(--primary);
    transition: transform 300ms ease, box-shadow 300ms ease;
    align-self: start;
  }

  @media (prefers-reduced-motion: no-preference) and (hover: hover) {
    .feature-card:hover {
      transform: translateY(-3px);
      box-shadow: 0 12px 32px rgba(20, 20, 19, 0.08);
    }
  }

  .feature-card h3 {
    font-family: var(--font-hero);
    font-size: 17px;
    font-weight: 600;
    letter-spacing: -0.01em;
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
    background: var(--surface-soft);
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

  @media (max-width: 1024px) {
    .page-hero-inner {
      grid-template-columns: 1fr;
      gap: 48px;
      padding: 64px 0;
    }
    .page-hero-content { max-width: none; }
    .features-grid { grid-template-columns: repeat(2, 1fr); }
  }

  @media (max-width: 767px) {
    .page-hero-title { font-size: clamp(2rem, 8vw, 2.8rem); }
    .page-hero-body { font-size: 15px; }
    .features-grid { grid-template-columns: 1fr; }
    .feature-card { padding: 24px; }
    .belief-text { font-size: 16px; }
  }
</style>
