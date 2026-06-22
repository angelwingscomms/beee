<script lang="ts">
  import { CheckCircle } from '@lucide/svelte'
  import ParentDashboard from '$lib/components/home/illustrations/ParentDashboard.svelte'

  const items = [
    'Real-time progress dashboard',
    'Badge and achievement tracking',
    'Milestone notifications',
    'Detailed performance reports',
    'Direct mentor communication',
  ]
</script>

<section class="section-band section-soft">
  <div class="container">
    <div class="parents-grid">
      <!-- LEFT COLUMN: ParentDashboard illustration -->
      <div class="parents-figure">
        <ParentDashboard />
      </div>
      <!-- RIGHT COLUMN: Feature list with CTA -->
      <div class="parents-body">
        <h2 class="display-lg">See Your Child's Growth In Real Time</h2>
        <p class="parents-desc">
          Monitor every aspect of your child's developmental journey through the
          T.E.A.M.U.P. Development Passport dashboard.
        </p>
        <div class="parents-checks">
          {#each items as item}
            <div class="check-row">
              <CheckCircle size={18} color="var(--primary)" />
              <span>{item}</span>
            </div>
          {/each}
        </div>
        <a href="/register" class="button-primary parents-action">View Sample Passport</a>
      </div>
    </div>
  </div>
</section>

<style>
  .parents-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 48px;
    align-items: center;
  }

  @media (min-width: 768px) {
    .parents-grid {
      grid-template-columns: 1fr 1fr;
    }
  }

  .parents-figure {
    display: flex;
    justify-content: center;
  }

  .parents-body {
    display: flex;
    flex-direction: column;
  }

  .parents-desc {
    margin-top: 16px;
    margin-bottom: 32px;
    color: var(--body);
    font-size: 16px;
    line-height: 1.55;
  }

  .parents-checks {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .check-row {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .check-row span {
    color: var(--body-strong);
    font-size: 15px;
  }

  .parents-action {
    margin-top: 32px;
    align-self: flex-start;
  }
</style>
