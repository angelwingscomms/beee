<script lang="ts">
  import { motionStaggered } from '$lib/actions/motion';
</script>

<section class="teamup">
  <div class="container teamup-inner">
    <h2 class="teamup-title">TEAMUP</h2>
    <p class="teamup-sub">Developing young thinkers beyond the chessboard.</p>
    <div class="pillar-grid" use:motionStaggered={{ stagger: 0.08, y: 20 }}>
      <div class="pillar-card">
        <span class="pillar-letter">T</span>
        <h3 class="pillar-name">Technology</h3>
        <p class="pillar-desc">Exploring digital tools, innovation, and emerging technologies that shape the future.</p>
      </div>
      <div class="pillar-card">
        <span class="pillar-letter">E</span>
        <h3 class="pillar-name">Enterprise</h3>
        <p class="pillar-desc">Developing initiative, creativity, problem-solving, and entrepreneurial thinking.</p>
      </div>
      <div class="pillar-card">
        <span class="pillar-letter">A</span>
        <h3 class="pillar-name">Art</h3>
        <p class="pillar-desc">Encouraging creativity, expression, design thinking, and imagination.</p>
      </div>
      <div class="pillar-card">
        <span class="pillar-letter">M</span>
        <h3 class="pillar-name">Mentorship</h3>
        <p class="pillar-desc">Learning from experienced mentors who guide participants in their growth journey.</p>
      </div>
      <div class="pillar-card">
        <span class="pillar-letter">U</span>
        <h3 class="pillar-name">Upskill</h3>
        <p class="pillar-desc">Acquiring practical skills, competencies, and habits that support lifelong success.</p>
      </div>
    </div>
    <p class="teamup-finish">Together, these five pillars help participants grow as thinkers, creators, leaders, and problem solvers - both on and beyond the chessboard.</p>
  </div>
</section>

<style>
  .teamup {
    padding: 96px 0;
    background: var(--surface-dark);
    color: var(--on-dark);
    position: relative;
  }

  .teamup::before {
    content: '';
    position: absolute;
    inset: 0;
    opacity: 0.025;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
    background-repeat: repeat;
    background-size: 256px 256px;
    pointer-events: none;
  }

  .teamup-inner {
    position: relative;
    z-index: 1;
    text-align: center;
    width: min(1200px, calc(100% - 48px));
    margin: 0 auto;
  }

  .teamup-title {
    font-family: var(--font-display);
    font-size: 32px;
    font-weight: 500;
    line-height: 1.15;
    letter-spacing: -0.01em;
    color: var(--on-dark);
    margin: 0;
  }

  .teamup-sub {
    font-size: 16px;
    line-height: 1.5;
    color: var(--on-dark-soft);
    margin: 12px 0 40px;
  }

  .pillar-grid {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 16px;
  }

  .pillar-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    padding: 32px 24px;
    border-radius: 12px;
    background: var(--surface-dark-elevated);
    min-width: 180px;
    flex: 1 1 180px;
    max-width: 300px;
    transition: transform 240ms var(--ease-out), background 240ms var(--ease-out);
  }

  .pillar-card:hover {
    transform: translateY(-3px);
    background: color-mix(in srgb, var(--surface-dark-elevated) 92%, var(--primary));
  }

  .pillar-letter {
    font-family: var(--font-display);
    font-size: 22px;
    font-weight: 500;
    letter-spacing: -0.01em;
    color: var(--primary);
    line-height: 1;
    margin-bottom: 4px;
  }

  .pillar-name {
    font-family: var(--font-display);
    font-size: 17px;
    font-weight: 500;
    line-height: 1.25;
    letter-spacing: -0.01em;
    color: var(--on-dark);
    margin: 0;
  }

  .pillar-desc {
    font-size: 13px;
    line-height: 1.5;
    color: var(--on-dark-soft);
    margin: 0;
  }

  .teamup-finish {
    font-size: 15px;
    line-height: 1.55;
    color: var(--on-dark-soft);
    margin: 48px auto 0;
    max-width: 560px;
  }

  @media (--sm-down) {
    .teamup {
      padding: 64px 0;
    }
    .teamup-title {
      font-size: 24px;
    }
    .pillar-grid {
      gap: 12px;
    }
    .pillar-card {
      min-width: 140px;
      flex: 1 1 140px;
      padding: 24px 20px;
    }
    .pillar-name {
      font-size: 15px;
    }
    .pillar-desc {
      font-size: 12px;
    }
    .teamup-finish {
      font-size: 14px;
      margin-top: 36px;
    }
  }
</style>
