<script lang="ts">
  import { ClipboardCheck, BadgeCheck, Users, Trophy } from '@lucide/svelte'

  const items = [
    { icon: ClipboardCheck, title: 'Development Programme', subtitle: 'Progress Tracking' },
    { icon: BadgeCheck, title: 'Digital Passport', subtitle: 'Achievements & Badges' },
    { icon: Users, title: 'Mentorship', subtitle: 'Leadership & Growth' },
    { icon: Trophy, title: 'Championship', subtitle: 'Grand Finale' },
  ]
</script>

<section class="section-band section-soft py-10 md:py-12">
  <div class="container mx-auto px-4">
    <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
      {#each items as item}
        <div class="text-center">
          <svelte:component this={item.icon} size={24} color="var(--color-primary)" />
          <strong class="block font-display text-3xl mt-2" style="color: var(--color-primary)">
            {item.title}
          </strong>
          <span class="block text-sm mt-1" style="color: var(--color-muted)">
            {item.subtitle}
          </span>
        </div>
      {/each}
    </div>
  </div>
</section>
