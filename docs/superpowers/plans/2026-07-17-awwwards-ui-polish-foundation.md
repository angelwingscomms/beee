# Awwwards UI Polish — Foundation Phase Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship the "Foundation" phase of the awwwards-level UI polish spec (`docs/superpowers/specs/2026-07-16-awwwards-ui-polish-design.md`): a fluid editorial type scale, a small spacing extension, dead-token cleanup, and a shared-component pass (buttons, cards, nav, footer, form/modal chrome) that every later page-level phase builds on.

**Architecture:** Pure CSS-token and shared-component changes to a SvelteKit 5 + Tailwind v4 site. No new pages, no new routes, no backend changes. Motion is implemented via the existing `motion` (Motion One) library wrapped in Svelte actions in `src/lib/actions/motion.ts` — this plan wires up an already-built-but-unused `motionMagnetic` action rather than inventing new motion infrastructure.

**Tech Stack:** SvelteKit 5 (runes), Tailwind v4, plain CSS custom properties (`src/styles/*.css`), `motion` (Motion One) for animation, Vitest + jsdom for tests.

## Global Constraints

- **No copy/text changes.** Every user-facing string stays byte-identical in every task below.
- **No image changes.** No image asset is added, removed, or swapped. Only CSS presentation of existing images may change (not touched in this phase — no task here modifies an `<img>` source).
- **No dev server, no build.** Per `AGENTS.md`, never run `npm run dev` / `vite` or `npm run build`. Verification is `pnpm test` (Vitest) and `pnpm run check` (svelte-kit sync + svelte-check) only.
- **snake_case** for new variables/functions in `.ts`/`.svelte` script blocks, per `AGENTS.md`.
- **Respect `@media (hover: hover)`** for any new hover-triggered transform/visual state, and **`@media (prefers-reduced-motion: reduce)`** for any new animation — per `DESIGN.md`'s existing motion convention.
- **Git workflow per `AGENTS.md`:** each task below ends with a commit. Unlike `AGENTS.md`'s literal `git add .`, scope `git add` to the exact files each task touched (this repo currently has unrelated pre-existing uncommitted changes to `.codebase-memory/*` that must NOT be swept into these commits). Push after each commit, per `AGENTS.md`; current branch is `cf`.
- **Test convention:** this repo's existing component/CSS tests (`PhoneInput.test.ts`, `BankSelect.test.ts`) assert against raw file source via `readFileSync`, not mounted-component rendering. Follow that convention for every Svelte/CSS task below. The one exception is Task 3's `motion.ts` test, which tests a plain TS function directly with jsdom DOM APIs (no Svelte involved), which is more rigorous and equally idiomatic for that file.
- Chess gameplay logic/mechanics are out of scope — no task touches `chess.css`, `chess.js`, or `svelte-chess` integration.

---

### Task 1: Design tokens — fluid display scale, spacing extension, dead-token cleanup

**Files:**
- Modify: `src/styles/variables.css`
- Modify: `DESIGN.md`
- Test: `src/styles/variables.test.ts`

**Interfaces:**
- Consumes: nothing new.
- Produces: new CSS custom properties on `:root`, available globally to every later task and every page: `--fs-display-2xl`, `--fs-display-xl`, `--fs-display-lg`, `--fs-display-md`, `--fs-display-sm` (fluid `clamp()` font sizes), `--space-0` (4px), `--space-7` (96px), `--space-8` (128px). Removes dead custom properties: `--gold`, `--text`, `--muted-dark`, `--ink-dark`, `--cream`, `--panel`, `--panel-strong`, `--line`, `--gold-dark`, `--green`, `--glass-bg`, `--glass-border`, `--cursor-size`, `--sticky-cta-z` (all verified zero-usage via `grep -rE "var\(--<token>" src`).

- [ ] **Step 1: Write the failing test**

Create `src/styles/variables.test.ts`:

```ts
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

const css = readFileSync(resolve(process.cwd(), 'src/styles/variables.css'), 'utf8');

describe('variables.css design tokens', () => {
  it('defines the fluid display type scale', () => {
    expect(css).toContain('--fs-display-2xl: clamp(3rem, 1.4rem + 7vw, 7.5rem);');
    expect(css).toContain('--fs-display-xl: clamp(2.5rem, 1.4rem + 5vw, 5.75rem);');
    expect(css).toContain('--fs-display-lg: clamp(2.125rem, 1.4rem + 3.2vw, 4rem);');
    expect(css).toContain('--fs-display-md: clamp(1.75rem, 1.35rem + 1.8vw, 2.75rem);');
    expect(css).toContain('--fs-display-sm: clamp(1.375rem, 1.2rem + 0.8vw, 1.75rem);');
  });

  it('extends the spacing scale', () => {
    expect(css).toContain('--space-0: 4px;');
    expect(css).toContain('--space-7: 96px;');
    expect(css).toContain('--space-8: 128px;');
  });

  it('removes dead legacy alias tokens', () => {
    expect(css).not.toContain('--gold:');
    expect(css).not.toContain('--muted-dark:');
    expect(css).not.toContain('--ink-dark:');
    expect(css).not.toContain('--cream:');
    expect(css).not.toContain('--panel:');
    expect(css).not.toContain('--panel-strong:');
    expect(css).not.toContain('--sticky-cta-z:');
  });

  it('keeps tokens that are still consumed elsewhere', () => {
    expect(css).toContain('--glass-blur: 16px;');
    expect(css).toContain('--noise-opacity: 0.03;');
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `pnpm exec vitest run src/styles/variables.test.ts`
Expected: FAIL — the new tokens don't exist yet and the dead tokens are still present.

- [ ] **Step 3: Edit `src/styles/variables.css`**

Replace the opening of the file (the legacy alias block) — find:

```css
:root {
  --gold: var(--accent-amber);
  --text: var(--on-dark);
  --muted-dark: var(--on-dark-soft);
  --ink-dark: var(--ink);
  --cream: var(--canvas);
  --panel: var(--surface-dark-elevated);
  --panel-strong: var(--surface-dark-elevated);
  --line: rgba(255, 255, 255, 0.10);
  --gold-dark: var(--accent-amber);
  --green: var(--accent-teal);

  --glass-bg: rgba(255, 255, 255, 0.06);
  --glass-border: rgba(255, 255, 255, 0.10);
  --glass-blur: 16px;
  --noise-opacity: 0.03;
  --cursor-size: 24px;
  --sticky-cta-z: 90;

  --primary: #F27830;
```

Replace with:

```css
:root {
  --glass-blur: 16px;
  --noise-opacity: 0.03;

  --primary: #F27830;
```

Then find the end of the file:

```css
  --space-1: 8px;
  --space-2: 16px;
  --space-3: 24px;
  --space-4: 32px;
  --space-5: 48px;
  --space-6: 72px;
  --radius-pill: 999px;
}
```

Replace with:

```css
  --space-1: 8px;
  --space-2: 16px;
  --space-3: 24px;
  --space-4: 32px;
  --space-5: 48px;
  --space-6: 72px;
  --radius-pill: 999px;

  /* Fluid editorial display scale — headline sizes that scale with viewport */
  --fs-display-2xl: clamp(3rem, 1.4rem + 7vw, 7.5rem);
  --fs-display-xl: clamp(2.5rem, 1.4rem + 5vw, 5.75rem);
  --fs-display-lg: clamp(2.125rem, 1.4rem + 3.2vw, 4rem);
  --fs-display-md: clamp(1.75rem, 1.35rem + 1.8vw, 2.75rem);
  --fs-display-sm: clamp(1.375rem, 1.2rem + 0.8vw, 1.75rem);

  --space-0: 4px;
  --space-7: 96px;
  --space-8: 128px;
}
```

- [ ] **Step 4: Update `DESIGN.md`**

In the `## Type` section, find:

```markdown
- Pairing: Space Grotesk + Inter for the modern marketing feel; Cormorant for accent moments.
```

Replace with:

```markdown
- Pairing: Space Grotesk + Inter for the modern marketing feel; Cormorant for accent moments.
- Fluid display scale — `--fs-display-2xl` (48–120px) through `--fs-display-sm` (22–28px), each a `clamp()` that grows with viewport width. Use these for headline type instead of hardcoding pixel `font-size`s.
```

- [ ] **Step 5: Run test to verify it passes**

Run: `pnpm exec vitest run src/styles/variables.test.ts`
Expected: PASS (4 tests)

- [ ] **Step 6: Run full test suite and type-check**

Run: `pnpm test && pnpm run check`
Expected: all existing tests still pass; no new type errors (this task touches no `.ts`/`.svelte` script code, so `check` should be a no-op confirmation).

- [ ] **Step 7: Commit**

```bash
git add src/styles/variables.css DESIGN.md src/styles/variables.test.ts
git commit -m "design tokens: fluid display scale, spacing extension, remove dead legacy aliases

Adds --fs-display-2xl..sm (clamp-based fluid headline sizes) and
--space-0/7/8 for the awwwards UI polish pass. Removes 14 confirmed
zero-usage legacy CSS variables from variables.css (verified via
grep -rE \"var\\(--token\" across src/). agent: claude"
git push
```

---

### Task 2: Apply fluid display scale to shared headline classes

**Files:**
- Modify: `src/styles/hero.css`
- Test: `src/styles/hero.test.ts`

**Interfaces:**
- Consumes: `--fs-display-2xl`, `--fs-display-xl`, `--fs-display-lg`, `--fs-display-md` from Task 1's `variables.css`.
- Produces: `.display-xl`, `.display-lg`, `.display-md`, `.display-sm` (used today in `FaqHero.svelte`, `FaqContact.svelte`, `src/routes/design/+page.svelte`, `src/routes/i/+page.svelte`) now scale fluidly with viewport instead of using static pixel sizes. Class names and selectors are unchanged — this is a values-only change, safe for every existing consumer.

- [ ] **Step 1: Write the failing test**

Create `src/styles/hero.test.ts`:

```ts
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

const css = readFileSync(resolve(process.cwd(), 'src/styles/hero.css'), 'utf8');

describe('hero.css display type scale', () => {
  it('makes .display-xl fluid using the new token', () => {
    expect(css).toContain('.display-xl {\n  max-width: 780px;\n  font-size: var(--fs-display-2xl);\n  line-height: 1.05;\n}');
  });

  it('makes .display-lg, .display-md, .display-sm fluid using the new tokens', () => {
    expect(css).toContain('font-size: var(--fs-display-xl);');
    expect(css).toContain('font-size: var(--fs-display-lg);');
    expect(css).toContain('font-size: var(--fs-display-md);');
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `pnpm exec vitest run src/styles/hero.test.ts`
Expected: FAIL — `.display-xl` still hardcodes `font-size: 48px;`.

- [ ] **Step 3: Edit `src/styles/hero.css`**

Find:

```css
.display-xl {
  max-width: 680px;
  font-size: 48px;
  line-height: 1.1;
}

.display-lg {
  font-size: 48px;
  line-height: 1.1;
}

.display-md {
  font-size: 36px;
  line-height: 1.15;
}

.display-sm {
  font-size: 28px;
  line-height: 1.2;
}
```

Replace with:

```css
.display-xl {
  max-width: 780px;
  font-size: var(--fs-display-2xl);
  line-height: 1.05;
}

.display-lg {
  font-size: var(--fs-display-xl);
  line-height: 1.08;
}

.display-md {
  font-size: var(--fs-display-lg);
  line-height: 1.12;
}

.display-sm {
  font-size: var(--fs-display-md);
  line-height: 1.18;
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `pnpm exec vitest run src/styles/hero.test.ts`
Expected: PASS (2 tests)

- [ ] **Step 5: Run full test suite**

Run: `pnpm test`
Expected: all tests pass, including Task 1's `variables.test.ts`.

- [ ] **Step 6: Commit**

```bash
git add src/styles/hero.css src/styles/hero.test.ts
git commit -m "hero.css: make shared display headline classes fluid

.display-xl/lg/md/sm now use the --fs-display-* clamp() tokens from
variables.css instead of static pixel sizes, so headlines using these
classes (FaqHero, FaqContact, /design, /i) scale with viewport instead
of capping at 48px. agent: claude"
git push
```

---

### Task 3: Wire the existing `motionMagnetic` action into the shared Button component

**Files:**
- Modify: `src/lib/actions/motion.ts:102-127`
- Modify: `src/lib/components/Button.svelte`
- Test: `src/lib/actions/motion.test.ts`
- Test: `src/lib/components/Button.test.ts`

**Interfaces:**
- Consumes: nothing new (the `motionMagnetic` export already exists in `motion.ts`, currently unused everywhere).
- Produces: `motionMagnetic(node: HTMLElement)` now composes a cursor-following translate with a press-scale (`mousedown`/`mouseup`), returning `{ destroy(): void } | undefined` (unchanged shape). `Button.svelte`'s rendered `<a>`/`<button>` root now has `use:motionMagnetic` applied. On touch devices and `prefers-reduced-motion: reduce`, the action is a no-op (existing early return), so `buttons.css`'s existing `:hover`/`:active` CSS transforms remain the functional fallback there — no CSS changes needed in `buttons.css`.

- [ ] **Step 1: Write the failing test for `motionMagnetic`**

Create `src/lib/actions/motion.test.ts`:

```ts
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { motionMagnetic } from './motion';

beforeEach(() => {
  vi.stubGlobal('matchMedia', vi.fn().mockReturnValue({ matches: false }));
});

afterEach(() => {
  vi.unstubAllGlobals();
});

describe('motionMagnetic', () => {
  it('translates the node toward the cursor on mousemove', () => {
    const node = document.createElement('button');
    document.body.appendChild(node);
    motionMagnetic(node);

    // getBoundingClientRect() is 0/0/0/0 in jsdom, so the node's center is (0, 0)
    node.dispatchEvent(new MouseEvent('mousemove', { clientX: 40, clientY: 24 }));

    expect(node.style.transform).toBe('translate(5px, 3px) scale(1)');
  });

  it('scales down on mousedown and back up on mouseup', () => {
    const node = document.createElement('button');
    document.body.appendChild(node);
    motionMagnetic(node);

    node.dispatchEvent(new MouseEvent('mousedown'));
    expect(node.style.transform).toBe('translate(0px, 0px) scale(0.97)');

    node.dispatchEvent(new MouseEvent('mouseup'));
    expect(node.style.transform).toBe('translate(0px, 0px) scale(1)');
  });

  it('resets to origin on mouseleave', () => {
    const node = document.createElement('button');
    document.body.appendChild(node);
    motionMagnetic(node);

    node.dispatchEvent(new MouseEvent('mousemove', { clientX: 40, clientY: 24 }));
    node.dispatchEvent(new MouseEvent('mouseleave'));

    expect(node.style.transform).toBe('translate(0px, 0px) scale(1)');
  });

  it('removes all listeners when destroyed', () => {
    const node = document.createElement('button');
    document.body.appendChild(node);
    const handle = motionMagnetic(node);

    handle?.destroy();
    node.dispatchEvent(new MouseEvent('mousemove', { clientX: 40, clientY: 24 }));

    expect(node.style.transform).toBe('');
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `pnpm exec vitest run src/lib/actions/motion.test.ts`
Expected: FAIL — current `motionMagnetic` doesn't compose a press-scale, so `translate(5px, 3px) scale(1)` etc. don't match its current `translate(5px, 3px)` output (no `scale(...)`).

- [ ] **Step 3: Edit `src/lib/actions/motion.ts`**

Find (lines 102-127):

```ts
export function motionMagnetic(node: HTMLElement) {
  if (prefersReducedMotion() || isTouchDevice()) return;

  const onMove = (e: MouseEvent) => {
    const rect = node.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / 8;
    const dy = (e.clientY - cy) / 8;
    node.style.transform = `translate(${dx}px, ${dy}px)`;
  };

  const onLeave = () => {
    node.style.transform = 'translate(0, 0)';
  };

  node.addEventListener('mousemove', onMove);
  node.addEventListener('mouseleave', onLeave);

  return {
    destroy() {
      node.removeEventListener('mousemove', onMove);
      node.removeEventListener('mouseleave', onLeave);
    },
  };
}
```

Replace with:

```ts
export function motionMagnetic(node: HTMLElement) {
  if (prefersReducedMotion() || isTouchDevice()) return;

  let tx = 0;
  let ty = 0;
  let pressed = false;

  const apply = () => {
    node.style.transform = `translate(${tx}px, ${ty}px) scale(${pressed ? 0.97 : 1})`;
  };

  const onMove = (e: MouseEvent) => {
    const rect = node.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    tx = (e.clientX - cx) / 8;
    ty = (e.clientY - cy) / 8;
    apply();
  };

  const onLeave = () => {
    tx = 0;
    ty = 0;
    pressed = false;
    apply();
  };

  const onDown = () => {
    pressed = true;
    apply();
  };

  const onUp = () => {
    pressed = false;
    apply();
  };

  node.addEventListener('mousemove', onMove);
  node.addEventListener('mouseleave', onLeave);
  node.addEventListener('mousedown', onDown);
  node.addEventListener('mouseup', onUp);

  return {
    destroy() {
      node.removeEventListener('mousemove', onMove);
      node.removeEventListener('mouseleave', onLeave);
      node.removeEventListener('mousedown', onDown);
      node.removeEventListener('mouseup', onUp);
    },
  };
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `pnpm exec vitest run src/lib/actions/motion.test.ts`
Expected: PASS (4 tests)

- [ ] **Step 5: Write the failing test for `Button.svelte`**

Create `src/lib/components/Button.test.ts`:

```ts
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

const button = readFileSync(resolve(process.cwd(), 'src/lib/components/Button.svelte'), 'utf8');

describe('Button component', () => {
  it('imports the magnetic hover action', () => {
    expect(button).toContain("import { motionMagnetic } from '$lib/actions/motion';");
  });

  it('applies magnetic hover to both the link and button variants', () => {
    expect(button).toContain('<a {href} class="btn {className}" style={bg_style} use:motionMagnetic>');
    expect(button).toContain('<button {disabled} {onclick} class="btn {className}" style={bg_style} use:motionMagnetic>');
  });
});
```

- [ ] **Step 6: Run test to verify it fails**

Run: `pnpm exec vitest run src/lib/components/Button.test.ts`
Expected: FAIL — `Button.svelte` doesn't import or use `motionMagnetic` yet.

- [ ] **Step 7: Edit `src/lib/components/Button.svelte`**

Find:

```svelte
<script lang="ts">
  let {
```

Replace with:

```svelte
<script lang="ts">
  import { motionMagnetic } from '$lib/actions/motion';

  let {
```

Find:

```svelte
{#if href}
  <a {href} class="btn {className}" style={bg_style}>
    {#if children}{@render children()}{:else}Register Now{/if}
  </a>
{:else}
  <button {disabled} {onclick} class="btn {className}" style={bg_style}>
    {#if children}{@render children()}{:else}Register{/if}
  </button>
{/if}
```

Replace with:

```svelte
{#if href}
  <a {href} class="btn {className}" style={bg_style} use:motionMagnetic>
    {#if children}{@render children()}{:else}Register Now{/if}
  </a>
{:else}
  <button {disabled} {onclick} class="btn {className}" style={bg_style} use:motionMagnetic>
    {#if children}{@render children()}{:else}Register{/if}
  </button>
{/if}
```

- [ ] **Step 8: Run test to verify it passes**

Run: `pnpm exec vitest run src/lib/components/Button.test.ts`
Expected: PASS (2 tests)

- [ ] **Step 9: Run full test suite and type-check**

Run: `pnpm test && pnpm run check`
Expected: all tests pass (including the two new files); no type errors.

- [ ] **Step 10: Commit**

```bash
git add src/lib/actions/motion.ts src/lib/actions/motion.test.ts src/lib/components/Button.svelte src/lib/components/Button.test.ts
git commit -m "wire up existing motionMagnetic action on the shared Button component

motionMagnetic already existed in motion.ts but had zero call sites.
Extends it to compose a press-scale with the cursor-follow translate,
then applies use:motionMagnetic to both the <a> and <button> variants
rendered by Button.svelte, so every shared-Button CTA site-wide gets
magnetic hover on desktop pointer devices. No changes needed in
buttons.css: motionMagnetic no-ops on touch/reduced-motion, so the
existing :hover/:active CSS transforms remain the functional fallback
there. agent: claude"
git push
```

---

### Task 4: Elevate the shared feature/benefit card treatment

**Files:**
- Modify: `src/styles/cards.css:7-31` and `:44-59`
- Test: `src/styles/cards.test.ts`

**Interfaces:**
- Consumes: nothing new.
- Produces: `.feature-card` and `.benefit-card` (used across the marketing pages' `feature-grid`/`benefits-grid` layouts) gain a layered shadow + border glow on hover (gated behind `@media (hover: hover)`), and `.feature-card`'s `.spike-mark` icon gets a hover scale/rotate. Class names unchanged.

- [ ] **Step 1: Write the failing test**

Create `src/styles/cards.test.ts`:

```ts
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

const css = readFileSync(resolve(process.cwd(), 'src/styles/cards.css'), 'utf8');

describe('cards.css shared card treatment', () => {
  it('gates feature-card hover lift behind (hover: hover)', () => {
    expect(css).toContain('@media (hover: hover) {\n  .feature-card:hover {');
  });

  it('adds a layered shadow and border glow on feature-card hover', () => {
    expect(css).toContain('box-shadow: 0 16px 40px rgba(242, 120, 48, 0.14), 0 4px 12px rgba(20, 20, 19, 0.06);');
  });

  it('scales the spike-mark icon on feature-card hover', () => {
    expect(css).toContain('.feature-card:hover .spike-mark {\n    transform: scale(1.12) rotate(-4deg);\n  }');
  });

  it('gates benefit-card hover behind (hover: hover) and removes the duplicate transition declaration', () => {
    expect(css).toContain('@media (hover: hover) {\n  .benefit-card:hover {');
    const block = css.slice(css.indexOf('.benefit-card {'), css.indexOf('.benefit-card.in-view'));
    const transitionCount = (block.match(/transition:/g) || []).length;
    expect(transitionCount).toBe(1);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `pnpm exec vitest run src/styles/cards.test.ts`
Expected: FAIL — none of the new hover treatment exists yet.

- [ ] **Step 3: Edit `src/styles/cards.css`**

Find:

```css
.feature-card {
  min-height: 230px;
  border-radius: 12px;
  background: var(--surface-card);
  padding: 32px;
  color: var(--ink);
  transition: transform 240ms ease, box-shadow 240ms ease, background 240ms ease;
}

.feature-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 28px rgba(242, 120, 48, 0.08);
  background: color-mix(in srgb, var(--surface-card) 94%, var(--primary));
}

.feature-card .spike-mark {
  margin-bottom: 28px;
  color: var(--primary);
}
```

Replace with:

```css
.feature-card {
  min-height: 230px;
  border-radius: 14px;
  border: 1px solid transparent;
  background: var(--surface-card);
  padding: 32px;
  color: var(--ink);
  box-shadow: 0 1px 2px rgba(20, 20, 19, 0.04);
  transition: transform 240ms ease, box-shadow 240ms ease, background 240ms ease, border-color 240ms ease;
}

@media (hover: hover) {
  .feature-card:hover {
    transform: translateY(-4px);
    border-color: color-mix(in srgb, var(--primary) 30%, transparent);
    box-shadow: 0 16px 40px rgba(242, 120, 48, 0.14), 0 4px 12px rgba(20, 20, 19, 0.06);
    background: color-mix(in srgb, var(--surface-card) 94%, var(--primary));
  }

  .feature-card:hover .spike-mark {
    transform: scale(1.12) rotate(-4deg);
  }
}

.feature-card .spike-mark {
  margin-bottom: 28px;
  color: var(--primary);
  transition: transform 240ms ease;
}
```

Find:

```css
.benefit-card {
  min-height: 230px;
  border-radius: 12px;
  background: var(--surface-card);
  padding: 32px;
  color: var(--ink);
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.6s ease, transform 0.6s ease;
  transition: opacity 0.6s ease, transform 0.6s ease, box-shadow 240ms ease, background 240ms ease;
}

.benefit-card:hover {
  box-shadow: 0 8px 28px rgba(242, 120, 48, 0.08);
  background: color-mix(in srgb, var(--surface-card) 94%, var(--primary));
}
```

Replace with:

```css
.benefit-card {
  min-height: 230px;
  border-radius: 14px;
  border: 1px solid transparent;
  background: var(--surface-card);
  padding: 32px;
  color: var(--ink);
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.6s ease, transform 0.6s ease, box-shadow 240ms ease, background 240ms ease, border-color 240ms ease;
}

@media (hover: hover) {
  .benefit-card:hover {
    border-color: color-mix(in srgb, var(--primary) 30%, transparent);
    box-shadow: 0 16px 40px rgba(242, 120, 48, 0.14), 0 4px 12px rgba(20, 20, 19, 0.06);
    background: color-mix(in srgb, var(--surface-card) 94%, var(--primary));
  }
}
```

> Note: the two `Find` blocks above are copied verbatim from the current `cards.css` (confirmed via direct file read while writing this plan). If a `git diff` shows the file no longer matches exactly, re-read `cards.css` first and match on the unique `.feature-card:hover {` / `.benefit-card:hover {` selectors rather than the full excerpt.

- [ ] **Step 4: Run test to verify it passes**

Run: `pnpm exec vitest run src/styles/cards.test.ts`
Expected: PASS (4 tests)

- [ ] **Step 5: Run full test suite**

Run: `pnpm test`
Expected: all tests pass.

- [ ] **Step 6: Commit**

```bash
git add src/styles/cards.css src/styles/cards.test.ts
git commit -m "cards.css: layered shadow + border glow on feature/benefit card hover

Gates the existing hover lift behind @media (hover: hover) (previously
ungated, so it stuck after tap on touch devices), adds a two-layer
shadow + amber border glow consistent with the awwwards polish
direction, and scales the spike-mark icon on hover. Also removes a
pre-existing duplicate `transition` declaration on .benefit-card.
agent: claude"
git push
```

---

### Task 5: Nav — scroll-aware condense + animated active-link underline

**Files:**
- Modify: `src/lib/components/championship/ChampNav.svelte`
- Test: `src/lib/components/championship/ChampNav.test.ts`

**Interfaces:**
- Consumes: nothing new.
- Produces: `ChampNav.svelte` (the site-wide nav, mounted once in `src/routes/+layout.svelte`) gains a `scrolled` local state that toggles a `.scrolled` class on `.champ-nav` once `window.scrollY > 24`, condensing the nav's `top` offset/width/height. The active-link indicator moves from a static `border-bottom` hack to an animated `::after` underline shared between hover and active states.

- [ ] **Step 1: Write the failing test**

Create `src/lib/components/championship/ChampNav.test.ts`:

```ts
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

const nav = readFileSync(resolve(process.cwd(), 'src/lib/components/championship/ChampNav.svelte'), 'utf8');

describe('ChampNav scroll-aware condense', () => {
  it('tracks a scrolled state via a scroll listener', () => {
    expect(nav).toContain('let scrolled = $state(false);');
    expect(nav).toContain("window.addEventListener('scroll', on_scroll, { passive: true });");
  });

  it('applies the scrolled class to the nav root', () => {
    expect(nav).toContain('<nav class="champ-nav" class:open class:scrolled>');
  });

  it('condenses top offset and width when scrolled', () => {
    expect(nav).toContain('.champ-nav.scrolled {\n    top: 12px;\n    width: min(1080px, calc(100% - 32px));\n  }');
  });
});

describe('ChampNav active link indicator', () => {
  it('uses an animated underline instead of a static border-bottom', () => {
    expect(nav).toContain('.champ-nav-links a::after {');
    expect(nav).toContain('.champ-nav-links a.active::after {\n    transform: scaleX(1);\n  }');
  });

  it('gates the hover underline behind (hover: hover)', () => {
    expect(nav).toContain('@media (hover: hover) {\n    .champ-nav-links a:hover::after {');
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `pnpm exec vitest run src/lib/components/championship/ChampNav.test.ts`
Expected: FAIL — none of this exists yet.

- [ ] **Step 3: Edit the script block**

Find:

```svelte
<script lang="ts">
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';

  import Button from '$lib/components/Button.svelte';

  let open = $state(false);
  let path = $derived($page.url.pathname);
  let user = $derived($page.data.user);
  let logging_out = $state(false);

  async function logout() {
```

Replace with:

```svelte
<script lang="ts">
  import { onMount } from 'svelte';
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';

  import Button from '$lib/components/Button.svelte';

  let open = $state(false);
  let scrolled = $state(false);
  let path = $derived($page.url.pathname);
  let user = $derived($page.data.user);
  let logging_out = $state(false);

  onMount(() => {
    const on_scroll = () => { scrolled = window.scrollY > 24; };
    on_scroll();
    window.addEventListener('scroll', on_scroll, { passive: true });
    return () => window.removeEventListener('scroll', on_scroll);
  });

  async function logout() {
```

- [ ] **Step 4: Edit the markup**

Find:

```svelte
<nav class="champ-nav" class:open>
```

Replace with:

```svelte
<nav class="champ-nav" class:open class:scrolled>
```

- [ ] **Step 5: Edit the `.champ-nav` base rule**

Find:

```css
  .champ-nav {
    position: fixed;
    top: 24px;
    left: 50%;
    translate: -50% 0;
    z-index: 50;
    width: min(1200px, calc(100% - 32px));
    border-radius: 999px;
    isolation: isolate;
  }
```

Replace with:

```css
  .champ-nav {
    position: fixed;
    top: 24px;
    left: 50%;
    translate: -50% 0;
    z-index: 50;
    width: min(1200px, calc(100% - 32px));
    border-radius: 999px;
    isolation: isolate;
    transition: top 240ms ease, width 240ms ease;
  }

  .champ-nav.scrolled {
    top: 12px;
    width: min(1080px, calc(100% - 32px));
  }

  .champ-nav.scrolled .champ-nav-inner {
    height: 48px;
  }

  @media (prefers-reduced-motion: reduce) {
    .champ-nav {
      transition: none;
    }
  }
```

- [ ] **Step 6: Edit the nav-link + active-link rules**

Find:

```css
  .champ-nav-links a {
    padding: 10px 22px;
    border-radius: 999px;
    font-size: 15px;
    font-weight: 500;
    color: var(--ink);
    text-decoration: none;
    transition: background 160ms ease, color 160ms ease;
  }
```

Replace with:

```css
  .champ-nav-links a {
    position: relative;
    padding: 10px 22px;
    border-radius: 999px;
    font-size: 15px;
    font-weight: 500;
    color: var(--ink);
    text-decoration: none;
    transition: background 160ms ease, color 160ms ease;
  }

  .champ-nav-links a::after {
    content: '';
    position: absolute;
    left: 22px;
    right: 22px;
    bottom: 6px;
    height: 2px;
    border-radius: 999px;
    background: var(--primary);
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 220ms ease;
  }

  .champ-nav-links a.active::after {
    transform: scaleX(1);
  }

  @media (hover: hover) {
    .champ-nav-links a:hover::after {
      transform: scaleX(1);
    }
  }
```

Find:

```css
  .champ-nav-links a.active {
    color: var(--primary);
    border-bottom: 2px solid var(--primary);
    padding-bottom: 8px;
    background: transparent;
  }
```

Replace with:

```css
  .champ-nav-links a.active {
    color: var(--primary);
    background: transparent;
  }
```

- [ ] **Step 7: Run test to verify it passes**

Run: `pnpm exec vitest run src/lib/components/championship/ChampNav.test.ts`
Expected: PASS (5 tests)

- [ ] **Step 8: Run full test suite and type-check**

Run: `pnpm test && pnpm run check`
Expected: all tests pass; no type errors.

- [ ] **Step 9: Commit**

```bash
git add src/lib/components/championship/ChampNav.svelte src/lib/components/championship/ChampNav.test.ts
git commit -m "ChampNav: scroll-aware condense + animated active-link underline

Nav now tracks window.scrollY and adds a .scrolled class past 24px,
shrinking its top offset/width/height for a condensed pill on scroll.
Replaces the static border-bottom active-link style with a shared
animated ::after underline used for both hover and active states,
gated behind @media (hover: hover). agent: claude"
git push
```

---

### Task 6: Footer — editorial rework

**Files:**
- Modify: `src/lib/components/home/Footer.svelte`
- Test: `src/lib/components/home/Footer.test.ts`

**Interfaces:**
- Consumes: `--fs-display-md` from Task 1, existing `--navy-blob` token (already defined in `variables.css`, previously unused in `Footer.svelte`).
- Produces: `Footer.svelte` (mounted once in `src/routes/+layout.svelte`, appears on every page) gets a layered gradient-mesh background instead of flat navy, an asymmetric two-column `.footer-top` grid on desktop (stacking to one column under 768px, unchanged from before), a fluid headline size on `.footer-event`, and a hover shift on footer nav links.

- [ ] **Step 1: Write the failing test**

Create `src/lib/components/home/Footer.test.ts`:

```ts
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

const footer = readFileSync(resolve(process.cwd(), 'src/lib/components/home/Footer.svelte'), 'utf8');

describe('Footer editorial rework', () => {
  it('layers a navy-blob gradient mesh behind the flat navy background', () => {
    expect(footer).toContain('radial-gradient(1100px 460px at 12% -15%, color-mix(in srgb, var(--navy-blob) 55%, transparent), transparent 70%),');
  });

  it('uses the fluid display token for the event headline', () => {
    expect(footer).toContain('font-size: var(--fs-display-md);');
  });

  it('splits footer-top into an asymmetric grid on desktop and stacks it on mobile', () => {
    expect(footer).toContain('grid-template-columns: minmax(0, 1.4fr) minmax(0, 1fr);');
    expect(footer).toContain('.footer-top {\n      grid-template-columns: 1fr;\n      gap: 20px;\n    }');
  });

  it('gates the footer nav hover shift behind (hover: hover)', () => {
    expect(footer).toContain('@media (hover: hover) {\n    .footer-nav a:hover {');
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `pnpm exec vitest run src/lib/components/home/Footer.test.ts`
Expected: FAIL — none of this exists yet.

- [ ] **Step 3: Edit the `.footer` background**

Find:

```css
  .footer {
    position: relative;
    padding: 56px 0 40px;
    background: var(--color-navy);
    color: var(--on-dark-soft);
  }
```

Replace with:

```css
  .footer {
    position: relative;
    padding: 72px 0 40px;
    background:
      radial-gradient(1100px 460px at 12% -15%, color-mix(in srgb, var(--navy-blob) 55%, transparent), transparent 70%),
      var(--color-navy);
    color: var(--on-dark-soft);
    overflow: hidden;
  }
```

- [ ] **Step 4: Edit `.footer-top`**

Find:

```css
  .footer-top {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 20px;
  }
```

Replace with:

```css
  .footer-top {
    display: grid;
    grid-template-columns: minmax(0, 1.4fr) minmax(0, 1fr);
    align-items: start;
    gap: 40px;
  }
```

- [ ] **Step 5: Edit `.footer-event`**

Find:

```css
  .footer-event {
    font-family: var(--font-display);
    font-size: 32px;
    font-weight: 500;
    line-height: 1.2;
    letter-spacing: -0.01em;
    color: var(--on-dark);
    margin: 0;
    max-width: 540px;
  }
```

Replace with:

```css
  .footer-event {
    font-family: var(--font-display);
    font-size: var(--fs-display-md);
    font-weight: 500;
    line-height: 1.12;
    letter-spacing: -0.01em;
    color: var(--on-dark);
    margin: 0;
    max-width: 620px;
  }
```

- [ ] **Step 6: Edit `.footer-nav a` hover**

Find:

```css
  .footer-nav a {
    font-size: 18px;
    font-weight: 500;
    line-height: 1.4;
    color: var(--on-dark-soft);
    text-decoration: none;
    transition: color 160ms ease;
    white-space: nowrap;
  }

  .footer-nav a:hover {
    color: var(--primary);
  }
```

Replace with:

```css
  .footer-nav a {
    display: inline-block;
    font-size: 18px;
    font-weight: 500;
    line-height: 1.4;
    color: var(--on-dark-soft);
    text-decoration: none;
    transition: color 160ms ease, transform 160ms ease;
    white-space: nowrap;
  }

  @media (hover: hover) {
    .footer-nav a:hover {
      color: var(--primary);
      transform: translateX(2px);
    }
  }
```

- [ ] **Step 7: Update the mobile media query**

Find:

```css
  @media (max-width: 767px) {
    .footer {
      padding: 40px 0 32px;
    }

    .footer-top {
      flex-direction: column;
      gap: 20px;
    }

    .footer-bottom {
      flex-direction: column;
      align-items: flex-start;
      gap: 12px;
    }
  }
```

Replace with:

```css
  @media (max-width: 767px) {
    .footer {
      padding: 40px 0 32px;
    }

    .footer-top {
      grid-template-columns: 1fr;
      gap: 20px;
    }

    .footer-bottom {
      flex-direction: column;
      align-items: flex-start;
      gap: 12px;
    }
  }
```

- [ ] **Step 8: Run test to verify it passes**

Run: `pnpm exec vitest run src/lib/components/home/Footer.test.ts`
Expected: PASS (4 tests)

- [ ] **Step 9: Run full test suite**

Run: `pnpm test`
Expected: all tests pass.

- [ ] **Step 10: Commit**

```bash
git add src/lib/components/home/Footer.svelte src/lib/components/home/Footer.test.ts
git commit -m "Footer: editorial rework — gradient mesh, asymmetric grid, fluid type

Layers a radial navy-blob gradient behind the flat navy background for
depth, splits footer-top into an asymmetric 1.4fr/1fr grid on desktop
(stacks to one column under 768px, same as before), sizes the event
headline with --fs-display-md instead of a static 32px, and adds a
gated hover shift to footer nav links. No copy or image changes.
agent: claude"
git push
```

---

### Task 7: Form input focus states + modal depth

**Files:**
- Modify: `src/styles/forms.css:126-141`
- Modify: `src/styles/modal.css:12-19`
- Test: `src/styles/forms-modal.test.ts`

**Interfaces:**
- Consumes: nothing new.
- Produces: `.text-input`/`.text-area` (used in `RegistrationForm.svelte`, `PlayerInput.svelte`, `dashboard/partner/+page.svelte`, `/i` login form, `/design`) get a visible `border` and a `:focus-visible` ring. `.modal-card` gets a layered drop shadow. This closes a gap where `src/routes/design/+page.svelte` already documents an `.input-focus` demo class (`border: 2px solid var(--primary); box-shadow: 0 0 0 3px rgba(255,102,0,0.15);`) that was never wired to the real `:focus` state on the actual input classes.

- [ ] **Step 1: Write the failing test**

Create `src/styles/forms-modal.test.ts`:

```ts
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

const forms = readFileSync(resolve(process.cwd(), 'src/styles/forms.css'), 'utf8');
const modal = readFileSync(resolve(process.cwd(), 'src/styles/modal.css'), 'utf8');

describe('forms.css focus states', () => {
  it('gives text inputs and textareas a visible border', () => {
    expect(forms).toContain('border: 1px solid var(--hairline);');
  });

  it('wires up the focus-visible ring documented on the /design page', () => {
    expect(forms).toContain(
      '.text-input:focus-visible,\n.text-area:focus-visible {\n  border-color: var(--primary);\n  box-shadow: 0 0 0 3px rgba(255, 102, 0, 0.15);\n}'
    );
  });
});

describe('modal.css depth', () => {
  it('gives modal-card a layered shadow', () => {
    expect(modal).toContain('box-shadow: 0 24px 70px rgba(10, 15, 26, 0.28), 0 4px 16px rgba(10, 15, 26, 0.12);');
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `pnpm exec vitest run src/styles/forms-modal.test.ts`
Expected: FAIL — no border/focus-visible rule on `.text-input`/`.text-area` yet, no shadow on `.modal-card`.

- [ ] **Step 3: Edit `src/styles/forms.css`**

Find:

```css
.text-input,
.text-area {
  width: 100%;
  min-height: 40px;
  font-size: 12px;
  border-radius: 8px;
  background: var(--canvas);
  color: var(--ink);
  padding: 10px 14px;
  outline: none;
}
```

Replace with:

```css
.text-input,
.text-area {
  width: 100%;
  min-height: 40px;
  font-size: 12px;
  border-radius: 8px;
  border: 1px solid var(--hairline);
  background: var(--canvas);
  color: var(--ink);
  padding: 10px 14px;
  outline: none;
  transition: border-color 160ms ease, box-shadow 160ms ease;
}

.text-input:focus-visible,
.text-area:focus-visible {
  border-color: var(--primary);
  box-shadow: 0 0 0 3px rgba(255, 102, 0, 0.15);
}
```

- [ ] **Step 4: Edit `src/styles/modal.css`**

Find:

```css
.modal-card {
  width: min(560px, 100%);
  max-height: min(820px, 92vh);
  overflow-y: auto;
  border-radius: 16px;
  background: var(--canvas);
  color: var(--body);
}
```

Replace with:

```css
.modal-card {
  width: min(560px, 100%);
  max-height: min(820px, 92vh);
  overflow-y: auto;
  border-radius: 16px;
  background: var(--canvas);
  color: var(--body);
  box-shadow: 0 24px 70px rgba(10, 15, 26, 0.28), 0 4px 16px rgba(10, 15, 26, 0.12);
}
```

- [ ] **Step 5: Run test to verify it passes**

Run: `pnpm exec vitest run src/styles/forms-modal.test.ts`
Expected: PASS (3 tests)

- [ ] **Step 6: Run full test suite**

Run: `pnpm test`
Expected: all tests pass — including a check that `.text-input` gaining a 1px border and 10px/14px padding doesn't break `PhoneInput.test.ts`'s asserted values (`PhoneInput.svelte` has its own local input styling, not `.text-input`, so this should be unaffected; confirm by reading the test output).

- [ ] **Step 7: Commit**

```bash
git add src/styles/forms.css src/styles/modal.css src/styles/forms-modal.test.ts
git commit -m "forms/modal: wire up documented focus-visible ring, add modal depth

.text-input/.text-area get a visible border and a :focus-visible ring
matching the .input-focus demo already shown on /design (that class
was previously undocumented-in-practice — never applied to the real
input classes). .modal-card gains a layered shadow for depth,
consistent with the rest of this pass. agent: claude"
git push
```

---

## After this plan

This plan covers only the **Foundation** phase of the full spec. Once it lands and has been visually reviewed in a browser (not done by the implementing agent — see the spec's Testing/Verification section: no dev server or build is run as part of this repo's rules), the next phases each get their own plan document, written after Foundation's real token/component API is locked in:

1. Homepage (`/`) — reference implementation of the new visual language.
2. Marketing pages — `/about`, `/championship`, `/taskify`, `/teamup`, `/why-beee`, `/partner`, `/faq`.
3. App/auth pages — `/login`, `/register`, `/dashboard`, `/dashboard/partner`, `/account`, `/profile`, `/payment/callback`.
4. Utility pages — `/privacy`, `/terms`, `/+error`.
