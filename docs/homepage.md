# Homepage UX & Interactions

## Architecture

The homepage at `src/routes/+page.svelte` is a single-scroll landing page with **14 sections** (S1–S14). Scroll-driven animations use two layers:

1. **CSS scroll-driven animations** (`@supports animation-timeline: scroll()`) — primary layer. Tall sticky wrappers register `view-timeline-name`, and their children animate via `animation-timeline` with `cover`-based `animation-range` entries. This keeps pinned sections visibly changing while their sticky content stays in place. Browsers without the needed support see the final visible state.

2. **JS `IntersectionObserver`** — fallback/supplement for behaviors CSS can't cover (trust bar counters, FAQ accordion, confetti).

There is **no anime.js, no Lenis**. All motion is pure CSS + native `IntersectionObserver`. Lenis was removed in a prior iteration.

If scroll timelines are not supported, `html` does not receive `.supports-scroll-animation`, sticky wrappers become normal-height sections, and hidden animation start states are not applied. This avoids long scroll ranges where nothing visibly changes.

---

## S1 — Sticky Header (`fixed`, z-index 40)

| Property | Value |
|----------|-------|
| Position | `fixed; top: 0` |
| Height | 64px |
| Background | `rgba(250, 249, 245, 0.92)` + `backdrop-filter: blur(18px)` |
| Z-index | 40 |

- **Brand** on the left: spike mark + "BEEE" text
- **Nav** (center): links to `#teamp` (TEAMUP), `#journey` (Timeline), `#faq` (FAQ)
- **CTA** (right): "Register Now" button with `.cta-entrance` class (scale pulse on load)
- **Mobile (`<768px`)**: nav links hidden, CTA shrinks to compact size

---

## S2 — Hero (sticky chapter)

**Sticky container**: `height: 300vh` → `.sticky-section.hero-scroll` owns the `--hero` view timeline. `.sticky-inner` is `position: sticky; top: 0; height: 100vh` with `align-items: center` (desktop) or `flex-start` (mobile/tablet `<1024px`).

### Scroll-driven animations (CSS)

| Element | Keyframes | Range |
|---------|-----------|-------|
| `.hero-title` (h1) | `fade-up-lg` (0→1 opacity, 0→40px translateY) | `cover 0% → cover 25%` |
| `.hero-subtitle` (lead p) | `fade-up` (0→1 opacity, 0→25px translateY) | `cover 15% → cover 40%` |
| `.hero-actions` (CTA buttons) | `fade-up` | `cover 30% → cover 55%` |
| `.hero-scroll-hint` ("↓ Scroll to discover") | `hint-out` (1→0 opacity) | `cover 0% → cover 15%` |

### Content

- Eyebrow: "BEEE Spectacular Chess Championship 2026"
- Title: "Every Move Builds a Future"
- Lead paragraph describing the programme
- Two CTAs: "Start the Journey" (`/register`, primary + `.cta-entrance`), "Explore the Programme" (`#about`, secondary)
- Hero artifact: 3D-feel chessboard with floating chess pieces (♚ ♛), BEEE logo, "Development Passport" label, and a status dot — all decorative

### Mobile/tablet

- Grid collapses to single column (`<1024px`)
- Artifact moves below text
- `align-items: flex-start` on sticky-inner prevents content cutoff

---

## S3 — Trust Bar

**Trigger**: `IntersectionObserver` at 30% visibility → one-shot counter animation.

### Counters

| Stat | Target | Step calc |
|------|--------|-----------|
| Young Champions | 500 | `ceil(500/60)` = 9 |
| Partner Schools | 50 | `ceil(50/60)` = 1 |
| Pillar Programme | 6 | `ceil(6/60)` = 1 |
| Edition | 2026 | `ceil(2026/60)` = 34 |

- Counter increments every 16ms (≈60fps) via `setInterval`, clamped to target
- Strong element textContent updated on each tick
- Once all counters reach target, interval clears
- Observer disconnects after first intersection (one-shot)

### Responsive

- Desktop: 4-column grid
- `<768px`: 2×2 grid, stat font-size 42px → 32px

---

## S4 — Why BEEE Exists (sticky chapter)

**Sticky container**: `height: 200vh` on `--surface-soft` background. `.sticky-section.why-scroll` owns the `--appear` view timeline while the content is pinned.

- `appear-on-scroll` wrapper on `.why-text` and `.why-visual` triggers generic `fade-up` animations (see "Appear on scroll" pattern below)
- Left column: heading "Chess Alone Isn't Enough" + two paragraphs
- Right column: path illustration — vertical timeline with 4 nodes (Pawn→Knight→Bishop→Queen), each with colored left border (`--node-color`), connected by hairline connector lines

---

## S5 — TEAMUP Pillars

**CSS scroll-driven**: `.pillars-grid` registers `view-timeline-name: --pillars`. `.pillar-card` items animate via `fade-up-lg` across `entry 0% → entry 100%`.

### Hover micro-interaction

```
.pillar-card:hover {
  transform: translateY(-6px) scale(1.02);
  box-shadow: 0 12px 32px rgba(20, 20, 19, 0.1);
}
.pillar-card:hover .pillar-name { color: var(--card-color); }
```

- Each card has a 3px top border in `--card-color` (ease-out-back transition, 300ms)
- Pillar tag badges are colored pill elements with uppercase text

### Cards (3×2 grid)

| Icon | Title | Chess piece |
|------|-------|-------------|
| ♚ | Technology | King |
| ♛ | Enterprise | Queen |
| ♝ | Art | Bishop |
| ♞ | Mentorship | Knight |
| ♜ | Upskill | Rook |
| ♟ | Personal Dev. | Pawn |

### Responsive

- Desktop: 3 cols
- 768–1023px: 2 cols
- `<768px`: 1 col

---

## S6 — Development Passport (sticky chapter)

**Sticky container**: `height: 300vh` on `--surface-dark` background. `.sticky-section.passport-scroll` owns the `--passport` view timeline.

### Scroll-driven animations (sequential timeline)

The passport section orchestrates a detailed sequential reveal as the user scrolls through its sticky range. Each step fades in from the left, followed by its corresponding badge ring drawing.

| Element | Animation | Range |
|---------|-----------|-------|
| `.passport-cover` | `fade-up` (opacity 0→1, translateY 0→40px) | `cover 0% → 10%` |
| `.progress-fill` | `grow-x` (width 0%→100%) | `cover 0% → 70%` |
| `.passport-step-1` (Discover) | `fade-left` (opacity 0→1, translateX -30→0) | `cover 5% → 20%` |
| `.badge-ring-1` (T badge) | `draw-ring` (stroke-dashoffset 138.23→0) | `cover 10% → 25%` |
| `.passport-badge-1 text` (T letter) | `scale-in` (opacity 0→1, scale 0→1) | `cover 15% → 30%` |
| `.passport-step-2` (Engage) | `fade-left` | `cover 25% → 40%` |
| `.badge-ring-2` (E badge) | `draw-ring` | `cover 30% → 45%` |
| `.passport-badge-2 text` (E letter) | `scale-in` | `cover 35% → 50%` |
| `.passport-step-3` (Earn) | `fade-left` | `cover 45% → 60%` |
| `.badge-ring-3` (A badge) | `draw-ring` | `cover 50% → 65%` |
| `.passport-badge-3 text` (A letter) | `scale-in` | `cover 55% → 70%` |
| `.passport-step-4` (Champion) | `fade-left` | `cover 65% → 80%` |
| `.badge-ring-4` (M badge) | `draw-ring` | `cover 70% → 85%` |
| `.badge-ring-5` (U badge) | `draw-ring` | `cover 75% → 90%` |
| `.badge-ring-6` (P badge) | `draw-ring` | `cover 80% → 95%` |
| `.passport-progress` | `fade-up` | `cover 85% → 100%` |

### Badge ring drawing mechanics

All badge ring `<path>` elements have:
```css
stroke-dasharray: 138.23;
```
The `draw-ring` keyframes animate `stroke-dashoffset` from 138.23 to 0, creating a circular stroke-drawing effect. The circumference (138.23) matches a circle of radius 22 ≈ `2 * π * 22`.

### Content

- Left column: 4 steps (Discover → Engage → Earn → Champion), each with a numbered step and description
- Right column (sticky at `top: 96px`): passport book visual with 6 SVG badge rings (T, E, A, M, U, P), progress bar with fill

### Responsive

- `<768px`: grid collapses to single column, passport-visual unsticks

---

## S7 — Championship Journey Timeline (sticky chapter)

**Sticky container**: `height: 300vh` on `--surface-soft` background. `.sticky-section.timeline-scroll` owns the `--timeline` view timeline.

### Scroll-driven animations

| Element | Animation | Range |
|---------|-----------|-------|
| `.timeline-line` | `grow-x` (width 0%→100%) | `cover 0% → 60%` |
| `.milestone-1` (Discovery) | `fade-left` | `cover 5% → 25%` |
| `.milestone-2` (Foundation) | `fade-left` | `cover 20% → 40%` |
| `.milestone-3` (Practice) | `fade-left` | `cover 35% → 55%` |
| `.milestone-4` (Compete) | `fade-left` | `cover 50% → 70%` |
| `.milestone-5` (Semi-Finals) | `fade-left` | `cover 65% → 85%` |
| `.milestone-6` (Finals) | `fade-left` | `cover 80% → 100%` |

### Hover micro-interaction

```
.milestone:hover {
  transform: translateY(-4px);
  box-shadow: 0 0 20px rgba(242, 120, 48, 0.15);
}
.milestone:hover .milestone-icon { transform: scale(1.15); }
```

### Layout

- Title: "From First Move to Championship"
- Horizontal track bar (4px height) with gradient line (primary→amber)
- Horizontal scrollable strip of 6 milestone cards (220px each, `scroll-snap-type: x mandatory`)
- Each card has a chess piece icon, name, and description

---

## S8 — Benefits Grid

**CSS scroll-driven**: `.benefits-grid` registers `view-timeline-name: --benefits`. `.benefit-card` items animate via `fade-up` across `entry 0% → entry 100%`.

6 cards in a 3-column grid (responsive: 2 cols at 768–1023px, 1 col at `<768px`). Each card has a chess piece icon, title, and description. No hover micro-interactions (static cards).

---

## S9 — Mystery Section

### Scroll-driven animation

`.mystery-blur` animates via `blur-out` keyframes:
```css
@keyframes blur-out { from { filter: blur(16px); } to { filter: blur(0px); } }
```
Range: `entry 0% → entry 100%` on `--mystery` timeline.

### Confetti (JS, one-shot)

- `IntersectionObserver` at 50% threshold on `.mystery-section`
- Fires `canvas-confetti` once:
  - Desktop: 150 particles, spread 80, origin `{ y: 0.6 }`
  - Mobile (`<640px`): 80 particles
  - `disableForReducedMotion: true` (library respects the OS setting)
- Guarded with `window.matchMedia('(prefers-reduced-motion: reduce)')` so observer is never created when reduced motion is on
- Observer disconnects after first fire

### Content

- "Coming Soon" coral badge
- Title: "What's Your Next Move?"
- Teaser paragraph
- "Unlock the Secret" button (secondary dark, currently decorative — no action wired)

---

## S10 — Parent Section

**CSS scroll-driven**: `.parent-section` registers `view-timeline-name: --parents`. `.parent-card` items animate via `fade-up` across `entry 0% → entry 100%`.

- Left card: testimonial quote with author avatar placeholder and "Parent of Participant" attribution
- Right card (dark variant): highlights the Development Passport tracking feature

---

## S11 — Awards & Recognition

**CSS marquee** (continuous loop, not scroll-driven):
```css
@keyframes marquee { from { translate: 0; } to { translate: -50%; } }
.awards-track { animation: marquee 30s linear infinite; }
```

- Horizontal scrolling track of 8 award/school logos (currently placeholder text "School 1"–"School 8")
- Each logo sits in a bordered pill-shaped container
- `appear-on-scroll` wrapper provides entrance fade-up on children

---

## S12 — FAQ

### Accordion behavior (JS `IntersectionObserver`-free, click-driven)

```
.faq-question click → .faq-item.classList.toggle('is-open')
```

- When open: `.faq-answer` gets `max-height: 300px; opacity: 1` (CSS transition, 300ms cubic-bezier)
- When closed: `max-height: 0; opacity: 0`
- Arrow rotates 180° in open state
- No animation library — pure CSS transitions
- Wrapped in `.appear-on-scroll` for entrance animation

### Questions (6 total)

1. What age group is this for? (7-17, three tiers)
2. Does my child need chess experience? (no, all levels)
3. How much does it cost? (tiered pricing, scholarships)
4. What's the time commitment? (2h/week + championship)
5. How do I register my school? (contact coordinator)
6. What if my child can't attend all sessions? (flexible, digital make-up)

---

## S13 — Final CTA

**CSS scroll-driven**: `.cta-section` registers `view-timeline-name: --cta`. `.final-cta` animates via `fade-up` across `entry 0% → entry 100%`.

- Title: "The Best Move Is the First One."
- Description paragraph
- "Register Your Child" primary CTA button (with `.cta-entrance` class)

---

## S14 — Footer (`role="contentinfo"`)

5-column grid (responsive: 2 cols at `<768px`, brand spans full width).

Columns: Brand (BEEE description), Programme links, Event links, Company links, Legal links.

---

## "Appear on scroll" generic pattern

Sections with `.appear-on-scroll` class get auto-animated children:
```css
.appear-on-scroll { view-timeline-name: --appear; }
.appear-on-scroll > * {
  opacity: 0;
  animation: fade-up linear forwards;
  animation-timeline: --appear;
  animation-range: entry 0% entry 100%;
}
```

Used by: S4 (why-text, why-visual), S5 header, S8 header, S11 (headline), S12 (faq-list).

---

## Accessibility

### Skip link
- First focusable element in `<body>` (from `+layout.svelte`)
- `<a href="#main-content" class="skip-link" tabindex="1">Skip to main content</a>`
- Hidden off-screen (`top: -100%`) until focused (`top: 0`)
- Target: `<main id="main-content" tabindex="-1" role="main">` wrapping `{@render children()}`

### ARIA landmarks
- `<header role="banner">` (S1)
- `<main role="main">` (wrapper from +layout, all page content)
- `<footer role="contentinfo">` (S14)

### `prefers-reduced-motion`

**Global CSS** (in app.css):
- All animations/transitions: `duration: 0.01ms !important`, iteration count 1
- `scroll-behavior: auto`
- Sticky sections: `height: auto; position: static` (unsticks them)
- `.hero-scroll-hint` hidden

**Per-section CSS** (in page `<style>`):
- All scroll-driven animation classes: `animation: none !important; opacity: 1 !important; translate: none !important; scale: none !important; filter: none !important`
- `.progress-fill`: `width: 100% !important`
- Badge rings: `stroke-dashoffset: 0 !important` (fully drawn)

**Confetti**:
- Observer never created when `matchMedia('(prefers-reduced-motion: reduce)')` matches
- `canvas-confetti`'s built-in `disableForReducedMotion` also active

### Focus-visible
```css
:focus-visible { outline: 2px solid var(--primary); outline-offset: 2px; }
```

### Focus order
Skip link (tabindex=1) → header nav → main content → footer. The skip link bypasses the fixed header and jumps directly to the main content region.

---

## Button styles & micro-interactions

### .button-primary
```css
.button-primary { border: 1px solid var(--primary); background: var(--primary); color: var(--on-primary); }
.button-primary:hover { transform: scale(1.02); }
.button-primary:active { transform: scale(.98); }
.button-primary:disabled { opacity/color changes; transform: none; }
```

### .cta-entrance
Applied to the 3 primary "Register" CTAs (header, hero, final). One-shot gentle scale pulse on page load:
```css
@keyframes cta-entrance { 0% { transform: scale(1); } 50% { transform: scale(1.03); } 100% { transform: scale(1); } }
.cta-entrance { animation: cta-entrance 600ms ease-out 1; }
```

---

## Key CSS custom properties (from `:root`)

| Property | Value | Usage |
|----------|-------|-------|
| `--primary` | `#F27830` | Primary CTA, links, accent, focus outline, brand color |
| `--primary-active` | `#BD5E25` | Button active state |
| `--primary-light` | `#F69A64` | Button pulse highlight |
| `--accent-amber` | `#ffb200` | Timeline gradient, Enterprise pillar, E badge |
| `--accent-teal` | `#5db8a6` | Upskill pillar, U badge, status dot |
| `--canvas` | `#faf9f5` | Page background |
| `--surface-dark` | `#181715` | Dark sections (Passport, Mystery, CTA, Footer) |
| `--surface-dark-elevated` | `#252320` | Passport book card |
| `--on-dark` | `#faf9f5` | Text on dark backgrounds |
| `--on-dark-soft` | `#a09d96` | Muted text on dark backgrounds |

---

## Responsive breakpoints

| Breakpoint | Media query | Changes |
|------------|-------------|---------|
| Tablet | `max-width: 1023px` | Hero grid → 1col; sticky-inner → `align-items: flex-start`; pillar-grid → 2col; benefits-grid → 2col |
| Mobile | `max-width: 767px` | Header nav hidden; 1col grids everywhere; reduced font sizes; reduced padding; passport-visual unsticks |

---

## Keyframes reference

```css
@keyframes fade-up     { from { opacity: 0; translate: 0 25px; } to { opacity: 1; translate: 0 0; } }
@keyframes fade-up-lg  { from { opacity: 0; translate: 0 40px; } to { opacity: 1; translate: 0 0; } }
@keyframes fade-left   { from { opacity: 0; translate: -30px 0; } to { opacity: 1; translate: 0 0; } }
@keyframes scale-in    { from { opacity: 0; scale: 0; } to { opacity: 1; scale: 1; } }
@keyframes grow-x      { from { width: 0%; } to { width: 100%; } }
@keyframes draw-ring   { from { stroke-dashoffset: 138.23; } to { stroke-dashoffset: 0; } }
@keyframes blur-out    { from { filter: blur(16px); } to { filter: blur(0px); } }
@keyframes hint-out    { from { opacity: 1; } to { opacity: 0; } }
@keyframes marquee     { from { translate: 0; } to { translate: -50%; } }
@keyframes cta-entrance { 0% { transform: scale(1); } 50% { transform: scale(1.03); } 100% { transform: scale(1); } }
```

---

## Files

| File | Role |
|------|------|
| `src/routes/+layout.svelte` | Skip link, `<main>` wrapper, global `<svelte:head>` |
| `src/routes/+page.svelte` | All 14 sections, `<style>` with CSS scroll-driven animations, reduced-motion overrides, hover micro-interactions |
| `src/app.css` | Design tokens, global reset, shared component styles (buttons, forms, nav, footer, modals), skip-link styles, `prefers-reduced-motion` global guard, `cta-entrance` keyframes |
