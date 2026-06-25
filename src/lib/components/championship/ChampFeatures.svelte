<script lang="ts">
  import { motionStagger } from '$lib/actions/motion';

  const items = [
    {
      title: 'Chess & Personal Development',
      body: 'Competitive chess with structured mentorship. Every match teaches resilience, patience, and strategic thinking that extends far beyond the board.'
    },
    {
      title: 'Structured Mentorship',
      body: 'Experienced mentors translate chess strategies into real-life skills — leadership, decision-making, and emotional intelligence — through the T.E.A.M.U.P. curriculum.'
    },
    {
      title: 'Development Passport',
      body: 'A digital passport tracks every milestone, certificate, and badge earned. Parents follow progress in real time with transparent, detailed reporting.'
    },
    {
      title: 'Achievement Badges & Awards',
      body: 'Earn badges, certificates, and trophies as you progress through each stage. Recognition at every level keeps motivation high and growth visible.'
    },
    {
      title: 'Parent Engagement & Visibility',
      body: 'Real-time progress dashboards, event updates, and a front-row seat to your child\'s developmental journey — from first move to championship finale.'
    }
  ];
</script>

<section id="features" class="champ-features">
  <div class="container">
    <div class="champ-features-header">
      <h2 class="champ-features-title">What Makes BEEE Different?</h2>
      <p class="champ-features-sub">Most championships end with a trophy. BEEE begins with a journey across five pillars of growth.</p>
    </div>
  </div>

  <div class="champ-features-list" use:motionStagger>
    {#each items as item, i}
      <div class="champ-features-item">
        <div class="container champ-features-item-inner" class:reverse={i % 2 === 1}>
          <div class="champ-features-item-text">
            <span class="champ-features-item-num">{('0' + (i + 1)).slice(-2)}</span>
            <h3 class="champ-features-item-title">{item.title}</h3>
            <p class="champ-features-item-body">{item.body}</p>
          </div>
          <div class="champ-features-item-visual">
            <div class="champ-features-item-img" style="background-image: url('/images/championship/bento_{['chess','mentor','passport','award','family'][i]}.png')"></div>
          </div>
        </div>
      </div>
    {/each}
  </div>
</section>

<style>
  .champ-features {
    padding: 120px 0;
    background: var(--canvas);
  }

  .champ-features-header {
    max-width: 640px;
    margin-bottom: 80px;
  }

  .champ-features-title {
    margin: 0;
    font-family: var(--font-display);
    font-size: clamp(1.8rem, 3vw, 2.5rem);
    font-weight: 500;
    line-height: 1.15;
    letter-spacing: -0.01em;
    color: var(--ink);
  }

  .champ-features-sub {
    margin: 14px 0 0;
    font-size: 17px;
    line-height: 1.6;
    color: var(--body);
    max-width: 520px;
  }

  .champ-features-list {
    display: grid;
    gap: 0;
  }

  .champ-features-item {
    padding: 80px 0;
    border-bottom: 1px solid var(--hairline-soft);
  }

  .champ-features-item:last-child {
    border-bottom: none;
  }

  .champ-features-item-inner {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 64px;
    align-items: center;
  }

  .champ-features-item-inner.reverse .champ-features-item-text {
    order: 2;
  }

  .champ-features-item-inner.reverse .champ-features-item-visual {
    order: 1;
  }

  .champ-features-item-text {
    max-width: 480px;
  }

  .champ-features-item-num {
    font-family: var(--font-display);
    font-size: 13px;
    font-weight: 500;
    color: var(--muted-soft);
    letter-spacing: 0.06em;
    display: block;
    margin-bottom: 16px;
  }

  .champ-features-item-title {
    margin: 0;
    font-family: var(--font-display);
    font-size: 26px;
    font-weight: 500;
    line-height: 1.2;
    letter-spacing: -0.01em;
    color: var(--ink);
  }

  .champ-features-item-body {
    margin: 16px 0 0;
    font-size: 15px;
    line-height: 1.65;
    color: var(--body);
  }

  .champ-features-item-visual {
    position: relative;
    border-radius: 16px;
    overflow: hidden;
    aspect-ratio: 16 / 10;
    background: var(--surface-card);
    box-shadow: 0 8px 32px rgba(24, 23, 21, 0.06);
    transition: transform 500ms ease, box-shadow 500ms ease;
  }

  .champ-features-item:hover .champ-features-item-visual {
    transform: scale(1.015);
    box-shadow: 0 16px 48px rgba(242, 120, 48, 0.08);
  }

  .champ-features-item-img {
    width: 100%;
    height: 100%;
    background-size: cover;
    background-position: center;
    filter: saturate(1.02) contrast(1.05);
    transition: transform 700ms ease;
  }

  .champ-features-item:hover .champ-features-item-img {
    transform: scale(1.05);
  }

  @media (max-width: 767px) {
    .champ-features {
      padding: 80px 0;
    }
    .champ-features-header {
      margin-bottom: 48px;
    }
    .champ-features-item {
      padding: 48px 0;
    }
    .champ-features-item-inner {
      grid-template-columns: 1fr;
      gap: 28px;
    }
    .champ-features-item-inner.reverse .champ-features-item-text {
      order: 1;
    }
    .champ-features-item-inner.reverse .champ-features-item-visual {
      order: 2;
    }
    .champ-features-item-text {
      max-width: none;
    }
    .champ-features-item-title {
      font-size: 22px;
    }
  }
</style>
