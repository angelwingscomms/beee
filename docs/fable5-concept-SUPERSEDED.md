# THE EIGHTH RANK — Design Concept & Full-Site Implementation Plan

**Author:** Claude Fable 5 · **Date:** 2026-07-11
**Scope:** beeeproject.com homepage (`src/routes/+page.svelte` + championship components), nav, footer, cursor.
**Contract:** This document is the implementation spec. A smaller model must be able to build any section from its entry here with no further questions.

---

## Deliverable 1 — The Concept

### Name: **THE EIGHTH RANK**

*A promotion story. One pawn crosses the board. The board is childhood.*

### The one narrative arc

In chess, a pawn that reaches the eighth rank **promotes** — the least powerful piece becomes the most powerful one. That is literally BEEE's pitch to parents: *your child, through structured advancement (e4 training → TEAMUP development → TASKIFY records → competition), becomes something more.* The entire page scroll is one pawn's journey up the board:

| Scroll phase | Rank | Section | Story beat |
|---|---|---|---|
| 0 | 1–2 | Hero | A single cream pawn stands on e2 under an amber spotlight in a navy night. As you scroll, it makes the first advance: **e2 → e4**. |
| 1 | 3 | What Makes BEEE Different | Three allies join the journey — the three platforms rise onto the board like pieces being placed. |
| 2 | 4–5 | Everything Your Child Needs | Territory gained — the bento grid reads as squares the pawn now controls. |
| 3 | 6 | The Journey framework | The path ahead is drawn — literally: the dotted tree draws itself down the file, a pawn glyph travels it. |
| 4 | 7 | Make Your Move (kinetic type) | Seventh rank. One square left. Maximum tension, biggest type on the page. |
| 5 | **8** | Philosophy (amber) | **Promotion.** The page floods amber. Between the two amber statements, a pawn silhouette morphs into a queen. "Chess is not the destination. It's the platform." |
| 6 | — | Footer | Back to navy, but changed — the queen watermark stands where the pawn started. "Make Your Move." Your move now: register. |

Every section carries a giant ghost **rank numeral** (2, 3, 5, 6, 7, 8) in the background — a quiet spine that makes the arc legible without adding a word of copy.

### The jury pitch

Single-object scroll storytelling is the pattern that keeps winning: **igloo.inc** (Site of the Year 2024) tells its whole story through one scroll-choreographed 3D object; **Chartogne-Taillet** (Immersive Garden) made scroll-as-journey canonical; **Opal Camera** and **Lusion** proved restrained, high-performance WebGL beats particle soup; **Persepolis Reimagined** (Getty) showed guided-camera narrative can carry institutional trust. THE EIGHTH RANK applies that pattern with something those sites don't have: a metaphor that *is* the product. The pawn isn't decoration — promotion is the value proposition. Parents read it as development; kids read it as becoming the most powerful piece on the board. One object, one arc, zero rewritten copy.

### The 3D chessboard, phase by phase

- **Phase 0 (hero, load):** Procedural isometric board in three.js — cream and deep-navy squares, amber-lit rim. A cream pawn on e2 with a warm point-light halo. Sparse abstract pieces on the back ranks. Camera starts low and cinematic, almost board-level.
- **Phase 0→1 (hero scroll, scrubbed):** Camera dollies up and orbits toward top-down isometric while the pawn lifts, arcs, and lands on e4. The e4 square pulses amber before the pawn lands. This is the only full 3D scene — everything after is lighter-weight (SVG/CSS/GSAP) so the page stays fast.
- **Phases 1–4:** The board persists as *language*, not as WebGL: square-grid ghost patterns, rank numerals, an SVG pawn traveling the Journey tree.
- **Phase 5:** SVG silhouette morph pawn → queen, scrubbed between the two amber screens.

### Particles & background

Hero: ~450-point WebGL starfield in amber/cream with additive blending, drifting slowly upward, plus DOM chess-notation glyphs (`e4`, `Nf3`, `O-O`, `♞`, `#`) floating at low opacity in JetBrains Mono — the glyphs double as the no-WebGL fallback. Elsewhere: the existing noise texture + ghost numerals only. Restraint is the flex.

### Cursor

The existing custom cursor ring evolves into a **legal-move indicator**: a rounded-square amber outline (like the highlight on a chess square) that eases behind the pointer, scales up over interactive elements, and switches to `mix-blend-mode: difference` so it reads on both navy and amber surfaces.

### Typography

Space Grotesk (already `--font-hero`) does the talking. Load: hero h1/h2 reveal with GSAP SplitText word stagger. Scroll: every section title reveals with word stagger from below with a clipped mask. "Make Your Move" upgrades to per-character kinetic reveal with a settle-skew. The amber philosophy screens keep their word-split but gain a scrub-pin so the sentence assembles as you scroll into it.

### Palette evolution across the scroll

Navy `#0A0F1A` (hero, deepest) → navy + rising amber bloom (Different) → navy with cream/teal card punches (Everything) → navy + amber line-work (Journey) → **full amber `#ffb200` field** (promotion) → navy resolve (footer). The arc is dark → gold → dark: night, dawn, promotion, and back to the tournament hall. No new hues; the drama is in proportion.

### Sound design (optional, note only)

Muted by default, toggle in nav: felt-on-wood piece *tap* when the pawn lands on e4; soft wooden *slide* on card hovers; a low choir/hall swell at the promotion morph; ticking-clock ambience (barely audible) in the Make Your Move section.

---

## Deliverable 2A — Full-Site Plan (the spec)

### Global rules (apply to every section)

- **Copy & images are frozen.** Every existing text node and `<img>` stays verbatim. Decorative additions are limited to: rank numerals (digits only), chess glyphs (♟♛ etc.), and aria-hidden ornament. No new sentences.
- **Reduced motion:** every GSAP/JS animation is gated behind `!matchMedia('(prefers-reduced-motion: reduce)').matches`; CSS keyframes get `@media (prefers-reduced-motion: reduce) { animation: none }` overrides. Content must be fully readable with JS animations off (use `gsap.from` or pre-set visible states — never leave opacity 0 as the resting state).
- **Mobile (≤768px):** 3D → static, scrub pins → simple enter animations, hover tilts → none. Test at 375px.
- **Performance:** three.js only in the hero, lazy-imported on the client. DPR capped at 1.5. rAF paused when offscreen (IntersectionObserver). No new dependencies beyond `three` + `@types/three`.
- **Style system:** extend `src/styles/hero.css`, `src/styles/animations.css`, `src/styles/sections.css`. Use tokens from `variables.css` (`--navy`, `--accent-amber`, `--canvas`, glass tokens). No new CSS files.
- **Ghost rank numerals:** each homepage section gets `<span class="rank-ghost" aria-hidden="true">N</span>` — Space Grotesk, `font-size: clamp(200px, 40vw, 560px)`, `color: transparent`, `-webkit-text-stroke: 1px rgba(255,178,0,0.08)`, absolute, overflow hidden, behind content. Numerals: hero 2, diff 3, platform 5, journey 6, intro-cta 7, philosophy 8.

### 1. Nav — `src/lib/components/championship/ChampNav.svelte`

- Keep structure, links, CTA verbatim.
- Add a **rank progress bar**: a 2px amber line along the pill's bottom inner edge whose width = page scroll progress (`ScrollTrigger.create({ onUpdate })` or a scroll listener writing a CSS var `--scroll-p`). At each 1/6 of progress a small dot notch lights up (6 dots = 6 phases).
- Over the dark hero the pill uses its existing `.dark` treatment; once past the hero (`IntersectionObserver` on the hero), swap to the cream glass (existing default). Implement by toggling a class on `<nav>`.
- Link hover: existing pill hover stays; add 150ms letter-spacing ease (`letter-spacing: 0.02em` on hover).

### 2. Hero — `src/lib/components/championship/ChampHero.svelte` (reference build, done — see Deliverable 2B)

### 3. What Makes BEEE Different — `src/routes/+page.svelte` (`#diff-section`) + `src/lib/components/home/PlatformCard.svelte`

- Keep the `PlatformCard` copy/props verbatim.
- **Entrance (replaces the current anime.js fade):** cards rise like pieces being placed — `y: 90, opacity: 0, rotateX: 12` → settle with `ease: 'back.out(1.4)'`, stagger 0.12, ScrollTrigger `top 75%`. Add a soft shadow that contracts as each card lands (animate `--card-shadow` CSS var or a pseudo-element scaleX).
- **Hover tilt:** pointer-tracking tilt on each card, max ±6°, via `gsap.quickTo` on `rotationX/rotationY` with `transformPerspective: 900`; plus a glare sweep — a `::after` diagonal white gradient at 8% opacity translating across on hover. Mobile: none.
- **Title reveal:** SplitText word stagger on the `h2` (same recipe as hero titles).
- Section keeps `bg-navy`; add rank-ghost "3" and a faint 8×8 square grid backdrop (`background-image: linear-gradient` grid at 3% cream, masked radially so it fades at edges).

### 4. Everything Your Child Needs — `src/routes/+page.svelte` (`#platform`)

- Keep all three bento cards, images, the gain-list pills, all copy.
- **Image parallax:** inside card 1 (e4 UI) and card 3 (TEAMUP photo), scrub the `<img>` `scale: 1.12 → 1` and `y: -4% → 4%` with a ScrollTrigger scrub over the card's viewport transit (`ease: none`).
- **Spotlight cursor:** on the two image cards, a radial-gradient overlay (`radial-gradient(400px at var(--mx) var(--my), rgba(255,178,0,0.10), transparent 60%)`) following the pointer via CSS vars set in a `pointermove` handler. Keep the existing `onBentoHover` 3D tilt for card 3.
- **Gain-list pills:** stagger-pop on scroll — `scale: 0.6, opacity: 0` → `scale: 1` with `ease: 'back.out(2)'`, stagger 0.06, triggered at `top 80%`. They should feel like badges being earned (this is TASKIFY's whole point).
- **TEAMUP letters (card 3):** the amber `T/E/A/M/UP` lines get a SplitText line stagger (`y: 40, opacity: 0`, stagger 0.08) when the card enters.
- Title `h2` gets the standard word-stagger reveal. Add rank-ghost "5".

### 5. The Journey — `src/routes/+page.svelte` (`#journey`)

- Keep the entire tree DOM, icons, and copy verbatim.
- **Line draw:** the dotted connector lines (`.line-v`, `.line-h`) currently are borders — convert visuals only: overlay each with an absolutely-positioned SVG `<line>`/`<path>` (amber, `stroke-dasharray: 2 6`) and animate `stroke-dashoffset` from full to 0, scrubbed across the section (`start: 'top 70%', end: 'bottom 75%'`). Simpler acceptable variant: animate `clip-path: inset()` reveals on the existing border elements in document order (top drop → horizontal → node drops → bottom drop), scrubbed.
- **Traveling pawn:** a small `♟` glyph (`aria-hidden`, amber, 20px) follows the center line downward as the user scrubs, and swaps to `♛` (crossfade 200ms) when it reaches the bottom card. Implement with a scrubbed `gsap.timeline` animating `top` within the `.tree-container` (no MotionPath plugin needed — it's a straight vertical run with one pause per horizontal).
- **Node cards:** as the line reaches each card, the card's amber border glows (`box-shadow: 0 0 24px rgba(255,178,0,0.35)` tweened in) and the icon does a 1.06 scale pulse.
- **Bottom card:** when reached, the glow-divider shine (already styled) replays — retrigger by toggling a class.
- Add rank-ghost "6". Mobile: skip the traveling pawn, keep clip-path reveals as simple `from` animations.

### 6. Make Your Move (intro) — `src/routes/+page.svelte` (`#intro-cta`)

- Keep the `h2` text verbatim.
- Replace the anime.js one-shot with **per-character kinetic reveal**: SplitText chars, each char `yPercent: 110, rotate: 6` → 0 inside an `overflow: hidden` line wrapper, stagger 0.03, `ease: 'power4.out'`, trigger `top 75%`.
- **Magnetic hover:** on pointermove over the h2, chars within 120px of the cursor ease `y: -8` (`gsap.quickTo` per char is too heavy — use a single handler that lerps a `--pull` var on the 3 nearest chars). Desktop only; skip if this proves janky — the reveal alone carries the section.
- Amber underline sweep (scaleX 0→1, origin left) under the headline after the chars land.
- Add rank-ghost "7" and increase section height to `min-h-[70vh]` flex-centered so the moment breathes.

### 7. Philosophy ×2 (promotion) — `src/routes/+page.svelte` (`#philosophy`, `#philosophy-alt`)

- Keep both headlines and the amber background verbatim.
- Keep the existing SplitText word reveals, but change trigger to a **scrub-pin** on the first screen: pin `#philosophy` for `+=60%`, words rise `y: 100 → 0` scrubbed, so the sentence assembles under the reader's thumb. Second screen keeps the non-pinned reveal (variety, and avoids double-pin jank).
- **The promotion morph:** between the two amber sections insert a full-width amber band (`aria-hidden`, no copy) containing a centered SVG: pawn silhouette path morphing to queen silhouette. Without MorphSVG (club plugin licensing — do NOT add it), implement as **two stacked paths crossfading + scaling** (pawn scales up 1→1.15 and fades out while queen scales 0.85→1 and fades in), scrubbed over the band, navy `#0A0F1A` silhouettes on amber. A thin "RANK 8" ruled line above it in navy at 10% opacity (digits + the word RANK are allowed ornament).
- Background of both screens: faint 8×8 grid (navy at 4%) masked to the center.

### 8. Page footer CTA — `src/routes/+page.svelte` (`#contact` footer block)

- Keep both links and text verbatim.
- "Make Your Move." fill-on-hover: text rendered with `background-clip: text` over a two-stop gradient (white → amber) whose `background-position` sweeps on hover (CSS only).
- A queen glyph `♛` watermark (aria-hidden, cream at 4%, ~30vw) sits behind, right-aligned — the pawn's journey ended here.
- Arrow on the register link nudges `translateX(6px)` on hover (CSS).

### 9. Global footer — `src/lib/components/home/Footer.svelte`

- Keep everything. Add only: children of `.footer-inner` reveal with a 0.08 stagger fade-up on enter (extend the existing `motionFadeUp` usage to stagger, or three `use:motionFadeUp` with delays). No structural change.

### 10. Cursor — `src/components/Cursor.svelte`

- Change the ring to a rounded square (`border-radius: 6px`), border `rgba(255,178,0,0.7)`, `mix-blend-mode: difference`, same lerp-follow. Keep the hover scale-up; add a 4px solid amber center dot that tightens (scale 0.6) on hover. Touch/reduced-motion bail stays.

### QA checklist (run after each section)

1. `pnpm check` clean; `pnpm build` succeeds (Cloudflare adapter — no top-level three.js imports anywhere).
2. Copy diff: `git diff` shows no deletions/edits inside text nodes.
3. `prefers-reduced-motion: reduce` → page fully readable, no motion, no blank sections.
4. 375px viewport → no horizontal scroll, no 3D, entrance animations only.
5. Keyboard tab order reaches both hero CTAs, nav, all card links; focus visible.
6. Lighthouse mobile perf ≥ 85 on the homepage.

---

## Deliverable 2B — Hero reference build

Implemented in `src/lib/components/championship/ChampHero.svelte` with styles appended to `src/styles/hero.css` and keyframes in `src/styles/animations.css`. See the component for inline rationale. Key decisions:

- **200vh section + `position: sticky` stage** instead of ScrollTrigger pinning — native sticky can't jank on pin-spacer recalc, and ScrollTrigger still drives the scrub via `onUpdate` progress.
- **three.js lazy `import()` inside `onMount`**, gated by WebGL + viewport + reduced-motion checks — Cloudflare adapter never sees it, mobile never pays for it.
- **Instanced board squares** (two InstancedMeshes, 32 squares each) + primitive-built abstract pieces — stylized igloo-style minimalism, tiny draw-call budget.
- **Scroll choreography:** camera keyframe path (low cinematic → high isometric) + pawn e2→e4 lift-arc + e4 target-square pulse, all driven by one scrubbed progress value.
- **DOM notation glyphs + CSS isometric board** double as the no-WebGL/mobile fallback, so the fallback is a designed state, not an absence.
- **Copy and hero photo are byte-identical** to the previous component; the two commented-out glass cards (e4 AI feedback, TASKIFY progress) are restored to visible — their copy already existed in the file.
