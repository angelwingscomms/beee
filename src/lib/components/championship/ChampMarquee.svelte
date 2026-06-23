<script lang="ts">
  import { motionFadeUp } from '$lib/actions/motion';

  const items = [
    'Think', 'Compete', 'Develop', 'Excel',
    'Strategize', 'Lead', 'Innovate', 'Grow',
    'Focus', 'Achieve'
  ];
</script>

<section class="section-dark" use:motionFadeUp>
  <div style="position: relative; z-index: 1; padding: 96px 0;">
    <div class="container">
      <div class="champ-marquee-header">
        <h2 class="champ-marquee-title">Our Vision</h2>
        <p class="champ-marquee-body">
          To develop a generation of strategic thinkers, innovators, leaders, and problem-solvers
          who can apply the lessons of chess to academics, leadership, entrepreneurship, and life.
        </p>
      </div>
    </div>
    <div class="champ-marquee-track">
      <div class="champ-marquee-scroll">
        {#each [...Array(3)] as _}
          {#each items as item}
            <span class="champ-marquee-item">{item}</span>
            <span class="champ-marquee-dot">&bull;</span>
          {/each}
        {/each}
      </div>
    </div>
  </div>
</section>

<style>
  .champ-marquee-header {
    max-width: 640px;
    margin-bottom: 64px;
  }

  .champ-marquee-title {
    font-family: var(--font-display);
    font-size: clamp(1.8rem, 3vw, 2.5rem);
    font-weight: 500;
    line-height: 1.15;
    letter-spacing: -0.01em;
    color: var(--on-dark);
    margin: 0;
  }

  .champ-marquee-body {
    font-size: 17px;
    line-height: 1.6;
    color: var(--on-dark-soft);
    margin: 16px 0 0;
  }

  .champ-marquee-track {
    overflow: hidden;
    mask-image: linear-gradient(90deg, transparent 0%, black 5%, black 95%, transparent 100%);
    -webkit-mask-image: linear-gradient(90deg, transparent 0%, black 5%, black 95%, transparent 100%);
  }

  .champ-marquee-scroll {
    display: flex;
    align-items: center;
    gap: 0;
    width: fit-content;
    animation: champ-scroll 28s linear infinite;
  }

  .champ-marquee-item {
    font-family: var(--font-display);
    font-size: clamp(2.5rem, 5vw, 4rem);
    font-weight: 500;
    color: var(--on-dark);
    white-space: nowrap;
    letter-spacing: 0.02em;
    padding: 0 24px;
  }

  .champ-marquee-dot {
    font-size: clamp(1.5rem, 3vw, 2.5rem);
    color: var(--primary);
    opacity: 0.4;
    padding: 0 8px;
  }

  @keyframes champ-scroll {
    0% { transform: translateX(0); }
    100% { transform: translateX(-50%); }
  }
</style>
