<script lang="ts">
  import HeroChessIllustration from '$lib/components/home/illustrations/HeroChessIllustration.svelte';
</script>

<section class="hero-band hero-section">
  <div class="hero-bg"></div>
  <div class="container">
    <div class="hero-split">
      <div class="hero-left">
        <p class="eyebrow">BEEE Spectacular Chess Championship Abuja 2026</p>
        <h1 class="display-xl hero-title">Where Young Minds<br>Compete.<br>Develop.<br>Excel.</h1>
        <p class="lead hero-subtitle">More than a championship. A transformational journey in leadership, strategy, innovation and personal growth.</p>
        <div class="hero-actions">
          <a href="/register" class="button-primary cta-entrance">Register Now</a>
          <a href="#teamp" class="button-secondary">Explore T.E.A.M.U.P.</a>
        </div>
        <div class="hero-meta">
          <strong>October 2026 Grand Finale</strong>
          <span>Abuja</span>
          <span>Open Registration</span>
        </div>
        <p class="mystery-teaser">- Featuring a Grand Finale unlike any other school chess championship.</p>
      </div>
      <div class="hero-right">
        <HeroChessIllustration />
      </div>
    </div>
  </div>
</section>

<style>
  .hero-section {
    position: relative;
  }

  .hero-split {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 48px;
    align-items: center;
    min-height: 100vh;
    padding: 32px 0;
  }

  .hero-bg {
    position: absolute;
    inset: 0;
    pointer-events: none;
    background:
      radial-gradient(ellipse 70% 60% at 75% 40%, rgba(242, 120, 48, 0.06), transparent 70%),
      radial-gradient(ellipse 50% 50% at 20% 60%, rgba(255, 178, 0, 0.04), transparent 60%);
  }

  .hero-left {
    display: flex;
    flex-direction: column;
    gap: 0;
    z-index: 1;
  }

  .hero-left :global(.eyebrow) {
    margin-bottom: 24px;
  }

  .hero-left :global(.display-xl) {
    max-width: 640px;
    font-size: 52px;
    letter-spacing: 0.02em;
    line-height: 1.15;
    color: var(--ink);
  }

  .hero-left :global(.lead) {
    max-width: 540px;
    margin-top: 28px;
    color: var(--body);
  }

  .hero-left :global(.hero-actions) {
    margin-top: 36px;
  }

  .hero-right {
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1;
    max-width: 500px;
    justify-self: end;
  }

  .hero-meta {
    display: flex;
    gap: 0;
    align-items: center;
    margin-top: 32px;
    font-size: 14px;
    font-weight: 500;
    color: var(--muted);
  }

  .hero-meta strong {
    font-weight: 600;
    color: var(--ink);
    margin-right: 8px;
  }

  .hero-meta span {
    color: var(--muted);
  }

  .hero-meta span + span::before {
    content: '\00B7';
    margin: 0 12px;
    color: var(--hairline);
    font-weight: 700;
  }

  .mystery-teaser {
    margin-top: 36px;
    color: var(--muted);
    font-size: 13px;
    letter-spacing: 0.01em;
    opacity: 0.65;
  }

  @media (max-width: 900px) {
    .hero-split {
      grid-template-columns: 1fr;
      gap: 40px;
      min-height: auto;
      padding: 48px 0 64px;
    }

    .hero-left :global(.display-xl) {
      font-size: 38px;
      letter-spacing: 0.01em;
    }

    .hero-right {
      max-width: 380px;
      justify-self: center;
    }

    .hero-meta {
      flex-wrap: wrap;
      row-gap: 8px;
    }

    .hero-meta span + span::before {
      display: none;
    }

    .hero-meta span {
      display: block;
      width: 100%;
      margin-top: 2px;
    }
  }
</style>
