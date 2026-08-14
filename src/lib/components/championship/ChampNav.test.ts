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

  it('animates the nav inner height alongside the scroll-condense', () => {
    expect(nav).toContain('transition: height 240ms var(--ease-out);');
  });

  it('gates the nav inner height transition behind prefers-reduced-motion', () => {
    expect(nav).toContain('.champ-nav-inner {\n      transition: none;\n    }');
  });
});

describe('ChampNav news link', () => {
  it('links to the news section from the desktop and the mobile list', () => {
    expect(nav.match(/href="\/news"/g)).toHaveLength(2);
  });

  it('marks news active on a post page, not only on the index', () => {
    expect(nav.match(/path\.startsWith\('\/news'\)/g)).toHaveLength(2);
  });

  it('places news after taskify and before partners', () => {
    expect(nav.indexOf('href="/news"')).toBeGreaterThan(nav.indexOf('href="/taskify"'));
    expect(nav.indexOf('href="/news"')).toBeLessThan(nav.indexOf('href="/partner"'));
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

  it('gates the underline transition behind prefers-reduced-motion', () => {
    expect(nav).toContain('.champ-nav-links a::after {\n      transition: none;\n    }');
  });
});
