# BEEE Revamp — Master Implementation Plan (codename SPEC-TRUM)

This plan is exhaustive and binding. An implementing agent follows it top to bottom and makes **zero** creative or technical decisions of its own. Where this plan gives text, use it verbatim (headline capitalisation and punctuation included). Where it gives numbers, use them exactly. The creative rationale lives in `docs/design-direction.md`; this file is the build instruction.

**Copy-preservation amendment (supersedes conflicting copy in P2–P5 below).** Existing visible copy is changed only where extremely necessary — i.e. only for elements that are genuinely new and have no prior equivalent (the WIN preloader, journey-rail micro-labels, stat rail, new section eyebrows/captions). Concretely: P3 (`/e4`, `/teamup`, `/taskify`) and P4 (`/about`, `/why-beee`, `/faq`, `/partner`) become **pure visual reskins** — keep every existing heading, paragraph, feature-card title/body, and CTA label byte-for-byte (e.g. e4's "Guided AI Instruction" / "Ready to Train Smarter?", about's "A Vision and Mission Beyond a Championship" / "Aspire to BEEE", partner's dynamic dev/prod fee copy) and only replace class names, layout, tokens, and motion. Ignore this plan's invented replacement headlines/body copy for those pages (e.g. "The best first move", "Excellence, every day", "Share the stage") — do not use them. P2 (homepage) and P5 (transactional) keep their specified new copy only where it fills a structurally new slot (preloader, journey-rail, stat rail, finale square caption, the three explicitly-enumerated P5.2 copy changes); everywhere else on the homepage prefer the current site's existing strings where they still fit the new section (e.g. "Chess is not the destination. It is the platform.", "Chess is where they learn. Life is where they lead.", "Make Your Move.", the Awards list, the TEAMUP pillar descriptions, the footer tagline — all already reused verbatim below). When in doubt: grep the current component being replaced for its existing copy first, and reuse it.

---

## 0. Execution rules (read first, obey always)

1. Work phase by phase, in order (P0 → P7). The site must build and run after every phase. Finish a phase's Definition of Done before starting the next.
2. Commit after each phase: `git add -A && git commit -m "revamp: P<n> <phase name>"`.
3. **Never touch** (read-only, byte-for-byte): everything under `src/routes/api/`, `src/hooks.server.ts`, `src/lib/db/`, `src/lib/paystack.ts`, `src/lib/partner.ts`, `src/lib/partner_code.ts`, `src/lib/email.ts`, `src/lib/server/`, `src/lib/active_reg.ts`, `src/lib/confirm.ts`, `src/lib/constants.ts`, `src/routes/payment/callback/+page.ts`, all `+page.server.ts` / `+layout.server.ts` / `+layout.ts` files, `src/routes/sitemap.xml/`, `src/routes/google/`, `src/routes/i/` (admin), `wrangler.toml`, `svelte.config.js`, `vite.config.ts`. Also leave untouched: `src/App.svelte`, `src/main.ts`, `src/components/DevBash.svelte`, `src/lib/groq.ts`, `src/lib/util/`, `src/lib/types/`, `src/lib/data/banks.ts`, `src/lib/data/countries.ts`, `src/lib/data/phone_lengths.ts`, `src/lib/data/faq.ts`.
4. **No italics anywhere**: no `font-style: italic`, no `<em>`, no `<i>`, no markdown italics in copy. The Fraunces italic file gets deleted in P6. This is a repo law from `AGENTS.md`.
5. All colors, sizes, fonts, easings, durations come from CSS custom properties defined in P1. Never hardcode a raw hex/px/easing in a component where a token exists.
6. All copy in this plan is final. Do not paraphrase, "improve", or re-punctuate it.
7. Every animation: `transform`/`opacity` only; plays once (`once: true`) unless marked "scrub"; guarded by `prefers-reduced-motion` (static, fully readable fallback); hover transforms behind `@media (hover: hover)`.
8. Breakpoints: use the existing custom media (`--sm-down` ≤767, `--sm-up` ≥768, `--md-down` ≤1023, `--md-up` ≥1024, `--lg-up` ≥1440) from `src/styles/breakpoints.css`.
9. Svelte 5 runes syntax everywhere (`$state`, `$derived`, `$props`, `onMount` for DOM work).
10. If an image referenced by a component does not exist yet, run its exact generation/placeholder command from §P0.3 before proceeding. Never ship a broken `src`.
11. Existing pages must keep working between phases. Old CSS files (`hero.css`, `cards.css`, etc.) are only deleted in P6 after nothing imports their classes.
12. The dev server runs with `pnpm dev` on port 5400. Type gate: `pnpm check`. Unit tests: `pnpm test`. Build gate: `pnpm build`.

---

## 1. Ground truth (verified facts about the repo)

- Stack: SvelteKit + Svelte 5 (runes), Tailwind v4 (`@tailwindcss/vite`), adapter-cloudflare, GSAP 3.15 (ScrollTrigger + SplitText registered free), `motion` 12.x, `@lucide/svelte`. No Lenis, no Three.js yet.
- Global CSS: `src/app.css` imports 18 files from `src/styles/` in a fixed order; Tailwind theme tokens in `src/styles/theme.css` (`@theme`); runtime tokens in `src/styles/variables.css`; `.dark` overrides in `src/styles/dark-mode.css`.
- `src/app.html` currently **forces** `class="dark"` on `<html>` (attribute + inline script) and has duplicated preload/theme-color tags. There is no theme toggle anywhere. This gets fixed in P1.4.
- Layout chain: `src/routes/+layout.svelte` renders skip-link → `Cursor` → `ChampNav` → `<main id="main-content">` → `Footer`. SEO/meta centralised in `src/lib/seo.ts` (leave `seo.ts` content unchanged — titles/descriptions are already SEO-tuned).
- Nav: `src/lib/components/championship/ChampNav.svelte` (pill glass bar; holds auth state logic: `user`, logout fetch, mobile menu). Footer: `src/lib/components/home/Footer.svelte`.
- Fonts today: Google Fonts CSS import (Cormorant Garamond, Inter, JetBrains Mono, Montserrat, Open Sans, Playfair, Poppins, Schibsted Grotesk, Space Grotesk) + local SN Pro (`static/fonts/sn-pro/`), GC Bumble (`static/fonts/bumble-*.otf`), Fraunces variable (`static/fonts/fraunces/`, normal + italic).
- Style tests exist and read CSS as text: `src/styles/variables.test.ts` (asserts exact token strings; **forbids** a token literally named `--gold:`), `src/styles/cards.test.ts`, `src/styles/forms-modal.test.ts`, plus component tests (`ChampNav.test.ts`, `Footer.test.ts`, `Button.test.ts`, `faq.test.ts`, registration tests). Payment/backend tests must stay green untouched.
- Constants for money copy: `REG_AMOUNT = 15000` naira, `DISCOUNT_PCT = 10`, partner commission ₦1,350/referral. E4 app: `https://e4.beeeproject.com`.
- Logo: `static/logo.svg` (bee of four hexagons), `Logo.svelte` component exists.
- Locked brand: orange `#F27830`, the bee mark, tagline, BEEE®. Fee ₦15,000. Dates: coaching Jul 28–Aug 29 2026, prelims Sep 2026, finale Oct 2026, National Stadium Abuja, ages 10–14.

---

## P0 — Dependencies and assets

### P0.1 Packages

```bash
pnpm add lenis three
pnpm add -D @types/three
pnpm add @fontsource-variable/bricolage-grotesque @fontsource/jetbrains-mono
```

### P0.2 General Sans (Fontshare)

```bash
mkdir -p static/fonts/general-sans /tmp/gs
curl -L -o /tmp/gs/general-sans.zip "https://api.fontshare.com/v2/fonts/download/general-sans"
cd /tmp/gs && unzip -o general-sans.zip
find /tmp/gs -name 'GeneralSans-Variable.woff2' -exec cp {} /home/ed/i/beee/static/fonts/general-sans/ \;
ls /home/ed/i/beee/static/fonts/general-sans/GeneralSans-Variable.woff2  # must exist
```

If the download fails (offline), copy nothing and instead add `'General Sans'` → fallback stack only (P1.1 already includes fallbacks); retry the download before P6.

### P0.3 Imagery (AI-generated; nothing real exists)

All new images live in `static/images/rv/`. Generate each with the exact prompt below (any available image-generation tool; 1 image per prompt; then convert PNG → WebP with `cwebp -q 82 in.png -o out.webp` or `magick in.png -quality 82 out.webp`). If generation is unavailable, create the exact placeholder with the ImageMagick command given so the build never breaks, and leave a `TODO-IMAGE` line in the P7 report.

| File | Size | Prompt (verbatim) | Placeholder command |
|---|---|---|---|
| `hero-stadium.webp` | 2560×1440 | "Wide establishing shot from high in the stands of an empty African national football stadium at golden hour, long shafts of warm golden light cutting through cool grey-blue shadow onto the pitch, a single small chess table with two chairs alone at the centre of the pitch, cinematic, atmospheric haze, dust visible in the light beams, muted warm orange light against deep navy shadow, film grain, no people, no text" | `magick -size 2560x1440 gradient:'#0F1524'-'#1A2B4C' static/images/rv/hero-stadium.webp` |
| `kid-board-01.webp` | 1600×2000 | "A Nigerian child aged about 11 seated at a chessboard in a vast dim stadium, lit by a single warm golden shaft of light from above, calm focused expression, hand hovering over a knight, deep navy shadows, cinematic film still, shallow depth of field, film grain, no text" | `magick -size 1600x2000 gradient:'#101724'-'#232D44' static/images/rv/kid-board-01.webp` |
| `kid-board-02.webp` | 1600×2000 | "Two Nigerian children aged 10 to 14 playing chess mid-game in a stadium tunnel opening onto a bright pitch, silhouetted golden rim light, cinematic, film grain, no text" | `magick -size 1600x2000 gradient:'#101724'-'#232D44' static/images/rv/kid-board-02.webp` |
| `hand-piece.webp` | 2000×1333 | "Macro close-up of a child's hand gently placing a felted wooden chess piece on a board, warm golden hour side light, deep navy shadow background, green felt just visible under the piece, cinematic, film grain, no text" | `magick -size 2000x1333 gradient:'#141B2C'-'#2A3450' static/images/rv/hand-piece.webp` |
| `teamup-mentor.webp` | 1600×1200 | "A warm candid scene of a mentor guiding three Nigerian children around a table holding a chessboard, small robotics parts and sketchbooks, golden window light, deep calm shadow, documentary film still, film grain, no text" | `magick -size 1600x1200 gradient:'#141B2C'-'#2A3450' static/images/rv/teamup-mentor.webp` |
| `passport-macro.webp` | 1600×1200 | "Macro shot of an elegant deep navy passport-like booklet with a small embossed geometric bee emblem made of four hexagons, warm golden light raking across the cover, resting on dark wood, cinematic, film grain, no text" | `magick -size 1600x1200 gradient:'#0C1220'-'#1E2740' static/images/rv/passport-macro.webp` |
| `static/gl/knight-mask.png` | 1024×1024 | "A clean solid white silhouette of a modern minimal chess knight piece on a pure black background, centered, flat vector style, no gradients, no texture, no text" | `magick -size 1024x1024 xc:black static/gl/knight-mask.png` |

Alt text (use verbatim): hero-stadium → "Empty national stadium at golden hour with a single chess table at the centre of the pitch"; kid-board-01 → "A young player studying the board under a shaft of golden stadium light"; kid-board-02 → "Two young players mid-game in a stadium tunnel"; hand-piece → "A child's hand placing a chess piece on the board"; teamup-mentor → "A mentor working through ideas with three young participants"; passport-macro → "The Taskify development passport booklet". Decorative images (knight mask, beams) get `alt=""` `aria-hidden="true"`.

Existing kept images: `static/images/e4-ui.webp` (e4 page), `static/logo.svg`, `static/og/*` (OG images unchanged this revamp). Delete `homepage-full.png` (4.7MB repo junk) in P6.

Definition of Done P0: packages in `package.json`; `static/fonts/general-sans/GeneralSans-Variable.woff2` exists; all 7 `rv`/`gl` files exist; `pnpm check` passes.

---

## P1 — Foundation

### P1.1 `src/styles/fonts.css` — replace entire file with:

```css
@import '@fontsource-variable/bricolage-grotesque';
@import '@fontsource/jetbrains-mono/400.css';
@import '@fontsource/jetbrains-mono/500.css';

@font-face {
  font-family: 'General Sans';
  src: url('/fonts/general-sans/GeneralSans-Variable.woff2') format('woff2');
  font-weight: 200 700;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'Fraunces';
  src: url('/fonts/fraunces/fraunces-latin-normal.woff2') format('woff2');
  font-weight: 200 900;
  font-style: normal;
  font-display: swap;
}

/* Legacy faces kept until P5 replaces the register flow styling, removed in P6. */
@font-face {
  font-family: 'SN Pro';
  src: url('/fonts/sn-pro/sn-pro-latin-400-normal.woff2') format('woff2');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}
@font-face {
  font-family: 'SN Pro';
  src: url('/fonts/sn-pro/sn-pro-latin-500-normal.woff2') format('woff2');
  font-weight: 500;
  font-style: normal;
  font-display: swap;
}
@font-face {
  font-family: 'SN Pro';
  src: url('/fonts/sn-pro/sn-pro-latin-600-normal.woff2') format('woff2');
  font-weight: 600;
  font-style: normal;
  font-display: swap;
}
@font-face {
  font-family: 'SN Pro';
  src: url('/fonts/sn-pro/sn-pro-latin-700-normal.woff2') format('woff2');
  font-weight: 700;
  font-style: normal;
  font-display: swap;
}
```

(The Google Fonts `@import url(...)` line and the GC Bumble + Fraunces-italic faces are deleted now. If any component still references a removed family, its fallback stack takes over until that page's phase.)

### P1.2 `src/styles/variables.css` — replace entire file with:

```css
:root {
  --glass-blur: 16px;
  --noise-opacity: 0.03;

  /* ————— SPEC-TRUM palette ————— */
  --cloud: #F1EEE7;            /* canvas: grey-warm sky before rain */
  --cloud-dim: #E9E5DB;        /* soft surface on cloud */
  --nightfall: #0A0F1A;        /* deep navy interruption */
  --nightfall-soft: #101624;   /* elevated surface on nightfall */
  --beam: #F27830;             /* locked orange, used as light */
  --beam-active: #BD5E25;
  --honey: #FFB200;            /* the sun's edge; rarer than beam */
  --dusk-ink: #F2EFE8;         /* text on nightfall */
  --dusk-body: #B8B3A8;        /* secondary text on nightfall */

  /* Spectrum — ONLY for TEAMUP split moments */
  --spec-t: #4A8ECF;
  --spec-e: #FFB200;
  --spec-a: #F27830;
  --spec-m: #5DB8A6;
  --spec-u: #5DB872;

  /* ————— legacy names, re-pointed (old pages keep working) ————— */
  --primary: #F27830;
  --primary-active: #BD5E25;
  --primary-light: #F69A64;
  --primary-disabled: #E1DCD1;
  --ink: #141413;
  --body: #3D3D3A;
  --body-strong: #252523;
  --muted: #6E6A61;
  --muted-soft: #8E8B82;
  --hairline: #E1DCD1;
  --hairline-soft: #E7E3D9;
  --canvas: #F1EEE7;
  --surface-soft: #ECE8DF;
  --surface-card: #E7E2D6;
  --surface-cream-strong: #E0DACB;
  --surface-dark: #101624;
  --surface-dark-elevated: #171E30;
  --surface-dark-soft: #0D1320;
  --navy: #0A0F1A;
  --navy-blob: #1A2B4C;
  --on-primary: #ffffff;
  --on-dark: #F2EFE8;
  --on-dark-soft: #B8B3A8;
  --accent-teal: #5DB8A6;
  --accent-amber: #FFB200;
  --info: #4A8ECF;
  --success: #5DB872;
  --warning: #D4A017;
  --error: #FF372D;
  --shadow-soft: 0 1px 3px rgba(20, 20, 19, 0.08);

  /* ————— type ————— */
  --font-grotesk: 'Bricolage Grotesque Variable', 'Bricolage Grotesque', system-ui, sans-serif;
  --font-sans: 'General Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  --font-mono: 'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, monospace;
  --font-serif-note: 'Fraunces', Georgia, serif;
  /* legacy aliases */
  --font-display: var(--font-grotesk);
  --font-body: var(--font-sans);
  --font-code: var(--font-mono);
  --font-registration: 'SN Pro', var(--font-sans);
  --font-championship: var(--font-grotesk);
  --font-welcome: var(--font-sans);
  --font-display-hero: var(--font-serif-note);
  --font-body-hero: var(--font-sans);

  /* ————— SPEC-TRUM type scale (ratio 1.414 display / 1.25 UI) ————— */
  --fs-d1: clamp(44px, 10.14vw + 6px, 152px);      /* hero display */
  --fs-d2: clamp(36px, 5.63vw + 14.9px, 96px);     /* section display */
  --fs-d3: clamp(28px, 3.38vw + 15.3px, 64px);     /* sub display */
  --fs-title: clamp(22px, 1.31vw + 17.1px, 36px);  /* row titles */
  --fs-body-lg: clamp(18px, 0.19vw + 17.3px, 20px);
  --fs-body-std: 17px;
  --fs-micro: 11px;
  --fs-micro-lg: 12px;
  --lh-display: 0.92;
  --lh-body: 1.6;
  --ls-display: -0.03em;
  --ls-mono: 0.12em;

  /* legacy fluid scale — still consumed by old pages; deleted in P6 */
  --fs-eyebrow: 0.8125rem;
  --fs-h1: clamp(2.25rem, 3.4vw + 1rem, 3.75rem);
  --fs-quote: clamp(1.5rem, 1.6vw + 1rem, 2.125rem);
  --fs-body: 1.0625rem;
  --fs-display-2xl: clamp(3rem, 1.4rem + 7vw, 7.5rem);
  --fs-display-xl: clamp(2.5rem, 1.4rem + 5vw, 5.75rem);
  --fs-display-lg: clamp(2.125rem, 1.4rem + 3.2vw, 4rem);
  --fs-display-md: clamp(1.75rem, 1.35rem + 1.8vw, 2.75rem);
  --fs-display-sm: clamp(1.375rem, 1.2rem + 0.8vw, 1.75rem);

  /* ————— space ————— */
  --space-0: 4px;
  --space-1: 8px;
  --space-2: 16px;
  --space-3: 24px;
  --space-4: 32px;
  --space-5: 48px;
  --space-6: 72px;
  --space-7: 96px;
  --space-8: 128px;
  --space-9: 160px;
  --space-10: 200px;
  --space-11: 240px;
  --section-pad: clamp(96px, 9.77vw + 59.4px, 200px);
  --gutter: 32px;
  --margin-x: 6vw;
  --radius-pill: 999px;
  --radius-card: 16px;

  /* ————— motion ————— */
  --ease-out: cubic-bezier(0.16, 1, 0.3, 1);
  --ease-inout: cubic-bezier(0.83, 0, 0.17, 1);
  --dur-micro: 300ms;
  --dur-reveal: 1000ms;
  --dur-page: 1300ms;

  /* ————— z scale ————— */
  --z-gl: 3;
  --z-content: 10;
  --z-nav: 50;
  --z-menu: 70;
  --z-intro: 80;
  --z-grain: 90;
}
```

Notes: token `--honey` (never `--gold` — `variables.test.ts` forbids that literal). Legacy display-scale block and legacy aliases are removed in P6 together with a rewrite of `variables.test.ts` (P6.4). Keep `--glass-blur`/`--noise-opacity` lines exactly (tests assert them).

### P1.3 `src/styles/theme.css` — replace the `@theme` color/font block values

Keep the file structure and animation lines; change only these values: `--color-canvas: #F1EEE7; --color-ink: #141413; --color-hairline: #E1DCD1; --color-surface-soft: #ECE8DF; --color-surface-card: #E7E2D6; --color-secondary: #E7E2D6; --color-on-dark: #F2EFE8; --color-muted: #6E6A61;` and the fonts: `--font-display: 'Bricolage Grotesque Variable', sans-serif; --font-body: 'General Sans', sans-serif; --font-hero: 'Bricolage Grotesque Variable', sans-serif; --font-registration: 'SN Pro', sans-serif; --font-championship: 'Bricolage Grotesque Variable', sans-serif; --font-welcome: 'General Sans', sans-serif;`. Leave `--color-navy`, `--color-amber*`, `--color-teal`, surface-dark values as they are.

### P1.4 `src/app.html` — replace entire file with:

```html
<!doctype html>
<html lang="en">
	<head>
		<meta charset="utf-8" />
		<link rel="icon" href="%sveltekit.assets%/logo.svg" type="image/svg+xml" />
		<link rel="apple-touch-icon" href="%sveltekit.assets%/apple-icon.png" />
		<meta name="viewport" content="width=device-width, initial-scale=1" />
		<meta name="theme-color" content="#F1EEE7" />
		<meta name="format-detection" content="telephone=no" />
		<link
			rel="preload"
			as="font"
			type="font/woff2"
			href="%sveltekit.assets%/fonts/general-sans/GeneralSans-Variable.woff2"
			crossorigin
		/>
		<script>
			(function () {
				try {
					if (localStorage.getItem('beee_theme') === 'dark') {
						document.documentElement.classList.add('dark');
					}
				} catch (e) {}
			})();
		</script>
		%sveltekit.head%
	</head>
	<body data-sveltekit-preload-data="hover">
		<div style="display: contents">%sveltekit.body%</div>
	</body>
</html>
```

(This removes the forced dark class, the duplicated preloads/theme-color, and the Fraunces/SN Pro preloads. Default theme is light — the direction's light site. Bricolage loads via the Vite-bundled Fontsource CSS; no manual preload for it.)

### P1.5 `src/styles/dark-mode.css` — replace entire file with (nightfall-first dark theme):

```css
.dark {
  --cloud: #0B101B;
  --cloud-dim: #111725;
  --canvas: #0B101B;
  --color-canvas: #0B101B;
  --ink: #F2EFE8;
  --color-ink: #F2EFE8;
  --body: #B8B3A8;
  --color-body: #B8B3A8;
  --body-strong: #E5E1D6;
  --color-body-strong: #E5E1D6;
  --muted: #8B867B;
  --color-muted: #8B867B;
  --muted-soft: #6E6A61;
  --hairline: #1D2432;
  --color-hairline: #1D2432;
  --hairline-soft: #171E2B;
  --surface-soft: #111725;
  --color-surface-soft: #111725;
  --surface-card: #151C2B;
  --color-surface-card: #151C2B;
  --color-secondary: #151C2B;
  --surface-cream-strong: #1A2233;
  --color-surface-cream-strong: #1A2233;
  --on-dark: #F2EFE8;
  --color-on-dark: #F2EFE8;
  --on-dark-soft: #B8B3A8;
  --surface-dark-elevated: #1A2233;
  --shadow-soft: 0 1px 3px rgba(0, 0, 0, 0.5);
}
```

### P1.6 New file `src/styles/system.css` + import

Add `@import 'styles/system.css';` as the **last** import line in `src/app.css`, and change the scrollbar colors in `app.css`: thumb `#F27830` stays (brand-locked), track stays transparent. Contents of `system.css`:

```css
/* SPEC-TRUM primitives. Every revamped page composes from these. */

.rv-wrap { width: min(1400px, 100% - 2 * var(--margin-x)); margin-inline: auto; }
.rv-grid { display: grid; grid-template-columns: repeat(12, 1fr); column-gap: var(--gutter); }
@media (--sm-down) { .rv-grid { column-gap: 16px; } }

.rv-section { position: relative; padding-block: var(--section-pad); }
.rv-section--flush { padding-block: 0; }
.rv-field-cloud { background: var(--cloud); color: var(--ink); }
.rv-field-night { background: var(--nightfall); color: var(--dusk-ink); }

.rv-d1, .rv-d2, .rv-d3 {
  font-family: var(--font-grotesk);
  font-weight: 640;
  line-height: var(--lh-display);
  letter-spacing: var(--ls-display);
  text-wrap: balance;
  margin: 0;
}
.rv-d1 { font-size: var(--fs-d1); }
.rv-d2 { font-size: var(--fs-d2); }
.rv-d3 { font-size: var(--fs-d3); font-weight: 600; letter-spacing: -0.02em; }
.rv-title { font-family: var(--font-grotesk); font-weight: 600; font-size: var(--fs-title); line-height: 1.15; letter-spacing: -0.015em; margin: 0; }
.rv-note { font-family: var(--font-serif-note); font-weight: 540; } /* the rare serif voice — max 2 uses per page */
.rv-body { font-family: var(--font-sans); font-size: var(--fs-body-std); line-height: var(--lh-body); max-width: 66ch; }
.rv-body-lg { font-family: var(--font-sans); font-size: var(--fs-body-lg); line-height: 1.55; max-width: 52ch; }
.rv-micro {
  font-family: var(--font-mono);
  font-size: var(--fs-micro);
  font-weight: 500;
  letter-spacing: var(--ls-mono);
  text-transform: uppercase;
  font-variant-numeric: tabular-nums;
}
.rv-num { font-variant-numeric: tabular-nums; }

/* Masked line reveal targets (revealLines action wraps lines itself) */
.rv-reveal-line { display: block; overflow: hidden; }

/* The felted press — every interactive element lands like a piece on a board */
.felt { transition: transform var(--dur-micro) var(--ease-out); }
@media (hover: hover) { .felt:hover { transform: translateY(-2px); } }
.felt:active { transform: translateY(1px) scale(0.985); transition-duration: 120ms; }
@media (prefers-reduced-motion: reduce) { .felt, .felt:hover, .felt:active { transform: none; } }

/* Buttons */
.rv-btn {
  display: inline-flex; align-items: center; justify-content: center; gap: 10px;
  font-family: var(--font-sans); font-weight: 600; font-size: 16px;
  border-radius: var(--radius-pill); padding: 16px 32px; min-height: 52px;
  text-decoration: none; border: 1px solid transparent; cursor: pointer;
}
.rv-btn--beam {
  background: linear-gradient(140deg, var(--honey) -40%, var(--beam) 60%);
  color: #ffffff;
  box-shadow: 0 8px 28px -10px rgba(242, 120, 48, 0.55);
}
@media (hover: hover) { .rv-btn--beam:hover { box-shadow: 0 12px 36px -10px rgba(242, 120, 48, 0.7); } }
.rv-btn--ghost { background: transparent; color: currentColor; border-color: color-mix(in srgb, currentColor 28%, transparent); }
@media (hover: hover) { .rv-btn--ghost:hover { border-color: currentColor; } }
.rv-btn--big { padding: 20px 44px; font-size: 18px; min-height: 60px; }

/* Underline wipe for text links (enters left, exits right) */
.rv-link { position: relative; text-decoration: none; }
.rv-link::after {
  content: ''; position: absolute; left: 0; right: 0; bottom: -3px; height: 1px;
  background: currentColor; transform: scaleX(0); transform-origin: right;
  transition: transform var(--dur-micro) var(--ease-out);
}
@media (hover: hover) { .rv-link:hover::after { transform: scaleX(1); transform-origin: left; } }

/* Hairline rows for indexed editorial lists */
.rv-row { display: grid; grid-template-columns: 64px 1fr auto; align-items: baseline; gap: var(--gutter); padding-block: var(--space-4); border-top: 1px solid var(--hairline); }
.rv-field-night .rv-row { border-top-color: color-mix(in srgb, var(--dusk-ink) 14%, transparent); }
.rv-row:last-child { border-bottom: 1px solid var(--hairline); }
.rv-field-night .rv-row:last-child { border-bottom-color: color-mix(in srgb, var(--dusk-ink) 14%, transparent); }
@media (--sm-down) { .rv-row { grid-template-columns: 40px 1fr; } .rv-row > :nth-child(3) { grid-column: 2; } }

/* Image frame with entry scale (used with revealImage action) */
.rv-frame { overflow: hidden; border-radius: var(--radius-card); }
.rv-frame img { width: 100%; height: 100%; object-fit: cover; }

/* Static beam fallback (no WebGL / reduced motion) */
.rv-beam-fallback { position: absolute; inset: 0; pointer-events: none; background: linear-gradient(102deg, transparent 30%, rgba(255, 178, 0, 0.10) 45%, rgba(242, 120, 48, 0.14) 50%, transparent 68%); }

/* Focus visibility on nightfall */
.rv-field-night :focus-visible { outline-color: var(--honey); }
```

### P1.7 `src/styles/base.css` edits

In `base.css`: (a) change `html { scroll-behavior: smooth; }` to `scroll-behavior: auto;` (Lenis owns scrolling; keep smooth under reduced-motion? No — Lenis disabled there, native jump is correct). (b) Replace the `body` background declaration with `background: var(--canvas);` (kill the cream gradient). (c) Add at the end:

```css
::selection { background: color-mix(in srgb, var(--beam) 30%, transparent); }
html.lenis, html.lenis body { height: auto; }
.lenis.lenis-smooth { scroll-behavior: auto !important; }
```

Leave everything else in `base.css` untouched (skip-link, focus-visible, reduced-motion block, noise class).

### P1.8 Motion foundation — new files (full contents)

`src/lib/motion/constants.ts`:

```ts
export const EASE_OUT = 'expo.out';
export const EASE_INOUT = 'power4.inOut';
export const DUR = { micro: 0.3, reveal: 1.0, page: 1.3 } as const;
export const STAGGER = 0.07;
export const REDUCED = () =>
	typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
```

`src/lib/motion/smooth-scroll.ts`:

```ts
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { REDUCED } from './constants';

let lenis: Lenis | null = null;

export function initSmoothScroll(): () => void {
	if (REDUCED()) return () => {};
	gsap.registerPlugin(ScrollTrigger);
	lenis = new Lenis({ lerp: 0.09, smoothWheel: true, syncTouch: false, touchMultiplier: 1.5 });
	lenis.on('scroll', ScrollTrigger.update);
	const raf = (time: number) => lenis?.raf(time * 1000);
	gsap.ticker.add(raf);
	gsap.ticker.lagSmoothing(0);
	return () => {
		gsap.ticker.remove(raf);
		lenis?.destroy();
		lenis = null;
	};
}

export const getLenis = () => lenis;
export const stopScroll = () => lenis?.stop();
export const startScroll = () => lenis?.start();
```

`src/lib/motion/reveal.ts` — Svelte actions, full file:

```ts
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitText from 'gsap/SplitText';
import { EASE_OUT, DUR, STAGGER, REDUCED } from './constants';

gsap.registerPlugin(ScrollTrigger, SplitText);

/** Headline lines rise out of overflow-hidden slots. */
export function revealLines(node: HTMLElement, opts?: { delay?: number; start?: string }) {
	if (REDUCED()) return;
	const split = new SplitText(node, { type: 'lines', linesClass: 'rv-reveal-line-inner' });
	split.lines.forEach((l) => {
		const wrap = document.createElement('span');
		wrap.className = 'rv-reveal-line';
		l.parentNode?.insertBefore(wrap, l);
		wrap.appendChild(l);
	});
	const tween = gsap.from(split.lines, {
		yPercent: 110,
		duration: DUR.reveal,
		ease: EASE_OUT,
		stagger: STAGGER,
		delay: opts?.delay ?? 0,
		scrollTrigger: { trigger: node, start: opts?.start ?? 'top 85%', once: true }
	});
	return { destroy: () => { tween.scrollTrigger?.kill(); tween.kill(); split.revert(); } };
}

/** Block fades up 24px. */
export function revealFade(node: HTMLElement, opts?: { delay?: number; y?: number }) {
	if (REDUCED()) return;
	const tween = gsap.from(node, {
		y: opts?.y ?? 24,
		opacity: 0,
		duration: DUR.reveal * 0.8,
		ease: EASE_OUT,
		delay: opts?.delay ?? 0,
		scrollTrigger: { trigger: node, start: 'top 85%', once: true }
	});
	return { destroy: () => { tween.scrollTrigger?.kill(); tween.kill(); } };
}

/** Direct children cascade with the house stagger. */
export function revealChildren(node: HTMLElement, opts?: { y?: number }) {
	if (REDUCED()) return;
	const kids = Array.from(node.children);
	const tween = gsap.from(kids, {
		y: opts?.y ?? 24,
		opacity: 0,
		duration: DUR.reveal * 0.8,
		ease: EASE_OUT,
		stagger: STAGGER,
		scrollTrigger: { trigger: node, start: 'top 85%', once: true }
	});
	return { destroy: () => { tween.scrollTrigger?.kill(); tween.kill(); } };
}

/** Image settles from scale 1.12 inside an overflow-hidden .rv-frame. */
export function revealImage(node: HTMLElement) {
	if (REDUCED()) return;
	const img = node.querySelector('img');
	if (!img) return;
	const tween = gsap.from(img, {
		scale: 1.12,
		duration: DUR.reveal * 1.2,
		ease: EASE_OUT,
		scrollTrigger: { trigger: node, start: 'top 85%', once: true }
	});
	return { destroy: () => { tween.scrollTrigger?.kill(); tween.kill(); } };
}
```

### P1.9 Grain — new `src/lib/components/system/Grain.svelte`

```svelte
<div class="grain" aria-hidden="true"></div>

<style>
  .grain {
    position: fixed; inset: -100px; z-index: var(--z-grain);
    pointer-events: none; opacity: 0.04;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
    background-repeat: repeat; background-size: 256px 256px;
  }
  @media (prefers-reduced-motion: no-preference) {
    .grain { animation: grain-shift 0.9s steps(6) infinite; }
  }
  @keyframes grain-shift {
    0% { transform: translate(0, 0); }
    16% { transform: translate(-24px, 16px); }
    33% { transform: translate(16px, -24px); }
    50% { transform: translate(-16px, -16px); }
    66% { transform: translate(24px, 8px); }
    83% { transform: translate(-8px, 24px); }
    100% { transform: translate(0, 0); }
  }
</style>
```

### P1.10 Cursor — replace `src/components/Cursor.svelte` visual (keep the existing mount/teardown/lerp logic exactly; lerp stays 0.18, touch/reduced-motion early-return stays). New markup/style: a single dot, no ring:

```css
.cursor {
  position: fixed; top: 0; left: 0; z-index: 99999;
  width: 10px; height: 10px; border-radius: 999px;
  background: #F2EFE8; mix-blend-mode: difference;
  pointer-events: none;
  transition: transform 0s, scale var(--dur-micro) var(--ease-out);
}
.cursor-hover { scale: 2.6; }
```

(Offset in JS becomes `-5` instead of `-12` for both axes. Everything else identical.)

### P1.11 Theme toggle — new `src/lib/components/system/ThemeToggle.svelte`

```svelte
<script lang="ts">
  import { onMount } from 'svelte';
  let dark = $state(false);
  onMount(() => { dark = document.documentElement.classList.contains('dark'); });
  function toggle() {
    dark = !dark;
    document.documentElement.classList.toggle('dark', dark);
    try { localStorage.setItem('beee_theme', dark ? 'dark' : 'light'); } catch (e) {}
  }
</script>

<button class="rv-micro theme-toggle felt" onclick={toggle} aria-pressed={dark}>
  {dark ? 'LIGHTS ON' : 'LIGHTS OFF'}
</button>

<style>
  .theme-toggle { background: none; border: 1px solid color-mix(in srgb, currentColor 25%, transparent); border-radius: var(--radius-pill); padding: 8px 16px; color: inherit; }
</style>
```

Rendered in the Footer bottom row (P1.13). Nowhere else.

### P1.12 Nav — rewrite `src/lib/components/championship/ChampNav.svelte`

Keep 100% of the existing script logic (user derivation, `logout()`, `open`, `scrolled`, active path). Replace template + styles:

- Bar: `position: fixed; top: 0; left: 0; right: 0; z-index: var(--z-nav); height: 72px;` (56px when `.scrolled`), horizontal padding `var(--margin-x)`. Default background transparent; `.scrolled` gets `background: color-mix(in srgb, var(--canvas) 82%, transparent); backdrop-filter: blur(12px); border-bottom: 1px solid var(--hairline);`. No pill.
- Left: `logo.svg` at 26px height + wordmark `BEEE` in `var(--font-grotesk)` 700, 17px, letter-spacing −0.01em.
- Center (≥1024px only): links `About · e4 · TEAMUP · Taskify · Partners · FAQ` as `.rv-micro .rv-link` items, gap 32px. Active link gets a 4px `var(--beam)` dot before it (pseudo-element), not a different color.
- Right: if no user → `<a href="/register" class="rv-btn rv-btn--beam felt" style="min-height:44px;padding:12px 24px">Register</a>`. If user → `Dashboard` (`.rv-micro .rv-link`) + `Log out` button (`.rv-micro`, opacity .7, hover 1). Same conditional logic as now.
- Mobile (<1024px): burger button 44×44 (two 18px lines, becomes X via rotate 45°/−45°, 300ms `var(--ease-out)`). Menu: fixed full-screen overlay `z-index: var(--z-menu)`, background `var(--nightfall)`, color `var(--dusk-ink)`, grain via `.noise` class. Links stacked, font `var(--font-grotesk)` 600 at `clamp(36px, 9vw, 64px)`, line-height 1.1, each with mono index prefix `01`–`06` in `var(--honey)` at `--fs-micro`. Entrance: menu fades in 300ms; links masked-rise 600ms stagger 70ms (gsap timeline in component, reduced-motion → instant). Below links: `info@beeeproject.com` and `+234 802 092 0872` in `.rv-micro`, and Register button full-width `rv-btn--beam`. Body scroll locked while open (`stopScroll()` + `overflow:hidden` on body; restore on close). Esc closes. Focus is trapped in the overlay while open (loop Tab within it; return focus to burger on close).
- On `/` only, the nav mounts hidden (`opacity: 0`) and fades in 600ms `var(--ease-out)` when it receives the `intro:done` window event (or immediately if `sessionStorage.beee_intro` is set). Implement by listening in `onMount`; on other routes it is always visible.
- Update `src/lib/components/championship/ChampNav.test.ts` only if it asserts removed markup (run `pnpm test`, adjust selectors to the new structure, keep the behavioural assertions: links present, register CTA when logged out, dashboard when logged in).

### P1.13 Footer — rewrite `src/lib/components/home/Footer.svelte`

Keep the `links` filtering script pattern. New structure, field `rv-field-night` + `.noise`:

1. Top block: `.rv-d3` line, text: `Be Everything Excellent Every Day.` with the word `Excellent` wrapped in `<span style="color: var(--honey)">`.
2. Grid (3 cols ≥768, stacked below): col 1 — `.rv-micro` label `THE CHAMPIONSHIP` then `.rv-body` in `--dusk-body`: `BEEE Spectacular Chess Championship, Abuja 2026. More than a chess championship.`; col 2 — `.rv-micro` label `THE MAP` then link list (`Home, Register, e4, TEAMUP, Taskify, About, FAQ, Partners`) as `.rv-link` 15px sans; col 3 — `.rv-micro` label `SIGNAL` then `info@beeeproject.com` (mailto), `+234 802 092 0872`, `@thebeeeproject` → `https://instagram.com/thebeeeproject`, `beeeproject` → `https://x.com/beeeproject`.
3. Bottom row (hairline top, `color-mix` 14% dusk-ink): `© 2026 BEEE®` `.rv-micro` · `Privacy` · `Terms` links · `<ThemeToggle />` right-aligned.
4. Spacing: `padding-block: var(--space-8) var(--space-5)`.
- Update `Footer.test.ts` selectors likewise if needed.

### P1.14 Layout — edit `src/routes/+layout.svelte`

Add imports and init: `import Grain from '$lib/components/system/Grain.svelte';` and

```ts
import { onMount } from 'svelte';
import { initSmoothScroll } from '$lib/motion/smooth-scroll';
onMount(() => initSmoothScroll());
```

Render `<Grain />` immediately after `<Cursor />`. Everything else in the layout stays byte-identical (SEO block untouched).

Definition of Done P1: `pnpm check` clean; `pnpm test` green (with any nav/footer test selector updates); `pnpm build` succeeds; `pnpm dev` shows: dimmer cloud canvas, new fonts rendering (Bricolage headings visible on old pages via re-pointed legacy vars), grain overlay, dot cursor, new nav + footer on every route, theme toggle persists across reloads, smooth heavy scroll active, native scroll under reduced-motion.

---

## P2 — Homepage

### P2.0 Files

Create `src/lib/components/home2/` containing: `Intro.svelte`, `HeroWalk.svelte`, `Manifesto.svelte`, `JourneyMap.svelte`, `KnightInterlude.svelte`, `PrismSplit.svelte`, `Platforms.svelte`, `Philosophy.svelte`, `Awards.svelte`, `Finale.svelte`, `HomeCanvas.svelte`, `JourneyRail.svelte`. Create `src/lib/gl/` containing: `index.ts`, `dust.ts`, `beams.ts`, `knight.ts`, `store.ts`. Replace the entire contents of `src/routes/+page.svelte` with the new composition (keep the existing `<svelte:head>` Event JSON-LD block, changing only `"location"."name"` from `"Abuja"` to `"National Stadium, Abuja"` and `"image"` unchanged). Order in the page:

```
<Intro /> <HomeCanvas /> <JourneyRail />
<HeroWalk /> <Manifesto /> <JourneyMap /> <KnightInterlude />
<PrismSplit /> <Platforms /> <Philosophy /> <Awards /> <Finale />
```

Old `home/` and `championship/ChampHero*` components stop being imported by `/` (deleted in P6). Three.js must be loaded **only** via `const THREE = await import('three')` inside `HomeCanvas` `onMount` (keeps it out of the shared bundle).

### P2.1 The WebGL layer (`src/lib/gl/`)

`store.ts`:

```ts
import { writable } from 'svelte/store';
export type GlState = { section: 'hero'|'manifesto'|'journey'|'interlude'|'split'|'ambient'|'finale'; progress: number };
export const glState = writable<GlState>({ section: 'hero', progress: 0 });
```

`index.ts` exports `createGl(canvas: HTMLCanvasElement)` which: feature-tests (`canvas.getContext('webgl2') || canvas.getContext('webgl')` in try/catch), returns `null` if unavailable OR `REDUCED()` OR `navigator.connection?.saveData === true`. Otherwise dynamic-imports `three`, builds: `WebGLRenderer({ canvas, alpha: true, antialias: false, powerPreference: 'high-performance' })`, DPR capped `Math.min(devicePixelRatio, matchMedia('(max-width: 767px)').matches ? 1.5 : 2)`, `OrthographicCamera(-1, 1, 1, -1, 0, 10)`, scene with the beams mesh group and the dust points; a rAF loop that pauses on `document.hidden` (visibilitychange) and stops entirely when the page unmounts (`dispose()` API: cancel rAF, dispose geometries/materials/renderer). Uniform update API: `setState(section, progress)` (called from a `glState.subscribe`), plus `resize()` wired to a `ResizeObserver` on the canvas.

`dust.ts` — particle field. Count: 6000 (≥768px) / 2200 (<768px). BufferGeometry with `aSeed` (random 0–1 per particle) and `aTarget` (vec2, knight target, default 0,0) attributes. `ShaderMaterial`, `transparent: true`, `depthWrite: false`, `blending: AdditiveBlending`. Uniforms: `uTime`, `uMorph` (0–1 knight formation), `uBeamX` (−1..1), `uBeamAngle` (radians), `uBeamWidth` (0–1), `uIntensity` (0–1), `uAspect`. Shaders verbatim:

```glsl
// vertex
attribute float aSeed;
attribute vec2 aTarget;
uniform float uTime, uMorph, uAspect;
varying float vAlpha;
float hash(float n) { return fract(sin(n) * 43758.5453123); }
void main() {
  float t = uTime * 0.05;
  vec2 drift = vec2(
    sin(t + aSeed * 6.2831) * 0.35 + sin(t * 0.7 + aSeed * 12.566) * 0.15,
    cos(t * 0.8 + aSeed * 6.2831) * 0.35 + sin(t * 1.3 + aSeed * 9.42) * 0.1
  );
  vec2 field = vec2(hash(aSeed * 7.0) * 2.0 - 1.0, hash(aSeed * 13.0) * 2.0 - 1.0) + drift * 0.4;
  vec2 pos = mix(field, aTarget, smoothstep(0.0, 1.0, uMorph));
  pos.x /= uAspect;
  gl_Position = vec4(pos, 0.0, 1.0);
  gl_PointSize = 1.5 + hash(aSeed * 3.0) * 2.0;
  vAlpha = 0.25 + 0.75 * hash(aSeed * 5.0);
}
```

```glsl
// fragment
uniform float uIntensity, uBeamX, uBeamAngle, uBeamWidth;
varying float vAlpha;
void main() {
  vec2 uv = gl_FragCoord.xy;
  float d = length(gl_PointCoord - 0.5);
  if (d > 0.5) discard;
  float soft = smoothstep(0.5, 0.1, d);
  gl_FragColor = vec4(1.0, 0.82, 0.55, soft * vAlpha * (0.10 + 0.45 * uIntensity));
}
```

`beams.ts` — two full-screen planes (`PlaneGeometry(2,2)`), `ShaderMaterial` additive, uniforms `uTime, uX (−1..1 landing x), uAngle (radians), uWidth (0.05–0.4), uIntensity (0–1), uColor (vec3), uAspect`. Fragment (vertex is pass-through `gl_Position = vec4(position.xy, 0.0, 1.0); vUv = uv;`):

```glsl
uniform float uTime, uX, uAngle, uWidth, uIntensity, uAspect;
uniform vec3 uColor;
varying vec2 vUv;
void main() {
  vec2 p = vUv * 2.0 - 1.0;
  p.x *= uAspect;
  vec2 dir = vec2(sin(uAngle), -cos(uAngle));
  float along = dot(p - vec2(uX, 1.0), dir);
  float across = abs(dot(p - vec2(uX, 1.0), vec2(dir.y, -dir.x)));
  float beam = smoothstep(uWidth, 0.0, across) * smoothstep(-2.4, -0.2, -along);
  float flicker = 0.96 + 0.04 * sin(uTime * 1.7 + along * 3.0);
  float fade = smoothstep(1.15, 0.1, vUv.y) * 0.35 + 0.65;
  gl_FragColor = vec4(uColor, beam * flicker * fade * uIntensity * 0.4);
}
```

Beam A color `vec3(0.949, 0.471, 0.188)` (beam orange), Beam B color `vec3(1.0, 0.698, 0.0)` (honey), B always at `uIntensity * 0.5`, angle offset +0.06 rad, x offset +0.08. During `split`, beams A/B are replaced by five thin beams (`uWidth 0.03`) colored (sRGB → linear approximation acceptable): T `(0.29,0.56,0.81)`, E `(1.0,0.70,0.0)`, A `(0.95,0.47,0.19)`, M `(0.36,0.72,0.65)`, U `(0.36,0.72,0.45)`, angles `[-0.42,-0.21,0,0.21,0.42]` rad, intensity ramping with progress (see table).

`knight.ts` — `loadKnightTargets(): Promise<Float32Array>`: load `/gl/knight-mask.png` into an offscreen 160×160 canvas, `getImageData`, collect pixels with alpha>128 and luminance>128, map to clip space x ∈ [−0.45, 0.45], y ∈ [−0.5, 0.5] (image y flipped), shuffle with seeded RNG (mulberry32, seed 42), take first `count` targets (repeat cyclically if fewer). Assign into `aTarget`.

State → uniform mapping (implemented in `index.ts` `setState`; lerp every uniform toward its target with factor 0.06 per frame — the felted mass):

| section | uX | uAngle | uWidth | uIntensity | uMorph | notes |
|---|---|---|---|---|---|---|
| hero | 0.25 | 0.32 | 0.30 | 0.9 → 0.6 (×(1−0.33·progress)) | 0 | |
| manifesto | −0.3 | 0.20 | 0.12 | 0.5 | 0 | |
| journey | −0.6 + 1.2·progress | 0.10 | 0.10 | 0.55 | 0 | beam walks the stages |
| interlude | 0 | 0 | 0.34 | 0.8 | see below | morph = `smoothstep(0.25,0.45,p) − smoothstep(0.75,0.95,p)` |
| split | 0 | 0 | — | five beams: each `clamp((p−0.35−i*0.06)/0.2, 0, 1)` | 0 | hex flash at p≈0.35 (beam A intensity spike 1.2→0 over 300ms) |
| ambient (platforms/philosophy/awards) | 0.4 | 0.26 | 0.22 | 0.15 | 0 | |
| finale | 0 | 0 | 0.16 | 1.0 | 0 | color lerps fully to beam orange |

`HomeCanvas.svelte`: renders `<canvas class="gl" aria-hidden="true">` with `position: fixed; inset: 0; z-index: var(--z-gl); pointer-events: none; mix-blend-mode: screen;`. `onMount`: `const gl = await createGl(canvas)`; if `null`, sets a module-level exported store `glActive = writable(false)` → sections render `.rv-beam-fallback` divs where specified. Subscribes to `glState`, forwards to `gl.setState`. `onDestroy`: `gl?.dispose()`. Each homepage section registers one `ScrollTrigger` (`start: 'top bottom', end: 'bottom top', onUpdate: self => glState.set({ section: X, progress: self.progress })`) — sections later in the DOM win naturally as they scroll through.

### P2.2 `Intro.svelte` — the preloader overture

Behaviour: renders only when `sessionStorage.getItem('beee_intro') !== '1'`. On mount: `stopScroll()`, set `sessionStorage.beee_intro = '1'`. Full-screen overlay `z-index: var(--z-intro)`, background `var(--cloud)`, color `var(--ink)`, `.noise`. Any `pointerdown` or `keydown` skips (jump timeline to end). On complete: dispatch `window.dispatchEvent(new Event('intro:done'))`, `startScroll()`, remove from DOM (`{#if}`). Reduced-motion variant: show WIN + logo static for 400ms, fade 300ms, done.

Markup (centered flex column): hexagon SVG (regular hexagon outline, stroke `var(--ink)`, stroke-width 1.5, size 96px, `opacity 0` initially) positioned 12vw left of center (absolute within a relative row); the word stack: base `<span class="rv-d1" style="font-size: clamp(96px, 22vw, 320px); font-weight: 700">WIN</span>` plus five absolutely-stacked aria-hidden clones colored `--spec-t/e/a/m/u`, `opacity: 0`; beam line `<div class="intro-beam">` (height 2px, width 0, background `linear-gradient(90deg, var(--honey), var(--beam))`, absolute, vertically centered on the hexagon); five thread lines (2px height, width 0, one per spectrum color, transform-origin left, rotated `[-16,-8,0,8,16]` deg around the hexagon center).

GSAP timeline (exact; all eases `expo.out` unless noted):

| time (s) | tween |
|---|---|
| 0.10 | WIN letters: SplitText chars, `yPercent: 110 → 0`, dur 0.9, stagger 0.06, inside overflow-hidden masks |
| 0.90 | hexagon `opacity: 0 → 1`, dur 0.4 |
| 1.00 | beam width `0 → 12vw` (reaching hexagon), dur 0.6, ease `power4.inOut` |
| 1.60 | hexagon flash: fill `var(--honey)` opacity `0 → 0.35 → 0`, dur 0.3 |
| 1.62 | five threads width `0 → 26vw`, dur 0.7, stagger 0.04 |
| 1.62 | five WIN clones: `opacity → 0.8`, `x: 0 → [4,8,12,16,20]px`, `y: 0 → [−14,−7,0,7,14]px`, dur 0.5 |
| 2.30 | entire overlay `yPercent: 0 → −100`, dur 0.8, ease `power4.inOut` |
| 3.10 | done callback |

### P2.3 `HeroWalk.svelte` — `id="hero"`

- Section: `min-height: 100svh`, field night (text `--dusk-ink`), `position: relative; overflow: hidden`.
- Background: `<div class="hero-bg">` absolute inset, `z-index: 0` containing `<img src="/images/rv/hero-stadium.webp" alt="(P0.3 alt)" fetchpriority="high" decoding="async" width="2560" height="1440">` object-cover, plus scrim `linear-gradient(180deg, rgba(10,15,26,0.15) 0%, rgba(10,15,26,0.05) 45%, rgba(10,15,26,0.78) 100%)`. Add `<svelte:head><link rel="preload" as="image" href="/images/rv/hero-stadium.webp" fetchpriority="high"></svelte:head>`.
- Slow dolly (scrub): `gsap.fromTo(img, { scale: 1.08 }, { scale: 1.0, ease: 'none', scrollTrigger: { trigger: section, start: 'top top', end: 'bottom top', scrub: 0.6 } })`. Reduced-motion: none.
- Content (`.rv-wrap`, `z-index: var(--z-content)`, padding-top 28svh, mobile 24svh):
  - Eyebrow `.rv-micro` color `var(--honey)`: desktop text `BEEE SPECTACULAR CHESS CHAMPIONSHIP · ABUJA · OCTOBER 2026`, ≤767px text `ABUJA · OCTOBER 2026` (two spans, media-toggled).
  - H1 `.rv-d1` with `use:revealLines` (delay: intro active ? 0 : 0.2; entrance is triggered after `intro:done` when the intro ran — listen once, else on mount), manual breaks:
    `The stadium<br>is <span class="rv-note">waiting</span><br>for your child.`
  - Sub `.rv-body-lg` `use:revealFade={{ delay: 0.5 }}`, color `--dusk-body`: `Chess, AI coaching, mentorship and a grand finale on the floor of the National Stadium. For ages 10 to 14. No experience needed.`
  - CTA row `use:revealFade={{ delay: 0.65 }}`, gap 16px: `<a href="/register" class="rv-btn rv-btn--beam rv-btn--big felt">Take your seat</a>` and `<button class="rv-btn rv-btn--ghost felt" aria-label="Scroll to the next section">Walk in ↓</button>` (onclick: `getLenis()?.scrollTo('#manifesto')`, fallback `scrollIntoView`).
- Stat rail pinned to section bottom (`position: absolute; bottom: 0; left: 0; right: 0;` border-top `1px solid color-mix(in srgb, var(--dusk-ink) 18%, transparent)`): 4 cells (2×2 grid ≤767px), each `.rv-micro` color `--dusk-body`, padding-block 20px, verbatim: `AGES 10–14` · `₦15,000 ALL-IN` · `COACHING FROM JUL 28` · `FINALE · NATIONAL STADIUM · OCT 2026`. `use:revealChildren`.
- If GL inactive: render `.rv-beam-fallback` inside `.hero-bg`.

### P2.4 `Manifesto.svelte` — `id="manifesto"`, field night, continues hero's darkness (no visible seam: hero scrim bottom color equals `--nightfall`).

- Height 160vh. Sticky inner (`position: sticky; top: 0; height: 100svh;` flex-center).
- Two lines `.rv-d2`, centered, max-width 20ch: L1 `Most championships end with a trophy.` L2 `This one begins with a journey.` L2 initially `opacity 0.15`; scrub timeline over the section (`scrub: 0.5`): L1 `opacity 1 → 0.25` and `y 0 → −24` over first half; L2 `opacity 0.15 → 1`, `y 24 → 0` over second half.
- Below-center caption `.rv-micro` color `--honey`: `MORE THAN A CHESS CHAMPIONSHIP` (revealFade).
- Reduced-motion: both lines full opacity, static, stacked.

### P2.5 `JourneyMap.svelte` — `id="journey"`, field cloud

- `.rv-section`. Header: eyebrow `.rv-micro` color `var(--beam)`: `01–05 · THE ROAD TO OCTOBER`; H2 `.rv-d2` `use:revealLines`: `The road to the stadium.`
- Body grid ≥1024px: left col (span 7) the stage list, right col (span 5) sticky media frame (`position: sticky; top: 15vh; height: 70vh;` `.rv-frame`) crossfading images. <1024px: list only, full width, no frame.
- Stage list: five `.rv-row` items (index / content / date). Each: mono index (`01`…`05`, color `--beam` when active, else `--muted`), `.rv-title` title, `.rv-body` one-liner, right-aligned `.rv-micro` date. Verbatim content:

| # | title | line | date | sticky image |
|---|---|---|---|---|
| 01 | Register | A place is reserved and every platform unlocks the same day. | NOW OPEN | kid-board-01.webp |
| 02 | Train online | Daily coaching with e4 and TEAMUP workshops, from home. | JUL 28 – AUG 29 | hand-piece.webp |
| 03 | Qualify live | Live preliminaries across Abuja. Performance decides who advances. | SEPTEMBER | kid-board-02.webp |
| 04 | The elite stage | Elimination rounds, advanced coaching, finals seats decided. | SEP – OCT | teamup-mentor.webp |
| 05 | The Grand Finale | Staged, filmed and celebrated on the floor of the National Stadium. | OCTOBER | hero-stadium.webp |

- Active state: one `ScrollTrigger` per row (`start: 'top 55%', end: 'bottom 55%'`, `toggleClass` on row + swaps the sticky image with a 600ms opacity crossfade, `expo.out`). Rows `use:revealChildren` on the list container. Images `loading="lazy"` `decoding="async"` with P0.3 alts.

### P2.6 `KnightInterlude.svelte` — `id="interlude"`, field night

- Height 250vh; sticky full-viewport inner, flex-center. DOM contains only: caption `.rv-micro` centered, color `--dusk-body`, letter-spacing 0.2em: `THE GAME IS THE VEHICLE.` — fades in at scrub progress 0.45, out at 0.75 (opacity tweens, scrub 0.5). The canvas dust does the knight (uMorph per P2.1 table).
- GL inactive/reduced-motion fallback: sticky inner shows `/gl/knight-mask.png` as `<img alt="" aria-hidden="true">` height 40vh, `opacity: 0.12; filter: invert(1);` above the caption (static).

### P2.7 `PrismSplit.svelte` — `id="split"`, field night

- Height 300vh; sticky inner. Layout: centered column.
- Eyebrow `.rv-micro` color `--honey`: `TEAMUP™ · TECHNOLOGY · ENTERPRISE · ART · MENTORSHIP · UPSKILL` (mobile: `TEAMUP™`).
- H2 `.rv-d2` two lines: L1 `One game in.` L2 `Five directions out.` L1 reveals at progress 0.05 (masked rise, 1s); L2 at 0.3.
- Center: hexagon SVG (outline, `--dusk-ink` at 40%, 72px) — the prism the beams strike (canvas draws the beams; DOM hexagon is registration point, positioned at viewport center).
- Five labels fan out below (flex row ≥768, column <768), appearing staggered on scrub 0.45→0.8 (each: `opacity 0→1, y 20→0`, 600ms): each label = letter chip (32×32 rounded-8 square, background = its spectrum color, color `#0A0F1A`, font mono 700 14px) + `.rv-title` word + `.rv-micro` one-liner in `--dusk-body`. Verbatim:
  - T — `Technology` — `SOLVE REAL PROBLEMS WITH REAL TOOLS`
  - E — `Enterprise` — `INITIATIVE, INNOVATION, PRACTICAL THINKING`
  - A — `Art` — `CREATIVITY, COMMUNICATION, DESIGN`
  - M — `Mentorship` — `LEARN BESIDE PEOPLE WORTH COPYING`
  - U — `Upskill` — `LEADERSHIP, TEAMWORK, LIFE SKILLS`
- Exit link at progress ≥0.85 (revealFade): `<a href="/teamup" class="rv-micro rv-link" style="color: var(--honey)">EXPLORE TEAMUP →</a>`
- Fallback (no GL): five static 1px rays (CSS, spectrum colors, rotate [−24,−12,0,12,24]deg from the hexagon) behind the labels.

### P2.8 `Platforms.svelte` — `id="platforms"`, field cloud

- `.rv-section .rv-wrap`. Eyebrow `.rv-micro` `--beam`: `THE THREE PLATFORMS`. H2 `.rv-d2` `use:revealLines`: `Registered on day one.` `<br>` `Equipped from day one.`
- Three `.rv-row` rows (`use:revealChildren` on container), grid columns `64px 1fr 1fr auto` ≥1024 (index / name / description / link), collapsing per `.rv-row` mobile rules. Verbatim:

| # | name (`.rv-title`, ™ in 60% size sup) | role line (`.rv-micro`, `--muted`) | description (`.rv-body`) | link |
|---|---|---|---|---|
| 01 | e4™ | THE AI CHESS COACH | Live analysis of every move, answers in voice or text, and puzzles built from your child's own mistakes. | `Meet e4 →` `/e4` |
| 02 | TEAMUP™ | THE DEVELOPMENT PROGRAMME | Technology, Enterprise, Art, Mentorship, Upskill. The journey beyond the board. | `Explore TEAMUP →` `/teamup` |
| 03 | Taskify™ | THE DEVELOPMENT PASSPORT | Every badge, milestone and certificate, recorded where parents can see it. | `Open the passport →` `/taskify` |

- Links are `.rv-link` sans 15px 600. Row hover (hover-capable only): row background `color-mix(in srgb, var(--beam) 4%, transparent)` 300ms.

### P2.9 `Philosophy.svelte` — `id="philosophy"`, field cloud

- Height 130vh, sticky center. Two `.rv-d1` lines (max 14ch, centered, `use:revealLines` with `start: 'top 70%'`): L1 `Chess is not the destination.` L2 `It is the <span class="rv-note">platform</span>.`
- That `rv-note` is this page's second and final serif note (hero "waiting" was the first). No other serif on `/`.

### P2.10 `Awards.svelte` — `id="awards"`, field cloud

- `.rv-section .rv-wrap`. Eyebrow `.rv-micro` `--beam`: `OCTOBER · NATIONAL STADIUM`. H2 `.rv-d2` `use:revealLines`: `Every child leaves with more than they came with.`
- Nine `.rv-row` rows, `use:revealChildren`: index mono / `.rv-title` name / `.rv-body` line. Row 01's index and title in `var(--honey)`. Verbatim:

| # | award | line |
|---|---|---|
| 01 | Championship Trophy | The ultimate honour, lifted under the stadium lights. |
| 02 | Medals & Awards | Top performers honoured across the competitive categories. |
| 03 | Certificates of Participation | Every child who joins the journey is recognised. |
| 04 | Certificates of Achievement | For measurable growth and accomplishment. |
| 05 | TEAMUP™ Excellence Awards | Whole-child excellence, celebrated. |
| 06 | Leadership Recognition Awards | For those who step up and lead by example. |
| 07 | Innovation & Creativity Awards | Original thinking and design, honoured. |
| 08 | Special Merit Awards | Distinctive individual contribution. |
| 09 | School Recognition Awards | Participation and collective spirit, rewarded. |

### P2.11 `Finale.svelte` — `id="finale"`, field night

- `.rv-section`, min-height 100svh, flex-center, text-center, `overflow: hidden`.
- The lit square: absolute, centered behind content, 180×180px (120px mobile), `background: color-mix(in srgb, var(--beam) 18%, transparent); border: 1px solid color-mix(in srgb, var(--beam) 45%, transparent); box-shadow: 0 0 120px 40px rgba(242,120,48,0.18); transform: perspective(600px) rotateX(55deg) translateY(90px);` — revealFade when section enters. (This is one of the two permitted giant-board-square appearances; the other is none. Honeycomb wallpaper remains banned.)
- Eyebrow `.rv-micro` `--honey`: `SLOTS ARE LIMITED · FIRST COMPLETED, FIRST CONFIRMED`
- H2 `.rv-d1` `use:revealLines`: `Make your move.` (this page's single chess pun — budget spent).
- Sub `.rv-body-lg` centered `--dusk-body`: `₦15,000 covers everything: e4, TEAMUP, Taskify, the live rounds and the Grand Finale. Through a partner link it is ₦13,500.`
- CTA `use:revealFade`: `<a href="/register" class="rv-btn rv-btn--beam rv-btn--big felt">Register your child</a>`
- Under-CTA `.rv-micro` `--dusk-body`: `NO PRIOR CHESS EXPERIENCE REQUIRED`

### P2.12 `JourneyRail.svelte` — the map-of-the-journey nav (desktop ≥1024 only; `display: none` below)

Fixed right rail (`right: calc(var(--margin-x) / 2); top: 50%; translate: 0 -50%; z-index: var(--z-nav);`): five items (`01 ARRIVE`→`#hero`, `02 BELIEVE`→`#manifesto`, `03 THE ROAD`→`#journey`, `04 THE SPLIT`→`#split`, `05 YOUR MOVE`→`#finale`). Each item: 16px 1px hairline + `.rv-micro` label at 9px, `opacity 0.35`; active `opacity 1`, hairline 32px wide and `background: var(--beam)` (300ms `var(--ease-out)`). Active tracking: ScrollTriggers on the five targets. Click → `getLenis()?.scrollTo(target)` (native `scrollIntoView({ behavior: 'smooth' })` fallback). Buttons with `aria-label="Go to section: <label>"`. Color adapts via `mix-blend-mode: difference; color: #F2EFE8;` on the rail container.

Definition of Done P2: `/` renders the full new page; intro plays once per session, skippable, never on other routes; all scrub/pins work with Lenis; GL layer works, falls back cleanly with WebGL disabled (test via devtools → rendering → emulate) and under reduced motion (no pins, everything readable statically); no horizontal overflow 360px–1920px; hero LCP image preloaded; `pnpm check`, `pnpm test`, `pnpm build` green.

---

## P3 — Platform pages (`/e4`, `/teamup`, `/taskify`)

### P3.0 Shared components (create in `src/lib/components/system/`)

`PageHero.svelte` (props: `eyebrow`, `title` (html string for `{@html}`), `sub`, `field: 'cloud'|'night'` default cloud): `.rv-section` (padding-top `calc(var(--section-pad) + 72px)`), eyebrow `.rv-micro` color `--beam` (cloud) / `--honey` (night), H1 `.rv-d2` `use:revealLines`, sub `.rv-body-lg` `use:revealFade`.

`CTABand.svelte` (no props): field night `.rv-section` centered: `.rv-d3` `use:revealLines`: `Every platform unlocks at registration.` + `.rv-body` `--dusk-body`: `One fee. The whole journey. ₦15,000.` + `<a href="/register" class="rv-btn rv-btn--beam rv-btn--big felt">Register your child</a>`. Used as the last section of every P3/P4 content page.

`FeatureRows.svelte` (props: `items: { index, title, body }[]`): `.rv-row` list with `use:revealChildren`, index mono `--beam`, `.rv-title`, `.rv-body`.

### P3.1 `/e4` — replace `src/routes/e4/+page.svelte` content sections with:

1. `PageHero` — eyebrow `E4™ · THE AI CHESS COACH`; title `The best first move.`; sub `An AI coach that watches every move, answers in voice or text, and trains your child the way the pros train.`
2. Image band: `.rv-wrap`, `.rv-frame` `use:revealImage`, `<img src="/images/e4-ui.webp" alt="The e4 AI chess coach analysing a game move by move" loading="lazy">`, 16:10, full grid width.
3. `FeatureRows`: 01 `Sees every move` / `Predicts what is coming, flags the mistake as it happens, and shows the stronger idea — with the same engine-backed analysis top players use.`; 02 `Speaks their language` / `Ask anything by voice or text and get step-by-step strategy, not jargon.`; 03 `Practises what they miss` / `Every real mistake becomes a custom puzzle until the lesson sticks.`; 04 `Plays at their pace` / `Against the AI or against real opponents, from first game to finals prep.`
4. `CTABand`.

### P3.2 `/teamup` — replace page composition (stop importing `src/lib/components/teamup/*`; they are deleted in P6):

1. `PageHero` field night — eyebrow `TEAMUP™ · THE DEVELOPMENT PROGRAMME`; title `The spectrum, in full.`; sub `Five disciplines that turn a chess summer into a life curriculum. Every registered child is enrolled from day one.`
2. Five pillar sections, alternating cloud/night starting cloud, each `.rv-section .rv-wrap .rv-grid`: letter chip 56px (spectrum color, as in P2.7), `.rv-d3` pillar name, `.rv-body` description (verbatim from `docs/about.md` §3.2 table: Technology → `Using technology creatively and responsibly to solve problems and expand learning.` Enterprise → `Developing initiative, innovation, and practical problem-solving skills.` Art → `Encouraging creativity, imagination, communication, and design thinking.` Mentorship → `Learning from experienced professionals, educators, and inspiring role models.` Upskill → `Building leadership, teamwork, communication, and essential life skills for the future.`). Text col 2–7; on rows 2 and 4 (E, M) shift to col 6–11 (the dolly weave). `teamup-mentor.webp` appears once, in the Mentorship section, col 1–5, `.rv-frame` `use:revealImage`.
3. `What is included` — cloud section, `FeatureRows` with 8 items (index 01–08, titles only, body empty string suppressed): `Mentored learning sessions`, `Chess training and development`, `Leadership exercises`, `Innovation challenges`, `Collaborative projects`, `Personal development activities`, `Project-based challenges`, `Assessments and milestone tracking`.
4. `CTABand`.

### P3.3 `/taskify` — replace page:

1. `PageHero` — eyebrow `TASKIFY™ · THE DEVELOPMENT PASSPORT`; title `Growth, documented.`; sub `A digital passport that records every badge, milestone and certificate from the day your child registers.`
2. Image + copy split: `passport-macro.webp` `.rv-frame` col 1–6; right col 7–12: `.rv-title` `What gets recorded` + `.rv-body` list (10 items from about.md §3.3, comma-joined into two sentences): `Attendance, developmental milestones, achievement badges, skills acquired, assessment results and project participation. Leadership activities, mentorship engagement, certificates earned and every other notable accomplishment.`
3. Parent callout — night band `.rv-section`: `.rv-d3` `use:revealLines`: `Parents see everything.` + `.rv-body` `--dusk-body`: `The passport is open to parents and guardians for the entire programme. Progress is never a mystery.`
4. `CTABand`.

Definition of Done P3: three pages fully restyled, old teamup component imports removed, all gates green.

---

## P4 — Supporting pages

### P4.1 `/about` — replace visible sections (keep any load logic):

1. `PageHero` — eyebrow `BEEE® · BE EVERYTHING EXCELLENT EVERY DAY`; title `Excellence, every day.`; sub `BEEE builds experiences where young people discover how excellent they can be — and the championship is our proudest one yet.`
2. Cloud section, `.rv-body` two paragraphs: `The BEEE Spectacular Chess Championship Abuja 2026 is a developmental journey for children aged 10 to 14: AI-powered coaching, live competition, mentorship and a grand finale at the National Stadium.` / `Chess is the instrument, not the point. Around the board we build technology skills, enterprise, art, mentorship and leadership — and we document every step of it.`
3. Night band: `.rv-d3` `use:revealLines`: `Our aim is simple: help redefine what learning means for a generation of young leaders.`
4. Cloud section `.rv-title` `The child comes first` + `.rv-body`: `Every decision in this programme starts with one question: what gives each child the most? That is the whole philosophy.`
5. `CTABand`.

### P4.2 `/why-beee` — replace:

1. `PageHero` — eyebrow `WHY CHESS · WHY NOW`; title `A sharper mind is the head start.`; sub `Chess is one of the best tools ever devised for building a young mind. We built a championship around that fact.`
2. `FeatureRows` (cloud): 01 `Why chess` / `It trains critical reasoning, pattern recognition and calm decision-making — concepts that transfer to every field a child will ever enter.`; 02 `Why ages 10–14` / `The window where intelligence-building compounds fastest. Habits formed here last.`; 03 `Why a stadium` / `Because children rise to the size of the stage you give them.`
3. Outcomes — night band, `.rv-title` `What participants develop` + 6 `.rv-row` items (titles only): `Critical reasoning and problem-solving`, `Creativity and innovation`, `Leadership and teamwork`, `Communication and confidence`, `Resilience under pressure`, `Academic and intellectual growth`.
4. `CTABand`.

### P4.3 `/faq` — keep `FaqSearch`/`FaqCategories`/`FaqAccordion`/`FaqContact` components and all logic/data; restyle only:

- Hero → `PageHero` — eyebrow `EVERY QUESTION, ANSWERED`; title `Ask us anything.`; sub `Registration, fees, eligibility, the programme, the awards — it is all here.`
- Search input: `.rv-body` font, 1px `--hairline` border, radius 12px, focus ring `box-shadow: 0 0 0 3px color-mix(in srgb, var(--beam) 20%, transparent)`. Category chips: `.rv-micro` pills, active = `--beam` border + text. Accordion rows: `.rv-row`-style hairlines, question `.rv-title` at 19px, answer `.rv-body`, chevron rotates 180° 300ms `var(--ease-out)`. Keep the CSS grid-rows open/close animation technique. Keep FAQPage JSON-LD untouched.

### P4.4 `/partner` — keep all form/signup logic and server wiring; restyle:

1. `PageHero` — eyebrow `THE PARTNER PROGRAMME`; title `Share the stage.`; sub `Earn 10% on every registration you refer — while every family you refer saves 10%.`
2. `FeatureRows`: 01 `Sign up` / `Create a partner account in minutes.`; 02 `Share your link` / `A unique code and link, yours to share with parents, schools and community.`; 03 `They register` / `Anyone using your code gets 10% off automatically.`; 04 `You get paid` / `₦1,350 per confirmed registration, sent to your bank account.`
3. The existing signup form/Google OAuth block restyled with P5 form rules.
4. `CTABand` replaced here by a night band whose button is `Become a partner` linking `#partner-signup` (the form anchor), sub line `Payouts go to the bank account you choose.`

### P4.5 `/privacy` and `/terms` — typographic documents. Keep all legal text byte-identical. Template: `PageHero` (privacy: eyebrow `YOUR DATA, RESPECTED`, title `Privacy Policy.`, sub empty string → omit sub node; terms: eyebrow `THE FINE PRINT, IN PLAIN TYPE`, title `Terms of Service.`) then a single cloud `.rv-section .rv-wrap` with content constrained `max-width: 68ch`, `h2` → `.rv-title` with `margin-top: var(--space-6)`, body → `.rv-body`, lists spaced `var(--space-2)`.

Definition of Done P4: all six pages restyled, faq tests green, all gates green.

---

## P5 — Transactional reskin (`/register`, `/login`, `/dashboard*`, `/payment/callback`, error page)

Iron rule: **zero changes** to handlers, fetch calls, validation, Paystack invocation, field names/ids, form semantics, redirect logic, or modal confirm flow. Only class/markup-wrapper/style changes plus the three allowed copy adjustments below.

### P5.1 Form system (add to `system.css`)

```css
.rv-input {
  width: 100%; font: 500 16px/1.4 var(--font-sans); color: var(--ink);
  background: color-mix(in srgb, var(--cloud-dim) 60%, transparent);
  border: 1px solid var(--hairline); border-radius: 12px; padding: 14px 16px;
  transition: border-color var(--dur-micro) var(--ease-out), box-shadow var(--dur-micro) var(--ease-out);
}
.rv-input:focus-visible { outline: none; border-color: var(--beam); box-shadow: 0 0 0 3px color-mix(in srgb, var(--beam) 20%, transparent); }
.rv-label { font-family: var(--font-mono); font-size: var(--fs-micro); font-weight: 500; letter-spacing: var(--ls-mono); text-transform: uppercase; color: var(--muted); display: block; margin-bottom: 8px; }
.rv-error-text { color: var(--error); font-size: 14px; }
.rv-callout-ok { border: 1px solid color-mix(in srgb, var(--success) 45%, transparent); background: color-mix(in srgb, var(--success) 10%, transparent); color: var(--body-strong); border-radius: 12px; padding: 12px 16px; font-size: 14px; }
```

### P5.2 `/register`

- Page field: cloud. Two-column ≥1024 (`.rv-grid`): left col 1–5 summary panel, right col 6–12 the existing `RegistrationForm` restyled.
- Left summary (new static markup): eyebrow `.rv-micro` `--beam` `REGISTRATION · ABUJA 2026`; `.rv-d3` `One fee. The whole journey.`; `.rv-body` list of included items (`e4™ AI coach`, `TEAMUP™ programme`, `Taskify™ passport`, `Live rounds & Grand Finale`) each with a 4px beam dot; fee line `.rv-title .rv-num` `₦15,000` with note `.rv-micro` `10% OFF WITH A PARTNER CODE`. Mobile: summary collapses to a single line above the form: `.rv-micro` `₦15,000 ALL-IN · AGES 10–14`.
- Form: swap `SN Pro` styling classes for `.rv-label`/`.rv-input`; primary submit becomes `rv-btn rv-btn--beam rv-btn--big felt` full-width. Keep PhoneInput/BankSelect/password toggle internals; restyle their borders/focus to the same tokens. Partner-code success callout uses `.rv-callout-ok` and keeps its exact current text. Confirmation modal: night surface `var(--nightfall-soft)`, `.rv-title` heading, hairline dividers, buttons `rv-btn--beam` / `rv-btn--ghost`; Esc/backdrop behaviour untouched.
- The three allowed copy changes (exact): (1) submit button label → `Register & continue to payment`; (2) modal confirm button → `Confirm & pay ₦{amount}` where `{amount}` is the existing computed naira amount variable already shown in the modal; (3) page `<h1>` → `Take your seat.` with sub `.rv-body` `Three minutes, one form, and every platform unlocks.`
- `registration.test.ts` / `parent-multikid.test.ts` must pass unmodified. If a selector in them targets a changed class, restore that class alongside the new ones (classes are additive, never subtractive, on elements tests touch).

### P5.3 `/login`

Centered card (max-width 420px, cloud page, card = `--cloud-dim` surface radius 16, padding `var(--space-5)`): `.rv-d3` `Welcome back.`; existing email/password/Google flow restyled with `.rv-label`/`.rv-input`/`rv-btn--beam`; Google button `rv-btn--ghost` with existing icon; error text `.rv-error-text`. Below card: `.rv-micro` link `NO ACCOUNT? REGISTER A CHILD →` `/register`.

### P5.4 `/dashboard`, `/dashboard/partner`, `/dashboard/settings`

Shared shell: cloud page, `.rv-wrap`, `PageHero`-style compact header (eyebrow `YOUR DASHBOARD` / `PARTNER DASHBOARD` / `SETTINGS`; title = existing greeting/data unchanged). All cards → `--cloud-dim` surfaces, radius 16, 1px hairline, padding `var(--space-4)`; section labels `.rv-micro`; data values `.rv-num`; tables: header row `.rv-micro` `--muted`, body rows hairline-separated 15px sans; status badges: paid = `--success` 12% bg pill, pending = `--warning` 12% bg pill, mono 11px. Partner code display: `.rv-title .rv-num` in a dashed 1px `--beam` border box with copy button (`felt`). All existing buttons/inputs → `rv-btn`/`rv-input` equivalents. No text changes. `dashboard.test.ts`, `partner/page.test.ts` must pass (additive classes rule applies).

### P5.5 `/payment/callback` + `src/routes/+error.svelte`

Callback states (logic untouched): verifying → centered `.rv-micro` `CONFIRMING YOUR SEAT…` with a 24px hexagon outline spinning (rotate 360° 1.6s linear infinite — the single allowed `linear`); success → `.rv-d3` `Seat confirmed.` + `.rv-body` existing details + `rv-btn--beam` `Go to your dashboard`; failed → `.rv-d3` `That move did not land.` + existing error text + `rv-btn--beam` retry (existing handler) + `.rv-micro` support line `NEED HELP? INFO@BEEEPROJECT.COM`.
Error page: field cloud, centered: `.rv-d2` `This square is empty.` + `.rv-body` `The page you are looking for is not on the board.` + `rv-btn--beam` `Back to the start` → `/`.

Definition of Done P5: full flow manually tested in dev — register form → modal → (Paystack test popup opens) — plus login, dashboard render, callback states (simulate by visiting with a bad reference: error state styled), all tests green.

---

## P6 — Cleanup, docs, tests

1. Delete files: `src/lib/components/championship/ChampHero.svelte`, `ChampAbout.svelte`, `ChampFeatures.svelte` (if `grep -rn "ChampAbout\|ChampFeatures\|ChampHero" src` returns no importers), all of `src/lib/components/teamup/`, all old `src/lib/components/home/` except `Footer.svelte` (i.e. `Hero, HomeJourney, HomeAwards, PlatformCard, Pillars, TeamUp, Passport, Different, FinalCTA`), `static/fonts/bumble-*.otf` + `static/fonts/fraunces/fraunces-latin-italic.woff2` + `static/fonts/sn-pro/` (after `grep -rn "SN Pro\|GC Bumble\|Fraunces" src` shows only `--font-serif-note` Fraunces-normal usage), `homepage-full.png`, `src/lib/assets/images/hero-bg.png` if unreferenced. For each deletion: grep first; if referenced, fix the reference, then delete.
2. `src/styles/`: delete `hero.css`, `chess.css`, `cards.css`, `sections.css`, `animations.css`, `responsive.css` **only if** `grep` shows none of their class names used in remaining `src` (check each file's top-level class names; `forms.css`, `modal.css`, `navigation.css`, `footer.css` likely still partially used — for those, delete only rule-blocks that are now dead, keep files). Remove the corresponding `@import` lines from `app.css` for deleted files. Delete `src/styles/cards.test.ts` if `cards.css` is deleted; keep `forms-modal.test.ts` passing against the kept files.
3. `fonts.css`: remove the SN Pro block and its comment. `variables.css`: delete the legacy fluid scale block (`--fs-eyebrow` … `--fs-display-sm`), `--font-registration`, `--font-championship`, `--font-welcome`, `--font-display-hero`, `--font-body-hero` aliases (grep-verify zero usage first; re-point any straggler to the new tokens).
4. Rewrite `src/styles/variables.test.ts` to assert the new system verbatim: contains `--fs-d1: clamp(44px, 10.14vw + 6px, 152px);`, `--cloud: #F1EEE7;`, `--nightfall: #0A0F1A;`, `--beam: #F27830;`, `--honey: #FFB200;`, `--ease-out: cubic-bezier(0.16, 1, 0.3, 1);`, `--section-pad: clamp(96px, 9.77vw + 59.4px, 200px);`; still asserts absence of `--gold:`, `--cream:`, `--panel:`; still asserts presence of `--glass-blur: 16px;` and `--noise-opacity: 0.03;`.
5. Rewrite `/design` (`src/routes/design/+page.svelte`): a single-page system doc using the primitives themselves: palette swatch grid (all SPEC-TRUM tokens with hex labels in `.rv-micro`), the three type registers demonstrated, spacing scale bars, button variants, form elements, `.rv-row` demo, motion tokens listed as text. No old-system content remains.
6. Rewrite `DESIGN.md` (repo root) to describe the new system: point to `docs/design-direction.md` (concept) and `docs/revamp-plan.md` (build), list the token names (`--cloud, --nightfall, --beam, --honey, --spec-*`, type/space/motion tokens), the four fonts and their roles, and the composition rules (fields, one signature, serif-note budget ≤2/page, felted press on every interactive, no italics, no honeycomb wallpaper).
7. Update `docs/about.md`: §11.1 stack table — Animations row becomes `GSAP (ScrollTrigger, SplitText) + Lenis smooth scroll + Three.js (light/dust canvas) + Motion (WAAPI)`; §12.2 palette table → new palette (Brand: Beam `#F27830` locked, Honey `#FFB200`; Canvas: Cloud `#F1EEE7`; Dark: Nightfall `#0A0F1A`; Spectrum set listed as TEAMUP-only); §12.3 fonts table → `Display/Headings: Bricolage Grotesque · Body: General Sans · Micro-labels/code: JetBrains Mono · Serif accent (≤2 per page): Fraunces (roman only)`; §12.4 visual patterns → grain overlay, beam-and-dust WebGL layer, felted press physics, journey rail, lit-square finale, dot cursor, light default + nightfall dark toggle; §12.5 component patterns → rv-btn variants, rv-row lists, rv-input forms. Keep all non-design sections untouched.
8. Fix stale root-README/`todo` references only if they name deleted files.

Definition of Done P6: `grep -rn "Space Grotesk\|Poppins\|Cormorant\|Open Sans\|Montserrat\|Playfair\|Schibsted\|font-style: italic\|<em>\|<i>" src` returns zero hits (Lucide icon `<i>` false-positives excluded — verify matches manually); `pnpm check`, `pnpm test`, `pnpm build` green; docs updated.

---

## P7 — QA gates and acceptance

Run every gate; fix failures; produce a short report in the final message (not a file).

1. **Commands**: `pnpm check` → 0 errors. `pnpm test` → all green. `pnpm build` → success. Confirm homepage JS (excluding the lazy `three` chunk) < 300KB gzip: `ls -la .svelte-kit/output/client/_app/immutable/chunks | sort` and check the `three` chunk is a separate lazy file.
2. **Visual pass** (agent-browser or manual): screenshot every public route at 360×740, 768×1024, 1440×900, in light and dark. Verify: no horizontal scroll, no text clipped by masks, one dominant element per viewport, stat rail readable, nav correct on all routes, footer identical everywhere.
3. **Motion pass**: intro plays once/session and is skippable; hero dolly scrubs; manifesto crossfade; journey rows activate and images crossfade; knight forms and dissolves between interlude progress ~0.3–0.75; split fans five beams + labels; finale square glows; nothing bounces; no `ease-in-out`/default `ease` anywhere (`grep -rn "ease-in-out" src` → only allowed inside `theme.css` legacy keyframe lines if still consumed, otherwise zero).
4. **Reduced-motion pass**: emulate `prefers-reduced-motion: reduce` → native scroll, no pins (sections show static stacked content), intro static-fades, knight static image, all copy readable, all CTAs reachable.
5. **No-WebGL pass**: disable WebGL → `.rv-beam-fallback` visible in hero/finale, split shows static rays, zero console errors.
6. **Keyboard pass**: tab order sane on `/`, `/register`, nav mobile menu (trap + Esc + focus return), modal Esc/backdrop, skip-link works, `:focus-visible` rings visible on cloud and nightfall.
7. **Flow pass**: register → modal → Paystack popup opens (test key); partner code validates with green callout; login works; dashboard renders; theme toggle persists; `/payment/callback` bad-reference shows styled failure.
8. **Content audit**: every string matches this plan byte-for-byte; chess-pun budget respected (`/`: "Make your move." only; `/e4`: "The best first move." only); serif `.rv-note` appears ≤2 times per page; spectrum colors appear only in split/TEAMUP contexts; no honeycomb patterns anywhere; no italics anywhere.
9. **Acceptance (the kill test)**: (a) the light beam is present from hero to finale with no hard visual cuts between homepage sections; (b) the dust visibly forms the knight once; (c) WIN refracts into five colors in the intro; (d) a visitor could describe the site as "the light followed me down the page and split into colors"; (e) nothing about the build resembles the old cream/coral card-grid site.

---

## Appendix — quick reference

- Fee copy: always `₦15,000`, partner `₦13,500`, commission `₦1,350`. Dates: coaching `JUL 28 – AUG 29`, prelims `SEPTEMBER`, finale `OCTOBER` + `National Stadium`. Ages: `10–14` (with en dash). Contact: `info@beeeproject.com`, `+234 802 092 0872`.
- Serif-note budget per page: `/` = "waiting" (hero) + "platform" (philosophy). All other pages: zero serif notes (headlines are pure grotesk).
- z-order: backgrounds 0 → GL canvas 3 → content 10 → nav 50 → mobile menu 70 → intro 80 → grain 90 → cursor 99999.
- Session/storage keys: `beee_intro` (sessionStorage, '1'), `beee_theme` (localStorage, 'light'|'dark'), existing `partner_c` untouched.
- Custom events: `intro:done` on `window`.
