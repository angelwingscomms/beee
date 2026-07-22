<script lang="ts">
  import { motionStaggered, motionFadeUp } from '$lib/actions/motion';

  let pillars = [
    { l: 'T', n: 'Technology', d: 'Exploring digital tools, innovation, and emerging technologies that shape the future.', img: 'https://picsum.photos/seed/tech/600/400', g: 'from-indigo-500/10 to-transparent' },
    { l: 'E', n: 'Enterprise', d: 'Developing initiative, creativity, resourcefulness, and entrepreneurial thinking.', img: 'https://picsum.photos/seed/enterprise/600/400', g: 'from-amber-500/10 to-transparent' },
    { l: 'A', n: 'Art', d: 'Encouraging imagination, expression, creativity, and design thinking.', img: 'https://picsum.photos/seed/art/600/400', g: 'from-rose-500/10 to-transparent' },
    { l: 'M', n: 'Mentorship', d: 'Learning from mentors and role models who support personal and developmental growth.', img: 'https://picsum.photos/seed/mentor/600/400', g: 'from-teal-500/10 to-transparent' },
    { l: 'U', n: 'Upskill', d: 'Acquiring practical skills, competencies, and habits that contribute to future success.', img: 'https://picsum.photos/seed/skills/600/400', g: 'from-primary/10 to-transparent' },
  ];
</script>

<section class="pillars" id="pillars">
  <div class="pillars-inner">
    <div class="pillars-header" use:motionFadeUp>
      <h2 class="pillars-title">Five Pillars</h2>
      <p class="pillars-sub">Together, these five pillars help participants grow as thinkers, creators, leaders, and problem-solvers , both on and beyond the chessboard.</p>
    </div>
    <div class="pillars-grid" use:motionStaggered={{ stagger: 0.1, y: 24 }}>
      {#each pillars as p}
        <article class="pillar-card" style="--card-gradient: linear-gradient(135deg, {p.g});">
          <div class="pillar-card-bg">
            <div class="pillar-card-img" style="background-image: url({p.img})"></div>
          </div>
          <div class="pillar-card-content">
            <span class="pillar-let">{p.l}</span>
            <h3 class="pillar-n">{p.n}</h3>
            <p class="pillar-d">{p.d}</p>
          </div>
        </article>
      {/each}
    </div>
    <div class="pillars-finish">
      <p>Every participant is automatically enrolled upon registration. The programme runs alongside the championship, with activities, workshops, and mentorship sessions integrated throughout the event.</p>
    </div>
  </div>
</section>

<style>
  .pillars {
    padding: 128px 0;
    background: var(--surface-dark);
    color: var(--on-dark);
    position: relative;
  }

  .pillars::before {
    content: '';
    position: absolute;
    inset: 0;
    opacity: 0.025;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
    background-repeat: repeat;
    background-size: 256px 256px;
    pointer-events: none;
  }

  .pillars-inner {
    position: relative;
    z-index: 1;
    width: min(1200px, calc(100% - 48px));
    margin: 0 auto;
  }

  .pillars-header {
    text-align: center;
    margin-bottom: 56px;
  }

  .pillars-title {
    font-family: var(--font-display);
    font-size: clamp(1.8rem, 3vw, 2.6rem);
    font-weight: 500;
    line-height: 1.12;
    letter-spacing: -0.01em;
    color: var(--on-dark);
    margin: 0;
  }

  .pillars-sub {
    font-size: 16px;
    line-height: 1.6;
    color: var(--on-dark-soft);
    margin: 16px auto 0;
    max-width: 600px;
  }

  .pillars-grid {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 16px;
    grid-auto-flow: dense;
  }

  .pillar-card {
    position: relative;
    border-radius: 14px;
    overflow: hidden;
    isolation: isolate;
    transition: transform 400ms ease, box-shadow 400ms ease;
    cursor: default;
  }

  .pillar-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 16px 48px rgba(0, 0, 0, 0.25);
  }

  .pillar-card-bg {
    position: absolute;
    inset: 0;
    background: var(--surface-dark-elevated);
    z-index: 0;
    overflow: hidden;
  }

  .pillar-card-img {
    position: absolute;
    inset: 0;
    background-size: cover;
    background-position: center;
    opacity: 0.1;
    filter: grayscale(0.6) contrast(1.2);
    transition: opacity 500ms ease, transform 700ms ease;
  }

  .pillar-card:hover .pillar-card-img {
    opacity: 0.18;
    transform: scale(1.08);
  }

  .pillar-card-content {
    position: relative;
    z-index: 1;
    padding: 32px 24px;
    display: flex;
    flex-direction: column;
    gap: 16px;
    min-height: 320px;
  }

  .pillar-let {
    font-family: var(--font-display);
    font-size: 48px;
    font-weight: 500;
    line-height: 1;
    letter-spacing: -0.03em;
    color: var(--primary);
    display: block;
    transition: transform 300ms ease;
  }

  .pillar-card:hover .pillar-let {
    transform: translateX(4px);
  }

  .pillar-n {
    font-family: var(--font-display);
    font-size: 22px;
    font-weight: 500;
    line-height: 1.2;
    letter-spacing: -0.01em;
    color: var(--on-dark);
    margin: 0;
  }

  .pillar-d {
    font-size: 14px;
    line-height: 1.55;
    color: var(--on-dark-soft);
    margin: 0;
  }

  .pillars-finish {
    margin-top: 48px;
    text-align: center;
  }

  .pillars-finish p {
    font-size: 15px;
    line-height: 1.55;
    color: var(--on-dark-soft);
    max-width: 640px;
    margin: 0 auto;
  }

  @media (--md-down) {
    .pillars-grid {
      grid-template-columns: repeat(3, 1fr);
    }
    .pillar-card-content {
      min-height: 280px;
      padding: 28px 20px;
    }
  }

  @media (--sm-down) {
    .pillars {
      padding: 80px 0;
    }
    .pillars-grid {
      grid-template-columns: 1fr 1fr;
    }
    .pillar-card-content {
      min-height: 240px;
      padding: 24px 18px;
      gap: 12px;
    }
    .pillar-let {
      font-size: 36px;
    }
    .pillar-n {
      font-size: 18px;
    }
    .pillar-d {
      font-size: 13px;
    }
  }
</style>