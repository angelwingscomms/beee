<script lang="ts">
  import { onMount } from 'svelte';
  import gsap from 'gsap';
  import { ScrollTrigger } from 'gsap/ScrollTrigger';

  gsap.registerPlugin(ScrollTrigger);

  const stages = [
    {
      num: 1,
      title: 'REGISTER',
      body: 'Join through your school and receive access to the T.E.A.M.U.P.™ Development Programme.',
      img: '/images/championship/bento_chess.png',
      color: '#1E40AF',
      iconPath: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4',
    },
    {
      num: 2,
      title: 'LEARN',
      body: 'Complete online activities, chess training, mentorship sessions, challenges, and project-based assignments.',
      img: '/images/championship/technology.png',
      color: '#7C3AED',
      iconPath: 'M12 14l9-5-9-5-9 5 9 5z M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z',
    },
    {
      num: 3,
      title: 'COMPETE',
      body: 'Take part in exciting live preliminary rounds and qualifying competitions.',
      img: '/images/championship/compete.png',
      color: '#B91C1C',
      iconPath: 'M12 2L9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2z',
    },
    {
      num: 4,
      title: 'DEVELOP',
      body: 'Advance through higher levels of competition while strengthening leadership, teamwork, communication, and strategic thinking.',
      img: '/images/championship/mentorship.png',
      color: '#15803D',
      iconPath: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z',
    },
    {
      num: 5,
      title: 'QUALIFY',
      body: 'Earn your place among the finalists through consistent performance and development.',
      img: '/images/championship/art.png',
      color: '#CA8A04',
      iconPath: 'M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z',
    },
    {
      num: 6,
      title: 'GRAND FINALE',
      body: 'Experience a spectacular championship finale where preparation, teamwork, and strategy come together in a unique and unforgettable competition.',
      img: '/images/championship/cta-bg.png',
      color: '#1A2744',
      iconPath: 'M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z',
    },
  ];

  let scrollContainer: HTMLElement;
  let triggerEl: HTMLElement;

  onMount(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const panels = gsap.utils.toArray<HTMLElement>('.scroll-panel');
    if (!panels.length) return;

    panels.forEach((panel, i) => {
      if (i === 0) return;

      gsap.fromTo(
        panel,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: panel,
            scroller: scrollContainer,
            start: 'top 90%',
            end: 'top 40%',
            scrub: 0.5,
          },
        }
      );
    });

    ScrollTrigger.refresh();
  });
</script>

<section class="champ-how">
  <div class="champ-how-bg">
    <img src="/images/championship/about-bg.png" alt="" class="champ-how-bg-img" />
  </div>

  <header class="champ-how-header">
    <h1 class="champ-how-title">Your <span class="gold">Championship Journey</span></h1>
    <p class="champ-how-sub">Every Great Journey Begins with a Single Move.</p>
  </header>

  <div class="scrolly-wrapper">
    <div class="sticky-card" bind:this={triggerEl}>
      <div class="card-img">
        <img src={stages[0].img} alt="" class="card-img-el" />
      </div>
      <div class="card-content" style="--sc: {stages[0].color};">
        <div class="card-badge" style="background: {stages[0].color};">
          <svg class="card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
            <path d={stages[0].iconPath} />
          </svg>
        </div>
        <p class="card-label" style="color: {stages[0].color};">STAGE</p>
        <div class="card-title-row">
          <span class="card-num" style="color: {stages[0].color};">{stages[0].num}</span>
          <span class="card-title" style="color: {stages[0].color};">– {stages[0].title}</span>
        </div>
        <p class="card-body">{stages[0].body}</p>
      </div>
    </div>

    <div class="scroll-panels" bind:this={scrollContainer}>
      {#each stages as stage, i}
        <div class="scroll-panel" style="--sc: {stage.color};">
          <div class="panel-img">
            <img src={stage.img} alt="" />
          </div>
          <div class="panel-content">
            <div class="panel-badge" style="background: {stage.color};">
              <svg class="panel-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                <path d={stage.iconPath} />
              </svg>
            </div>
            <p class="panel-label" style="color: {stage.color};">STAGE</p>
            <div class="panel-title-row">
              <span class="panel-num" style="color: {stage.color};">{stage.num}</span>
              <span class="panel-title" style="color: {stage.color};">– {stage.title}</span>
            </div>
            <p class="panel-body">{stage.body}</p>
          </div>
        </div>
      {/each}
    </div>
  </div>

  <footer class="champ-how-cta">
    <p class="cta-main">MAKE YOUR <span class="gold">MOVE.</span></p>
    <p class="cta-motto">ASPIRE TO <span class="gold">BEEE</span></p>
    <p class="cta-sub">BE EVERYTHING EXCELLENT EVERY DAY</p>
  </footer>
</section>

<style>
  .champ-how {
    position: relative;
    background: #0A1628;
    overflow: hidden;
  }

  .champ-how-bg {
    position: absolute;
    inset: 0;
    z-index: 0;
  }

  .champ-how-bg-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: 0.06;
  }

  .champ-how-header {
    position: relative;
    z-index: 1;
    text-align: center;
    padding: 120px 24px 0;
  }

  .champ-how-title {
    font-family: var(--font-display);
    font-size: clamp(36px, 6vw, 56px);
    font-weight: 700;
    color: #fff;
    line-height: 1.1;
    letter-spacing: -0.02em;
    margin: 0;
  }

  .gold {
    color: var(--color-amber);
  }

  .champ-how-sub {
    margin: 16px 0 0;
    font-size: clamp(14px, 2vw, 18px);
    line-height: 1.5;
    color: rgba(255,255,255,0.6);
  }

  /* Scrolly */
  .scrolly-wrapper {
    position: relative;
    z-index: 1;
    max-width: 860px;
    margin: 0 auto;
    padding: 48px 24px 0;
  }

  .sticky-card {
    position: sticky;
    top: 48px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    border-radius: 16px;
    overflow: hidden;
    background: var(--sc);
    height: 420px;
  }

  .card-img {
    position: relative;
    overflow: hidden;
  }

  .card-img img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .card-content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 36px 40px;
    background: #fff;
  }

  .card-badge {
    width: 56px;
    height: 56px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 16px;
    flex-shrink: 0;
  }

  .card-icon {
    width: 28px;
    height: 28px;
    color: #fff;
  }

  .card-label {
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    margin: 0;
  }

  .card-title-row {
    display: flex;
    align-items: baseline;
    gap: 8px;
    margin-bottom: 8px;
  }

  .card-num {
    font-family: var(--font-display);
    font-size: 40px;
    font-weight: 800;
    line-height: 1;
  }

  .card-title {
    font-family: var(--font-display);
    font-size: 22px;
    font-weight: 700;
    line-height: 1.2;
  }

  .card-body {
    margin: 0;
    font-size: 14px;
    line-height: 1.6;
    color: #4B5563;
  }

  /* Scroll panels */
  .scroll-panels {
    position: relative;
    z-index: 2;
    pointer-events: none;
  }

  .scroll-panel {
    display: grid;
    grid-template-columns: 1fr 1fr;
    border-radius: 16px;
    overflow: hidden;
    background: var(--sc);
    height: 420px;
    margin-bottom: 0;
    opacity: 0;
    transform: translateY(60px);
  }

  .scroll-panel:first-child {
    opacity: 1;
    transform: translateY(0);
  }

  .panel-img {
    position: relative;
    overflow: hidden;
  }

  .panel-img img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .panel-content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 36px 40px;
    background: #fff;
  }

  .panel-badge {
    width: 56px;
    height: 56px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 16px;
    flex-shrink: 0;
  }

  .panel-icon {
    width: 28px;
    height: 28px;
    color: #fff;
  }

  .panel-label {
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    margin: 0;
  }

  .panel-title-row {
    display: flex;
    align-items: baseline;
    gap: 8px;
    margin-bottom: 8px;
  }

  .panel-num {
    font-family: var(--font-display);
    font-size: 40px;
    font-weight: 800;
    line-height: 1;
  }

  .panel-title {
    font-family: var(--font-display);
    font-size: 22px;
    font-weight: 700;
    line-height: 1.2;
  }

  .panel-body {
    margin: 0;
    font-size: 14px;
    line-height: 1.6;
    color: #4B5563;
  }

  /* CTA */
  .champ-how-cta {
    position: relative;
    z-index: 1;
    text-align: center;
    padding: 48px 24px 64px;
    margin-top: 0;
  }

  .cta-main {
    font-family: var(--font-display);
    font-size: clamp(28px, 5vw, 48px);
    font-weight: 800;
    color: #fff;
    letter-spacing: -0.01em;
    margin: 0 0 12px;
  }

  .cta-motto {
    font-family: var(--font-display);
    font-size: 14px;
    font-weight: 600;
    letter-spacing: 0.1em;
    color: rgba(255,255,255,0.5);
    margin: 0 0 4px;
  }

  .cta-sub {
    font-size: 11px;
    font-weight: 500;
    letter-spacing: 0.08em;
    color: rgba(255,255,255,0.35);
    margin: 0;
  }

  /* Mobile */
  @media (max-width: 767px) {
    .champ-how-header {
      padding: 72px 16px 0;
    }

    .scrolly-wrapper {
      padding: 32px 16px 0;
    }

    .sticky-card,
    .scroll-panel {
      grid-template-columns: 1fr;
      height: auto;
    }

    .card-img,
    .panel-img {
      height: 180px;
    }

    .card-content,
    .panel-content {
      padding: 28px 24px;
    }

    .card-badge,
    .panel-badge {
      width: 48px;
      height: 48px;
    }

    .card-icon,
    .panel-icon {
      width: 24px;
      height: 24px;
    }

    .card-num,
    .panel-num {
      font-size: 32px;
    }

    .card-title,
    .panel-title {
      font-size: 18px;
    }

    .champ-how-cta {
      padding: 32px 16px 48px;
    }
  }
</style>
