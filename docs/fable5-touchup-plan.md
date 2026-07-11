# BEEE Site Touch-Up Plan — Creative-Director Pass (Fable 5)

**Audience for this document:** an implementing model/developer with no design training. Every change gives the exact file, selector, values, before→after code, the reason, and the expected effect. Implement top-to-bottom within each part; Part 1 (global) unlocks most of the visual gain.

**Evidence base:** full-page production screenshots in `docs/screenshots/` (desktop 1847px, taken 2026-07-11) + full source read. The hero image "cut" on the home screenshot is the scroll-pin effect and the register-modal duplication is a full-page-capture artifact — both confirmed fine, do not "fix" them.

**Hard rules (from the brief):**
- Do NOT change any copy, images, or the set/order of sections. Restyle/restructure only.
- No 3D / scroll-narrative rebuild.
- Stay in the navy `#0A0F1A` / amber `#ffb200` / cream `#faf9f5` brand.
- Every motion spec must have a `prefers-reduced-motion` fallback and degrade gracefully on mobile.

---

## Part 0 — The one design call everything else follows

**What's wrong today (root cause of "decent, not exceptional"):** the site speaks two visual languages and three accent colors.

| | Home (`/`) | Sub-pages (`/about`, `/e4`, `/taskify`, `/teamup`, `/faq`, `/affiliate`, `/login`) |
|---|---|---|
| Surface | Navy `#0A0F1A` | Cream `#faf9f5` |
| Display font | Space Grotesk (`--font-hero`) | Cormorant Garamond serif (`--font-display`) |
| Accent | Amber… actually **three ambers**: Tailwind `amber-400` `#fbbf24`, brand `#ffb200`, hardcoded `#FFC72C` | Orange `#F27830` (buttons, nav active, eyebrows) |
| CTA | Orange gradient pill, white text | Same orange gradient |

A parent clicking from the navy/amber home to the cream/serif About page experiences a brand break — it reads as two different companies. Award-level sites feel like **one voice at different volumes**.

**The system (apply everywhere):**

1. **One amber:** `#ffb200` (`--color-amber`). Kill `#fbbf24` and `#FFC72C` by remapping/replacing (Part 1.1).
2. **One CTA look:** solid amber pill `#ffb200` with **ink text** `#141413` (contrast 9.9:1 — passes AAA; the current white-on-orange gradient is ~2.9:1 and *fails* WCAG). Hover darkens to `#e6a000`, active `#cc8f00`. This gives the site a signature button that works on navy AND cream. (Part 1.2)
3. **Type roles:**
   - **Space Grotesk (`--font-hero`)** = all display headlines and section titles, site-wide.
   - **Inter (`--font-body`)** = all body text and UI.
   - **Cormorant Garamond (`--font-display`)** = *accent only*: the footer wordmark, pull-quote paragraphs (About belief text), the ₦ price. Serif becomes a deliberate "editorial accent", not a competing brand.
   - Kill `Montserrat` (only used in the home Journey diagram) and reduce `--font-registration` usage to forms where it already is (fine).
4. **Cream is a brand surface, not a different site.** Sub-pages keep cream backgrounds; unification comes from type + accent + nav + footer.
5. **Standard motion recipe** (used by every "reveal" below): fade-up 24px, 600ms, `cubic-bezier(0.22, 1, 0.36, 1)`, stagger 80ms between siblings, triggered at `top 80%`. Hovers: 160–300ms ease-out transforms ≤4px or scale ≤1.03. All JS-driven motion is already gated behind `matchMedia('(prefers-reduced-motion: reduce)')` — keep that pattern; all new CSS transitions must be wrapped in `@media (prefers-reduced-motion: no-preference)`.

---

## Part 1 — Global fixes (do these first; they touch every page)

### 1.1 Unify the three ambers into `#ffb200`

**Why:** `bg-amber-400`/`text-amber-400` (used ~15× on home) is Tailwind's default `#fbbf24` — a paler, greener yellow than the brand `#ffb200`. The Journey diagram hardcodes a third (`#FFC72C`). Three near-identical yellows make the site feel imprecise; one exact amber makes it feel engineered.

**File:** `src/styles/theme.css` → inside the `@theme` block (after line 19 `--color-amber: #ffb200;`).

Before:
```css
  --color-navy: #0A0F1A;
  --color-navy-blob: #1A2B4C;
  ...
  --color-amber: #ffb200;
```
After (add two lines — Tailwind v4 lets you remap the default scale token, so every existing `amber-400` class instantly becomes brand amber with zero markup edits):
```css
  --color-navy: #0A0F1A;
  --color-navy-blob: #1A2B4C;
  ...
  --color-amber: #ffb200;
  --color-amber-400: #ffb200;   /* remap Tailwind amber-400 → brand amber */
  --color-amber-500: #e6a000;   /* hover/darker step for amber surfaces */
```

**Also:** in `src/routes/+page.svelte` replace **every** occurrence of `#FFC72C` (10 occurrences: lines 219, 234, 236, 251, 265×2, 278, 350, 371, 386, 399, 404, 421–428 area — do a find/replace within this file) with `#ffb200`.

**Expected effect:** all yellows on home (hero H1, pills, philosophy sections, diagram, "Make Your Move") snap to one hue. Subtle, but it's the difference between "yellow-ish" and "branded".

### 1.2 One signature CTA — `src/lib/components/Button.svelte`

**Why:** the orange gradient (`#ff8a3a→#ff6b00→#e55c00`) is off-palette and white-on-orange fails contrast. 14px text is too small for the primary conversion button. There's a `box-shadow` transition declared but no shadow change, so hover feels dead.

**Location:** `Button.svelte` → `.btn` rule (lines 38–64).

Before:
```css
  .btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: 999px;
    border: none;
    background: linear-gradient(rgb(255, 138, 58) 0%, rgb(255, 107, 0) 50%, rgb(229, 92, 0) 100%);
    color: #fff;
    font-size: 14px;
    font-weight: 500;
    line-height: 1;
    text-decoration: none;
    cursor: pointer;
    transition: transform 160ms ease, box-shadow 160ms ease;
    white-space: nowrap;
    opacity: 1;
  }
  .btn:hover:not(:disabled) {
    transform: scale(1.02);
  }
  .btn:active:not(:disabled) {
    transform: scale(0.98);
  }
  .btn:disabled {
    cursor: not-allowed;
    transform: none;
  }
```
After:
```css
  .btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: 999px;
    border: none;
    background: var(--accent-amber, #ffb200);
    color: #141413;
    font-size: 15px;
    font-weight: 600;
    letter-spacing: 0.01em;
    line-height: 1;
    text-decoration: none;
    cursor: pointer;
    transition: transform 160ms ease, box-shadow 160ms ease, background-color 160ms ease;
    white-space: nowrap;
    opacity: 1;
    box-shadow: 0 1px 2px rgba(10, 15, 26, 0.12);
  }
  .btn:hover:not(:disabled) {
    background: #e6a000;
    transform: translateY(-1px);
    box-shadow: 0 6px 20px rgba(255, 178, 0, 0.28), 0 2px 6px rgba(10, 15, 26, 0.10);
  }
  .btn:active:not(:disabled) {
    background: #cc8f00;
    transform: translateY(0) scale(0.98);
    box-shadow: 0 1px 2px rgba(10, 15, 26, 0.12);
  }
  .btn:focus-visible {
    outline: 2px solid #141413;
    outline-offset: 3px;
  }
  .btn:disabled {
    cursor: not-allowed;
    transform: none;
    background: #e6dfd8;
    color: #8e8b82;
    box-shadow: none;
  }
  @media (prefers-reduced-motion: reduce) {
    .btn, .btn:hover:not(:disabled), .btn:active:not(:disabled) { transform: none; }
  }
```

**Why these values:** ink-on-amber is the highest-contrast expression of the brand; the amber glow on hover (`rgba(255,178,0,0.28)`) makes the button feel lit, not just moved; explicit disabled colors fix the register page (currently the disabled Register button still shows the full-strength gradient); `focus-visible` gives keyboard users a visible ring.

**Also update the sub-page secondary button** — `src/styles/buttons.css` `.button-primary` (lines 17–38) is used by `class="button-secondary page-hero-btn"` siblings; make `--primary` consumers consistent by changing `.button-primary` background/border from `var(--primary)` to `var(--accent-amber)` and `color` to `#141413`, hover `background: #e6a000`. `.button-secondary` (cream/hairline/ink) is fine as-is.

### 1.3 Fix the navigation pill — `src/lib/components/championship/ChampNav.svelte`

Two real bugs plus a styling refinement:

**Bug A (accessibility, critical):** `.champ-nav-links a { color: #fff }` (line 178) — white links sit on a *white glass* background in light mode (invisible) and on a muddy gray in dark mode (the gray bar you see on every cream page screenshot). The nav must key its text off the theme, not hardcode white.

**Location:** lines 173–198.

Before:
```css
  .champ-nav-links a {
    padding: 10px 22px;
    border-radius: 999px;
    font-size: 15px;
    font-weight: 500;
    color: #fff;
    text-decoration: none;
    transition: background 160ms ease, color 160ms ease;
  }
  ...
  .champ-nav-links a:hover {
    color: var(--ink);
    background: var(--surface-card);
  }
  .champ-nav-links a.active {
    color: var(--primary);
    border-bottom: 2px solid var(--primary);
    padding-bottom: 8px;
    background: transparent;
  }
```
After:
```css
  .champ-nav-links a {
    padding: 10px 22px;
    border-radius: 999px;
    font-size: 15px;
    font-weight: 500;
    color: var(--ink);
    text-decoration: none;
    transition: background 160ms ease, color 160ms ease;
  }
  :global(.dark) .champ-nav-links a {
    color: var(--on-dark);
  }
  ...
  .champ-nav-links a:hover {
    color: var(--ink);
    background: var(--surface-card);
  }
  :global(.dark) .champ-nav-links a:hover {
    color: #141413; /* hover pill is light in both themes */
  }
  .champ-nav-links a.active {
    color: var(--ink);
    border-bottom: 2px solid var(--accent-amber);
    padding-bottom: 8px;
    background: transparent;
  }
  :global(.dark) .champ-nav-links a.active {
    color: #fff;
  }
```

**Refinement B:** the brand wordmark `.champ-nav-name` uses `var(--color-primary)` (orange). Change line 163 `color: var(--color-primary);` → `color: var(--ink);` with `:global(.dark) .champ-nav-name { color: var(--on-dark); }`. The bee logo stays the color carrier; the wordmark reads as text. (Amber text at 18px on white glass would fail contrast — don't use amber here.)

**Why:** navigation is on every page; right now it's the single most broken element on the cream pages. After this change the pill reads crisp on both navy and cream, and the active state is an amber underline — quiet, branded, obvious.

### 1.4 Footer polish — `src/lib/components/home/Footer.svelte`

Issues: the affiliate link is an off-palette cyan `#14d9c4` with a light-blue hover `#a8e8ff`; nav hover is orange `var(--primary)`; content is pinned left with a hardcoded `padding-left: 80px` instead of the site container.

1. **Line 68** `.footer-inner`: replace
   ```css
   margin: 0;
   width: 100%;
   padding-left: 80px;
   ```
   with
   ```css
   width: min(1200px, calc(100% - 48px));
   margin: 0 auto;
   ```
   *(aligns footer content with the nav/page container instead of an arbitrary 80px; the 767px media query's `padding-left: 24px` on line 197 can then be deleted.)*
2. **Line 123** `.footer-nav a:hover { color: var(--primary); }` → `color: var(--accent-amber);`
3. **Lines 163–173** `.footer-affiliate`:
   Before: `color: #14d9c4;` hover `color: #a8e8ff;`
   After: `color: var(--accent-amber);` hover `color: #ffffff;` — the affiliate CTA becomes the only amber link in the footer = it pops without leaving the palette.
4. **Line 175** `.footer-copy { color: var(--muted-soft) }` — `#8e8b82` on navy is 3.4:1; change to `color: var(--on-dark-soft);` (`#a09d96`, 4.6:1).

---

## Part 2 — Home page (`/` — `src/routes/+page.svelte` + `src/lib/components/championship/ChampHero.svelte`)

### What I saw (screenshot notes)
Nav pill → hero (amber H1 *and* huge white H2 competing, then a dense stack of meta rows, two emoji lines, two CTAs) → a full empty viewport created by the image pin → "What Makes…Different?" with 3 flat colored cards of very unequal text density → cream "Everything Your Child Needs" with **amber heading on cream (illegible, ~2.0:1)**, a bento (e4 product shot + "What Players Gain" card whose first pill is clipped and whose pills are 7 different colors incl. pink/purple/green) → "THE CHAMPIONSHIP FRAMEWORK / BEEE PROJECT" org-chart diagram (third amber `#FFC72C`, Montserrat, heavy 2px dotted lines) → giant amber "Make Your Move" → two full-viewport amber philosophy statements (nice moment, keep) → navy "Make Your Move." CTA footer → global footer.

### Ranked critique
1. **Hero hierarchy is inverted** — the *event name* (H1) is styled as a big amber headline directly above the *emotional headline* (H2). Two headlines = no headline.
2. **Hero info-stack is cluttered** — 3 meta items + 2-line amber location + 2 emoji lines + 2 CTAs; the eye has 7 stops before the CTA. Emoji (💻✨) undercut the premium tone.
3. **Amber-on-cream section heading fails contrast** (platform section).
4. **The "What Players Gain" pills introduce 4 off-brand colors** (teal/purple/pink/green) and the first pill gets visually clipped by the card's top padding/rounding at some widths.
5. **The pin dead-zone**: `ScrollTrigger.create({... end: '+=' + imageWrapper.offsetHeight})` adds ~700–800px of scroll where the left column is already gone — feels broken between hero and section 2.
6. **Diff cards**: TASKIFY's long paragraph vs E4's short one leaves the cream card half-empty; body text is `font-semibold` (heavy, shouty); "Learn More →" is a 14px afterthought.
7. **Journey diagram** is competent but noisy: 2px dotted borders everywhere, Montserrat, third amber.
8. Home `<footer id="contact">` giant "Make Your Move." is good, but at `text-[8vw]` + the global footer right after, there are two stacked footers with near-identical copy ("Make Your Move" appears twice within 1.5 viewports).

### Changes

#### 2.1 Hero hierarchy — `ChampHero.svelte` lines 75–81

Before:
```svelte
      <h1 class="hero-anim-elem font-hero text-3xl lg:text-5xl font-bold text-amber-400 leading-[1.1] tracking-tight mb-4">
        BEEE Spectacular Chess Championship Abuja 2026
      </h1>

      <h2 class="hero-anim-elem font-hero text-5xl lg:text-7xl font-extrabold text-white leading-[1.1] tracking-tight mb-6">
        Your child.<br />One board.<br />A lifetime of advantage.
      </h2>
```
After (same copy, same elements — the H1 becomes a kicker/eyebrow so the emotional line owns the page):
```svelte
      <h1 class="hero-anim-elem font-hero text-sm lg:text-base font-semibold uppercase tracking-[0.14em] text-amber-400 mb-5">
        BEEE Spectacular Chess Championship Abuja 2026
      </h1>

      <h2 class="hero-anim-elem font-hero text-5xl lg:text-7xl font-extrabold text-white leading-[1.05] tracking-tight mb-6">
        Your child.<br />One board.<br />A lifetime of advantage.
      </h2>
```
**Why:** one headline, one voice. An uppercase letterspaced kicker is the standard editorial way to keep the event name present without competing. `leading-[1.05]` tightens the big stack so the three lines read as one unit.

#### 2.2 Hero meta de-clutter — `ChampHero.svelte` lines 107–116

Keep all copy; replace the two emoji glyphs with the amber SVG style already used by the meta row (emoji render differently per OS and read as casual). Use a 4px amber left-rule to group the two notes into one quiet block:

Before:
```svelte
      <div class="flex flex-col gap-3 mb-8 text-sm">
        <div class="flex items-start gap-2 text-yellow-500 font-medium">
          <span class="mt-0.5">💻</span>
          <p class="leading-relaxed">Online chess training and self development programs commence July 28, 2026</p>
        </div>
        <div class="flex items-start gap-2 text-gray-200">
          <span class="mt-0.5">✨</span>
          <p>Sign up early to give your child a richer, more rewarding championship experience.</p>
        </div>
      </div>
```
After:
```svelte
      <div class="flex flex-col gap-2 mb-8 text-sm border-l-2 border-amber-400/60 pl-4">
        <p class="leading-relaxed text-amber-400 font-medium">Online chess training and self development programs commence July 28, 2026</p>
        <p class="leading-relaxed text-gray-300">Sign up early to give your child a richer, more rewarding championship experience.</p>
      </div>
```
Also line 102: `text-amber-400/80` → `text-amber-400` and `text-base sm:text-lg` → `text-sm sm:text-base` for the venue block (it currently reads louder than the ₦15,000 meta row above it; venue is supporting info).

#### 2.3 Secondary hero CTA affordance — `ChampHero.svelte` line 120

Before:
```svelte
        <a href="/championship" class="bg-transparent border border-white font-medium px-8 py-4 rounded-full hover:border-white transition-colors w-full sm:w-auto text-center" style="color: #fff">
```
After (border is currently full-white = same weight as text; quiet it, then brighten on hover so hover does something):
```svelte
        <a href="/championship" class="bg-transparent border border-white/40 font-medium px-8 py-4 rounded-full hover:border-white hover:bg-white/5 transition-colors w-full sm:w-auto text-center" style="color: #fff">
```

#### 2.4 Kill the pin dead-zone — `ChampHero.svelte` lines 57–65

Before:
```ts
    ScrollTrigger.create({
      trigger: imageWrapper,
      pin: true,
      start: 'top 15%',
      end: () => '+=' + (imageWrapper?.offsetHeight ?? 500),
      pinSpacing: true,
      onEnter: () => pinned = true,
      onLeaveBack: () => pinned = false,
    });
```
After:
```ts
    ScrollTrigger.create({
      trigger: imageWrapper,
      pin: true,
      start: 'top 15%',
      end: '+=45%',
      pinSpacing: true,
      onEnter: () => pinned = true,
      onLeaveBack: () => pinned = false,
    });
```
**Why:** the current end (`+= full image height`, ~700px+) inserts that much *empty* scroll after the hero text ends. `+=45%` (≈380px at 1440×900) keeps the pleasant "photo lingers" effect but closes the dead viewport. (Reduced-motion users already skip this — the whole `onMount` returns early.)

#### 2.5 Diff cards refinement — `src/routes/+page.svelte` lines 139–143 + `src/lib/components/home/PlatformCard.svelte`

`PlatformCard.svelte` line 6–10, before:
```svelte
  <h3 class="font-hero text-2xl font-bold text-[#141413] mb-6">{@html title}</h3>
  <p class="font-['Inter'] text-[#3d3d3a] text-base leading-relaxed font-semibold mb-6" style="white-space:pre-line">{body}</p>
  {#if href}
    <a {href} class="mt-auto inline-flex items-center gap-1 text-sm font-semibold text-black no-underline">
      Learn More <span style="display:inline-block">→</span>
    </a>
  {/if}
```
After:
```svelte
  <h3 class="font-hero text-2xl font-bold text-[#141413] mb-4">{@html title}</h3>
  <p class="font-['Inter'] text-[#141413]/80 text-[15px] leading-[1.65] font-normal mb-8" style="white-space:pre-line">{body}</p>
  {#if href}
    <a {href} class="learn-more mt-auto inline-flex items-center gap-1.5 text-sm font-semibold text-[#141413] no-underline">
      Learn More <span class="learn-more-arrow" style="display:inline-block">→</span>
    </a>
  {/if}
```
And add a `<style>` block to `PlatformCard.svelte`:
```css
<style>
  .learn-more { border-bottom: 1px solid rgba(20, 20, 19, 0.35); padding-bottom: 2px; width: fit-content; }
  @media (prefers-reduced-motion: no-preference) {
    .learn-more-arrow { transition: transform 200ms cubic-bezier(0.22, 1, 0.36, 1); }
    .learn-more:hover .learn-more-arrow { transform: translateX(4px); }
  }
</style>
```
**Why:** `font-semibold` body at 16px makes all three cards shout — normal weight at 15px/1.65 reads calmly and shrinks the TASKIFY wall of text; the underlined link + arrow-nudge makes "Learn More" feel clickable. Copy untouched.

#### 2.6 Platform section heading contrast — `src/routes/+page.svelte` line 155

Before:
```svelte
    <h2 class="font-hero text-5xl text-amber-400 text-center mb-20 tracking-tight font-bold">Everything Your Child Needs</h2>
```
After (ink heading + short amber rule; amber stays present but never carries 5xl text on cream):
```svelte
    <h2 class="font-hero text-4xl md:text-5xl text-[#141413] text-center mb-4 tracking-tight font-bold">Everything Your Child Needs</h2>
    <div class="w-16 h-1 bg-amber-400 rounded-full mx-auto mb-16" aria-hidden="true"></div>
```
**Why:** `#ffb200` on `#faf9f5` is ~1.9:1 — even large text needs 3:1. Ink is 15.9:1. The little amber rule keeps the brand accent.

#### 2.7 "What Players Gain" pills — `src/routes/+page.svelte` lines 174–185

Before (7 colors, staggered left/right, first pill clips):
```svelte
    <div bind:this={bentoCard2} class="col-span-12 md:col-span-12 lg:col-span-4 bg-[#1A2B4C] rounded-3xl border border-amber-400/30 relative group p-8 flex flex-col justify-between">
      <div class="relative z-10">
        <h3 class="font-hero text-xl font-bold text-white mb-4">What Players Gain</h3>
        <ul class="flex flex-col items-start gap-2.5 gain-list">
          <li class="font-['Inter'] text-[#141413] text-sm font-semibold leading-snug text-left bg-amber-400 rounded-full px-4 py-2 w-fit">Strategic thinking and decision-making</li>
          <li class="font-['Inter'] text-[#141413] text-sm font-semibold leading-snug md:text-right bg-[#7ec8e3] rounded-full px-4 py-2 w-fit">Critical reasoning and problem-solving</li>
          <li class="font-['Inter'] text-[#141413] text-sm font-semibold leading-snug text-left bg-[#f5e6c8] rounded-full px-4 py-2 w-fit">Creativity and innovation</li>
          <li class="font-['Inter'] text-[#141413] text-sm font-semibold leading-snug md:text-right bg-[#5db8a6] rounded-full px-4 py-2 w-fit">Leadership and collaboration</li>
          <li class="font-['Inter'] text-[#141413] text-sm font-semibold leading-snug text-left bg-[#cdb4f6] rounded-full px-4 py-2 w-fit">Communication and interpersonal skills</li>
          <li class="font-['Inter'] text-[#141413] text-sm font-semibold leading-snug md:text-right bg-[#f6a5c0] rounded-full px-4 py-2 w-fit">Academic excellence and lifelong passion for learning</li>
          <li class="font-['Inter'] text-[#141413] text-sm font-semibold leading-snug text-left bg-[#a3d9a5] rounded-full px-4 py-2 w-fit">Resilience, self-discipline and confidence</li>
        </ul>
      </div>
    </div>
```
After (3-color rotation drawn from colors the page already uses in the diff cards — amber / cream / sky; all pills left-aligned; `justify-between` → `justify-start` + padding fix removes the clip):
```svelte
    <div bind:this={bentoCard2} class="col-span-12 md:col-span-12 lg:col-span-4 bg-[#1A2B4C] rounded-3xl border border-amber-400/30 relative group p-8 flex flex-col justify-start overflow-hidden">
      <div class="relative z-10">
        <h3 class="font-hero text-xl font-bold text-white mb-5">What Players Gain</h3>
        <ul class="flex flex-col items-start gap-2.5 gain-list">
          <li class="font-['Inter'] text-[#141413] text-sm font-semibold leading-snug bg-amber-400 rounded-full px-4 py-2 w-fit">Strategic thinking and decision-making</li>
          <li class="font-['Inter'] text-[#141413] text-sm font-semibold leading-snug bg-[#7ec8e3] rounded-full px-4 py-2 w-fit">Critical reasoning and problem-solving</li>
          <li class="font-['Inter'] text-[#141413] text-sm font-semibold leading-snug bg-[#f5e6c8] rounded-full px-4 py-2 w-fit">Creativity and innovation</li>
          <li class="font-['Inter'] text-[#141413] text-sm font-semibold leading-snug bg-amber-400 rounded-full px-4 py-2 w-fit">Leadership and collaboration</li>
          <li class="font-['Inter'] text-[#141413] text-sm font-semibold leading-snug bg-[#7ec8e3] rounded-full px-4 py-2 w-fit">Communication and interpersonal skills</li>
          <li class="font-['Inter'] text-[#141413] text-sm font-semibold leading-snug bg-[#f5e6c8] rounded-full px-4 py-2 w-fit">Academic excellence and lifelong passion for learning</li>
          <li class="font-['Inter'] text-[#141413] text-sm font-semibold leading-snug bg-amber-400 rounded-full px-4 py-2 w-fit">Resilience, self-discipline and confidence</li>
        </ul>
      </div>
    </div>
```
And delete the zig-zag rule in the page `<style>` (lines 607–614):
```css
  @media (min-width: 768px) {
    .gain-list > li { width: auto; }
    .gain-list > li:nth-child(even) { align-self: flex-end; }
  }
```
→ keep only `.gain-list > li { width: auto }` inside the media query (remove the `:nth-child(even)` block).
**Why:** rainbow + zig-zag reads "craft fair"; a disciplined 3-color rotation on one alignment reads "design system", and every color is already on the page. `justify-start` stops the list being stretched to card top/bottom (the cause of the clipped first pill).

#### 2.8 Journey diagram cleanup — `src/routes/+page.svelte` `<style>` (lines 322–615)

All within the same style block:
1. `.super-title` (line 348) and `.main-title` (line 358) and `.card-title` (line 468) and `.bottom-card-title` (line 513): `font-family: 'Montserrat', sans-serif;` → `font-family: 'Space Grotesk', sans-serif;`
2. Every `#FFC72C` → `#ffb200` (covered in 1.1, listed here for completeness).
3. `.line-v` (line 397) / `.line-h` (line 402): `border-left: 2px dotted #FFC72C;` / `border-top: 2px dotted #FFC72C;` → `border-left: 1px dashed rgba(255, 178, 0, 0.5);` / `border-top: 1px dashed rgba(255, 178, 0, 0.5);`
4. `.card` (line 444) and `.bottom-card` (line 485): `border: 2px solid #FFC72C;` → `border: 1px solid rgba(255, 178, 0, 0.55);` and add `box-shadow: 0 0 0 1px rgba(255,178,0,0.08), 0 8px 32px rgba(0,0,0,0.35);`

**Why:** the diagram's *idea* (three platforms feed the championship) is great; the execution shouts. Hairline dashed connectors + 1px borders make it read like a refined schematic instead of a PowerPoint SmartArt. Space Grotesk ties it to the rest of the page.

#### 2.9 "Make Your Move" bridge — `src/routes/+page.svelte` line 292–298

`py-16 md:py-24` → `py-12 md:py-16`, and on the `h2` change `text-[14vw] md:text-[10vw]` → `text-[13vw] md:text-[9vw]` and add `text-balance`. Reason: this is a typographic drumbeat, not a section; slightly tighter keeps momentum into the amber philosophy screens. Keep the anime.js entrance as-is (it's already gated).

#### 2.10 Home footer CTA — `src/routes/+page.svelte` lines 317–320

Before:
```svelte
<footer id="contact" class="py-20 px-6 bg-navy border-t border-white/10">
  <a href="/register" class="block no-underline"><h1 class="font-hero text-[8vw] text-white leading-none tracking-tighter">Make Your Move.</h1></a>
  <a href="/register" class="block text-[1.8vw] mt-4 no-underline transition-colors" style="color:#fff">Start Your Child's Journey <span style="display:inline-block;vertical-align:middle"> →</span></a>
</footer>
```
After (make the giant line an actual interaction: amber sweep on hover; give the sub-link a real size floor so it doesn't shrink below 16px on small screens):
```svelte
<footer id="contact" class="py-20 px-6 bg-navy border-t border-white/10">
  <a href="/register" class="block no-underline mym-link"><h1 class="font-hero text-[8vw] text-white leading-none tracking-tighter">Make Your Move.</h1></a>
  <a href="/register" class="block mt-4 no-underline transition-colors text-[max(16px,1.8vw)] text-white hover:text-amber-400">Start Your Child's Journey <span style="display:inline-block;vertical-align:middle"> →</span></a>
</footer>
```
Add to the page `<style>`:
```css
  .mym-link h1 { transition: color 300ms ease; }
  .mym-link:hover h1 { color: #ffb200; }
  @media (prefers-reduced-motion: reduce) { .mym-link h1 { transition: none; } }
```

#### 2.11 Hero robustness (no-JS / slow-JS)

`gsap.from('.hero-anim-elem', …)` hides the entire hero text at first paint and reveals it via JS. If GSAP stalls (background tab, blocked JS), the page is blank — I reproduced this locally. Add `clearProps` and a paint-safe delay:

`ChampHero.svelte` lines 19–26, before:
```ts
    tl.from('.hero-anim-elem', {
      y: 30,
      opacity: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: 'power3.out',
      delay: 0.2,
    });
```
After:
```ts
    tl.from('.hero-anim-elem', {
      y: 30,
      autoAlpha: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: 'power3.out',
      delay: 0.2,
      clearProps: 'all',
    });
```
**Why:** `autoAlpha` + `clearProps` returns elements to stylesheet-controlled state after the tween, so nothing stays stuck half-hidden; content is visible pre-hydration because the initial hide is applied by JS only at mount (unchanged behavior, but now self-healing).

---

## Part 3 — Sub-page template: `/about`, `/e4`, `/taskify`

These three share the `.page-hero / .page-features / .page-cta` pattern (`src/routes/about/+page.svelte`, `src/routes/e4/+page.svelte`, `src/routes/taskify/+page.svelte` — each has its own `<style>` copy, so apply each change in **all three files**).

### What I saw
Elegant but *off-brand*: serif Cormorant H1s ("BEEE®", "E4™", "Taskify™"), orange accents, and on About/Taskify a placeholder panel (person/clipboard icon + tagline) that reads unfinished. Benefit cards are flat beige rectangles with serif titles, no accent, and large trapped whitespace (grid stretches all cards to the tallest sibling). CTA sections are fine structurally.

### Ranked critique
1. Serif display + orange = different brand than home (the #1 cross-site problem).
2. Placeholder visuals look like TODOs to a parent deciding whether to pay ₦15,000.
3. Benefit cards have no hierarchy anchor — title and body are the same color and nearly the same optical size; dead space below short texts.
4. Hero eyebrow/H1/sub relationship is flat (title, then sub in the same serif at similar tone).

### Changes (apply per file; selectors identical in all three)

#### 3.1 Display type → Space Grotesk

In each file's `<style>`:
- `.page-hero-title` (About lines 118–127, E4 lines 108–117, Taskify equivalent):
  Before: `font-family: var(--font-display); … font-weight: 500; … letter-spacing: -0.02em;`
  After: `font-family: var(--font-hero); font-weight: 700; letter-spacing: -0.03em;` (keep the existing `clamp(2.8rem, 5vw, 4.5rem)` size, `line-height: 1.08`, `color: var(--ink)`).
- `.page-hero-sub`: keep `var(--font-display)` **and add** `font-style: italic;` — the serif sub becomes a deliberate editorial accent under a grotesk headline (classic premium pairing), instead of two serifs mumbling together.
- `.page-features-title` and `.page-cta-title`: `font-family: var(--font-display);` → `font-family: var(--font-hero);` and `font-weight: 500` → `font-weight: 700`.
- `.feature-card h3`: `font-family: var(--font-display); font-size: 18px; font-weight: 500;` → `font-family: var(--font-hero); font-size: 17px; font-weight: 600; letter-spacing: -0.01em;`

#### 3.2 Benefit cards get an anchor + aligned tops

In each file's `.feature-card` rule (About lines 227–238):
Before:
```css
  .feature-card {
    padding: 32px;
    border-radius: 16px;
    background: var(--surface-card);
    border: 1px solid var(--hairline);
    transition: transform 300ms ease, box-shadow 300ms ease;
  }
```
After:
```css
  .feature-card {
    padding: 28px 32px 32px;
    border-radius: 16px;
    background: var(--surface-card);
    border: 1px solid var(--hairline);
    border-top: 3px solid var(--accent-amber);
    transition: transform 300ms ease, box-shadow 300ms ease;
  }
```
And on `.features-grid` add `align-items: start;` (stops the grid stretching short cards to the tallest one — kills the trapped whitespace).
Wrap the existing hover in reduced-motion:
```css
  @media (prefers-reduced-motion: no-preference) {
    .feature-card:hover { transform: translateY(-3px); box-shadow: 0 12px 32px rgba(20, 20, 19, 0.08); }
  }
```
**Why:** the 3px amber top rule is the cheapest possible "this is the same brand as the navy page" signal, repeated across 5–9 cards it creates rhythm; `align-items: start` lets each card be its natural height so the composition looks intentional.

#### 3.3 Placeholder panels → branded plates (About + Taskify only)

`src/routes/about/+page.svelte` lines 164–188 (`.hero-placeholder`, `.placeholder-icon`, `.placeholder-text`) — same classes exist in Taskify.
Before:
```css
  .hero-placeholder {
    width: min(100%, 360px);
    aspect-ratio: 3/4;
    border-radius: 16px;
    background: var(--surface-card);
    border: 1px solid var(--hairline);
    ...
  }
  .placeholder-icon { color: var(--primary); opacity: 0.6; }
  .placeholder-text { font-family: var(--font-display); font-size: 20px; color: var(--body); margin: 0; letter-spacing: -0.01em; }
```
After:
```css
  .hero-placeholder {
    width: min(100%, 360px);
    aspect-ratio: 3/4;
    border-radius: 16px;
    background:
      radial-gradient(ellipse 120% 90% at 20% 0%, #1A2B4C 0%, transparent 60%),
      #0A0F1A;
    border: 1px solid rgba(255, 178, 0, 0.25);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 24px;
  }
  .placeholder-icon { color: var(--accent-amber); opacity: 1; }
  .placeholder-text { font-family: var(--font-hero); font-size: 19px; font-weight: 600; color: #faf9f5; margin: 0; letter-spacing: 0.02em; }
```
**Why:** same markup, zero new assets — but the panel becomes a navy brand plate ("Discover. Develop. Excel." in white on navy with an amber icon) instead of a wireframe placeholder. It also injects the home page's navy into the cream pages, stitching the two worlds together.

#### 3.4 Hero background tint (About only)

About `.page-hero-bg` (lines 95–102) uses an orange radial `rgba(242, 120, 48, 0.12)`. Change that first gradient to amber: `rgba(255, 178, 0, 0.10)`. E4's cream/sky tints (lines 89–92) are already in-palette — leave them.

---

## Part 4 — TEAMUP (`/teamup` → `src/lib/components/championship/ChampFeatures.svelte`)

### What I saw
One section: serif title + sub, then 5 photo cards in a 3-column grid → row of 3, row of 2, **one empty grid cell**. Caption overlays are a flat black gradient that turns the lower half of every photo gray; titles are 15px — smaller than the body copy of other pages.

### Ranked critique
1. Empty 6th cell = the layout looks accidental.
2. Overlay grays out the photos (black at 85% over warm images = murk).
3. Title/body type is undersized relative to card scale (280px-tall cards, 15px titles).
4. Page has no closing beat — cards end, footer starts (no restyle can add a CTA without adding copy, so fix within: give the last row weight).

### Changes

#### 4.1 Bento spans — fill the grid

`ChampFeatures.svelte` lines 3–34: change the `span` values so rows compose 2+1 / 1+2 (5 cards, no hole):
```ts
  const features = [
    { img: '/images/technology-card.png', span: 'col-span-2 row-span-1', title: 'Technology', body: '…' },
    { img: '/images/enterprise.jpeg',     span: 'col-span-1 row-span-1', title: 'Enterprise', body: '…' },
    { img: '/images/championship/grandfinale.png', span: 'col-span-1 row-span-1', title: 'Art', body: '…' },
    { img: '/images/championship/develop.png',     span: 'col-span-2 row-span-1', title: 'Mentorship', body: '…' },
    { img: '/images/championship/compete.png',     span: 'col-span-3 row-span-1', title: 'Upskill', body: '…' },
  ];
```
(bodies unchanged — only `span` strings change; `.col-span-2`/`.col-span-3` CSS already exists at lines 111–117.)
**Why:** 2+1 / 1+2 / full-width-finale is a real bento rhythm; the wide final "Upskill" card gives the page a closing statement and the empty cell disappears. Mobile is unaffected (everything collapses to `1fr` at 767px).

#### 4.2 Overlay + type scale

Lines 119–156, before:
```css
  .champ-bento-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.2) 60%, transparent 100%);
    transition: background 400ms ease;
  }
  ...
  .champ-bento-card-title {
    margin: 0;
    font-family: var(--font-display);
    font-size: 15px;
    font-weight: 500;
    ...
  }
  .champ-bento-card-body {
    margin: 6px 0 0;
    font-size: 13px;
    ...
  }
```
After:
```css
  .champ-bento-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(to top, rgba(10, 15, 26, 0.92) 0%, rgba(10, 15, 26, 0.35) 45%, transparent 70%);
    transition: background 400ms ease;
  }
  ...
  .champ-bento-card-title {
    margin: 0;
    font-family: var(--font-hero);
    font-size: 22px;
    font-weight: 600;
    line-height: 1.2;
    letter-spacing: -0.01em;
    color: #fff;
  }
  .champ-bento-card-body {
    margin: 8px 0 0;
    font-size: 14px;
    line-height: 1.55;
    color: rgba(250, 249, 245, 0.85);
    max-width: 440px;
  }
```
**Why:** a navy-tinted gradient that dies out by 70% height keeps the top of each photo clean and matches the brand navy instead of dead black; 22px grotesk titles give each pillar a name you can read from a scroll.

#### 4.3 Image hover-zoom (replaces whole-card scale)

Lines 96–109: remove `transition: transform 400ms ease;` from `.champ-bento-card` and the `.champ-bento-card:hover { transform: scale(1.02) }` rule; add:
```css
  @media (prefers-reduced-motion: no-preference) {
    .champ-bento-img { transition: transform 600ms cubic-bezier(0.22, 1, 0.36, 1); }
    .champ-bento-card:hover .champ-bento-img { transform: scale(1.05); }
  }
```
**Why:** scaling the card moves its border (feels wobbly); scaling the image *inside* the fixed frame is the premium version of the same idea. `overflow: hidden` is already on the card.

#### 4.4 Title font

`.champ-features-title` (line 65) `font-family: var(--font-display)` → `var(--font-hero)`, `font-weight: 500` → `700`. Keep `.champ-features-sub` serif + add `font-style: italic` (same pairing rule as Part 3.1).

---

## Part 5 — FAQ (`/faq`)

### What I saw
Serif display title, search, chips (orange active), accordions with hairline rules. Two problems: a **huge dead band** (~250px) between the hero subtitle and the search box, and **full-container line lengths** — questions/answers run up to ~1150px wide (about 150 characters per line; comfortable reading is 60–80).

### Changes

#### 5.1 Close the gap — `src/routes/faq/+page.svelte` lines 60–67

Before:
```css
	.faq-page {
		min-height: 100vh;
		background: var(--canvas);
		display: flex;
		flex-direction: column;
		gap: 144px;
		padding-bottom: 144px;
	}
```
After:
```css
	.faq-page {
		min-height: 100vh;
		background: var(--canvas);
		display: flex;
		flex-direction: column;
		gap: 64px;
		padding-bottom: 144px;
	}
```
(The 767px media query at line 103: `gap: 96px` → `gap: 48px`.)
**Why:** 144px between *every* sibling (hero→toolbar→list→contact) is why the page feels like it stalls before it starts. 64px keeps air while letting search sit near the title it belongs to.

#### 5.2 Readable measure — same file, lines 41+ and 80–84

On `.faq-list` add `max-width: 860px;` (it already has `width: min(1200px, calc(100% - 48px)); margin: 0 auto` from `.container` — add the max-width to the same rule so the accordion column narrows and centers):
```css
	.faq-list {
		display: flex;
		flex-direction: column;
		gap: 27px;
		max-width: 860px;
	}
```
Do the same on `.faq-toolbar` (`max-width: 860px;`) so search/chips align with the questions.
**Why:** 860px ≈ 75–85 chars/line at 17px — the sweet spot for reading; centered column also makes the page feel composed rather than stretched.

#### 5.3 Chips + category label branding

- `src/lib/components/faq/FaqCategories.svelte` lines 53–60:
  Before: `.tab-active { background: var(--primary); color: var(--on-primary); }` / `.tab-active:hover { background: var(--primary-active); }`
  After: `.tab-active { background: var(--accent-amber); color: #141413; }` / `.tab-active:hover { background: #e6a000; }`
  Also line 50 hover mix: `color-mix(in srgb, var(--surface-card) 88%, var(--primary))` → `…, var(--accent-amber))`.
- `src/routes/faq/+page.svelte` `.faq-cat-title` (lines 92–100): replace the serif 22px title with the sitewide kicker style:
  ```css
	.faq-cat-title {
		margin: 0 0 4px;
		color: var(--muted);
		font-family: var(--font-hero);
		font-size: 13px;
		font-weight: 600;
		letter-spacing: 0.12em;
		text-transform: uppercase;
		line-height: 1.3;
	}
  ```
  **Why:** category names ("General", "Registration") are wayfinding, not content — small caps recede and let the questions be the headline.
- `FaqHero.svelte` line 8 `display-lg` heading: ensure the global `.display-lg`/hero style here also switches to `var(--font-hero)` per Part 3.1 convention (if `display-lg` is defined in `src/styles/sections.css`, change `font-family` there; otherwise add `.faq-hero h1 { font-family: var(--font-hero); font-weight: 700; }` to `FaqHero.svelte`).

---

## Part 6 — Register (`/register`) + confirmation modal

This page takes money — it gets the strictest treatment.

### What I saw
Sepia chessboard photo background at 55% black overlay; form fields are clean white cards; the "AFFILIATE CODE" divider labels sit in muted gray on the dark photo; disabled Register button renders at full orange strength; fine print is readable; the sticky summary card is good. Modal: cream, serif header, clear price row — decent, just needs token alignment.

### Changes

#### 6.1 Calm the background — `src/routes/register/+page.svelte` lines 258–263

Before:
```css
  .reg-bg-overlay {
    position: absolute;
    inset: 0;
    background: rgba(0,0,0,0.55);
    pointer-events: none;
  }
```
After (navy-tinted, heavier at top where text sits, and slightly heavier overall so the busy pieces don't fight the form):
```css
  .reg-bg-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(180deg, rgba(10, 15, 26, 0.82) 0%, rgba(10, 15, 26, 0.62) 40%, rgba(10, 15, 26, 0.70) 100%);
    pointer-events: none;
  }
```

#### 6.2 Divider legibility — same file, `.reg-divider` (lines 328–345)

Before: `color: var(--muted);` and `::before/::after { background: var(--hairline); }`
After: `color: rgba(250, 249, 245, 0.72);` and `::before/::after { background: rgba(250, 249, 245, 0.25); }`
**Why:** `--muted` (`#6c6a64`) on the dark photo is ~2.6:1. The divider labels are instructions; they must pass 4.5:1.

#### 6.3 Header hierarchy — `.reg-event` (line 272) + `.reg-title` (line 281)

- `.reg-event`: `color: var(--primary);` → `color: var(--accent-amber);` (kicker becomes brand amber — on the darkened navy overlay `#ffb200` is ~8:1, fine).
- `.reg-title`: `font-family: var(--font-display);` → `font-family: var(--font-hero); font-weight: 700; letter-spacing: -0.03em;` — "Abuja 2026" in Space Grotesk matches the home hero; the serif stays for the price tag (see below) as the editorial accent.

#### 6.4 Button states

Part 1.2's Button.svelte change automatically gives this page: amber Register (ink text), real disabled state (`#e6dfd8` + gray text) — the current "always-orange" disabled button misleads users into clicking. Nothing page-local to do beyond verifying `:global(.reg-submit)` keeps `width: 100%; padding: 16px 24px; font-size: 16px`.

#### 6.5 Summary card price

`.reg-amount` (lines 400–406) keeps `var(--font-display)` serif — **intentional** (editorial accent). Add `font-weight: 600;` (serif at 500 renders thin at 2.6rem over cream). `.reg-summary-deadline` (line 412): consider the icon color inherits `--body-strong` — fine.

#### 6.6 Modal — `src/components/ConfirmationModal.svelte`

Align with tokens: header font → `var(--font-hero)`, weight 700 (find the modal title rule; it currently uses the serif display font); the "Confirm and Pay" button inherits Part 1.2 amber automatically if it uses `Button`/`.btn` — if it has a local orange gradient, replace with `background: var(--accent-amber); color: #141413;` hover `#e6a000`. Keep "Cancel" as the quiet cream/hairline secondary.

---

## Part 7 — Login (`/login`) — two real bugs

### What I saw
A ghost card: no background, inputs with no visible boundaries, a gray dead-looking Sign In.

### Root causes (verified in code)
1. `src/routes/login/+page.svelte` line 93 `background: var(--bg);` and line 98 `background: var(--surface);` — **`--bg` and `--surface` are not defined anywhere** in `src/styles/*.css`, so the shell and card render transparent.
2. `src/lib/components/TextInput.svelte` line 10: default `wrapperClass = '!bg-[var(--canvas)] !border-transparent'` — canvas-colored fields with transparent borders are invisible on the canvas-colored login page (they only look right on the dark register page).

### Changes

#### 7.1 Fix the undefined variables — `login/+page.svelte`

- Line 93: `background: var(--bg);` → `background: var(--canvas);`
- Line 98: `background: var(--surface);` → `background: #ffffff;` and add `box-shadow: 0 8px 40px rgba(20, 20, 19, 0.06);`

#### 7.2 Make the fields visible — `TextInput.svelte` line 10

Before:
```ts
			wrapperClass = '!bg-[var(--canvas)] !border-transparent',
```
After:
```ts
			wrapperClass = '!bg-white !border-[var(--hairline)]',
```
Then check the two existing call sites that pass custom `wrapperClass` (register affiliate field passes `!bg-white/10 !border-white/20` — unaffected) and the register main fields (no wrapperClass → they become white with hairline border on the dark page: **better** definition than today's borderless white; no regression).
Add a focus style if not present: the wrapper already has `focus-within:border-transparent` — change to `focus-within:!border-[var(--accent-amber)]` so active fields get an amber edge (and in `TextInput.svelte`'s style block add `.wrapper:focus-within { box-shadow: 0 0 0 3px rgba(255, 178, 0, 0.18); }` on whatever the wrapper class/element is — match existing structure).

#### 7.3 Sign In button — `login/+page.svelte` `.login-btn` (lines 129–148)

Keep ink button (a dark button is fine here — it's a utility page) but fix the disabled-by-default look:
Before: `.login-btn:disabled { opacity: 0.4; …}`
After:
```css
  .login-btn:disabled {
    background: var(--surface-card);
    color: var(--muted);
    cursor: not-allowed;
  }
  .login-btn:focus-visible {
    outline: 2px solid var(--accent-amber);
    outline-offset: 2px;
  }
```
And `.login-title` → `font-family: var(--font-hero); font-weight: 700;`

---

## Part 8 — Affiliate (`/affiliate`)

Already the most composed sub-page. Only token alignment:

1. `src/routes/affiliate/+page.svelte`: headline (`Share the Experience. Earn Rewards.`) → `font-family: var(--font-hero); font-weight: 700;` (find its `<style>` heading rule; same treatment as Part 3.1). The eyebrow "AFFILIATE PROGRAM" `color: var(--primary)` → `var(--accent-amber)`… **exception:** amber on cream fails contrast at 13px — instead use `color: var(--ink)` with `opacity: 0.65`, or keep it orange? No: use `color: #a36f00` (a darkened amber, 4.6:1 on `#faf9f5`) — this becomes the standard "amber kicker on cream" color sitewide. Add it as a token: in `theme.css` `@theme` add `--color-amber-deep: #a36f00;`
2. The numbered step circles (orange `background: var(--primary)`): → `background: var(--accent-amber); color: #141413;`
3. "Become an Affiliate" disabled button + "Continue with Google": inherits Part 1.2 if it uses `Button`; if local, mirror 7.3's disabled treatment.
4. `Sign in` link `color: var(--primary)` → `color: #a36f00;`

**Sitewide note:** wherever a kicker/eyebrow sits on cream (About "AFFILIATE PROGRAM", register `.reg-event` is on dark so keep `#ffb200`), use `--color-amber-deep #a36f00`. Amber `#ffb200` text is only allowed on navy/dark surfaces.

---

## Part 9 — Cross-site consistency checklist (verify after implementation)

- [ ] Only one amber anywhere: `#ffb200` on dark surfaces, `#a36f00` for small text on cream, `#e6a000` hover, `#cc8f00` active. `grep -ri "fbbf24\|FFC72C\|F27830\|14d9c4\|a8e8ff" src/` returns only `variables.css`/`theme.css` legacy tokens (or nothing).
- [ ] Every primary CTA is the amber pill with ink text: nav Register, hero "Start Your Child's Journey", all `page-cta-btn`s, FAQ active chip, register submit, modal "Confirm and Pay".
- [ ] Every H1/H2 display heading is Space Grotesk 700; serif appears only in: footer wordmark block, About belief paragraph, `.page-hero-sub` italic subs, ₦15,000 price.
- [ ] Nav links legible on every page in BOTH OS themes (light: ink on white glass; dark: cream on dark glass); active item = amber underline.
- [ ] No text below 4.5:1 contrast: check hero venue lines, register divider, footer copyright, FAQ category labels.
- [ ] All hover motion ≤4px translate or ≤1.05 scale, 160–600ms, and wrapped in `@media (prefers-reduced-motion: no-preference)` (CSS) or the existing `matchMedia` guard (JS).
- [ ] `:focus-visible` ring (2px, amber on dark / ink on amber) on: nav links, all buttons, FAQ chips, accordion triggers, form fields.
- [ ] Mobile (375px): hero kicker wraps to ≤2 lines; diff cards stack with 24px gaps; TEAMUP bento collapses to single column (spans reset at 767px — already in CSS); FAQ toolbar chips scroll horizontally (already); footer container padding correct after 1.4.
- [ ] Run `pnpm build` + spot-check `/`, `/about`, `/teamup`, `/register` at 1440 and 375.

## Part 10 — Do these first (highest impact ÷ effort)

1. **1.3 Nav fix** — a broken nav on 7 of 9 pages is the single loudest "unfinished" signal.
2. **1.2 + 1.1 Amber CTA + one amber** — rebrands every button and yellow on the site in two files.
3. **2.1 Hero hierarchy** (kicker + headline) — the first 3 seconds of the site.
4. **2.6 Amber-on-cream heading fix** — an illegible section title on the money page (home).
5. **7.1/7.2 Login visibility bugs** — undefined CSS vars and invisible inputs are functional defects.
6. **3.1–3.3 Sub-page type + card + placeholder unification** — closes the "two websites" gap.
7. **4.1–4.2 TEAMUP bento + overlay** — the page parents visit to understand the programme.
8. **2.4 Pin dead-zone**, then everything else in order.

---

## Part 11 — Championship journey (`/championship` → `src/lib/components/championship/ChampHow.svelte`)

**Why this page matters:** it is the destination of three prominent CTAs — home hero "See How It Works" and the "View Championship" buttons on About/E4/Taskify. No production screenshot was provided; this audit is from source (the component is self-contained CSS, so the specs below are exact).

### What the code renders
Dark page (`#0A1628`) with a faint bg image, centered "Your **Championship** Journey" title (already Space Grotesk + amber — good), then six alternating image/card "stage bands". Each stage has its own color: orange `#F27830`, purple `#7C3AED`, red `#B91C1C`, green `#15803D`, yellow `#CA8A04`, navy `#1A2744` — applied to a 2px band border, a 100px badge circle, a decorative corner swoosh, the stage number/title, and the chevron between bands. Card body text is `font-weight: 700` black 17px (entire paragraphs in bold). Ends with a text-only "MAKE YOUR MOVE / ASPIRE TO BEEE" block — **no register button on the page three CTAs funnel into.**

### Ranked critique
1. **Six-color rainbow** — same disease as the home pills, at full page scale. Purple/red/green don't exist anywhere else in the brand.
2. **All-bold body copy** reads like a flyer; bold everywhere = bold nowhere.
3. **Fourth navy** (`#0A1628` bg and `#1A2744` stage color) vs brand `#0A0F1A`.
4. The closing block repeats the register-CTA *copy* but has no clickable control (the words are `<p>`s).

### Changes

#### 11.1 One-accent stage system — lines 14–88 (the `stages` array)

Replace each stage's `color`/`colorLight` so all six use the brand pair, with the finale inverted for climax:
```ts
// stages 1–5:
      color: '#ffb200',
      colorLight: '#e6a000',
// stage 6 (GRAND FINALE):
      color: '#0A0F1A',
      colorLight: '#1A2B4C',
```
**Why:** the stage *number* (44px) already differentiates the steps; color-coding adds noise, not information. Amber badges/numbers on white cards with a navy finale reads as one confident brand telling a six-beat story. (The badge icon + curve stay `#fff`/stage-color automatically via `--sc`.)

#### 11.2 De-bold the body, calm the frame — `<style>` block

- Line 156 `.champ-how { background: #0A1628; … }` → `background: var(--navy);` (`#0A0F1A`).
- `.stage-band` (line 211): `border: 2px solid var(--sc);` → `border: 1px solid color-mix(in srgb, var(--sc) 55%, transparent);`
- `.stage-body` (lines 308–314): `font-size: 17px; font-weight: 700; color: #000;` → `font-size: 16px; font-weight: 400; color: #252523; line-height: 1.65;` — and let the E4/TEAMUP/TASKIFY product names inside the copy carry the emphasis instead (no markup change needed; they're uppercase already).
- `.stage-num` (line 292): add `opacity: 0.9;` — at 44px/800 the number can sit 10% quieter than the title it introduces.
- `.champ-how-sub` (line 203): `font-weight: 700; color: #fff;` → `font-weight: 500; color: rgba(250, 249, 245, 0.75);` (a sub-line shouldn't out-shout its title).

#### 11.3 Give the closing block its button — lines 147–151

The copy stays; wrap it with the existing `Button` component *below* the motto lines (this adds a control, not copy — same pattern every other page already ends with):
```svelte
    <footer class="champ-how-cta">
      <p class="cta-main">MAKE YOUR <span class="gold">MOVE</span></p>
      <p class="cta-motto"><span style="color:#fff">ASPIRE TO</span> <span class="gold">BEEE</span></p>
      <p class="cta-sub">BE EVERYTHING EXCELLENT EVERY <span class="gold">DAY</span></p>
      <Button href="/register" class="champ-how-btn">Start Your Child's Journey</Button>
    </footer>
```
(`import Button from '$lib/components/Button.svelte';` at the top; add `:global(.champ-how-btn) { margin-top: 28px; padding: 16px 36px; font-size: 16px; }` to the style block.) The button label reuses the site's existing CTA string — no new copy invented.

#### 11.4 Copy flags (owner decision — do NOT change without approval)
Stage 4 body: "tournamens" (typo for "tournaments"); stage 5: double spaces ("qualifiers  are"). Styling-only scope means these ship as-is unless the owner signs off.

---

## Part 12 — Loose ends (small but real)

### 12.1 Add a branded error page — `src/routes/+error.svelte` (file does not exist)

Any broken link currently shows SvelteKit's unstyled default. Create the file (new file, not a copy change):
```svelte
<script lang="ts">
  import { page } from '$app/stores';
  import Button from '$lib/components/Button.svelte';
</script>

<section class="err">
  <p class="err-code">{$page.status}</p>
  <h1 class="err-title">{$page.status === 404 ? 'This square is empty.' : 'Something went wrong.'}</h1>
  <Button href="/" class="err-btn">Back to Home</Button>
</section>

<style>
  .err {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 16px;
    background: var(--navy);
    text-align: center;
    padding: 24px;
  }
  .err-code {
    font-family: var(--font-hero);
    font-size: clamp(80px, 18vw, 160px);
    font-weight: 800;
    line-height: 1;
    color: var(--accent-amber);
    margin: 0;
  }
  .err-title {
    font-family: var(--font-hero);
    font-size: clamp(20px, 3vw, 28px);
    font-weight: 600;
    color: #faf9f5;
    margin: 0 0 12px;
  }
  :global(.err-btn) { padding: 14px 32px; }
</style>
```
(The 404 line is new UI copy for a page that has none — flag to owner alongside 11.4 if even that is out of bounds; the page is still worth shipping with just the status code and button.)

### 12.2 `/payment/callback` — verify, don't redesign
This is the post-payment landing (`src/routes/payment/callback/+page.svelte`). Scope: confirm it uses tokens (no raw oranges), the success state uses `--success` `#5db872` on cream, and any spinner respects reduced motion. It's transactional; keep it boring and fast.

### 12.3 `/why-beee` is orphaned
`src/routes/why-beee/+page.svelte` exists but nothing links to it. Decision for the owner: link it (footer nav) or remove the route before launch — an unreviewed live page is a brand liability. Not styled in this plan because it's unreachable by visitors.

### 12.4 Auth-gated + dev routes (explicitly out of scope)
`/dashboard`, `/affiliate/settings` (need a session), and `/design`, `/new`, `/n`, `/i`, `/test/genai`, `/teamup-old` (dev/legacy). Recommend gating or removing the dev routes in production — `/design` and `/teamup-old` respond publicly today.

— End of plan. Every value above was chosen against the live code as read on 2026-07-11; if a line number has drifted, match on the quoted "before" snippet, which is exact.
