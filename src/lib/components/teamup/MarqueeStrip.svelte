<script lang="ts">
  import { Trophy, Lightbulb, Palette, Users, TrendingUp } from '@lucide/svelte';

  let items = [
    { icon: Trophy, label: 'Technology' },
    { icon: Lightbulb, label: 'Enterprise' },
    { icon: Palette, label: 'Art' },
    { icon: Users, label: 'Mentorship' },
    { icon: TrendingUp, label: 'Upskill' },
  ];
</script>

<section class="marquee-sec">
  <div class="marquee-track">
    <div class="marquee-row">
      {#each [...items, ...items, ...items] as { icon: Icon, label }}
        <span class="marquee-chip">
          <span class="marquee-icon-wrap"><Icon size={18} class="marquee-icon" /></span>
          <span class="marquee-label">{label}</span>
          <span class="marquee-dot">&#9679;</span>
        </span>
      {/each}
    </div>
  </div>
</section>

<style>
  .marquee-sec {
    padding: 40px 0;
    background: var(--surface-soft);
    overflow: hidden;
    position: relative;
  }

  .marquee-track {
    overflow: hidden;
    mask-image: linear-gradient(to right, transparent 2%, black 8%, black 92%, transparent 98%);
    -webkit-mask-image: linear-gradient(to right, transparent 2%, black 8%, black 92%, transparent 98%);
  }

  .marquee-row {
    display: flex;
    gap: 0;
    width: fit-content;
    animation: marquee-scroll 30s linear infinite;
  }

  @keyframes marquee-scroll {
    0% { transform: translateX(0); }
    100% { transform: translateX(-33.333%); }
  }

  .marquee-chip {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    padding: 12px 24px;
    white-space: nowrap;
    flex-shrink: 0;
  }

  .marquee-icon-wrap {
    display: inline-flex;
    color: var(--primary);
    flex-shrink: 0;
  }

  .marquee-label {
    font-family: var(--font-display);
    font-size: 18px;
    font-weight: 500;
    letter-spacing: -0.01em;
    color: var(--ink);
  }

  .marquee-dot {
    font-size: 6px;
    color: var(--hairline);
    margin-left: 4px;
  }
</style>