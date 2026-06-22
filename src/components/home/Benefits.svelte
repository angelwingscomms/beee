<script lang="ts">
  import { BadgeCheck } from '@lucide/svelte';
  import { motionFadeUp } from '$lib/actions/motion';

  let { benefits }: { benefits: string[][] } = $props();
</script>

<section class="section benefits-section noise">
  <div class="container">
    <div class="section-heading" use:motionFadeUp>
      <p class="section-kicker">Benefits</p>
      <h2>Growth Parents Can Recognise</h2>
    </div>
    <div class="benefit-grid">
      {#each benefits as benefit}
        <article class="benefit-card" use:motionFadeUp>
          <BadgeCheck size={24} />
          <h3>{benefit[0]}</h3>
          <p>{benefit[1]}</p>
        </article>
      {/each}
    </div>
  </div>
</section>

<style>
  .section { padding: 104px 0; }
  .benefits-section { position: relative; background: var(--surface-dark); }
  .container { width: min(1180px, calc(100% - 40px)); margin: 0 auto; }
  .section-heading { max-width: 760px; margin: 0 auto 44px; text-align: center; }
  .section-kicker {
    display: inline-flex; width: fit-content; margin: 0;
    border: 1px solid rgba(245, 184, 75, 0.28); border-radius: 999px;
    background: rgba(245, 184, 75, 0.09); color: var(--gold);
    padding: 7px 12px; font-size: 12px; font-weight: 900;
    letter-spacing: 0.08em; text-transform: uppercase;
  }
  .section-heading h2 {
    margin: 16px 0 0; font-family: var(--font-championship), var(--font-registration), sans-serif;
    font-weight: 800; font-size: clamp(2.1rem, 5vw, 4.4rem); line-height: 1.04; color: var(--text);
  }
  .benefit-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 18px; }
  .benefit-card {
    padding: 26px; color: var(--text);
    border: 1px solid rgba(255, 255, 255, 0.12); border-radius: 8px;
    background: var(--panel); box-shadow: 0 24px 80px rgba(0, 0, 0, 0.18);
  }
  .benefit-card svg { color: var(--gold-dark); }
  .benefit-card h3 { margin: 22px 0 10px; font-size: 22px; }
  .benefit-card p { margin: 0; color: var(--muted-dark); line-height: 1.6; }
  @media (max-width: 1023px) { .benefit-grid { grid-template-columns: repeat(2, 1fr); } }
  @media (max-width: 700px) { .section { padding: 72px 0; } .benefit-grid { grid-template-columns: 1fr; } }
</style>
