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

  <div class="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center pt-24 pb-12 relative z-10">

    <div class="lg:col-span-5">
      <p class="hero-anim-elem text-xs font-mono uppercase tracking-[0.2em] text-amber-400 mb-6 flex items-center gap-2">
        <span class="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
        FOR ABUJA SCHOOLS &amp; STUDENTS (AGES 10–14)
      </p>

      <h1 class="hero-anim-elem font-hero text-5xl lg:text-7xl font-extrabold text-white leading-[1.1] tracking-tight mb-6">
        Equip your students for life beyond the chessboard.
      </h1>

      <p class="hero-anim-elem font-['Inter'] text-lg text-gray-300 leading-relaxed mb-8 max-w-lg">
        A transformative championship combining AI-powered chess training, leadership mentorship, and the TEAMUP&#8482; curriculum. July to October 2026.
      </p>

      <div class="hero-anim-elem flex gap-4 flex-col sm:flex-row">
        <RegisterBtn href="/register" class="px-8 py-4 w-full sm:w-auto text-base" />
        <a href="/championship" class="bg-transparent border border-white text-white font-medium px-8 py-4 rounded-full hover:border-white transition-colors w-full sm:w-auto text-center">
          Explore the Journey
        </a>
      </div>

      <div class="hero-anim-elem mt-12">
        <p class="text-xs font-mono text-gray-500 uppercase tracking-widest opacity-70">
          Powered by: MASTER CHESS PLAYER&#8482; &bull; TASKIFY&#8482; &bull; TEAMUP&#8482;
        </p>
      </div>
    </div>

    <div class="lg:col-span-7" bind:this={imageWrapper}>
      <div class="relative w-full aspect-square lg:aspect-[4/5] rounded-3xl overflow-visible">
        <img
          src="/images/hero.png"
          alt="Student playing chess"
          class="object-cover rounded-3xl w-full h-full"
          fetchpriority="high"
        />

        <!-- feature-float-cards -->
        <!-- Master Chess Player AI feedback card
        <div bind:this={float1} class="absolute -right-4 lg:-right-12 top-12 max-w-[280px] z-10 bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl p-4 rounded-2xl flex flex-col gap-3">
          <div class="flex items-center gap-2">
            <span class="w-4 h-4 bg-amber-400/20 rounded flex items-center justify-center text-xs shrink-0">🧠</span>
            <span class="text-[10px] text-gray-400 font-mono uppercase tracking-wider">MASTER CHESS PLAYER&#8482; AI</span>
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
