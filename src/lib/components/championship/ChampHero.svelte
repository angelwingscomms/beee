<script lang="ts">
  import { motionFadeUp } from '$lib/actions/motion';
</script>

<section class="champ-hero" use:motionFadeUp>
  <div class="champ-hero-bg"></div>
  <div class="champ-hero-inner container">
    <div class="champ-hero-content">
      <p class="champ-hero-eyebrow">BEEE&reg; Spectacular Chess Championship Abuja 2026</p>
      <p class="champ-hero-motto">Be Everything Excellent Every Day</p>
      <h1 class="champ-hero-title">More Than A Chess Championship</h1>
      <p class="champ-hero-body">
        A unique youth development initiative that combines competitive chess with structured learning,
        mentorship, leadership development, and personal growth.
      </p>
      <div class="champ-hero-actions">
        <a href="/register" class="button-primary champ-hero-btn">Register Now</a>
        <a href="#about" class="button-secondary champ-hero-btn">Learn More</a>
      </div>
    </div>

  </div>
</section>

<style>
  .champ-hero {
    position: relative;
    min-height: 100dvh;
    display: flex;
    align-items: center;
    overflow: hidden;
    background: var(--canvas);
    padding-top: 72px;
  }

  .champ-hero-bg {
    position: absolute;
    inset: 0;
    pointer-events: none;
    background:
      radial-gradient(ellipse 70% 60% at 80% 30%, rgba(242, 120, 48, 0.06), transparent 70%),
      radial-gradient(ellipse 50% 50% at 10% 70%, rgba(255, 178, 0, 0.04), transparent 60%);
  }

  .champ-hero-inner {
    position: relative;
    z-index: 1;
    padding: 80px 0;
  }

  .champ-hero-content {
    max-width: 520px;
  }

  .champ-hero-eyebrow {
    font-size: 13px;
    font-weight: 500;
    color: var(--muted);
    margin: 0 0 20px;
    letter-spacing: 0.03em;
    text-transform: uppercase;
  }

  .champ-hero-motto {
    font-size: 11px;
    font-weight: 500;
    color: var(--primary);
    letter-spacing: 0.18em;
    text-transform: uppercase;
    margin: 0 0 20px;
  }

  .champ-hero-title {
    font-family: var(--font-display);
    font-size: clamp(2.6rem, 4.5vw, 4rem);
    font-weight: 500;
    line-height: 1.08;
    letter-spacing: -0.02em;
    color: var(--ink);
    margin: 0;
    max-width: 640px;
    text-wrap: balance;
  }

  .champ-hero-body {
    font-size: 17px;
    line-height: 1.6;
    color: var(--body);
    margin: 24px 0 0;
    max-width: 480px;
  }

  .champ-hero-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    margin-top: 36px;
  }

  .champ-hero-btn {
    min-height: 44px;
    padding: 12px 24px;
  }

  @media (max-width: 1024px) {
    .champ-hero-inner {
      padding: 64px 0;
    }
    .champ-hero-content {
      max-width: none;
    }
  }

  @media (max-width: 767px) {
    .champ-hero-title {
      font-size: clamp(2rem, 8vw, 2.8rem);
    }
    .champ-hero-body {
      font-size: 15px;
    }
  }
</style>
