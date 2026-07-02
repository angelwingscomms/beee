<script lang="ts">
  import { onMount } from 'svelte';
  import heroBg from '$lib/assets/images/hero-bg.png?enhanced';
  import RegisterBtn from '$lib/components/RegisterBtn.svelte';
  import { REG_AMOUNT } from '$lib/constants';
  import { isHeroCtaVisible } from '$lib/stores';

  let heroCtaNode: HTMLDivElement | undefined = $state();

  onMount(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        isHeroCtaVisible.set(entries[0].isIntersecting);
      },
      { threshold: 0, rootMargin: '-80px 0px 0px 0px' }
    );

    if (heroCtaNode) {
      observer.observe(heroCtaNode);
    }

    return () => {
      if (heroCtaNode) observer.unobserve(heroCtaNode);
    };
  });
</script>

<section class="champ-hero">
  <enhanced:img src={heroBg} alt="" class="champ-hero-bg-img" sizes="100vw" fetchpriority="high" />
  <div class="champ-hero-overlay"></div>
  <div class="champ-hero-noise"></div>
  <div class="champ-hero-body container">
    <p class="champ-hero-eyebrow">BEEE Spectacular Chess Championship</p>
    <h1 class="champ-hero-title">
      More Than a Chess Championship
    </h1>
    <p class="champ-hero-hook">Leadership, Mentorship, and Growth — Make your move.</p>
    <div class="champ-hero-info">
      <div class="champ-hero-info-item">
        <svg width="20" height="20" viewBox="0 0 16 16" fill="none" aria-hidden="true"><rect x="1.5" y="2.5" width="13" height="12" rx="2" stroke="currentColor" stroke-width="2.5"/><path d="M1 6H15" stroke="currentColor" stroke-width="2.5"/><path d="M5 1V4M11 1V4" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/></svg>
        <span>October 10, 2026</span>
      </div>
      <div class="champ-hero-info-divider"></div>
      <div class="champ-hero-info-item">
        <svg width="20" height="20" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M8 1C5.2 1 3 3.2 3 6C3 9.5 8 15 8 15C8 15 13 9.5 13 6C13 3.2 10.8 1 8 1Z" stroke="currentColor" stroke-width="2.5"/><circle cx="8" cy="6" r="2" stroke="currentColor" stroke-width="2.5"/></svg>
        <span>Abuja, Nigeria</span>
      </div>
      <div class="champ-hero-info-divider"></div>
      <div class="champ-hero-info-item">
        <svg width="20" height="20" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M2 8.5L7.5 2L14 2.5L13.5 9L8 15.5L2 8.5Z" stroke="currentColor" stroke-width="2.5" stroke-linejoin="round"/><circle cx="10.5" cy="5.5" r="0.8" fill="currentColor"/></svg>
        <span>₦{REG_AMOUNT.toLocaleString()} per participant</span>
      </div>
    </div>
    <div class="champ-hero-actions">
      <div bind:this={heroCtaNode}><RegisterBtn href="/register" class="champ-hero-btn-primary">Register</RegisterBtn></div>
      <a href="#champ-intro" class="champ-hero-btn-secondary">Why BEEE? →</a>
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
      linear-gradient(180deg, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.8) 100%),
      radial-gradient(ellipse at center, rgba(0,0,0,0.5) 0%, transparent 70%);
    pointer-events: none;
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
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--primary);
  }

  .champ-hero-title {
    margin: 0 auto;
    font-family: var(--font-display);
    font-size: clamp(2.8rem, 4vw, 4.5rem);
    font-weight: 500;
    line-height: 1.08;
    letter-spacing: -0.02em;
    color: var(--on-dark);
    text-wrap: balance;
    max-width: 56rem;
    text-shadow: 0 2px 8px rgba(0,0,0,0.3);
  }

  .champ-hero-hook {
    max-width: 800px;
    margin: 20px auto 0;
    font-size: 18px;
    line-height: 1.5;
    color: var(--on-dark);
    font-family: var(--font-body);
  }
  .champ-hero-info {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 24px;
    margin-top: 12px;
    margin-bottom: 32px;
  }
  .champ-hero-info-item {
    display: flex;
    align-items: center;
    gap: 6px;
    color: var(--on-dark);
    font-size: 14px;
    line-height: 1;
  }
  .champ-hero-info-item svg {
    width: 16px;
    height: 16px;
    flex-shrink: 0;
  }
  .champ-hero-info-divider {
    width: 1px;
    height: 16px;
    background: rgba(250, 249, 245, 0.2);
    flex-shrink: 0;
  }

  .champ-hero-actions {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 12px;
    margin-top: 0;
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
    font-weight: 600;
    line-height: 1;
    background: rgba(0,0,0,0.4);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    color: rgba(255,255,255,0.9);
    border: 1px solid rgba(255,255,255,0.6);
    transition: background 160ms ease, color 160ms ease, border-color 160ms ease, transform 160ms ease;
  }

  .champ-hero-btn-secondary:hover {
    background: rgba(255,255,255,1);
    color: rgba(0,0,0,1);
    border-color: rgba(255,255,255,1);
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
  @media (max-width: 639px) {
    .champ-hero-info {
      flex-direction: column;
      gap: 8px;
    }
    .champ-hero-info-divider {
      width: 40px;
      height: 1px;
    }
  }
</style>
