<script lang="ts">
  let loaded = $state(false);
</script>

<section class="champ-hero">
  <div class="champ-hero-bg" class:loaded>
    <div class="champ-hero-overlay"></div>
    <div class="champ-hero-noise"></div>
  </div>
  <div class="champ-hero-body container">
    <h1 class="champ-hero-title">
      More Than A Chess Championship
    </h1>
    <p class="champ-hero-sub">Competitive chess meets structured mentorship, leadership, and personal growth through the T.E.A.M.U.P. Programme.</p>
    <div class="champ-hero-actions">
      <a href="/register" class="champ-hero-btn-primary">Register Now</a>
      <a href="#features" class="champ-hero-btn-secondary">Explore the Programme</a>
    </div>
  </div>
  <div class="champ-hero-gradient"></div>
</section>

<style>
  .champ-hero {
    position: relative;
    min-height: 100dvh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    background: var(--surface-dark);
  }

  .champ-hero-bg {
    position: absolute;
    inset: 0;
    background-image: url('https://picsum.photos/seed/chess-championship-abuja/1920/1080');
    background-size: cover;
    background-position: center;
    opacity: 0;
    transition: opacity 1.2s cubic-bezier(0.16, 1, 0.3, 1);
    filter: saturate(1.05) contrast(1.1);
  }

  .champ-hero-bg.loaded {
    opacity: 1;
  }

  .champ-hero-overlay {
    position: absolute;
    inset: 0;
    background:
      radial-gradient(ellipse 80% 50% at 50% 40%, rgba(24,23,21,0.3) 0%, rgba(24,23,21,0.78) 100%);
  }

  .champ-hero-noise::before {
    content: '';
    position: absolute;
    inset: 0;
    opacity: 0.035;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
    background-repeat: repeat;
    background-size: 256px 256px;
    pointer-events: none;
    z-index: 1;
  }

  /* ── Hero Body ── */
  .champ-hero-body {
    position: relative;
    z-index: 2;
    text-align: center;
    padding: 120px 0 160px;
    max-width: 880px;
  }

  .champ-hero-title {
    margin: 0;
    font-family: var(--font-display);
    font-size: clamp(2.8rem, 4vw, 4.5rem);
    font-weight: 500;
    line-height: 1.08;
    letter-spacing: -0.02em;
    color: var(--on-dark);
    text-wrap: balance;
  }

  .champ-hero-sub {
    max-width: 580px;
    margin: 28px auto 0;
    font-size: 17px;
    line-height: 1.65;
    color: rgba(250, 249, 245, 0.7);
  }

  .champ-hero-actions {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 12px;
    margin-top: 40px;
  }

  .champ-hero-btn-primary,
  .champ-hero-btn-secondary {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-height: 46px;
    padding: 14px 28px;
    border-radius: 999px;
    font-size: 14px;
    font-weight: 500;
    line-height: 1;
    transition: background 160ms ease, border-color 160ms ease, transform 160ms ease;
  }

  .champ-hero-btn-primary {
    background: var(--primary);
    color: var(--on-primary);
    border: 1px solid var(--primary);
  }

  .champ-hero-btn-primary:hover {
    background: var(--primary-active);
    border-color: var(--primary-active);
    transform: scale(1.03);
  }

  .champ-hero-btn-secondary {
    background: transparent;
    color: var(--on-dark);
    border: 1px solid rgba(250, 249, 245, 0.25);
  }

  .champ-hero-btn-secondary:hover {
    background: rgba(250, 249, 245, 0.08);
    border-color: rgba(250, 249, 245, 0.4);
    transform: scale(1.03);
  }

  .champ-hero-gradient {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 200px;
    background: linear-gradient(180deg, transparent, var(--canvas));
    z-index: 2;
    pointer-events: none;
  }

  @media (max-width: 767px) {
    .champ-hero-body {
      padding: 100px 0 120px;
    }
    .champ-hero-title {
      font-size: clamp(2rem, 7vw, 2.6rem);
    }
    .champ-hero-sub {
      font-size: 15px;
      margin-top: 20px;
    }  }
</style>
