<script lang="ts">
  import { CalendarDays, CircleCheck, MapPin } from '@lucide/svelte';
  import { motionSpring, motionScaleIn } from '$lib/actions/motion';
</script>

<section class="hero" id="top">
  <div class="hero-bg" aria-hidden="true"></div>
  <div class="container hero-grid">
    <div class="hero-copy">
      <p class="eyebrow" use:motionSpring={{ opacity: [0, 1], y: [-12, 0], stiffness: 180, damping: 20 }}>BEEE Spectacular Chess Championship Abuja 2026</p>
      <h1 use:motionSpring={{ opacity: [0, 1], y: [-24, 0], stiffness: 120, damping: 14, delay: 0.15 }}>Where Young Minds <span>Compete.</span> <span>Develop.</span> <span>Excel.</span></h1>
      <p class="hero-lead" use:motionSpring={{ opacity: [0, 1], y: [-16, 0], stiffness: 160, damping: 18, delay: 0.3 }}>More than a championship. A transformational journey in leadership, strategy, innovation and personal growth.</p>
      <div class="cta-row" use:motionSpring={{ opacity: [0, 1], y: [-12, 0], stiffness: 200, damping: 22, delay: 0.45 }}>
        <a class="primary-cta" href="/register">Register Child</a>
        <a class="secondary-cta" href="#teamup">Explore T.E.A.M.U.P.</a>
      </div>
      <div class="hero-meta" use:motionSpring={{ opacity: [0, 1], y: [-10, 0], stiffness: 180, damping: 20, delay: 0.6 }} aria-label="Event details">
        <span><CalendarDays size={16} />October 2026 Grand Finale</span>
        <span><MapPin size={16} />Abuja</span>
        <span><CircleCheck size={16} />Open Registration</span>
      </div>
      <p class="mystery" use:motionSpring={{ opacity: [0, 1], y: [-8, 0], stiffness: 200, damping: 22, delay: 0.75 }}>Featuring a Grand Finale unlike any other school chess championship.</p>
    </div>

    <div class="hero-visual">
      <div class="board-shell" use:motionScaleIn={{ stiffness: 100, damping: 12, delay: 0.35 }} aria-label="Animated chessboard preview">
        <div class="board-glow"></div>
        <div class="chessboard">
          {#each Array(64) as _, index}
            <span class:dark={(Math.floor(index / 8) + index) % 2 === 0}></span>
          {/each}
          <img class="piece piece-king" src="/pieces/gioco/wK.svg" alt="" />
          <img class="piece piece-queen" src="/pieces/gioco/bQ.svg" alt="" />
          <img class="piece piece-knight" src="/pieces/gioco/wN.svg" alt="" />
          <img class="piece piece-rook" src="/pieces/gioco/bR.svg" alt="" />
        </div>
        <div class="board-caption">
          <span>Development in progress</span>
          <strong>Level 4</strong>
        </div>
      </div>
    </div>
  </div>
</section>

<style>
  .hero {
    position: relative;
    min-height: 90vh;
    overflow: hidden;
    padding: 96px 0 72px;
  }

  .hero-bg {
    position: absolute;
    inset: 0;
    background:
      linear-gradient(90deg, rgba(7, 8, 7, 0.98) 0%, rgba(7, 8, 7, 0.86) 45%, rgba(7, 8, 7, 0.62) 100%),
      radial-gradient(circle at 76% 22%, rgba(242, 120, 48, 0.24), transparent 24%),
      linear-gradient(135deg, rgba(255, 255, 255, 0.06) 25%, transparent 25%) 0 0 / 72px 72px,
      linear-gradient(315deg, rgba(255, 255, 255, 0.045) 25%, transparent 25%) 0 0 / 72px 72px,
      #070807;
  }

  .hero-bg::after {
    position: absolute;
    inset: 0;
    background: radial-gradient(circle at center, transparent, rgba(0, 0, 0, 0.64));
    content: '';
  }

  .hero-grid {
    position: relative;
    z-index: 1;
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(340px, 0.72fr);
    gap: 56px;
    align-items: center;
  }

  .container {
    width: min(1180px, calc(100% - 40px));
    margin: 0 auto;
  }

  .eyebrow {
    display: inline-flex;
    width: fit-content;
    margin: 0;
    border: 1px solid rgba(255, 178, 0, 0.28);
    border-radius: 999px;
    background: rgba(255, 178, 0, 0.09);
    color: var(--accent-amber);
    padding: 7px 12px;
    font-size: 12px;
    font-weight: 900;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  .hero h1 {
    max-width: 760px;
    margin: 16px 0 0;
    color: var(--text);
    font-family: var(--font-championship), var(--font-registration), sans-serif;
    font-weight: 800;
    letter-spacing: 0;
    font-size: clamp(3.1rem, 7vw, 6.8rem);
    line-height: 0.98;
  }

  .hero h1 span {
    display: block;
  }

  .hero-lead {
    max-width: 610px;
    margin: 28px 0 0;
    color: #ded7ca;
    font-size: clamp(1.05rem, 2vw, 1.32rem);
    line-height: 1.6;
  }

  .cta-row {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 12px;
    margin-top: 30px;
  }

  .hero-meta {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 10px;
    margin-top: 30px;
  }

  .hero-meta span {
    display: inline-flex;
    align-items: center;
    gap: 7px;
    border: 1px solid rgba(255, 255, 255, 0.12);
    border-radius: 999px;
    background: rgba(255, 255, 255, 0.06);
    color: var(--muted-dark);
    padding: 8px 11px;
    font-size: 13px;
    font-weight: 700;
  }

  .mystery {
    max-width: 490px;
    margin: 22px 0 0;
    color: rgba(242, 120, 48, 0.78);
    font-size: 14px;
  }

  .board-shell {
    position: relative;
    border: 1px solid rgba(255, 255, 255, 0.14);
    border-radius: 12px;
    background: linear-gradient(180deg, rgba(255, 255, 255, 0.09), rgba(255, 255, 255, 0.035));
    padding: 28px;
    box-shadow: 0 40px 100px rgba(0, 0, 0, 0.48);
  }

  .board-glow {
    position: absolute;
    inset: 12%;
    border-radius: 999px;
    background: rgba(242, 120, 48, 0.18);
    filter: blur(40px);
  }

  .chessboard {
    position: relative;
    display: grid;
    grid-template-columns: repeat(8, 1fr);
    aspect-ratio: 1;
    overflow: hidden;
    border: 1px solid rgba(255, 255, 255, 0.18);
    border-radius: 8px;
    transform: perspective(950px) rotateX(54deg) rotateZ(-34deg);
  }

  .chessboard span {
    background: rgba(245, 239, 230, 0.12);
  }

  .chessboard span.dark {
    background: rgba(242, 120, 48, 0.22);
  }

  .piece {
    position: absolute;
    width: 12%;
    filter: drop-shadow(0 8px 18px rgba(0, 0, 0, 0.48));
    animation: piece-drift 7s ease-in-out infinite;
  }

  .piece-king { top: 13%; left: 18%; }
  .piece-queen { top: 26%; right: 24%; animation-delay: -1.4s; }
  .piece-knight { bottom: 18%; left: 36%; animation-delay: -2.8s; }
  .piece-rook { bottom: 26%; right: 12%; animation-delay: -4.2s; }

  .board-caption {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 20px;
    color: var(--muted-dark);
    font-size: 13px;
    font-weight: 800;
  }

  .board-caption strong {
    color: var(--primary);
  }

  .primary-cta {
    display: inline-flex;
    min-height: 48px;
    align-items: center;
    justify-content: center;
    border-radius: 8px;
    padding: 0 20px;
    font-size: 14px;
    font-weight: 800;
    border: 1px solid var(--primary);
    background: var(--primary);
    color: var(--on-primary);
    transition: transform 180ms ease;
  }

  .primary-cta:hover {
    transform: translateY(-2px);
  }

  .secondary-cta {
    display: inline-flex;
    min-height: 48px;
    align-items: center;
    justify-content: center;
    border-radius: 8px;
    padding: 0 20px;
    font-size: 14px;
    font-weight: 800;
    border: 1px solid var(--primary);
    background: rgba(255, 255, 255, 0.06);
    color: var(--text);
    transition: transform 180ms ease;
  }

  .secondary-cta:hover {
    transform: translateY(-2px);
  }

  @keyframes piece-drift {
    0%, 100% {
      transform: translate3d(0, 0, 0) scale(1);
    }
    50% {
      transform: translate3d(8px, -10px, 0) scale(1.04);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .piece {
      animation: none !important;
    }
  }

  @media (max-width: 1023px) {
    .hero-grid {
      grid-template-columns: 1fr;
    }
  }

  @media (max-width: 700px) {
    .container {
      width: min(100% - 28px, 1180px);
    }

    .hero {
      min-height: auto;
      padding: 56px 0 64px;
    }

    .hero-grid {
      gap: 34px;
    }

    .hero h1 {
      font-size: 3rem;
    }

    .hero-meta span {
      width: 100%;
      justify-content: center;
    }

    .board-shell {
      padding: 18px;
    }
  }
</style>
