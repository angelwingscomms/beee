# beee-homepage-redesign - Work Plan

## TL;DR (For humans)

**What you'll get:** The existing BEEE homepage transformed into a premium dark-mode experience that feels like Apple + Khan Academy + Olympic Youth programme — not a chess tournament site. Every section refined, proper spring-physics animations, micro-interactions (magnetic buttons, custom cursor), component-split architecture, sticky mobile CTA, glassmorphism cards, film grain texture, and the "wow" progress tracking section.

**Why this approach:** Enhance existing SvelteKit project (not rebuild in Next.js). Preserves all registration flow, chess visuals, and responsive layout already built. Motion library (motion.dev) gives Framer Motion-quality spring animations without framework migration. Results ship faster, existing tests and functionality are preserved.

**What it will NOT do:** No backend changes, no registration form changes, no new pages, no database work, no payment integration. This is purely a homepage redesign + component refactor.

**Effort:** 7 ordered waves across ~40 individual todos. Estimated 4-6 hours of agent execution.

**Risk areas:** Motion library Svelte 5 compatibility (confirmed: `motion/dom` works with any DOM framework via Svelte `use:action` directives). Custom cursor accessibility fallback. CSS `view-timeline` cross-browser support (Chrome/Edge only, Firefox/Safari behind flags — existing behavior preserved, not regressed).

**Key decisions:**
- Design tokens: Use existing dark-mode CSS vars (`--bg`, `--panel`, `--gold`) as foundation, extend for new effects
- Motion library: `motion` (motion.dev) via `motion/dom` + Svelte `use:action` directives
- Svelte runes: `$state()`, `$derived()`, `$effect()` for new components; migrate legacy syntax during extraction
- Film grain: CSS pseudo-element with SVG noise filter at 3% opacity
- Custom cursor: CSS + JS div-follower, single implementation, prefers-reduced-motion + touch fallback
- Glassmorphism: cream/light sections only (not on dark surfaces where it looks muddy)
- Accordion: animated height via Motion, ARIA, keyboard nav, single-open
- Pentagon polish: CSS animation refinements + SVG connecting lines
- CTA: Add sticky mobile CTA (appears after hero scroll-off), verify actual count (page already has 6)

---

## Scope

### In Scope
- Refactor monolithic `+page.svelte` (1621 lines) into separate components under `src/components/home/`
- Add Motion library (`motion` via `motion/dom`) for spring-physics animations
- Replace CSS `view-timeline` reveals with Motion `inView()` + spring entrance animations
- Add micro-interactions: custom cursor (CSS+JS), magnetic buttons on CTAs, hover depth on cards
- Add sticky mobile CTA bar appearing after hero scroll-off
- Add film grain noise texture overlay on dark sections
- Convert feature/benefit/award cards to glassmorphism treatment on cream sections
- Refine TEAMUP pentagon: SVG connecting lines, smoother hover transitions
- Enhance Development Passport mockup with parent access badge, better visual hierarchy
- Polish Progress Dashboard: animated XP counter, badge hover effects
- Enhance FAQ with Motion-powered height animation, ARIA attributes
- Add "View Sample Passport" anchor link behavior in Parents section
- Ensure `prefers-reduced-motion: reduce` disables all Motion animations
- Verify accessibility: custom cursor fallback, contrast ratios, keyboard navigation
- Rewrite `home.e2e.test.ts` to DOM-rendered assertions before component splitting

### Out of Scope
- Registration form or backend changes
- New pages (register, dashboard, etc.)
- Payment/paystack integration
- SEO content strategy or meta tag overhaul
- Social media integration
- Email/SMS notification systems
- Admin dashboard
- Database schema changes
- Font file changes (existing fonts preserved)
- Logo or brand asset changes

---

## Verification Strategy

### Per-Todo QA Requirements
Every todo MUST include:
1. **Happy path test** — the feature works as intended (tool invocation + expected output path)
2. **Failure path test** — what breaks when input/state is wrong (edge case + evidence path)
3. **Evidence path** — exact assertion, file, or visual diff that proves it worked
4. Each test must be agent-executable (no human judgment calls)

### E2E Guard
- `home.e2e.test.ts` rewritten first to DOM-rendered assertions
- Tests pass before → during → after component splitting
- Final verification: all tests pass at 100%

### Visual Verification
- Screenshot diffs for: hero, TEAMUP pentagon, passport, dashboard, FAQ expanded/closed
- Mobile viewport screenshots for sticky CTA behavior
- Dark section screenshots for film grain texture appearance

### Accessibility Verification
- Axe-core scan: 0 critical violations
- Keyboard navigation: all interactive elements reachable and operable
- prefers-reduced-motion: animations disabled, page fully functional

### Performance Verification
- `pnpm build` compiles without errors
- Bundle size: `motion/dom` addition tracked (target < 100KB gzipped total JS)

---

## Execution Strategy

### Wave Ordering (Dependency Chain)
```
Wave 0: Foundation (design tokens, Motion install, test rewrite) ← MUST BE FIRST
  ↓
Wave 1: Component splitting (structural refactor, no behavior change)
  ↓
Wave 2: Animation system (Motion integration, scroll reveals, spring physics)
  ↓
Wave 3: Micro-interactions (custom cursor, magnetic buttons, hover depth)
  ↓
Wave 4: Design polish (glassmorphism, film grain, typography refinements)
  ↓
Wave 5: Hero + TEAMUP + Passport enhancements
  ↓
Wave 6: CTA strategy + FAQ + Final QA
```

### Git Discipline
Per the repo's AGENTS.md:
- Before every agent code turn: `git add . && git commit -m"before AI agent {update} update. agent: {agent name}" && git push`
- After every edit turn: `git add . && git commit -m"{exhaustive description of all changes}" && git push`

---

## Todos

### Wave 0: Foundation

**Todo 0.1: Define design token extension in app.css**
- **Where:** `src/app.css` `:root` block
- **Why:** New effects (glassmorphism, film grain) need CSS variables that extend the existing dark-mode token system without conflicting with DESIGN.md
- **What:**
  - Add `--glass-bg: rgba(255,255,255,0.06)`, `--glass-border: rgba(255,255,255,0.10)`, `--glass-blur: 16px`
  - Add `--noise-opacity: 0.03` for film grain overlay
  - Add `--cursor-size: 24px` for custom cursor
  - Add `--sticky-cta-z: 90` for sticky mobile CTA
  - Document in a comment that these extend the existing dark-mode token system (not the DESIGN.md cream-canvas system)
- **Acceptance:** `:root` block has the new vars listed above, no collisions with existing vars
- **QA happy:** Grep `src/app.css` for each variable name
- **QA failure:** Verify no existing var is overwritten via `grep` for conflicts
- **Commit:** `feat: add design token extensions for glassmorphism, film grain, cursor, sticky-cta`

**Todo 0.2: Install and verify Motion library**
- **Where:** Project root via `pnpm add motion`
- **Why:** `motion/dom` provides spring-physics animations, `inView()` scroll detection, `scroll()` linking — all framework-agnostic and compatible with Svelte 5 via DOM `use:action` directives
- **What:**
  - `pnpm add motion`
  - Create a test Svelte action in `src/lib/actions/motion.ts` that wraps `animate()` from `motion/dom` for use with `use:action`
  - Verify it compiles: `pnpm type-check`
- **Acceptance:** `motion` in `package.json` dependencies; `src/lib/actions/motion.ts` exists with a `motionAnimate` action
- **QA happy:** `pnpm type-check` passes; import `from 'motion/dom'` compiles
- **QA failure:** If `motion` publish includes breaking API changes, fall back to `gsap` (already proven framework-agnostic)
- **Commit:** `feat: add motion library with Svelte use:action wrapper`

**Todo 0.3: Rewrite home.e2e.test.ts to DOM-rendered assertions**
- **Where:** `src/routes/home.e2e.test.ts`
- **Why:** Current test checks source-text substrings that component splitting will destroy. Must test rendered output (Playwright DOM assertions) before refactoring.
- **What:**
  - Rewrite all assertions to use Playwright page content checks (`page.locator()`, `expect().toBeVisible()`, etc.)
  - Verify tests pass BEFORE any component changes (`pnpm test`)
  - Structure assertions to be component-boundary-agnostic (test behavior, not file structure)
- **Acceptance:** All tests pass on current monolithic page; no test references source file strings
- **QA happy:** `pnpm test` passes with 0 failures
- **QA failure:** If a test references a removed class, fix the assertion to use semantic selectors
- **Commit:** `test: rewrite home.e2e.test.ts to DOM-rendered assertions for component refactor`

### Wave 1: Component Splitting

**Todo 1.1: Create component skeleton directory and extract Navbar**
- **Where:** `src/components/home/Navbar.svelte`, `src/routes/+page.svelte`
- **Why:** Monolithic 1621-line file must be split into maintainable components. Navbar is the first independent section.
- **What:**
  - Create `src/components/home/Navbar.svelte` with the nav HTML + scoped CSS from +page.svelte
  - Use `$props()` for `menuOpen` state, implement `onclick` for menu toggle (Svelte 5 runes)
  - Import in `+page.svelte` and replace inline nav markup with `<Navbar {menuOpen} onMenuToggle />`
  - Verify no visual regression (screenshot compare)
- **Acceptance:** Navbar renders identically; `pnpm test` passes
- **QA happy:** Playwright screenshot of nav matches before/after
- **QA failure:** Nav links broken — verify each href works
- **Commit:** `refactor: extract Navbar component from +page.svelte`

**Todo 1.2: Extract Hero section**
- **Where:** `src/components/home/Hero.svelte`, `+page.svelte`
- **Why:** Hero is the second independent section (~70 lines HTML + ~100 lines CSS)
- **What:**
  - Extract hero HTML + scoped CSS
  - Keep data references in the parent for now (journey, teamup data is used elsewhere)
- **Acceptance:** Hero renders identically
- **QA happy:** Screenshot diff matches
- **Commit:** `refactor: extract Hero section component`

**Todo 1.3: Extract TrustBar, WhyBeee, Journey sections**
- **Where:** `src/components/home/TrustBar.svelte`, `src/components/home/WhyBeee.svelte`, `src/components/home/Journey.svelte`
- **Why:** Three more independent sections following spec's component structure
- **What:**
  - Extract each, pass `journey` array as prop to Journey component
- **Acceptance:** All three render identically; `pnpm test` passes
- **Commit:** `refactor: extract TrustBar, WhyBeee, Journey section components`

**Todo 1.4: Extract TeamUp, Passport, Benefits sections**
- **Where:** `src/components/home/TeamUp.svelte`, `src/components/home/Passport.svelte`, `src/components/home/Benefits.svelte`
- **Why:** These sections handle interactive state (activeTeamup) plus data arrays
- **What:**
  - TeamUp takes `teamup` data as prop, manages `activeTeamup` internally with `$state()`
  - Passport and Benefits are pure display components
- **Acceptance:** Interactive state preserved; section swap works
- **QA happy:** Click each TEAMUP segment, verify panel content changes
- **Commit:** `refactor: extract TeamUp, Passport, Benefits section components`

**Todo 1.5: Extract ProgressTracking, Parents, Awards, FAQ sections**
- **Where:** `src/components/home/ProgressTracking.svelte`, `src/components/home/Parents.svelte`, `src/components/home/Awards.svelte`, `src/components/home/FAQ.svelte`
- **Why:** Final four sections plus data migration
- **What:**
  - FAQ manages `openFaq` state internally with `$state()`
  - Awards is pure display (takes array prop)
  - Parents is pure display
  - Move `faqs` array data into the FAQ component or a shared data file
- **Acceptance:** All sections extracted; `+page.svelte` is now a thin layout shell
- **QA happy:** Full page screenshot before/after matches
- **Commit:** `refactor: extract ProgressTracking, Parents, Awards, FAQ section components`

**Todo 1.6: Extract FinalCTA and Footer**
- **Where:** `src/components/home/FinalCTA.svelte`, `src/components/home/Footer.svelte`
- **Why:** Final two sections complete the component structure
- **What:**
  - FinalCTA is a thin CTA wrapper
  - Footer matches the spec's column layout
- **Acceptance:** All 14 sections extracted into separate components; `+page.svelte` imports and renders them
- **QA happy:** `pnpm test` passes; full-page screenshot before/after matches
- **Commit:** `refactor: extract FinalCTA and Footer, complete component separation`

### Wave 2: Animation System

**Todo 2.1: Create reusable Svelte actions for Motion animations**
- **Where:** `src/lib/actions/motion.ts`
- **Why:** Motion library (motion.dev) provides `animate()`, `inView()`, `scroll()` for DOM elements. Svelte `use:action` directives bridge this cleanly.
- **What:**
  - `use:motionFadeUp` — wraps `inView()` + `animate()` with spring physics (stiffness: 200, damping: 25)
  - `use:motionScaleIn` — scale from 0.95 to 1 on viewport entry
  - `use:motionStagger` — accepts delay index, staggers children
  - `use:motionSpring` — applies spring transition to any CSS property on change
  - All actions respect `prefers-reduced-motion` (skip animation if true)
- **Acceptance:** 4 Svelte actions exported; each compiles and can be used as `use:motionFadeUp`
- **QA happy:** Import in test component; verify animation plays
- **QA failure:** If `motion/dom` `animate()` throws on certain elements, fall back to `gsap`
- **Commit:** `feat: create reusable Svelte motion actions for spring animations`

**Todo 2.2: Replace CSS view-timeline reveals with Motion inView()**
- **Where:** All section components (Hero, WhyBeee, Journey, Benefits, Awards, etc.)
- **Why:** CSS `view-timeline` is Chrome/Edge only. Motion `inView()` works cross-browser and supports spring physics.
- **What:**
  - Replace each `.reveal` class with `use:motionFadeUp` action directive
  - Remove `animation: fade-up both` and `animation-timeline: view()` from CSS
  - Keep the existing `@keyframes fade-up` as fallback for when JS fails
  - Preserve `prefers-reduced-motion: reduce` behavior
- **Acceptance:** All sections still fade in on scroll; spring physics applied
- **QA happy:** Screenshot of page at initial load (no reveals yet) vs scrolled (all revealed)
- **QA failure:** If Motion fails to load, CSS fallback activates — verify fallback path
- **Commit:** `feat: replace CSS view-timeline reveals with Motion inView() spring animations`

**Todo 2.3: Add journey section SVG connecting line animation**
- **Where:** `src/components/home/Journey.svelte`
- **Why:** Spec requires an animated path line that fills as user scrolls through journey steps
- **What:**
  - Replace static gradient line with SVG `path` element
  - Use `scroll()` from motion to animate `stroke-dashoffset` from 100% to 0%
  - Line uses gold-to-green gradient matching existing design
- **Acceptance:** Journey line animates from left to right as page scrolls; mobile: decorative at 50% opacity
- **QA happy:** Scroll to journey section at 25% scroll → line is ~25% filled; 100% scroll → line fully filled
- **QA failure:** If `scroll()` doesn't trigger on initial load, verify with IntersectionObserver fallback
- **Commit:** `feat: add animated SVG connecting line to Journey section`

**Todo 2.4: Add spring entrance animations to key elements**
- **Where:** Hero heading, TrustBar items, benefit cards, award cards, passport mockup
- **Why:** Spring physics creates premium feel vs CSS linear/ease transitions
- **What:**
  - Hero h1: spring entrance (stiffness: 200, damping: 25) on page load
  - TrustBar items: stagger entrance with `use:motionStagger` (delay: 0.1s each)
  - Benefit cards: fade-up with stagger, each card 0.08s apart
  - Award cards: scale-in with stagger
  - Passport mockup: fade-up with slight delay
  - All respect prefers-reduced-motion
- **Acceptance:** Elements animate in with spring physics (visible overshoot on primary CTA)
- **QA happy:** Playwright video capture of page load → verify spring bounce on primary CTA
- **QA failure:** On slow connections/Motion load failure, elements display immediately (no empty state)
- **Commit:** `feat: add spring entrance animations to hero, trust bar, benefits, awards, passport`

### Wave 3: Micro-interactions

**Todo 3.1: Implement custom cursor**
- **Where:** `src/lib/CustomCursor.svelte`, imported in `src/routes/+layout.svelte`
- **Why:** #1 highest ROI micro-interaction per Awwwards research (effort 2/10, delight 9/10)
- **What:**
  - Create `CustomCursor.svelte` with a single `div` at fixed position following `mousemove` with lerp smoothing (GSAP or Motion `animate()` with spring)
  - Size: 24px circle, gold border, transparent fill
  - On hover over interactive elements (CTAs, cards, links): scale(1.5), fill changes to gold at 15% opacity
  - On `prefers-reduced-motion` or `touch` device: hide cursor, show default
  - Disable on mobile (touch devices)
- **Acceptance:** Custom gold circle follows mouse with smooth lerp; on button hover scales 1.5x
- **QA happy:** Mouse moves → cursor follows; hovers CTA → cursor scales
- **QA failure:** On `prefers-reduced-motion: reduce` page renders default cursor — verify via JS detection
- **Trigger concern (Metis):** Custom cursor can interfere with text selection, iframe boundaries, and scrollbar interaction. Implementation MUST set `pointer-events: none` on the cursor element and use `cursor: none` only on the body when active.
- **Commit:** `feat: add custom cursor with magnetic hover states`

**Todo 3.2: Implement magnetic buttons on CTAs**
- **Where:** `src/lib/actions/magnetic.ts`, applied to all `.primary-cta` and `.secondary-cta` buttons
- **Why:** #2 highest ROI micro-interaction. Research: "magnetic buttons" create premium feel.
- **What:**
  - Create `use:magnetic` Svelte action
  - On `mouseenter`/`mousemove`: calculate offset from button center, translate button position toward cursor (max 8px offset)
  - On `mouseleave`: animate back to original position with spring (stiffness: 300, damping: 30)
  - Works alongside custom cursor (cursor follows, button magnetically shifts)
  - Disable on touch devices and prefers-reduced-motion
- **Acceptance:** CTA buttons subtly follow cursor on hover, return to position on mouse leave
- **QA happy:** Mouse enters CTA → button shifts toward cursor (verify via getBoundingClientRect)
- **QA failure:** On touch, no magnetic effect — verify via touch event detection
- **Commit:** `feat: add magnetic button effect to all CTA buttons`

**Todo 3.3: Add hover depth to cards and journey steps**
- **Where:** All `.card`, `.benefit-card`, `.journey-step`, `.award-card` elements
- **Why:** Hover depth (scale + shadow + translateY) is #4 ranked micro-interaction
- **What:**
  - Create `use:hoverDepth` action
  - On hover: `transform: scale(1.03) translateY(-4px)`, increase `box-shadow` by 30%
  - Transition: 300ms cubic-bezier(0.34, 1.56, 0.64, 1) for springy feel
  - Disable on touch and prefers-reduced-motion
- **Acceptance:** Cards lift with scale/shadow on hover, return on mouse leave
- **QA happy:** Hover over card → verify transform applied; mouse leave → verify original transform
- **QA failure:** Card hover should not interfere with links inside the card — pointer-events cascade correctly
- **Commit:** `feat: add hover depth animation to cards and journey steps`

### Wave 4: Design Polish

**Todo 4.1: Add film grain noise texture to dark sections**
- **Where:** `src/app.css`
- **Why:** Research says "a single real texture separates premium from generic" — 2-4% film grain noise overlay on dark sections
- **What:**
  - Create CSS-only film grain using SVG `<filter>` encoded as data URI
  - Apply via `::after` pseudo-element on dark-section backgrounds
  - Mix-blend-mode: overlay, opacity: 0.03
  - Animated with `@keyframes grain-shift` (subtle position shift, 8s loop) for organic feel
  - Disable on prefers-reduced-motion (static grain OK, animation off)
- **Acceptance:** Dark sections have subtle animated noise texture visible on close inspection but not distracting
- **QA happy:** Screenshot of dark section shows grain overlay (compare with grain disabled)
- **QA failure:** Grain should not affect text readability — verify text contrast remains >= 4.5:1
- **Commit:** `feat: add CSS-only film grain noise texture to dark sections`

**Todo 4.2: Apply glassmorphism to cream/light section cards**
- **Where:** WhyBeee cards, Benefit cards, Award cards (light sections)
- **Why:** Spec calls for glassmorphism; research confirms it provides premium depth
- **What:**
  - On light sections (`.light .card`, `.benefit-card` on light bg):
    - Background: `rgba(255,255,255,0.7)` with `backdrop-filter: blur(16px)`
    - Border: `1px solid rgba(255,255,255,0.18)`
    - Box-shadow: subtle depth
  - On dark sections: keep existing panel system (glass on dark = muddy, per research)
  - Respect `prefers-reduced-motion`: reduce blur to 4px (less GPU load)
- **Acceptance:** Cards on cream sections have translucent glass effect with backdrop blur
- **QA happy:** Screenshot shows frosted glass effect on cards; text remains readable
- **QA failure:** If `backdrop-filter` not supported, cards fall back to solid `rgba(255,255,255,0.85)` background
- **Commit:** `feat: add glassmorphism to light section cards`

**Todo 4.3: Refine typography scale and hierarchy**
- **Where:** Global adjustments in `src/app.css` and component styles
- **Why:** Spec calls for "premium sans-serif" feel. Current page uses Poppins at 800 weight for headlines with no letter-spacing, which reads less premium than spec's "weight 400 with negative tracking" approach.
- **What:**
  - Hero h1: add `letter-spacing: -0.02em`, keep Poppins weight 800 (brand font)
  - Section h2: add `letter-spacing: -0.01em`, tighten `line-height: 1.04`
  - Body text: increase to 17px for readability, softer color
  - Section kicker (eyebrow): use uppercase with wider letter-spacing (0.12em)
  - Verify all text contrast >= WCAG AA 4.5:1
- **Acceptance:** Typography feels more refined; letter-spacing negative on headlines
- **QA happy:** Computed style check on hero h1 shows `letter-spacing: -0.02em`
- **QA failure:** Font changes must not break existing text — verify no overflow or truncation
- **Commit:** `feat: refine typography hierarchy with negative tracking and tighter leading`

### Wave 5: Section Enhancements

**Todo 5.1: Enhance TEAMUP pentagon with SVG connecting lines and smoother transitions**
- **Where:** `src/components/home/TeamUp.svelte`
- **Why:** Spec calls for interactive pentagon with hover-expand panels and animated connecting path
- **What:**
  - Draw SVG pentagon connecting lines between the 5 nodes
  - On hover/active node: highlight the line segment from center to that node (gold stroke, glow)
  - Content panel transition: use `use:motionSpring` for spring entrance (stiffness: 200, damping: 25)
  - Active node: scale 1.15x, gold glow, border highlight
  - Mobile: horizontal scroll carousel with active indicator (already working, refine dot indicator)
- **Acceptance:** Pentagon SVG lines connect all 5 nodes; active node highlights its line segment
- **QA happy:** Hover each node → verify corresponding line segment highlighted
- **QA failure:** On mobile, pentagon collapses to carousel — verify no SVG lines visible
- **Commit:** `feat: enhance TEAMUP pentagon with SVG connecting lines and spring transitions`

**Todo 5.2: Enhance Development Passport visual**
- **Where:** `src/components/home/Passport.svelte`
- **Why:** "This will sell parents" — the passport is the key conversion tool
- **What:**
  - Refine passport cover: stronger gold gradient, embossed logo effect
  - Add `ShieldCheck` icon badge for "Parent Access Included" with animated entrance
  - Stamp grid: add checkmark icons to completed stamps, subtle pulse on hover
  - Passport mockup border: use glassmorphism treatment (light translucent border)
  - CTA: ensure "Register Child" button is prominent after passport copy
- **Acceptance:** Passport looks more premium; parent access badge is visible; stamps interactive
- **QA happy:** Screenshot of passport section matches refined design
- **QA failure:** Passport must still be accessible — verify all text meets contrast
- **Commit:** `feat: enhance Development Passport with parent badge and premium styling`

**Todo 5.3: Enhance Progress Dashboard with animated XP counter**
- **Where:** `src/components/home/ProgressTracking.svelte`
- **Why:** This is the "wow" section — spec says "show dashboard mockup" with animated elements
- **What:**
  - XP counter (3,450): animate from 0 with `use:motionSpring` number counter action
  - Progress bar (72%): animate fill width on viewport entry
  - Badge row: stagger entrance with spring animation
  - Tracking tabs: add hover underline animation, active tab highlight
  - Dashboard card: glassmorphism on dark (subtle, with reduced blur to avoid muddiness)
- **Acceptance:** XP counter animates from 0; progress bar fills; badges stagger in
- **QA happy:** Scroll to tracking section → XP counts up, progress bar fills, badges appear
- **QA failure:** If Motion fails on number animation, display static values (no empty state)
- **Commit:** `feat: enhance Progress Dashboard with animated XP counter and badge reveals`

**Todo 5.4: Enhance Parents section with sample passport CTA behavior**
- **Where:** `src/components/home/Parents.svelte`
- **Why:** "View Sample Passport" link should scroll to passport section
- **What:**
  - "View Sample Passport" link scrolls smoothly to `#passport` using `document.getElementById('passport').scrollIntoView({ behavior: 'smooth' })`
  - Add WhatsApp click-to-chat link for Nigerian mobile users (per research)
  - Refine phone mockup: add more dashboard-like rows (milestones, next badge)
- **Acceptance:** Click "View Sample Passport" → smooth scroll to passport section
- **QA happy:** Click link → verify scroll position at passport section
- **QA failure:** Smooth scroll not supported → `scrollIntoView` without `behavior: 'smooth'` fallback
- **Commit:** `feat: enhance Parents section with sample passport scroll and WhatsApp CTA`

### Wave 6: CTA Strategy + FAQ + Final QA

**Todo 6.1: Add sticky mobile CTA bar**
- **Where:** `src/components/home/StickyCTA.svelte`, imported in `+layout.svelte`
- **Why:** Research: sticky CTAs increase conversion 15-25%. Nigerian mobile users need thumb-zone CTAs.
- **What:**
  - Fixed position bar at bottom of viewport on mobile (< 768px)
  - Height: 64px, dark background (--bg), gold CTA button "Register Now"
  - Appears only after user scrolls past hero section (IntersectionObserver on hero)
  - Disappears when user scrolls to bottom 200px of page (final CTA section visible)
  - z-index: 90 (below nav's 100)
  - Desktop: hidden
  - Include WhatsApp click-to-chat as secondary action
- **Acceptance:** On mobile, bottom CTA bar appears after hero scroll-off; disappears near bottom
- **QA happy:** Mobile viewport: scroll 50% down → CTA visible; scroll to footer → CTA hidden
- **QA failure:** CTA must not overlap content on initial load — verify IntersectionObserver fires correctly
- **Commit:** `feat: add sticky mobile CTA bar with WhatsApp integration`

**Todo 6.2: Enhance FAQ with Motion-powered height animation and ARIA**
- **Where:** `src/components/home/FAQ.svelte`
- **Why:** Spec calls for "proper accordion" — animated height, ARIA attributes
- **What:**
  - Replace `{#if openFaq === index}` block with Motion `animate()` for height transition
  - Add ARIA: `aria-expanded` on toggle button, `aria-controls` linking to panel `id`
  - Add keyboard: Enter/Space toggles, Tab between items
  - Maintain single-open behavior (current state preserved)
  - Animate ChevronDown icon rotation with spring
- **Acceptance:** FAQ expands/collapses with smooth height animation; ARIA attributes present
- **QA happy:** Playwright: click FAQ → verify height animation plays, `aria-expanded="true"`
- **QA failure:** Height animation on content with unknown height — use Motion's `animate()` with `height: auto` via `grid-template-rows: 0fr/1fr` technique as fallback
- **Commit:** `feat: enhance FAQ with animated height, ARIA attributes, keyboard navigation`

**Todo 6.3: Add mid-page CTA after Benefits section**
- **Where:** `src/components/home/Benefits.svelte`
- **Why:** Spec requires CTAs after: Hero ✓ (exists), Journey ✓ (exists), Passport ✓ (exists), Parents ✓ (exists), Final ✓ (exists). Missing: after Benefits section.
- **What:**
  - Add inline CTA at bottom of Benefits section: "Ready to develop your child?" with "Register Now" primary button
  - Style as inline band (glassmorphism card with gold accent)
  - Smooth scroll to registration on click (if registration inline) or navigate to /register
- **Acceptance:** Benefits section has CTA at bottom
- **QA happy:** Scroll to benefits → CTA visible at section bottom
- **QA failure:** CTA must not duplicate existing CTAs on same page — it's a mid-page reminder, not a new section
- **Commit:** `feat: add mid-page CTA after Benefits section**

**Todo 6.4: Final verification — accessibility, performance, visual QA**
- **Where:** Full page audit
- **Why:** Ensure all enhancements meet quality bar before completion
- **What:**
  - Run `pnpm type-check` — 0 errors
  - Run `pnpm test` — all tests pass
  - Run axe-core scan on full page — 0 critical violations, 0 serious violations
  - Verify `prefers-reduced-motion: reduce` disables all Motion animations
  - Verify keyboard navigation: Tab through all sections, all interactive elements reachable
  - Verify mobile responsive at 375px, 768px breakpoints
  - Verify sticky CTA behavior on mobile
  - Verify cross-browser: Chrome, Firefox (grain/glassmorphism fallbacks OK)
- **Acceptance:** All checks pass
- **QA happy:** Automated test suite passes at 100%
- **QA failure:** Any check fails → fix and re-run
- **Commit:** `chore: final QA — accessibility, performance, visual verification`

---

## Final Verification Wave

Each runs in parallel; ALL must APPROVE:

**F1 - Plan Compliance Audit:** Every todo completed per acceptance criteria. All referenced files exist. No scope creep.

**F2 - Code Quality Review:** Components follow Svelte 5 runes conventions. No legacy syntax in new components. CSS uses design tokens, not hardcoded values (except where tokens don't exist).

**F3 - Real Manual QA (Playwright):** Full page screenshot diff against baseline. Mobile screenshot with sticky CTA. FAQ expand/collapse. TEAMUP pentagon hover. Progress dashboard animations. Custom cursor visible and following. Magnetic buttons respond. Film grain visible on dark sections.

**F4 - Scope Fidelity:** No registration form changes. No backend changes. No new pages. Only homepage enhancements per spec and research.

---

## Commit Strategy

One commit per todo (21+ commits). Each commit prefixed by type:
- `feat:` for new features (animations, cursor, CTAs)
- `refactor:` for component splitting
- `test:` for test changes
- `chore:` for config/foundation work

Git discipline per AGENTS.md:
- Before every agent turn: `git add . && git commit -m"before AI agent {update} update. agent: {name}" && git push`
- After every edit turn: `git add . && git commit -m"{exhaustive change log}" && git push`

---

## Success Criteria

1. All 14 sections rendered as separate components in `src/components/home/`
2. Spring-physics animations (Motion) working on all section entrances, respecting `prefers-reduced-motion`
3. Custom cursor visible on desktop, hidden on touch/reduced-motion
4. Magnetic buttons on all CTA elements
5. Hover depth on all cards and journey steps
6. Film grain noise texture visible on dark sections
7. Glassmorphism on cream-section cards
8. TEAMUP pentagon with SVG connecting lines and spring transitions
9. Development Passport with parent access badge
10. Progress Dashboard with animated XP counter and progress bar
11. FAQ with animated height, ARIA, keyboard nav
12. Sticky mobile CTA bar appears after hero scroll-off
13. Mid-page CTA after Benefits section
14. All existing tests pass; new Playwright tests cover new features
15. `pnpm type-check` passes with 0 errors
16. Axe-core scan: 0 critical violations
17. Full-page screenshot before/after matches (visual regression free)
