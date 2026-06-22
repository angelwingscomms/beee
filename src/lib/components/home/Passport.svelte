<script lang="ts">
  import { Check } from '@lucide/svelte'

  const items = [
    'Attendance',
    'Achievements',
    'Badges',
    'Leadership Activities',
    'Projects',
    'Mentorship Records',
    'Certificates',
    'Milestones',
  ]

  const badges = [
    { letter: 'T', color: 'var(--primary)' },
    { letter: 'E', color: 'var(--accent-amber)' },
    { letter: 'A', color: '#8b5cf6' },
    { letter: 'M', color: '#3b82f6' },
    { letter: 'U', color: 'var(--accent-teal)' },
    { letter: 'P', color: 'var(--primary)' },
  ]
</script>

<section class="section-band section-dark">
  <div class="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
    <!-- LEFT: Content -->
    <div>
      <h2 class="display-lg" style="color: var(--on-dark)">Development Passport</h2>
      <p class="body-md" style="color: var(--on-dark-soft); max-width: 480px; margin: 16px 0 32px">
        Every participant receives a T.E.A.M.U.P. Development Passport — their complete record of growth, achievement, and progress.
      </p>
      <ul class="passport-checklist">
        {#each items as item}
          <li>
            <Check size={16} color="var(--primary)" />
            <span>{item}</span>
          </li>
        {/each}
      </ul>
      <span class="badge-coral" style="margin-top: 32px">Parent Access Included</span>
    </div>

    <!-- RIGHT: Passport mockup -->
    <div>
      <div class="passport-book">
        <div class="passport-cover">
          <span class="spike-mark" style="color: var(--primary)"></span>
          <span>BEEE PASSPORT</span>
        </div>
        <div class="passport-badges">
          {#each badges as { letter, color }, i}
            <svg
              class="passport-badge"
              viewBox="0 0 48 48"
              width="48"
              height="48"
              style="--badge-color: {color}"
            >
              <!-- svelte-ignore a11y_svg_has_accessible_desc -->
              <path
                class="badge-ring-{i + 1}"
                d="M24 2A22 22 0 1 1 23.99 2"
                fill="none"
                stroke={color}
                stroke-width="3"
                stroke-linecap="round"
              />
              <text
                x="24"
                y="25"
                text-anchor="middle"
                fill={color}
                font-weight="700"
                font-size="18"
                font-family="var(--font-display)"
              >
                {letter}
              </text>
            </svg>
          {/each}
        </div>
        <div class="passport-progress">
          <div class="progress-bar">
            <div class="progress-fill" style="width: 72%"></div>
          </div>
          <span>72% Complete</span>
        </div>
      </div>
    </div>
  </div>
</section>

<style>
  .passport-checklist {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .passport-checklist li {
    display: flex;
    align-items: center;
    gap: 10px;
    color: var(--on-dark);
    font-size: 15px;
  }
</style>
