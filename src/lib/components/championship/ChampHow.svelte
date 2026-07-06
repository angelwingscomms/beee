<script lang="ts">
  import { motionFadeUp } from '$lib/actions/motion';

  const stages = [
    {
      num: 1,
      title: 'REGISTER',
      body: 'Join through your school and receive access to the T.E.A.M.U.P.™ Development Programme.',
      img: '/images/championship/bento_chess.png',
      color: '#1E40AF',
      colorLight: '#3B82F6',
      iconPath: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4',
    },
    {
      num: 2,
      title: 'LEARN',
      body: 'Complete online activities, chess training, mentorship sessions, challenges, and project-based assignments.',
      img: '/images/championship/technology.png',
      color: '#7C3AED',
      colorLight: '#8B5CF6',
      iconPath: 'M12 14l9-5-9-5-9 5 9 5z M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z',
    },
    {
      num: 3,
      title: 'COMPETE',
      body: 'Take part in exciting live preliminary rounds and qualifying competitions.',
      img: '/images/championship/compete.png',
      color: '#B91C1C',
      colorLight: '#DC2626',
      iconPath: 'M12 2L9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2z',
    },
    {
      num: 4,
      title: 'DEVELOP',
      body: 'Advance through higher levels of competition while strengthening leadership, teamwork, communication, and strategic thinking.',
      img: '/images/championship/mentorship.png',
      color: '#15803D',
      colorLight: '#22C55E',
      iconPath: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z',
    },
    {
      num: 5,
      title: 'QUALIFY',
      body: 'Earn your place among the finalists through consistent performance and development.',
      img: '/images/championship/art.png',
      color: '#CA8A04',
      colorLight: '#EAB308',
      iconPath: 'M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z',
    },
    {
      num: 6,
      title: 'GRAND FINALE',
      body: 'Experience a spectacular championship finale where preparation, teamwork, and strategy come together in a unique and unforgettable competition.',
      img: '/images/championship/cta-bg.png',
      color: '#1A2744',
      colorLight: '#2D4A7A',
      iconPath: 'M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z',
    },
  ];
</script>

<section class="champ-how" use:motionFadeUp>
  <div class="champ-how-bg">
    <img src="/images/championship/about-bg.png" alt="" class="champ-how-bg-img" />
  </div>
  <div class="champ-how-inner">
    <header class="champ-how-header">
      <h1 class="champ-how-title">Your <span class="gold">Championship Journey</span></h1>
      <p class="champ-how-sub">Every Great Journey Begins with a Single Move.</p>
    </header>

    {#each stages as stage, i}
      <div class="stage-band" style="--sc: {stage.color}; --sc-light: {stage.colorLight};">
        {#if i % 2 === 0}
          <div class="stage-img">
            <img src={stage.img} alt="" />
          </div>
          <div class="stage-card">
            <div class="stage-badge" style="background: {stage.color};">
              <svg class="stage-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                <path d={stage.iconPath} />
              </svg>
            </div>
            <div class="stage-text">
              <p class="stage-label" style="color: {stage.color};">STAGE</p>
              <div class="stage-title-row">
                <span class="stage-num" style="color: {stage.color};">{stage.num}</span>
                <span class="stage-title" style="color: {stage.color};">– {stage.title}</span>
              </div>
              <p class="stage-body">{stage.body}</p>
            </div>
          </div>
        {:else}
          <div class="stage-card">
            <div class="stage-badge" style="background: {stage.color};">
              <svg class="stage-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                <path d={stage.iconPath} />
              </svg>
            </div>
            <div class="stage-text">
              <p class="stage-label" style="color: {stage.color};">STAGE</p>
              <div class="stage-title-row">
                <span class="stage-num" style="color: {stage.color};">{stage.num}</span>
                <span class="stage-title" style="color: {stage.color};">– {stage.title}</span>
              </div>
              <p class="stage-body">{stage.body}</p>
            </div>
          </div>
          <div class="stage-img">
            <img src={stage.img} alt="" />
          </div>
        {/if}
      </div>
      {#if i < stages.length - 1}
        <div class="chevron">
          <svg viewBox="0 0 24 24" fill="none" stroke="#3B82F6" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="M6 9l6 6 6-6" />
          </svg>
        </div>
      {/if}
    {/each}

    <footer class="champ-how-cta">
      <p class="cta-main">MAKE YOUR <span class="gold">MOVE.</span></p>
      <p class="cta-motto">ASPIRE TO <span class="gold">BEEE</span></p>
      <p class="cta-sub">BE EVERYTHING EXCELLENT EVERY DAY</p>
    </footer>
  </div>
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

  .champ-how-inner {
    position: relative;
    z-index: 1;
    max-width: 860px;
    margin: 0 auto;
    padding: 120px 24px 64px;
  }

  .champ-how-header {
    text-align: center;
    margin-bottom: 56px;
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

  /* Stage band */
  .stage-band {
    display: grid;
    grid-template-columns: 1fr 1fr;
    border-radius: 16px;
    overflow: hidden;
    background: var(--sc);
  }

  .stage-img {
    position: relative;
    overflow: hidden;
    min-height: 220px;
  }

  .stage-img img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .stage-card {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 36px 40px;
    background: #fff;
    position: relative;
  }

  .stage-badge {
    width: 56px;
    height: 56px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 16px;
    background: var(--sc);
    flex-shrink: 0;
  }

  .stage-icon {
    width: 28px;
    height: 28px;
    color: #fff;
  }

  .stage-text {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .stage-label {
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    margin: 0;
    color: var(--sc);
  }

  .stage-title-row {
    display: flex;
    align-items: baseline;
    gap: 8px;
    margin-bottom: 8px;
  }

  .stage-num {
    font-family: var(--font-display);
    font-size: 40px;
    font-weight: 800;
    line-height: 1;
    color: var(--sc);
  }

  .stage-title {
    font-family: var(--font-display);
    font-size: 22px;
    font-weight: 700;
    line-height: 1.2;
    color: var(--sc);
  }

  .stage-body {
    margin: 0;
    font-size: 14px;
    line-height: 1.6;
    color: #4B5563;
  }

  /* Chevron */
  .chevron {
    display: flex;
    justify-content: center;
    padding: 8px 0;
  }

  .chevron svg {
    width: 28px;
    height: 28px;
  }

  /* CTA */
  .champ-how-cta {
    text-align: center;
    margin-top: 48px;
    padding-top: 40px;
    border-top: 1px solid rgba(255,255,255,0.1);
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
    .champ-how-inner {
      padding: 48px 16px 40px;
    }

    .champ-how-header {
      margin-bottom: 36px;
    }

    .stage-band {
      grid-template-columns: 1fr;
      grid-template-rows: 180px auto;
    }

    .stage-img {
      min-height: 180px;
    }

    .stage-card {
      padding: 28px 24px;
    }

    .stage-badge {
      width: 48px;
      height: 48px;
    }

    .stage-icon {
      width: 24px;
      height: 24px;
    }

    .stage-num {
      font-size: 32px;
    }

    .stage-title {
      font-size: 18px;
    }

    .chevron svg {
      width: 24px;
      height: 24px;
    }
  }
</style>
