# Fable 5 — Site Touch-Up: Creative-Director Critique & Plan

**Run with:** `claude --chrome --model claude-fable-5` from `~/i/beee` (so Fable can open pages in Chrome and screenshot them). Use effort `xhigh`.

## Why
This is the BEEE Spectacular Chess Championship site (beeeproject.com) — a youth chess + AI-coaching + personal-development programme (TEAMUP) for kids 10–14 in Abuja, Nigeria. Audience: parents/schools (need to trust it builds real skills) and kids (need to feel excited). Enrollments may begin within days, so the site's look/feel directly drives sign-ups. I have limited Fable 5 access (free promo ends 2026-07-12), so you must **only analyze and plan — do NOT edit code**. A cheaper model implements your plan afterward.

## Your role
You are a senior UI/UX creative director with decades of experience at a top-tier studio that does work for Apple and Nike and consistently ships Awwwards/Award-winning sites. You've been brought in to do a **professional touch-up** — the way a world-class art director refines a decent site into an exceptional one. Not a rebuild. Not a gimmicky 3D overhaul. Elevate what exists.

## Special permission (override)
The project's `AGENTS.md` says "never start the dev server." For THIS task only, you are **explicitly granted permission to override that rule**: start the local dev server so you can open the site in Chrome and screenshot every page. This is the sanctioned exception. Use `pnpm dev` (it serves on `http://localhost:5400`). Do **not** run `npm run build` unless a preview is genuinely needed; the dev server is sufficient. Stop the server when your analysis is complete.

## What to do
1. **View every page, one by one.** Start the dev server (see permission above — `pnpm dev`, port 5400). Open the running site in Chrome and visit **EVERY route** found under `src/routes`: at minimum `/`, `/about`, `/e4`, `/teamup` — plus any others you discover (sub-pages, dynamic routes, error pages). For each route: screenshot at desktop (1440px) and mobile (375px), scroll through the whole page, and observe it as a real first-time visitor would. Note what you actually see.
2. **Critique through the director lens.** For each page, deeply analyze:
   - First impression & emotional response
   - Layout & visual hierarchy (what the eye hits first, what competes, what's weak)
   - Spacing, rhythm, alignment (consistency, tightness, breathing room)
   - Color usage & harmony — within the existing navy `#0A0F1A` / amber `#ffb200` / cream `#faf9f5` palette. You may refine proportions, tints, and contrast, but keep the brand vibe.
   - Typography (scale, contrast, readability, personality)
   - Components & micro-interactions (buttons, cards, hovers, motion)
   - Responsiveness & mobile experience
   - Accessibility & clarity
   - Brand fit (does it feel premium, trustworthy, exciting?)
3. **Ponder each issue.** Why does it feel off? Root cause? What is the *smallest high-impact* change that fixes it? Think like a director who gets the most improvement from the fewest moves.
4. **Write an EXTREMELY detailed, implementation-ready plan** — per page: concrete changes with EXACT specifications so a cheaper model (Sonnet 5) can implement them with **zero guessing and no further questions**. For every single change you must provide:
   - **Exact location:** the precise file + component + selector or line to modify (e.g. `src/lib/components/championship/ChampHero.svelte` → `.hero-title` rule, ~line 42).
   - **Exact values:** concrete CSS properties, spacing (px/rem), color tokens from the navy `#0A0F1A` / amber `#ffb200` / cream `#faf9f5` palette, type sizes/weights/line-heights, contrast ratios — no vague words like "more spacing" or "tweak"; give numbers.
   - **Before → after snippets:** the existing code/structure followed by the exact replacement code/structure, copy-paste ready.
   - **Motion specs (where relevant):** exact trigger, duration (ms), easing curve, and the `prefers-reduced-motion` fallback.
   - **The why + expected effect** for each.
   **Keep ALL existing copy, images, and general ideas/sections.** Restructure or restyle only.

## Hard constraints
- Do NOT rewrite or remove copy. Do NOT replace images. Do NOT change the general ideas/sections.
- **No 3D chessboard / scroll-narrative overhaul.** This is a touch-up, not a rebuild. (The earlier "THE EIGHTH RANK" concept is cancelled — ignore it.)
- Stay within the brand color vibe; refine, don't reinvent.
- You MUST NOT edit any source files. Output only a plan document.
- Every suggestion must respect `prefers-reduced-motion` and mobile gracefully.

## Output
Write the plan to `docs/fable5-touchup-plan.md`. One section per page: (a) what you saw (screenshot notes), (b) ranked critique, (c) detailed improvement plan with EXACT implementation specs — file:component:selector, exact numeric values, before→after code snippets, and motion specs + reduced-motion fallback. End with a cross-site consistency checklist and a prioritized "do these first" list. Give the reason behind every recommendation; explain the design thinking simply, as if to a developer with no design training.
