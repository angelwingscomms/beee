<script lang="ts">
  import { onMount } from 'svelte';
  import gsap from 'gsap';
  import { ScrollTrigger } from 'gsap/ScrollTrigger';
  import { revealLines, revealChildren } from '$lib/motion/reveal';
  import { glSection } from '$lib/gl/store';

  const STAGES = [
    { index: '01', title: 'Register', line: 'A place is reserved and every platform unlocks the same day.', date: 'NOW OPEN', image: '/images/rv/kid-board-01.webp', alt: 'A young player studying the board under a shaft of golden stadium light' },
    { index: '02', title: 'Train online', line: 'Daily coaching with e4 and TEAMUP workshops, from home.', date: 'JUL 28 – AUG 29', image: '/images/rv/hand-piece.webp', alt: "A child's hand placing a chess piece on the board" },
    { index: '03', title: 'Qualify live', line: 'Live preliminaries across Abuja. Performance decides who advances.', date: 'SEPTEMBER', image: '/images/rv/kid-board-02.webp', alt: 'Two young players mid-game in a stadium tunnel' },
    { index: '04', title: 'The elite stage', line: 'Elimination rounds, advanced coaching, finals seats decided.', date: 'SEP – OCT', image: '/images/rv/teamup-mentor.webp', alt: 'A mentor working through ideas with three young participants' },
    { index: '05', title: 'The Grand Finale', line: 'Staged, filmed and celebrated on the floor of the National Stadium.', date: 'OCTOBER', image: '/images/rv/hero-stadium.webp', alt: 'Empty national stadium at golden hour with a single chess table at the centre of the pitch' }
  ];

  let list: HTMLElement | undefined = $state();
  let rows: HTMLElement[] = $state([]);
  let activeIndex = $state(0);

  onMount(() => {
    rows.forEach((row, i) => {
      if (!row) return;
      ScrollTrigger.create({
        trigger: row,
        start: 'top 55%',
        end: 'bottom 55%',
        onToggle: (self) => {
          if (self.isActive) activeIndex = i;
        }
      });
    });
  });
</script>

<section id="journey" class="rv-field-cloud rv-section journey" use:glSection={'journey'}>
  <div class="rv-wrap">
    <p class="rv-micro journey-eyebrow">01–05 · THE ROAD TO OCTOBER</p>
    <h2 class="rv-d2" use:revealLines>The road to the stadium.</h2>

    <div class="rv-grid journey-body">
      <div class="journey-list" bind:this={list} use:revealChildren>
        {#each STAGES as stage, i (stage.index)}
          <div class="rv-row" class:active={activeIndex === i} bind:this={rows[i]}>
            <span class="rv-micro journey-index" style:color={activeIndex === i ? 'var(--beam)' : 'var(--muted)'}>{stage.index}</span>
            <div>
              <p class="rv-title">{stage.title}</p>
              <p class="rv-body">{stage.line}</p>
            </div>
            <span class="rv-micro journey-date">{stage.date}</span>
          </div>
        {/each}
      </div>

      <div class="journey-media">
        <div class="rv-frame journey-frame">
          {#each STAGES as stage, i (stage.index)}
            <img
              src={stage.image}
              alt={stage.alt}
              loading="lazy"
              decoding="async"
              class="journey-image"
              style:opacity={activeIndex === i ? 1 : 0}
            />
          {/each}
        </div>
      </div>
    </div>
  </div>
</section>

<style>
  .journey-eyebrow {
    color: var(--beam);
  }

  .journey-body {
    margin-top: var(--space-6);
  }

  .journey-list {
    grid-column: span 12;
  }

  .journey-media {
    display: none;
  }

  .journey-index {
    transition: color var(--dur-micro) var(--ease-out);
  }

  .journey-date {
    justify-self: end;
    color: var(--muted);
  }

  @media (--md-up) {
    .journey-list { grid-column: span 7; }
    .journey-media {
      display: block;
      grid-column: span 5;
      position: sticky;
      top: 15vh;
      height: 70vh;
    }
    .journey-frame {
      position: relative;
      width: 100%;
      height: 100%;
    }
    .journey-image {
      position: absolute;
      inset: 0;
      transition: opacity 600ms var(--ease-out);
    }
  }
</style>
