<script lang="ts">
  import { ChevronDown } from '@lucide/svelte';
  import { animate } from 'motion';
  import { motionFadeUp } from '$lib/actions/motion';

  let { faqs }: { faqs: string[][] } = $props();
  let openFaq = $state(-1);
  let faq_refs: Record<number, HTMLParagraphElement> = {};

  function toggle_faq(index: number) {
    const was_open = openFaq === index;
    const prev = openFaq;
    openFaq = was_open ? -1 : index;

    if (faq_refs[prev] && prev >= 0) {
      animate(faq_refs[prev], { height: 0, opacity: 0 }, { duration: 0.2, ease: 'ease-in-out' });
    }
    if (faq_refs[index] && !was_open) {
      const el = faq_refs[index];
      el.style.height = 'auto';
      const h = el.offsetHeight;
      el.style.height = '0px';
      requestAnimationFrame(() => {
        animate(el, { height: h, opacity: 1 }, { duration: 0.25, ease: 'ease-in-out' });
      });
    }
  }
</script>

<section class="section faq-section" id="faq">
  <div class="container faq-container">
    <div class="section-heading" use:motionFadeUp>
      <p class="section-kicker">FAQ</p>
      <h2>Questions Parents Ask First</h2>
    </div>
    <div class="faq-list">
      {#each faqs as faq, index}
        <article class="faq-item">
          <button type="button" onclick={() => toggle_faq(index)} aria-expanded={openFaq === index} aria-controls={`faq-${index}`}>
            <span>{faq[0]}</span>
            <span class:rotated={openFaq === index}><ChevronDown size={20} /></span>
          </button>
          <p
            id={`faq-${index}`}
            bind:this={faq_refs[index]}
            class="faq-answer"
            class:faq-open={openFaq === index}
            style="height: {openFaq === index ? 'auto' : '0px'}; overflow: hidden; {openFaq !== index ? 'opacity: 0;' : ''}"
          >{faq[1]}</p>
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
  .faq-item { overflow: hidden; margin-top: 10px; border-radius: 8px; background: rgba(255, 255, 255, 0.7); backdrop-filter: blur(var(--glass-blur, 16px)); -webkit-backdrop-filter: blur(var(--glass-blur, 16px)); border: 1px solid rgba(255, 255, 255, 0.4); box-shadow: 0 18px 45px rgba(23, 22, 20, 0.06); }
  .faq-item button {
    display: flex; width: 100%; align-items: center; justify-content: space-between; gap: 16px;
    border: 0; background: transparent; color: var(--ink-dark);
    padding: 20px 22px; text-align: left; font-weight: 900;
  }
  .faq-item p { margin: 0; color: #6b6257; line-height: 1.6; padding: 0 22px 22px; }
  .rotated { transform: rotate(180deg); }
  @media (max-width: 700px) { .section { padding: 72px 0; } }
</style>
