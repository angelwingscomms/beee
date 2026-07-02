<script lang="ts">
  import { motionStagger } from '$lib/actions/motion';

  const cards = [
    {
      href: '/about',
      img: '/images/championship/about-new.png',
      title: 'About BEEE',
      body: 'Chess is only the beginning. Competitive play combined with mentorship, leadership training, and personal development — building skills that outlast any tournament.',
      span: 'col-span-1 row-span-1'
    },
    {
      href: '/teamup',
      img: '/images/championship/technology.png',
      title: 'The TEAMUP Programme',
      body: 'Five pillars — Technology, Enterprise, Art, Mentorship, and Upskill — that turn young players into strategic thinkers, creators, and leaders.',
      span: 'col-span-1 row-span-2'
    },
    {
      href: '/how-it-works',
      img: '/images/championship/bento_chess.png',
      title: 'The Championship Journey',
      body: 'From registration to the Grand Finale. Five stages of learning, growth, and competition that shape how young minds approach problems.',
      span: 'col-span-1 row-span-1'
    },
    {
      href: '/register',
      img: '/images/championship/bento_award.png',
      title: 'Register Now',
      body: 'Join through your participating school. Early registration unlocks more activities, more passport points, and a fuller development experience.',
      span: 'col-span-1 row-span-1'
    }
  ];
</script>

<section class="section-soft" use:motionStagger>
  <div class="container" style="padding: 120px 0;">
    <div class="preview-header">
      <h2 class="preview-title">Explore the Programme</h2>
      <p class="preview-sub">Everything you need to know about the BEEE Spectacular Chess Championship.</p>
    </div>
    <div class="preview-bento">
      {#each cards as card, i}
        <a href={card.href} class="preview-card {card.span}">
          <img src={card.img} alt="" class="preview-card-img" />
          <div class="preview-card-overlay"></div>
          <div class="preview-card-content">
            <h3 class="preview-card-title">{card.title}</h3>
            <p class="preview-card-body">{card.body}</p>
            <span class="preview-card-arrow">&rarr;</span>
          </div>
        </a>
      {/each}
    </div>
  </div>
</section>

<style>
  .preview-header {
    max-width: 640px;
    margin-bottom: 48px;
  }

  .preview-title {
    font-family: var(--font-display);
    font-size: clamp(1.8rem, 3vw, 2.5rem);
    font-weight: 500;
    line-height: 1.15;
    letter-spacing: -0.01em;
    color: var(--ink);
    margin: 0;
  }

  .preview-sub {
    font-family: var(--font-display);
    font-size: 20px;
    line-height: 1.3;
    color: var(--body);
    margin: 12px 0 0;
  }

  .preview-bento {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-auto-rows: 280px;
    gap: 20px;
  }

  .preview-card {
    position: relative;
    border-radius: 16px;
    overflow: hidden;
    background-color: var(--surface-card);
    text-decoration: none;
    transition: transform 400ms ease;
    display: block;
  }

  .preview-card:hover {
    transform: scale(1.02);
  }

  .preview-card-img {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .preview-card-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.2) 60%, transparent 100%);
    transition: background 400ms ease;
  }

  .preview-card:hover .preview-card-overlay {
    background: linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.15) 60%, transparent 100%);
  }

  .preview-card-content {
    position: absolute;
    inset: 0;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    padding: 32px;
    color: var(--on-dark);
  }

  .preview-card-title {
    margin: 0;
    font-family: var(--font-display);
    font-size: 24px;
    font-weight: 500;
    line-height: 1.2;
    letter-spacing: -0.01em;
    color: #fff;
  }

  .preview-card-body {
    margin: 6px 0 0;
    font-size: 13px;
    line-height: 1.5;
    color: rgba(255, 255, 255, 0.8);
    max-width: 440px;
  }

  .preview-card-arrow {
    margin-top: 12px;
    font-size: 20px;
    line-height: 1;
    color: rgba(255, 255, 255, 0.6);
    transition: transform 300ms ease, color 300ms ease;
  }

  .preview-card:hover .preview-card-arrow {
    transform: translateX(6px);
    color: #fff;
  }

  .preview-card.col-span-2 {
    grid-column: span 2 / span 2;
  }

  .preview-card.row-span-2 {
    grid-row: span 2 / span 2;
  }

  @media (max-width: 1024px) {
    .preview-bento {
      grid-template-columns: repeat(2, 1fr);
    }
    .preview-card.col-span-2,
    .preview-card.row-span-2 {
      grid-column: span 2;
      grid-row: span 1;
    }
  }

  @media (max-width: 767px) {
    .preview-bento {
      grid-template-columns: 1fr;
      grid-auto-rows: 240px;
    }
    .preview-card.col-span-2,
    .preview-card.row-span-2 {
      grid-column: span 1;
    }
    .preview-card-content {
      padding: 24px;
    }
    .preview-card-title {
      font-size: 20px;
    }
  }
</style>
