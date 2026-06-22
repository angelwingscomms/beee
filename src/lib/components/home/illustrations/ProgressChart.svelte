<script lang="ts">
  let {
    progress = 72,
    level = 'Innovator',
    badges = 12,
    xp = 3450,
  }: { progress?: number; level?: string; badges?: number; xp?: number } = $props();

  const r = 64;
  const circ = 2 * Math.PI * r;
  let dash = $derived((progress / 100) * circ);
  let gap = $derived(circ - dash);

  const bars = [
    { h: 28, label: 'T' },
    { h: 40, label: 'E' },
    { h: 34, label: 'A' },
    { h: 22, label: 'M' },
    { h: 44, label: 'U' },
    { h: 36, label: 'P' },
  ];
</script>

<div class="pc-wrap">
  <svg viewBox="0 0 300 360" fill="none" xmlns="http://www.w3.org/2000/svg" class="pc-svg">
    <!-- Background card -->
    <rect x="10" y="10" width="280" height="340" rx="16" fill="var(--surface-dark-elevated)" />
    <rect
      x="10"
      y="10"
      width="280"
      height="340"
      rx="16"
      stroke="var(--on-dark)"
      stroke-opacity="0.06"
      stroke-width="1"
    />

    <!-- Radial progress ring -->
    <g transform="translate(150, 145)">
      <!-- Background ring -->
      <circle cx="0" cy="0" r={r} stroke="var(--on-dark)" stroke-opacity="0.08" stroke-width="10" fill="none" />
      <!-- Progress arc -->
      <circle
        cx="0"
        cy="0"
        r={r}
        stroke="var(--primary)"
        stroke-width="10"
        stroke-linecap="round"
        fill="none"
        transform="rotate(-90)"
        stroke-dasharray="{dash} {gap}"
      />
      <!-- Glow behind the leading edge of the arc -->
      <circle
        cx="0"
        cy="0"
        r={r}
        stroke="var(--primary)"
        stroke-opacity="0.3"
        stroke-width="14"
        stroke-linecap="round"
        fill="none"
        transform="rotate(-90)"
        stroke-dasharray="6 {circ}"
        stroke-dashoffset={-dash + 3}
      />

      <!-- Center: percentage -->
      <text x="0" y="-6" text-anchor="middle" fill="var(--on-dark)" font-size="38" font-weight="600" font-family="var(--font-display)">
        {progress}%
      </text>
      <text x="0" y="16" text-anchor="middle" fill="var(--on-dark-soft)" font-size="12" font-weight="500">
        Complete
      </text>
    </g>

    <!-- Bar chart row -->
    <g transform="translate(45, 240)">
      <text x="0" y="-12" fill="var(--on-dark-soft)" font-size="11" font-weight="500" letter-spacing="1">
        T.E.A.M.U.P. SCORE
      </text>
      {#each bars as bar, i}
        <g transform="translate({i * 34 + 4}, 0)">
          <rect
            x="0"
            y={-bar.h}
            width="20"
            ry="3"
            height={bar.h}
            fill="var(--primary)"
            fill-opacity={0.3 + (bar.h / 50) * 0.5}
          />
          <text
            x="10"
            y="6"
            text-anchor="middle"
            fill="var(--on-dark-soft)"
            font-size="10"
            font-weight="500"
          >
            {bar.label}
          </text>
        </g>
      {/each}
    </g>

    <!-- Badge icons row -->
    <g transform="translate(40, 298)">
      <!-- Star badge -->
      <g transform="translate(0, 0)">
        <circle cx="0" cy="0" r="14" fill="var(--accent-amber)" fill-opacity="0.15" />
        <path d="M0,-8 L1.8,-2.5 L7.6,-2.5 L3,1 L4.7,6.5 L0,3.2 L-4.7,6.5 L-3,1 L-7.6,-2.5 L-1.8,-2.5 Z" fill="var(--accent-amber)" />
      </g>
      <!-- Shield badge -->
      <g transform="translate(48, 0)">
        <circle cx="0" cy="0" r="14" fill="var(--accent-teal)" fill-opacity="0.15" />
        <path d="M0,-9 L7,-5.5 L7,1.5 Q7,7 0,10 Q-7,7 -7,1.5 L-7,-5.5 Z" fill="var(--accent-teal)" />
        <path d="M-3,0 L-0.5,2.5 L3,-2" stroke="var(--surface-dark)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" fill="none" />
      </g>
      <!-- Trophy badge -->
      <g transform="translate(96, 0)">
        <circle cx="0" cy="0" r="14" fill="var(--primary)" fill-opacity="0.15" />
        <path d="M-5,-6 L5,-6 L5,0 Q5,5 0,6 Q-5,5 -5,0 Z" fill="var(--primary)" />
        <path d="M-3,6 L3,6 L2,9 L-2,9 Z" fill="var(--primary)" />
        <rect x="-7" y="-8" width="2" height="3" rx="1" fill="var(--primary)" />
        <rect x="5" y="-8" width="2" height="3" rx="1" fill="var(--primary)" />
      </g>
      <!-- XP stat -->
      <g transform="translate(148, 0)">
        <text x="0" y="-4" fill="var(--on-dark-soft)" font-size="10" font-weight="500">XP</text>
        <text x="0" y="12" fill="var(--on-dark)" font-size="16" font-weight="600">{xp.toLocaleString()}</text>
      </g>
    </g>

    <!-- Level badge -->
    <g transform="translate(150, 58)">
      <rect x="-44" y="-11" width="88" height="22" rx="11" fill="var(--primary)" fill-opacity="0.15" />
      <text x="0" y="4" text-anchor="middle" fill="var(--primary)" font-size="11" font-weight="600" letter-spacing="0.5">
        Level {level}
      </text>
    </g>
  </svg>
</div>

<style>
  .pc-wrap {
    width: 100%;
    max-width: 300px;
    height: auto;
    margin: 0 auto;
  }
  .pc-svg {
    width: 100%;
    height: auto;
    display: block;
  }
</style>
