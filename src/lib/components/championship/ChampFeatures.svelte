<script lang="ts">
  import { motionStagger } from '$lib/actions/motion';
  const features = [
    {
      img: '/images/technology-card.png',
      span: 'col-span-2 row-span-1',
      title: 'Technology',
      body: 'Using technology creatively and responsibly to solve problems and expand learning.'
    },
    {
      img: '/images/enterprise.jpeg',
      span: 'col-span-1 row-span-1',
      title: 'Enterprise',
      body: 'Developing initiative, innovation and practical problem-solving skills.'
    },
    {
      img: '/images/championship/grandfinale.png',
      span: 'col-span-1 row-span-1',
      title: 'Art',
      body: 'Encouraging creativity, imagination, communication, and design thinking.'
    },
    {
      img: '/images/championship/develop.png',
      span: 'col-span-2 row-span-1',
      title: 'Mentorship',
      body: 'Learning from experienced professionals, educators, and inspiring role models.'
    },
    {
      img: '/images/championship/compete.png',
      span: 'col-span-3 row-span-1',
      title: 'Upskill',
      body: 'Building leadership, teamwork, communication, and other essential life skills for the future.'
    }
  ];
</script>

<section id="features" class="section-soft" use:motionStagger>
  <div class="container" style="padding: 120px 0;">
    <div class="champ-features-header">
      <h2 class="champ-features-title">The T.E.A.M.U.P.™ Development Programme</h2>
      <p class="champ-features-sub">A holistic approach to whole child development with a focus on Technology, Enterprise, Art, Mentorship and Upskilling.</p>
    </div>
    <div class="champ-bento">
      {#each features as feat, i}
        <!-- svelte-ignore a11y_click_events_have_key_events -->
        <div class="champ-bento-card {feat.span}">
          <img src={feat.img} alt="" class="champ-bento-img" />
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
    font-family: var(--font-hero);
    font-size: clamp(1.8rem, 3vw, 2.5rem);
    font-weight: 700;
    line-height: 1.15;
    letter-spacing: -0.01em;
    color: var(--ink);
    margin: 0;
  }

  .champ-features-sub {
    font-family: var(--font-display);
    font-style: italic;
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
    background-color: var(--surface-card);
  }

  .champ-bento-img {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  @media (prefers-reduced-motion: no-preference) {
    .champ-bento-img {
      transition: transform 600ms cubic-bezier(0.22, 1, 0.36, 1);
    }
    .champ-bento-card:hover .champ-bento-img {
      transform: scale(1.05);
    }
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
    background: linear-gradient(to top, rgba(10, 15, 26, 0.94) 0%, rgba(10, 15, 26, 0.40) 50%, transparent 72%);
    transition: background 400ms ease;
  }

  .champ-bento-card:hover .champ-bento-overlay {
    background: linear-gradient(to top, rgba(10, 15, 26, 0.85) 0%, rgba(10, 15, 26, 0.28) 45%, transparent 70%);
  }

  .champ-bento-content {
    position: absolute;
    inset: 0;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    padding: 36px;
    color: var(--on-dark);
  }

  .champ-bento-card-title {
    margin: 0;
    font-family: var(--font-hero);
    font-size: clamp(1.5rem, 2.2vw, 2.1rem);
    font-weight: 700;
    line-height: 1.15;
    letter-spacing: -0.01em;
    color: #fff;
    text-shadow: 0 2px 12px rgba(0,0,0,0.35);
  }

  .champ-bento-card-body {
    margin: 10px 0 0;
    font-size: clamp(1rem, 1.2vw, 1.125rem);
    line-height: 1.5;
    color: rgba(250, 249, 245, 0.92);
    max-width: 480px;
    text-shadow: 0 1px 8px rgba(0,0,0,0.3);
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
