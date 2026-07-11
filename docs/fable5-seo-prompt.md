# Fable 5 — SEO Audit & Perfection Plan

**Run with:** `claude --chrome --model clable-fable-5` from `~/i/beee` (so Fable can open pages in Chrome, view source, and run Lighthouse). Use effort `xhigh`. This is a SEPARATE turn from the visual touch-up — run it on its own, after or before that one.

## Why
This is the BEEE Spectacular Chess Championship site (beeeproject.com) — a youth chess + AI-coaching + personal-development programme (TEAMUP) for kids 10–14 in Abuja, Nigeria. The primary acquisition channel is parents and schools **searching Google** for things like "chess lessons for kids Abuja", "youth chess club Nigeria", "kids chess tournament". If the site isn't technically perfect and properly targeted, it stays invisible and enrollments suffer. I have limited Fable 5 access (free promo ends 2026-07-12), so you must **only analyze and plan — do NOT edit code**. A cheaper model implements your plan afterward.

## Your role
You are a senior technical SEO architect with decades of experience ranking major brand sites and local businesses on Google. You've been brought in to **completely perfect** this site's SEO — find every gap, then write an exhaustive, implementable plan that would make the site technically flawless and maximally discoverable for its local + program keywords.

## Special permission (override)
The project's `AGENTS.md` says "never start the dev server." For THIS task only, you are **explicitly granted permission to override that rule**: start the local dev server so you can open pages in Chrome, view their rendered source, inspect meta/head/structured data, and run Lighthouse (SEO + performance). Use `pnpm dev` (serves on `http://localhost:5400`). Stop the server when done. Do **not** run `npm run build` unless a production preview is genuinely needed.

## What to do
1. **Inventory the site.** Find every route under `src/routes` (`/`, `/about`, `/e4`, `/teamup`, and any others). Also inspect the SEO-relevant source: `app.html` (root `<head>`), `svelte.config.js` (prerender/SSR/adapter), any `robots.txt`/`sitemap` handling, and each page's meta/head declarations (e.g. `+page.ts` / `app.html` `<svelte:head>` blocks).
2. **Inspect the live site in Chrome** for every route: view source, read the rendered `<head>` (title, meta description, canonical, OG/Twitter, JSON-LD), and run a Lighthouse SEO + Performance pass. Capture the real current state.
3. **Audit deeply across every SEO dimension:**
   - **Crawlability & indexability:** robots.txt, XML sitemap, `meta robots`, canonical tags, prerender/SSR config (are pages statically rendered / indexable?), orphan pages, redirect hygiene, no soft-404s.
   - **Core Web Vitals & performance:** LCP, CLS, INP; Lighthouse scores; image formats/sizing (next-gen, dimensions), font loading, JS bundle weight, Cloudflare edge caching, render-blocking resources.
   - **On-page fundamentals:** unique, keyword-led `<title>` per page (~50–60 chars, primary keyword first); meta description (~150–160 chars, compelling); exactly one `<h1>` per page; logical H2–H6 hierarchy; per-page keyword mapping (e.g. "chess lessons for kids Abuja", "youth chess club Nigeria", "kids chess tournament Abuja"); clean URL slugs; internal linking; breadcrumbs.
   - **Structured data (JSON-LD):** Organization, EducationalProgram / Course, Event (tournament), LocalBusiness / Place (Abuja), BreadcrumbList — validate against schema.org and Google's rich-result rules; flag missing/incorrect.
   - **Local SEO:** Google Business Profile readiness, NAP (name/address/phone) consistency, local keyword coverage, geo signals, embedded map, Review/AggregateRating schema.
   - **Content semantics & a11y-as-SEO:** `alt` text on every image, descriptive link text, `lang` attribute, semantic headings, readable type — these are ranking + usability signals.
   - **Social sharing:** Open Graph + Twitter cards on every page for clean share previews.
   - **Measurement:** Google Search Console + GA4 wiring, conversion/event tracking for enrollment actions.
4. **Ponder & prioritize.** Which gaps actually move rankings/discoverability for THIS site's keywords? Rank fixes by impact. What's the smallest change for the biggest local-search win?
5. **Write an EXTREMELY detailed perfection plan** — per area: current state (from your inspection), ranked issues, and concrete fixes (exact file, exact change, why, expected effect), implementable with no further questions. **Keep all existing body copy and images** — SEO changes are meta/structural/alt/JSON-LD, not body rewrites (titles & meta descriptions may be written fresh).

## Hard constraints
- Do NOT edit any source files. Output only a plan document.
- Keep all existing body copy and images intact; do not rewrite page text.
- Every fix must respect the existing navy/amber/cream brand and the site's tone.
- Plan must be implementation-ready for a cheaper model (Sonnet 5) to execute.

## Output
Write the plan to `docs/fable5-seo-plan.md`. Structure: (1) Current SEO state per route (from inspection), (2) Ranked issue list, (3) Detailed fix plan per area (technical, performance/CWV, on-page, structured data, local, social, measurement), (4) A pre-launch SEO checklist, (5) A prioritized "do these first" list ranked by local-search impact. Give the reason behind every recommendation; explain SEO thinking simply, as if to a developer with no SEO background.
