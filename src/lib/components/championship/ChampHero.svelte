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

      <p class="hero-anim-elem font-['Inter'] text-sm text-amber-400/90 mb-8 max-w-lg">
        Ages 10–14 · Abuja · Coaching underway · Finale: National Stadium, October 10, 2026 · ₦{HERO_AMOUNT.toLocaleString()}
      </p>

      <div class="hero-anim-elem flex flex-col gap-3 mb-10">
        <div class="flex items-center gap-3 text-lg">
          <svg class="w-[18px] h-[18px] text-amber-400/70" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"/></svg>
          <span class="text-white font-medium">10–14 years</span>
        </div>
        <div class="flex items-center gap-3 text-lg">
          <svg class="w-[18px] h-[18px] text-amber-400/70" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M9.568 3H5.25A2.25 2.25 0 0 0 3 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 0 0 5.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 0 0 9.568 3Z"/><path stroke-linecap="round" stroke-linejoin="round" d="M6 6h.008v.008H6V6Z"/></svg>
          <span class="text-white font-medium">₦{HERO_AMOUNT.toLocaleString()}</span>
        </div>
      </div>

      <div class="hero-anim-elem flex flex-col gap-2 mb-8 text-sm sm:text-base">
        <p class="leading-relaxed text-amber-400 font-medium mb-2">The championship Timeline:</p>
        <div class="flex flex-col gap-2 border-l-2 border-amber-400/60 pl-4">
          <p class="leading-relaxed text-gray-300"><span class="text-amber-400 font-medium">July 28, 2026</span><br />Online coaching begins</p>
          <p class="leading-relaxed text-gray-300"><span class="text-amber-400 font-medium">Aug–Sep 2026</span><br />TEAMUP development</p>
          <p class="leading-relaxed text-gray-300"><span class="text-amber-400 font-medium">September 2026</span><br />Live Preliminary competitions hold</p>
          <p class="leading-relaxed text-gray-300"><span class="text-amber-400 font-medium">October 10, 2026</span><br />Top finalists advance to an elite, immersive Championship grand finale</p>
        </div>
        <p class="leading-relaxed text-gray-300 mt-2">Slots are limited — and coaching is underway, so registering now gives your child the longest run.</p>
      </div>

      <div class="hero-anim-elem flex gap-4 flex-col sm:flex-row">
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
