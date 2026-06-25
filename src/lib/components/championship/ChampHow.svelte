<script lang="ts">
  import { motionFadeUp } from '$lib/actions/motion';

  const steps = [
    {
      num: '01',
      title: 'Summer Online Programme',
      body: 'T.E.A.M.U.P. Programme online — chess training, mentorship, and personal development from home.',
      icon: '\u2600'
    },
    {
      num: '02',
      title: 'Live Preliminaries',
      body: 'Top participants advance to in-person rounds. Screen to table. Real opponents. Real stakes.',
      icon: '\u265E'
    },
    {
      num: '03',
      title: 'Grand Finale',
      body: 'A spectacular live finale. Trophies, certificates, scholarships. Every participant leaves with a completed Development Passport.',
      icon: '\u265B'
    }
  ];
</script>

<section class="section-soft champ-how" use:motionFadeUp>
  <div class="container" style="padding: 120px 0;">
    <div class="champ-how-header">
      <p class="champ-how-eyebrow">The Journey</p>
      <h2 class="champ-how-title">From Summer Session to Grand Finale</h2>
      <p class="champ-how-sub">Three stages. One transformative experience.</p>
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
    grid-template-columns: repeat(3, 1fr);
    gap: 40px;
    position: relative;
  }

  .champ-how-line {
    position: absolute;
    top: 40px;
    left: calc(16.67% + 20px);
    right: calc(16.67% + 20px);
    height: 1px;
    background: linear-gradient(90deg, var(--primary) 0%, var(--primary) 100%);
    opacity: 0.25;
  }

  .champ-how-step {
    position: relative;
    display: grid;
    gap: 20px;
    padding: 40px 32px;
    border-radius: 16px;
    background: var(--canvas);
    border: 1px solid var(--hairline);
    transition: transform 400ms ease, box-shadow 400ms ease;
    animation: step-enter 0.6s ease-out both;
    animation-delay: calc(var(--i, 0) * 0.15s);
  }

  .champ-how-step:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 40px rgba(242, 120, 48, 0.08);
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
    color: var(--muted);
    letter-spacing: 0.04em;
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
    color: var(--ink);
  }

  .champ-how-step-body {
    margin: 0;
    font-size: 15px;
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

  @media (max-width: 767px) {
    .champ-how-track {
      grid-template-columns: 1fr;
      gap: 20px;
    }
    .champ-how-line {
      display: none;
    }
    .champ-how-step {
      padding: 28px 24px;
    }
  }
</style>
