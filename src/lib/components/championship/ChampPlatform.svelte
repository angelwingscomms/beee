<script lang="ts">
  import { onMount } from 'svelte';
  import gsap from 'gsap';
  import { ScrollTrigger } from 'gsap/ScrollTrigger';

  gsap.registerPlugin(ScrollTrigger);

  let cardEls: (HTMLElement | undefined)[] = $state([]);
  let card1El: HTMLElement | undefined = $state();
  let uiSticker: HTMLElement | undefined = $state();

  onMount(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const els = cardEls.filter((e): e is HTMLElement => e != null);
    if (els.length) {
      gsap.from(els, {
        y: 60,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '#platform',
          start: 'top 80%',
        },
      });
    }
  });

  function onHoverIn() {
    if (card1El) gsap.to(card1El, { rotateX: 2, rotateY: -12, duration: 0.4, ease: 'power2.out' });
    if (uiSticker) gsap.to(uiSticker, { filter: 'brightness(1.2)', duration: 0.3 });
  }

  function onHoverOut() {
    if (card1El) gsap.to(card1El, { rotateX: 0, rotateY: 0, duration: 0.4, ease: 'power2.out' });
    if (uiSticker) gsap.to(uiSticker, { filter: 'brightness(1)', duration: 0.3 });
  }
</script>

<section id="platform" class="py-32 px-6 max-w-7xl mx-auto">
  <h2 class="font-hero text-5xl text-white text-center mb-20 tracking-tight">A Comprehensive Development Pathway</h2>

  <div class="grid grid-cols-12 gap-6 auto-rows-[400px]">
    <div class="col-span-12 md:col-span-8 bg-slate-900 rounded-3xl overflow-hidden relative group"
      bind:this={card1El}
      onmouseenter={onHoverIn}
      onmouseleave={onHoverOut}
      bind:this={cardEls[0]}>
      <img src="/images/student-holding-phone.png" alt="" class="w-full h-full object-cover" />
      <div bind:this={uiSticker} class="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
        <img src="/images/master-chess-ui.png" alt="MASTER CHESS PLAYER UI"
          class="w-[55%] md:w-[45%] object-contain"
          style="transform: perspective(1000px) rotateX(2deg) rotateY(-15deg) skewY(-2deg);" />
      </div>
      <div class="absolute inset-0 z-20 pointer-events-none" style="background: linear-gradient(135deg, rgba(255,255,255,0.12) 0%, transparent 50%, rgba(255,255,255,0.04) 100%);"></div>
      <div class="absolute bottom-0 left-0 p-8 z-20">
        <h3 class="font-hero text-xl font-bold text-white mb-2">MASTER CHESS PLAYER™</h3>
        <p class="font-['Inter'] text-gray-300">Real-time AI mentoring and move analysis.</p>
      </div>
    </div>

    <div class="col-span-12 md:col-span-4 bg-[#1A2B4C] rounded-3xl overflow-hidden relative group p-8 flex flex-col justify-between"
      bind:this={cardEls[1]}>
      <img src="/images/championship/bento_passport.png" alt=""
        class="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:opacity-60 transition-opacity" />
      <div class="relative z-10 mt-auto">
        <h3 class="font-hero text-xl font-bold text-white mb-2">TASKIFY™ Passport</h3>
        <p class="font-['Inter'] text-gray-300">Track milestones and earn digital achievement badges.</p>
      </div>
    </div>

    <div class="col-span-12 h-[450px] bg-white/5 rounded-3xl overflow-hidden relative group flex items-center"
      bind:this={cardEls[2]}>
      <img src="/images/bento-mentorship-candid.png" alt=""
        class="absolute inset-0 w-full h-full object-cover" />
      <div class="relative z-20 ml-12 max-w-xl">
        <p class="font-hero text-amber-400 text-3xl md:text-5xl font-bold tracking-tight leading-[1.1]">
          Technology.<br />Enterprise.<br />Art.<br />Mentorship.<br />Upskill.
        </p>
      </div>
    </div>
  </div>
</section>
