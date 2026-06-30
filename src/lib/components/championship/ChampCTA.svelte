<script lang="ts">
  import RegisterBtn from '$lib/components/RegisterBtn.svelte';
  let el: HTMLElement;
  let visible = $state(false);

  $effect(() => {
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { visible = true; obs.disconnect(); }
    }, { threshold: 0.2 });
    obs.observe(el);
    return () => obs.disconnect();
  });
</script>

<section bind:this={el} class="champ-cta" class:visible>
  <div class="champ-cta-bg"></div>
  <div class="champ-cta-overlay"></div>
  <div class="champ-cta-noise"></div>
  <div class="container champ-cta-body" class:visible>
    <h2 class="champ-cta-title">Aspire to BEEE</h2>
    <p class="champ-cta-sub">Be Everything Excellent Every Day</p>
    <p class="champ-cta-tagline">More Than a Chess Championship. Make Your Move.</p>
    <div class="champ-cta-actions">
      <RegisterBtn href="/register" class="champ-cta-btn-primary">Register Now</RegisterBtn>
      <a href="/faq" class="champ-cta-btn-secondary">View FAQ</a>
    </div>
  </div>
</section>

<style>
  .champ-cta {
    position: relative;
    min-height: 80vh;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    background: var(--surface-dark);
  }

  .champ-cta-bg {
    position: absolute;
    inset: 0;
    /* TODO: Generate — Photorealistic 3D render, full row of ivory-and-gold chess pieces like triumphant army on reflective marble, crowned king and queen elevated center, backlit by bright golden nebula burst, ringed planet and asteroids, warm victorious glow, wide cinematic 16:9, darker clear band at bottom for CTA buttons. */
    background-image: url('/images/championship/cta-triumph.png');
    background-size: cover;
    background-position: center;
    opacity: 0;
    transform: scale(1.08);
    transition: opacity 1.2s cubic-bezier(0.16, 1, 0.3, 1), transform 1.4s cubic-bezier(0.16, 1, 0.3, 1);
    filter: saturate(1.05) contrast(1.1);
  }

  .champ-cta.visible .champ-cta-bg {
    opacity: 1;
    transform: scale(1);
  }

  .champ-cta-overlay {
    position: absolute;
    inset: 0;
    background:
      /* Increased center opacity for bright golden background */
      radial-gradient(ellipse 70% 50% at 50% 50%, rgba(24,23,21,0.35) 0%, rgba(24,23,21,0.88) 100%),
      url('/images/championship/cta-bg.png');
    background-size: cover;
    background-position: center;
  }

  .champ-cta-noise::before {
    content: '';
    position: absolute;
    inset: 0;
    opacity: 0.03;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
    background-repeat: repeat;
    background-size: 256px 256px;
    pointer-events: none;
    z-index: 1;
  }

  .champ-cta-body {
    position: relative;
    z-index: 2;
    text-align: center;
    max-width: 800px;
    padding: 120px 0;
  }

  .champ-cta-body > * {
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 600ms cubic-bezier(0.16, 1, 0.3, 1), transform 600ms cubic-bezier(0.16, 1, 0.3, 1);
  }

  .champ-cta-body.visible > * {
    opacity: 1;
    transform: translateY(0);
  }

  .champ-cta-body.visible > *:nth-child(2) { transition-delay: 0.12s; }
  .champ-cta-body.visible > *:nth-child(3) { transition-delay: 0.24s; }
  .champ-cta-body.visible > *:nth-child(4) { transition-delay: 0.36s; }

  .champ-cta-title {
    margin: 0;
    font-family: var(--font-display);
    font-size: clamp(2.4rem, 4.4vw, 4rem);
    font-weight: 500;
    line-height: 1.08;
    letter-spacing: -0.02em;
    color: var(--on-dark);
    text-wrap: balance;
  }

  .champ-cta-sub {
    max-width: 680px;
    margin: 20px auto 0;
    font-size: 17px;
    line-height: 1.65;
    color: rgba(250, 249, 245, 0.7);
  }

  .champ-cta-tagline {
    max-width: 680px;
    margin: 16px auto 0;
    font-size: 15px;
    line-height: 1.5;
    color: rgba(250, 249, 245, 0.5);
    font-style: italic;
  }

  .champ-cta-actions {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 12px;
    margin-top: 36px;
  }

  :global(.champ-cta-btn-primary) {
    min-height: 48px;
    padding: 14px 32px;
    font-size: 15px;
  }

  .champ-cta-btn-secondary {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-height: 48px;
    padding: 14px 32px;
    border-radius: 999px;
    font-size: 15px;
    font-weight: 500;
    line-height: 1;
    background: transparent;
    color: var(--on-dark);
    border: 1px solid rgba(250, 249, 245, 0.25);
    transition: background 160ms ease, border-color 160ms ease, transform 160ms ease;
  }

  .champ-cta-btn-secondary {
    background: transparent;
    color: var(--on-dark);
    border: 1px solid rgba(250, 249, 245, 0.25);
  }

  .champ-cta-btn-secondary:hover {
    background: rgba(250, 249, 245, 0.08);
    border-color: rgba(250, 249, 245, 0.4);
    transform: scale(1.03);
  }

  @media (max-width: 767px) {
    .champ-cta-body {
      padding: 80px 0;
    }
    .champ-cta-title {
      font-size: clamp(1.6rem, 6vw, 2rem);
    }
    .champ-cta-sub {
      font-size: 15px;
    }
  }
</style>
