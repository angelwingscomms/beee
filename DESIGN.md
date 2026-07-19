# BEEE Design System

BEEE (Be Everything Excellent Every Day) — youth chess championship + development platform. Warm, premium, editorial. Cream canvas, navy product surfaces, amber/gold accents.

## Colors

- `--accent-amber: #ffb200` — primary brand accent (gold). Used for eyebrow labels, highlights, shine text, borders.
- `--primary: #F27830` — warm coral CTA / action color. Active `#BD5E25`.
- `--navy: #0A0F1A` — dark product surface (heroes, journey, footer). `--navy-blob: #1A2B4C`.
- `--canvas: #faf9f5` — warm cream page background.
- `--ink: #141413` / `--body: #3d3d3a` — text on light. `--on-dark: #faf9f5` / `--on-dark-soft: #a09d96` — text on navy.
- `--hairline: #e6dfd8` — light borders. `--surface-card: #efe9de`.
- Status: `--success: #5db872`, `--error: #ff372d`, `--accent-teal: #5db8a6`.

## Type

- `--font-hero: 'Space Grotesk'` — display headings, big numbers, nav brand.
- `--font-display: 'Cormorant Garamond'` — elegant serif for editorial headings.
- `--font-body: 'Inter'` — body copy (loaded via Google Fonts in `src/styles/fonts.css`).
- `--font-registration: 'SN Pro'` — forms / registration.
- Pairing: Space Grotesk + Inter for the modern marketing feel; Cormorant for accent moments.
- Fluid display scale — `--fs-display-2xl` (48–120px) through `--fs-display-sm` (22–28px), each a `clamp()` that grows with viewport width. Use these for headline type instead of hardcoding pixel `font-size`s.

## Principles

- Generous spacing, large hero type, pill-shaped buttons (`--radius-pill: 999px`).
- Dark navy sections alternate with cream sections. Gold used sparingly as voltage.
- Soft shadows (`--shadow-soft`), subtle grain/noise overlays, glassmorphism on nav.
- Motion: GSAP / animejs / motion for scroll reveals; always respect `prefers-reduced-motion` and guard transform hovers with `@media (hover: hover)`.

## Structure

- Tokens: `src/styles/variables.css` + `src/styles/theme.css`.
- All styles in `src/styles/*.css`, imported by `src/app.css` (Tailwind v4). Never hardcode raw values — use the variables above.
- Fonts in `static/fonts/` (Bumble, SN Pro, Fraunces) + Inter via Google Fonts.
