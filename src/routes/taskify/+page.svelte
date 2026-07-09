<script lang="ts">
  import { motionFadeUp } from '$lib/actions/motion';
  import Button from '$lib/components/Button.svelte';
</script>

<svelte:head>
  <title>Taskify™ Digital Passport — BEEE Spectacular Chess Championship Abuja 2026</title>
  <meta name="description" content="Taskify™ is a digital development passport that tracks participant progress, milestones, achievements, badges, and growth throughout the championship." />
</svelte:head>

<div class="overflow-x-hidden w-full max-w-full">
  <section class="page-hero">
    <div class="page-hero-bg"></div>
    <div class="page-hero-inner">
      <div class="page-hero-content" use:motionFadeUp>
        <h1 class="page-hero-title">Taskify™</h1>
        <p class="page-hero-sub">Digital Development Passport</p>
        <p class="page-hero-body">A digital passport that records every participant's progress throughout the championship — tracking milestones, achievements, badges, certificates, and personal growth.</p>
        <div class="page-hero-actions">
          <Button href="/register" class="page-hero-btn">Get Started</Button>
          <a href="/championship" class="button-secondary page-hero-btn">View Championship</a>
        </div>
      </div>
      <div class="page-hero-visual" use:motionFadeUp>
        <div class="hero-placeholder">
          <div class="placeholder-icon">
            <svg viewBox="0 0 24 24" width="64" height="64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/>
              <rect x="8" y="2" width="8" height="4" rx="1" ry="1"/>
              <path d="M9 11l2 2 4-4"/>
              <path d="M9 16h6"/>
              <path d="M9 19h6"/>
            </svg>
          </div>
          <p class="placeholder-text">Track. Achieve. Grow.</p>
        </div>
      </div>
    </div>
  </section>

  <section class="page-features" use:motionFadeUp>
    <div class="container" style="padding: 120px 0;">
      <h2 class="page-features-title">What Taskify Tracks</h2>
      <div class="features-grid">
        <div class="feature-card">
          <h3>Skills Developed</h3>
          <p>Records strategic thinking, problem-solving, leadership, and communication skills as they are demonstrated throughout the programme.</p>
        </div>
        <div class="feature-card">
          <h3>Badges Earned</h3>
          <p>Participants earn digital badges for completing challenges, mastering concepts, and achieving milestones at every stage.</p>
        </div>
        <div class="feature-card">
          <h3>Certificates</h3>
          <p>Official certificates are awarded for programme completion, tournament performance, and special achievements.</p>
        </div>
        <div class="feature-card">
          <h3>Activities Log</h3>
          <p>Every learning activity, mentorship session, and chess match is logged and visible in the participant's passport.</p>
        </div>
        <div class="feature-card">
          <h3>Progress Analytics</h3>
          <p>Visual dashboards show growth over time across multiple dimensions — chess skill, leadership, and personal development.</p>
        </div>
        <div class="feature-card">
          <h3>Parent Access</h3>
          <p>Parents and guardians receive secure access to their child's Development Passport to follow their journey in real time.</p>
        </div>
      </div>
    </div>
  </section>

  <section class="page-cta" use:motionFadeUp>
    <div class="container" style="padding: 120px 0; text-align: center;">
      <h2 class="page-cta-title">Start Building Their Record</h2>
      <p class="page-cta-body">Every achievement deserves to be documented and celebrated.</p>
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
      radial-gradient(ellipse 70% 60% at 10% 50%, rgba(126, 200, 227, 0.12), transparent 70%),
      radial-gradient(ellipse 50% 50% at 90% 80%, rgba(93, 184, 166, 0.08), transparent 60%);
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

  .hero-placeholder {
    width: min(100%, 360px);
    aspect-ratio: 3/4;
    border-radius: 16px;
    background: var(--surface-card);
    border: 1px solid var(--hairline);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 24px;
  }

  .placeholder-icon {
    color: var(--primary);
    opacity: 0.6;
  }

  .placeholder-text {
    font-family: var(--font-display);
    font-size: 20px;
    color: var(--body);
    margin: 0;
    letter-spacing: -0.01em;
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
    .features-grid { grid-template-columns: repeat(2, 1fr); }
  }

  @media (max-width: 767px) {
    .page-hero-title { font-size: clamp(2rem, 8vw, 2.8rem); }
    .page-hero-body { font-size: 15px; }
    .features-grid { grid-template-columns: 1fr; }
    .feature-card { padding: 24px; }
  }
</style>
