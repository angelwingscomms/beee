<script lang="ts">
  import { onMount } from 'svelte';
  import gsap from 'gsap';
  import { ScrollTrigger } from 'gsap/ScrollTrigger';
  import SplitText from 'gsap/SplitText';
  import ChampHero from '$lib/components/championship/ChampHero.svelte';
  import RegisterBtn from '$lib/components/RegisterBtn.svelte';

  gsap.registerPlugin(ScrollTrigger, SplitText);

  let journeySection: HTMLElement | undefined = $state();
  let journeyTrack: HTMLElement | undefined = $state();
  let bentoCard1: HTMLElement | undefined = $state();
  let bentoCard2: HTMLElement | undefined = $state();
  let bentoCardBase: HTMLElement | undefined = $state();
  let bentoUI: HTMLElement | undefined = $state();
  let philosophyText: HTMLElement | undefined = $state();

  const stages = [
    { num: '01', title: 'Registration & Enrollment', desc: 'Register your school and gain access to the MASTER CHESS PLAYER™, TASKIFY™ and TEAMUP™ platforms and begin the journey.' },
    { num: '02', title: 'Innovative Learning', desc: 'AI-powered chess training, mentorship modules, and self-paced development through our integrated apps and tools.' },
    { num: '03', title: 'Preliminary Rounds', desc: 'Live qualifying events where participants compete and demonstrate their growing skills on the board.' },
    { num: '04', title: 'Elite Qualification', desc: 'Advanced competition rounds with higher stakes, team challenges, and leadership evaluations.' },
    { num: '05', title: 'Grand Finale', desc: 'An immersive championship experience unlike conventional chess competitions awaits the finalists.' },
  ];

  onMount(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    if (journeyTrack && journeySection) {
      const maxX = -(journeyTrack.scrollWidth - window.innerWidth + window.innerWidth * 0.1);
      const scrollDist = Math.abs(maxX);
      journeySection.style.height = (scrollDist + window.innerHeight) + 'px';
      gsap.to(journeyTrack, {
        x: maxX,
        ease: 'none',
        scrollTrigger: {
          trigger: journeySection,
          start: 'top top',
          end: () => '+=' + (journeySection!.offsetHeight - window.innerHeight),
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        },
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
  <title>BEEE Spectacular Chess Championship Abuja 2026 — More Than a Chess Championship</title>
  <meta name="description" content="The BEEE Spectacular Chess Championship Abuja 2026 is a unique youth development initiative that combines competitive chess with leadership development, mentorship, creativity, innovation, and personal growth through the TEAMUP Programme." />
  <script type="application/ld+json">{
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Event",
        "name": "BEEE Spectacular Chess Championship Abuja 2026",
        "description": "A unique youth development initiative combining competitive chess with leadership development, mentorship, creativity, innovation, and personal growth through the TEAMUP Development Programme.",
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
        "description": "Youth development initiative combining competitive chess with leadership development and personal growth through the TEAMUP Programme.",
        "contactPoint": { "@type": "ContactPoint", "email": "info@beeeproject.com", "telephone": "+234-802-092-0872", "contactType": "customer service" }
      }
    ]
  }</script>
</svelte:head>

<ChampHero />

<!-- Section 2: The Journey -->
<section id="journey" bind:this={journeySection} class="relative bg-navy">
  <div class="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">
    <h2 class="font-hero text-4xl text-white ml-[10vw] tracking-tight">The Championship Journey</h2>
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
<section id="platform" class="py-32 px-6 max-w-7xl mx-auto">
  <h2 class="font-hero text-5xl text-amber-400 text-center mb-20 tracking-tight font-bold">A Comprehensive Development Pathway</h2>
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
        <h3 class="font-hero text-xl font-bold text-white mb-2">MASTER CHESS PLAYER™</h3>
        <p class="font-['Inter'] text-gray-300 text-sm">Real-time AI mentoring and move analysis.</p>
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
          Technology.<br />Enterprise.<br />Art.<br />Mentorship.<br />Upskill.
        </p>
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
  <h1 class="font-hero text-[10vw] text-white leading-none tracking-tighter">Make Your Move.</h1>
  <RegisterBtn href="/register" class="px-8 py-4 text-base mt-6" />
</footer>

<style>
  #journey {
    scrollbar-width: none;
  }
  #journey::-webkit-scrollbar {
    display: none;
  }
</style>
