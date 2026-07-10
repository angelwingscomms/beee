# Design Concept: **The First Move**

## Jury pitch

One board. One child. One scroll that turns a quiet first square into a championship path.

**The First Move** treats the BEEE Championship homepage as a cinematic opening sequence: you do not “land on a marketing page” — you sit at the board the moment before commitment. Scroll is the hand that lifts the pawn. Every section is a move in a longer game: e4 → TEAMUP → TASKIFY → Grand Finale.

This is not polish on a hero photo. It is **interactive storytelling with a 3D chessboard as the narrative camera**, the pattern that won Awwwards SOTDs in 2025–2026 when scroll became the storytelling engine (Noomo’s *The Power of Storytelling*, June 2026; Sleep Well / scroll-driven 3D editorials, Jan 2026; single-object inertial 3D product heroes like Oryzo).

---

## ONE narrative arc

**“From empty board → first move → whole child → championship.”**

| Phase | Scroll | 3D board | Meaning |
|-------|--------|----------|---------|
| 0 Opening silence | 0–15% hero | Board lit, pieces idle, camera high isometric | Potential. Trust begins in calm. |
| 1 The lift | 15–45% hero | Camera eases in; e-pawn rises; amber glow on e2–e4 | Decision. Parent feels the “start journey” moment. |
| 2 The ecosystem | 45–100% hero → Diff | Camera pans; glass cards (e4 / TASKIFY) orbit into view | Chess is the door; AI + passport are the house. |
| 3 Platforms | Platform / Journey | Board fades; bento & tree take over | Tools that build the whole child. |
| 4 The platform | Philosophy amber | Giant type: “Chess is not the destination…” | Thesis. Full-bleed amber after deep navy. |
| 5 Commitment | Footer | Kinetic “Make Your Move” CTA | Call to register — same line as the brand letter. |

---

## Section-by-section

### Hero (first paint — fast)

**User sees:** Navy void, soft navy-blob radial, kinetic title (“Your child. One board. A lifetime of advantage.”), meta row (age / dates / fee), primary CTA. Right side: **live 3D isometric board** (lazy WebGL) or **static CSS board + hero photo** if mobile / no WebGL / reduced-motion.

**3D:** Procedural 8×8 board + simple solid pieces. Warm key light (amber), cool fill (navy-teal). No HDRI downloads — pure geometry for mid-tier phones.

**Particles:** Sparse star-field + faint chess-notation glyphs (`e4`, `Nf3`, `O-O`) drifting upward on navy.

**Cursor:** Custom soft amber ring (existing Cursor if present); glass cards tilt toward pointer (parallax ±12px).

**Typography:** GSAP SplitText word stagger on H1/H2 once in view; reduced-motion = instant opacity.

**Sound (optional):** Soft wood-block tick on first piece lift; distant ambient room tone under ‑24dB; mute by default until gesture.

### Diff (“What Makes BEEE Different”)

**Sees:** Three bento cards (cream / amber / sky).  
**3D driver:** Hero board cameras out / opacity down as cards rise — transition, not a second WebGL scene.  
**Hover:** Card lift + border glow.  
**Palette:** Still navy field; cards introduce cream and teal.

### Platform (“Everything Your Child Needs”)

**Sees:** Dark bento with e4 UI, gains chips, TEAMUP photo.  
**3D:** None required — CSS 3D tilt already present.  
**Hover:** Existing rotateX/Y + brightness.  
**Palette:** Navy → slate elevated surfaces; amber accents.

### Journey framework

**Sees:** Vertical tree TEAMUP / TASKIFY / E4 → BEEE.  
**3D:** Optional future: tiny board node at root; v1 keeps SVG tree.  
**Hover:** Card border pulse amber.

### Philosophy (amber)

**Sees:** Full-viewport amber, navy type, word-split GSAP.  
**Palette flip:** Navy journey ends; **amber becomes the world** — emotional “sunlight after strategy.”

### Footer

**Sees:** Giant “Make Your Move.” Register link.  
**Palette:** Navy again for trust/close.

---

## Color evolution (brand preserved)

1. **Hero:** `#0A0F1A` + amber `#ffb200` / `#FFC72C` highlights  
2. **Diff/Platform:** navy + cream `#faf9f5` + teal `#5db8a6` cards  
3. **Philosophy:** full amber field, navy ink  
4. **CTA:** navy + white type + amber CTA buttons  

Evolve, never replace.

---

## Microinteractions

- Glass cards: mouse parallax + float idle  
- CTA primary: amber fill, hover scale 1.02  
- Secondary: white outline, hover fill 8% white  
- Pieces: subtle idle bob; scroll drives e2→e4  
- Particles: velocity tied lightly to scroll speed  
- Keyboard: all CTAs focusable; canvas `aria-hidden`

---

## Performance & a11y

- Three.js **client-only dynamic import** (Cloudflare Workers safe)  
- Cap `devicePixelRatio` at 1.5; antialias off on mobile  
- Pause rAF when hero offscreen  
- Mobile / reduced-motion / no WebGL → static CSS board + photo  
- `prefers-reduced-motion: reduce` kills scroll camera & particle drift  
- Screen reader: full text content in DOM; canvas decorative  

---

## Why this wins (pattern proof)

- **Scroll = story camera** — 2026 SOTD consensus (Cartier/Shopify/Sleep Well class sites; Noomo storytelling SOTD)  
- **One hero object with weight** — Oryzo-style single-object restraint applied to the chessboard  
- **Editorial pacing** — type and 3D advance on the same beats, not competing  
- Brand stays **navy/amber/cream** so parents feel trust, kids feel drama  

**Concept name locked: The First Move.**
