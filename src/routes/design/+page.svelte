<script lang="ts">
  const brandColors = [
    { name: 'Primary', val: '#F27830', light: true },
    { name: 'Primary Active', val: '#BD5E25', light: true },
    { name: 'Primary Disabled', val: '#e6dfd8', light: false },
    { name: 'Primary Light', val: '#F69A64', light: true },
    { name: 'Accent Teal', val: '#5db8a6', light: true },
    { name: 'Accent Amber', val: '#ffb200', light: true },
  ];
  const surfaceColors = [
    { name: 'Canvas', val: '#faf9f5', light: false },
    { name: 'Surface Soft', val: '#f5f0e8', light: false },
    { name: 'Surface Card', val: '#efe9de', light: false },
    { name: 'Cream Strong', val: '#e8e0d2', light: false },
    { name: 'Hairline', val: '#e6dfd8', light: false },
    { name: 'Hairline Soft', val: '#ebe6df', light: false },
    { name: 'Surface Dark', val: '#181715', light: true },
    { name: 'Dark Elevated', val: '#252320', light: true },
    { name: 'Dark Soft', val: '#1f1e1b', light: true },
  ];
  const textColors = [
    { name: 'Ink', val: '#141413', light: true },
    { name: 'Body Strong', val: '#252523', light: true },
    { name: 'Body', val: '#3d3d3a', light: true },
    { name: 'Muted', val: '#6c6a64', light: true },
    { name: 'Muted Soft', val: '#8e8b82', light: true },
    { name: 'On Primary', val: '#ffffff', light: false },
    { name: 'On Dark', val: '#faf9f5', light: false },
    { name: 'On Dark Soft', val: '#a09d96', light: true },
  ];
  const semanticColors = [
    { name: 'Success', val: '#5db872', light: true },
    { name: 'Warning', val: '#d4a017', light: true },
    { name: 'Error', val: '#ff372d', light: true },
    { name: 'Info', val: '#4a8ecf', light: true },
  ];
  const spacings = [
    { name: 'xxs', px: 4, val: '4px' },
    { name: 'xs', px: 8, val: '8px' },
    { name: 'sm', px: 12, val: '12px' },
    { name: 'md', px: 16, val: '16px' },
    { name: 'lg', px: 24, val: '24px' },
    { name: 'xl', px: 32, val: '32px' },
    { name: 'xxl', px: 48, val: '48px' },
    { name: 'section', px: 96, val: '96px' },
  ];
  const radii = [
    { name: 'xs', val: '4px' },
    { name: 'sm', val: '6px' },
    { name: 'md', val: '8px' },
    { name: 'lg', val: '12px' },
    { name: 'xl', val: '16px' },
    { name: 'pill', val: '9999px' },
  ];
  const codeSample = `<span class="token-teal">function</span> <span class="token-coral">evaluate</span>(pos: Position): <span class="token-teal">number</span> {
  <span class="token-amber">const</span> score = material(pos) + positional(pos);
  <span class="token-amber">return</span> score;
}`;
</script>

<div class="page-shell">
  <nav class="top-nav">
    <div class="container nav-inner">
      <span class="brand-lockup">
        <span class="spike-mark"></span>
        Design System
      </span>
      <div class="nav-actions">
        <a href="/" class="button-text">Home</a>
      </div>
    </div>
  </nav>

  <header class="hero-band">
    <div class="container">
      <span class="badge-coral">v1.0</span>
      <h1 class="display-xl" style="margin-top:16px">Design System</h1>
      <p class="lead">Every token, component, and pattern in the BEEE design system.</p>
    </div>
  </header>

  <!-- ── Colors ── -->
  <section class="section-band">
    <div class="container">
      <h2 class="display-md" style="margin-bottom:32px">Colors</h2>

      <h3 class="title-md" style="margin-bottom:16px">Brand &amp; Accent</h3>
      <div class="swatch-grid">
        {#each brandColors as c}
          <div class="swatch-card">
            <div class="swatch" style="background:{c.val}">
              <span class="swatch-label" class:swatch-label-light={c.light}>{c.name}</span>
            </div>
            <div class="swatch-meta">
              <strong>{c.name}</strong>
              <code>{c.val}</code>
            </div>
          </div>
        {/each}
      </div>

      <h3 class="title-md" style="margin:32px 0 16px">Surface</h3>
      <div class="swatch-grid">
        {#each surfaceColors as c}
          <div class="swatch-card">
            <div class="swatch" style="background:{c.val}">
              <span class="swatch-label" class:swatch-label-light={c.light}>{c.name}</span>
            </div>
            <div class="swatch-meta">
              <strong>{c.name}</strong>
              <code>{c.val}</code>
            </div>
          </div>
        {/each}
      </div>

      <h3 class="title-md" style="margin:32px 0 16px">Text</h3>
      <div class="swatch-grid">
        {#each textColors as c}
          <div class="swatch-card">
            <div class="swatch" style="background:{c.val}">
              <span class="swatch-label" class:swatch-label-light={c.light}>{c.name}</span>
            </div>
            <div class="swatch-meta">
              <strong>{c.name}</strong>
              <code>{c.val}</code>
            </div>
          </div>
        {/each}
      </div>

      <h3 class="title-md" style="margin:32px 0 16px">Semantic</h3>
      <div class="swatch-grid">
        {#each semanticColors as c}
          <div class="swatch-card">
            <div class="swatch" style="background:{c.val}">
              <span class="swatch-label" class:swatch-label-light={c.light}>{c.name}</span>
            </div>
            <div class="swatch-meta">
              <strong>{c.name}</strong>
              <code>{c.val}</code>
            </div>
          </div>
        {/each}
      </div>
    </div>
  </section>

  <!-- ── Typography ── -->
  <section class="section-band section-soft">
    <div class="container">
      <h2 class="display-md" style="margin-bottom:32px">Typography</h2>

      <div class="type-card">
        <div class="type-meta"><strong>display-xl</strong> 64px / 1.05 / -1.5px &middot; Cormorant Garamond</div>
        <div class="type-sample type-display-xl">The quick brown fox</div>
      </div>
      <div class="type-card">
        <div class="type-meta"><strong>display-lg</strong> 48px / 1.1 / -1px &middot; Cormorant Garamond</div>
        <div class="type-sample type-display-lg">The quick brown fox</div>
      </div>
      <div class="type-card">
        <div class="type-meta"><strong>display-md</strong> 36px / 1.15 / -0.5px &middot; Cormorant Garamond</div>
        <div class="type-sample type-display-md">The quick brown fox</div>
      </div>
      <div class="type-card">
        <div class="type-meta"><strong>display-sm</strong> 28px / 1.2 / -0.3px &middot; Cormorant Garamond</div>
        <div class="type-sample type-display-sm">The quick brown fox</div>
      </div>
      <div class="type-card">
        <div class="type-meta"><strong>title-lg</strong> 22px / 1.3 / 500 &middot; Inter</div>
        <div class="type-sample type-title-lg">The quick brown fox jumps over the lazy dog</div>
      </div>
      <div class="type-card">
        <div class="type-meta"><strong>title-md</strong> 18px / 1.4 / 500 &middot; Inter</div>
        <div class="type-sample type-title-md">The quick brown fox jumps over the lazy dog</div>
      </div>
      <div class="type-card">
        <div class="type-meta"><strong>title-sm</strong> 16px / 1.4 / 500 &middot; Inter</div>
        <div class="type-sample type-title-sm">The quick brown fox jumps over the lazy dog</div>
      </div>
      <div class="type-card">
        <div class="type-meta"><strong>body-md</strong> 16px / 1.55 / 400 &middot; Inter</div>
        <div class="type-sample type-body-md">The quick brown fox jumps over the lazy dog. Pack my box with five dozen liquor jugs. The five boxing wizards jump quickly.</div>
      </div>
      <div class="type-card">
        <div class="type-meta"><strong>body-sm</strong> 14px / 1.55 / 400 &middot; Inter</div>
        <div class="type-sample type-body-sm">The quick brown fox jumps over the lazy dog. Pack my box with five dozen liquor jugs.</div>
      </div>
      <div class="type-card">
        <div class="type-meta"><strong>caption</strong> 13px / 1.4 / 500 &middot; Inter</div>
        <div class="type-sample type-caption">The quick brown fox jumps over the lazy dog</div>
      </div>
      <div class="type-card">
        <div class="type-meta"><strong>caption-uppercase</strong> 12px / 1.4 / 500 / 1.5px tracking &middot; Inter</div>
        <div class="type-sample type-caption-uppercase">The quick brown fox jumps over</div>
      </div>
      <div class="type-card">
        <div class="type-meta"><strong>code</strong> 14px / 1.6 &middot; JetBrains Mono</div>
        <div class="type-sample type-code">const hello = (name: string) =&gt; `Hello, $&#123;name}!`;</div>
      </div>
      <div class="type-card">
        <div class="type-meta"><strong>button</strong> 14px / 1.0 / 500 &middot; Inter</div>
        <div class="type-sample type-button">Button Label</div>
      </div>
      <div class="type-card">
        <div class="type-meta"><strong>nav-link</strong> 14px / 1.4 / 500 &middot; Inter</div>
        <div class="type-sample type-nav-link">Navigation Link</div>
      </div>
    </div>
  </section>

  <!-- ── Spacing ── -->
  <section class="section-band">
    <div class="container">
      <h2 class="display-md" style="margin-bottom:32px">Spacing</h2>
      <div class="spacing-grid">
        {#each spacings as s}
          <div class="spacing-row">
            <code class="spacing-label">{s.name}</code>
            <code class="spacing-label">{s.val}</code>
            <div class="spacing-bar-wrap">
              <div class="spacing-bar" style="width:{s.px}px"></div>
            </div>
          </div>
        {/each}
      </div>
    </div>
  </section>

  <!-- ── Border Radius ── -->
  <section class="section-band section-soft">
    <div class="container">
      <h2 class="display-md" style="margin-bottom:32px">Border Radius</h2>
      <div class="radius-grid">
        {#each radii as r}
          <div class="radius-card">
            <div class="radius-demo" style="border-radius:{r.val}">
              <span>{r.val}</span>
            </div>
            <div class="radius-meta">
              <strong>{r.name}</strong>
              <code>{r.val}</code>
            </div>
          </div>
        {/each}
      </div>
    </div>
  </section>

  <!-- ── Buttons ── -->
  <section class="section-band">
    <div class="container">
      <h2 class="display-md" style="margin-bottom:32px">Buttons</h2>

      <div class="component-section">
        <h3 class="title-sm" style="margin-bottom:16px">Primary</h3>
        <div class="button-row">
          <button class="button-primary">Default</button>
          <button class="button-primary button-pulse">Pulse</button>
          <button class="button-primary" disabled>Disabled</button>
        </div>
      </div>

      <div class="component-section">
        <h3 class="title-sm" style="margin-bottom:16px">Secondary</h3>
        <div class="button-row">
          <button class="button-secondary">Default</button>
        </div>
      </div>

      <div class="component-section" style="background:var(--surface-dark);padding:32px;border-radius:12px">
        <h3 class="title-sm" style="margin-bottom:16px;color:var(--on-dark)">Secondary on Dark</h3>
        <div class="button-row">
          <button class="button-secondary-dark">Default</button>
        </div>
      </div>

      <div class="component-section">
        <h3 class="title-sm" style="margin-bottom:16px">Cream</h3>
        <div class="button-row">
          <button class="button-cream">Default</button>
        </div>
      </div>

      <div class="component-section">
        <h3 class="title-sm" style="margin-bottom:16px">Text Link</h3>
        <div class="button-row">
          <a href="/design" class="text-link">Text Link</a>
        </div>
      </div>

      <div class="component-section">
        <h3 class="title-sm" style="margin-bottom:16px">Icon Circular</h3>
        <div class="button-row">
          <button class="icon-btn">&larr;</button>
          <button class="icon-btn">&rarr;</button>
        </div>
      </div>
    </div>
  </section>

  <!-- ── Cards ── -->
  <section class="section-band section-soft">
    <div class="container">
      <h2 class="display-md" style="margin-bottom:32px">Cards</h2>

      <div class="component-section">
        <h3 class="title-sm" style="margin-bottom:16px">Feature Card</h3>
        <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:24px">
          <div class="feature-card">
            <span class="spike-mark"></span>
            <h3>Feature Title</h3>
            <p>Feature description text that explains the benefit in a clear and concise way.</p>
          </div>
          <div class="feature-card">
            <span class="spike-mark"></span>
            <h3>Another Feature</h3>
            <p>Another compelling benefit that uses the same card pattern.</p>
          </div>
          <div class="feature-card">
            <span class="spike-mark"></span>
            <h3>Third Feature</h3>
            <p>Yet another great feature that rounds out the offering.</p>
          </div>
        </div>
      </div>

      <div class="component-section" style="margin-top:32px">
        <h3 class="title-sm" style="margin-bottom:16px">Product Mockup Card (Dark)</h3>
        <div class="dark-preview">
          <div class="mockup-card">
            <div class="mockup-header">
              <span class="status-dot"></span>
              <span style="color:var(--on-dark-soft);font-size:13px">Claude</span>
              <span style="color:var(--on-dark-soft);font-size:13px">&#x22EF;</span>
            </div>
            <div class="mockup-body">
              <div class="mockup-line"><span class="token-teal">const</span> strategy <span class="token-coral">=</span> <span class="token-amber">new</span> SearchStrategy()</div>
              <div class="mockup-line"><span class="token-teal">const</span> result <span class="token-coral">=</span> <span class="token-amber">await</span> strategy.analyze(board)</div>
            </div>
          </div>
        </div>
      </div>

      <div class="component-section" style="margin-top:32px">
        <h3 class="title-sm" style="margin-bottom:16px">Code Window Card</h3>
        <div class="code-window">
          <div class="code-titlebar">
            <span>main.ts</span>
            <span>&#x22EF;</span>
          </div>
          <pre class="code-body">{@html codeSample}</pre>
        </div>
      </div>

      <div class="component-section" style="margin-top:32px">
        <h3 class="title-sm" style="margin-bottom:16px">Pricing Tier Card</h3>
        <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:24px">
          <div class="pricing-card">
            <h3 class="title-lg">Free</h3>
            <p class="display-sm">$0</p>
            <ul class="pricing-list">
              <li>Basic features</li>
              <li>1 user</li>
              <li>Community support</li>
            </ul>
            <button class="button-secondary" style="width:100%">Get Started</button>
          </div>
          <div class="pricing-card pricing-card-featured">
            <span class="badge-coral" style="margin-bottom:12px">POPULAR</span>
            <h3 class="title-lg" style="color:var(--on-dark)">Pro</h3>
            <p class="display-sm" style="color:var(--on-dark)">$29</p>
            <ul class="pricing-list" style="color:var(--on-dark-soft)">
              <li>All features</li>
              <li>Up to 10 users</li>
              <li>Priority support</li>
            </ul>
            <button class="button-cream" style="width:100%">Get Started</button>
          </div>
          <div class="pricing-card">
            <h3 class="title-lg">Enterprise</h3>
            <p class="display-sm">$99</p>
            <ul class="pricing-list">
              <li>Everything in Pro</li>
              <li>Unlimited users</li>
              <li>Dedicated support</li>
            </ul>
            <button class="button-secondary" style="width:100%">Contact Us</button>
          </div>
        </div>
      </div>

      <div class="component-section" style="margin-top:32px">
        <h3 class="title-sm" style="margin-bottom:16px">Connector Tile</h3>
        <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:16px">
          {#each ['Chess.com', 'Lichess', 'Stockfish', 'Leela'] as name}
            <div class="connector-tile">
              <div class="tile-icon"></div>
              <strong>{name}</strong>
              <span>Connect and analyze</span>
            </div>
          {/each}
        </div>
      </div>

      <div class="component-section" style="margin-top:32px">
        <h3 class="title-sm" style="margin-bottom:16px">Callout Card (Coral CTA)</h3>
        <div class="cta-card">
          <div>
            <h2 class="display-sm">Ready to get started?</h2>
            <p>Join thousands of teams already using BEEE to improve their game.</p>
          </div>
          <button class="button-cream">Get Started</button>
        </div>
      </div>
    </div>
  </section>

  <!-- ── Form Elements ── -->
  <section class="section-band">
    <div class="container">
      <h2 class="display-md" style="margin-bottom:32px">Form Elements</h2>

      <div class="component-section">
        <h3 class="title-sm" style="margin-bottom:16px">Text Input</h3>
        <div style="max-width:400px;display:grid;gap:16px">
          <div class="field">
            <label for="input-default">Default</label>
            <input id="input-default" type="text" class="text-input" placeholder="Placeholder text" />
          </div>
          <div class="field">
            <label for="input-focused">Focused</label>
            <input id="input-focused" type="text" class="text-input input-focus" placeholder="Focused input" value="Input with value" />
          </div>
          <div class="field">
            <label for="input-textarea">Textarea</label>
            <textarea id="input-textarea" class="text-area" placeholder="Multi-line text input"></textarea>
          </div>
        </div>
      </div>

      <div class="component-section" style="margin-top:32px">
        <h3 class="title-sm" style="margin-bottom:16px">Badges &amp; Pills</h3>
        <div style="display:flex;gap:12px;flex-wrap:wrap;align-items:center">
          <span class="badge-pill">Category</span>
          <span class="badge-coral">New</span>
          <span class="badge-coral">Beta</span>
          <span class="eyebrow">
            <span class="status-dot"></span>
            Online
          </span>
          <span class="price-badge">Early Bird</span>
        </div>
      </div>

      <div class="component-section" style="margin-top:32px">
        <h3 class="title-sm" style="margin-bottom:16px">Category Tabs</h3>
        <div style="display:flex;gap:8px">
          <button class="category-tab category-tab-active">All</button>
          <button class="category-tab">Tournaments</button>
          <button class="category-tab">Lessons</button>
          <button class="category-tab">Analysis</button>
        </div>
      </div>
    </div>
  </section>

  <!-- ── Messages ── -->
  <section class="section-band section-soft">
    <div class="container">
      <h2 class="display-md" style="margin-bottom:32px">Messages</h2>
      <div style="max-width:600px;display:grid;gap:16px">
        <div class="error-message">Something went wrong. Please try again.</div>
        <div class="success-message">Your changes have been saved successfully.</div>
      </div>
    </div>
  </section>

  <!-- ── Navigation Pattern ── -->
  <section class="section-band">
    <div class="container">
      <h2 class="display-md" style="margin-bottom:32px">Navigation</h2>
      <div style="display:grid;gap:16px;max-width:600px">
        <div class="top-nav" style="position:static;border-radius:12px">
          <div class="container nav-inner" style="width:100%">
            <span class="brand-lockup">
              <span class="spike-mark"></span>
              Brand
            </span>
            <div class="nav-links">
              <a href="/design">Product</a>
              <a href="/design">Pricing</a>
              <a href="/design">Docs</a>
            </div>
            <div class="nav-actions">
              <span class="button-text">Sign in</span>
              <button class="button-primary">Try it</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- ── Footer Pattern ── -->
  <section class="section-band" style="padding-bottom:0">
    <div class="container">
      <h2 class="display-md" style="margin-bottom:32px">Footer</h2>
    </div>
  </section>
  <footer class="footer">
    <div class="container">
      <div class="footer-grid">
        <div>
          <span class="brand-lockup" style="color:var(--on-dark)">
            <span class="spike-mark"></span>
            BEEE
          </span>
        </div>
        <div>
          <strong>Product</strong>
          <a href="/design">Features</a>
          <a href="/design">Pricing</a>
        </div>
        <div>
          <strong>Company</strong>
          <a href="/design">About</a>
          <a href="/design">Blog</a>
        </div>
        <div>
          <strong>Legal</strong>
          <a href="/design">Privacy</a>
          <a href="/design">Terms</a>
        </div>
      </div>
    </div>
  </footer>
</div>

<style>
  .swatch-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
    gap: 16px;
  }
  .swatch-card {
    overflow: hidden;
    border-radius: 8px;
    border: 1px solid var(--hairline);
    background: var(--canvas);
  }
  .swatch {
    height: 80px;
    display: grid;
    place-items: center;
    padding: 8px;
  }
  .swatch-label {
    font-size: 11px;
    font-weight: 600;
    color: var(--ink);
    text-transform: uppercase;
    letter-spacing: 0.5px;
    padding: 2px 6px;
    border-radius: 4px;
    background: rgba(255,255,255,0.85);
  }
  .swatch-label-light {
    color: var(--on-dark);
    background: rgba(0,0,0,0.45);
  }
  .swatch-meta {
    padding: 10px 12px;
    display: grid;
    gap: 2px;
  }
  .swatch-meta strong {
    font-size: 13px;
    font-weight: 500;
    color: var(--ink);
  }
  .swatch-meta code {
    font-size: 11px;
    color: var(--muted);
    font-family: var(--font-code);
  }
  .type-card {
    padding: 20px;
    border-bottom: 1px solid var(--hairline-soft);
  }
  .type-card:last-child {
    border-bottom: 0;
  }
  .type-meta {
    font-size: 13px;
    color: var(--muted);
    margin-bottom: 8px;
  }
  .type-sample {
    margin: 0;
  }
  .type-display-xl {
    font-family: var(--font-display);
    font-size: 48px;
    font-weight: 500;
    line-height: 1.1;
    letter-spacing: -0.02em;
    color: var(--ink);
  }
  .type-display-lg {
    font-family: var(--font-display);
    font-size: 48px;
    font-weight: 500;
    line-height: 1.1;
    letter-spacing: -0.01em;
    color: var(--ink);
  }
  .type-display-md {
    font-family: var(--font-display);
    font-size: 36px;
    font-weight: 500;
    line-height: 1.15;
    letter-spacing: -0.01em;
    color: var(--ink);
  }
  .type-display-sm {
    font-family: var(--font-display);
    font-size: 28px;
    font-weight: 500;
    line-height: 1.2;
    letter-spacing: -0.01em;
    color: var(--ink);
  }
  .type-title-lg {
    font-family: var(--font-body);
    font-size: 22px;
    font-weight: 500;
    line-height: 1.3;
    color: var(--ink);
  }
  .type-title-md {
    font-family: var(--font-body);
    font-size: 18px;
    font-weight: 500;
    line-height: 1.4;
    color: var(--ink);
  }
  .type-title-sm {
    font-family: var(--font-body);
    font-size: 16px;
    font-weight: 500;
    line-height: 1.4;
    color: var(--ink);
  }
  .type-body-md {
    font-family: var(--font-body);
    font-size: 16px;
    font-weight: 400;
    line-height: 1.55;
    color: var(--body);
  }
  .type-body-sm {
    font-family: var(--font-body);
    font-size: 14px;
    font-weight: 400;
    line-height: 1.55;
    color: var(--body);
  }
  .type-caption {
    font-family: var(--font-body);
    font-size: 13px;
    font-weight: 500;
    line-height: 1.4;
    color: var(--ink);
  }
  .type-caption-uppercase {
    font-family: var(--font-body);
    font-size: 12px;
    font-weight: 500;
    line-height: 1.4;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    color: var(--ink);
  }
  .type-code {
    font-family: var(--font-code);
    font-size: 14px;
    font-weight: 400;
    line-height: 1.6;
    color: var(--ink);
  }
  .type-button {
    font-family: var(--font-body);
    font-size: 14px;
    font-weight: 500;
    line-height: 1;
    color: var(--ink);
  }
  .type-nav-link {
    font-family: var(--font-body);
    font-size: 14px;
    font-weight: 500;
    line-height: 1.4;
    color: var(--ink);
  }
  .spacing-grid {
    display: grid;
    gap: 12px;
  }
  .spacing-row {
    display: grid;
    grid-template-columns: 80px 60px 1fr;
    gap: 16px;
    align-items: center;
  }
  .spacing-label {
    font-family: var(--font-code);
    font-size: 13px;
    color: var(--muted);
  }
  .spacing-bar-wrap {
    height: 20px;
    display: flex;
    align-items: center;
  }
  .spacing-bar {
    height: 8px;
    border-radius: 4px;
    background: var(--primary);
    opacity: 0.5;
    min-width: 4px;
  }
  .radius-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
    gap: 20px;
  }
  .radius-card {
    text-align: center;
  }
  .radius-demo {
    width: 80px;
    height: 80px;
    background: var(--surface-card);
    border: 2px solid var(--hairline);
    margin: 0 auto 12px;
    display: grid;
    place-items: center;
  }
  .radius-demo span {
    font-family: var(--font-code);
    font-size: 11px;
    color: var(--muted);
  }
  .radius-meta strong {
    display: block;
    font-size: 13px;
    font-weight: 500;
    color: var(--ink);
  }
  .radius-meta code {
    font-size: 11px;
    color: var(--muted);
    font-family: var(--font-code);
  }
  .component-section {
    margin-bottom: 40px;
  }
  .button-row {
    display: flex;
    gap: 12px;
    flex-wrap: wrap;
    align-items: center;
  }
  .text-link {
    color: var(--primary);
    font-size: 16px;
    line-height: 1.55;
    cursor: pointer;
  }
  .text-link:hover {
    text-decoration: underline;
  }
  .icon-btn {
    width: 36px;
    height: 36px;
    border-radius: 999px;
    border: 1px solid var(--hairline);
    background: var(--canvas);
    color: var(--ink);
    display: grid;
    place-items: center;
    font-size: 16px;
  }
  .button-pulse {
    animation: button-pulse 3.8s ease-in-out infinite;
  }
  .dark-preview {
    background: var(--surface-dark);
    border-radius: 12px;
    padding: 32px;
  }
  .mockup-card {
    background: var(--surface-dark);
    border: 1px solid rgba(250,249,245,0.1);
    border-radius: 8px;
    overflow: hidden;
  }
  .mockup-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 14px 16px;
    border-bottom: 1px solid rgba(250,249,245,0.08);
  }
  .mockup-body {
    padding: 20px;
    display: grid;
    gap: 8px;
  }
  .mockup-line {
    font-family: var(--font-code);
    font-size: 13px;
    color: var(--on-dark);
    line-height: 1.6;
  }
  .pricing-card {
    border-radius: 12px;
    background: var(--canvas);
    border: 1px solid var(--hairline);
    padding: 32px;
    display: grid;
    gap: 16px;
  }
  .pricing-card-featured {
    background: var(--surface-dark);
    border-color: transparent;
  }
  .pricing-list {
    list-style: none;
    padding: 0;
    margin: 0;
    display: grid;
    gap: 10px;
  }
  .pricing-list li {
    color: var(--body);
    font-size: 14px;
    line-height: 1.45;
    padding-left: 20px;
    position: relative;
  }
  .pricing-list li::before {
    content: '';
    position: absolute;
    left: 0;
    top: 6px;
    width: 6px;
    height: 6px;
    border-radius: 999px;
    background: var(--primary);
  }
  .pricing-card-featured .pricing-list li {
    color: var(--on-dark-soft);
  }
  .pricing-card-featured .pricing-list li::before {
    background: var(--accent-teal);
  }
  .connector-tile {
    border-radius: 12px;
    background: var(--canvas);
    border: 1px solid var(--hairline);
    padding: 20px;
    display: grid;
    gap: 8px;
  }
  .connector-tile strong {
    font-size: 16px;
    font-weight: 500;
    color: var(--ink);
  }
  .connector-tile span {
    font-size: 14px;
    color: var(--muted);
    line-height: 1.45;
  }
  .tile-icon {
    width: 32px;
    height: 32px;
    border-radius: 8px;
    background: var(--surface-card);
  }
  .input-focus {
    border: 2px solid var(--primary);
    box-shadow: 0 0 0 3px rgba(255,102,0,0.15);
  }
  .category-tab {
    display: inline-flex;
    align-items: center;
    padding: 8px 14px;
    border-radius: 8px;
    background: transparent;
    color: var(--muted);
    font-size: 14px;
    font-weight: 500;
    line-height: 1.4;
    border: none;
    cursor: pointer;
  }
  .category-tab-active {
    background: var(--surface-card);
    color: var(--ink);
  }
</style>
