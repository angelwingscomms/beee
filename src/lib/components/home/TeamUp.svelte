<script lang="ts">
  import { motionStaggered } from '$lib/actions/motion';
</script>

<section class="teamup">
  <div class="container teamup-inner">
    <h2 class="teamup-title">T.E.A.M.U.P.</h2>
    <p class="teamup-sub">Developing young thinkers beyond the chessboard.</p>
    <div class="teamup-grid" use:motionStaggered={{ stagger: 0.08, y: 20 }}>
      <div class="teamup-item">
        <span class="item-letter">T</span>
        <span class="item-label">Technology</span>
      </div>
      <div class="teamup-item">
        <span class="item-letter">E</span>
        <span class="item-label">Enterprise</span>
      </div>
      <div class="teamup-item">
        <span class="item-letter">A</span>
        <span class="item-label">Art</span>
      </div>
      <div class="teamup-item">
        <span class="item-letter">M</span>
        <span class="item-label">Mentorship</span>
      </div>
      <div class="teamup-item">
        <span class="item-letter">U</span>
        <span class="item-label">Upskill</span>
      </div>
    </div>
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
    font-family: var(--font-sans);
    font-size: 32px;
    font-weight: 700;
    line-height: 1.15;
    letter-spacing: 0.08em;
    color: var(--on-dark);
    margin: 0;
  }

  .teamup-sub {
    font-size: 16px;
    line-height: 1.5;
    color: var(--on-dark-soft);
    margin: 12px 0 40px;
  }

  .teamup-grid {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 16px;
  }

  .teamup-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    padding: 28px 32px;
    border-radius: 12px;
    background: var(--surface-dark-elevated);
    min-width: 130px;
    transition: transform 240ms ease, background 240ms ease;
  }

  .teamup-item:hover {
    transform: translateY(-3px);
    background: color-mix(in srgb, var(--surface-dark-elevated) 92%, var(--primary));
  }

  .item-letter {
    font-family: var(--font-sans);
    font-size: 28px;
    font-weight: 700;
    color: var(--primary);
    line-height: 1;
  }

  .item-label {
    font-size: 13px;
    font-weight: 500;
    color: var(--on-dark-soft);
  }

  @media (max-width: 767px) {
    .teamup {
      padding: 64px 0;
    }
    .teamup-title {
      font-size: 24px;
    }
    .teamup-grid {
      gap: 12px;
    }
    .teamup-item {
      min-width: 100px;
      padding: 20px 24px;
    }
  }
</style>
