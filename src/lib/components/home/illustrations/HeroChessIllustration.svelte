<script lang="ts">
  const s = 25;
  const half = 100;
  let dark_squares: { x: number; y: number }[] = [];
  for (let r = 0; r < 8; r++) {
    for (let c = 0; c < 8; c++) {
      if ((r + c) % 2 === 0) {
        dark_squares.push({ x: c * s - half, y: r * s - half });
      }
    }
  }
</script>

<div class="hero-chess-wrap">
  <svg viewBox="0 0 420 440" fill="none" xmlns="http://www.w3.org/2000/svg" class="hero-chess-svg">
    <defs>
      <radialGradient id="cg-glow" cx="50%" cy="45%" r="55%">
        <stop offset="0%" stop-color="var(--primary-light)" stop-opacity="0.3" />
        <stop offset="40%" stop-color="var(--primary)" stop-opacity="0.1" />
        <stop offset="100%" stop-color="var(--primary)" stop-opacity="0" />
      </radialGradient>
      <linearGradient id="cb-base" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="var(--surface-dark-soft)" />
        <stop offset="100%" stop-color="var(--surface-dark)" />
      </linearGradient>
    </defs>

    <!-- Warm ambient glow -->
    <ellipse cx="200" cy="250" rx="190" ry="170" fill="url(#cg-glow)" />

    <!-- Board 3D depth - left face -->
    <polygon points="58.6,260 200,323.6 200,338.6 58.6,275" fill="var(--surface-dark-elevated)" />
    <!-- Board 3D depth - right face -->
    <polygon points="200,323.6 341.4,260 341.4,275 200,338.6" fill="var(--surface-dark)" />

    <!-- Isometric board surface -->
    <g transform="translate(200, 260) scale(1, 0.45) rotate(45)">
      <!-- Board base plate -->
      <rect x="-104" y="-104" width="208" height="208" fill="url(#cb-base)" rx="2" />
      <!-- Checker pattern - dark squares -->
      {#each dark_squares as sq}
        <rect x={sq.x} y={sq.y} width="25" height="25" fill="var(--primary)" opacity="0.28" />
      {/each}
      <!-- Board rim -->
      <rect
        x="-104"
        y="-104"
        width="208"
        height="208"
        fill="none"
        stroke="var(--on-dark)"
        stroke-opacity="0.08"
        stroke-width="2"
        rx="2"
      />
    </g>

    <!-- King -->
    <g transform="translate(245, 252)">
      <ellipse cx="0" cy="24" rx="16" ry="5" fill="rgba(0,0,0,0.28)" />
      <g class="piece-float">
        <path
          d="M-14,22 L-14,8 L-10,0 L-7,-4 L-7,-12 Q0,-18 7,-12 L7,-4 L10,0 L14,8 L14,22 Z"
          fill="var(--on-dark)"
        />
        <line x1="0" y1="-14" x2="0" y2="-28" stroke="var(--on-dark)" stroke-width="2.5" stroke-linecap="round" />
        <line x1="-5" y1="-21" x2="5" y2="-21" stroke="var(--on-dark)" stroke-width="2.5" stroke-linecap="round" />
        <circle cx="0" cy="-14" r="2" fill="var(--accent-amber)" />
      </g>
    </g>

    <!-- Knight -->
    <g transform="translate(162, 246)">
      <ellipse cx="0" cy="24" rx="14" ry="4" fill="rgba(0,0,0,0.28)" />
      <g class="piece-float" style="animation-delay: -1.5s">
        <path
          d="M-12,22 L-12,10 Q-14,-2 -8,-14 Q-4,-22 4,-18 Q10,-14 8,-6 Q6,0 10,8 L12,22 Z"
          fill="var(--on-dark)"
        />
        <circle cx="-2" cy="-11" r="1.5" fill="var(--surface-dark)" />
        <!-- Mane accent -->
        <path d="M4,-18 Q8,-16 6,-12" stroke="var(--primary)" stroke-width="1.5" fill="none" />
      </g>
    </g>

    <!-- Pawn -->
    <g transform="translate(210, 292)">
      <ellipse cx="0" cy="20" rx="12" ry="4" fill="rgba(0,0,0,0.28)" />
      <g class="piece-float" style="animation-delay: -3s">
        <path
          d="M-10,20 L-10,6 Q-7,0 -3,-2 Q0,-4 0,-10 Q0,-4 3,-2 Q7,0 10,6 L10,20 Z"
          fill="var(--on-dark)"
        />
        <circle cx="0" cy="-12" r="5.5" fill="var(--on-dark)" />
      </g>
    </g>
  </svg>
</div>

<style>
  .hero-chess-wrap {
    width: 100%;
    max-width: 420px;
    height: auto;
    margin: 0 auto;
  }
  .hero-chess-svg {
    width: 100%;
    height: auto;
    display: block;
  }
  .piece-float {
    animation: p-float 4s ease-in-out infinite;
    transform-origin: center bottom;
  }
  @keyframes p-float {
    0%,
    100% {
      translate: 0 0;
    }
    50% {
      translate: 0 -7px;
    }
  }
  @media (prefers-reduced-motion: reduce) {
    .piece-float {
      animation: none;
    }
  }
</style>
