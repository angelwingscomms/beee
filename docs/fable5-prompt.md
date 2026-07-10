# Fable 5 prompt — run this in Claude Code with Fable 5 selected

## Instructions

1. Open your project in terminal
2. Run: `claude --model claude-fable-5`
3. Paste the prompt below. It will read the filesystem itself.

If you're on claude.ai web instead, paste the prompt and then paste the contents of these files in this order: `package.json`, `src/routes/+page.svelte`, `src/lib/components/championship/ChampHero.svelte`, `src/styles/variables.css`, `src/styles/theme.css`, `src/styles/hero.css`, `src/styles/animations.css`, `DESIGN.md`, `about.md`, `beeeletter.md`.

---

## Prompt

I'm working on the BEEE Spectacular Chess Championship website for schools in Abuja, Nigeria — it's a youth chess tournament for kids aged 10-14 that combines competitive chess with AI coaching, leadership mentorship, and a personal-development programme called TEAMUP (Technology, Enterprise, Art, Mentorship, Upskill). The audience is parents and school administrators who need to trust that this programme builds real life skills, and kids who need to feel excited.

The site currently has:
- Navy (#0A0F1A) and amber (#FFC72C / #ffb200) color scheme with cream (#faf9f5) secondary
- Dark immersive feel, already has "Make Your Move" as massive kinetic typography
- A hero with a photo of a kid playing chess, floating feature cards, scroll-triggered reveal animations
- A "What Makes BEEE Different" section with 3 colored cards (amber, teal, cream beige) in a bento grid
- A "Everything Your Child Needs" section with a dark bento grid showing e4/TEAMUP/TASKIFY cards with images and hover 3D tilt effects
- A "Journey" framework section with a vertical tree/timeline connecting TEAMUP, TASKIFY, and e4 cards
- A yellow "Chess is not the destination. It's the platform." section with giant word-split GSAP reveal
- GSAP + anime.js + Motion already in the dependency stack (package.json is at project root)
- Threejs is NOT installed but can be added

The goal: transform this site to **Awwwards Site of the Day level** — the kind of site that makes you say "whoa" on first load. The specific bar is interactive storytelling with 3D, not just visual polish.

First, read the full project structure. Read the existing page.svelte, the ChampHero component, the styles, DESIGN.md, about.md, and beeeletter.md to understand the current state and brand.

Then do the following:

### Deliverable 1: Complete Design Concept

Give me a single, opinionated visual concept with a name. Tell me the ONE narrative arc the scroll tells. Describe it like you're pitching it to the Awwwards jury. Be specific about what the 3D chessboard does at each scroll phase, what particles/effects run in the background, how the cursor interacts, and how the typography animates. Reference actual Awwwards-winning sites from 2025-2026 that prove this pattern wins.

Include a section-by-section breakdown of:
- What the user sees first (hero — must load fast, progressive enhancement)
- What happens when they scroll past each section
- What 3D element drives each scroll phase
- What microinteractions exist on hover
- How the color palette evolves across the scroll arc (starting from current navy/amber)
- What sound design would enhance it (optional but note it)

### Deliverable 2: Hero Section Implementation

Build the hero section as a Svelte 5 component. Use reactive $state and $derived. Must use GSAP (already available) for scroll-triggered choreography and three.js for the 3D isometric chessboard (add it to package.json). The hero must:

- Load a 3D isometric chessboard using three.js with pieces that animate on scroll
- Have a particle system on the navy background (floating chess notation or star particles)
- Show floating glassmorphic cards (e4 AI feedback, Taskify progress) that react to cursor position
- Include a scroll-triggered camera move that pans the 3D board as the user scrolls through the hero
- Section title reveals with GSAP SplitText word stagger on scroll
- Be responsive and degrade gracefully on mobile (3D becomes static, animations become CSS transitions)
- Include reduced-motion support

Put the implementation in a file at `src/lib/components/championship/ChampHero.svelte` (overwrite the existing one with the new implementation). Use imports from the existing style system (variables.css, theme.css). Don't add new CSS files — extend the existing ones.

### Constraints

- This must work with SvelteKit + Cloudflare adapter. No server-side three.js. Lazy-load three.js on client-side only.
- Must respect the existing brand colors (navy, amber, cream) — evolve them, don't replace them.
- Must be performant on mid-tier mobile (iphone 12 / android equivalent). If 3D can't run, fall back to CSS animations.
- Must pass accessibility: keyboard navigable, screen-reader friendly, reduced-motion respected.
- Don't overplan. When you have enough information to act, act. Your first output after reading the codebase should be the design concept, then immediately the implementation.

Give the reason before every decision you make as you implement. Assume I can execute anything you produce — I'm a developer. I don't need explanations of basic Svelte or three.js concepts, but I do need your design rationale.
