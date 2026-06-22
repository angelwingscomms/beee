<script lang="ts">
  import { animate, inView } from 'motion';
  import { motionFadeUp } from '$lib/actions/motion';
  let { journey }: { journey: { code: string; title: string; detail: string }[] } = $props();
  let journey_line: SVGPathElement;

  $effect(() => {
    if (!journey_line) return;
    const cleanup = inView(journey_line, () => {
      animate(journey_line, { pathLength: [0, 1] }, { duration: 1.2, ease: 'ease-in-out' });
      return () => cleanup?.();
    });
  });
</script>

<section class="section journey-section noise" id="journey">
  <div class="container">
    <div class="section-heading align-left" use:motionFadeUp>
      <p class="section-kicker">Championship Journey</p>
      <h2>A Roadmap To The Grand Finale</h2>
      <p>Each step gives parents a clear view of what happens after registration.</p>
    </div>
    <div class="journey-map">
      <svg class="journey-svg" aria-hidden="true" viewBox="0 0 1000 4" preserveAspectRatio="none">
        <path ref={journey_line} d="M 10 2 L 990 2" stroke="url(#journey-grad)" strokeWidth="3" fill="none" pathLength="1" />
        <defs>
          <linearGradient id="journey-grad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stop-color="var(--gold)" />
            <stop offset="100%" stop-color="var(--green)" />
          </linearGradient>
        </defs>
      </svg>
      {#each journey as item}
        <article class="journey-step" use:motionFadeUp tabindex="0">
          <span>{item.code}</span>
          <h3>{item.title}</h3>
          <p>{item.detail}</p>
        </article>
      {/each}
    </div>
    <div class="inline-cta" use:motionFadeUp>
      <p>Ready to begin the pathway?</p>
      <a class="primary-cta" href="/register">Register Child</a>
    </div>
  </div>
</section>

<style>
  .section { padding: 104px 0; }
  .journey-section { position: relative; background: #0b0d0c; }
  .container { width: min(1180px, calc(100% - 40px)); margin: 0 auto; }
  .section-heading { max-width: 760px; margin: 0 auto 44px; text-align: center; }
  .align-left { margin-inline: 0; text-align: left; }
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
  .section-heading p:not(.section-kicker) {
    max-width: 650px; margin: 18px 0 0; color: var(--muted-dark); font-size: 18px; line-height: 1.6;
  }
  .journey-map {
    position: relative; display: grid; grid-template-columns: repeat(6, minmax(190px, 1fr));
    gap: 16px; overflow-x: auto; padding: 34px 0 18px;
  }
  .journey-svg {
    position: absolute; top: 53px; left: 6%; width: 88%; height: 12px;
    pointer-events: none;
  }
  .journey-step {
    position: relative; min-width: 190px; padding: 26px 22px;
    border: 1px solid rgba(255, 255, 255, 0.12); border-radius: 8px;
    background: var(--panel); box-shadow: 0 24px 80px rgba(0, 0, 0, 0.18);
    color: var(--text); transition: transform 180ms ease, background 180ms ease;
  }
  .journey-step:hover, .journey-step:focus {
    background: var(--panel-strong); transform: translateY(-5px);
  }
  .journey-step span {
    display: grid; width: 48px; height: 48px; place-items: center;
    border: 1px solid rgba(245, 184, 75, 0.4); border-radius: 999px;
    background: #10120f; color: var(--gold); font-weight: 900;
  }
  .journey-step h3 { margin: 22px 0 10px; font-size: 22px; }
  .journey-step p { margin: 0; color: var(--muted-dark); line-height: 1.6; }
  .inline-cta {
    display: flex; align-items: center; justify-content: space-between; gap: 18px;
    margin-top: 28px; border: 1px solid var(--line); border-radius: 8px;
    background: rgba(255, 255, 255, 0.05); padding: 20px;
  }
  .inline-cta p { margin: 0; color: var(--text); font-weight: 800; }
  .primary-cta {
    display: inline-flex; min-height: 48px; align-items: center; justify-content: center;
    border-radius: 8px; padding: 0 20px; font-size: 14px; font-weight: 800;
    border: 1px solid var(--gold); background: linear-gradient(135deg, var(--gold), #df8f1f);
    color: #130f08; box-shadow: 0 14px 38px rgba(245, 184, 75, 0.18);
    transition: transform 180ms ease;
  }
  .primary-cta:hover { transform: translateY(-2px); }
  @media (max-width: 700px) {
    .section { padding: 72px 0; }
    .journey-map { grid-template-columns: 1fr; overflow: visible; }
    .journey-svg { display: none; }
    .inline-cta { align-items: stretch; flex-direction: column; }
  }
</style>
