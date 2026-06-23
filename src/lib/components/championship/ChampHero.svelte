<script lang="ts">
  import { motionFadeUp } from '$lib/actions/motion';
</script>

<section class="champ-hero" use:motionFadeUp>
  <div class="champ-hero-bg"></div>
  <div class="champ-hero-inner container">
    <div class="champ-hero-content">
      <p class="champ-hero-eyebrow">BEEE Spectacular Chess Championship Abuja 2026</p>
      <h1 class="champ-hero-title">More Than A Chess Championship</h1>
      <p class="champ-hero-body">
        A unique youth development initiative that combines competitive chess with structured learning,
        mentorship, leadership development, and personal growth.
      </p>
      <div class="champ-hero-actions">
        <a href="/register" class="button-primary champ-hero-btn">Register Now</a>
        <a href="#about" class="button-secondary champ-hero-btn">Learn More</a>
      </div>
    </div>
    <div class="champ-hero-visual">
      <div class="champ-hero-board">
        <div class="board-plane"></div>
        <div class="champ-hero-pieces">
          <span class="champ-piece champ-piece-k">&#9818;</span>
          <span class="champ-piece champ-piece-q">&#9819;</span>
          <span class="champ-piece champ-piece-r">&#9820;</span>
          <span class="champ-piece champ-piece-b">&#9821;</span>
          <span class="champ-piece champ-piece-n">&#9822;</span>
          <span class="champ-piece champ-piece-p">&#9823;</span>
        </div>
      </div>
    </div>
  </div>
</section>

<style>
  .champ-hero {
    position: relative;
    min-height: 100dvh;
    display: flex;
    align-items: center;
    overflow: hidden;
    background: var(--canvas);
    padding-top: 72px;
  }

  .champ-hero-bg {
    position: absolute;
    inset: 0;
    pointer-events: none;
    background:
      radial-gradient(ellipse 70% 60% at 80% 30%, rgba(242, 120, 48, 0.06), transparent 70%),
      radial-gradient(ellipse 50% 50% at 10% 70%, rgba(255, 178, 0, 0.04), transparent 60%);
  }

  .champ-hero-inner {
    position: relative;
    z-index: 1;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 64px;
    align-items: center;
    padding: 80px 0;
  }

  .champ-hero-content {
    max-width: 520px;
  }

  .champ-hero-eyebrow {
    font-size: 13px;
    font-weight: 500;
    color: var(--muted);
    margin: 0 0 20px;
    letter-spacing: 0.03em;
    text-transform: uppercase;
  }

  .champ-hero-title {
    font-family: var(--font-display);
    font-size: clamp(2.6rem, 4.5vw, 4rem);
    font-weight: 500;
    line-height: 1.08;
    letter-spacing: -0.02em;
    color: var(--ink);
    margin: 0;
    max-width: 600px;
    text-wrap: balance;
  }

  .champ-hero-body {
    font-size: 17px;
    line-height: 1.6;
    color: var(--body);
    margin: 24px 0 0;
    max-width: 480px;
  }

  .champ-hero-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    margin-top: 36px;
  }

  .champ-hero-btn {
    min-height: 44px;
    padding: 12px 24px;
  }

  .champ-hero-visual {
    position: relative;
    display: grid;
    place-items: center;
    min-height: 480px;
  }

  .champ-hero-board {
    position: relative;
    width: min(100%, 420px);
    aspect-ratio: 1;
    perspective: 1000px;
  }

  .board-plane {
    position: absolute;
    inset: 0;
    transform: rotateX(58deg) rotateZ(-35deg);
    transform-style: preserve-3d;
    border-radius: 8px;
    border: 1px solid rgba(0, 0, 0, 0.08);
    background:
      linear-gradient(90deg, var(--hairline) 1px, transparent 1px),
      linear-gradient(var(--hairline) 1px, transparent 1px),
      linear-gradient(135deg, rgba(242, 120, 48, 0.08), rgba(250, 249, 245, 0.9));
    background-size: 12.5% 12.5%, 12.5% 12.5%, 100% 100%;
    box-shadow:
      0 30px 80px rgba(0, 0, 0, 0.10),
      inset 0 1px 0 rgba(255, 255, 255, 0.4);
  }

  .board-plane::after {
    position: absolute;
    inset: 12%;
    border: 1px solid rgba(242, 120, 48, 0.15);
    border-radius: 4px;
    content: '';
  }

  .champ-hero-pieces {
    position: absolute;
    inset: 0;
    transform: rotateX(58deg) rotateZ(-35deg);
    transform-style: preserve-3d;
  }

  .champ-piece {
    position: absolute;
    font-size: 32px;
    line-height: 1;
    color: var(--primary);
    opacity: 0.5;
  }

  .champ-piece-k { top: 18%; left: 38%; font-size: 38px; opacity: 0.7; }
  .champ-piece-q { top: 28%; left: 58%; font-size: 34px; opacity: 0.4; }
  .champ-piece-r { top: 50%; left: 22%; font-size: 28px; opacity: 0.3; }
  .champ-piece-b { top: 62%; left: 52%; font-size: 26px; opacity: 0.35; }
  .champ-piece-n { top: 40%; left: 72%; font-size: 30px; opacity: 0.25; }
  .champ-piece-p { top: 72%; left: 36%; font-size: 24px; opacity: 0.2; }

  @media (max-width: 1024px) {
    .champ-hero-inner {
      grid-template-columns: 1fr;
      gap: 48px;
      padding: 64px 0;
    }
    .champ-hero-content {
      max-width: none;
    }
    .champ-hero-visual {
      min-height: 360px;
    }
    .champ-hero-board {
      width: min(80%, 340px);
    }
  }

  @media (max-width: 767px) {
    .champ-hero-title {
      font-size: clamp(2rem, 8vw, 2.8rem);
    }
    .champ-hero-body {
      font-size: 15px;
    }
    .champ-hero-visual {
      min-height: 280px;
    }
    .champ-piece { font-size: 20px; }
    .champ-piece-k { font-size: 26px; }
    .champ-piece-q { font-size: 24px; }
  }
</style>
