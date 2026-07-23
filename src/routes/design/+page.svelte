<script lang="ts">
  const palette = [
    { name: 'Cloud', token: '--cloud', hex: '#F1EEE7' },
    { name: 'Cloud Dim', token: '--cloud-dim', hex: '#E9E5DB' },
    { name: 'Nightfall', token: '--nightfall', hex: '#0A0F1A' },
    { name: 'Nightfall Soft', token: '--nightfall-soft', hex: '#101624' },
    { name: 'Beam', token: '--beam', hex: '#F27830' },
    { name: 'Beam Active', token: '--beam-active', hex: '#BD5E25' },
    { name: 'Honey', token: '--honey', hex: '#FFB200' },
    { name: 'Ink', token: '--ink', hex: '#141413' },
    { name: 'Dusk Ink', token: '--dusk-ink', hex: '#F2EFE8' }
  ];

  const spectrum = [
    { name: 'Technology', token: '--spec-t', hex: '#4A8ECF' },
    { name: 'Enterprise', token: '--spec-e', hex: '#FFB200' },
    { name: 'Art', token: '--spec-a', hex: '#F27830' },
    { name: 'Mentorship', token: '--spec-m', hex: '#5DB8A6' },
    { name: 'Upskill', token: '--spec-u', hex: '#5DB872' }
  ];

  const spacing = [
    { token: '--space-0', px: 4 },
    { token: '--space-1', px: 8 },
    { token: '--space-2', px: 16 },
    { token: '--space-3', px: 24 },
    { token: '--space-4', px: 32 },
    { token: '--space-5', px: 48 },
    { token: '--space-6', px: 72 },
    { token: '--space-7', px: 96 },
    { token: '--space-8', px: 128 },
    { token: '--space-9', px: 160 },
    { token: '--space-10', px: 200 },
    { token: '--space-11', px: 240 }
  ];

  const motion: [string, string][] = [
    ['--ease-out', 'cubic-bezier(0.16, 1, 0.3, 1) — all reveals'],
    ['--ease-inout', 'cubic-bezier(0.83, 0, 0.17, 1) — scrub swaps'],
    ['--dur-micro', '300ms — press/hover'],
    ['--dur-reveal', '1000ms — line/fade reveals'],
    ['--dur-page', '1300ms — page transitions'],
    ['stagger', '70ms — editorial cadence']
  ];
</script>

<div class="rv-field-cloud design-page">
  <section class="rv-section rv-section--flush">
    <div class="rv-wrap">
      <p class="rv-micro design-eyebrow">INTERNAL · SYSTEM DOCUMENTATION</p>
      <h1 class="rv-d2">SPEC-TRUM design system.</h1>
      <p class="rv-body-lg">Every revamped page composes from these primitives. See <code>docs/design-direction.md</code> and <code>docs/revamp-plan.md</code> for the rationale.</p>
    </div>
  </section>

  <section class="rv-section">
    <div class="rv-wrap">
      <h2 class="rv-d3 design-section-title">Palette</h2>
      <div class="swatch-grid">
        {#each palette as p (p.token)}
          <div class="swatch">
            <div class="swatch-color" style:background={`var(${p.token})`}></div>
            <p class="rv-micro">{p.name}</p>
            <p class="rv-micro swatch-hex">{p.token} · {p.hex}</p>
          </div>
        {/each}
      </div>
      <p class="rv-body design-note">Spectrum set — appears only at the TEAMUP split moment, never as decoration:</p>
      <div class="swatch-grid">
        {#each spectrum as p (p.token)}
          <div class="swatch">
            <div class="swatch-color" style:background={`var(${p.token})`}></div>
            <p class="rv-micro">{p.name}</p>
            <p class="rv-micro swatch-hex">{p.token} · {p.hex}</p>
          </div>
        {/each}
      </div>
    </div>
  </section>

  <section class="rv-section rv-field-night">
    <div class="rv-wrap">
      <h2 class="rv-d3 design-section-title">Type</h2>
      <p class="rv-d1">Display Aa</p>
      <p class="rv-micro type-label">rv-d1 / rv-d2 / rv-d3 — Bricolage Grotesque</p>
      <p class="rv-body-lg" style="margin-top: var(--space-4)">Body copy in General Sans, the neutral warm voice for every paragraph on the site.</p>
      <p class="rv-micro type-label">rv-body / rv-body-lg</p>
      <p class="rv-note" style="font-size: var(--fs-d3); margin-top: var(--space-4)">The rare serif note.</p>
      <p class="rv-micro type-label">rv-note — Fraunces, roman only, ≤2 per page</p>
      <p class="rv-micro" style="margin-top: var(--space-4)">01 — MICRO LABEL — JetBrains Mono</p>
    </div>
  </section>

  <section class="rv-section">
    <div class="rv-wrap">
      <h2 class="rv-d3 design-section-title">Space</h2>
      <div class="space-bars">
        {#each spacing as s (s.token)}
          <div class="space-row">
            <span class="rv-micro space-label">{s.token}</span>
            <span class="space-bar" style:width={`${s.px}px`}></span>
            <span class="rv-micro rv-num">{s.px}px</span>
          </div>
        {/each}
      </div>
    </div>
  </section>

  <section class="rv-section">
    <div class="rv-wrap">
      <h2 class="rv-d3 design-section-title">Buttons</h2>
      <div class="demo-row">
        <a href="/design" class="rv-btn rv-btn--beam felt">Beam button</a>
        <a href="/design" class="rv-btn rv-btn--ghost felt">Ghost button</a>
        <a href="/design" class="rv-btn rv-btn--beam rv-btn--big felt">Big beam</a>
      </div>
    </div>
  </section>

  <section class="rv-section">
    <div class="rv-wrap">
      <h2 class="rv-d3 design-section-title">Form elements</h2>
      <div class="form-demo">
        <label class="rv-label" for="design-input">Label</label>
        <input id="design-input" class="rv-input" placeholder="Placeholder text" />
        <p class="rv-error-text">Error state text</p>
        <p class="rv-callout-ok" style="margin-top: var(--space-2)">Success callout text</p>
      </div>
    </div>
  </section>

  <section class="rv-section">
    <div class="rv-wrap">
      <h2 class="rv-d3 design-section-title">Row list</h2>
      <div class="row-demo">
        <div class="rv-row">
          <span class="rv-micro" style="color: var(--beam)">01</span>
          <p class="rv-title">Row title</p>
          <span class="rv-micro">NOW OPEN</span>
        </div>
        <div class="rv-row">
          <span class="rv-micro" style="color: var(--beam)">02</span>
          <p class="rv-title">Another row</p>
          <span class="rv-micro">SEPTEMBER</span>
        </div>
      </div>
    </div>
  </section>

  <section class="rv-section rv-field-night">
    <div class="rv-wrap">
      <h2 class="rv-d3 design-section-title">Motion tokens</h2>
      <dl class="motion-list">
        {#each motion as [token, desc] (token)}
          <div class="motion-row">
            <dt class="rv-micro">{token}</dt>
            <dd class="rv-body">{desc}</dd>
          </div>
        {/each}
      </dl>
    </div>
  </section>
</div>

<style>
  .design-eyebrow {
    color: var(--beam);
    margin-bottom: var(--space-2);
  }

  .design-section-title {
    margin-bottom: var(--space-5);
  }

  .design-note {
    margin: var(--space-5) 0 var(--space-4);
    color: var(--muted);
  }

  .swatch-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
    gap: var(--gutter);
  }

  .swatch-color {
    height: 72px;
    border-radius: var(--radius-card);
    border: 1px solid var(--hairline);
    margin-bottom: var(--space-2);
  }

  .swatch-hex {
    color: var(--muted);
  }

  .type-label {
    color: var(--dusk-body);
    margin-top: 4px;
  }
  .rv-field-cloud .type-label {
    color: var(--muted);
  }

  .space-bars {
    display: flex;
    flex-direction: column;
    gap: var(--space-2);
  }

  .space-row {
    display: grid;
    grid-template-columns: 120px 1fr 60px;
    align-items: center;
    gap: var(--space-2);
  }

  .space-label {
    color: var(--muted);
  }

  .space-bar {
    height: 8px;
    background: var(--beam);
    border-radius: 4px;
  }

  .demo-row {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-3);
  }

  .form-demo {
    max-width: 420px;
    display: flex;
    flex-direction: column;
    gap: var(--space-2);
  }

  .row-demo .rv-row:first-child {
    border-top: 1px solid var(--hairline);
  }

  .motion-list {
    display: flex;
    flex-direction: column;
    gap: var(--space-2);
    margin: 0;
  }

  .motion-row {
    display: grid;
    grid-template-columns: 160px 1fr;
    gap: var(--space-3);
  }

  .motion-row dd {
    margin: 0;
    color: var(--dusk-body);
  }
</style>
