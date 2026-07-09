<script lang="ts">
  import { motionStagger } from '$lib/actions/motion';
  const features = [
    {
      img: '/images/championship/technology.png',
      span: 'col-span-1 row-span-1',
      title: 'Technology',
      body: 'Using technology creatively and responsibly to solve problems and expand learning.'
    },
    {
      img: '/images/championship/enterprise.png',
      span: 'col-span-1 row-span-1',
      title: 'Enterprise',
      body: 'Developing initiative, innovation, entrepreneurship, and practical problem-solving skills.'
    },
    {
      img: '/images/championship/art.png',
      span: 'col-span-1 row-span-1',
      title: 'Art',
      body: 'Encouraging creativity, imagination, communication, and design thinking.'
    },
    {
      img: '/images/championship/mentorship.png',
      span: 'col-span-1 row-span-1',
      title: 'Mentorship',
      body: 'Learning from experienced professionals, educators, and inspiring role models.'
    },
    {
      img: '/images/championship/upskill.png',
      span: 'col-span-1 row-span-1',
      title: 'Upskill',
      body: 'Building leadership, teamwork, communication, academic and intellectual growth, and other essential life skills for the future.'
    }
  ];
</script>

<section id="features" class="section-soft" use:motionStagger>
  <div class="container" style="padding: 120px 0;">
    <div class="champ-features-header">
      <h2 class="champ-features-title">The TEAMUP™ Development Programme</h2>
      <p class="champ-features-sub">The heart of the BEEE experience is the TEAMUP™ Development Programme. Throughout the summer holiday period, participants engage in structured online learning, challenges, mentorship, and developmental activities before progressing to preliminary live chess matches that will culminate in an immersive live championship experience.</p>
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
    font-family: var(--font-display);
    font-size: clamp(2rem, 3.5vw, 3rem);
    font-weight: 500;
    line-height: 1.15;
    letter-spacing: -0.01em;
    color: var(--ink);
    margin: 0;
  }

  .champ-features-sub {
    font-family: var(--font-display);
    font-size: 22px;
    line-height: 1.35;
    color: var(--body);
    margin: 16px 0 0;
  }

  .champ-bento {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-auto-flow: dense;
    gap: 20px;
  }

  .champ-bento-card {
    position: relative;
    min-height: 340px;
    border-radius: 16px;
    overflow: hidden;
    background-color: var(--surface-card);
    transition: transform 400ms ease;
  }

  .champ-bento-img {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
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
    background: rgba(0,0,0,0.15);
    transition: background 400ms ease;
  }

  .champ-bento-card:hover .champ-bento-overlay {
    background: rgba(0,0,0,0.1);
  }

  .champ-bento-content {
    position: absolute;
    inset: 0;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    padding: 36px;
    color: var(--on-dark);
    background: linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 50%);
  }

  .champ-bento-card-title {
    margin: 0;
    font-family: var(--font-display);
    font-size: 20px;
    font-weight: 500;
    line-height: 1.3;
    letter-spacing: -0.01em;
    color: #fff;
    text-shadow: 0 2px 12px rgba(0,0,0,0.4);
  }

  .champ-bento-card-body {
    margin: 8px 0 0;
    font-size: 15px;
    line-height: 1.5;
    color: #fff;
    max-width: 440px;
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
      min-height: 260px;
    }
    .champ-bento-content {
      padding: 28px;
    }
  }
</style>
