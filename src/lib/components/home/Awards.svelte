<script lang="ts">
  import { Trophy, Medal, ScrollText, BadgeCheck, Award, Lightbulb, Star } from '@lucide/svelte'

  const awards = [
    { icon: Trophy, title: 'Championship Trophy', desc: 'Winner and runner-up awards for the Grand Finale' },
    { icon: Medal, title: 'Medals', desc: 'Gold, silver, and bronze for top performers' },
    { icon: ScrollText, title: 'Certificates', desc: 'Official participation and achievement certificates' },
    { icon: BadgeCheck, title: 'Achievement Badges', desc: 'Digital badges for each milestone completed' },
    { icon: Award, title: 'Leadership Awards', desc: 'Special recognition for exceptional leadership' },
    { icon: Lightbulb, title: 'Innovation Awards', desc: 'Awards for creative and innovative thinking' },
    { icon: Star, title: 'Special Recognition', desc: 'Spotlight awards for outstanding contributions' },
  ]
</script>

<section class="section-band section-soft">
  <div class="container mx-auto px-4">
    <h2 class="display-lg text-center mb-12">Awards & Recognition</h2>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {#each awards as item}
        <div
          class="bg-surface-card rounded-xl p-6 text-center transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
          style="background: var(--color-surface-card)"
        >
          <div class="flex justify-center mb-0">
            <svelte:component this={item.icon} size={32} color="var(--color-primary)" />
          </div>
          <h3 class="text-lg font-medium mt-4" style="color: var(--color-ink)">{item.title}</h3>
          <p class="text-sm mt-2" style="color: var(--color-body)">{item.desc}</p>
        </div>
      {/each}
    </div>
  </div>
</section>
