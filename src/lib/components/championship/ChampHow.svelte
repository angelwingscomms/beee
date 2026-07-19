<script lang="ts">
  import { motionFadeUp } from '$lib/actions/motion';
  import Button from '$lib/components/Button.svelte';

  interface Stage {
    num: number;
    title: string;
    body: string;
    img: string;
    color: string;
    colorLight: string;
    iconPath: string;
  }

  const stages: Stage[] = [
    {
      num: 1,
      title: 'ONLINE TRAINING & COACHING',
      body: `July 28 – August 29, 2026.
Registration unlocks e4™ AI chess coaching, TEAMUP™, and the Taskify™ Development Passport.
✔ AI-powered chess coaching
✔ Leadership and life-skills development
✔ Interactive challenges and creativity workshops`,
      img: '/images/championship/learn.png',
      color: '#F27830',
      colorLight: '#F69A64',
      iconPath: 'M12 14l9-5-9-5-9 5 9 5z M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z',
    },
    {
      num: 2,
      title: 'PRELIMINARY ROUNDS',
      body: `September 2026.
Participants compete in the live preliminary qualifying rounds of the championship.`,
      img: '/images/championship/compete.png',
      color: '#ffb200',
      colorLight: '#e6a000',
      iconPath: 'M12 2L9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2z',
    },
    {
      num: 3,
      title: 'ELITE STAGE',
      body: `Qualifiers advance through live elimination tournaments and advanced training.
The top performers face off for the finalist spots.`,
      img: '/images/championship/qualify.png',
      color: '#ffb200',
      colorLight: '#e6a000',
      iconPath: 'M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z',
    },
    {
      num: 4,
      title: 'GRAND FINALE',
      body: `October 2026.
Finalists participate in an immersive championship experience, unlike conventional chess competitions.`,
      img: '/images/championship/grandfinale.png',
      color: '#0A0F1A',
      colorLight: '#1A2B4C',
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
      <h1 class="champ-how-title">Your <span class="gold">Championship</span> Journey</h1>
      <p class="champ-how-sub">A comprehensive development pathway</p>
    </header>

    {#snippet stageCard(s: Stage)}
      <div class="stage-card">
        <svg class="stage-curve" viewBox="0 0 100 300" preserveAspectRatio="none" fill={s.color}><path d="M0,0 H40 C10,80 0,140 0,300 Z"/></svg>
        <div class="stage-badge" style="background: {s.color};">
          <svg class="stage-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
            <path d={s.iconPath} />
          </svg>
        </div>
        <div class="stage-text">
          <div class="stage-title-row">
            <span class="stage-num" style="color: {s.color};">{s.num}</span>
            <span class="stage-title" style="color: {s.color};">– {s.title}</span>
          </div>
          <p class="stage-body">
            {#each s.body.split('\n') as line, j}
              {#if j > 0}<br>{/if}{line}
            {/each}
          </p>
        </div>
      </div>
    {/snippet}

    {#each stages as stage, i}
      <div class="stage-band" style="--sc: {stage.color}; --sc-light: {stage.colorLight};">
        {#if i % 2 === 0}
          <div class="stage-img">
            <img src={stage.img} alt="" />
          </div>
          {@render stageCard(stage)}
        {:else}
          {@render stageCard(stage)}
          <div class="stage-img">
            <img src={stage.img} alt="" />
          </div>
        {/if}
      </div>
      {#if i < stages.length - 1}
        <div class="chevron">
          <svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="9" fill={stage.color} stroke="#fff" stroke-width="1.5"/>
            <path d="M9 11.5l3 3 3-3" />
          </svg>
        </div>
      {/if}
    {/each}

    <footer class="champ-how-cta">
      <p class="cta-main">MAKE YOUR <span class="gold">MOVE</span></p>
      <p class="cta-motto"><span style="color:#fff">ASPIRE TO</span> <span class="gold">BEEE</span></p>
      <p class="cta-sub">BE EVERYTHING EXCELLENT EVERY <span class="gold">DAY</span></p>
      <Button href="/register" class="champ-how-btn">Start Your Child's Journey</Button>
    </footer>
  </div>
</section>

<style>
  .champ-how {
    position: relative;
    background: var(--navy);
    overflow-x: hidden;
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
    font-family: var(--font-hero);
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
    font-size: clamp(16px, 2.5vw, 20px);
    font-weight: 500;
    line-height: 1.5;
    color: rgba(250, 249, 245, 0.75);
  }

  .stage-band {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr;
    align-items: stretch;
    border: 1px solid color-mix(in srgb, var(--sc) 55%, transparent);
    border-radius: 16px;
    overflow: hidden;
    width: 90vw;
    margin-left: calc(-45vw + 50%);
  }

  .stage-img {
    position: relative;
    overflow: hidden;
    min-height: 0;
  }

  .stage-img img {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .stage-card {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    gap: 24px;
    padding: 28px 32px 28px 80px;
    background: #fff;
    position: relative;
    min-height: 0;
    overflow: hidden;
  }

  .stage-curve {
    position: absolute;
    top: 0;
    left: 0;
    width: 180px;
    height: 100%;
  }

  .stage-badge {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--sc);
    flex-shrink: 0;
    position: relative;
    z-index: 1;
  }

  .stage-icon {
    width: 50px;
    height: 50px;
    color: #fff;
  }

  .stage-text {
    display: flex;
    flex-direction: column;
    gap: 2px;
    position: relative;
    z-index: 1;
  }


  .stage-title-row {
    display: flex;
    align-items: baseline;
    gap: 8px;
    margin-bottom: 6px;
  }

  .stage-num {
    font-family: var(--font-hero);
    font-size: 44px;
    font-weight: 800;
    line-height: 1;
    color: var(--sc);
    opacity: 0.9;
  }

  .stage-title {
    font-family: var(--font-hero);
    font-size: 22px;
    font-weight: 700;
    line-height: 1.2;
    color: var(--sc);
  }

  .stage-body {
    margin: 0;
    font-size: 16px;
    font-weight: 400;
    line-height: 1.65;
    color: #252523;
  }

  .chevron {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: -16px 0;
    position: relative;
    z-index: 2;
  }

  .chevron svg {
    width: 44px;
    height: 44px;
    filter: drop-shadow(0 2px 4px rgba(0,0,0,0.2));
  }

  .champ-how-cta {
    text-align: center;
    margin-top: 48px;
    padding-top: 40px;
    border-top: 1px solid rgba(255,255,255,0.1);
  }

  .cta-main {
    font-family: var(--font-hero);
    font-size: clamp(28px, 5vw, 48px);
    font-weight: 800;
    color: #fff;
    letter-spacing: -0.01em;
    margin: 0 0 12px;
  }

  .cta-motto {
    font-family: var(--font-hero);
    font-size: 20px;
    font-weight: 600;
    letter-spacing: 0.1em;
    color: rgba(255,255,255,0.5);
    margin: 0 0 4px;
  }

  .cta-sub {
    font-family: var(--font-hero);
    font-size: 16px;
    font-weight: 500;
    letter-spacing: 0.08em;
    color: #fff;
    margin: 0;
  }

  :global(.champ-how-btn) {
    margin-top: 28px;
    padding: 16px 36px;
    font-size: 16px;
  }

  @media (--md-down) {
    .champ-how-inner {
      padding: 100px 16px 40px;
    }

    .champ-how-header {
      margin-bottom: 36px;
    }

    .stage-band {
      grid-template-columns: 1fr;
      grid-template-rows: 180px auto;
      aspect-ratio: unset;
      max-height: unset;
      width: 90vw;
      margin-left: calc(-45vw + 50%);
    }

    .stage-img {
      min-height: 180px;
      order: 1;
    }

    .stage-card {
      order: 2;
    }

    .stage-card {
      padding: 24px 20px 24px 72px;
      gap: 16px;
    }

    .stage-curve {
      width: 140px;
    }

    .stage-badge {
      width: 80px;
      height: 80px;
    }

    .stage-icon {
      width: 40px;
      height: 40px;
    }

    .stage-num {
      font-size: 36px;
    }

    .stage-title {
      font-size: 18px;
    }

    .chevron svg {
      width: 36px;
      height: 36px;
    }
  }
</style>
