<script lang="ts">
  import { onMount } from 'svelte';
  import gsap from 'gsap';
  import { ScrollTrigger } from 'gsap/ScrollTrigger';
  import { getLenis } from '$lib/motion/smooth-scroll';

  const ITEMS = [
    { label: '01 ARRIVE', target: '#hero' },
    { label: '02 BELIEVE', target: '#manifesto' },
    { label: '03 THE ROAD', target: '#journey' },
    { label: '04 THE SPLIT', target: '#split' },
    { label: '05 YOUR MOVE', target: '#finale' }
  ];

  let active = $state(0);

  onMount(() => {
    ITEMS.forEach((item, i) => {
      const el = document.querySelector(item.target);
      if (!el) return;
      ScrollTrigger.create({
        trigger: el,
        start: 'top center',
        end: 'bottom center',
        onToggle: (self) => {
          if (self.isActive) active = i;
        }
      });
    });
  });

  function go(target: string) {
    const lenis = getLenis();
    if (lenis) lenis.scrollTo(target);
    else document.querySelector(target)?.scrollIntoView({ behavior: 'smooth' });
  }
</script>

<nav class="journey-rail" aria-label="Page sections">
  {#each ITEMS as item, i (item.target)}
    <button
      class="rail-item"
      class:active={active === i}
      onclick={() => go(item.target)}
      aria-label={`Go to section: ${item.label}`}
    >
      <span class="rail-hairline"></span>
      <span class="rv-micro rail-label">{item.label}</span>
    </button>
  {/each}
</nav>

<style>
  .journey-rail {
    display: none;
  }

  @media (--md-up) {
    .journey-rail {
      display: flex;
      flex-direction: column;
      gap: 12px;
      position: fixed;
      right: calc(var(--margin-x) / 2);
      top: 50%;
      translate: 0 -50%;
      z-index: var(--z-nav);
      mix-blend-mode: difference;
      color: #F2EFE8;
    }
  }

  .rail-item {
    display: flex;
    align-items: center;
    gap: 10px;
    background: none;
    border: none;
    color: inherit;
    cursor: pointer;
    opacity: 0.35;
    transition: opacity var(--dur-micro) var(--ease-out);
  }

  .rail-item.active {
    opacity: 1;
  }

  .rail-hairline {
    display: block;
    width: 16px;
    height: 1px;
    background: currentColor;
    transition: width var(--dur-micro) var(--ease-out), background var(--dur-micro) var(--ease-out);
  }

  .rail-item.active .rail-hairline {
    width: 32px;
    background: var(--beam);
  }

  .rail-label {
    font-size: 9px;
    color: currentColor;
  }
</style>
