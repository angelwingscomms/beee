<script lang="ts">
  import { CheckCircle } from '@lucide/svelte'
</script>

<section class="section-band section-soft">
  <div class="container">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
      <!-- LEFT COLUMN: Dashboard mockup -->
      <div>
        <div class="bg-surface-dark rounded-xl p-6 border border-white/10">
          <!-- Top bar -->
          <div class="flex items-center justify-between mb-6">
            <span style="color: var(--color-on-dark); font-size: 14px; font-weight: 500">Dashboard</span>
            <span class="size-2 rounded-full" style="background: var(--accent-teal)"></span>
          </div>
          <!-- Child progress overview -->
          <div class="mb-4">
            <div style="color: var(--color-on-dark); font-size: 16px; font-weight: 500">Participant</div>
            <div style="color: var(--on-dark-soft); font-size: 13px; margin-top: 2px">Level 4: Innovator</div>
          </div>
          <!-- Mini progress bar at 72% -->
          <div class="w-full h-2 rounded-full" style="background: rgba(255, 255, 255, 0.1)">
            <div class="h-full rounded-full" style="width: 72%; background: var(--color-primary)"></div>
          </div>
          <!-- 3 stat items -->
          <div class="flex gap-6 mt-5">
            <span style="color: var(--color-on-dark); font-size: 13px">Badges: 12</span>
            <span style="color: var(--color-on-dark); font-size: 13px">Attendance: 89%</span>
            <span style="color: var(--color-on-dark); font-size: 13px">Rank: Top 15%</span>
          </div>
          <!-- Last Updated -->
          <div class="mt-6 pt-4" style="border-top: 1px solid rgba(255, 255, 255, 0.08)">
            <span style="color: var(--on-dark-soft); font-size: 12px">Last Updated: Today</span>
          </div>
        </div>
      </div>
      <!-- RIGHT COLUMN: Feature list with CTA -->
      <div>
        <h2 class="display-lg">See Your Child's Growth In Real Time</h2>
        <p class="body-md" style="margin-top: 16px; margin-bottom: 32px; color: var(--color-body)">
          Monitor every aspect of your child's developmental journey through the T.E.A.M.U.P. Development Passport dashboard.
        </p>
        <div class="flex flex-col gap-4">
          <div class="flex items-center gap-3">
            <CheckCircle size={18} color="var(--color-primary)" />
            <span style="color: var(--body-strong); font-size: 15px">Real-time progress dashboard</span>
          </div>
          <div class="flex items-center gap-3">
            <CheckCircle size={18} color="var(--color-primary)" />
            <span style="color: var(--body-strong); font-size: 15px">Badge and achievement tracking</span>
          </div>
          <div class="flex items-center gap-3">
            <CheckCircle size={18} color="var(--color-primary)" />
            <span style="color: var(--body-strong); font-size: 15px">Milestone notifications</span>
          </div>
          <div class="flex items-center gap-3">
            <CheckCircle size={18} color="var(--color-primary)" />
            <span style="color: var(--body-strong); font-size: 15px">Detailed performance reports</span>
          </div>
          <div class="flex items-center gap-3">
            <CheckCircle size={18} color="var(--color-primary)" />
            <span style="color: var(--body-strong); font-size: 15px">Direct mentor communication</span>
          </div>
        </div>
        <a href="/register" class="button-primary" style="margin-top: 32px">View Sample Passport</a>
      </div>
    </div>
  </div>
</section>
