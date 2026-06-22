<script lang="ts">
  import { motionFadeUp } from '$lib/actions/motion';
</script>

<section class="hero" use:motionFadeUp>
  <div class="hero-bg"></div>
  <div class="container hero-inner">
    <div class="hero-content">
      <p class="event-label">BEEE Spectacular Chess Championship Abuja 2026</p>
      <h1 class="hero-title">More Than A<br>Chess Championship</h1>
      <p class="hero-words">Compete. Develop. Excel.</p>
      <p class="hero-body">
        Every participant gains access to the T.E.A.M.U.P. Development Programme,
        a unique journey that combines chess, innovation, leadership, mentorship,
        creativity, and personal growth.
      </p>
      <a href="/register" class="button-primary hero-cta">Register Now</a>
    </div>
  </div>
</section>

<style>
  .hero {
    position: relative;
    min-height: 100dvh;
    display: flex;
    align-items: center;
    background: var(--canvas);
    overflow: hidden;
  }

  .hero-bg {
    position: absolute;
    inset: 0;
    pointer-events: none;
    background:
      radial-gradient(ellipse 60% 50% at 70% 40%, rgba(242, 120, 48, 0.07), transparent 70%),
      radial-gradient(ellipse 50% 50% at 20% 60%, rgba(255, 178, 0, 0.04), transparent 60%);
  }

  .hero-inner {
    position: relative;
    z-index: 1;
    padding: 80px 0;
    width: min(1200px, calc(100% - 48px));
    margin: 0 auto;
  }

  .hero-content {
    max-width: 720px;
  }

  .event-label {
    font-size: 13px;
    font-weight: 500;
    color: var(--muted);
    margin: 0 0 20px;
    letter-spacing: 0.02em;
  }

  .hero-title {
    font-family: var(--font-sans);
    font-size: 52px;
    font-weight: 700;
    line-height: 1.08;
    letter-spacing: -0.02em;
    color: var(--ink);
    margin: 0;
    max-width: 680px;
  }

  .hero-words {
    font-family: var(--font-sans);
    font-size: 20px;
    font-weight: 600;
    color: var(--primary);
    margin: 16px 0 0;
    letter-spacing: 0.06em;
  }

  .hero-body {
    font-size: 17px;
    line-height: 1.6;
    color: var(--body);
    margin: 24px 0 0;
    max-width: 580px;
  }

  .hero-cta {
    margin-top: 36px;
  }

  @media (max-width: 767px) {
    .hero-title {
      font-size: 34px;
    }
    .hero-words {
      font-size: 17px;
    }
    .hero-body {
      font-size: 15px;
    }
    .hero-inner {
      padding: 64px 0;
    }
  }
</style>
