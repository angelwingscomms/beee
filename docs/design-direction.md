# SPEC-TRUM — Design Direction for the BEEE Revamp

Status: approved seed, pre-build. This document is the creative constitution for the full site revamp.
Every design decision must trace back to something here. If it can't, it's a default — replace it.

---

## 1. The seed (from the founder interrogation, recorded)

Load-bearing verbatim material. Do not paraphrase these away:

- Single job of the site: **get a child registered.**
- Must feel: **calming, soothing, nostalgic.** Must never feel: **formal or corporate.**
- Behaves like: **"the user's second home"** — and, second answer, **an eagle soaring high with a perfect view of the whole land.**
- References: **brutalist buildings, liminal spaces.** Anti-reference: over-ornamented buildings — "carvings and etches as if someone was trying to make it look wonderful."
- Audience: **the child first, then the parent.** They must feel: calm, awesome, new, novel, valuable, excited to belong. ~80% phones. They are buying.
- Risk appetite: **9/10.** Desired reaction: **"how did they do that?"** Spectacle beats reassurance when they conflict.
- Temperature: **48°C** — yet the weather is **cool, grey, slightly windy, about to rain, serene.** (Heat held inside cool air. Design this tension, never resolve it.)
- Lighting: **golden hour at a stadium — light coming from the sky down to the stadium floor.**
- The room: **empty, like the stage before the finale.** A **whisper in a huge room.** Being **welcomed in.**
- Heart rate: **a countdown.** (Anticipation, not calm, not excitement — the charged stillness before.)
- Material: hard but soft — "when a piece lands you hear **a muted soft click**." (A felted chess piece landing on a board.)
- Object: **a smallish brown reflective sphere, matte-yet-smooth, always in motion, enough mass to move decisively,** calming to hold and roll.
- Abstract emblem: **a cube-like prism** — light enters, splits into many colors; insight revealing facets. Plus **a single perfectly played clear note from a string instrument** against a background hum.
- The word that appears before anything loads: **"WIN"** — the founder wanted "something that feels grand, elevated, like ascending… win — it also means ascend in a way." (SPEC-TRUM, an earlier candidate from the interview, survives only as this document's internal codename — it is never shown to visitors.)
- Sound of the brand: **chess clocks, and the silence before a move.**
- Printed form: **premium editorial magazine / gallery catalog** — luxury-advert page energy.
- Camera: **wide establishing crane over the stadium, then a slow dolly. No hard cuts.**
- Scroll: **walking into a stadium.** Navigation: **a map of the journey.** The site **performs for the visitor**, but as a **conversation** — interactive, not a lecture.
- Era: **2034, timeless.** Place: internationally neutral (Abuja by happenstance, not by styling).
- Taste trusted: **Apple, Nike, Netflix.** Most beautiful site ever used: an award-winning **particle scrollytelling site — particles forming objects that morph as you scroll.**
- Media survival order: kill 3D objects first, then illustration, then pure typography — **photography survives last.** All imagery will be **AI-generated** (nothing real exists yet).
- Chess clichés: checkerboard **kept only huge and subtle (one or two giant squares)**; knight silhouette **once, modern, cool**; checkmate puns in copy **allowed**. Kids-programme clichés (confetti, rainbows, mascots): **all dead.**
- Belief to destroy: "chess championships are boring, plain, just chess." Screenshot moment for the parents' WhatsApp group: "check this out — your kids are going to love this."
- Locked: orange `#F27830`, the bee mark (four honeycomb hexagons — two outlined wings, solid head, striped body), the tagline, BEEE®. Changeable: fonts, copy. Payment flow logic essentially untouchable (small clear improvements allowed).
- Go heavy: WebGL, video, big imagery — no skimping. Keep dark mode toggle. Creative liberty on cursor and all animations.
- Obituary line: "BEEE helped redefine what learning means for a generation of young leaders." Keep learning. Improve. Ascend.

## 2. The concept

**The sentence:**

> A site for the BEEE Spectacular Chess Championship that feels like calm, nostalgic anticipation — a child walking into a vast, empty stadium at golden hour — behaves like light passing through a prism, and will be remembered for the moment the word WIN refracts into a living spectrum.

**The logic.** The prism is the founder's own emblem: light enters as one thing and leaves as many. Chess is the single beam entering; the championship splits it into a spectrum — Technology, Enterprise, Art, Mentorship, Upskill; a game becomes a life. "Chess is not the destination, it is the platform" rendered as physics. The locked logo — a bee built of four honeycomb hexagons — supplies the physical world around that idea: the **hexagon** is the brand's atomic geometry (a honeycomb cell is a hexagonal prism, so the splitting device is drawn straight from the mark), the **hive hum** is the ambient energy under the calm (the founder already called chess the "background hum"), the **honey gold** is the golden-hour light, and the **swarm** is how dust behaves in the beams. The site itself is the hour before the finale: an empty stadium at golden hour, dust hanging in the beams, a whisper in a huge room. The visitor walks in from the tunnel. The stage is empty because it is waiting for their child.

**Resolved tensions (kept as tensions):**
- 48°C inside cool grey air → warm light (orange, gold) as rare luminous events inside a cool, calm field (cloud grey, deep navy).
- Spectacle + calm → the spectacle is scale, light, and one impossible-feeling device. A whisper is spectacular when the room is big enough.
- Brutalist + second home → monumental bare structure, warm light and soft physics inside it. No ornament anywhere; geometry and light do all decorative work.
- Machine 54/100 → Swiss structural precision, softened by felt-like motion and warm copy.

## 3. Tokens

### Palette (light site, interrupted by deep navy; orange used as light, not paint)

| Token | Hex | Role and justification |
|---|---|---|
| `--cloud` | `#F1EEE7` | Canvas. The grey-warm sky before rain. Dimmer than the old `#faf9f5` — "light enough that no one calls it dark," never bright. |
| `--nightfall` | `#0A0F1A` | The deep navy interruption. Museum at cloudy evening. Alternating field for dark sections, kept from current brand. |
| `--beam` | `#F27830` | Locked brand orange. Repurposed: it is golden-hour light — glows, beams, illuminated edges, the lit CTA. Almost never a flat fill. Scarcity makes it expensive. |
| `--gold` | `#FFB200` | The sun's edge. Rarer than beam. Eyebrows, fine rules on nightfall, award moments. |
| `--ink` | `#141413` | Text on cloud. Near-black, warm. |
| `--dusk-ink` | `#F2EFE8` | Text on nightfall. Never pure white. |
| `--dust` | `#6E6A61` | Muted text, captions. |
| `--hairline` | `#E1DCD1` | Rules and borders on cloud. |
| Spectrum set | `#4A8ECF` T · `#FFB200` E · `#F27830` A · `#5DB8A6` M · `#5DB872` U | The prism split. These five already exist in the brand palette — the spectrum was hiding in it. They appear ONLY when the beam splits (TEAMUP moments, the signature sequence). Nowhere else, ever. |

Texture: film grain at 4% over everything (SVG turbulence); dust motes in light beams via WebGL, drifting with faint swarm behavior — alive, never random, and never literal insects. No gradient blobs, no decorative shapes — anti-ornament law.

### Typography (9 fonts collapse to 4)

| Register | Face | Treatment |
|---|---|---|
| Display | Bricolage Grotesque (variable, optical sizes) | 9–13vw, line-height 0.92, letter-spacing −0.03em. Warm-brutalist character: monumental but human. The 2034-timeless voice. |
| Body | General Sans (Fontshare) | 17px, line-height 1.6, measure 55–70ch. Neutral warmth, zero corporate stiffness. |
| Micro-labels | JetBrains Mono (kept) | 11px, uppercase, +0.12em, tabular numerals. Index numbers everywhere: "01 — The Walk". The chess-clock voice. |
| Rare serif | Fraunces (kept, roman only — italics are banned repo-wide) | At most 2 moments per page. One perfectly played clear note against the hum. |

Kill: Space Grotesk, Cormorant Garamond, Poppins, SN Pro, Open Sans, Inter (as loaded family), GC Bumble (unless embedded in the logo SVG lockup).
Scale ladder: 1.414 (dramatic) for display sizes, 1.25 for UI sizes. Fluid clamp per the standard formula (display ≈ 44px @ 375 → 152px @ 1440).
Micro-typography: real quotes, balanced headlines, tabular numerals for all stats/dates/prices, no orphans. Copy voice: direct, warm, second person, minimal — bold headlines and key stats, never paragraphs where a line will do. Checkmate wordplay permitted, one per page maximum.

### Space

- Whisper-in-a-huge-room ratio: 80–90% of any viewport empty. One dominant element per viewport, strictly.
- Sections: 200–240px vertical padding desktop, 96px mobile. 12-column grid, 32px gutters, 6vw margins.
- Asymmetric drift: content alternates columns section to section — the slow dolly weave of walking.
- No hard cuts between sections; transitions are continuous (shared light, overlapping elements), per the no-hard-cuts camera rule.

### Motion (the felted click + the sphere's mass)

One personality everywhere: **heavy, calm, decisive — a felted piece landing.**

- Smooth scroll: Lenis, λ ≈ 6 (heavy, liquid). The page glides with the sphere's mass and settles decisively.
- Easing: expo.out `cubic-bezier(0.16, 1, 0.3, 1)` for all reveals; quint inOut for swaps. Bounce and elastic are banned absolutely (nothing bounces in a hushed stadium).
- Durations: micro 300ms · reveals 1000ms · transitions 1300ms · ambient 3000ms+.
- Stagger: 70ms, editorial cadence. Masked line reveals for all headlines (words rise from hidden slots).
- Images enter at scale 1.12 → 1.0 inside overflow-hidden frames.
- The muted soft click: every press = translateY(1px) + scale(0.985), 120ms in, 400ms expo settle out. Every interaction lands like a felted piece on a board.
- Velocity skew capped at 3° (calm). Reveals play once. Scrubbed sequences drive the walk.
- No audio anywhere, ever — the brand sound is "the silence before a move." The silence is a feature.
- `prefers-reduced-motion`: complete static coherence, no exceptions.

### WebGL law

Go heavy, but 3D objects are dead (killed first in the survival order). The canvas renders only **light, dust, and refraction**: golden-hour beams, dust motes with whisper-intensity swarm logic, particle formations, refraction through hexagonal cells, displacement on photography. Light is not an object. This resolves "kill 3D" with "the most beautiful site I ever used was particles morphing on scroll." Full coherence with WebGL off.

## 4. The signature (the one loud thing)

**The beam and the split.**

1. Preloader overture: cloud void → the word **WIN** alone in display type → a single beam crosses and strikes a hexagonal prism (a honeycomb cell rendered in glass) → the word itself refracts — WIN splits into the five colored threads → the threads pull apart and become the page while the four-hexagon bee mark settles quietly into the nav. One word, many colors: winning here means more than chess — the entire brand philosophy delivered in two seconds with zero copy.
2. A thin shaft of golden-hour light then persists down the entire homepage — the connective element that walks with you (sky to stadium floor), crossing section boundaries so there are no hard cuts.
3. At the TEAMUP section the beam strikes the prism again and splits into the five spectrum threads — the only place the spectrum exists.
4. At the final CTA the beam lands on a single lit square on the stadium floor: your board is waiting. Register.

Everything else on the site stays disciplined so this one device reads as "how did they do that."

Supporting cast (quiet): one or two giant, barely-visible board squares as section geography; the knight executed once — mid-page, the dust swarm gathers and holds a knight silhouette for a breath, then dissolves (the founder's favorite-site memory of particles forming objects, spent on our single figurative moment); the journey nav as a map — a thin rail of mono indices (01–05) showing where you are in the walk. The hexagon appears only as the prism and the logo itself — never as wallpaper. Honeycomb-pattern backgrounds are the bee-brand cliché and stay dead, same law as confetti.

## 5. Banned-defaults audit

- Cream + serif + terracotta AI default: dodged — canvas goes cloudy grey-warm, display goes grotesk, orange is repurposed from paint to light. Its scarcity is the defense.
- Generic SaaS hero (big number, blob, three-card row): dead. The hero is a cinematic walk-in. Stats appear as mono figures on the stadium floor, not card grids.
- Kids-programme kit (confetti, mascots, rainbow): dead by founder's order. The spectrum is not a rainbow — it appears once, as physics.
- Would this exist without this founder's answers? No: SPEC-TRUM, the felted click, the empty stadium, 48°C-under-rain, the prism split are all seed-born.

## 6. Scope and build order

All public pages + register/login/dashboard. Flows preserved (small, clearly-better improvements allowed; payment logic untouchable).

1. **Foundation** — tokens (`src/styles/`), font swap, motion primitives (Lenis, reveal system, felted-click), grain, nav/footer.
2. **Homepage** — the flagship walk: preloader, hero, journey, prism split, awards, CTA.
3. **Platform pages** — `/e4`, `/teamup`, `/taskify`: each one facet of the prism, inheriting the system.
4. **Supporting pages** — `/about`, `/why-beee`, `/faq`, `/partner`, `/privacy`, `/terms`.
5. **Transactional reskin** — `/register`, `/login`, `/dashboard`: hushed-premium, felted inputs, flows intact.
6. **Detail pass + kill test** per the checklist, then imagery pass (AI-generated: empty stadium at golden hour series, children at boards in beam light, piece-in-hand macro).

Per AGENTS.md: when fonts/design system land in code, update `docs/about.md` §12 to match. No italics anywhere, including Fraunces — roman weights only.

## 7. Kill-test target

The visitor tells someone tomorrow: **"the light followed me down the page, the dust gathered into a knight, and the beam split into colors — my kid watched it twice."**
