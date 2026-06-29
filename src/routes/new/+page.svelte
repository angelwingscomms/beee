<script lang="ts">
  import { fly } from 'svelte/transition';
  import { observe } from '$lib/actions/observe';

  function blur(node: Element, { delay = 0, duration = 800, amount = 6 } = {}) {
    return {
      delay,
      duration,
      css: (t: number) => `
        opacity: ${t};
        filter: blur(${(1 - t) * amount}px);
      `
    };
  }

  function handleCtaClick() {
    document.getElementById('philosophy')?.scrollIntoView({ behavior: 'smooth' });
  }
</script>

<svelte:head>
  <title>BEEE Spectacular Chess Championship Abuja 2026</title>
</svelte:head>

<main class="page">
  <section class="hero">
    <div class="board-wrapper">
      <div class="chess-grid" use:observe>
        {#each Array(64) as _, i}
          <div class="square" class:dark={(Math.floor(i / 8) + (i % 8)) % 2 === 0}></div>
        {/each}

        <div class="pawn-wrapper" in:fly={{ x: -200, y: 0, duration: 1200, delay: 300 }}>
          <svg viewBox="0 0 32 48" class="pawn" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="pawnGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="#f5d78e"/>
                <stop offset="40%" stop-color="#d4a34e"/>
                <stop offset="70%" stop-color="#b8862d"/>
                <stop offset="100%" stop-color="#8b6914"/>
              </linearGradient>
            </defs>
            <path d="M16 2c-1.7 0-3 1.3-3 3 0 .6.2 1.2.5 1.7-2.2 1.2-3.7 3.6-3.7 6.3 0 2.5 1.3 4.8 3.3 6-2.5 1.2-4.2 3.7-4.2 6.6 0 .5.1 1 .2 1.5H6v4h20v-4h-3.1c.1-.5.2-1 .2-1.5 0-2.9-1.7-5.4-4.2-6.6 2-1.2 3.3-3.5 3.3-6 0-2.7-1.5-5.1-3.7-6.3.3-.5.5-1.1.5-1.7 0-1.7-1.3-3-3-3z" fill="url(#pawnGrad)"/>
            <rect x="6" y="38" width="20" height="4" rx="1" fill="url(#pawnGrad)"/>
            <rect x="9" y="42" width="14" height="3" rx="1" fill="url(#pawnGrad)"/>
          </svg>
        </div>
      </div>
    </div>

    <div class="hero-text">
      <h1 class="title" in:blur={{ delay: 600, amount: 8 }}>
        BEEE SPECTACULAR CHESS<br>
        CHAMPIONSHIP ABUJA 2026
      </h1>
      <h2 class="subtitle" in:blur={{ delay: 1000, amount: 6 }}>
        More Than a Chess Championship
      </h2>
    </div>

    <div class="cta-square" on:click={handleCtaClick} use:observe>
      <span class="cta-label">Make Your Move</span>
    </div>
  </section>

  <section id="philosophy"></section>
</main>

<style>
  :global(body) {
    background-color: #050505;
    color: #f0f0f0;
    overflow-x: hidden;
    cursor: default;
  }

  .page {
    width: 100vw;
    min-height: 100vh;
    position: relative;
  }

  .hero {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    gap: 32px;
    padding: 40px 20px;
    position: relative;
  }

  .board-wrapper {
    position: relative;
  }

  .chess-grid {
    display: grid;
    grid-template-columns: repeat(8, 1fr);
    width: 400px;
    height: 400px;
    position: relative;
    overflow: hidden;
  }

  .chess-grid::before {
    content: '';
    position: absolute;
    inset: -50%;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(245, 215, 142, 0.08), transparent 60%);
    animation: ripple 2.5s ease-out forwards;
    pointer-events: none;
    z-index: 1;
  }

  @keyframes ripple {
    0% {
      transform: scale(0.3);
      opacity: 1;
    }
    100% {
      transform: scale(1);
      opacity: 0;
    }
  }

  .square {
    border: 1px solid rgba(255, 255, 255, 0.06);
    background: rgba(255, 255, 255, 0.02);
    transition: background 0.3s ease;
  }

  .square.dark {
    background: rgba(255, 255, 255, 0.06);
  }

  .pawn-wrapper {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 2;
    width: 48px;
    height: 72px;
  }

  .pawn {
    width: 100%;
    height: 100%;
    filter: drop-shadow(0 0 12px rgba(212, 163, 78, 0.4));
  }

  .hero-text {
    text-align: center;
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .title {
    margin: 0;
    font-family: 'Playfair Display', 'Cormorant Garamond', serif;
    font-weight: 900;
    font-size: 42px;
    line-height: 1.15;
    letter-spacing: 0.04em;
    color: #f0f0f0;
  }

  .subtitle {
    margin: 0;
    font-family: 'Playfair Display', 'Cormorant Garamond', serif;
    font-weight: 500;
    font-size: 20px;
    letter-spacing: 0.12em;
    color: rgba(245, 215, 142, 0.7);
    font-style: italic;
  }

  .cta-square {
    width: 60px;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid rgba(245, 215, 142, 0.3);
    background: rgba(245, 215, 142, 0.06);
    cursor: pointer;
    transition: box-shadow 0.4s ease, background 0.4s ease, border-color 0.4s ease;
    position: relative;
  }

  .cta-square:hover {
    box-shadow:
      0 0 20px rgba(245, 215, 142, 0.25),
      0 0 40px rgba(245, 215, 142, 0.1),
      inset 0 0 20px rgba(245, 215, 142, 0.08);
    background: rgba(245, 215, 142, 0.1);
    border-color: rgba(245, 215, 142, 0.5);
  }

  .cta-label {
    font-family: 'Playfair Display', 'Cormorant Garamond', serif;
    font-size: 9px;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: rgba(245, 215, 142, 0.8);
    white-space: nowrap;
  }

  #philosophy {
    height: 100vh;
  }
</style>
