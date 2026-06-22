<script lang="ts">
  const skills = [
    { l: 'Strategy', p: 85, c: 'var(--primary)' },
    { l: 'Tactics', p: 72, c: 'var(--accent-teal)' },
    { l: 'Leadership', p: 64, c: 'var(--accent-amber)' },
  ];

  const checks = ['Tournament Ready', 'Passport Complete', 'Mentor Review Passed'];
  const stats = [
    { v: '12', l: 'Badges' },
    { v: '89%', l: 'Attendance' },
    { v: '15%', l: 'Top Rank' },
  ];
</script>

<div class="pd-wrap">
  <svg viewBox="0 0 340 400" fill="none" xmlns="http://www.w3.org/2000/svg" class="pd-svg">
    <!-- Card background -->
    <rect x="10" y="10" width="320" height="380" rx="16" fill="var(--surface-dark-elevated)" stroke-opacity="0.06" stroke="var(--on-dark)" stroke-width="1" />
    <!-- Subtle inner highlight -->
    <rect x="10" y="10" width="320" height="380" rx="16" fill="url(#pd-bg)" />

    <defs>
      <linearGradient id="pd-bg" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="var(--on-dark)" stop-opacity="0.03" />
        <stop offset="100%" stop-color="var(--on-dark)" stop-opacity="0" />
      </linearGradient>
    </defs>

    <!-- Top bar: status dot + "Dashboard" label -->
    <g transform="translate(24, 28)">
      <text x="0" y="0" fill="var(--on-dark-soft)" font-size="11" font-weight="500" letter-spacing="0.8">
        DASHBOARD
      </text>
      <circle cx="102" cy="-3" r="4" fill="var(--accent-teal)" />
    </g>

    <!-- Child avatar + name -->
    <g transform="translate(24, 62)">
      <!-- Avatar circle -->
      <circle cx="20" cy="20" r="20" fill="var(--primary)" fill-opacity="0.2" />
      <text x="20" y="26" text-anchor="middle" fill="var(--primary)" font-size="18" font-weight="600">A</text>
      <!-- Name -->
      <text x="52" y="17" fill="var(--on-dark)" font-size="16" font-weight="600">Aisha M.</text>
      <!-- Level tag -->
      <g transform="translate(52, 26)">
        <rect x="0" y="-8" width="72" height="16" rx="8" fill="var(--primary)" fill-opacity="0.12" />
        <text x="36" y="3" text-anchor="middle" fill="var(--primary)" font-size="9" font-weight="600">Level 4 Innovator</text>
      </g>
    </g>

    <!-- Progress bar (overall) -->
    <g transform="translate(24, 120)">
      <text x="0" y="0" fill="var(--on-dark-soft)" font-size="11" font-weight="500">Overall Progress</text>
      <text x="280" y="0" text-anchor="end" fill="var(--primary)" font-size="11" font-weight="600">72%</text>
      <!-- Track -->
      <rect x="0" y="10" width="292" height="6" rx="3" fill="var(--on-dark)" fill-opacity="0.08" />
      <!-- Fill -->
      <rect x="0" y="10" width="210" height="6" rx="3" fill="var(--primary)" />
    </g>

    <!-- Skill progress bars -->
    <g transform="translate(24, 158)">
      <text x="0" y="0" fill="var(--on-dark-soft)" font-size="10" font-weight="500" letter-spacing="0.5">SKILL BREAKDOWN</text>
      {#each skills as s, i}
        <g transform="translate(0, {i * 32 + 22})">
          <!-- Label -->
          <text x="0" y="0" fill="var(--on-dark)" font-size="12" font-weight="500">{s.l}</text>
          <!-- Track -->
          <rect x="0" y="8" width="292" height="5" rx="2.5" fill="var(--on-dark)" fill-opacity="0.06" />
          <!-- Fill -->
          <rect x="0" y="8" width="{s.p * 2.92}" height="5" rx="2.5" fill={s.c} />
          <!-- Percentage label -->
          <text x="304" y="-2" fill={s.c} font-size="11" font-weight="600">{s.p}%</text>
        </g>
      {/each}
    </g>

    <!-- Stats row -->
    <g transform="translate(24, 278)">
      <text x="0" y="0" fill="var(--on-dark-soft)" font-size="10" font-weight="500" letter-spacing="0.5">QUICK STATS</text>
      {#each stats as stat, i}
        <g transform="translate({i * 100}, 16)">
          <text x="0" y="0" fill="var(--on-dark)" font-size="22" font-weight="600">{stat.v}</text>
          <text x="0" y="16" fill="var(--on-dark-soft)" font-size="11" font-weight="500">{stat.l}</text>
        </g>
      {/each}
    </g>

    <!-- Checkmark list -->
    <g transform="translate(24, 342)">
      <text x="0" y="0" fill="var(--on-dark-soft)" font-size="10" font-weight="500" letter-spacing="0.5">RECENT ACHIEVEMENTS</text>
      {#each checks as ch, i}
        <g transform="translate(0, {i * 24 + 20})">
          <!-- Check circle -->
          <circle cx="7" cy="0" r="7" fill="var(--accent-teal)" fill-opacity="0.15" />
          <path d="M3.5,0 L5.5,2 L10.5,-2.5" stroke="var(--accent-teal)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" fill="none" />
          <text x="22" y="4" fill="var(--on-dark-soft)" font-size="12" font-weight="400">{ch}</text>
        </g>
      {/each}
    </g>
  </svg>
</div>

<style>
  .pd-wrap {
    width: 100%;
    max-width: 340px;
    height: auto;
    margin: 0 auto;
  }
  .pd-svg {
    width: 100%;
    height: auto;
    display: block;
  }
</style>
