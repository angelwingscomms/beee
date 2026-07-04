<script lang="ts">
  import { onMount } from 'svelte';
  import gsap from 'gsap';
  import { ScrollTrigger } from 'gsap/ScrollTrigger';
  import { SplitText } from 'gsap/dist/SplitText';

  gsap.registerPlugin(ScrollTrigger, SplitText);

  let target: HTMLElement | undefined = $state();

  onMount(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches || !target) return;

    const split = new SplitText(target, { type: 'words' });

    gsap.from(split.words, {
      y: 100,
      opacity: 0,
      duration: 0.8,
      stagger: 0.05,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '#philosophy',
        start: 'top 70%',
      },
    });
  });
</script>

<section id="philosophy" class="h-screen flex items-center justify-center bg-amber-400">
  <h2 bind:this={target} class="split-text-target font-hero text-6xl md:text-9xl text-[#0A0F1A] font-black text-center tracking-tighter leading-[0.9] w-[80vw] mx-auto">
    Chess is not the destination. It is the platform.
  </h2>
</section>
