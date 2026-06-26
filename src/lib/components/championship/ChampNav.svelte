<script lang="ts">
  import { page } from '$app/stores';
  import { slide } from 'svelte/transition';
  import { onMount } from 'svelte';
  import { afterNavigate } from '$app/navigation';
  import { browser } from '$app/environment';

  let { rootEl }: { rootEl?: HTMLElement } = $props();

  let open = $state(false);
  let path = $derived($page.url.pathname);
  let navEl: HTMLElement | undefined = $state();
  let lgInstance: any = null;

  let isDark = $derived(browser && document.documentElement.classList.contains('dark'));

  let config = $derived(JSON.stringify({
    blurAmount: 0.30,
    refraction: 0.35,
    chromAberration: 0.03,
    edgeHighlight: 0.08,
    specular: 0.10,
    fresnel: 1.0,
    cornerRadius: 999,
    zRadius: 40,
    opacity: isDark ? 0.70 : 0.85,
    tintStrength: isDark ? 0.05 : 0.02,
    brightness: isDark ? -0.05 : 0.05,
    shadowOpacity: isDark ? 0.40 : 0.25,
    shadowSpread: 12,
    shadowOffsetY: 2,
    distortion: 0,
    saturation: 0,
    floating: false,
    button: false,
    bevelMode: 0,
  }));

  onMount(async () => {
    if (!rootEl || !navEl) return;
    const { LiquidGlass } = await import('@ybouane/liquidglass');
    lgInstance = await LiquidGlass.init({
      root: rootEl,
      glassElements: [navEl],
    });
  });

  afterNavigate(() => {
    lgInstance?.markChanged();
  });

  $effect(() => {
    return () => {
      lgInstance?.destroy();
      lgInstance = null;
    };
  });
</script>

<nav bind:this={navEl} class="champ-nav" data-config={config}>
  <div class="champ-nav-inner container">
    <a href="/" class="champ-nav-brand">
      <img src="/logo.svg" alt="BEEE" class="champ-nav-logo" />
      <span class="champ-nav-name">BEEE</span>
    </a>
    <div class="champ-nav-links">
      <a href="/" class:active={path === '/'}>Home</a>
      <a href="/register" class:active={path === '/register'}>Register</a>
      <a href="/teamup" class:active={path === '/teamup'}>T.E.A.M.U.P.</a>
      <a href="/faq" class:active={path === '/faq'}>FAQ</a>
    </div>
    <a href="/register" class="button-primary champ-nav-cta">Register Now</a>
    <button class="champ-mobile-btn" onclick={() => open = !open} aria-label="Menu">
      <span class:open={open}></span>
    </button>
  </div>
  {#if open}
    <div class="champ-mobile-menu" transition:slide={{ duration: 200 }}>
      <a href="/" class:active={path === '/'} onclick={() => open = false}>Home</a>
      <a href="/register" class:active={path === '/register'} onclick={() => open = false}>Register</a>
      <a href="/teamup" class:active={path === '/teamup'} onclick={() => open = false}>T.E.A.M.U.P.</a>
      <a href="/faq" class:active={path === '/faq'} onclick={() => open = false}>FAQ</a>
      <a href="/register" class="button-primary" onclick={() => open = false}>Register Now</a>
    </div>
  {/if}
</nav>

<style>
  .champ-nav {
    position: fixed;
    top: 16px;
    left: 50%;
    translate: -50% 0;
    z-index: 50;
    width: min(1200px, calc(100% - 32px));
    border-radius: 999px;
  }

  .champ-nav-inner {
    display: flex;
    align-items: center;
    height: 56px;
    gap: 24px;
    width: 100%;
    padding: 0 24px;
    position: relative;
  }

  .champ-nav-brand {
    display: flex;
    align-items: center;
    gap: 10px;
    text-decoration: none;
    color: var(--ink);
    font-weight: 600;
    font-size: 16px;
  }

  .champ-nav-logo {
    width: 28px;
    height: 28px;
    object-fit: contain;
  }

  .champ-nav-name {
    letter-spacing: -0.02em;
    color: #fff;
  }

  .champ-nav-links {
    display: flex;
    align-items: center;
    gap: 6px;
    margin-left: auto;
  }

  .champ-nav-links a {
    padding: 6px 14px;
    border-radius: 999px;
    font-size: 13px;
    font-weight: 500;
    color: #fff;
    text-decoration: none;
    transition: background 160ms ease, color 160ms ease;
  }

  .champ-nav-links a:hover,
  .champ-nav-links a.active {
    background: var(--surface-card);
    color: var(--ink);
  }

  .champ-nav-cta {
    min-height: 36px;
    padding: 8px 18px;
    font-size: 13px;
    white-space: nowrap;
  }

  .champ-mobile-btn {
    display: none;
    width: 36px;
    height: 36px;
    align-items: center;
    justify-content: center;
    border: 1px solid var(--hairline);
    border-radius: 999px;
    background: var(--canvas);
    color: var(--ink);
    margin-left: auto;
  }

  .champ-mobile-btn span,
  .champ-mobile-btn span::before,
  .champ-mobile-btn span::after {
    display: block;
    width: 14px;
    height: 2px;
    border-radius: 999px;
    background: currentColor;
    transition: transform 200ms ease;
  }

  .champ-mobile-btn span {
    position: relative;
  }

  .champ-mobile-btn span::before,
  .champ-mobile-btn span::after {
    position: absolute;
    content: '';
  }

  .champ-mobile-btn span::before { top: -5px; }
  .champ-mobile-btn span::after { top: 5px; }

  .champ-mobile-btn span.open::before { transform: rotate(45deg) translate(1px, 3px); }
  .champ-mobile-btn span.open::after { transform: rotate(-45deg) translate(1px, -3px); }

  .champ-mobile-menu {
    display: grid;
    gap: 8px;
    margin-top: 8px;
    padding: 16px 20px;
    border-radius: 20px;
    background: rgba(250, 249, 245, 0.96);
    backdrop-filter: blur(20px);
    border: 1px solid rgba(0, 0, 0, 0.06);
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.08);
    position: relative;
  }

  .champ-mobile-menu a {
    padding: 10px 14px;
    border-radius: 10px;
    font-size: 14px;
    font-weight: 500;
    color: var(--body);
    text-decoration: none;
  }

  .champ-mobile-menu a:hover,
  .champ-mobile-menu a.active {
    background: var(--surface-card);
    color: var(--ink);
  }

  .champ-mobile-menu .button-primary {
    text-align: center;
    margin-top: 4px;
  }

  @media (max-width: 767px) {
    .champ-nav-links,
    .champ-nav-cta {
      display: none;
    }
    .champ-mobile-btn {
      display: inline-flex;
    }
  }
</style>
