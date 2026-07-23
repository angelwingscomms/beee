# BEEE Design System — SPEC-TRUM

BEEE (Be Everything Excellent Every Day) — youth chess championship + development platform. Calming, nostalgic, spectacular: a light "cloud" site interrupted by deep "nightfall" sections, orange used as light rather than paint. Full creative rationale in `docs/design-direction.md`; the binding build instruction is `docs/revamp-plan.md`.

## Colors

- `--cloud: #F1EEE7` — canvas: the grey-warm sky before rain. `--cloud-dim: #E9E5DB` — soft surfaces on cloud.
- `--nightfall: #0A0F1A` — the deep navy interruption. `--nightfall-soft: #101624` — elevated surfaces on nightfall.
- `--beam: #F27830` — locked brand orange, repurposed as golden-hour light rather than flat paint. `--beam-active: #BD5E25`.
- `--honey: #FFB200` — the sun's edge, rarer than beam.
- `--ink: #141413` / `--body` — text on cloud. `--dusk-ink: #F2EFE8` / `--dusk-body` — text on nightfall.
- `--hairline` — rules and borders on cloud.
- Spectrum set (`--spec-t/e/a/m/u`) — the prism split. Appears **only** at the TEAMUP split moment on the homepage — never as decoration elsewhere.
- Status: `--success`, `--error`, `--warning`.

## Type — four fonts, four roles

- Display / headings: **Bricolage Grotesque** (`--font-grotesk`) — `.rv-d1/.rv-d2/.rv-d3/.rv-title`.
- Body: **General Sans** (`--font-sans`) — `.rv-body/.rv-body-lg`.
- Micro-labels / code: **JetBrains Mono** (`--font-mono`) — `.rv-micro`, uppercase, tabular numerals, the chess-clock voice.
- Serif accent: **Fraunces**, roman weights only (`--font-serif-note`, `.rv-note`) — at most 2 uses per page. No italics anywhere in the repo.

## Space, motion, composition

- Section rhythm: `--section-pad` (96–200px fluid), `--space-0`…`--space-11` scale, 12-column `.rv-grid`, `--margin-x: 6vw`.
- One easing everywhere: `--ease-out: cubic-bezier(0.16, 1, 0.3, 1)`. Durations: `--dur-micro` (300ms press/hover), `--dur-reveal` (1000ms), `--dur-page` (1300ms). No bounce, no `ease-in-out`.
- The felted press: every interactive element gets `.felt` (translateY(1px) scale(0.985) on press).
- Fields: `.rv-field-cloud` / `.rv-field-night` set the canvas + text color for a section. No hard visual cuts between sections.
- The signature device: a WebGL beam-and-dust layer (`src/lib/gl/`, Three.js, lazy-loaded) runs from the homepage hero to the finale, forms a knight silhouette once, and splits into the five spectrum threads at the TEAMUP moment. Falls back to `.rv-beam-fallback` with WebGL off or `prefers-reduced-motion`.
- Grain overlay (`Grain.svelte`), a single dot cursor (`Cursor.svelte`), light-default theme with a persisted nightfall dark toggle (`ThemeToggle.svelte`, `beee_theme` in localStorage).
- Honeycomb-pattern wallpaper is banned — the hexagon appears only as the intro prism and the logo itself.

## Component patterns

- Buttons: `.rv-btn` + `.rv-btn--beam` (gradient CTA) / `.rv-btn--ghost` (outline) / `.rv-btn--big`.
- Editorial lists: `.rv-row` — mono index, title, body, hairline-separated.
- Forms: `.rv-input` / `.rv-label` / `.rv-error-text` / `.rv-callout-ok`.
- Image frames: `.rv-frame` with the `revealImage` action (scale 1.12 → 1.0 entrance).
- Shared page primitives: `PageHero.svelte`, `CTABand.svelte`, `FeatureRows.svelte` (`src/lib/components/system/`).
- Motion actions: `revealLines`, `revealFade`, `revealChildren`, `revealImage` (`src/lib/motion/reveal.ts`); smooth scroll via Lenis (`src/lib/motion/smooth-scroll.ts`).

## Structure

- Tokens: `src/styles/variables.css` (runtime custom properties) + `src/styles/theme.css` (Tailwind `@theme`) + `src/styles/system.css` (SPEC-TRUM primitives, `.rv-*` classes).
- All styles imported by `src/app.css` in a fixed order. Never hardcode a raw hex/px/easing where a token exists.
- Fonts: `@fontsource-variable/bricolage-grotesque`, `@fontsource/jetbrains-mono` (npm), General Sans + Fraunces in `static/fonts/` (self-hosted woff2).
