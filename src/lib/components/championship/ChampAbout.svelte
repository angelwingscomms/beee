<script lang="ts">
  import { scroll } from 'motion';
  import { onMount } from 'svelte';
  import aboutBg from '$lib/assets/images/championship/about-new.png?enhanced';

  let section: HTMLElement;
  let progress = $state(0);

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
    'We believe every young person possesses extraordinary potential waiting to be discovered and developed.',
    'Our mission is to provide opportunities that cultivate strategic thinking, leadership, creativity, collaboration, critical reasoning, resilience, confidence, and lifelong learning through carefully designed experiences centred around chess.',
    'Chess is not the destination. It is the platform.',
    'Our vision: To create a generation of young thinkers, innovators, leaders, and changemakers who apply the strategic lessons of chess to academics, leadership, entrepreneurship, and life.'
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
  <div class="champ-about-gradient"></div>
  <div class="champ-about-pin">
    <div class="container champ-about-grid">
      <div class="champ-about-sticky">
        <div class="champ-about-ornament"></div>
        <h2 class="champ-about-title">Why BEEE?</h2>
      </div>
      <div class="champ-about-text">
        {#each paragraphs as para, pi}
          {#if pi === 2}
            <blockquote class="champ-about-emphasis">
              {#each para.split(/(\s+)/).filter(Boolean) as word, wi}
                <span class="champ-about-word" style={word_reveal(wi, pi)}>{word}</span>
              {/each}
            </blockquote>
          {:else}
            <p>
              {#if pi === 3}
                <strong class="champ-about-word" style={word_reveal(0, pi)}>Our</strong>
                <strong class="champ-about-word" style={word_reveal(1, pi)}>vision:</strong>
                {#each para.split(/(\s+)/).filter(Boolean).slice(4) as word, wi}
                  <span class="champ-about-word" style={word_reveal(wi + 4, pi)}>{word}</span>
                {/each}
              {:else}
                {#each para.split(/(\s+)/).filter(Boolean) as word, wi}
                  <span class="champ-about-word" style={word_reveal(wi, pi)}>{word}</span>
                {/each}
              {/if}
            </p>
          {/if}
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
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 48px;
    align-items: start;
  }

  .champ-about-sticky {
    position: sticky;
    top: 96px;
    display: grid;
    gap: 20px;
  }

  .champ-about-ornament {
    width: 32px;
    height: 3px;
    background: var(--primary);
    border-radius: 999px;
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
    gap: 28px;
  }

  .champ-about-text p {
    margin: 0;
    font-size: 16px;
    line-height: 1.7;
    color: var(--on-dark-soft);
  }

  .champ-about-emphasis {
    margin: 0;
    padding: 16px 0 16px 20px;
    border-left: 3px solid var(--primary);
    font-family: var(--font-display);
    font-size: clamp(1.3rem, 2.5vw, 1.8rem);
    font-style: italic;
    color: var(--primary);
    line-height: 1.4;
  }

  .champ-about-word {
    will-change: opacity;
  }

  @media (max-width: 767px) {
    .champ-about-pin {
      padding: 80px 0;
    }
    .champ-about-grid {
      grid-template-columns: 1fr;
      gap: 24px;
    }
    .champ-about-sticky {
      position: static;
    }
    .champ-about-text p {
      font-size: 15px;
    }
  }
</style>
