<script lang="ts">
  import { onMount } from 'svelte';
  import gsap from 'gsap';
  import { ScrollTrigger } from 'gsap/ScrollTrigger';
  import SplitText from 'gsap/SplitText';
  import ChampHero from '$lib/components/championship/ChampHero.svelte';
  import HomeJourney from '$lib/components/home/HomeJourney.svelte';
  import PlatformCard from '$lib/components/home/PlatformCard.svelte';
  import HomeAwards from '$lib/components/home/HomeAwards.svelte';
  import Logo from '$lib/components/Logo.svelte';

  gsap.registerPlugin(ScrollTrigger, SplitText);

  let bentoCard1: HTMLElement | undefined = $state();
  let bentoCard2: HTMLElement | undefined = $state();
  let bentoCardBase: HTMLElement | undefined = $state();
  let bentoUI: HTMLElement | undefined = $state();
  let philosophyText: HTMLElement | undefined = $state();
  let philosophyAltText: HTMLElement | undefined = $state();
  onMount(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    gsap.from([bentoCardBase, bentoCard2, bentoCard1].filter(Boolean), {
      y: 50,
      opacity: 0,
      duration: 0.8,
      stagger: 0.15,
      ease: 'power3.out',
      scrollTrigger: { trigger: '#platform', start: 'top 80%' },
    });

    gsap.from('.gain-list > li', {
      x: -28,
      opacity: 0,
      duration: 0.55,
      stagger: 0.12,
      delay: 0.35,
      ease: 'power3.out',
      clearProps: 'transform,opacity',
      scrollTrigger: { trigger: '#platform', start: 'top 80%' },
    });

    if (philosophyText) {
      const split = new SplitText(philosophyText, { type: 'words' });
      gsap.from(split.words, {
        y: 100,
        opacity: 0,
        duration: 0.6,
        stagger: 0.05,
        ease: 'power3.out',
        scrollTrigger: { trigger: '#philosophy', start: 'top 70%' },
      });
    }

    if (philosophyAltText) {
      const split = new SplitText(philosophyAltText, { type: 'words' });
      gsap.from(split.words, {
        y: 100,
        opacity: 0,
        duration: 0.6,
        stagger: 0.05,
        ease: 'power3.out',
        scrollTrigger: { trigger: '#philosophy-alt', start: 'top 70%' },
      });
    }

  });

  function onBentoHover(enter: boolean) {
    if (!bentoCard1 || !bentoUI) return;
    gsap.to(bentoCard1, { rotateX: enter ? 2 : 0, rotateY: enter ? -8 : 0, duration: 0.6, ease: 'power2.out' });
    gsap.to(bentoUI, { filter: enter ? 'brightness(1.2)' : 'brightness(1)', duration: 0.4 });
  }
</script>

<svelte:head>
  <script type="application/ld+json">{
    "@context": "https://schema.org",
    "@type": "Event",
    "@id": "https://beeeproject.com/#championship-2026",
    "name": "BEEE Spectacular Chess Championship Abuja 2026",
    "description": "Chess, leadership, and life skills for Abuja kids aged 10-14. AI training, mentorship, and the TEAMUP programme.",
    "startDate": "2026-10",
    "endDate": "2026-10",
    "eventStatus": "https://schema.org/EventScheduled",
    "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
    "image": "https://beeeproject.com/og.png",
    "url": "https://beeeproject.com/",
    "location": { "@type": "Place", "name": "Abuja", "address": { "@type": "PostalAddress", "addressLocality": "Abuja", "addressCountry": "NG" } },
    "offers": { "@type": "Offer", "price": "15000", "priceCurrency": "NGN", "availability": "https://schema.org/InStock", "url": "https://beeeproject.com/register", "validFrom": "2026-01-01" },
    "organizer": { "@id": "https://beeeproject.com/#organization" },
    "performer": { "@id": "https://beeeproject.com/#organization" }
  }</script>
</svelte:head>

<ChampHero />

<HomeJourney />

<!-- Section: What Makes BEEE Different -->
<section id="diff-section" class="relative bg-navy pt-24 md:pt-36 pb-24 md:pb-32 overflow-hidden">
  <div class="absolute inset-0 pointer-events-none" style="background: radial-gradient(ellipse 90% 60% at 100% 0%, #1A2B4C 0%, transparent 60%)" aria-hidden="true"></div>

  <div class="max-w-7xl mx-auto px-6 relative z-10">
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-16 items-end mb-16 md:mb-20">
      <h2 class="lg:col-span-8 font-hero text-4xl md:text-6xl lg:text-[4.25rem] text-white font-bold tracking-[-0.02em] leading-[1.02]">
        What makes the BEEE Championship <span class="text-amber-400">different?</span>
      </h2>
      <p class="lg:col-span-4 font-['Inter'] text-white/90 text-lg md:text-xl font-semibold leading-relaxed">
        The championship goes beyond chess. One championship, three proprietary platforms that work together.
      </p>
    </div>

    <div class="grid grid-cols-12 gap-5 md:gap-6 auto-rows-[minmax(320px,auto)]">
      <PlatformCard bg="#f5e6c8" title="e4&trade;" body="Your child's AI chess coach: live analysis, training, and practice." href="/e4" />
      <PlatformCard bg="#ffb200" title="TEAMUP&trade;" body="The development programme: Technology, Enterprise, Art, Mentorship, Upskill." href="/teamup" label="Explore TEAMUP™" />
      <PlatformCard bg="#7ec8e3" title="Taskify&trade;" body="The digital passport recording every badge, milestone, and certificate won." href="/taskify" />
    </div>
  </div>
</section>

<!-- Section 3: The Platform -->
<section id="platform" class="py-20 px-6">
    <h2 class="font-hero text-4xl md:text-5xl text-[rgb(255,107,0)] text-center mb-4 tracking-tight font-bold">Everything Your Child Needs</h2>
    <div class="w-16 h-1 bg-[rgb(255,107,0)] rounded-full mx-auto mb-6" aria-hidden="true"></div>
    <p class="font-['Inter'] font-bold text-gray-800 text-base md:text-lg text-center max-w-2xl mx-auto mb-16 leading-relaxed">Enrich their summer holiday with a structured blend of online learning, mentorship, and competitive chess.</p>
  <div class="grid grid-cols-12 gap-6 auto-rows-[minmax(400px,auto)]">
    <!-- Card 1: e4 -->
    <div
      bind:this={bentoCardBase}
      role="button"
      tabindex="0"
      class="col-span-12 md:col-span-12 lg:col-span-8 bg-slate-900 rounded-3xl overflow-hidden relative group"
      onmouseenter={() => onBentoHover(true)}
      onmouseleave={() => onBentoHover(false)}
    >
      <img
        src="/images/e4-ui.webp"
        alt="The e4 AI chess coach analysing a game move by move"
        class="absolute inset-0 w-full h-full object-cover"
        width="1536"
        height="1024"
        loading="lazy"
        decoding="async"
      />
      <div class="absolute bottom-0 left-0 p-8 z-20">
        <h3 class="font-hero text-2xl font-bold text-white mb-2">e4</h3>
        <p class="font-['Inter'] text-gray-300 text-lg">Real-time AI mentoring and move analysis.</p>
      </div>
    </div>

    <!-- Card 2: e4 Explanation -->
    <div bind:this={bentoCard2} class="col-span-12 md:col-span-12 lg:col-span-4 bg-[#1A2B4C] rounded-3xl border border-amber-400/30 relative group p-8 flex flex-col justify-center overflow-hidden">
      <div class="relative z-10">
        <h3 class="font-hero text-xl font-bold text-white mb-5">What Your Child <span class="text-amber-400">Gains</span></h3>
        <ul class="flex flex-col items-start gap-2.5 md:gap-3 lg:gap-2.5 gain-list">
          <li class="font-['Inter'] text-[#141413] text-sm md:text-base lg:text-sm font-semibold leading-snug bg-amber-400 rounded-full pl-2 pr-4 py-1.5 w-fit flex items-center gap-2.5">
            <span class="w-7 h-7 rounded-full bg-[#141413]/10 flex items-center justify-center shrink-0" aria-hidden="true">
              <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.25" stroke-linecap="round" stroke-linejoin="round"><path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"/><path d="M20 3v4"/><path d="M22 5h-4"/><path d="M4 17v2"/><path d="M5 18H3"/></svg>
            </span>
            <span>Trains daily with an AI coach that reviews every move</span>
          </li>
          <li class="font-['Inter'] text-[#141413] text-sm md:text-base lg:text-sm font-semibold leading-snug bg-[#7ec8e3] rounded-full pl-2 pr-4 py-1.5 w-fit flex items-center gap-2.5">
            <span class="w-7 h-7 rounded-full bg-[#141413]/10 flex items-center justify-center shrink-0" aria-hidden="true">
              <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.25" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" x2="12" y1="19" y2="22"/></svg>
            </span>
            <span>Builds leadership and public speaking skills, every week</span>
          </li>
          <li class="font-['Inter'] text-[#141413] text-sm md:text-base lg:text-sm font-semibold leading-snug bg-amber-400 rounded-full pl-2 pr-4 py-1.5 w-fit flex items-center gap-2.5">
            <span class="w-7 h-7 rounded-full bg-[#141413]/10 flex items-center justify-center shrink-0" aria-hidden="true">
              <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.25" stroke-linecap="round" stroke-linejoin="round"><path d="m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526"/><circle cx="12" cy="8" r="6"/></svg>
            </span>
            <span>Leaves the summer with badges, certificates, and proof of growth</span>
          </li>
          <li class="font-['Inter'] text-[#141413] text-sm md:text-base lg:text-sm font-semibold leading-snug bg-[#f5e6c8] rounded-full pl-2 pr-4 py-1.5 w-fit flex items-center gap-2.5">
            <span class="w-7 h-7 rounded-full bg-[#141413]/10 flex items-center justify-center shrink-0" aria-hidden="true">
              <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.25" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/></svg>
            </span>
            <span>Compete live for a place in the Championship Grand Finale</span>
          </li>
        </ul>
      </div>
    </div>

    <!-- Card 3: TEAMUP -->
    <div bind:this={bentoCard1} class="col-span-12 h-[450px] bg-white/5 rounded-3xl overflow-hidden relative group flex items-center">
      <img
        src="/images/bento-mentorship-candid.webp"
        alt="A mentor coaching young participants in the BEEE TEAMUP programme"
        class="absolute inset-0 w-full h-full object-cover"
        width="1600"
        height="900"
        loading="lazy"
        decoding="async"
      />
      <div class="absolute inset-0 bg-gradient-to-r from-[#0A0F1A]/80 via-[#0A0F1A]/40 to-transparent z-10"></div>
      <div class="relative z-20 ml-12 max-w-xl">
        <p class="font-hero text-amber-400 text-3xl md:text-5xl font-bold leading-tight tracking-tight">
          <span class="text-white">T</span>echnology.<br /><span class="text-white">E</span>nterprise.<br /><span class="text-white">A</span>rt.<br /><span class="text-white">M</span>entorship.<br /><span class="text-white">U</span><span class="text-white">P</span>skill.
        </p>
        <a href="/teamup" class="block text-sm md:text-[1.5vw] mt-3 no-underline transition-colors" style="color: #fff">Explore TEAMUP™ <span style="display:inline-block;vertical-align:middle"> →</span></a>
      </div>
    </div>
  </div>
</section>

<!-- Section 2: The Journey -->
<section id="journey" class="min-h-screen py-12 md:py-16 bg-navy">
    <div class="journey-glow" aria-hidden="true"></div>
    <div class="framework-container">
        <div class="header">
            <div class="super-title"><span class="super-dot"></span>The Championship Framework</div>
            <div class="main-title">BEEE <span class="main-shine">Project</span></div>
            <p class="framework-lede">Three integrated pillars, one champion. Every element feeds into the BEEE experience.</p>
        </div>
        <div class="glow-divider"></div>
        <div class="tree-container">
            <div class="line-v top-drop"></div>
            <div class="line-h"></div>
            <div class="nodes-wrapper">
                <div class="node-column">
                    <div class="line-v node-drop"></div>
                    <div class="card">
                        <span class="card-badge">01</span>
                        <div class="card-icon">
                            <svg viewBox="0 0 64 64" width="48" height="48" fill="#ffb200">
                                <path d="M32 30c5.5 0 10-4.5 10-10S37.5 10 32 10s-10 4.5-10 10 4.5 10 10 10zm0 5c-6.7 0-20 3.3-20 10v9h40v-9c0-6.7-13.3-10-20-10z"/>
                                <path d="M14 26c4.4 0 8-3.6 8-8s-3.6-8-8-8-8 3.6-8 8 3.6 8 8 8zm0 4c-4.4 0-12 2-12 6v6h13v-5c0-1.7 1.1-4.2 3.8-6.1C17.3 30.3 15.8 30 14 30z"/>
                                <path d="M50 26c4.4 0 8-3.6 8-8s-3.6-8-8-8-8 3.6-8 8 3.6 8 8 8zm0 4c-1.8 0-3.3.3-4.8.8 2.7 1.9 3.8 4.4 3.8 6.1v5h13v-6c0-4-7.6-6-12-6z"/>
                            </svg>
                        </div>
                        <div class="card-title">TEAMUP</div>
                        <div class="card-subtitle">Leadership &<br>Life Skills</div>
                    </div>
                    <div class="line-v node-drop"></div>
                </div>
                <div class="node-column">
                    <div class="line-v node-drop"></div>
                    <div class="card">
                        <span class="card-badge">02</span>
                        <div class="card-icon">
                            <svg viewBox="0 0 24 24" width="40" height="40" fill="none" stroke="#ffb200" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
                                <rect x="8" y="2" width="8" height="4" rx="1" ry="1" fill="#ffb200"></rect>
                                <path d="M9 11l2 2 4-4"></path>
                                <path d="M9 16h6"></path>
                                <path d="M9 19h6"></path>
                            </svg>
                        </div>
                        <div class="card-title">Taskify</div>
                        <div class="card-subtitle">Badges &<br>Milestones</div>
                    </div>
                    <div class="line-v node-drop"></div>
                </div>
                <div class="node-column">
                    <div class="line-v node-drop"></div>
                    <div class="card">
                        <span class="card-badge">03</span>
                        <div class="card-icon">
                            <svg viewBox="0 0 24 24" width="45" height="45" fill="none" stroke="#ffb200" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <rect x="6" y="6" width="12" height="12" rx="1" ry="1"></rect>
                                <line x1="8" y1="2" x2="8" y2="6"></line>
                                <line x1="12" y1="2" x2="12" y2="6"></line>
                                <line x1="16" y1="2" x2="16" y2="6"></line>
                                <line x1="8" y1="18" x2="8" y2="22"></line>
                                <line x1="12" y1="18" x2="12" y2="22"></line>
                                <line x1="16" y1="18" x2="16" y2="22"></line>
                                <line x1="2" y1="8" x2="6" y2="8"></line>
                                <line x1="2" y1="12" x2="6" y2="12"></line>
                                <line x1="2" y1="16" x2="6" y2="16"></line>
                                <line x1="18" y1="8" x2="22" y2="8"></line>
                                <line x1="18" y1="12" x2="22" y2="12"></line>
                                <line x1="18" y1="16" x2="22" y2="16"></line>
                                <text x="12" y="14" font-family="'Montserrat', sans-serif" font-weight="700" font-size="5.5" fill="#ffb200" stroke="none" text-anchor="middle">AI</text>
                            </svg>
                        </div>
                        <div class="card-title">e4</div>
                        <div class="card-subtitle">AI Chess<br>Coaching</div>
                    </div>
                    <div class="line-v node-drop"></div>
                </div>
            </div>
            <div class="line-h"></div>
            <div class="line-v bottom-drop with-arrow"></div>
            <div class="bottom-card">
                <div class="bottom-shimmer" aria-hidden="true"></div>
                <div class="bottom-card-icon">
                    <Logo color="#141413" width={50} height={50} />
                </div>
                <div class="bottom-card-text">
                    <div class="bottom-card-title">BEEE SPECTACULAR CHESS</div>
                </div>
            </div>
        </div>
    </div>
</section>

<HomeAwards />

<!-- Section 4: Philosophy -->
<section id="philosophy" class="min-h-screen flex items-center justify-center bg-amber-400 px-6">
  <h2 bind:this={philosophyText} class="split-text-target font-hero text-4xl sm:text-5xl md:text-6xl lg:text-8xl xl:text-9xl text-[#0A0F1A] font-black text-center tracking-tighter leading-[0.9]">
    <span class="block">Chess is not the destination.</span>
    <span class="block">It is the platform.</span>
  </h2>
</section>

<!-- Section 4b: Philosophy (alt) -->
<section id="philosophy-alt" class="min-h-screen flex items-center justify-center bg-[#0A0F1A] px-6">
  <h2 bind:this={philosophyAltText} class="font-hero text-4xl sm:text-5xl md:text-6xl lg:text-8xl xl:text-9xl text-amber-400 font-black text-center tracking-tighter leading-[0.9]">
    <span class="block">Chess is where they learn.</span>
    <span class="block">Life is where they lead.</span>
  </h2>
</section>

<!-- Section 5: Final CTA -->
<section id="contact" class="py-20 px-6 bg-navy border-t border-white/10">
  <a href="/register" class="block no-underline mym-link"><span class="block font-hero text-[8vw] text-yellow-400 leading-none tracking-tighter">Make Your Move.</span></a>
  <a href="/register" class="inline-block mt-4 no-underline bg-white text-[#0A0F1A] font-semibold rounded-full px-8 py-4 text-[max(16px,1.8vw)] transition-colors hover:bg-amber-400">Start Your Child's Journey <span style="display:inline-block;vertical-align:middle"> →</span></a>
</section>

<style>
  #journey {
    scrollbar-width: none;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    overflow: hidden;
    isolation: isolate;
    background:
      radial-gradient(120% 80% at 50% 0%, #101a30 0%, transparent 55%),
      var(--navy, #0A0F1A);
  }
  #journey::before {
    content: '';
    position: absolute;
    inset: 0;
    background-image:
      linear-gradient(rgba(255, 178, 0, 0.05) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255, 178, 0, 0.05) 1px, transparent 1px);
    background-size: 46px 46px;
    -webkit-mask: radial-gradient(70% 55% at 50% 45%, #000 0%, transparent 75%);
    mask: radial-gradient(70% 55% at 50% 45%, #000 0%, transparent 75%);
    pointer-events: none;
    z-index: -1;
  }
  #journey::-webkit-scrollbar {
    display: none;
  }

  .journey-glow {
    position: absolute;
    top: 8%;
    left: 50%;
    width: min(900px, 110vw);
    height: 500px;
    transform: translateX(-50%);
    background: radial-gradient(50% 50% at 50% 50%, rgba(255, 178, 0, 0.10) 0%, transparent 70%);
    filter: blur(20px);
    pointer-events: none;
    z-index: -1;
  }

  .framework-container {
    position: relative;
    z-index: 1;
    width: 100%;
    max-width: 900px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .header {
    text-align: center;
    margin-bottom: 5px;
  }

  .super-title {
    display: inline-flex;
    align-items: center;
    gap: 9px;
    font-family: 'Inter', sans-serif;
    color: #ffb200;
    font-size: 12.5px;
    letter-spacing: 0.22em;
    font-weight: 600;
    text-transform: uppercase;
    margin-bottom: 20px;
    padding: 7px 16px;
    border: 1px solid rgba(255, 178, 0, 0.28);
    border-radius: 9999px;
    background: rgba(255, 178, 0, 0.06);
  }

  .super-dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: #ffb200;
    box-shadow: 0 0 10px 2px rgba(255, 178, 0, 0.7);
  }

  .main-title {
    font-family: 'Space Grotesk', sans-serif;
    color: #FFFFFF;
    font-size: clamp(2.4rem, 5vw, 3.6rem);
    letter-spacing: -0.02em;
    font-weight: 800;
    text-transform: uppercase;
    line-height: 1;
  }

  .main-shine {
    background: linear-gradient(100deg, #ffb200 0%, #ffe08a 30%, #ffb200 60%, #d98f00 100%);
    background-size: 200% auto;
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: shine 6s linear infinite;
  }

  @keyframes shine {
    to { background-position: 200% center; }
  }

  .framework-lede {
    font-family: 'Inter', sans-serif;
    color: rgba(255, 255, 255, 0.55);
    font-size: clamp(0.95rem, 1.3vw, 1.1rem);
    line-height: 1.6;
    max-width: 460px;
    margin: 18px auto 0;
  }

  .glow-divider {
    width: 100%;
    max-width: 650px;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(255, 199, 44, 0.6), transparent);
    margin: 34px auto 0;
    position: relative;
  }

  .glow-divider::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 120px;
    height: 3px;
    background: linear-gradient(90deg, transparent, #ffffff 20%, #ffffff 80%, transparent);
    border-radius: 50%;
    box-shadow: 0 0 12px 3px rgba(255, 255, 255, 0.6), 0 0 30px 8px rgba(255, 199, 44, 0.5);
  }

  .tree-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    margin-top: 34px;
  }

  .line-v {
    width: 1px;
    background: linear-gradient(180deg, rgba(255, 178, 0, 0.15), rgba(255, 178, 0, 0.55));
    position: relative;
    overflow: hidden;
  }

  .line-h {
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(255, 178, 0, 0.5) 20%, rgba(255, 178, 0, 0.5) 80%, transparent);
    width: 530px;
  }

  @media (prefers-reduced-motion: no-preference) {
    .line-v::after {
      content: '';
      position: absolute;
      left: -1px;
      right: -1px;
      height: 40%;
      background: linear-gradient(180deg, transparent, #ffe08a, transparent);
      filter: blur(1px);
      animation: flow-down 2.6s ease-in-out infinite;
    }
    .top-drop::after { animation-delay: 0s; }
    .node-drop::after { animation-delay: 0.5s; }
    .bottom-drop::after { animation-delay: 1s; }
  }

  @keyframes flow-down {
    0% { top: -50%; opacity: 0; }
    30% { opacity: 1; }
    70% { opacity: 1; }
    100% { top: 110%; opacity: 0; }
  }

  .top-drop {
    height: 35px;
  }

  .node-drop {
    height: 30px;
  }

  .bottom-drop {
    height: 40px;
    position: relative;
  }

  .with-arrow::before {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 50%;
    transform: translateX(-50%);
    border-width: 7px 5px 0 5px;
    border-style: solid;
    border-color: #ffb200 transparent transparent transparent;
    filter: drop-shadow(0 0 6px rgba(255, 178, 0, 0.6));
  }

  .nodes-wrapper {
    width: 750px;
    display: flex;
    justify-content: space-between;
  }

  .node-column {
    width: 220px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .card {
    width: 220px;
    height: 190px;
    background:
      linear-gradient(180deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.015) 100%),
      #080c16;
    border: 1px solid rgba(255, 255, 255, 0.09);
    box-shadow: 0 18px 40px -20px rgba(0, 0, 0, 0.6);
    border-radius: 18px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 24px 14px;
    text-align: center;
    position: relative;
    z-index: 2;
    overflow: hidden;
    transition: transform 400ms cubic-bezier(0.22, 1, 0.36, 1), border-color 400ms ease, box-shadow 400ms ease;
  }

  .card::after {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: inherit;
    padding: 1px;
    background: linear-gradient(140deg, rgba(255, 178, 0, 0.6), transparent 45%);
    -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
    mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    opacity: 0;
    transition: opacity 400ms ease;
    pointer-events: none;
  }

  .card-badge {
    position: absolute;
    top: 14px;
    right: 16px;
    font-family: 'Space Grotesk', sans-serif;
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 0.05em;
    color: rgba(255, 255, 255, 0.2);
    transition: color 400ms ease;
  }

  @media (prefers-reduced-motion: no-preference) {
    .card:hover {
      transform: translateY(-8px);
      border-color: transparent;
      box-shadow: 0 30px 60px -24px rgba(255, 178, 0, 0.35);
    }
    .card:hover::after { opacity: 1; }
    .card:hover .card-badge { color: rgba(255, 178, 0, 0.55); }
    .card:hover .card-icon {
      transform: translateY(-2px) scale(1.06);
      background: rgba(255, 178, 0, 0.16);
    }
  }

  .card-icon {
    margin-bottom: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 72px;
    height: 72px;
    border-radius: 18px;
    background: rgba(255, 178, 0, 0.09);
    transition: transform 400ms cubic-bezier(0.34, 1.56, 0.64, 1), background 400ms ease;
  }

  .card-title {
    font-family: 'Space Grotesk', sans-serif;
    color: #FFFFFF;
    font-size: 20px;
    font-weight: 700;
    margin-bottom: 6px;
    letter-spacing: 0.5px;
  }

  .card-subtitle {
    font-family: 'Inter', sans-serif;
    color: rgba(255, 255, 255, 0.55);
    font-size: 13px;
    line-height: 1.4;
    font-weight: 400;
  }

  .bottom-card {
    width: 480px;
    height: 100px;
    background: radial-gradient(140% 160% at 0% 0%, #ffe08a 0%, #ffb200 42%, #f59e0b 100%);
    border-radius: 18px;
    box-shadow: 0 26px 60px -26px rgba(255, 178, 0, 0.55), inset 0 1px 0 rgba(255, 255, 255, 0.4);
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding: 0 36px;
    gap: 22px;
    position: relative;
    z-index: 2;
    overflow: hidden;
  }

  .bottom-shimmer {
    position: absolute;
    inset: 0;
    background: linear-gradient(115deg, transparent 30%, rgba(255, 255, 255, 0.55) 48%, transparent 62%);
    transform: translateX(-120%);
    pointer-events: none;
  }

  @media (prefers-reduced-motion: no-preference) {
    .bottom-card:hover .bottom-shimmer {
      transform: translateX(120%);
      transition: transform 900ms cubic-bezier(0.22, 1, 0.36, 1);
    }
  }

  .bottom-card-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 60px;
    height: 60px;
    border-radius: 15px;
    flex-shrink: 0;
    position: relative;
  }

  .bottom-card-text {
    text-align: left;
    display: flex;
    flex-direction: column;
    gap: 4px;
    position: relative;
  }

  .bottom-card-title {
    font-family: 'Space Grotesk', sans-serif;
    color: #0A0F1A;
    font-size: 20px;
    font-weight: 800;
    letter-spacing: -0.01em;
  }

  .bottom-card-subtitle {
    font-family: 'Inter', sans-serif;
    color: rgba(10, 15, 26, 0.72);
    font-size: 14px;
    font-weight: 600;
  }

  @media (--sm-down) {
    .tree-container {
      padding: 0 16px;
    }
    .nodes-wrapper {
      width: 100%;
      flex-direction: column;
      align-items: center;
      gap: 0;
    }

    .node-column {
      width: 100%;
      max-width: 320px;
    }

    .card {
      width: 100%;
      height: auto;
      min-height: 160px;
      padding: 22px 14px;
    }

    .card-title {
      font-size: 16px;
    }

    .card-subtitle {
      font-size: 12px;
    }

    .card-icon svg {
      width: 36px;
      height: 36px;
    }

    .top-drop {
      height: 25px;
    }

    .node-drop {
      height: 25px;
    }

    .line-h {
      width: 1px;
      height: 24px;
      background: linear-gradient(180deg, rgba(255, 178, 0, 0.15), rgba(255, 178, 0, 0.55));
    }

    .bottom-drop {
      height: 25px;
    }

    .bottom-card {
      width: 100%;
      max-width: 400px;
      height: auto;
      padding: 16px 20px;
      flex-direction: column;
      text-align: center;
      gap: 10px;
    }

    .bottom-card-text {
      text-align: center;
    }

    .bottom-card-title {
      font-size: 16px;
    }

    .bottom-card-subtitle {
      font-size: 12px;
    }
  }
  .gain-list > li {
    width: 100%;
    transition: transform 300ms cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 300ms ease;
  }
  .gain-list > li:nth-child(odd) { transform: rotate(-0.6deg); }
  .gain-list > li:nth-child(even) { transform: rotate(0.6deg); }
  .gain-list > li:hover {
    transform: rotate(0deg) translateX(5px) scale(1.02);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
  }
  @media (--sm-up) {
    .gain-list > li {
      width: auto;
    }
  }
  @media (prefers-reduced-motion: reduce) {
    .gain-list > li,
    .gain-list > li:hover {
      transform: none;
      transition: none;
    }
  }

  .mym-link h1 { transition: color 300ms ease; }
  .mym-link:hover h1 { color: #F27830; }
  @media (prefers-reduced-motion: reduce) { .mym-link h1 { transition: none; } }
</style>
