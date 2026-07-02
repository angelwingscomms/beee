<script lang="ts">
  import { motionFadeUp } from '$lib/actions/motion';
</script>

<section class="different" use:motionFadeUp>
  <div class="container different-inner">
    <h2 class="different-title">What Makes BEEE Different?</h2>
    <div class="different-statements">
      <p class="statement-strong">Most championships end with a trophy.</p>
      <p class="statement-strong">BEEE begins with a journey.</p>
    </div>
    <p class="different-body">
      Every participant receives access to the <strong>TEAMUP Development Programme</strong>
      and a digital <strong>Development Passport</strong> that records milestones, badges, projects,
      achievements, and personal growth throughout the championship cycle.
    </p>
  </div>
</section>

<style>
  .different {
    padding: 96px 0;
    background: var(--surface-soft);
    position: relative;
  }

  .different::before {
    content: '';
    position: absolute;
    inset: 0;
    opacity: 0.02;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
    background-repeat: repeat;
    background-size: 256px 256px;
    pointer-events: none;
  }

  .different-inner {
    position: relative;
    z-index: 1;
    max-width: 680px;
    width: min(1200px, calc(100% - 48px));
    margin: 0 auto;
  }

  .different-title {
    font-family: var(--font-display);
    font-size: 28px;
    font-weight: 500;
    line-height: 1.2;
    letter-spacing: -0.01em;
    color: var(--ink);
    margin: 0 0 28px;
  }

  .different-statements {
    display: flex;
    flex-direction: column;
    gap: 4px;
    margin-bottom: 24px;
  }

  .statement-strong {
    font-family: var(--font-display);
    font-size: 22px;
    font-weight: 500;
    line-height: 1.3;
    letter-spacing: -0.01em;
    color: var(--ink);
    margin: 0;
  }

  .different-body {
    font-size: 16px;
    line-height: 1.6;
    color: var(--body);
    margin: 0;
  }

  .different-body strong {
    color: var(--ink);
    font-weight: 600;
  }

  @media (max-width: 767px) {
    .different {
      padding: 64px 0;
    }
    .different-title {
      font-size: 24px;
    }
    .statement-strong {
      font-size: 18px;
    }
  }
</style>
