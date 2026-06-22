<script lang="ts">
  import { ChevronDown } from '@lucide/svelte';

  let { faqs }: { faqs: string[][] } = $props();
  let openFaq = $state(-1);
</script>

<section class="section faq-section" id="faq">
  <div class="container faq-container">
    <div class="section-heading reveal">
      <p class="section-kicker">FAQ</p>
      <h2>Questions Parents Ask First</h2>
    </div>
    <div class="faq-list">
      {#each faqs as faq, index}
        <article class="faq-item">
          <button type="button" onclick={() => (openFaq = openFaq === index ? -1 : index)}>
            <span>{faq[0]}</span>
            <ChevronDown size={20} class:rotated={openFaq === index} />
          </button>
          {#if openFaq === index}
            <p>{faq[1]}</p>
          {/if}
        </article>
      {/each}
    </div>
  </div>
</section>

<style>
  .section { padding: 104px 0; }
  .faq-section { background: var(--cream); color: var(--ink-dark); }
  .container { width: min(1180px, calc(100% - 40px)); margin: 0 auto; }
  .faq-container { max-width: 850px; }
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
  .faq-item { overflow: hidden; margin-top: 10px; border: 1px solid #ded3c3; border-radius: 8px; background: #fff; box-shadow: 0 18px 45px rgba(23, 22, 20, 0.06); }
  .faq-item button {
    display: flex; width: 100%; align-items: center; justify-content: space-between; gap: 16px;
    border: 0; background: transparent; color: var(--ink-dark);
    padding: 20px 22px; text-align: left; font-weight: 900;
  }
  .faq-item p { margin: 0; color: #6b6257; line-height: 1.6; padding: 0 22px 22px; }
  .rotated { transform: rotate(180deg); }
  .reveal { animation: fade-up both; animation-timeline: view(); animation-range: entry 0% cover 28%; }
  @keyframes fade-up { from { opacity: 0; transform: translateY(26px); } to { opacity: 1; transform: translateY(0); } }
  @media (prefers-reduced-motion: reduce) { .reveal { animation: none !important; } }
  @media (max-width: 700px) { .section { padding: 72px 0; } }
</style>
