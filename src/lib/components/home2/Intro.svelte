<script lang="ts">
  import { onMount } from 'svelte';
  import gsap from 'gsap';
  import SplitText from 'gsap/SplitText';
  import { stopScroll, startScroll } from '$lib/motion/smooth-scroll';
  import { REDUCED } from '$lib/motion/constants';

  const SPECTRUM = ['t', 'e', 'a', 'm', 'u'] as const;
  const CLONE_OFFSETS = [
    { x: 4, y: -14 },
    { x: 8, y: -7 },
    { x: 12, y: 0 },
    { x: 16, y: 7 },
    { x: 20, y: 14 }
  ];
  const THREAD_ANGLES = [-16, -8, 0, 8, 16];

  let show = $state(false);
  let overlay: HTMLElement | undefined = $state();
  let winEl: HTMLElement | undefined = $state();
  let hexOutline: SVGPolygonElement | undefined = $state();
  let hexFill: SVGPolygonElement | undefined = $state();
  let beamEl: HTMLElement | undefined = $state();
  let threadEls: HTMLElement[] = $state([]);
  let cloneEls: HTMLElement[] = $state([]);

  onMount(() => {
    if (typeof sessionStorage === 'undefined' || sessionStorage.getItem('beee_intro') === '1') {
      return;
    }
    show = true;
    sessionStorage.setItem('beee_intro', '1');
    stopScroll();

    let finished = false;
    function finish() {
      if (finished) return;
      finished = true;
      window.dispatchEvent(new Event('intro:done'));
      startScroll();
      show = false;
    }

    requestAnimationFrame(() => {
      if (!overlay || !winEl) {
        finish();
        return;
      }

      if (REDUCED()) {
        gsap.set([winEl, hexOutline].filter(Boolean), { opacity: 1 });
        const skip = () => {
          gsap.to(overlay!, { opacity: 0, duration: 0.3, onComplete: finish });
        };
        const timer = setTimeout(skip, 400);
        const onSkip = () => {
          clearTimeout(timer);
          skip();
        };
        window.addEventListener('pointerdown', onSkip, { once: true });
        window.addEventListener('keydown', onSkip, { once: true });
        return;
      }

      const split = new SplitText(winEl, { type: 'chars' });
      split.chars.forEach((c) => {
        const wrap = document.createElement('span');
        wrap.style.display = 'inline-block';
        wrap.style.overflow = 'hidden';
        c.parentNode?.insertBefore(wrap, c);
        wrap.appendChild(c);
      });

      const tl = gsap.timeline({ onComplete: finish });
      tl.from(split.chars, { yPercent: 110, duration: 0.9, stagger: 0.06 }, 0.1);
      tl.to(hexOutline!, { opacity: 1, duration: 0.4 }, 0.9);
      tl.to(beamEl!, { width: '12vw', duration: 0.6, ease: 'power4.inOut' }, 1.0);
      tl.to(hexFill!, { opacity: 0.35, duration: 0.15, yoyo: true, repeat: 1 }, 1.6);
      tl.to(threadEls, { width: '26vw', duration: 0.7, stagger: 0.04 }, 1.62);
      tl.to(
        cloneEls,
        {
          opacity: 0.8,
          x: (i) => CLONE_OFFSETS[i].x,
          y: (i) => CLONE_OFFSETS[i].y,
          duration: 0.5
        },
        1.62
      );
      tl.to(overlay!, { yPercent: -100, duration: 0.8, ease: 'power4.inOut' }, 2.3);

      function skip() {
        tl.progress(1);
      }
      window.addEventListener('pointerdown', skip, { once: true });
      window.addEventListener('keydown', skip, { once: true });
    });
  });
</script>

{#if show}
  <div bind:this={overlay} class="intro noise" aria-hidden="true">
    <div class="intro-row">
      <svg class="intro-hex" viewBox="0 0 96 96" width="96" height="96">
        <polygon
          bind:this={hexFill}
          points="94,48 71,87.84 25,87.84 2,48 25,8.16 71,8.16"
          fill="var(--honey)"
          opacity="0"
        />
        <polygon
          bind:this={hexOutline}
          points="94,48 71,87.84 25,87.84 2,48 25,8.16 71,8.16"
          fill="none"
          stroke="var(--ink)"
          stroke-width="1.5"
          opacity="0"
        />
      </svg>

      <div class="intro-beam" bind:this={beamEl}></div>
      {#each THREAD_ANGLES as angle, i}
        <div
          class="intro-thread"
          bind:this={threadEls[i]}
          style="background: var(--spec-{SPECTRUM[i]}); transform: translateY(-50%) rotate({angle}deg);"
        ></div>
      {/each}

      <div class="intro-win-wrap">
        <span class="rv-d1 intro-win" bind:this={winEl}>WIN</span>
        {#each SPECTRUM as letter, i}
          <span class="rv-d1 intro-win intro-clone" aria-hidden="true" bind:this={cloneEls[i]} style="color: var(--spec-{letter})">WIN</span>
        {/each}
      </div>
    </div>
  </div>
{/if}

<style>
  .intro {
    position: fixed;
    inset: 0;
    z-index: var(--z-intro);
    background: var(--cloud);
    color: var(--ink);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .intro-row {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .intro-hex {
    position: absolute;
    left: calc(50% - 12vw - 48px);
    top: 50%;
    translate: 0 -50%;
  }

  .intro-beam {
    position: absolute;
    top: 50%;
    right: 50%;
    width: 0;
    height: 2px;
    transform-origin: right center;
    background: linear-gradient(90deg, var(--honey), var(--beam));
  }

  .intro-thread {
    position: absolute;
    top: 50%;
    left: calc(50% - 12vw);
    width: 0;
    height: 2px;
    transform-origin: left center;
  }

  .intro-win-wrap {
    position: relative;
  }

  .intro-win {
    display: block;
    font-size: clamp(96px, 22vw, 320px);
    font-weight: 700;
  }

  .intro-clone {
    position: absolute;
    inset: 0;
    opacity: 0;
    pointer-events: none;
  }
</style>
