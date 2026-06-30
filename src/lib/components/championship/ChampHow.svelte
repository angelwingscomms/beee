<script lang="ts">
  import { motionFadeUp } from '$lib/actions/motion';

  const steps = [
    {
      num: '01',
      title: 'Register',
      body: 'Join through your participating school.',
      icon: '\u265F'
    },
    {
      num: '02',
      title: 'Learn',
      body: 'Complete T.E.A.M.U.P.\u2122 activities, assessments, and challenges online.',
      icon: '\u265E'
    },
    {
      num: '03',
      title: 'Grow',
      body: 'Earn Development Passport points, achievement badges, certificates, and valuable skills.',
      icon: '\u265B'
    },
    {
      num: '04',
      title: 'Compete',
      body: 'Participate in exciting live preliminary events and immersive championship experiences.',
      icon: '\u265C'
    },
    {
      num: '05',
      title: 'Become',
      body: 'Celebrate your achievements at the BEEE Spectacular Chess Championship Abuja 2026 Grand Finale.',
      icon: '\u265A'
    }
  ];
</script>

<section class="section-dark champ-how" use:motionFadeUp>
  <div class="container" style="padding: 120px 0;">
    <div class="champ-how-header">
      <p class="champ-how-eyebrow">The Championship Journey</p>
      <h2 class="champ-how-title">From Registration to Grand Finale</h2>
      <p class="champ-how-sub">Five stages. One transformative experience.</p>
    </div>
    <div class="champ-how-track">
      <div class="champ-how-line"></div>
      {#each steps as step, i}
        <div class="champ-how-step" style="--i: {i}">
          <div class="champ-how-step-head">
            <span class="champ-how-step-num">{step.num}</span>
            <span class="champ-how-step-icon">{step.icon}</span>
          </div>
          <h3 class="champ-how-step-title">{step.title}</h3>
          <p class="champ-how-step-body">{step.body}</p>
        </div>
      {/each}
    </div>
  </div>
</section>

<style>
  .champ-how-header {
    max-width: 640px;
    margin-bottom: 72px;
  }

  .champ-how-eyebrow {
    font-size: 13px;
    font-weight: 500;
    color: var(--primary);
    margin: 0 0 16px;
    letter-spacing: 0.04em;
    text-transform: uppercase;
  }

  .champ-how-title {
    font-family: var(--font-display);
    font-size: clamp(1.8rem, 3vw, 2.5rem);
    font-weight: 500;
    line-height: 1.15;
    letter-spacing: -0.01em;
    color: var(--on-dark);
    margin: 0;
  }

  .champ-how-sub {
    font-family: var(--font-display);
    font-size: 20px;
    line-height: 1.3;
    color: var(--on-dark-soft);
    margin: 12px 0 0;
  }

  .champ-how-track {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 20px;
    position: relative;
  }

  .champ-how-line {
    position: absolute;
    top: 40px;
    left: calc(10% + 20px);
    right: calc(10% + 20px);
    height: 1px;
    background: linear-gradient(90deg, var(--primary) 0%, var(--primary) 100%);
    opacity: 0.25;
  }

  .champ-how-step {
    position: relative;
    display: grid;
    gap: 20px;
    padding: 32px 24px;
    border-radius: 16px;
    background: var(--surface-dark-elevated);
    border: 1px solid rgba(250, 249, 245, 0.08);
    transition: transform 400ms ease, box-shadow 400ms ease;
    animation: step-enter 0.6s ease-out both;
    animation-delay: calc(var(--i, 0) * 0.15s);
  }

  .champ-how-step:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.3);
  }

  .champ-how-step-head {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .champ-how-step-num {
    font-family: var(--font-display);
    font-size: 14px;
    font-weight: 500;
    color: var(--on-dark-soft);
    letter-spacing: 0.04em;
    opacity: 0.5;
  }

  .champ-how-step-icon {
    font-size: 18px;
    line-height: 1;
    color: var(--primary);
  }

  .champ-how-step-title {
    margin: 0;
    font-family: var(--font-display);
    font-size: 22px;
    font-weight: 500;
    line-height: 1.2;
    letter-spacing: -0.01em;
    color: var(--on-dark);
  }

  .champ-how-step-body {
    margin: 0;
    font-size: 14px;
    line-height: 1.6;
    color: var(--on-dark-soft);
  }

  @keyframes step-enter {
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
    .champ-how-step {
      animation: none;
    }
  }

  @media (max-width: 1024px) {
    .champ-how-track {
      grid-template-columns: repeat(3, 1fr);
    }
  }

  @media (max-width: 767px) {
    .champ-how-track {
      grid-template-columns: 1fr;
      gap: 16px;
    }
    .champ-how-line {
      display: none;
    }
    .champ-how-step {
      padding: 24px 20px;
    }
  }
</style>
