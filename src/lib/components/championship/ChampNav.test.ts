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
    expect(nav).toContain('class="rv-nav"');
    expect(nav).toContain('class:scrolled');
  });

  it('condenses height when scrolled', () => {
    expect(nav).toContain('.rv-nav.scrolled {\n    height: 56px;');
  });

  it('gates the nav height/background transition behind prefers-reduced-motion', () => {
    expect(nav).toContain('@media (prefers-reduced-motion: reduce) {\n    .rv-nav { transition: none; }\n  }');
  });
});

describe('ChampNav active link indicator', () => {
  it('uses a dot indicator instead of a static border-bottom', () => {
    expect(nav).toContain('.rv-nav-links .rv-link::before {');
    expect(nav).toContain('.rv-nav-links .rv-link.active::before {\n    opacity: 1;\n  }');
  });
});

describe('ChampNav links and auth state', () => {
  it('lists all primary navigation links', () => {
    for (const href of ['/about', '/e4', '/teamup', '/taskify', '/partner', '/faq']) {
      expect(nav).toContain(`href: '${href}'`);
    }
  });

  it('shows a Register CTA when logged out', () => {
    expect(nav).toContain('{#if !user}');
    expect(nav).toContain('<a href="/register" class="rv-btn rv-btn--beam felt"');
  });

  it('shows Dashboard and Log out when logged in', () => {
    expect(nav).toContain('<a href="/dashboard" class="rv-micro rv-link">Dashboard</a>');
    expect(nav).toContain('onclick={logout}');
  });
});

describe('ChampNav mobile menu', () => {
  it('locks scroll and traps focus while open', () => {
    expect(nav).toContain("document.body.style.overflow = 'hidden';");
    expect(nav).toContain('function onMenuKeydown');
    expect(nav).toContain("e.key === 'Escape'");
  });

  it('returns focus to the burger button on close', () => {
    expect(nav).toContain('burgerEl?.focus();');
  });
});
