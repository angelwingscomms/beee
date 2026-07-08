<script lang="ts">
  import { onMount } from 'svelte';
  import gsap from 'gsap';
  import { ScrollTrigger } from 'gsap/ScrollTrigger';
  import SplitText from 'gsap/SplitText';
  import ChampHero from '$lib/components/championship/ChampHero.svelte';

  gsap.registerPlugin(ScrollTrigger, SplitText);

  let bentoCard1: HTMLElement | undefined = $state();
  let bentoCard2: HTMLElement | undefined = $state();
  let bentoCardBase: HTMLElement | undefined = $state();
  let bentoUI: HTMLElement | undefined = $state();
  let philosophyText: HTMLElement | undefined = $state();

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
<section id="journey" class="min-h-screen py-24 bg-navy">
    <div class="px-[10vw] mb-16">
      <div class="w-full max-w-5xl mx-auto bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-12 md:p-16">
        <p class="font-hero text-2xl tracking-[0.2em] uppercase text-amber-400/80 mb-6">The BEEE Project</p>
        <ul class="font-['Inter'] text-gray-400 leading-relaxed text-xl list-disc list-inside space-y-3">
          <li>The BEEE Project&trade; is a youth development initiative that empowers young people for success in school, leadership, and life by harnessing the positive impact of purposeful learning, everyday tasks, and meaningful engagement.</li>
          <li>Guided by the motto, &ldquo;Aspire to BEEE &mdash; Be Everything Excellent Every Day,&rdquo; the project helps young people discover their potential while developing critical thinking, confidence, discipline, creativity, resilience, and problem-solving skills needed to thrive in an ever-changing world.</li>
        </ul>
      </div>
    </div>
    <div class="px-[10vw]">
      <div class="w-full max-w-5xl mx-auto bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-12 md:p-16">
        <p class="font-hero text-2xl tracking-[0.2em] uppercase text-amber-400/80 mb-6">BEEE Spectacular Chess Championship</p>
        <p class="font-['Inter'] text-gray-400 leading-relaxed text-xl">The BEEE&reg; Spectacular Chess Championship is the flagship programme of The BEEE Project&trade;, combining competitive chess with technology, mentorship, leadership development, and personal growth.</p>
      </div>
    </div>
</section>

<!-- Intro Bridge -->
<section id="intro-cta" class="py-32 md:py-48 bg-navy">
  <div class="max-w-6xl mx-auto px-6">
    <p class="font-['Inter'] text-gray-400 text-xl md:text-2xl leading-relaxed max-w-4xl">
      Designed for students aged 10 to 14 years in schools across Abuja, the championship runs from 28 July to October 2026, taking participants on an exciting journey from online learning to an unforgettable championship finale.
    </p>
    <h2 class="font-hero text-[14vw] md:text-[10vw] text-amber-400 font-black leading-none tracking-tighter mt-20 select-none">
      Make Your Move
    </h2>
  </div>
</section>

<!-- Section 3: The Platform -->
<section id="platform" class="py-20 px-6">
    <h2 class="font-hero text-5xl text-amber-400 text-center mb-20 tracking-tight font-bold">Everything Your Child Needs</h2>
  <div class="grid grid-cols-12 gap-6 auto-rows-[400px]">
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
    <div bind:this={bentoCard2} class="col-span-12 md:col-span-4 bg-[#1A2B4C] rounded-3xl overflow-hidden relative group p-8 flex flex-col justify-between">
      <div class="absolute inset-0 bg-[#1A2B4C]"></div>
      <div class="relative z-10">
        <h3 class="font-hero text-xl font-bold text-white mb-2">e4™ — AI Chess Coach</h3>
        <p class="font-['Inter'] text-gray-300 text-sm">Play against a virtual opponent while an AI coach analyzes every move, explains mistakes, and guides improvement through voice and text.</p>
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

<!-- Section: What Makes BEEE Different -->
<section id="diff-section" class="py-32 md:py-48 bg-navy">
  <div class="max-w-7xl mx-auto px-6">
    <h2 class="font-hero text-4xl md:text-6xl text-white font-bold tracking-tight mb-6">What Makes BEEE Different?</h2>
    <p class="font-['Inter'] text-gray-400 text-lg md:text-xl leading-relaxed max-w-3xl mb-16">
      Every participant benefits from an integrated learning experience powered by four unique platforms.
    </p>

    <div class="grid grid-cols-12 gap-6 auto-rows-[minmax(260px,auto)] grid-flow-dense">
      <!-- BEEE -->
      <div class="col-span-12 md:col-span-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 md:p-10 flex flex-col group">
        <span class="text-3xl mb-5 block">&#9820;</span>
        <h3 class="font-hero text-2xl text-white font-bold mb-3">BEEE&reg;</h3>
        <p class="font-['Inter'] text-gray-400 text-base leading-relaxed mt-auto">
          A championship that develops strategic thinkers, confident learners, and future leaders.
        </p>
      </div>

      <!-- E4 AI CHESS COACH -->
      <div class="col-span-12 md:col-span-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 md:p-10 flex flex-col group">
        <span class="text-3xl mb-5 block">&#129302;</span>
        <h3 class="font-hero text-2xl text-white font-bold mb-3">E4 AI CHESS COACH&trade;</h3>
        <p class="font-['Inter'] text-gray-400 text-base leading-relaxed mt-auto">
          An intelligent AI chess coach that provides personalised training, game analysis, instant feedback, and advanced chess development.
        </p>
      </div>

      <!-- TEAMUP -->
      <div class="col-span-12 md:col-span-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 md:p-10 flex flex-col group">
        <span class="text-3xl mb-5 block">&#127775;</span>
        <h3 class="font-hero text-2xl text-white font-bold mb-3">T.E.A.M.U.P.&trade;</h3>
        <p class="font-['Inter'] text-gray-400 text-base leading-relaxed mt-auto">
          A holistic development programme that nurtures Technology, Enterprise, Art, Mentorship, and Upskilling to prepare participants for success beyond the chessboard.
        </p>
      </div>

      <!-- TASKIFY -->
      <div class="col-span-12 md:col-span-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 md:p-10 flex flex-col group">
        <span class="text-3xl mb-5 block">&#128216;</span>
        <h3 class="font-hero text-2xl text-white font-bold mb-3">TASKIFY&trade;</h3>
        <p class="font-['Inter'] text-gray-400 text-base leading-relaxed mt-auto">
          A digital Development Passport that records each participant's achievements, milestones, badges, certificates, skills, and championship progress.
        </p>
      </div>
    </div>
  </div>
</section>

<!-- What Participants Develop -->
<section id="skills" class="py-32 md:py-48 bg-navy border-t border-white/5">
  <div class="max-w-7xl mx-auto px-6">
    <h2 class="font-hero text-4xl md:text-6xl text-white font-bold tracking-tight mb-6">What Participants Develop</h2>
    <p class="font-['Inter'] text-gray-400 text-lg md:text-xl leading-relaxed max-w-3xl mb-16">
      Participants strengthen their ability in:
    </p>

    <div class="grid grid-cols-12 gap-4 auto-rows-[auto]">
      <div class="col-span-12 md:col-span-6 lg:col-span-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 flex items-start gap-4">
        <div class="w-8 h-8 rounded-full bg-amber-400/20 flex items-center justify-center shrink-0 mt-0.5">
          <svg class="w-4 h-4 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5"/></svg>
        </div>
        <p class="font-['Inter'] text-gray-300 text-base leading-relaxed">Strategic thinking and decision-making</p>
      </div>
      <div class="col-span-12 md:col-span-6 lg:col-span-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 flex items-start gap-4">
        <div class="w-8 h-8 rounded-full bg-amber-400/20 flex items-center justify-center shrink-0 mt-0.5">
          <svg class="w-4 h-4 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5"/></svg>
        </div>
        <p class="font-['Inter'] text-gray-300 text-base leading-relaxed">Critical reasoning and problem-solving</p>
      </div>
      <div class="col-span-12 md:col-span-6 lg:col-span-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 flex items-start gap-4">
        <div class="w-8 h-8 rounded-full bg-amber-400/20 flex items-center justify-center shrink-0 mt-0.5">
          <svg class="w-4 h-4 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5"/></svg>
        </div>
        <p class="font-['Inter'] text-gray-300 text-base leading-relaxed">Advanced chess concepts</p>
      </div>
      <div class="col-span-12 md:col-span-6 lg:col-span-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 flex items-start gap-4">
        <div class="w-8 h-8 rounded-full bg-amber-400/20 flex items-center justify-center shrink-0 mt-0.5">
          <svg class="w-4 h-4 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5"/></svg>
        </div>
        <p class="font-['Inter'] text-gray-300 text-base leading-relaxed">Leadership and teamwork</p>
      </div>
      <div class="col-span-12 md:col-span-6 lg:col-span-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 flex items-start gap-4">
        <div class="w-8 h-8 rounded-full bg-amber-400/20 flex items-center justify-center shrink-0 mt-0.5">
          <svg class="w-4 h-4 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5"/></svg>
        </div>
        <p class="font-['Inter'] text-gray-300 text-base leading-relaxed">Creativity and innovation</p>
      </div>
      <div class="col-span-12 md:col-span-6 lg:col-span-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 flex items-start gap-4">
        <div class="w-8 h-8 rounded-full bg-amber-400/20 flex items-center justify-center shrink-0 mt-0.5">
          <svg class="w-4 h-4 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5"/></svg>
        </div>
        <p class="font-['Inter'] text-gray-300 text-base leading-relaxed">Communication and collaboration</p>
      </div>
      <div class="col-span-12 md:col-span-6 lg:col-span-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 flex items-start gap-4">
        <div class="w-8 h-8 rounded-full bg-amber-400/20 flex items-center justify-center shrink-0 mt-0.5">
          <svg class="w-4 h-4 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5"/></svg>
        </div>
        <p class="font-['Inter'] text-gray-300 text-base leading-relaxed">Academic confidence and intellectual growth</p>
      </div>
      <div class="col-span-12 md:col-span-6 lg:col-span-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 flex items-start gap-4">
        <div class="w-8 h-8 rounded-full bg-amber-400/20 flex items-center justify-center shrink-0 mt-0.5">
          <svg class="w-4 h-4 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5"/></svg>
        </div>
        <p class="font-['Inter'] text-gray-300 text-base leading-relaxed">Resilience, discipline, and self-confidence</p>
      </div>
    </div>
  </div>
</section>

<!-- Section 4: Philosophy -->
<section id="philosophy" class="min-h-screen flex items-center justify-center bg-amber-400 px-6">
  <h2 bind:this={philosophyText} class="split-text-target font-hero text-4xl sm:text-5xl md:text-6xl lg:text-8xl xl:text-9xl text-[#0A0F1A] font-black text-center tracking-tighter leading-[0.9]">
    <span class="block whitespace-nowrap">Chess is not the destination.</span>
    <span class="block whitespace-nowrap">It is the platform.</span>
  </h2>
</section>

<!-- Section 4b: Philosophy (alt) -->
<section id="philosophy-alt" class="min-h-screen flex items-center justify-center bg-amber-400 px-6">
  <h2 class="font-hero text-4xl sm:text-5xl md:text-6xl lg:text-8xl xl:text-9xl text-[#0A0F1A] font-black text-center tracking-tighter leading-[0.9]">
    <span class="block whitespace-nowrap">Chess is where they learn.</span>
    <span class="block whitespace-nowrap">Life is where they lead.</span>
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
  }
  #journey::-webkit-scrollbar {
    display: none;
  }
</style>
