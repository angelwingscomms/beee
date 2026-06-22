<script lang="ts">
  import { Sword, TrendingUp, Trophy } from '@lucide/svelte';
  import { motionStaggered } from '$lib/actions/motion';
</script>

<section class="pillars" use:motionStaggered={{ stagger: 0.1, y: 24 }}>
  <div class="container">
    <div class="pillars-grid">
      <div class="pillar-card">
        <div class="pillar-icon"><Sword size={24} /></div>
        <h3 class="pillar-title">Compete</h3>
        <p class="pillar-body">Test your skills against talented students from across Abuja.</p>
      </div>
      <div class="pillar-card">
        <div class="pillar-icon"><TrendingUp size={24} /></div>
        <h3 class="pillar-title">Develop</h3>
        <p class="pillar-body">Build leadership, creativity, critical thinking, and problem-solving skills.</p>
      </div>
      <div class="pillar-card">
        <div class="pillar-icon"><Trophy size={24} /></div>
        <h3 class="pillar-title">Excel</h3>
        <p class="pillar-body">Earn achievements, recognition, and championship honours.</p>
      </div>
    </div>
  </div>
</section>

<style>
  .pillars {
    padding: 96px 0;
    background: var(--canvas);
  }

  .pillars-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 24px;
  }

  .pillar-card {
    border-radius: 12px;
    background: var(--surface-card);
    padding: 32px;
    transition: transform 240ms ease, box-shadow 240ms ease, background 240ms ease;
  }

  .pillar-card:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 28px rgba(242, 120, 48, 0.08);
    background: color-mix(in srgb, var(--surface-card) 94%, var(--primary));
  }

  .pillar-icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 44px;
    height: 44px;
    border-radius: 10px;
    background: var(--primary);
    color: var(--on-primary);
    margin-bottom: 20px;
  }

  .pillar-title {
    font-family: var(--font-sans);
    font-size: 18px;
    font-weight: 600;
    color: var(--ink);
    margin: 0;
  }

  .pillar-body {
    font-size: 15px;
    line-height: 1.55;
    color: var(--body);
    margin: 10px 0 0;
  }

  @media (max-width: 767px) {
    .pillars {
      padding: 64px 0;
    }
    .pillars-grid {
      grid-template-columns: 1fr;
      gap: 16px;
    }
  }

  @media (min-width: 768px) and (max-width: 1023px) {
    .pillars-grid {
      grid-template-columns: repeat(2, 1fr);
    }
    .pillars-grid > :last-child {
      grid-column: 1 / -1;
      max-width: 480px;
      justify-self: center;
    }
  }
</style>
