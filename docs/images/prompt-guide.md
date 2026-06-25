# BEEE Image Prompt Guide

Consistent image generation for the BEEE brand. Always follow this when creating prompts.

---

## Brand DNA

| Attribute | Value |
|-----------|-------|
| Tagline | *Be Everything Excellent Every Day* / *Aspire to BEEE* |
| Vibe | Triumphant, warm, premium, human, aspirational |
| Context | Chess championship, community, excellence, Nigeria |
| Design philosophy | Minimalist, intentional, editorial, warm |

---

## Color Palette

Map prompt colors to these tokens:

| Token | Hex | Prompt Color |
|-------|-----|-------------|
| `--primary` | `#F27830` | warm amber-orange |
| `--primary-active` | `#BD5E25` | burnt umber |
| `--primary-light` | `#F69A64` | peach-orange |
| `--surface-dark` | `#181715` | near-black warm |
| `--on-dark` | `#faf9f5` | warm off-white |
| `--muted` | `#6c6a64` | warm grey |
| `--teal` | `#5db8a6` | muted teal (accent) |
| `--amber` | `#ffb200` | golden amber (accent) |
| `--surface-soft` | `#f5f0e8` | warm cream |
| `--ink` | `#141413` | deep charcoal |

When describing lighting/color in prompts, use: _warm amber-orange primary, near-black warm background, muted teal accent, golden amber highlights_

---

## Typography Mood

Fonts are not renderable by AI, but describe the *feel*:

- **Display headings:** elegant serif, editorial, refined (Cormorant Garamond)
- **Body:** clean sans-serif, warm, readable (Inter)
- **Championship:** bold sans-serif, impactful, sporty (Poppins)
- **Decorative:** handcrafted, organic (GC Bumble)

In prompts: _editorial serif headings, clean sans body_ — but **prefer images without text**. Add text in post-processing.

---

## Image Style Taxonomy

Use one of these style prefixes at the start of every prompt:

### Photography
`Warm editorial photography, shallow depth of field, natural golden-hour lighting, 85mm lens, slightly desaturated, warm tones, film grain subtle`

### Surreal / Conceptual
`Surreal digital painting, dramatic cinematic lighting, volumetric atmosphere, warm amber glow against near-black void, ethereal, ultra-detailed`

### Flat / Graphic
`Clean flat illustration, warm cream background, orange and teal accents, organic shapes, minimalist, soft shadows, editorial style`

### Premium Product
`Commercial product photography, softbox lighting, warm gradients, minimalist composition, premium texture, shallow focus`

---

## Subject Recurring Themes

### Chess & Competition
- Chess pieces (obsidian, marble, glowing amber)
- Boards in dramatic perspective
- Mid-game focal moments (piece levitating, hand moving)
- Abstract strategy patterns (grids, branching paths)
- Championship trophies, medals, laurels

### Community & People
- Warm group shots, candid moments
- Nigerian context (Abuja landscape, cultural motifs)
- Diverse ages gathered around boards
- Triumph/celebration expressions
- Warm golden-hour outdoor scenes

### Abstract / Conceptual
- Interlocking geometric forms
- Light paths / golden thread motifs
- "BEEE" as three glowing nodes or pillars
- Luminous circles, radiance, halos
- Warm gradients from dark to light

---

## Prompt Template

```
[STYLE PREFIX] — [SUBJECT], [SETTING], [LIGHTING & COLOR], [COMPOSITION], [MOOD], [TECHNICAL]
```

### Example

> Warm editorial photography — two hands shaking over a chess board between games, outdoor Abuja golden hour, warm amber-orange light, shallow depth of field, candid documentary feel, 85mm, slightly desaturated warm tones, 1920x1080

> Surreal digital painting — a glowing amber chess queen floating above a dark board, cosmic dust swirling around it, warm god-rays piercing a near-black void, centered composition, triumphant ethereal mood, 16:9

---

## Technical Specs

| Use Case | Dimensions | Aspect | Notes |
|----------|-----------|:------:|-------|
| Hero / OG image | 1200×630 | 1.91:1 | Default for web sharing |
| Full-width section bg | 1920×1080 | 16:9 | Sections, CTAs |
| Social feed | 1200×675 | 16:9 | Twitter, LinkedIn |
| Instagram square | 1080×1080 | 1:1 | |
| Profile banner | 1500×500 | 3:1 | Twitter/X header |

Always specify dimensions in prompt. Never use aspect ratio alone — AI models vary.

---

## Don'ts

- No text in generated images (add overlays later)
- No people unless explicitly described (models hallucinate faces)
- No busy/complex compositions for backgrounds (they'll compete with text)
- No cool/blue-only palettes (brand is warm)
- No pure black (`#000`) — use `#181715` warm near-black
- No DALL-E 3 (deprecated)
