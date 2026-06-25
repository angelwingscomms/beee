<script lang="ts">
  import { scroll } from 'motion';
  import { onMount } from 'svelte';

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
    'Your child gains strategic thinking, confidence, and real connection with talented peers across Abuja.',
    'T.E.A.M.U.P. — Technology, Enterprise, Art, Mentorship, Upskill — weaves development into every stage.',
    'A digital Development Passport tracks every milestone, badge, and certificate — parents follow progress in real time.',
    'Think. Compete. Develop. Excel.'
  ];

  const strong_at = new Set([1]);
  const quote_at = 3;


  function word_reveal(word_idx: number, para_idx: number) {
    const p = para_idx / paragraphs.length;
    const word_offset = word_idx / 12;
    const threshold = p + word_offset * 0.03;
    const op = progress > threshold ? 1 : 0.15 + (progress / Math.max(threshold, 0.05)) * 0.85;
    return `opacity: ${Math.min(1, op)}`;
  }
</script>

<section bind:this={section} class="champ-about">
  <div class="champ-about-pin" bind:this={pinBox}>
    <div class="container champ-about-grid">
      <div class="champ-about-sticky">
        <h2 class="champ-about-title">Designed for young learners across Abuja</h2>
      </div>
      <div class="champ-about-text">
        {#each paragraphs as para, pi}
          <p>
            {#each para.split(/(\s+)/).filter(Boolean) as word, wi}
              {#if pi === quote_at}
                {#if /^\s+$/.test(word)}
                  <span class="champ-about-quote" style={word_reveal(wi, pi)}>{word}</span>
                {:else}
                  <span class="champ-about-quote" class:alt={Math.floor(wi / 2) % 2 === 1} style={word_reveal(wi, pi)}>{word}</span>
                {/if}
              {:else if strong_at.has(pi) && word === 'T.E.A.M.U.P.'}
                <strong class="champ-about-word" style={word_reveal(wi, pi)}>{word}</strong>
              {:else}
                <span class="champ-about-word" style={word_reveal(wi, pi)}>{word}</span>
              {/if}
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
    background:
      radial-gradient(ellipse 70% 50% at 50% 50%, rgba(24,23,21,0.2) 0%, rgba(24,23,21,0.88) 100%),
      url('/images/championship/about-bg.png');
    background-size: cover;
    background-position: center;
    color: var(--on-dark);
  }

  .champ-about-pin {
    padding: 160px 0;
    position: relative;
    z-index: 1;
  }

  .champ-about-grid {
    display: grid;
    grid-template-columns: 0.85fr 1.15fr;
    gap: 64px;
    align-items: start;
  }

  .champ-about-sticky {
    position: sticky;
    top: 120px;
  }

  .champ-about-title {
    margin: 0;
    font-family: var(--font-display);
    font-size: clamp(1.8rem, 3vw, 2.5rem);
    font-weight: 500;
    line-height: 1.15;
    letter-spacing: -0.01em;
    color: var(--on-dark);
  }

  .champ-about-text {
    display: grid;
    gap: 24px;
  }

  .champ-about-text p {
    margin: 0;
    font-size: 17px;
    line-height: 1.75;
    color: #fff;
  }

  .champ-about-text strong.champ-about-word {
    color: #fff;
    font-weight: 600;
  }

  .champ-about-word {
    will-change: opacity;
    transition: opacity 0.1s ease;
  }

  .champ-about-quote {
    font-family: var(--font-display);
    font-size: 22px;
    font-style: normal;
    letter-spacing: 0.04em;
    color: var(--primary);
    display: inline-block;
  }

  .champ-about-quote.alt {
    color: #fff;
  }

  @media (max-width: 767px) {
    .champ-about-pin {
      padding: 80px 0;
    }
    .champ-about-grid {
      grid-template-columns: 1fr;
      gap: 32px;
    }
    .champ-about-sticky {
      position: static;
    }
    .champ-about-text p {
      font-size: 15px;
    }
  }
</style>
