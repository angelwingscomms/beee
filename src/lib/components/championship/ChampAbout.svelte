<script lang="ts">
  import { scroll } from 'motion';
  import { onMount } from 'svelte';
  import aboutBg from '$lib/assets/images/championship/about-new.png?enhanced';

  let section: HTMLElement;
  let progress = $state(0);
  let pinBox: HTMLElement;

  onMount(() => {
    if (!section) return;
    const stop = scroll(() => {
      const rect = section.getBoundingClientRect();
      const sectionTop = rect.top + window.scrollY;
      const sectionH = rect.height;
      const scrollStart = sectionTop - window.innerHeight * 0.5;
      const scrollEnd = sectionTop + sectionH - window.innerHeight * 0.5;
      const p = Math.min(1, Math.max(0, (window.scrollY - scrollStart) / (scrollEnd - scrollStart)));
      progress = p;
    }, { axis: 'y' });
    return () => stop();
  });

  const paragraphs = [
    'At BEEE, we believe every young person possesses extraordinary potential waiting to be discovered and developed.',
    'Our mission is to provide opportunities that cultivate strategic thinking, leadership, creativity, collaboration, critical reasoning, resilience, confidence, and lifelong learning through carefully designed experiences centred around chess.',
    'Chess is not the destination. It is the platform.',
    'Our vision: to create a generation of young thinkers, innovators, leaders, and changemakers who apply the strategic lessons of chess to academics, leadership, entrepreneurship, and life.'
  ];

  function word_reveal(word_idx: number, para_idx: number) {
    const p = para_idx / paragraphs.length;
    const word_offset = word_idx / 12;
    const threshold = p + word_offset * 0.03;
    const op = progress > threshold ? 1 : 0.15 + (progress / Math.max(threshold, 0.05)) * 0.85;
    return `opacity: ${Math.min(1, op)}`;
  }
</script>

<section bind:this={section} class="champ-about" style="background-image: url({aboutBg.img.src})">
  <div class="champ-about-bg"></div>
  <div class="champ-about-gradient"></div>
  <div class="champ-about-pin" bind:this={pinBox}>
    <div class="container champ-about-grid">
      <div class="champ-about-sticky">
        <h2 class="champ-about-title">Why BEEE?</h2>
      </div>
      <div class="champ-about-text">
        {#each paragraphs as para, pi}
          <p>
            {#each para.split(/(\s+)/).filter(Boolean) as word, wi}
              <span class="champ-about-word" style={word_reveal(wi, pi)}>{word}</span>
            {/each}
          </p>
        {/each}
      </div>
    </div>
  </div>
</section>

<style>
  .champ-about {
    position: relative;
    color: var(--on-dark);
    background-size: cover;
    background-position: center;
  }

  .champ-about-bg {
    position: absolute;
    inset: 0;
    background-size: cover;
    background-position: center;
    filter: saturate(0.9) contrast(0.95);
  }

  .champ-about-gradient {
    position: absolute;
    inset: 0;
    background: linear-gradient(180deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.4) 100%);
    z-index: 0;
  }

  .champ-about-pin {
    padding: 160px 0;
    position: relative;
    z-index: 1;
  }

  .champ-about-grid {
    max-width: 50%;
    margin-left: auto;
    display: grid;
    gap: 32px;
  }

  .champ-about-title {
    margin: 0;
    font-family: var(--font-display);
    font-size: clamp(2.4rem, 4vw, 3.2rem);
    font-weight: 500;
    line-height: 1.1;
    letter-spacing: -0.01em;
    color: var(--on-dark);
  }

  .champ-about-text {
    display: grid;
    gap: 24px;
  }

  .champ-about-text p {
    margin: 0;
    font-size: 15px;
    line-height: 1.7;
    color: rgba(250, 249, 245, 0.82);
  }

  .champ-about-word {
    will-change: opacity;
    transition: opacity 0.1s ease;
  }

  @media (max-width: 767px) {
    .champ-about-pin {
      padding: 80px 0;
    }
    .champ-about-grid {
      max-width: 100%;
      gap: 20px;
    }
    .champ-about-text p {
      font-size: 14px;
    }
  }
</style>
