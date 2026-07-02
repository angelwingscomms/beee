<script lang="ts">
  import { motionFadeUp } from '$lib/actions/motion';

  const stages = [
    {
      num: '1',
      title: 'REGISTER',
      body: 'Join through your school and receive access to the T.E.A.M.U.P. Development Programme.',
      icon: '📋',
      color: '#1e3a5f',
      img: '/images/championship/bento_chess.png'
    },
    {
      num: '2',
      title: 'LEARN',
      body: 'Complete online activities, chess training, mentorship sessions, challenges, and project-based assignments.',
      icon: '📚',
      color: '#5b2d8e',
      img: '/images/championship/technology.png'
    },
    {
      num: '3',
      title: 'COMPETE',
      body: 'Take part in exciting live preliminary rounds and qualifying competitions.',
      icon: '♟️',
      color: '#c45a2b',
      img: '/images/championship/enterprise.png'
    },
    {
      num: '4',
      title: 'DEVELOP',
      body: 'Advance through higher levels of competition while strengthening leadership, teamwork, communication, and strategic thinking.',
      icon: '👥',
      color: '#2d7a4f',
      img: '/images/championship/mentorship.png'
    },
    {
      num: '5',
      title: 'QUALIFY',
      body: 'Earn your place among the finalists through consistent performance and development.',
      icon: '🏆',
      color: '#b8860b',
      img: '/images/championship/art.png'
    },
    {
      num: '6',
      title: 'GRAND FINALE',
      body: 'Experience a spectacular championship finale where preparation, teamwork, and strategy come together in a unique and unforgettable competition.',
      icon: '👑',
      color: '#1a1a2e',
      img: '/images/championship/cta-bg.png'
    }
  ];
</script>

<section class="champ-how" use:motionFadeUp>
  <div class="champ-how-bg"></div>
  <div class="container" style="padding: 120px 0;">
    <div class="champ-how-header">
      <p class="champ-how-eyebrow">BEEE</p>
      <h2 class="champ-how-title">Your Championship Journey</h2>
      <p class="champ-how-sub">Every Great Journey Begins with a Single Move.</p>
    </div>

    <div class="champ-how-timeline">
      {#each stages as stage, i}
        <div class="champ-how-stage" style="--stage-color: {stage.color}; --i: {i}">
          <div class="champ-how-stage-img-wrap">
            <img src={stage.img} alt="" class="champ-how-stage-img" />
            <div class="champ-how-stage-img-overlay" style="background: linear-gradient(135deg, {stage.color}ee, {stage.color}88)"></div>
            <div class="champ-how-stage-badge">
              <span class="champ-how-stage-icon">{stage.icon}</span>
            </div>
          </div>

          <div class="champ-how-stage-content">
            <div class="champ-how-stage-header">
              <span class="champ-how-stage-label">STAGE</span>
              <span class="champ-how-stage-num">{stage.num}</span>
              <span class="champ-how-stage-dash">—</span>
              <span class="champ-how-stage-title">{stage.title}</span>
            </div>
            <p class="champ-how-stage-body">{stage.body}</p>
          </div>

          {#if i < stages.length - 1}
            <div class="champ-how-arrow">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M12 4L12 20M12 20L6 14M12 20L18 14" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
          {/if}
        </div>
      {/each}
    </div>
  </div>
</section>

<style>
  .champ-how {
    position: relative;
    background: var(--surface-dark);
    overflow: hidden;
  }

  .champ-how-bg {
    position: absolute;
    inset: 0;
    background: linear-gradient(180deg, #0a1628 0%, #1a1a2e 50%, #0d1117 100%);
    opacity: 1;
  }

  .champ-how-header {
    position: relative;
    text-align: center;
    margin-bottom: 80px;
  }

  .champ-how-eyebrow {
    margin: 0 0 16px;
    font-family: var(--font-championship);
    font-size: clamp(0.875rem, 1.6vw, 1.25rem);
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--primary);
  }

  .champ-how-title {
    margin: 0 auto;
    font-family: var(--font-championship);
    font-size: clamp(2.8rem, 4vw, 4.5rem);
    font-weight: 700;
    line-height: 1.1;
    letter-spacing: -0.02em;
    color: var(--on-dark);
    text-shadow: 0 2px 8px rgba(0,0,0,0.3);
  }

  .champ-how-sub {
    margin: 20px auto 0;
    font-family: var(--font-body);
    font-size: 18px;
    line-height: 1.5;
    color: rgba(250, 249, 245, 0.7);
  }

  .champ-how-timeline {
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 0;
  }

  .champ-how-stage {
    position: relative;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 40px;
    align-items: center;
    padding: 20px 0;
  }

  .champ-how-stage:nth-child(odd) {
    direction: ltr;
  }

  .champ-how-stage:nth-child(even) {
    direction: rtl;
  }

  .champ-how-stage:nth-child(even) .champ-how-stage-content {
    direction: ltr;
  }

  .champ-how-stage:nth-child(even) .champ-how-stage-img-wrap {
    direction: ltr;
  }

  .champ-how-stage-img-wrap {
    position: relative;
    border-radius: 16px;
    overflow: hidden;
    aspect-ratio: 16/10;
    box-shadow: 0 8px 32px rgba(0,0,0,0.3);
    animation: stage-enter 0.6s ease-out both;
    animation-delay: calc(var(--i, 0) * 0.12s);
  }

  .champ-how-stage-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .champ-how-stage-img-overlay {
    position: absolute;
    inset: 0;
    opacity: 0.3;
    mix-blend-mode: multiply;
  }

  .champ-how-stage-badge {
    position: absolute;
    top: 16px;
    left: 16px;
    width: 48px;
    height: 48px;
    border-radius: 12px;
    background: var(--stage-color);
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 4px 12px rgba(0,0,0,0.2);
  }

  .champ-how-stage-icon {
    font-size: 24px;
    line-height: 1;
  }

  .champ-how-stage-content {
    padding: 20px;
    background: rgba(255,255,255,0.03);
    border: 1px solid rgba(255,255,255,0.06);
    border-radius: 16px;
    backdrop-filter: blur(8px);
    animation: stage-enter 0.6s ease-out both;
    animation-delay: calc(var(--i, 0) * 0.12s + 0.3s);
  }

  .champ-how-stage-header {
    display: flex;
    align-items: center;
    gap: 12px;
    flex-wrap: wrap;
  }

  .champ-how-stage-label {
    font-family: var(--font-championship);
    font-size: 13px;
    font-weight: 700;
    color: var(--primary);
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  .champ-how-stage-num {
    font-family: var(--font-championship);
    font-size: 28px;
    font-weight: 700;
    color: var(--on-dark);
    line-height: 1;
  }

  .champ-how-stage-dash {
    color: rgba(250, 249, 245, 0.4);
    font-size: 20px;
  }

  .champ-how-stage-title {
    font-family: var(--font-championship);
    font-size: 20px;
    font-weight: 700;
    color: var(--on-dark);
    letter-spacing: 0.02em;
  }

  .champ-how-stage-body {
    margin: 16px 0 0;
    font-size: 15px;
    line-height: 1.7;
    color: rgba(250, 249, 245, 0.75);
  }

  .champ-how-arrow {
    position: absolute;
    bottom: -12px;
    left: 50%;
    transform: translateX(-50%);
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background: var(--stage-color);
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    z-index: 2;
    box-shadow: 0 4px 12px rgba(0,0,0,0.3);
  }

  @keyframes stage-enter {
    from {
      opacity: 0;
      transform: translateY(24px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .champ-how-stage-img-wrap,
    .champ-how-stage-content {
      animation: none;
    }
  }

  @media (max-width: 767px) {
    .champ-how-stage {
      grid-template-columns: 1fr;
      gap: 20px;
    }

    .champ-how-stage:nth-child(even) {
      direction: ltr;
    }

    .champ-how-stage-content {
      padding: 16px;
    }

    .champ-how-stage-header {
      gap: 8px;
    }

    .champ-how-stage-num {
      font-size: 24px;
    }

    .champ-how-stage-title {
      font-size: 18px;
    }

    .champ-how-stage-body {
      font-size: 14px;
    }

    .champ-how-arrow {
      display: none;
    }
  }
</style>
