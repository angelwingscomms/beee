<script lang="ts">
  import { motionFadeUp } from '$lib/actions/motion';
  import RegisterBtn from '$lib/components/RegisterBtn.svelte';

  const hero_img = 'https://picsum.photos/seed/chess-education/1200/1400';
</script>

<section class="tu-hero">
  <div class="tu-hero-bg"></div>
  <div class="tu-hero-inner">
    <div class="tu-hero-content" use:motionFadeUp>
      <h1 class="tu-hero-title">
        TEAMUP
      </h1>
      <p class="tu-hero-sub">Development Beyond The Chessboard</p>
      <p class="tu-hero-body">
        Every participant is automatically enrolled in the TEAMUP Development Programme upon registration. Designed to help young minds grow not only as chess players, but as learners, leaders, creators, and problem-solvers.
      </p>
      <div class="tu-hero-actions">
        <RegisterBtn href="/register" class="tu-hero-btn">Enrol Now</RegisterBtn>
        <a href="#pillars" class="button-secondary tu-hero-btn">Explore Pillars</a>
      </div>
    </div>
    <div class="tu-hero-visual" use:motionFadeUp>
      <div class="tu-hero-img-frame">
        <div class="tu-hero-img" style="background-image: url({hero_img})"></div>
        <div class="tu-hero-img-overlay"></div>
      </div>
      <div class="tu-hero-accent"></div>
    </div>
  </div>
</section>

<style>
  .tu-hero {
    position: relative;
    min-height: 100dvh;
    display: flex;
    align-items: center;
    overflow: hidden;
    background: var(--canvas);
    padding-top: 72px;
  }

  .tu-hero-bg {
    position: absolute;
    inset: 0;
    pointer-events: none;
    background:
      radial-gradient(ellipse 70% 60% at 10% 50%, rgba(242, 120, 48, 0.06), transparent 70%),
      radial-gradient(ellipse 50% 50% at 90% 80%, rgba(93, 184, 166, 0.05), transparent 60%);
  }

  .tu-hero-inner {
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

  .tu-hero-content {
    max-width: 540px;
  }

  .tu-hero-title {
    font-family: var(--font-display);
    font-size: clamp(2.8rem, 5vw, 4.5rem);
    font-weight: 500;
    line-height: 1.08;
    letter-spacing: -0.02em;
    color: var(--ink);
    margin: 0;
    max-width: 640px;
    text-wrap: balance;
  }

  .tu-hero-sub {
    font-family: var(--font-display);
    font-size: clamp(1.1rem, 2vw, 1.4rem);
    font-weight: 500;
    letter-spacing: -0.01em;
    color: var(--body);
    margin: 20px 0 0;
    line-height: 1.4;
  }

  .tu-hero-body {
    font-size: 17px;
    line-height: 1.65;
    color: var(--body);
    margin: 24px 0 0;
  }

  .tu-hero-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    margin-top: 36px;
  }

  .tu-hero-btn {
    min-height: 48px;
    padding: 14px 28px;
    font-size: 15px;
  }

  .tu-hero-visual {
    position: relative;
    display: grid;
    place-items: center;
  }

  .tu-hero-img-frame {
    position: relative;
    width: min(100%, 440px);
    aspect-ratio: 3/4;
    border-radius: 16px;
    overflow: hidden;
  }

  .tu-hero-img {
    position: absolute;
    inset: 0;
    background-size: cover;
    background-position: center;
    filter: grayscale(0.25) contrast(1.1);
    transition: transform 800ms ease;
  }

  .tu-hero-img-frame:hover .tu-hero-img {
    transform: scale(1.05);
  }

  .tu-hero-img-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, rgba(242, 120, 48, 0.15), transparent 50%);
    pointer-events: none;
  }

  .tu-hero-accent {
    position: absolute;
    width: 120%;
    height: 120%;
    top: -10%;
    left: -10%;
    border-radius: 24px;
    border: 1px solid rgba(242, 120, 48, 0.1);
    z-index: -1;
    pointer-events: none;
  }

  @media (max-width: 1024px) {
    .tu-hero-inner {
      grid-template-columns: 1fr;
      gap: 48px;
      padding: 64px 0;
    }
    .tu-hero-content {
      max-width: none;
    }
    .tu-hero-visual {
      order: -1;
    }
    .tu-hero-img-frame {
      max-width: 360px;
    }
  }

  @media (max-width: 767px) {
    .tu-hero-title {
      font-size: clamp(2rem, 8vw, 2.8rem);
    }
    .tu-hero-body {
      font-size: 15px;
    }
  }
</style>