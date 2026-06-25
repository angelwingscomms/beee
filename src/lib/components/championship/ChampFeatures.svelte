<script lang="ts">
  import { motionStagger } from '$lib/actions/motion';

  const features = [
    {
      img: '/images/championship/bento_chess.png',
      span: 'col-span-2 row-span-1',
      title: 'Chess & Personal Development',
      body: 'Competitive chess with structured mentorship. Every match teaches resilience, patience, and strategic thinking that extends far beyond the board.'
    },
    {
      img: '/images/championship/bento_mentor.png',
      span: 'col-span-1 row-span-1',
      title: 'Structured Mentorship',
      body: 'Experienced mentors translate chess strategies into real-life skills — leadership, decision-making, and emotional intelligence — through the T.E.A.M.U.P. curriculum.'
    },
    {
      img: '/images/championship/bento_passport.png',
      span: 'col-span-1 row-span-1',
      title: 'Development Passport',
      body: 'A digital passport tracks every milestone, certificate, and badge earned. Parents follow progress in real time with transparent, detailed reporting.'
    },
    {
      img: '/images/championship/bento_award.png',
      span: 'col-span-2 row-span-1',
      title: 'Achievement Badges & Awards',
      body: 'Earn badges, certificates, scholarships, and trophies through each stage. Recognition at every level keeps motivation high and growth visible.'
    },
    {
      img: '/images/championship/bento_family.png',
      span: 'col-span-3 row-span-1',
      title: 'Parent Engagement & Visibility',
      body: 'Real-time progress dashboards, event updates, and a front-row seat to your child\'s developmental journey — from first move to championship finale.'
    }
  ];

  let loaded = $state<Set<number>>(new Set());
  function on_img_load(i: number) {
    loaded.add(i);
    loaded = new Set(loaded);
  }
  function img_style(i: number) {
    const f = features[i];
    return `background-image: url(${f.img}); opacity: ${loaded.has(i) ? 1 : 0}; transition: opacity 300ms ease;`;
  }
</script>

<section id="features" class="section-soft" use:motionStagger>
  <div class="container" style="padding: 120px 0;">
    <div class="champ-features-header">
      <h2 class="champ-features-title">What Makes BEEE Different?</h2>
      <p class="champ-features-sub">Most championships end with a trophy. BEEE begins with a journey across five pillars of growth.</p>
    </div>
    <div class="champ-bento">
      {#each features as feat, i}
        <!-- svelte-ignore a11y_click_events_have_key_events -->
        <div class="champ-bento-card {feat.span}" style={img_style(i)}>
          <img src={feat.img} alt="" class="champ-bento-hidden" onload={() => on_img_load(i)} />
          <div class="champ-bento-overlay"></div>
          <div class="champ-bento-content">
            <h3 class="champ-bento-card-title">{feat.title}</h3>
            <p class="champ-bento-card-body">{feat.body}</p>
          </div>
        </div>
      {/each}
    </div>
  </div>
</section>

<style>
  .champ-features-header {
    max-width: 640px;
    margin-bottom: 48px;
  }

  .champ-features-title {
    font-family: var(--font-display);
    font-size: clamp(1.8rem, 3vw, 2.5rem);
    font-weight: 500;
    line-height: 1.15;
    letter-spacing: -0.01em;
    color: var(--ink);
    margin: 0;
  }

  .champ-features-sub {
    font-family: var(--font-display);
    font-size: 20px;
    line-height: 1.3;
    color: var(--body);
    margin: 12px 0 0;
  }

  .champ-bento {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-auto-flow: dense;
    gap: 20px;
  }

  .champ-bento-card {
    position: relative;
    min-height: 280px;
    border-radius: 16px;
    overflow: hidden;
    background-size: cover;
    background-position: center;
    background-color: var(--surface-card);
    transition: transform 400ms ease;
  }

  .champ-bento-hidden {
    position: absolute;
    width: 1px;
    height: 1px;
    opacity: 0;
    pointer-events: none;
  }

  .champ-bento-card:hover {
    transform: scale(1.02);
  }

  .champ-bento-card.col-span-2 {
    grid-column: span 2 / span 2;
  }

  .champ-bento-card.col-span-3 {
    grid-column: span 3 / span 3;
  }

  .champ-bento-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(180deg, rgba(24, 23, 21, 0.15) 0%, rgba(24, 23, 21, 0.82) 100%);
    transition: background 400ms ease;
  }

  .champ-bento-card:hover .champ-bento-overlay {
    background: linear-gradient(180deg, rgba(24, 23, 21, 0.1) 0%, rgba(24, 23, 21, 0.72) 100%);
  }

  .champ-bento-content {
    position: absolute;
    inset: 0;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    padding: 32px;
    color: var(--on-dark);
  }

  .champ-bento-card-title {
    margin: 0;
    font-family: var(--font-display);
    font-size: 22px;
    font-weight: 500;
    line-height: 1.2;
    letter-spacing: -0.01em;
  }

  .champ-bento-card-body {
    margin: 10px 0 0;
    font-size: 14px;
    line-height: 1.55;
    color: rgba(250, 249, 245, 0.78);
    max-width: 440px;
  }

  @media (max-width: 767px) {
    .champ-bento {
      grid-template-columns: 1fr;
    }
    .champ-bento-card.col-span-2,
    .champ-bento-card.col-span-3 {
      grid-column: span 1 / span 1;
    }
    .champ-bento-card {
      min-height: 220px;
    }
    .champ-bento-content {
      padding: 24px;
    }
  }
</style>
