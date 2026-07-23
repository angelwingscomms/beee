<script lang="ts">
  import { onMount, tick } from 'svelte';
  import { page } from '$app/stores';
  import { goto, invalidateAll } from '$app/navigation';
  import gsap from 'gsap';
  import { stopScroll, startScroll } from '$lib/motion/smooth-scroll';
  import { REDUCED } from '$lib/motion/constants';

  const NAV_LINKS = [
    { index: '01', label: 'About', href: '/about' },
    { index: '02', label: 'e4', href: '/e4' },
    { index: '03', label: 'TEAMUP', href: '/teamup' },
    { index: '04', label: 'Taskify', href: '/taskify' },
    { index: '05', label: 'Partners', href: '/partner' },
    { index: '06', label: 'FAQ', href: '/faq' }
  ];

  let open = $state(false);
  let scrolled = $state(false);
  let path = $derived($page.url.pathname);
  let user = $derived($page.data.user);
  let logging_out = $state(false);

  let navVisible = $state(true);
  let navEl: HTMLElement;
  let menuEl: HTMLElement | undefined = $state();
  let burgerEl: HTMLButtonElement;

  onMount(() => {
    const on_scroll = () => { scrolled = window.scrollY > 24; };
    on_scroll();
    window.addEventListener('scroll', on_scroll, { passive: true });

    let cleanupIntro = () => {};
    if ($page.url.pathname === '/') {
      if (typeof sessionStorage !== 'undefined' && sessionStorage.getItem('beee_intro') === '1') {
        navVisible = true;
      } else {
        navVisible = false;
        const onIntroDone = () => {
          navVisible = true;
          if (!REDUCED() && navEl) {
            gsap.fromTo(navEl, { opacity: 0 }, { opacity: 1, duration: 0.6, ease: 'expo.out' });
          }
        };
        window.addEventListener('intro:done', onIntroDone, { once: true });
        cleanupIntro = () => window.removeEventListener('intro:done', onIntroDone);
      }
    }

    return () => {
      window.removeEventListener('scroll', on_scroll);
      cleanupIntro();
    };
  });

  async function logout() {
    logging_out = true;
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      await invalidateAll();
      await goto('/');
    } finally {
      logging_out = false;
    }
  }

  function focusableIn(el: HTMLElement): HTMLElement[] {
    return Array.from(
      el.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
      )
    );
  }

  function onMenuKeydown(e: KeyboardEvent) {
    if (e.key === 'Escape') {
      e.preventDefault();
      closeMenu();
      return;
    }
    if (e.key !== 'Tab' || !menuEl) return;
    const focusable = focusableIn(menuEl);
    if (focusable.length === 0) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }

  async function openMenu() {
    open = true;
    stopScroll();
    document.body.style.overflow = 'hidden';
    await tick();
    if (menuEl) {
      const links = menuEl.querySelectorAll<HTMLElement>('.menu-link-mask > *');
      if (REDUCED()) {
        gsap.set(menuEl, { opacity: 1 });
        gsap.set(links, { yPercent: 0 });
      } else {
        gsap.fromTo(menuEl, { opacity: 0 }, { opacity: 1, duration: 0.3, ease: 'expo.out' });
        gsap.fromTo(
          links,
          { yPercent: 110 },
          { yPercent: 0, duration: 0.6, stagger: 0.07, ease: 'expo.out', delay: 0.1 }
        );
      }
      const focusable = focusableIn(menuEl);
      focusable[0]?.focus();
    }
  }

  function closeMenu() {
    open = false;
    startScroll();
    document.body.style.overflow = '';
    burgerEl?.focus();
  }

  function toggleMenu() {
    if (open) closeMenu();
    else openMenu();
  }
</script>

<nav
  bind:this={navEl}
  class="rv-nav"
  class:scrolled
  style:opacity={navVisible ? 1 : 0}
>
  <a href="/" class="rv-nav-brand">
    <img src="/logo.svg" alt="BEEE — Be Everything Excellent Every Day" class="rv-nav-logo" />
    <span class="rv-nav-name">BEEE</span>
  </a>

  <div class="rv-nav-links">
    {#each NAV_LINKS as link (link.href)}
      <a
        href={link.href}
        class="rv-micro rv-link"
        class:active={path === link.href}
      >{link.label}</a>
    {/each}
  </div>

  <div class="rv-nav-right">
    {#if !user}
      <a href="/register" class="rv-btn rv-btn--beam felt" style="min-height:44px;padding:12px 24px">Register</a>
    {:else}
      <a href="/dashboard" class="rv-micro rv-link">Dashboard</a>
      <button class="rv-micro rv-nav-logout" onclick={logout} disabled={logging_out}>
        {logging_out ? 'Signing out…' : 'Log out'}
      </button>
    {/if}
  </div>

  <button
    bind:this={burgerEl}
    class="rv-burger"
    class:burger-open={open}
    onclick={toggleMenu}
    aria-label={open ? 'Close menu' : 'Open menu'}
    aria-expanded={open}
  >
    <span></span>
    <span></span>
  </button>
</nav>

{#if open}
  <div
    bind:this={menuEl}
    class="rv-menu noise"
    role="dialog"
    aria-modal="true"
    aria-label="Site navigation"
    tabindex="-1"
    onkeydown={onMenuKeydown}
  >
    <div class="rv-menu-links">
      {#each NAV_LINKS as link (link.href)}
        <div class="menu-link-mask">
          <a href={link.href} class="menu-link" class:active={path === link.href} onclick={closeMenu}>
            <span class="menu-index rv-micro">{link.index}</span>{link.label}
          </a>
        </div>
      {/each}
    </div>
    <div class="rv-menu-foot">
      <a href="mailto:info@beeeproject.com" class="rv-micro rv-link">info@beeeproject.com</a>
      <a href="tel:+2348020920872" class="rv-micro rv-link">+234 802 092 0872</a>
      <a href="/register" class="rv-btn rv-btn--beam felt rv-menu-cta" onclick={closeMenu}>Register</a>
    </div>
  </div>
{/if}

<style>
  .rv-nav {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: var(--z-nav);
    height: 72px;
    display: flex;
    align-items: center;
    gap: var(--gutter);
    padding-inline: var(--margin-x);
    background: transparent;
    transition: height var(--dur-micro) var(--ease-out), background var(--dur-micro) var(--ease-out);
  }

  .rv-nav.scrolled {
    height: 56px;
    background: color-mix(in srgb, var(--canvas) 82%, transparent);
    backdrop-filter: blur(12px);
    border-bottom: 1px solid var(--hairline);
  }

  @media (prefers-reduced-motion: reduce) {
    .rv-nav { transition: none; }
  }

  .rv-nav-brand {
    display: flex;
    align-items: center;
    gap: 10px;
    text-decoration: none;
    color: var(--ink);
    flex-shrink: 0;
  }

  .rv-nav-logo {
    height: 26px;
    width: auto;
    object-fit: contain;
  }

  .rv-nav-name {
    font-family: var(--font-grotesk);
    font-weight: 700;
    font-size: 17px;
    letter-spacing: -0.01em;
  }

  .rv-nav-links {
    display: none;
    align-items: center;
    gap: 32px;
    margin-inline: auto;
  }

  .rv-nav-links .rv-link {
    position: relative;
    color: var(--ink);
    padding-left: 12px;
  }

  .rv-nav-links .rv-link::before {
    content: '';
    position: absolute;
    left: 0;
    top: 50%;
    translate: 0 -50%;
    width: 4px;
    height: 4px;
    border-radius: 999px;
    background: var(--beam);
    opacity: 0;
    transition: opacity var(--dur-micro) var(--ease-out);
  }

  .rv-nav-links .rv-link.active::before {
    opacity: 1;
  }

  .rv-nav-right {
    display: none;
    align-items: center;
    gap: 20px;
    flex-shrink: 0;
  }

  .rv-nav-logout {
    background: none;
    border: none;
    color: var(--ink);
    opacity: 0.7;
    cursor: pointer;
    transition: opacity var(--dur-micro) var(--ease-out);
  }
  @media (hover: hover) {
    .rv-nav-logout:hover { opacity: 1; }
  }
  .rv-nav-logout:disabled { cursor: default; }

  .rv-burger {
    display: inline-flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 5px;
    width: 44px;
    height: 44px;
    margin-left: auto;
    flex-shrink: 0;
    border: none;
    background: transparent;
    color: var(--ink);
    cursor: pointer;
  }
  .rv-burger span {
    display: block;
    width: 18px;
    height: 2px;
    background: currentColor;
    transition: transform 300ms var(--ease-out), opacity 300ms var(--ease-out);
  }
  .rv-burger.burger-open span:first-child {
    transform: translateY(3.5px) rotate(45deg);
  }
  .rv-burger.burger-open span:last-child {
    transform: translateY(-3.5px) rotate(-45deg);
  }

  @media (--md-up) {
    .rv-nav-links { display: flex; }
    .rv-nav-right { display: flex; }
    .rv-burger { display: none; }
  }

  .rv-menu {
    position: fixed;
    inset: 0;
    z-index: var(--z-menu);
    background: var(--nightfall);
    color: var(--dusk-ink);
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: var(--space-7) var(--margin-x);
    overflow-y: auto;
  }

  .rv-menu-links {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .menu-link-mask {
    overflow: hidden;
  }

  .menu-link {
    display: flex;
    align-items: baseline;
    gap: 16px;
    font-family: var(--font-grotesk);
    font-weight: 600;
    font-size: clamp(36px, 9vw, 64px);
    line-height: 1.1;
    color: var(--dusk-ink);
    text-decoration: none;
  }

  .menu-index {
    color: var(--honey);
    font-size: var(--fs-micro);
  }

  .menu-link.active {
    color: var(--beam);
  }

  .rv-menu-foot {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
    margin-top: var(--space-6);
  }

  .rv-menu-foot .rv-link {
    color: var(--dusk-body);
  }

  .rv-menu-cta {
    margin-top: 12px;
    width: 100%;
  }

  @media (--md-up) {
    .rv-menu { display: none; }
  }
</style>
