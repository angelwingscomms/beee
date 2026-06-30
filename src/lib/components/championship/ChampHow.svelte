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

<section class="champ-how" use:motionFadeUp>
  <div class="container" style="padding: 120px 0;">
    <div class="champ-how-header">
      <p class="champ-how-eyebrow">The Championship Journey</p>
      <h2 class="champ-how-title">From Registration to Grand Finale</h2>
      <p class="champ-how-sub">Five stages. One transformative experience.</p>
    </div>
    <div class="champ-how-track">
      {#each steps as step, i}
        <div class="champ-how-step" class:alt={i === 1 || i === 3} style="--i: {i}">
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
    color: var(--ink);
    margin: 0;
  }

  .champ-how-sub {
    font-family: var(--font-display);
    font-size: 20px;
    line-height: 1.3;
    color: var(--body);
    margin: 12px 0 0;
  }

  .champ-how-track {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 20px;
  }

  .champ-how-step {
    display: grid;
    gap: 16px;
    padding: 32px 28px;
    border-radius: 16px;
    background: var(--surface-card);
    border: 1px solid var(--hairline);
    box-shadow: var(--shadow-soft);
    transition: transform 360ms ease, box-shadow 360ms ease;
    animation: step-enter 0.5s ease-out both;
    animation-delay: calc(var(--i, 0) * 0.12s);
  }

  .champ-how-step:nth-child(1) { grid-column: 1; }
  .champ-how-step:nth-child(2) { grid-column: 2 / 4; }
  .champ-how-step:nth-child(3) { grid-column: 4; }
  .champ-how-step:nth-child(4) { grid-column: 1 / 3; }
  .champ-how-step:nth-child(5) { grid-column: 3 / 5; }

  .champ-how-step.alt {
    background: color-mix(in srgb, var(--surface-card) 94%, var(--primary));
  }

  .champ-how-step:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 32px rgba(20, 20, 19, 0.1);
  }

  .champ-how-step-head {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .champ-how-step-num {
    font-family: var(--font-display);
    font-size: 13px;
    font-weight: 500;
    color: var(--muted);
    letter-spacing: 0.04em;
  }

  .champ-how-step-icon {
    font-size: 22px;
    line-height: 1;
    color: var(--primary);
  }

  .champ-how-step-title {
    margin: 0;
    font-family: var(--font-display);
    font-size: 24px;
    font-weight: 500;
    line-height: 1.2;
    letter-spacing: -0.01em;
    color: var(--ink);
  }

  .champ-how-step-body {
    margin: 0;
    font-size: 14px;
    line-height: 1.6;
    color: var(--body);
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
    .champ-how-step:nth-child(1) { grid-column: 1; }
    .champ-how-step:nth-child(2) { grid-column: 2 / 4; }
    .champ-how-step:nth-child(3) { grid-column: 1 / 3; }
    .champ-how-step:nth-child(4) { grid-column: 3; }
    .champ-how-step:nth-child(5) { grid-column: 1 / 4; }
  }

  @media (max-width: 767px) {
    .champ-how-track {
      grid-template-columns: 1fr;
      gap: 16px;
    }
    .champ-how-step {
      padding: 24px 20px;
    }
    .champ-how-step:nth-child(1),
    .champ-how-step:nth-child(2),
    .champ-how-step:nth-child(3),
    .champ-how-step:nth-child(4),
    .champ-how-step:nth-child(5) {
      grid-column: 1;
    }
  }
</style>
