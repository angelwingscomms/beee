# Awwwards-Level UI/UX Polish — Design Spec

## Goal

Elevate the entire BEEE site's visual craft to an "awwwards level" — the kind of
typographic confidence, layout ambition, and motion polish that gets noticed —
without changing any copy/text content and without swapping, removing, or
adding any images. Every existing image file stays; only its presentation
(crop, mask, overlay, layout placement, motion) may change.

## Non-negotiable constraints

- **No copy changes.** Every string of user-facing text stays byte-identical.
  If a layout change would read better with different wording, implement the
  layout with the existing wording — do not edit text to fit.
- **No image changes.** No new images added, none removed, none swapped for
  different source files. Existing images may be cropped/masked/overlaid/
  animated via CSS, but the underlying asset stays the same.
- Respect `AGENTS.md`: never start the dev server, never run `npm run build`,
  snake_case for vars/functions in JS/TS, minimal/concise code, fonts live in
  `static/fonts/`, per-turn git commit convention (`before AI agent ...` /
  detailed commit after).
- Chess gameplay logic (`chess.js`, `svelte-chess` integration, `chess.css`
  board mechanics) is out of scope — only the chrome/surrounding UI around the
  board may be restyled.
- Always gate transform-heavy hover states behind `@media (hover: hover)` and
  all animation behind `prefers-reduced-motion` (existing DESIGN.md
  convention — keep following it).

## Current state (baseline)

- SvelteKit + Svelte 5, Tailwind v4, deployed via Cloudflare adapter.
- Existing design system documented in `AGENTS.md` (DESIGN.md content): cream
  canvas (`--canvas`), navy product surfaces (`--navy`), amber/gold accent
  (`--accent-amber`), coral CTA (`--primary`), pill buttons
  (`--radius-pill: 999px`), Space Grotesk (display/hero), Cormorant Garamond
  (editorial accents), Inter (body), SN Pro (forms).
- Motion libraries already present: GSAP, animejs, motion — used for scroll
  reveals.
- `src/styles/variables.css` has accumulated duplicate/legacy tokens
  (`--gold` vs `--accent-amber`, `--font-display` vs `--font-display-hero`,
  `--font-championship`, `--font-welcome` — fonts not documented in
  DESIGN.md's font list). This predates the redesign and should be
  consolidated as groundwork, not left to drift further.
- Current layout is conservative: centered hero column (max 720px), uniform
  3-col card grids, 12px card radius, flat/simple hover states, static
  (non-staggered) text reveals. Functional but not visually ambitious —
  confirmed via homepage screenshot review (several sections read as sparse:
  low-contrast hero board image, empty-feeling pentagon graphic section,
  minimal dashboard mockup section).
- ~20 routes total: marketing (`/`, `/about`, `/championship`, `/taskify`,
  `/teamup`, `/why-beee`, `/partner`, `/faq`), app/auth (`/login`,
  `/register`, `/dashboard`, `/dashboard/partner`, `/account`, `/profile`,
  `/payment/callback`), utility (`/privacy`, `/terms`, `/+error`), plus `/e4`
  and `/i` (chess-specific).

## Direction

### Typography as the hero
Push a real fluid editorial type scale via `clamp()` — hero headlines scaling
up toward ~96–120px on desktop (from the current static 48px `display-xl`).
Lean harder on Fraunces/Cormorant Garamond for display moments (oversized
numerals, pull-quotes, section dividers) against Space Grotesk/Inter for
structural type. Replace static text reveals with word/line-level
scroll-triggered stagger animations.

### Color stays, usage gets bolder
No new hues — cream/navy/amber/coral palette is unchanged. Use navy and cream
sections asymmetrically rather than a strict alternating full-bleed pattern.
Let amber act as a true accent (thin rules, oversized numerals, underline
strokes) beyond pill backgrounds. Add depth to navy sections via layered soft
shadows and subtle gradient mesh using the existing (currently underused)
`--navy-blob` token.

### Grid gets asymmetric
Move from centered/symmetric layouts (720px hero column, uniform 3-col grids)
toward broken-grid moments: offset image/text splits, bento grids with varied
cell sizes (extending the pattern already started on the championship page),
oversized numerals bleeding across column boundaries, pull quotes that break
the column.

### Token cleanup as groundwork
Consolidate `src/styles/variables.css` to one source of truth matching
DESIGN.md — remove/merge duplicate tokens (`--gold`/`--accent-amber`,
`--font-display`/`--font-display-hero`), reconcile undocumented fonts
(`--font-championship`, `--font-welcome`) with the documented type system,
and update DESIGN.md to reflect the final state. This happens once, up front,
so later phases build on one consistent token set instead of adding a second
layer of inconsistency.

### Imagery treatment (not new images)
Same image files, richer presentation: duotone/gradient overlays consistent
with the palette, `clip-path`/mask crops instead of plain rectangles, subtle
scroll parallax, and a consistent treatment applied across
hero-bg/register-bg/bento images so they read as one system.

### Shared components
- **Nav**: refine existing glass/blur treatment; scroll-aware condense state;
  active-link indicator; underline/magnetic hover on links.
- **Buttons**: keep the pill shape; add hover physicality (magnetic pull
  toward cursor on desktop only), cleaner press states, icon
  micro-animations on CTAs.
- **Cards**: replace flat styling with layered shadow + hover border glow +
  icon reveal animation; vary shapes across bento grids instead of uniform
  3-col.
- **Forms** (login/register/settings): bring into the same type/spacing
  system without touching field labels/copy; better focus states, inline
  validation motion.
- **Chess board chrome**: panels/turn-indicators/surrounding UI restyled;
  board mechanics untouched.

### Motion language ("rich but tasteful")
Scroll-linked reveals with stagger; section-transition choreography (elements
exit/enter as section boundaries are crossed, not just fade-in-once); hover
micro-interactions on all interactive elements; 1–2 signature moments on the
homepage hero (e.g. idle animation / parallax tilt on the chess board image).
All gated behind `prefers-reduced-motion` / `@media (hover: hover)`.

## Execution phasing

Scope is the whole site, executed as one continuous effort but sequenced into
reviewable chunks, each its own set of commits per `AGENTS.md`'s per-turn
convention:

1. **Foundation** — token cleanup (`variables.css`, `theme.css`, DESIGN.md),
   fluid type scale, spacing scale, and a shared component pass (nav, footer,
   buttons, cards, forms/modal chrome). This is the base every later phase
   builds on.
2. **Homepage** (`/`) — highest-value page; becomes the reference
   implementation of the new visual language for the rest of the site.
3. **Marketing pages** — `/about`, `/championship`, `/taskify`, `/teamup`,
   `/why-beee`, `/partner`, `/faq`.
4. **App/auth pages** — `/login`, `/register`, `/dashboard`,
   `/dashboard/partner`, `/account`, `/profile`, `/payment/callback`.
5. **Utility pages** — `/privacy`, `/terms`, `/+error`.

`/e4` and `/i` (chess-specific routes) get the chrome-only treatment described
above, folded into whichever phase touches their surrounding components.

## Testing / verification

Per `AGENTS.md` and repo convention, no dev server and no `npm run build` will
be run. Verification during implementation is limited to:
- `type-check` / `svelte-check` for compile correctness.
- Existing test suite (`pnpm test`, e2e specs) — run to confirm no regressions
  in behavior/content assertions; visual-only changes shouldn't break these,
  but any test that asserts on class names/structure will be checked and
  updated if the change is purely presentational.
- Careful reading of rendered markup/CSS output.

**This does not substitute for a real visual check.** At the end of each
phase, changes will be reported as implemented-but-visually-unverified, and
you'll need to view them in a browser to confirm the result before the next
phase proceeds (or before considering the overall effort done).

## Out of scope

- Any copy/text edits.
- Any new/removed/swapped image assets.
- Chess gameplay logic/mechanics.
- New pages or routes.
- Backend/API changes.
- Site-wide light/dark theme toggle (README notes dark mode is currently
  hardcoded/intentional — not being revisited here).
