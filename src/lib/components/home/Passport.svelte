<script lang="ts">
  import { Check } from '@lucide/svelte';
  import { motionStaggered } from '$lib/actions/motion';
</script>

<section class="passport">
  <div class="container passport-inner">
    <h2 class="passport-title">Development Passport</h2>
    <p class="passport-intro">Participants earn:</p>
    <div class="passport-grid" use:motionStaggered={{ stagger: 0.08, y: 20 }}>
      <div class="passport-item">
        <span class="check-icon"><Check size={16} /></span>
        <span class="item-name">Milestones</span>
      </div>
      <div class="passport-item">
        <span class="check-icon"><Check size={16} /></span>
        <span class="item-name">Achievement Badges</span>
      </div>
      <div class="passport-item">
        <span class="check-icon"><Check size={16} /></span>
        <span class="item-name">Certificates</span>
      </div>
      <div class="passport-item">
        <span class="check-icon"><Check size={16} /></span>
        <span class="item-name">Project Records</span>
      </div>
      <div class="passport-item">
        <span class="check-icon"><Check size={16} /></span>
        <span class="item-name">Leadership Recognition</span>
      </div>
      <div class="passport-item">
        <span class="check-icon"><Check size={16} /></span>
        <span class="item-name">Progress Tracking</span>
      </div>
    </div>
    <p class="passport-note">Parents receive access to their child's development passport throughout the programme.</p>
  </div>
</section>

<style>
  .passport {
    padding: 96px 0;
    background: var(--surface-soft);
    position: relative;
  }

  .passport::before {
    content: '';
    position: absolute;
    inset: 0;
    opacity: 0.02;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
    background-repeat: repeat;
    background-size: 256px 256px;
    pointer-events: none;
  }

  .passport-inner {
    position: relative;
    z-index: 1;
    width: min(1200px, calc(100% - 48px));
    margin: 0 auto;
  }

  .passport-title {
    font-family: var(--font-sans);
    font-size: 28px;
    font-weight: 700;
    line-height: 1.2;
    letter-spacing: -0.01em;
    color: var(--ink);
    margin: 0 0 8px;
  }

  .passport-intro {
    font-size: 16px;
    color: var(--muted);
    margin: 0 0 28px;
  }

  .passport-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;
  }

  .passport-item {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 18px 22px;
    border-radius: 10px;
    background: var(--surface-card);
    transition: transform 240ms ease, background 240ms ease;
  }

  .passport-item:hover {
    transform: translateY(-2px);
    background: color-mix(in srgb, var(--surface-card) 94%, var(--primary));
  }

  .check-icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 28px;
    height: 28px;
    border-radius: 999px;
    background: var(--primary);
    color: var(--on-primary);
    flex-shrink: 0;
  }

  .item-name {
    font-size: 15px;
    font-weight: 500;
    color: var(--ink);
  }

  .passport-note {
    font-size: 14px;
    line-height: 1.5;
    color: var(--muted);
    margin: 32px 0 0;
    max-width: 520px;
  }

  @media (max-width: 767px) {
    .passport {
      padding: 64px 0;
    }
    .passport-title {
      font-size: 24px;
    }
    .passport-grid {
      grid-template-columns: 1fr;
      gap: 12px;
    }
  }

  @media (min-width: 768px) and (max-width: 1023px) {
    .passport-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }
</style>
