<script lang="ts">
  import ProgressChart from '$lib/components/home/illustrations/ProgressChart.svelte'
  import { Award, Zap, Flag, ScrollText, BarChart3, Eye } from '@lucide/svelte'

  const badges = [
    { letter: 'T', color: 'var(--primary)' },
    { letter: 'E', color: 'var(--accent-amber)' },
    { letter: 'A', color: '#8b5cf6' },
    { letter: 'M', color: '#3b82f6' },
    { letter: 'U', color: 'var(--accent-teal)' },
    { letter: 'P', color: 'var(--primary)' },
  ]

  const features = [
    { icon: Flag, label: 'Milestones' },
    { icon: Award, label: 'Badges' },
    { icon: ScrollText, label: 'Certificates' },
    { icon: BarChart3, label: 'Reports' },
    { icon: Eye, label: 'Parent Access' },
  ]
</script>

<section class="section-band section-dark">
  <div class="container">
    <!-- HEADER -->
    <h2 class="display-lg" style="margin: 0 0 12px; color: var(--on-dark)">
      Track Growth Beyond The Chessboard
    </h2>
    <p class="lead" style="max-width: 560px; color: var(--on-dark-soft)">
      Every achievement tracked. Every milestone celebrated. Every step of your child's journey, visible at a glance.
    </p>

    <!-- PROGRESS CHART SVG -->
    <div class="chart-wrap">
      <ProgressChart progress={72} level="4: Innovator" badges={12} xp={3450} />
    </div>

    <!-- BADGE LETTERS ROW -->
    <div class="badge-row">
      {#each badges as { letter, color }}
        <div class="badge-circle" style="background: {color};">
          {letter}
        </div>
      {/each}
    </div>

    <!-- STATS ROW -->
    <div class="stats-row">
      <div class="stat-item">
        <Award size={18} color="var(--primary)" />
        <span>Badges Earned: 12</span>
      </div>
      <div class="stat-item">
        <Zap size={18} color="var(--accent-amber)" />
        <span>XP: 3,450</span>
      </div>
    </div>

    <!-- FEATURE LINKS -->
    <div class="feature-grid">
      {#each features as { icon: Icon, label }}
        <a href="#_" class="feature-link">
          <Icon size={20} color="var(--primary)" />
          <span class="feature-label">{label}</span>
        </a>
      {/each}
    </div>
  </div>
</section>

<style>
  .chart-wrap {
    margin-top: 48px;
  }

  .badge-row {
    display: flex;
    justify-content: center;
    gap: 12px;
    margin-top: 32px;
  }

  .badge-circle {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 14px;
    font-weight: 700;
  }

  .stats-row {
    display: flex;
    justify-content: center;
    gap: 32px;
    margin-top: 24px;
  }

  .stat-item {
    display: flex;
    align-items: center;
    gap: 8px;
    color: var(--on-dark);
    font-size: 14px;
    font-weight: 500;
  }

  .feature-grid {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 12px;
    margin-top: 48px;
  }

  .feature-link {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    padding: 16px;
    border-radius: 8px;
    background: var(--surface-dark-elevated);
    border: 1px solid rgba(255, 255, 255, 0.05);
    color: var(--on-dark-soft);
    text-decoration: none;
    transition: border-color 160ms ease;
  }

  .feature-link:hover {
    border-color: rgba(255, 255, 255, 0.2);
  }

  .feature-label {
    font-size: 13px;
    font-weight: 500;
    color: var(--on-dark);
  }

  @media (max-width: 640px) {
    .feature-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }
</style>
