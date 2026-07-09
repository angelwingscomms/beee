<script lang="ts">
  import { onMount } from 'svelte';
  import gsap from 'gsap';
  import { ScrollTrigger } from 'gsap/ScrollTrigger';
  import RegisterBtn from '$lib/components/RegisterBtn.svelte';

  gsap.registerPlugin(ScrollTrigger);

  let imageWrapper: HTMLElement | undefined = $state();
  let float1: HTMLElement | undefined = $state();
  let float2: HTMLElement | undefined = $state();
  let pinned = $state(false);

  onMount(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const tl = gsap.timeline();

    tl.from('.hero-anim-elem', {
      y: 30,
      opacity: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: 'power3.out',
      delay: 0.2,
    });

    if (imageWrapper) {
      tl.from(imageWrapper, {
        scale: 0.95,
        opacity: 0,
        duration: 1.2,
        ease: 'expo.out',
      }, 0);
    }

    const floats = [float1, float2].filter((f): f is HTMLElement => f != null);

    if (floats.length) tl.from(floats, {
      y: 20,
      opacity: 0,
      duration: 1,
      ease: 'elastic.out(1, 0.5)',
    }, 0.8);

    floats.forEach((el) => {
      gsap.to(el, {
        y: 10,
        duration: 3,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
        delay: 2,
      });
    });

    ScrollTrigger.create({
      trigger: imageWrapper,
      pin: true,
      start: 'top 15%',
      end: () => '+=' + (imageWrapper?.offsetHeight ?? 500),
      pinSpacing: true,
      onEnter: () => pinned = true,
      onLeaveBack: () => pinned = false,
    });
  });
</script>

<section class="min-h-screen relative overflow-hidden flex items-center bg-navy">
  <div class="absolute inset-0 pointer-events-none" style="background: radial-gradient(ellipse 120% 100% at 0% 0%, #1A2B4C 0%, transparent 70%)"></div>

  <div class="max-w-[96rem] mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center pt-24 pb-12 relative z-10">

    <div class="lg:col-span-5">
      <h1 class="hero-anim-elem font-hero text-3xl lg:text-5xl font-bold text-amber-400 leading-[1.1] tracking-tight mb-4">
        BEEE Spectacular Chess Championship Abuja 2026
      </h1>

      <h2 class="hero-anim-elem font-hero text-5xl lg:text-7xl font-extrabold text-white leading-[1.1] tracking-tight mb-6">
        Your child.<br />One board.<br />A lifetime of advantage.
      </h2>

      <p class="hero-anim-elem font-['Inter'] text-lg text-gray-300 leading-relaxed mb-8 max-w-lg">
        A transformative youth development experience that combines competitive chess with AI-powered learning, leadership development, mentorship, and personal growth
      </p>

      <div class="hero-anim-elem flex flex-col sm:flex-row gap-4 sm:gap-10 mb-10">
        <div class="flex items-center gap-3 text-lg">
          <svg class="w-[18px] h-[18px] text-amber-400/70" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"/></svg>
          <span class="text-white font-medium">10–14 years</span>
        </div>
        <div class="flex items-center gap-3 text-lg">
          <svg class="w-[18px] h-[18px] text-amber-400/70" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5"/></svg>
          <span class="text-white font-medium">July 28 – October 2026</span>
        </div>
        <div class="flex items-center gap-3 text-lg">
          <svg class="w-[18px] h-[18px] text-amber-400/70" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M9.568 3H5.25A2.25 2.25 0 0 0 3 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 0 0 5.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 0 0 9.568 3Z"/><path stroke-linecap="round" stroke-linejoin="round" d="M6 6h.008v.008H6V6Z"/></svg>
          <span class="text-white font-medium">₦15,000</span>
        </div>
      </div>

      <div class="hero-anim-elem flex items-center gap-2 mb-8 text-base sm:text-lg text-amber-400/80">
        <svg class="w-[18px] h-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 0 1 15 0Z"/></svg>
        <span>Preliminaries and Grand Finale<br />Venue:<br />National Stadium, Abuja</span>
      </div>

      <div class="hero-anim-elem flex gap-4 flex-col sm:flex-row">
        <RegisterBtn href="/register" class="px-8 py-4 w-full sm:w-auto text-base">Start Your Child's Journey</RegisterBtn>
        <a href="/championship" class="bg-transparent border border-white font-medium px-8 py-4 rounded-full hover:border-white transition-colors w-full sm:w-auto text-center" style="color: #fff">
          See How It Works
        </a>
      </div>

      <div class="mt-5">
        <a href="/affiliate" class="text-[#5db8a6] text-base font-medium no-underline hover:brightness-110 transition-all">Become an Affiliate →</a>
      </div>
    </div>

    <div class="lg:col-span-7 flex justify-center items-center" bind:this={imageWrapper}>
      <div class="relative w-full max-w-xl aspect-square lg:aspect-[4/5] rounded-3xl overflow-visible">
        <img
          src="/images/hero.png"
          alt="Student playing chess"
          class="object-cover rounded-3xl w-full h-full"
          fetchpriority="high"
        />

        <!-- feature-float-cards -->
        <!-- e4 AI feedback card
        <div bind:this={float1} class="absolute -right-4 lg:-right-12 top-12 max-w-[280px] z-10 bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl p-4 rounded-2xl flex flex-col gap-3">
          <div class="flex items-center gap-2">
            <span class="w-4 h-4 bg-amber-400/20 rounded flex items-center justify-center text-xs shrink-0">🧠</span>
            <span class="text-[10px] text-gray-400 font-mono uppercase tracking-wider">e4&#8482; AI</span>
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
