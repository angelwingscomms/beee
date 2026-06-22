<script lang="ts">
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
    <h2 class="display-lg" style="margin-bottom: 12px; color: var(--on-dark)">
      Track Growth Beyond The Chessboard
    </h2>
    <p class="lead" style="max-width: 560px; color: var(--on-dark-soft)">
      Every achievement tracked. Every milestone celebrated. Every step of your child's journey, visible at a glance.
    </p>

    <!-- DASHBOARD MOCKUP -->
    <div class="bg-surface-dark rounded-xl p-8 border border-white/10 mt-12">
      <h3 style="color: var(--on-dark); font-size: 20px; font-weight: 500; margin: 0 0 20px">
        Level 4: Innovator
      </h3>

      <!-- Progress bar -->
      <div class="bg-white/10 h-2 rounded-full w-full mb-2">
        <div class="bg-primary h-full rounded-full" style="width: 72%"></div>
      </div>
      <p style="color: var(--on-dark-soft); font-size: 14px; margin: 0">
        72% Progress
      </p>

      <!-- Stats row -->
      <div class="flex gap-8 mt-6">
        <div class="flex items-center gap-2">
          <Award size={18} color="var(--primary)" />
          <span style="color: var(--on-dark)">Badges Earned: 12</span>
        </div>
        <div class="flex items-center gap-2">
          <Zap size={18} color="var(--accent-amber)" />
          <span style="color: var(--on-dark)">XP: 3,450</span>
        </div>
      </div>

      <!-- Badge icons row -->
      <div class="flex gap-3 mt-6">
        {#each badges as { letter, color }}
          <div
            class="size-10 rounded-full flex items-center justify-center text-sm font-bold"
            style="background: {color}; color: white;"
          >
            {letter}
          </div>
        {/each}
      </div>
    </div>

    <!-- FEATURE LINKS -->
    <div class="grid grid-cols-2 md:grid-cols-5 gap-3 mt-8">
      {#each features as { icon: Icon, label }}
        <a
          href="javascript:void(0)"
          class="flex flex-col items-center gap-2 p-4 rounded-lg bg-surface-dark-elevated border border-white/5 hover:border-white/20 transition-colors no-underline"
          style="color: var(--on-dark-soft)"
        >
          <Icon size={20} color="var(--primary)" />
          <span class="text-sm font-medium" style="color: var(--on-dark)">{label}</span>
        </a>
      {/each}
    </div>
  </div>
</section>
