<script lang="ts">
  import { Sparkles } from '@lucide/svelte';

  let { teamup }: { teamup: { name: string; detail: string; points: string[] }[] } = $props();
  let activeTeamup = $state('');
  $: if (teamup && !activeTeamup && teamup.length > 0) activeTeamup = teamup[0].name;
</script>

<section class="section teamup-section" id="teamup">
  <div class="container">
    <div class="section-heading reveal">
      <p class="section-kicker">Programme Core</p>
      <h2>The T.E.A.M.U.P. Experience</h2>
    </div>
    <div class="teamup-layout">
      <div class="pentagon" aria-label="Interactive T.E.A.M.U.P. pentagon">
        {#each teamup as item, index}
          <button
            class={`pentagon-node node-${index + 1}`}
            type="button"
            class:active={activeTeamup === item.name}
            onclick={() => (activeTeamup = item.name)}
          >
            {item.name}
          </button>
        {/each}
        <div class="pentagon-lines"></div>
      </div>
      <article class="teamup-panel reveal">
        {#each teamup as item}
          {#if activeTeamup === item.name}
            <p class="section-kicker">{item.name}</p>
            <h3>{item.detail}</h3>
            <div class="teamup-points">
              {#each item.points as point}
                <span><Sparkles size={16} />{point}</span>
              {/each}
            </div>
          {/if}
        {/each}
      </article>
    </div>
  </div>
</section>

<style>
  .section { padding: 104px 0; }
  .teamup-section {
    background: radial-gradient(circle at 18% 15%, rgba(245, 184, 75, 0.16), transparent 24%),
                radial-gradient(circle at 82% 80%, rgba(88, 198, 159, 0.12), transparent 26%),
                #070807;
  }
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
  .teamup-layout {
    display: grid; grid-template-columns: minmax(0, 0.95fr) minmax(340px, 0.82fr); gap: 56px; align-items: center;
  }
  .pentagon { position: relative; width: min(540px, 100%); aspect-ratio: 1; margin: 0 auto; }
  .pentagon-lines {
    position: absolute; inset: 18%;
    clip-path: polygon(50% 0%, 98% 35%, 79% 92%, 21% 92%, 2% 35%);
    border: 1px solid rgba(245, 184, 75, 0.28);
    background: linear-gradient(145deg, rgba(245, 184, 75, 0.12), rgba(88, 198, 159, 0.07));
  }
  .pentagon-node {
    position: absolute; z-index: 2; min-width: 132px;
    border: 1px solid var(--line); border-radius: 999px;
    background: rgba(255, 255, 255, 0.08); color: var(--text);
    padding: 12px 16px; font-weight: 900;
    transition: transform 180ms ease, background 180ms ease, border-color 180ms ease;
  }
  .pentagon-node.active, .pentagon-node:hover, .pentagon-node:focus {
    border-color: rgba(245, 184, 75, 0.78);
    background: rgba(245, 184, 75, 0.16); transform: scale(1.08);
  }
  .node-1 { top: 0; left: 50%; transform: translateX(-50%); }
  .node-2 { top: 33%; right: 0; }
  .node-3 { right: 12%; bottom: 4%; }
  .node-4 { bottom: 4%; left: 12%; }
  .node-5 { top: 33%; left: 0; }
  .node-1.active, .node-1:hover, .node-1:focus { transform: translateX(-50%) scale(1.08); }
  .teamup-panel {
    min-height: 330px; padding: 34px;
    border: 1px solid rgba(255, 255, 255, 0.12); border-radius: 8px;
    background: var(--panel); box-shadow: 0 24px 80px rgba(0, 0, 0, 0.18);
  }
  .teamup-panel h3 { margin: 20px 0; font-size: clamp(1.7rem, 3vw, 2.6rem); line-height: 1.14; }
  .teamup-points { display: flex; flex-wrap: wrap; gap: 10px; }
  .teamup-points span {
    display: inline-flex; align-items: center; gap: 7px;
    border: 1px solid rgba(255, 255, 255, 0.12); border-radius: 999px;
    background: rgba(255, 255, 255, 0.06); color: var(--muted-dark);
    padding: 8px 11px; font-size: 13px; font-weight: 700;
  }
  .reveal { animation: fade-up both; animation-timeline: view(); animation-range: entry 0% cover 28%; }
  @keyframes fade-up { from { opacity: 0; transform: translateY(26px); } to { opacity: 1; transform: translateY(0); } }
  @media (prefers-reduced-motion: reduce) { .reveal { animation: none !important; } }
  @media (max-width: 1023px) { .teamup-layout { grid-template-columns: 1fr; } }
  @media (max-width: 700px) {
    .section { padding: 72px 0; }
    .pentagon { display: flex; width: 100%; aspect-ratio: auto; gap: 10px; overflow-x: auto; padding-bottom: 10px; }
    .pentagon-lines { display: none; }
    .pentagon-node { position: static; min-width: max-content; }
    .node-1, .node-1.active, .node-1:hover, .node-1:focus { transform: none; }
    .pentagon-node.active, .pentagon-node:hover, .pentagon-node:focus { transform: none; }
  }
</style>
