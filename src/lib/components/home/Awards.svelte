<script lang="ts">
  import { Trophy, Medal, ScrollText, BadgeCheck, Award, Lightbulb, Star } from '@lucide/svelte'

  const awards = $state([
    { icon: Trophy, title: 'Championship Trophy', desc: 'Winner and runner-up awards for the Grand Finale' },
    { icon: Medal, title: 'Medals', desc: 'Gold, silver, and bronze for top performers' },
    { icon: ScrollText, title: 'Certificates', desc: 'Official participation and achievement certificates' },
    { icon: BadgeCheck, title: 'Achievement Badges', desc: 'Digital badges for each milestone completed' },
    { icon: Award, title: 'Leadership Awards', desc: 'Special recognition for exceptional leadership' },
    { icon: Lightbulb, title: 'Innovation Awards', desc: 'Awards for creative and innovative thinking' },
    { icon: Star, title: 'Special Recognition', desc: 'Spotlight awards for outstanding contributions' },
  ])
</script>

<section class="section-band section-soft">
  <div class="container">
    <h2 class="display-lg" style="text-align: center; margin-bottom: 48px;">Awards & Recognition</h2>

    <div class="awards-grid">
      {#each awards as item}
        <div class="award-card">
          <div class="award-icon-wrap">
            <item.icon size={24} />
          </div>
          <h3>{item.title}</h3>
          <p>{item.desc}</p>
        </div>
      {/each}
    </div>
  </div>
</section>

<style>
  .awards-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 24px;
  }

  .award-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: 32px 24px;
    border-radius: 12px;
    background: var(--surface-card);
    transition: transform 240ms ease, box-shadow 240ms ease, background 240ms ease;
  }

  .award-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 32px rgba(242, 120, 48, 0.10);
    background: color-mix(in srgb, var(--surface-card) 94%, var(--primary));
  }

  .award-icon-wrap {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 56px;
    height: 56px;
    border-radius: 50%;
    background: color-mix(in srgb, var(--primary) 12%, transparent);
    color: var(--primary);
  }

  .award-card h3 {
    margin: 20px 0 8px;
    font-size: 16px;
    font-weight: 600;
    color: var(--ink);
    line-height: 1.3;
  }

  .award-card p {
    margin: 0;
    font-size: 14px;
    color: var(--body);
    line-height: 1.55;
  }

  @media (max-width: 767px) {
    .awards-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media (max-width: 480px) {
    .awards-grid {
      grid-template-columns: 1fr;
    }
  }
</style>
