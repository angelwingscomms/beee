<script lang="ts">
  import { onMount } from 'svelte';
  import gsap from 'gsap';
  import { ScrollTrigger } from 'gsap/ScrollTrigger';
  import SplitText from 'gsap/SplitText';
  import { animate, onScroll } from 'animejs';
  import ChampHero from '$lib/components/championship/ChampHero.svelte';
  import PlatformCard from '$lib/components/home/PlatformCard.svelte';

  gsap.registerPlugin(ScrollTrigger, SplitText);

  let bentoCard1: HTMLElement | undefined = $state();
  let bentoCard2: HTMLElement | undefined = $state();
  let bentoCardBase: HTMLElement | undefined = $state();
  let bentoUI: HTMLElement | undefined = $state();
  let philosophyText: HTMLElement | undefined = $state();
  let makeYourMove: HTMLElement | undefined = $state();
  let diffCardsParent: HTMLElement | undefined = $state();

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

    let animatedMakeYourMove = false;
    onScroll({
      target: '#intro-cta',
      enter: 'top 75%',
      onEnter: () => {
        if (animatedMakeYourMove || !makeYourMove) return;
        animatedMakeYourMove = true;
        animate(makeYourMove, {
          opacity: [0, 1],
          translateY: [80, 0],
          scale: [0.95, 1],
          duration: 1200,
          easing: 'easeOutCubic',
        });
      },
    });

    let animatedDiff = false;
    onScroll({
      target: '#diff-section',
      enter: 'top 75%',
      onEnter: () => {
        if (animatedDiff || !diffCardsParent) return;
        animatedDiff = true;
        animate(diffCardsParent.children, {
          opacity: [0, 1],
          translateY: [60, 0],
          delay: ((_el: any, i: number) => i * 150) as any,
          duration: 800,
          easing: 'easeOutCubic',
        });
      },
    });

  });

  function onBentoHover(enter: boolean) {
    if (!bentoCard1 || !bentoUI) return;
    gsap.to(bentoCard1, { rotateX: enter ? 2 : 0, rotateY: enter ? -8 : 0, duration: 0.6, ease: 'power2.out' });
    gsap.to(bentoUI, { filter: enter ? 'brightness(1.2)' : 'brightness(1)', duration: 0.4 });
  }
</script>

<svelte:head>
  <title>BEEE Chess Championship Abuja 2026 — More Than a Chess Championship</title>
  <meta name="description" content="Chess, leadership, and life skills for Abuja kids aged 10–14. AI training, mentorship, and the TEAMUP programme. Summer 2026." />
  <script type="application/ld+json">{
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Event",
        "name": "BEEE Spectacular Chess Championship Abuja 2026",
        "description": "Chess, leadership, and life skills for Abuja kids aged 10-14. AI training, mentorship, and the TEAMUP programme.",
        "startDate": "2026-10-10",
        "endDate": "2026-10-10",
        "location": { "@type": "Place", "name": "Abuja", "address": { "@type": "PostalAddress", "addressLocality": "Abuja", "addressCountry": "NG" } },
        "offers": { "@type": "Offer", "price": "12500", "priceCurrency": "NGN" },
        "organizer": { "@type": "Organization", "name": "BEEE", "url": "https://beeeproject.com" }
      },
      {
        "@type": "Organization",
        "@id": "https://beeeproject.com#organization",
        "name": "BEEE Spectacular Chess Championship",
        "url": "https://beeeproject.com",
        "logo": "https://beeeproject.com/logo.png",
        "description": "Youth chess championship with AI training, leadership mentorship, and the TEAMUP development programme for Abuja kids aged 10-14.",
        "contactPoint": { "@type": "ContactPoint", "email": "info@beeeproject.com", "telephone": "+234-802-092-0872", "contactType": "customer service" }
      }
    ]
  }</script>
</svelte:head>

<ChampHero />

<!-- Section: What Makes BEEE Different -->
<section id="diff-section" class="py-32 md:py-48 bg-navy">
  <div class="max-w-7xl mx-auto px-6">
    <h2 class="font-hero text-4xl md:text-6xl text-white font-bold tracking-tight mb-4">What Makes The BEEE Championship Different?</h2>
    <p class="font-['Inter'] text-gray-400 text-lg md:text-xl leading-relaxed max-w-3xl mb-16">
      It goes beyond chess. It is an integrated development ecosystem built on three proprietary platforms.
    </p>

    <div bind:this={diffCardsParent} class="grid grid-cols-12 gap-6 auto-rows-[minmax(280px,auto)]">
      <PlatformCard bg="#f5e6c8" title="E4&trade; CHESS COACH" body="An AI-assisted chess learning platform providing guided instruction, game analysis, and personalised practice." />
      <PlatformCard bg="#ffb200" title="TEAMUP&trade;" body="A holistic leadership development programme centred on Technology, Enterprise, Art, Mentorship, and Upskilling, designed to nurture the whole child." />
      <PlatformCard bg="#7ec8e3" title="TASKIFY&trade;" body="Digital Development Passport that tracks participant progress, milestones, achievements, badges, certificates, and developmental growth throughout the championship journey." />
    </div>



    <!-- School Benefits -->
    <div class="border-t border-white/10 pt-14">
    </div>
  </div>
</section>

<!-- Section 3: The Platform -->
<section id="platform" class="py-20 px-6">
    <h2 class="font-hero text-5xl text-amber-400 text-center mb-20 tracking-tight font-bold">Everything Your Child Needs</h2>
  <div class="grid grid-cols-12 gap-6 auto-rows-[minmax(400px,auto)]">
    <!-- Card 1: e4 -->
    <div
      bind:this={bentoCardBase}
      role="button"
      tabindex="0"
      class="col-span-12 md:col-span-8 bg-slate-900 rounded-3xl overflow-hidden relative group"
      onmouseenter={() => onBentoHover(true)}
      onmouseleave={() => onBentoHover(false)}
    >
      <img src="/images/e4-ui.png" alt="e4 UI" class="absolute inset-0 w-full h-full object-cover" />
      <div class="absolute bottom-0 left-0 p-8 z-20">
        <h3 class="font-hero text-2xl font-bold text-white mb-2">e4™</h3>
        <p class="font-['Inter'] text-gray-300 text-lg">Real-time AI mentoring and move analysis.</p>
      </div>
    </div>

    <!-- Card 2: e4 Explanation -->
    <div bind:this={bentoCard2} class="col-span-12 md:col-span-4 bg-[#1A2B4C] rounded-3xl border border-amber-400/30 relative group p-8 flex flex-col justify-between">
      <div class="relative z-10">
        <h3 class="font-hero text-xl font-bold text-white mb-4">What Players Gain</h3>
        <ul class="flex flex-col items-start gap-2.5 gain-list">
          <li class="font-['Inter'] text-[#141413] text-sm font-semibold leading-snug text-left bg-amber-400 rounded-full px-4 py-2 w-fit">Strategic thinking and decision-making</li>
          <li class="font-['Inter'] text-[#141413] text-sm font-semibold leading-snug md:text-right bg-[#7ec8e3] rounded-full px-4 py-2 w-fit">Critical reasoning and problem-solving</li>
          <li class="font-['Inter'] text-[#141413] text-sm font-semibold leading-snug text-left bg-[#f5e6c8] rounded-full px-4 py-2 w-fit">Creativity and innovation</li>
          <li class="font-['Inter'] text-[#141413] text-sm font-semibold leading-snug md:text-right bg-[#5db8a6] rounded-full px-4 py-2 w-fit">Leadership and collaboration</li>
          <li class="font-['Inter'] text-[#141413] text-sm font-semibold leading-snug text-left bg-[#cdb4f6] rounded-full px-4 py-2 w-fit">Communication and interpersonal skills</li>
          <li class="font-['Inter'] text-[#141413] text-sm font-semibold leading-snug md:text-right bg-[#f6a5c0] rounded-full px-4 py-2 w-fit">Academic excellence and lifelong passion for learning</li>
          <li class="font-['Inter'] text-[#141413] text-sm font-semibold leading-snug text-left bg-[#a3d9a5] rounded-full px-4 py-2 w-fit">Resilience, self-discipline and confidence</li>
        </ul>
      </div>
    </div>

    <!-- Card 3: TEAMUP -->
    <div bind:this={bentoCard1} class="col-span-12 h-[450px] bg-white/5 rounded-3xl overflow-hidden relative group flex items-center">
      <img src="/images/bento-mentorship-candid.png" alt="" class="absolute inset-0 w-full h-full object-cover" />
      <div class="absolute inset-0 bg-gradient-to-r from-[#0A0F1A]/80 via-[#0A0F1A]/40 to-transparent z-10"></div>
      <div class="relative z-20 ml-12 max-w-xl">
        <p class="font-hero text-amber-400 text-3xl md:text-5xl font-bold leading-tight tracking-tight">
          <span class="text-white">T</span>echnology.<br /><span class="text-white">E</span>nterprise.<br /><span class="text-white">A</span>rt.<br /><span class="text-white">M</span>entorship.<br /><span class="text-white">U</span><span class="text-white">P</span>skill.
        </p>
        <a href="/teamup" class="block text-[1.5vw] mt-3 no-underline transition-colors" style="color: #fff">Learn More <span style="display:inline-block;vertical-align:middle"> →</span></a>
      </div>
    </div>
  </div>
</section>

<!-- Section 2: The Journey -->
<section id="journey" class="min-h-screen py-24 bg-navy">
    <div class="framework-container">
        <div class="header">
            <div class="super-title">The Championship Framework</div>
            <div class="main-title">BEEE Project</div>
        </div>
        <div class="glow-divider"></div>
        <div class="tree-container">
            <div class="line-v top-drop"></div>
            <div class="line-h"></div>
            <div class="nodes-wrapper">
                <div class="node-column">
                    <div class="line-v node-drop"></div>
                    <div class="card">
                        <div class="card-icon">
                            <svg viewBox="0 0 64 64" width="48" height="48" fill="#FFC72C">
                                <path d="M32 30c5.5 0 10-4.5 10-10S37.5 10 32 10s-10 4.5-10 10 4.5 10 10 10zm0 5c-6.7 0-20 3.3-20 10v9h40v-9c0-6.7-13.3-10-20-10z"/>
                                <path d="M14 26c4.4 0 8-3.6 8-8s-3.6-8-8-8-8 3.6-8 8 3.6 8 8 8zm0 4c-4.4 0-12 2-12 6v6h13v-5c0-1.7 1.1-4.2 3.8-6.1C17.3 30.3 15.8 30 14 30z"/>
                                <path d="M50 26c4.4 0 8-3.6 8-8s-3.6-8-8-8-8 3.6-8 8 3.6 8 8 8zm0 4c-1.8 0-3.3.3-4.8.8 2.7 1.9 3.8 4.4 3.8 6.1v5h13v-6c0-4-7.6-6-12-6z"/>
                            </svg>
                        </div>
                        <div class="card-title">TEAMUP</div>
                        <div class="card-subtitle">Community &<br>Partnerships</div>
                    </div>
                    <div class="line-v node-drop"></div>
                </div>
                <div class="node-column">
                    <div class="line-v node-drop"></div>
                    <div class="card">
                        <div class="card-icon">
                            <svg viewBox="0 0 24 24" width="40" height="40" fill="none" stroke="#FFC72C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
                                <rect x="8" y="2" width="8" height="4" rx="1" ry="1" fill="#FFC72C"></rect>
                                <path d="M9 11l2 2 4-4"></path>
                                <path d="M9 16h6"></path>
                                <path d="M9 19h6"></path>
                            </svg>
                        </div>
                        <div class="card-title">TASKIFY</div>
                        <div class="card-subtitle">Organization &<br>Operations</div>
                    </div>
                    <div class="line-v node-drop"></div>
                </div>
                <div class="node-column">
                    <div class="line-v node-drop"></div>
                    <div class="card">
                        <div class="card-icon">
                            <svg viewBox="0 0 24 24" width="45" height="45" fill="none" stroke="#FFC72C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
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
                                <text x="12" y="14" font-family="'Montserrat', sans-serif" font-weight="700" font-size="5.5" fill="#FFC72C" stroke="none" text-anchor="middle">AI</text>
                            </svg>
                        </div>
                        <div class="card-title">E4 AI</div>
                        <div class="card-subtitle">Intelligence &<br>Innovation</div>
                    </div>
                    <div class="line-v node-drop"></div>
                </div>
            </div>
            <div class="line-h"></div>
            <div class="line-v bottom-drop with-arrow"></div>
            <div class="bottom-card">
                <div class="bottom-card-icon">
                    <svg viewBox="0 0 512 512" width="45" height="45" fill="#FFC72C">
                        <path d="M256 0c17.7 0 32 14.3 32 32V64h32c17.7 0 32 14.3 32 32s-14.3 32-32 32H288v25.2c40 13.9 76.6 37 106.6 67H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H96c-17.7 0-32-14.3-32-32s14.3-32 32-32h21.4c30-30 66.5-53.1 106.6-67V128H192c-17.7 0-32-14.3-32-32s14.3-32 32-32h32V32c0-17.7 14.3-32 32-32zM80 352h352c17.7 0 32 14.3 32 32s-14.3 32-32 32H80c-17.7 0-32-14.3-32-32s14.3-32 32-32zm0 96h352c17.7 0 32 14.3 32 32s-14.3 32-32 32H80c-17.7 0-32-14.3-32-32s14.3-32 32-32z"/>
                    </svg>
                </div>
                <div class="bottom-card-text">
                    <div class="bottom-card-title">BEEE SPECTACULAR CHESS</div>
                    <div class="bottom-card-subtitle">Empowering Minds. Building Champions.</div>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Intro Bridge -->
<section id="intro-cta" class="py-32 md:py-48 bg-navy">
  <div class="max-w-6xl mx-auto px-6">
    <h2 bind:this={makeYourMove} class="font-hero text-[14vw] md:text-[10vw] text-amber-400 font-black leading-none tracking-tighter mt-20 select-none">
      Make Your Move
    </h2>
  </div>
</section>

<!-- Section 4: Philosophy -->
<section id="philosophy" class="min-h-screen flex items-center justify-center bg-amber-400 px-6">
  <h2 bind:this={philosophyText} class="split-text-target font-hero text-4xl sm:text-5xl md:text-6xl lg:text-8xl xl:text-9xl text-[#0A0F1A] font-black text-center tracking-tighter leading-[0.9]">
    <span class="block lg:whitespace-nowrap">Chess is not the destination.</span>
    <span class="block lg:whitespace-nowrap">It's the platform.</span>
  </h2>
</section>

<!-- Section 4b: Philosophy (alt) -->
<section id="philosophy-alt" class="min-h-screen flex items-center justify-center bg-amber-400 px-6">
  <h2 class="font-hero text-4xl sm:text-5xl md:text-6xl lg:text-8xl xl:text-9xl text-[#0A0F1A] font-black text-center tracking-tighter leading-[0.9]">
    <span class="block lg:whitespace-nowrap">Chess is where they learn.</span>
    <span class="block lg:whitespace-nowrap">Life is where they lead.</span>
  </h2>
</section>

<!-- Section 5: Footer -->
<footer id="contact" class="py-20 px-6 bg-navy border-t border-white/10">
  <h1 class="font-hero text-[8vw] text-white leading-none tracking-tighter">Make Your Move.</h1>
  <a href="/register" class="block text-[1.8vw] mt-4 no-underline transition-colors" style="color:#fff">Start Your Child's Journey <span style="display:inline-block;vertical-align:middle"> →</span></a>
</footer>

<style>
  #journey {
    scrollbar-width: none;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  #journey::-webkit-scrollbar {
    display: none;
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
    font-family: 'Montserrat', sans-serif;
    color: #FFC72C;
    font-size: 14px;
    letter-spacing: 4px;
    font-weight: 500;
    text-transform: uppercase;
    margin-bottom: 12px;
  }

  .main-title {
    font-family: 'Montserrat', sans-serif;
    color: #FFFFFF;
    font-size: 46px;
    letter-spacing: 2px;
    font-weight: 800;
    text-transform: uppercase;
  }

  .glow-divider {
    width: 100%;
    max-width: 650px;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(255, 199, 44, 0.6), transparent);
    margin: 15px auto 0;
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
    margin-top: 0;
  }

  .line-v {
    width: 0;
    border-left: 2px dotted #FFC72C;
  }

  .line-h {
    height: 0;
    border-top: 2px dotted #FFC72C;
    width: 530px;
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

  .with-arrow::after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: -5px;
    border-width: 6px 4px 0 4px;
    border-style: solid;
    border-color: #FFC72C transparent transparent transparent;
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
    height: 180px;
    background-color: #080c16;
    border: 2px solid #FFC72C;
    border-radius: 12px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 20px 10px;
    text-align: center;
    position: relative;
    z-index: 2;
  }

  .card-icon {
    margin-bottom: 15px;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 50px;
  }

  .card-title {
    font-family: 'Montserrat', sans-serif;
    color: #FFFFFF;
    font-size: 20px;
    font-weight: 700;
    margin-bottom: 6px;
    letter-spacing: 0.5px;
  }

  .card-subtitle {
    font-family: 'Inter', sans-serif;
    color: #E2E2E2;
    font-size: 13px;
    line-height: 1.4;
    font-weight: 400;
  }

  .bottom-card {
    width: 480px;
    height: 95px;
    background-color: #080c16;
    border: 2px solid #FFC72C;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding: 0 35px;
    gap: 25px;
    position: relative;
    z-index: 2;
  }

  .bottom-card-icon {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .bottom-card-text {
    text-align: left;
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .bottom-card-title {
    font-family: 'Montserrat', sans-serif;
    color: #FFFFFF;
    font-size: 20px;
    font-weight: 700;
    letter-spacing: 0.5px;
  }

  .bottom-card-subtitle {
    font-family: 'Inter', sans-serif;
    color: #FFC72C;
    font-size: 14px;
    font-weight: 500;
  }

  @media (max-width: 768px) {
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
      height: 140px;
      padding: 14px 10px;
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
      width: 2px;
      height: 0;
      border-top: none;
      border-left: 2px dotted #FFC72C;
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
  }
  @media (min-width: 768px) {
    .gain-list > li {
      width: auto;
    }
    .gain-list > li:nth-child(even) {
      align-self: flex-end;
    }
  }
</style>
