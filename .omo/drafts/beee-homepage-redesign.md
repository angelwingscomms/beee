# Draft: BEEE Homepage Premium Redesign

## Status
**Phase:** awaiting-approval
**Approval:** pending
**Pending action:** write .omo/plans/beee-homepage-redesign.md (done — awaiting user sign-off)
**Approach:** Enhance existing SvelteKit codebase with component splitting, Motion animations, micro-interactions, design polish, CTA strategy, and final QA across 21+ todos in 7 ordered waves.

## Exploration Findings

### Existing Codebase (`/home/ed/i/beee/`)
- **Stack:** SvelteKit 2.61 + Svelte 5 + Tailwind CSS 4 + TypeScript 6
- **Homepage:** Single `+page.svelte` (1621 lines) with all 14 sections inline
- **Animations:** CSS scroll-driven animations (`animation-timeline: view()`, `animation-range`) for scroll reveals + line progress
- **Design:** Dark-mode (#070807 base) with gold accent (#f5b84b), cream sections (#f4efe6) for light bands
- **Fonts:** Poincins (championship), SN Pro (registration), Inter (body), Cormorant Garamond (display)
- **Components:** Registration form, player input, confirmation modal already built
- **Chess visuals:** SVG pieces with floating drift animation, isometric board in hero
- **Mobile responsive:** Yes, with hamburger nav and stacked layouts
- **SEO:** Basic meta tags
- **Git:** Active development, last commit "fix homepage scroll animation timelines"

### Spec Requirements vs Current State

| Area | Spec Says | Current State | Gap |
|------|-----------|---------------|-----|
| **Stack** | Next.js 15 + shadcn/ui + Framer Motion | SvelteKit + Tailwind + CSS animations | **MAJOR FORK** |
| **Animations** | Framer Motion (fade-up, scale-in, spring physics) | CSS scroll-driven animations | Medium |
| **Component structure** | `/components/home/Hero.tsx` etc | Single monolithic file | Medium |
| **Hero visual** | Animated chessboard with glow, pieces moving | Isometric board with floating pieces | Minor |
| **TEAMUP pentagon** | Interactive hover-expand with 5 segments | Working hover/click pentagon | Minor |
| **Development Passport** | Passport mockup with stamps, parent badge | Working passport with stamp grid | Minor |
| **Progress Tracking** | Dashboard with XP, badges, tabs | Working dashboard with progress bar | Minor |
| **Parent Section** | Phone mockup dashboard | Working phone shell mockup | Minor |
| **FAQ** | shadcn/ui Accordion | Custom accordion | Minor |
| **CTA strategy** | 5 placements: hero, after journey, after passport, after parents, final | 3 placements: hero, journey inline, final | Medium |
| **Micro-interactions** | Custom cursor, magnetic buttons, hover depth | None | Missing |
| **Trust bar** | 4 columns with icons | 4 columns on white bg | Matches |
| **Benefits** | 6 cards in grid | 6 cards in grid | Matches |
| **Awards** | 7 items in grid | 7 items in grid | Matches |
| **Fonts** | Premium sans-serif display | Poppins (championship) + SN Pro | Differs |
| **Color accent** | Gold (#c9a84c or #f5a623) | Gold (#f5b84b) | Close |

### Research Integration

**Awwwards Research:** GSAP/ScrollTrigger is the dominant animation backbone (~40% of winners). Micro-interactions (custom cursor, magnetic buttons, staggered text reveals) deliver highest emotional ROI. View Transitions API is the 2024-2026 game changer. French/Quebec agencies dominate with creative coding culture. Performance is a managed trade-off (typical Lighthouse 60-85).

**BEEE UX Research:** Dark-first design is 2026 premium standard. Parents decide emotionally first, rationally second — trust signals above fold are critical. Scrollytelling with sticky containers + IntersectionObserver creates narrative engagement. Multi-step forms convert 86% higher. CTA sticky bar increases sales 25%. Nigerian market: lightweight, mobile-first, WhatsApp integration essential. Spring physics (stiffness 200-400, damping 15-30) creates premium feel.

## APPROACH OPTIONS

### Option A: Enhance Existing SvelteKit (Recommended Default)
Keep the SvelteKit codebase. Refactor the monolithic `+page.svelte` into proper components. Add Motion (framework-agnostic successor to Framer Motion) for premium animations. Add micro-interactions (custom cursor, magnetic buttons). Use the View Transitions API for page transitions. Add missing CTAs and sticky mobile CTA. Refine design to match spec's "Apple + Khan Academy + Olympic Youth" feel.

**Why:** Preserves all existing work (registration flow, chess visuals, responsive layout). No framework migration risk. Faster to ship. Motion library gives identical animation API to Framer Motion.

### Option B: Rebuild in Next.js 15 (Spec Faithful)
Start fresh with Next.js 15, shadcn/ui, Framer Motion, and Lucide Icons as the spec states. Rebuild all 14 components from scratch.

**Why:** Matches spec exactly. shadcn/ui gives production-ready accessible components. Next.js ecosystem for future pages. Cleaner architecture from day one.

**Cost:** Full rewrite of registration backend, form logic, chess visual components. Loses existing SvelteKit work. Takes significantly longer.

## Decision

**Stack:** Enhance existing SvelteKit project (Option A)
- Use Motion (framer.com/motion) — framework-agnostic successor to Framer Motion
- No migration, preserve all registration/chess work
- Add Motion for spring-physics animations
- Add micro-interactions, missing CTAs, design polish

## Ledger
- `stack-decision`: SvelteKit (user chose Option A — enhance existing)
