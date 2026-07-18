<script lang="ts">
  import { ChevronDown } from '@lucide/svelte';
  import { motionStaggered } from '$lib/actions/motion';
</script>

<section class="journey">
  <div class="container journey-inner">
    <div class="journey-flow" use:motionStaggered={{ stagger: 0.12, y: 20 }}>
      <div class="step">
        <span class="step-num">01</span>
        <span class="step-label">Register</span>
      </div>
      <div class="step-arrow"><ChevronDown size={20} /></div>
      <div class="step">
        <span class="step-num">02</span>
        <span class="step-label">TEAMUP Development</span>
      </div>
      <div class="step-arrow"><ChevronDown size={20} /></div>
      <div class="step">
        <span class="step-num">03</span>
        <span class="step-label">Championship Rounds</span>
      </div>
      <div class="step-arrow"><ChevronDown size={20} /></div>
      <div class="step">
        <span class="step-num">04</span>
        <span class="step-label">Grand Finale</span>
      </div>
    </div>
    <p class="journey-tagline">A championship experience unlike any other.</p>
  </div>
</section>

<style>
  .journey {
    padding: 96px 0;
    background: var(--canvas);
  }

  .journey-inner {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: min(1200px, calc(100% - 48px));
    margin: 0 auto;
  }

  .journey-flow {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    gap: 0;
    width: 100%;
  }

  .step {
    display: flex;
    align-items: center;
    gap: 14px;
    padding: 18px 32px;
    border-radius: 12px;
    background: var(--surface-card);
    justify-content: center;
    transition: transform 240ms ease, box-shadow 240ms ease;
  }

  .step:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(242, 120, 48, 0.08);
  }

  .step-num {
    font-size: 13px;
    font-weight: 600;
    color: var(--primary);
    font-variant-numeric: tabular-nums;
  }

  .step-label {
    font-size: 15px;
    font-weight: 500;
    color: var(--ink);
  }

  .step-arrow {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 8px 0;
    color: var(--muted-soft);
  }

  .journey-tagline {
    font-family: var(--font-sans);
    font-size: 18px;
    font-weight: 500;
    color: var(--muted);
    margin: 32px 0 0;
    text-align: center;
  }

  @media (--md-up) {
    .journey-flow {
      flex-direction: row;
      gap: 16px;
    }
    .step-arrow {
      display: none;
    }
    .step {
      min-width: 0;
      flex: 1;
    }
  }

  @media (--sm-down) {
    .journey {
      padding: 64px 0;
    }
    .step {
      padding: 14px 24px;
    }
    .step-label {
      font-size: 14px;
    }
  }
</style>
