<script lang="ts">
  import { Medal, BadgeCheck, FileText, Award, Sparkles, Users, Lightbulb, Star, School } from '@lucide/svelte';
  import { motionStaggered, motionFadeUp } from '$lib/actions/motion';
  import Logo from '$lib/components/Logo.svelte';

  const feature = {
    icon: Sparkles,
    kicker: 'The signature honour',
    title: 'T.E.A.M.U.P.™ Excellence Awards',
    body: 'Celebrating whole child excellence — outstanding performance will win prizes and honours.'
  };

  const awards = [
    { icon: Medal, title: 'Medals & Awards', body: 'Top performers honoured across competitive categories.' },
    { icon: BadgeCheck, title: 'Badges of Competence', body: 'Verified skills, milestones, and proficiencies.' },
    { icon: FileText, title: 'Certificates of Participation', body: 'Recognition for every child who joins the journey.' },
    { icon: Award, title: 'Certificates of Achievement', body: 'For measurable growth and accomplishment.' },
    { icon: Users, title: 'Leadership Recognition', body: 'For those who step up and lead by example.' },
    { icon: Lightbulb, title: 'Innovation & Creativity', body: 'Honouring original thinking and design.' },
    { icon: Star, title: 'Special Merit Awards', body: 'Distinctive individual contribution.' },
    { icon: School, title: 'School Recognition', body: 'Celebrating participation and collective spirit.' },
  ];
</script>

<section id="awards" class="awards">
  <div class="awards-inner">
    <header class="awards-head" use:motionFadeUp>
      <span class="awards-eyebrow"><span class="dot"></span>Awards &amp; Recognition</span>
      <h2 class="awards-title">Honours worth<br /><span class="shine">competing for</span></h2>
      <p class="awards-sub">Every participant plays for more than the championship award. A full spectrum of honours celebrates chess skill, personal growth, leadership, and team spirit.</p>
    </header>

    <div class="awards-grid">
      <!-- Featured -->
      <article class="award-feature" use:motionFadeUp>
        <div class="feature-shimmer" aria-hidden="true"></div>
        <div class="feature-top">
          <span class="feature-icon"><Logo color="#141413" width="50" height="50" /></span>
          <span class="feature-kicker">{feature.kicker}</span>
        </div>
        <div class="feature-body">
          <h3 class="feature-title">{feature.title}</h3>
          <p class="feature-text">{feature.body}</p>
        </div>
      </article>

      <!-- Grid of honours -->
      <div class="award-cards" use:motionStaggered={{ stagger: 0.06, y: 24 }}>
        {#each awards as a, i}
          <article class="award-card">
            <span class="card-index">{String(i + 1).padStart(2, '0')}</span>
            <span class="card-icon"><a.icon size={22} /></span>
            <h3 class="card-title">{a.title}</h3>
            <p class="card-body">{a.body}</p>
          </article>
        {/each}
      </div>
    </div>
  </div>
</section>

<style>
  .awards {
    position: relative;
    overflow: hidden;
    padding: clamp(72px, 12vw, 160px) 0;
    background: var(--navy, #0A0F1A);
    isolation: isolate;
  }

  .awards-inner {
    max-width: 1280px;
    margin: 0 auto;
    padding: 0 24px;
  }

  /* ---- Header ---- */
  .awards-head {
    max-width: 720px;
    margin: 0 auto clamp(48px, 6vw, 80px);
    text-align: center;
  }

  .awards-eyebrow {
    display: inline-flex;
    align-items: center;
    gap: 12px;
    font-family: 'Inter', sans-serif;
    font-size: 22px;
    font-weight: 600;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: #ffb200;
    padding: 10px 24px;
    border: 1px solid rgba(255, 178, 0, 0.28);
    border-radius: 9999px;
    background: rgba(255, 178, 0, 0.06);
  }

  @media (max-width: 640px) {
    .awards-eyebrow {
      font-size: 14px;
      gap: 6px;
      padding: 6px 14px;
    }
  }

  .awards-eyebrow .dot {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: #ffb200;
    box-shadow: 0 0 10px 2px rgba(255, 178, 0, 0.7);
  }

  .awards-title {
    font-family: var(--font-hero, 'Space Grotesk', sans-serif);
    font-size: clamp(2.4rem, 6vw, 4.5rem);
    font-weight: 700;
    line-height: 1.02;
    letter-spacing: -0.03em;
    color: #fff;
    margin: 26px 0 0;
  }

  .shine {
    background: linear-gradient(100deg, #ffb200 0%, #ffe08a 30%, #ffb200 60%, #d98f00 100%);
    background-size: 200% auto;
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: shine 6s linear infinite;
  }

  @keyframes shine {
    to { background-position: 200% center; }
  }

  .awards-sub {
    font-family: 'Inter', sans-serif;
    font-size: clamp(1rem, 1.4vw, 1.2rem);
    line-height: 1.6;
    color: rgba(255, 255, 255, 0.55);
    margin: 22px auto 0;
    max-width: 560px;
  }

  /* ---- Layout ---- */
  .awards-grid {
    display: grid;
    grid-template-columns: minmax(300px, 380px) 1fr;
    gap: 20px;
    align-items: stretch;
  }

  /* ---- Featured card ---- */
  .award-feature {
    position: relative;
    overflow: hidden;
    border-radius: 26px;
    padding: 40px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 48px;
    min-height: 340px;
    color: #0A0F1A;
    background:
      radial-gradient(120% 120% at 0% 0%, #ffe08a 0%, #ffb200 42%, #f59e0b 100%);
    box-shadow:
      0 30px 70px -30px rgba(255, 178, 0, 0.5),
      inset 0 1px 0 rgba(255, 255, 255, 0.4);
  }

  .feature-shimmer {
    position: absolute;
    inset: 0;
    background: linear-gradient(115deg, transparent 30%, rgba(255, 255, 255, 0.55) 48%, transparent 62%);
    transform: translateX(-120%);
    pointer-events: none;
  }

  @media (prefers-reduced-motion: no-preference) {
    .award-feature:hover .feature-shimmer {
      transform: translateX(120%);
      transition: transform 900ms cubic-bezier(0.22, 1, 0.36, 1);
    }
  }

  .feature-top {
    position: relative;
    display: flex;
    align-items: center;
    gap: 14px;
  }

  .feature-icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 60px;
    height: 60px;
    border-radius: 16px;
    color: #ffb200;
    flex-shrink: 0;
  }

  .feature-kicker {
    font-family: 'Inter', sans-serif;
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: rgba(10, 15, 26, 0.7);
  }

  .feature-title {
    font-family: var(--font-hero, 'Space Grotesk', sans-serif);
    font-size: clamp(1.7rem, 2.6vw, 2.3rem);
    font-weight: 700;
    line-height: 1.08;
    letter-spacing: -0.02em;
    margin: 0 0 14px;
  }

  .feature-text {
    font-family: 'Inter', sans-serif;
    font-size: 15.5px;
    line-height: 1.6;
    color: rgba(10, 15, 26, 0.78);
    margin: 0;
    max-width: 34ch;
  }

  /* ---- Card grid ---- */
  .award-cards {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 16px;
  }

  .award-card {
    position: relative;
    overflow: hidden;
    border-radius: 20px;
    padding: 26px 22px 28px;
    border: 1px solid rgba(255, 255, 255, 0.09);
    background: linear-gradient(180deg, rgba(255, 255, 255, 0.045) 0%, rgba(255, 255, 255, 0.015) 100%);
    transition: transform 400ms cubic-bezier(0.22, 1, 0.36, 1), border-color 400ms ease, background 400ms ease;
  }

  .award-card::after {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: inherit;
    padding: 1px;
    background: linear-gradient(140deg, rgba(255, 178, 0, 0.5), transparent 40%);
    -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
    mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    opacity: 0;
    transition: opacity 400ms ease;
    pointer-events: none;
  }

  @media (prefers-reduced-motion: no-preference) and (hover: hover) {
    .award-card:hover {
      transform: translateY(-6px);
      background: linear-gradient(180deg, rgba(255, 178, 0, 0.08) 0%, rgba(255, 255, 255, 0.02) 100%);
    }
    .award-card:hover::after { opacity: 1; }
    .award-card:hover .card-icon {
      background: #ffb200;
      color: #0A0F1A;
      transform: rotate(-6deg);
    }
    .award-card:hover .card-index { color: rgba(255, 178, 0, 0.5); }
  }

  .card-index {
    position: absolute;
    top: 20px;
    right: 22px;
    font-family: var(--font-hero, 'Space Grotesk', sans-serif);
    font-size: 13px;
    font-weight: 700;
    letter-spacing: 0.05em;
    color: rgba(255, 255, 255, 0.18);
    transition: color 400ms ease;
  }

  .card-icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 46px;
    height: 46px;
    border-radius: 13px;
    background: rgba(255, 178, 0, 0.12);
    color: #ffb200;
    margin-bottom: 20px;
    transition: background 400ms ease, color 400ms ease, transform 400ms cubic-bezier(0.34, 1.56, 0.64, 1);
  }

  .card-title {
    font-family: var(--font-hero, 'Space Grotesk', sans-serif);
    font-size: 17px;
    font-weight: 700;
    line-height: 1.25;
    letter-spacing: -0.01em;
    color: #fff;
    margin: 0 0 8px;
  }

  .card-body {
    font-family: 'Inter', sans-serif;
    font-size: 13.5px;
    line-height: 1.55;
    color: rgba(255, 255, 255, 0.5);
    margin: 0;
  }

  /* ---- Responsive ---- */
  @media (max-width: 1100px) {
    .awards-grid { grid-template-columns: 1fr; }
    .award-feature { min-height: 240px; gap: 32px; }
    .award-cards { grid-template-columns: repeat(3, 1fr); }
  }

  @media (max-width: 767px) {
    .award-cards { grid-template-columns: repeat(2, 1fr); }
    .award-feature { padding: 32px; }
  }

  @media (max-width: 440px) {
    .award-cards { grid-template-columns: 1fr; }
  }
</style>
