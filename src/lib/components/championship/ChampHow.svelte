<script lang="ts">
  import { motionFadeUp } from '$lib/actions/motion';

  const stages = [
    {
      num: '1',
      title: 'Register',
      body: 'Join through your school and receive access to the T.E.A.M.U.P. Development Programme.',
      icon: '📋',
      img: '/images/championship/bento_chess.png'
    },
    {
      num: '2',
      title: 'Learn',
      body: 'Complete online activities, chess training, mentorship sessions, challenges, and project-based assignments.',
      icon: '📚',
      img: '/images/championship/technology.png'
    },
    {
      num: '3',
      title: 'Compete',
      body: 'Take part in exciting live preliminary rounds and qualifying competitions.',
      icon: '♟️',
      img: '/images/championship/enterprise.png'
    },
    {
      num: '4',
      title: 'Develop',
      body: 'Advance through higher levels of competition while strengthening leadership, teamwork, communication, and strategic thinking.',
      icon: '👥',
      img: '/images/championship/mentorship.png'
    },
    {
      num: '5',
      title: 'Qualify',
      body: 'Earn your place among the finalists through consistent performance and development.',
      icon: '🏆',
      img: '/images/championship/art.png'
    },
    {
      num: '6',
      title: 'Grand Finale',
      body: 'Experience a spectacular championship finale where preparation, teamwork, and strategy come together in a unique and unforgettable competition.',
      icon: '👑',
      img: '/images/championship/cta-bg.png'
    }
  ];
</script>

<section class="champ-how" use:motionFadeUp>
  <div class="container" style="padding: 96px 0;">
    <div class="champ-how-header">
      <p class="eyebrow">THE JOURNEY</p>
      <h2 class="display-lg">Your Championship Journey</h2>
      <p class="champ-how-sub">Every Great Journey Begins with a Single Move.</p>
    </div>

    <div class="champ-how-timeline">
      {#each stages as stage, i}
        <div class="champ-how-stage">
          <div class="champ-how-stage-left">
            <div class="champ-how-stage-num">{stage.num}</div>
            <div class="champ-how-stage-line"></div>
          </div>

          <div class="champ-how-stage-card">
            <div class="champ-how-stage-img-wrap">
              <img src={stage.img} alt="" class="champ-how-stage-img" />
            </div>
            <div class="champ-how-stage-content">
              <div class="champ-how-stage-header">
                <span class="champ-how-stage-icon">{stage.icon}</span>
                <h3 class="champ-how-stage-title">{stage.title}</h3>
              </div>
              <p class="champ-how-stage-body">{stage.body}</p>
            </div>
          </div>
        </div>
      {/each}
    </div>
  </div>
</section>

<style>
  .champ-how {
    background: var(--canvas);
  }

  .champ-how-header {
    max-width: 640px;
    margin-bottom: 64px;
  }

  .champ-how-sub {
    margin: 16px 0 0;
    font-size: 18px;
    line-height: 1.55;
    color: var(--body);
  }

  .champ-how-timeline {
    display: flex;
    flex-direction: column;
    gap: 0;
  }

  .champ-how-stage {
    display: grid;
    grid-template-columns: 60px 1fr;
    gap: 24px;
    align-items: start;
    padding: 0;
  }

  .champ-how-stage-left {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0;
  }

  .champ-how-stage-num {
    width: 48px;
    height: 48px;
    border-radius: 999px;
    background: var(--surface-card);
    border: 1px solid var(--hairline);
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: var(--font-display);
    font-size: 20px;
    font-weight: 500;
    color: var(--primary);
    flex-shrink: 0;
  }

  .champ-how-stage-line {
    width: 1px;
    flex: 1;
    min-height: 40px;
    background: var(--hairline);
  }

  .champ-how-stage:last-child .champ-how-stage-line {
    display: none;
  }

  .champ-how-stage-card {
    display: grid;
    grid-template-columns: 200px 1fr;
    gap: 24px;
    align-items: center;
    padding: 24px;
    margin-bottom: 24px;
    border-radius: 12px;
    background: var(--surface-card);
    border: 1px solid var(--hairline);
    transition: transform 300ms ease, box-shadow 300ms ease;
  }

  .champ-how-stage-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 28px rgba(242, 120, 48, 0.08);
  }

  .champ-how-stage-img-wrap {
    position: relative;
    border-radius: 8px;
    overflow: hidden;
    aspect-ratio: 16/10;
  }

  .champ-how-stage-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .champ-how-stage-content {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .champ-how-stage-header {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .champ-how-stage-icon {
    font-size: 20px;
    line-height: 1;
  }

  .champ-how-stage-title {
    margin: 0;
    font-family: var(--font-display);
    font-size: 22px;
    font-weight: 500;
    line-height: 1.2;
    letter-spacing: -0.01em;
    color: var(--ink);
  }

  .champ-how-stage-body {
    margin: 0;
    font-size: 15px;
    line-height: 1.6;
    color: var(--body);
  }

  @media (max-width: 767px) {
    .champ-how {
      padding: 0;
    }

    .champ-how-stage {
      grid-template-columns: 40px 1fr;
      gap: 16px;
    }

    .champ-how-stage-num {
      width: 40px;
      height: 40px;
      font-size: 18px;
    }

    .champ-how-stage-card {
      grid-template-columns: 1fr;
      gap: 16px;
      padding: 20px;
      margin-bottom: 16px;
    }

    .champ-how-stage-img-wrap {
      aspect-ratio: 16/9;
    }

    .champ-how-stage-title {
      font-size: 20px;
    }

    .champ-how-stage-body {
      font-size: 14px;
    }
  }
</style>
