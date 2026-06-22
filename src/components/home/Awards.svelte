<script lang="ts">
  import { Trophy, Medal, Award, Crown } from '@lucide/svelte';

  let { awards }: { awards: string[] } = $props();
</script>

<section class="section awards-section">
  <div class="container">
    <div class="section-heading reveal">
      <p class="section-kicker">Awards & Recognition</p>
      <h2>Recognition For Development And Excellence</h2>
      <p>Awards celebrate effort, leadership, innovation and progress. They do not replace the journey.</p>
    </div>
    <div class="awards-grid">
      {#each awards as award, index}
        <article class="award-card reveal">
          {#if index === 0}<Trophy size={24} />{:else if index < 3}<Medal size={24} />{:else if index < 5}<Award size={24} />{:else}<Crown size={24} />{/if}
          <span>{award}</span>
        </article>
      {/each}
    </div>
  </div>
</section>

<style>
  .section { padding: 104px 0; }
  .awards-section { background: var(--cream); color: var(--ink-dark); }
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
    font-weight: 800; font-size: clamp(2.1rem, 5vw, 4.4rem); line-height: 1.04; color: var(--ink-dark);
  }
  .section-heading p:not(.section-kicker) { max-width: 650px; margin: 18px auto 0; color: #6b6257; font-size: 18px; line-height: 1.6; }
  .awards-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 18px; }
  .award-card {
    display: flex; min-height: 120px; align-items: center; gap: 14px; padding: 22px;
    border: 1px solid #ded3c3; border-radius: 8px;
    background: #fff; box-shadow: 0 18px 45px rgba(23, 22, 20, 0.06);
    color: var(--ink-dark); font-weight: 900;
  }
  .award-card svg { color: var(--gold-dark); }
  .reveal { animation: fade-up both; animation-timeline: view(); animation-range: entry 0% cover 28%; }
  @keyframes fade-up { from { opacity: 0; transform: translateY(26px); } to { opacity: 1; transform: translateY(0); } }
  @media (prefers-reduced-motion: reduce) { .reveal { animation: none !important; } }
  @media (max-width: 1023px) { .awards-grid { grid-template-columns: repeat(2, 1fr); } }
  @media (max-width: 700px) { .section { padding: 72px 0; } .awards-grid { grid-template-columns: 1fr; } }
</style>
