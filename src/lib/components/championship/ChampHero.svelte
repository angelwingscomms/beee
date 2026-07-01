<script lang="ts">
  import heroBg from '$lib/assets/images/hero-bg.png?enhanced';
  import RegisterBtn from '$lib/components/RegisterBtn.svelte';
</script>

<section class="champ-hero">
  <enhanced:img src={heroBg} alt="" class="champ-hero-bg-img" sizes="100vw" fetchpriority="high" />
  <div class="champ-hero-overlay"></div>
  <div class="champ-hero-noise"></div>
  <div class="champ-hero-body container">
    <p class="champ-hero-eyebrow">BEEE Spectacular Chess Championship Abuja 2026</p>
    <h1 class="champ-hero-title">
      More Than a Chess Championship
    </h1>
    <p class="champ-hero-hook"><span>Leadership, Mentorship, and Growth</span><span class="champ-hero-hook-cursive"> &mdash; make your move</span></p>
    <div class="champ-hero-actions">
      <RegisterBtn href="/register" class="champ-hero-btn-primary">Register Now</RegisterBtn>
      <a href="#champ-intro" class="champ-hero-btn-secondary">Learn more</a>
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

  .champ-hero-bg-img {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    filter: saturate(1.05) contrast(1.1);
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
    font-size: clamp(0.875rem, 1.6vw, 1.25rem);
    font-weight: 500;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--on-dark);
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

  .champ-hero-hook {
    max-width: 800px;
    margin: 20px auto 0;
    font-size: 18px;
    line-height: 1.5;
    color: var(--on-dark);
    font-family: var(--font-body);
  }
  .champ-hero-hook-cursive {
    font-family: var(--font-display);
    font-style: italic;
    font-weight: 700;
    font-size: 1.3em;
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
    .champ-hero-hook {
      font-size: 16px;
      margin-top: 16px;
    }  }
</style>
