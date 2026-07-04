<script lang="ts">
  import { onMount } from 'svelte';
  import gsap from 'gsap';
  import { ScrollTrigger } from 'gsap/ScrollTrigger';
  import SplitText from 'gsap/SplitText';
  import { animate, onScroll } from 'animejs';
  import ChampHero from '$lib/components/championship/ChampHero.svelte';

  gsap.registerPlugin(ScrollTrigger, SplitText);

  let journeySection: HTMLElement | undefined = $state();
  let journeyTrack: HTMLElement | undefined = $state();
  let bentoCard1: HTMLElement | undefined = $state();
  let bentoCard2: HTMLElement | undefined = $state();
  let bentoCardBase: HTMLElement | undefined = $state();
  let bentoUI: HTMLElement | undefined = $state();
  let philosophyText: HTMLElement | undefined = $state();

  const stages = [
    { num: '01', title: 'Your First Move', desc: 'Register your child and unlock access to MASTER CHESS PLAYER™, TASKIFY™, and the full TEAMUP™ programme.' },
    { num: '02', title: 'Train Like a Champion', desc: 'AI-powered chess training, mentorship sessions, and self-paced challenges through integrated apps and tools.' },
    { num: '03', title: 'Face the Board', desc: 'Live qualifying matches where participants test their growing skills against peers from across Abuja.' },
    { num: '04', title: 'Outthink the Room', desc: 'Advanced rounds with higher stakes, team challenges, and leadership evaluations that reveal who they\'re becoming.' },
    { num: '05', title: 'Lift the Trophy', desc: 'An immersive championship finale where preparation, courage, and strategy meet. This is the moment they\'ve built toward.' },
  ];

  onMount(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    if (journeyTrack && journeySection) {
      const maxX = -(journeyTrack.scrollWidth - window.innerWidth);
      animate(journeyTrack, {
        translateX: [0, maxX],
        ease: 'linear',
        autoplay: onScroll({
          target: journeySection,
          enter: 'top top',
          leave: 'bottom bottom',
          sync: true,
        }),
      });
    }

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

<!-- Section 2: The Journey -->
<section id="journey" bind:this={journeySection} class="h-[300vh] relative bg-navy">
  <div class="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">
    <h2 class="font-hero text-4xl text-white ml-[10vw] tracking-tight">Your Journey to the Finals</h2>
    <div bind:this={journeyTrack} class="flex gap-8 px-[10vw] mt-12 w-fit">
      {#each stages as s}
        <div class="w-[80vw] md:w-[400px] h-[500px] bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8 flex flex-col justify-between flex-shrink-0">
          <span class="text-6xl font-bold text-amber-400 font-hero tracking-tight">{s.num}</span>
          <div>
            <h3 class="text-2xl font-bold text-white mb-4 font-hero tracking-tight">{s.title}</h3>
            <p class="font-['Inter'] text-gray-400 leading-relaxed">{s.desc}</p>
          </div>
        </div>
      {/each}
    </div>
  </div>
</section>

<!-- Section 3: The Platform -->
<section id="platform" class="py-20 px-6">
    <h2 class="font-hero text-5xl text-amber-400 text-center mb-20 tracking-tight font-bold">Everything Your Child Needs</h2>
  <div class="grid grid-cols-12 gap-6 auto-rows-[400px]">
    <!-- Card 1: Master Chess Player -->
    <div
      bind:this={bentoCardBase}
      role="button"
      tabindex="0"
      class="col-span-12 md:col-span-8 bg-slate-900 rounded-3xl overflow-hidden relative group"
      onmouseenter={() => onBentoHover(true)}
      onmouseleave={() => onBentoHover(false)}
    >
      <img src="/images/master-chess-ui.png" alt="Master Chess Player UI" class="absolute inset-0 w-full h-full object-cover" />
      <div class="absolute bottom-0 left-0 p-8 z-20">
        <h3 class="font-hero text-2xl font-bold text-white mb-2">MASTER CHESS PLAYER™</h3>
        <p class="font-['Inter'] text-gray-300 text-lg">Real-time AI mentoring and move analysis.</p>
      </div>
    </div>

    <!-- Card 2: Taskify -->
    <div bind:this={bentoCard2} class="col-span-12 md:col-span-4 bg-[#1A2B4C] rounded-3xl overflow-hidden relative group p-8 flex flex-col justify-between">
      <div class="absolute inset-0 bg-[#1A2B4C]"></div>
      <div class="relative z-10">
        <h3 class="font-hero text-xl font-bold text-white mb-2">TASKIFY™ Passport</h3>
        <p class="font-['Inter'] text-gray-300 text-sm">Track milestones and earn digital achievement badges.</p>
      </div>
      <div class="relative z-10 flex gap-3">
        <span class="w-10 h-10 rounded-full bg-amber-400/20 flex items-center justify-center text-lg">🏆</span>
        <span class="w-10 h-10 rounded-full bg-amber-400/20 flex items-center justify-center text-lg">⭐</span>
        <span class="w-10 h-10 rounded-full bg-amber-400/20 flex items-center justify-center text-lg">🎯</span>
      </div>
      <div class="relative z-10">
        <div class="w-full h-2 bg-white/10 rounded-full overflow-hidden">
          <div class="w-[60%] h-full bg-amber-400 rounded-full"></div>
        </div>
        <p class="text-xs text-gray-500 mt-2 font-mono">PROGRESS: 60%</p>
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
        <a href="/teamup" class="block text-[1.5vw] mt-3 no-underline transition-colors" style="color:#fff">Learn More<span style="display:inline-block;vertical-align:middle"> →</span></a>
      </div>
    </div>
  </div>
</section>

<!-- Section 4: Philosophy -->
<section id="philosophy" class="h-screen flex items-center justify-center bg-amber-400 overflow-hidden">
  <h2 bind:this={philosophyText} class="split-text-target font-hero text-6xl md:text-9xl text-[#0A0F1A] font-black text-center tracking-tighter leading-[0.9] w-[80vw] mx-auto">
    Chess is not the destination. It is the platform.
  </h2>
</section>

<!-- Section 5: Footer -->
<footer id="contact" class="py-20 px-6 bg-navy border-t border-white/10">
  <h1 class="font-hero text-[8vw] text-white leading-none tracking-tighter">Make Your Move.</h1>
  <a href="/register" class="block text-[1.8vw] mt-4 no-underline transition-colors" style="color:#fff">Start Your Child's Journey<span style="display:inline-block;vertical-align:middle"> →</span></a>
</footer>

<style>
  #journey {
    scrollbar-width: none;
  }
  #journey::-webkit-scrollbar {
    display: none;
  }
</style>
