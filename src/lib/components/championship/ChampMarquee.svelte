<script lang="ts">
  const items = [
    'Strategic Thinking', 'Mentorship', 'Leadership',
    'Chess Excellence', 'Personal Growth', 'T.E.A.M.U.P.',
    'Resilience', 'Community', 'Innovation',
    'Discipline', 'Creativity', 'Confidence'
  ];
</script>

<section class="champ-marquee" aria-hidden="true">
  <div class="champ-marquee-track">
    <div class="champ-marquee-group">
      {#each items as item}
        <span class="champ-marquee-item">{item}</span>
      {/each}
    </div>
    <div class="champ-marquee-group" aria-hidden="true">
      {#each items as item}
        <span class="champ-marquee-item">{item}</span>
      {/each}
    </div>
  </div>
</section>

<style>
  .champ-marquee {
    overflow: hidden;
    background: var(--surface-soft);
    padding: 28px 0;
    border-top: 1px solid var(--hairline-soft);
    border-bottom: 1px solid var(--hairline-soft);
  }

  .champ-marquee-track {
    display: flex;
    gap: 0;
    width: max-content;
    animation: champ-marquee 36s linear infinite;
  }

  .champ-marquee-group {
    display: flex;
    gap: 0;
    flex-shrink: 0;
  }

  .champ-marquee-item {
    flex-shrink: 0;
    padding: 0 48px;
    font-family: var(--font-display);
    font-size: 15px;
    font-weight: 500;
    color: var(--muted);
    letter-spacing: 0.12em;
    text-transform: uppercase;
    white-space: nowrap;
    position: relative;
  }

  .champ-marquee-item::before {
    content: '';
    position: absolute;
    left: 0;
    top: 50%;
    translate: 0 -50%;
    width: 5px;
    height: 5px;
    border-radius: 999px;
    background: var(--primary);
    opacity: 0.4;
  }

  @keyframes champ-marquee {
    from { transform: translateX(0); }
    to { transform: translateX(-50%); }
  }

  @media (prefers-reduced-motion: reduce) {
    .champ-marquee-track {
      animation: none;
    }
  }
</style>
