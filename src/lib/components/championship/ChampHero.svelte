<script lang="ts">
  import { onMount } from 'svelte';
  import gsap from 'gsap';
  import Button from '$lib/components/Button.svelte';
  import Modal from '$lib/components/Modal.svelte';
  import { pushState } from '$app/navigation';
  import { page } from '$app/stores';
  import { dev } from '$app/environment';
  import { REG_AMOUNT, DEV_REG_FEE_NAIRA, DISCOUNT_PCT, COMMISSION_PCT } from '$lib/constants';

  const HERO_AMOUNT = dev ? DEV_REG_FEE_NAIRA : REG_AMOUNT;
  // Commissions are only paid on referred (discounted) registrations — see partner/+page.svelte.
  const COMMISSION_NAIRA = Math.round(REG_AMOUNT * (1 - DISCOUNT_PCT / 100) * COMMISSION_PCT / 100);
  onMount(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    gsap.from('.hero-anim-elem', {
      y: 30,
      autoAlpha: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: 'power3.out',
      delay: 0.2,
      clearProps: 'all',
    });
  });
</script>

<section class="min-h-screen relative overflow-hidden flex items-center bg-navy">
  <div class="absolute inset-0 pointer-events-none" style="background: radial-gradient(ellipse 120% 100% at 0% 0%, #1A2B4C 0%, transparent 70%)"></div>

  <div class="max-w-[96rem] mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center pt-24 pb-12 relative z-10">

    <div class="lg:col-span-4">
      <h1 class="hero-anim-elem font-hero text-sm lg:text-base font-semibold uppercase tracking-[0.14em] text-amber-400 mb-5">
        BEEE Spectacular Chess Championship Abuja 2026
      </h1>

      <h2 class="hero-anim-elem font-hero text-5xl lg:text-7xl font-extrabold text-white leading-[1.05] tracking-tight mb-6">
        Chess is where they learn.<br />Life is where they lead.
      </h2>

      <p class="hero-anim-elem font-['Inter'] text-[1.05rem] text-gray-300 leading-relaxed mb-8 max-w-lg">
        A transformative championship journey that combines competitive chess, AI-powered coaching, leadership development, mentorship, and a purposeful self development programme.
      </p>

      <p class="hero-anim-elem venue-line">
        <svg class="w-4 h-4 text-amber-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"/></svg>
        <span>National Stadium, Abuja — October 10, 2026</span>
      </p>

      <div class="hero-anim-elem flex gap-4 flex-col sm:flex-row mt-8">
        <Button href="/register" class="px-8 py-4 w-full sm:w-auto text-base">Register your child — ₦{HERO_AMOUNT.toLocaleString()}</Button>
        <Button href="/championship" bg="0" class="px-8 py-4 w-full sm:w-auto text-base">See how it works</Button>
      </div>

      <button type="button" class="footer-partner mt-6 inline-block bg-transparent border-0 cursor-pointer" onclick={() => pushState('', { partner: true })}>Become a Partner →</button>

    </div>

    <div class="lg:col-span-8 flex justify-center items-center">
      <div class="relative w-full max-w-2xl aspect-square lg:aspect-[4/5] rounded-3xl overflow-visible">
        <img
          src="/images/hero.png"
          alt="Student playing chess"
          class="object-cover rounded-3xl w-full h-full"
          fetchpriority="high"
        />

        <!-- feature-float-cards -->
        <!-- E4 AI feedback card
        <div bind:this={float1} class="absolute -right-4 lg:-right-12 top-12 max-w-[280px] z-10 bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl p-4 rounded-2xl flex flex-col gap-3">
          <div class="flex items-center gap-2">
            <span class="w-4 h-4 bg-amber-400/20 rounded flex items-center justify-center text-xs shrink-0">🧠</span>
            <span class="text-[10px] text-gray-400 font-mono uppercase tracking-wider">E4&#8482; AI</span>
          </div>
          <p class="text-[13px] text-white leading-relaxed">
            Excellent strategic defense. Consider Knight to F3 to develop your center.
          </p>
        </div>
        -->
        <!-- feature-float-cards -->
        <!-- Taskify Progress card
        <div bind:this={float2} class="absolute -left-4 lg:-left-12 bottom-12 max-w-[240px] z-10 bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl p-4 rounded-2xl">
          <p class="text-xs font-bold text-white mb-2">TASKIFY&#8482; Progress</p>
          <div class="w-full h-1.5 bg-white/20 rounded-full mb-3">
            <div class="w-[75%] h-full bg-amber-400 rounded-full"></div>
          </div>
          <div class="flex gap-2">
            <span class="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-xs">💡</span>
            <span class="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-xs">♟&#xFE0E;</span>
            <span class="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-xs">🚀</span>
          </div>
        </div>
        -->
      </div>
    </div>

  </div>
</section>

{#if $page.state.partner}
  <Modal onclose={() => history.back()}>
    <h2 class="partner-title">Partner With Us &amp; Earn Rewards!</h2>
    <p class="partner-body">Earn ₦{COMMISSION_NAIRA.toLocaleString()} for every registration completed through your unique referral link. Share BEEE Spectacular Chess Championship 2026 with your school, club, or parent network today!</p>
    <a href="/partner" class="partner-btn partner-btn-primary">Become a Partner</a>
  </Modal>
{/if}

<style>
  .venue-line {
    display: flex;
    align-items: center;
    gap: 8px;
    font-family: 'Inter', sans-serif;
    font-size: 15px;
    color: #d1d5db;
    margin-bottom: 8px;
    padding: 10px 16px;
    background: rgba(255, 255, 255, 0.04);
    border: 1px solid rgba(255, 255, 255, 0.06);
    border-radius: 10px;
    max-width: 420px;
  }

  .footer-partner {
    font-size: 16px;
    font-weight: 600;
    color: var(--accent-amber);
    text-decoration: none;
    transition: color 160ms ease;
  }

  .footer-partner:hover {
    color: #ffffff;
  }

  .partner-title {
    font-family: var(--font-hero);
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--accent-amber);
    margin-bottom: 1rem;
    text-align: center;
  }

  .partner-body {
    color: #cbd5e1;
    font-size: 0.95rem;
    line-height: 1.6;
    margin-bottom: 1.75rem;
    text-align: center;
  }

  .partner-btn {
    display: inline-block;
    min-width: 70%;
    padding: 0.85rem 1rem;
    border-radius: 9999px;
    font-weight: 600;
    text-decoration: none;
    margin: 0.75rem auto 0;
  }

  .partner-btn-primary {
    background: #f59e0b;
    color: #0f172a;
  }
</style>
