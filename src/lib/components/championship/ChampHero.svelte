<script lang="ts">
  import { onMount } from 'svelte';
  import gsap from 'gsap';
  import Button from '$lib/components/Button.svelte';
  import Modal from '$lib/components/Modal.svelte';
  import { pushState } from '$app/navigation';
  import { page } from '$app/stores';
  import { dev } from '$app/environment';
  import { REG_AMOUNT, DEV_REG_FEE_NAIRA, DISCOUNT_PCT, COMMISSION_PCT, D_FREE_OPEN, D_PAY_REQUIRED, D_ENTRY_CLOSE, D_FINALE } from '$lib/constants';

  const HERO_AMOUNT = dev ? DEV_REG_FEE_NAIRA : REG_AMOUNT;
  // Commissions are only paid on referred (discounted) registrations , see partner/+page.svelte.
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

  function partnerAnim(el: HTMLElement) {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    gsap.fromTo(
      el.querySelectorAll('.partner-anim'),
      { y: 24, autoAlpha: 0 },
      { y: 0, autoAlpha: 1, duration: 0.5, stagger: 0.12, ease: 'power3.out', delay: 0.35 },
    );
  }
</script>

<section class="min-h-screen relative overflow-hidden flex items-center bg-navy">
  <div class="absolute inset-0 pointer-events-none" style="background: radial-gradient(ellipse 120% 100% at 0% 0%, #1A2B4C 0%, transparent 70%)"></div>

  <div class="max-w-[96rem] mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center pt-24 pb-20 relative z-10">

    <div class="lg:col-span-4">
      <h1 class="hero-anim-elem font-hero text-xl sm:text-3xl lg:text-3xl font-bold uppercase tracking-[0.08em] text-amber-400 mb-5 leading-tight">
        BEEE Spectacular Chess Championship Abuja 2026
      </h1>

      <h2 class="hero-anim-elem font-hero text-5xl lg:text-7xl font-extrabold text-white leading-[1.05] tracking-tight mb-6">
        Chess is where they learn.<br />Life is where they lead.
      </h2>

      <p class="hero-anim-elem font-['Inter'] text-[0.95rem] text-gray-300 leading-relaxed mb-8 max-w-lg">
        A high-level, transformative chess experience combining advanced AI coaching, mentorship, and strategic self-leadership development.
      </p>

      <div class="hero-anim-elem schedule-card">
        <div class="schedule-row">
          <svg class="schedule-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/></svg>
          <div>
            <p class="schedule-title">Free Online Coaching and Training</p>
            <p class="schedule-sub"><span class="text-amber-400 font-semibold">{D_FREE_OPEN}</span>: 10 days FREE access to e4 Chess Coach training platform begins.</p>
          </div>
        </div>
        <p class="venue-line">
          <svg class="w-4 h-4 text-amber-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M9.568 3H5.25A2.25 2.25 0 0 0 3 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 0 0 5.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 0 0 9.568 3Z"/><path stroke-linecap="round" stroke-linejoin="round" d="M6 6h.008v.008H6V6Z"/></svg>
          <span><span class="font-bold">₦{HERO_AMOUNT.toLocaleString()}</span> registration fee per player.</span>
        </p>
        <div class="schedule-row">
          <svg class="schedule-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"/></svg>
          <div>
            <p class="schedule-title">FREE access closes</p>
            <p class="schedule-sub"><span class="text-amber-400 font-semibold">{D_PAY_REQUIRED}</span>: Participants must pay the required registration fee to secure their slot and continue training after this date.</p>
          </div>
        </div>
        <div class="schedule-row">
          <svg class="schedule-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5"/></svg>
          <div>
            <p class="schedule-title">Registration closes</p>
            <p class="schedule-sub"><span class="text-amber-400 font-semibold">{D_ENTRY_CLOSE}</span>: Entry into the championship officially closes.</p>
          </div>
        </div>
        <div class="schedule-row">
          <svg class="schedule-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"/></svg>
          <div>
            <p class="schedule-title">Live Championship begins</p>
            <p class="schedule-sub"><span class="text-amber-400 font-semibold">October 2026</span>: Preliminary Rounds and Elite Qualifiers Stage at centres across Abuja.</p>
            <p class="schedule-sub"><span class="text-amber-400 font-semibold">{D_FINALE}</span>: Spectacular Championship Grand Finale at the National Stadium, Abuja.</p>
          </div>
        </div>
      </div>

      <p class="hero-anim-elem schedule-note">Register early to give your child a richer, more rewarding championship experience.</p>

      <div class="hero-anim-elem flex gap-4 flex-col sm:flex-row mt-6">
        <Button href="/register" class="px-8 py-4 w-full sm:w-auto text-base">Register Your Child</Button>
        <Button href="/teamup" bg="0" class="px-8 py-4 w-full sm:w-auto text-base">More Than A Championship</Button>
      </div>

      <button type="button" class="footer-partner mt-6 inline-block bg-transparent border-0 cursor-pointer" onclick={() => pushState('', { partner: true })}>Become a Partner →</button>

    </div>

    <div class="lg:col-span-8 flex justify-center items-center">
      <div class="relative w-full max-w-2xl aspect-square lg:aspect-[4/5] rounded-3xl overflow-visible">
        <img
          src="/images/hero.webp"
          alt="A young chess player aged 10 to 14 making a move at the BEEE Spectacular Chess Championship in Abuja"
          class="object-cover rounded-3xl w-full h-full"
          width="1600"
          height="900"
          fetchpriority="high"
          decoding="async"
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
  <div use:partnerAnim>
    <div class="partner-icon-wrap partner-anim">
      <svg class="partner-icon" width="48" height="48" viewBox="0 0 48 48" fill="none">
        <circle cx="24" cy="24" r="22" stroke="url(#pg)" stroke-width="1.5"/>
        <path d="M16 28c0-4 3-7 8-7s8 3 8 7v2H16v-2Z" stroke="url(#pg)" stroke-width="1.3" stroke-linejoin="round"/>
        <circle cx="24" cy="17" r="4" stroke="url(#pg)" stroke-width="1.3"/>
        <path d="M24 10v2M24 32v2M12 24h2M34 24h2" stroke="url(#pg)" stroke-width="1.3" stroke-linecap="round"/>
        <defs>
          <linearGradient id="pg" x1="8" y1="8" x2="40" y2="40">
            <stop stop-color="#ffb200"/>
            <stop offset="1" stop-color="#f59e0b"/>
          </linearGradient>
        </defs>
      </svg>
    </div>

    <p class="partner-eyebrow partner-anim">BEEE&#8482; Partner Programme</p>
    <h2 class="partner-title partner-anim">Share the Experience.<br>Earn Rewards.</h2>

    <p class="partner-reward partner-anim">
      <span class="partner-reward-amount">&#8358;{COMMISSION_NAIRA.toLocaleString()}</span>
      <span class="partner-reward-unit">per registration</span>
    </p>

    <p class="partner-body partner-anim">Help families discover the BEEE&#8482; Spectacular Chess Championship, and get paid for every participant that registers with your link.</p>

    <ol class="partner-steps partner-anim">
      <li><span class="partner-step-num">1</span>Get your link</li>
      <li><span class="partner-step-num">2</span>They register</li>
      <li><span class="partner-step-num">3</span>You get paid</li>
    </ol>

    <a href="/partner" class="partner-btn partner-btn-primary partner-anim">Get Your Personalised Link</a>
  </div>
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
    margin: 10px 16px;
    padding: 0;
    border: 0;
    border-radius: 0;
    max-width: 420px;
  }

  .schedule-card {
    display: flex;
    flex-direction: column;
    max-width: 420px;
    margin-bottom: 8px;
    background: rgba(255, 255, 255, 0.04);
    border: 1px solid rgba(255, 255, 255, 0.06);
    border-radius: 12px;
    overflow: hidden;
  }

  .schedule-row {
    display: flex;
    align-items: flex-start;
    gap: 12px;
    padding: 14px 16px;
  }

  .schedule-row + .schedule-row {
    border-top: 1px solid rgba(255, 255, 255, 0.06);
  }

  .schedule-icon {
    width: 18px;
    height: 18px;
    margin-top: 2px;
    color: #fbbf24;
    flex-shrink: 0;
  }

  .schedule-title {
    font-family: 'Inter', sans-serif;
    font-size: 15px;
    font-weight: 600;
    color: #ffffff;
    margin: 0;
    line-height: 1.4;
  }

  .schedule-sub {
    font-family: 'Inter', sans-serif;
    font-size: 14px;
    color: #9ca3af;
    margin: 2px 0 0;
    line-height: 1.45;
  }

  .schedule-note {
    font-family: 'Inter', sans-serif;
    font-size: 14px;
    color: #fbbf24;
    opacity: 0.9;
    max-width: 420px;
    margin: 8px 0 0;
    line-height: 1.5;
  }

  .footer-partner {
    font-size: 16px;
    font-weight: 600;
    color: var(--accent-amber);
    text-decoration: none;
    transition: color 160ms var(--ease-out);
  }

  .footer-partner:hover {
    color: #ffffff;
  }

  .partner-icon-wrap {
    margin: 0 auto 1.25rem;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 5rem;
    height: 5rem;
    border-radius: 50%;
    background: rgba(255, 178, 0, 0.08);
    box-shadow: 0 0 0 1px rgba(255, 178, 0, 0.18) inset;
  }

  .partner-icon {
    display: block;
  }

  .partner-eyebrow {
    font-family: var(--font-championship);
    font-size: 0.7rem;
    font-weight: 600;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: var(--accent-amber);
    opacity: 0.7;
    margin-bottom: 0.5rem;
    text-align: center;
  }

  .partner-title {
    font-family: var(--font-hero);
    font-size: 1.75rem;
    font-weight: 800;
    color: #fff;
    margin-bottom: 0.25rem;
    text-align: center;
    line-height: 1.15;
  }

  .partner-title-sub {
    font-size: 0.85rem;
    font-weight: 500;
    color: var(--accent-amber);
    opacity: 0.8;
  }

  .partner-reward {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.15rem;
    margin: 1.25rem 0 0;
  }

  .partner-reward-amount {
    font-family: var(--font-hero);
    font-size: clamp(2.5rem, 12vw, 3.25rem);
    font-weight: 800;
    line-height: 1;
    color: var(--accent-amber);
  }

  .partner-reward-unit {
    font-size: 0.7rem;
    font-weight: 600;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: #94a3b8;
  }

  .partner-body {
    color: #94a3b8;
    font-size: 0.9rem;
    line-height: 1.65;
    margin: 1rem auto 0;
    text-align: center;
    max-width: 30ch;
  }

  .partner-steps {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 0.5rem;
    margin: 1.5rem 0 0;
    padding: 0.9rem 0.5rem;
    list-style: none;
    border-top: 1px solid rgba(255, 255, 255, 0.07);
    border-bottom: 1px solid rgba(255, 255, 255, 0.07);
  }

  .partner-steps li {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.45rem;
    font-size: 0.72rem;
    font-weight: 600;
    letter-spacing: 0.02em;
    color: #cbd5e1;
  }

  .partner-step-num {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 1.6rem;
    height: 1.6rem;
    border-radius: 50%;
    border: 1px solid rgba(255, 178, 0, 0.35);
    background: rgba(255, 178, 0, 0.08);
    color: var(--accent-amber);
    font-size: 0.75rem;
    font-weight: 700;
  }

  .partner-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 75%;
    padding: 0.85rem 1.5rem;
    border-radius: 9999px;
    font-weight: 600;
    font-size: 0.95rem;
    text-decoration: none;
    margin: 1.5rem auto 0;
    transition: background 160ms var(--ease-out), box-shadow 160ms var(--ease-out), transform 150ms var(--ease-out);
  }

  .partner-btn-primary {
    background: linear-gradient(135deg, #ffb200 0%, #f59e0b 100%);
    color: #0f172a;
    box-shadow: 0 4px 20px rgba(255, 178, 0, 0.25);
  }

  .partner-btn-primary:hover {
    box-shadow: 0 6px 28px rgba(255, 178, 0, 0.4);
    transform: scale(1.02);
  }
</style>
