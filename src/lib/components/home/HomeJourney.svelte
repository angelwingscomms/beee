<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import gsap from 'gsap';
  import { ScrollTrigger } from 'gsap/ScrollTrigger';
  import Button from '$lib/components/Button.svelte';
  import { dev } from '$app/environment';
  import { REG_AMOUNT, DEV_REG_FEE_NAIRA } from '$lib/constants';

  const HERO_AMOUNT = dev ? DEV_REG_FEE_NAIRA : REG_AMOUNT;

  const steps = [
    { num: 1, title: 'Online Training & Coaching', sub: 'Jul 28 – Aug 29, 2026', body: 'Registration unlocks e4\u2122 AI chess coaching, TEAMUP\u2122 leadership workshops, and the Taskify\u2122 Development Passport — all online, all included.', img: '/images/championship/learn.png', alt: 'Child using the e4 AI chess coach on a tablet' },
    { num: 2, title: 'Qualifying Rounds', sub: 'September 2026', body: 'Participants compete in live qualifying rounds of the championship.', img: '/images/championship/compete.png', alt: 'Students competing at qualifying-round chess boards' },
    { num: 3, title: 'Elite Stage', sub: 'Sep \u2013 Oct 2026 \u00B7 Top qualifiers', body: 'Live elimination tournaments and advanced coaching \u2014 the top performers face off for the finalist spots.', img: '/images/championship/develop.png', alt: 'Coaches and players reviewing a game in the elite stage' },
    { num: 4, title: 'Grand Finale', sub: 'October 2026', body: 'Finalists take part in an immersive live championship experience \u2014 staged, filmed, and celebrated like nothing in conventional chess.', img: '/images/championship/grandfinale.png', alt: 'The championship grand finale stage' },
  ];

  let sectionEl: HTMLElement;
  let triggers: ScrollTrigger[] = [];

  onMount(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    // Card stagger reveal
    const stepEls = sectionEl.querySelectorAll<HTMLElement>('.hj-step');
    const revealTween = gsap.from(stepEls, {
      y: 40,
      opacity: 0,
      duration: 0.7,
      stagger: 0.12,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: sectionEl,
        start: 'top 75%',
      },
    });
    if (revealTween.scrollTrigger) triggers.push(revealTween.scrollTrigger);
  });

  onDestroy(() => {
    triggers.forEach((t) => t.kill());
  });
</script>

<section
  bind:this={sectionEl}
  class="relative bg-navy px-6 py-20 md:py-28"
  aria-labelledby="home-journey-heading"
>
  <div
    class="absolute inset-0 pointer-events-none"
    style="background: radial-gradient(ellipse 80% 50% at 50% 0%, rgba(26,43,76,.6) 0%, transparent 70%)"
    aria-hidden="true"
  ></div>

  <div class="max-w-7xl mx-auto relative z-10">
    <!-- Header -->
    <div class="text-center mb-14 md:mb-20">
      <h2
        id="home-journey-heading"
        class="font-hero text-white font-bold tracking-[-0.02em]"
        style="font-size: var(--fs-display-md)"
      >
        Your <span class="text-amber-400">Championship</span> Journey
      </h2>
      <p class="mt-4 text-white/60 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
        From first online lesson to the grand finale stage.
      </p>
    </div>

    <!-- Cards: 2x2 grid, alternating text-first / image-first -->
    <ol class="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
      {#each steps as step, i}
        {@const textFirst = i % 2 === 0}
        <li class="hj-step">
          <div
            class="group relative rounded-2xl overflow-hidden border border-white/10 bg-white/[0.04] flex flex-col h-full transition-[border-color,background-color] duration-300"
          >
            {#if textFirst}
              <!-- Text block -->
              <div class="p-5 lg:p-7 flex flex-col gap-3 flex-1 bg-[#f5e6c8]">
                <div class="flex items-center gap-3">
                  <span class="flex items-center justify-center w-9 h-9 rounded-full border border-amber-400/40 text-amber-500 font-hero font-bold text-base shrink-0">{step.num}</span>
                  <p class="font-hero text-xs md:text-sm font-bold uppercase tracking-[0.12em] text-[#141413]/80">
                    <span class="sr-only">Step {step.num} — </span>{step.sub}
                  </p>
                </div>
                <h3 class="font-hero text-[#141413] font-bold text-xl lg:text-2xl leading-snug">{step.title}</h3>
                <p class="text-[#141413]/70 text-sm leading-relaxed">{step.body}</p>
              </div>
              <!-- Image -->
              <div class="relative aspect-[16/10] w-full overflow-hidden">
                <img
                  src={step.img}
                  alt={step.alt}
                  loading={i === 0 ? 'eager' : 'lazy'}
                  class="absolute inset-0 w-full h-full object-cover transition-transform duration-500 motion-safe:group-hover:scale-105"
                />
                <div class="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#0A0F1A]/70 to-transparent" aria-hidden="true"></div>
              </div>
            {:else}
              <!-- Image -->
              <div class="relative aspect-[16/10] w-full overflow-hidden">
                <img
                  src={step.img}
                  alt={step.alt}
                  loading="lazy"
                  class="absolute inset-0 w-full h-full object-cover transition-transform duration-500 motion-safe:group-hover:scale-105"
                />
                <div class="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#0A0F1A]/70 to-transparent" aria-hidden="true"></div>
              </div>
              <!-- Text block -->
              <div class="p-5 lg:p-7 flex flex-col gap-3 flex-1 bg-[#f5e6c8]">
                <div class="flex items-center gap-3">
                  <span class="flex items-center justify-center w-9 h-9 rounded-full border border-amber-400/40 text-amber-500 font-hero font-bold text-base shrink-0">{step.num}</span>
                  <p class="font-hero text-xs md:text-sm font-bold uppercase tracking-[0.12em] text-[#141413]/80">
                    <span class="sr-only">Step {step.num} — </span>{step.sub}
                  </p>
                </div>
                <h3 class="font-hero text-[#141413] font-bold text-xl lg:text-2xl leading-snug">{step.title}</h3>
                <p class="text-[#141413]/70 text-sm leading-relaxed">{step.body}</p>
              </div>
            {/if}
          </div>
        </li>
      {/each}
    </ol>

    <!-- CTA -->
    <div class="mt-12 md:mt-16 text-center">
      <p class="text-white/60 text-sm mb-4">The journey starts with registration.</p>
      <Button href="/register" class="px-8 py-4 text-base">
        Register your child — ₦{HERO_AMOUNT.toLocaleString()}
      </Button>
    </div>
  </div>
</section>

<style>
  /* Hover media query via CSS (Tailwind doesn't handle @media hover cleanly) */
  @media (hover: hover) {
    .hj-step .group:hover {
      border-color: rgba(255, 178, 0, 0.4);
      background: rgba(255, 255, 255, 0.06);
    }
  }
</style>
