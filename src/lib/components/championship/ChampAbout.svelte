<script lang="ts">
  import aboutBg from '$lib/assets/images/championship/about-new.png?enhanced';
  import RegisterBtn from '$lib/components/RegisterBtn.svelte';
</script>

<section class="champ-about" style="background-image: url({aboutBg.img.src})">
  <div class="champ-about-scrim"></div>
  <div class="champ-about-pin">
    <div class="container champ-about-grid">
      <div class="champ-about-sticky">
        <h2 class="champ-about-title">Why BEEE?</h2>
      </div>
      <div class="champ-about-text">
        <p class="champ-about-intro">Every child holds extraordinary potential. We build strategic thinkers, confident leaders, and lifelong learners — one move at a time.</p>
        <blockquote class="champ-about-quote">Chess is not the destination. It is the platform.</blockquote>
        <div class="champ-about-vision">
          <span class="champ-about-eyebrow">OUR VISION</span>
          <p class="champ-about-vision-text">A generation of confident thinkers who carry chess-forged skills into academics, leadership, and life.</p>
        </div>
      </div>
    </div>
  </div>
  <div class="champ-about-footer">
    <RegisterBtn href="/register" class="register-btn--hero">Register Now →</RegisterBtn>
  </div>
</section>

<style>
  .champ-about {
    display: flex;
    flex-direction: column;
    position: relative;
    color: var(--color-on-photo);
    background-size: cover;
    background-position: center;
    font-family: var(--font-body-hero);
  }

  .champ-about-scrim {
    position: absolute;
    inset: 0;
    z-index: 1;
    pointer-events: none;
    background: linear-gradient(100deg, rgba(30, 20, 13, 0.12) 0%, rgba(30, 20, 13, 0.62) 46%, rgba(30, 20, 13, 0.86) 100%);
  }

  .champ-about-pin {
    position: relative;
    z-index: 2;
    padding: 120px 0 80px;
  }

  .champ-about-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 48px;
    align-items: start;
  }

  .champ-about-sticky {
    position: sticky;
    top: 96px;
  }

  .champ-about-title {
    margin: 0;
    font-family: var(--font-display-hero);
    font-variation-settings: 'opsz' 72, 'SOFT' 30, 'WONK' 0;
    font-weight: 480;
    font-size: var(--fs-h1);
    line-height: 1.05;
    letter-spacing: -0.01em;
    color: var(--color-on-photo);
  }

  .champ-about-text {
    max-width: 60ch;
    line-height: var(--lh-body);
    animation: hero-fade-in 500ms ease-out;
  }

  @keyframes hero-fade-in {
    from { opacity: 0; translate: 0 12px; }
    to { opacity: 1; translate: 0 0; }
  }

  .champ-about-intro {
    margin: 0 0 var(--space-4);
    font-family: var(--font-body-hero);
    font-size: var(--fs-body);
    line-height: var(--lh-body);
    font-weight: 400;
    color: var(--color-on-photo);
  }

  .champ-about-text p {
    font-family: var(--font-body-hero);
    font-size: var(--fs-body);
    line-height: var(--lh-body);
    font-weight: 400;
    color: var(--color-on-photo);
  }

  .champ-about-quote {
    margin: var(--space-5) 0;
    padding: 0;
    border: none;
    font-family: var(--font-display-hero);
    font-style: italic;
    font-variation-settings: 'opsz' 40, 'SOFT' 50, 'WONK' 0;
    font-size: var(--fs-quote);
    color: var(--color-brand);
    line-height: 1.25;
  }

  .champ-about-vision {
    margin: 0 0 var(--space-5);
  }

  .champ-about-eyebrow {
    display: block;
    font-family: var(--font-body-hero);
    font-size: var(--fs-eyebrow);
    font-weight: 600;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--color-on-photo-muted);
    margin-bottom: 8px;
  }

  .champ-about-vision-text {
    margin: 0;
  }

  .champ-about-footer {
    position: relative;
    z-index: 2;
    min-height: 140px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--color-ink-warm);
  }

  :global(.register-btn--hero) {
    padding: 18px 44px !important;
    font-size: 18px !important;
    background: var(--color-brand) !important;
    border-radius: var(--radius-pill) !important;
    color: var(--color-on-photo) !important;
    box-shadow: 0 4px 14px rgba(242, 120, 48, 0.35) !important;
  }

  :global(.register-btn--hero:hover) {
    background: var(--color-brand-dark) !important;
    transform: translateY(-1px) !important;
    box-shadow: 0 8px 22px rgba(242, 120, 48, 0.5) !important;
  }

  :global(.champ-nav-bg) {
    background: rgba(30, 20, 13, 0.88) !important;
    backdrop-filter: blur(10px) !important;
    -webkit-backdrop-filter: blur(10px) !important;
  }

  :global(.champ-nav-links a),
  :global(.champ-nav-name),
  :global(.footer-nav a) {
    font-family: var(--font-body-hero) !important;
  }

  :global(#svelte) {
    min-height: auto;
  }

  @media (min-width: 1440px) {
    .champ-about-text {
      padding-right: var(--space-6);
    }
  }

  @media (max-width: 767px) {
    .champ-about-pin {
      padding: 80px 0 48px;
    }
    .champ-about-grid {
      grid-template-columns: 1fr;
      gap: 24px;
    }
    .champ-about-sticky {
      position: static;
    }
    .champ-about-text {
      padding-right: 0;
    }
    .champ-about-footer {
      min-height: 100px;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .champ-about-text {
      animation: none;
      opacity: 1;
      translate: none;
    }
  }
</style>
