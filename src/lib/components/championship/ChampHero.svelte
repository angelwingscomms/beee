<script lang="ts">
  import RegisterBtn from '$lib/components/RegisterBtn.svelte';
  let loaded = $state(true);
</script>

<section class="champ-hero">
  <div class="champ-hero-bg" class:loaded>
    <div class="champ-hero-overlay"></div>
    <div class="champ-hero-noise"></div>
  </div>
  <div class="champ-hero-body container">
    <p class="champ-hero-eyebrow">BEEE Spectacular Chess Championship Abuja 2026</p>
    <h1 class="champ-hero-title">
      More Than a Chess Championship
    </h1>
    <p class="champ-hero-sub">The BEEE Spectacular Chess Championship Abuja 2026 is a unique youth development initiative that combines competitive chess with leadership development, mentorship, creativity, innovation, and personal growth through the T.E.A.M.U.P.™ (Technology, Enterprise, Art, Mentorship and Upskill) Development Programme.</p>
    <p class="champ-hero-sub">Designed for chess players aged 10–14 years in schools across Abuja, the programme provides participants with a structured journey of learning, achievement, and competition that extends far beyond the chessboard.</p>
    <div class="champ-hero-actions">
      <RegisterBtn href="/register" class="champ-hero-btn-primary">Make Your Move</RegisterBtn>
      <a href="/register" class="champ-hero-btn-secondary">Register Now</a>
    </div>
  </div>
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
    background-image: url('/cosmic-chess-bg.png');
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

  .champ-hero-eyebrow {
    margin: 0 0 12px;
    font-size: 13px;
    font-weight: 500;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: rgba(250, 249, 245, 0.55);
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

  :global(.champ-hero-btn-primary) {
    min-height: 46px;
    padding: 14px 28px;
  }

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
    background: transparent;
    color: var(--on-dark);
    border: 1px solid rgba(250, 249, 245, 0.25);
    transition: background 160ms ease, border-color 160ms ease, transform 160ms ease;
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
