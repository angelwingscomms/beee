<script lang="ts">
  import { page } from '$app/stores';
  import { slide } from 'svelte/transition';
  import RegisterBtn from '$lib/components/RegisterBtn.svelte';

  let open = $state(false);
  let path = $derived($page.url.pathname);
</script>

<nav class="champ-nav">
  <div class="champ-nav-bg"></div>
  <div class="champ-nav-inner container">
    <a href="/" class="champ-nav-brand">
      <img src="/logo.svg" alt="BEEE — Building Exceptional Experiences Through Education" class="champ-nav-logo" />
      <span class="champ-nav-name">BEEE</span>
    </a>
    <div class="champ-nav-links">
      <a href="/" class:active={path === '/'}>Home</a>
      <a href="/e4" class:active={path === '/e4'}>e4</a>
      <a href="/teamup" class:active={path === '/teamup'}>TEAMUP</a>
      <a href="/taskify" class:active={path === '/taskify'}>Taskify</a>
      <a href="/faq" class:active={path === '/faq'}>FAQs</a>
    </div>
    <RegisterBtn href="/register" class="champ-nav-cta">Register</RegisterBtn>
    <button class="champ-mobile-btn" onclick={() => open = !open} aria-label="Menu">
      <span class:open={open}></span>
    </button>
  </div>
  {#if open}
    <div class="champ-mobile-menu" transition:slide={{ duration: 200 }}>
      <a href="/" class:active={path === '/'} onclick={() => open = false}>Home</a>
      <a href="/e4" class:active={path === '/e4'} onclick={() => open = false}>e4</a>
      <a href="/teamup" class:active={path === '/teamup'} onclick={() => open = false}>TEAMUP</a>
      <a href="/taskify" class:active={path === '/taskify'} onclick={() => open = false}>Taskify</a>
      <a href="/faq" class:active={path === '/faq'} onclick={() => open = false}>FAQs</a>
    </div>
  {/if}
</nav>

<style>
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

  .champ-nav-bg {
    position: absolute;
    inset: 0;
    border-radius: 999px;
    z-index: -1;
    background: linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(248,247,242,0.85) 50%, rgba(255,255,255,0.92) 100%);
    backdrop-filter: blur(32px) saturate(1.5);
    -webkit-backdrop-filter: blur(32px) saturate(1.5);
    border: 1px solid rgba(255, 255, 255, 0.5);
    box-shadow:
      0 8px 40px rgba(0, 0, 0, 0.04),
      0 2px 12px rgba(255, 255, 255, 0.3),
      inset 0 1px 0 rgba(255, 255, 255, 0.85),
      inset 0 -1px 0 rgba(255, 255, 255, 0.2),
      inset 1px 0 0 rgba(255, 255, 255, 0.15),
      inset -1px 0 0 rgba(255, 255, 255, 0.15),
      0 0 60px rgba(255, 255, 255, 0.15);
  }

  .champ-nav-bg::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: inherit;
    background: linear-gradient(
      105deg,
      transparent 15%,
      rgba(255, 255, 255, 0.35) 32%,
      rgba(255, 255, 255, 0.6) 38%,
      rgba(255, 255, 255, 0.35) 44%,
      transparent 60%
    );
    background-size: 220% 100%;
    animation: sheen 5s ease-in-out infinite;
    pointer-events: none;
  }

  .champ-nav-bg::after {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: inherit;
    background: radial-gradient(ellipse at 30% 50%, rgba(255,255,255,0.15) 0%, transparent 60%);
    pointer-events: none;
  }

  @keyframes sheen {
    0% { background-position: 170% 0; }
    50% { background-position: -70% 0; }
    100% { background-position: 170% 0; }
  }

  :global(.dark) .champ-nav-bg {
    background: linear-gradient(135deg, rgba(30, 29, 26, 0.6) 0%, rgba(24, 23, 21, 0.45) 50%, rgba(30, 29, 26, 0.55) 100%);
    border-color: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(36px) saturate(1.3);
    box-shadow:
      0 8px 40px rgba(0, 0, 0, 0.35),
      0 0 40px rgba(255, 255, 255, 0.03),
      inset 0 1px 0 rgba(255, 255, 255, 0.08),
      inset 0 -1px 0 rgba(255, 255, 255, 0.04),
      inset 1px 0 0 rgba(255, 255, 255, 0.05),
      inset -1px 0 0 rgba(255, 255, 255, 0.05);
  }

  :global(.dark) .champ-nav-bg::before {
    background: linear-gradient(
      105deg,
      transparent 15%,
      rgba(255, 255, 255, 0.04) 32%,
      rgba(255, 255, 255, 0.08) 38%,
      rgba(255, 255, 255, 0.04) 44%,
      transparent 60%
    );
  }

  :global(.dark) .champ-nav-bg::after {
    background: radial-gradient(ellipse at 30% 50%, rgba(255,255,255,0.04) 0%, transparent 60%);
  }

  .champ-nav-inner {
    display: flex;
    align-items: center;
    height: 54px;
    gap: 32px;
    width: 100%;
    padding: 0 24px;
  }

  .champ-nav-brand {
    display: flex;
    align-items: center;
    gap: 12px;
    text-decoration: none;
    color: var(--ink);
    font-weight: 600;
    font-size: 18px;
  }

  .champ-nav-logo {
    width: 36px;
    height: 36px;
    object-fit: contain;
  }

  .champ-nav-name {
    letter-spacing: -0.02em;
    color: var(--color-primary);
  }

  .champ-nav-links {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-left: auto;
  }

  .champ-nav-links a {
    padding: 10px 22px;
    border-radius: 999px;
    font-size: 15px;
    font-weight: 500;
    color: #fff;
    text-decoration: none;
    transition: background 160ms ease, color 160ms ease;
  }

  :global(.champ-nav-cta) {
    min-height: 44px;
    padding: 10px 24px;
    font-size: 14px;
    white-space: nowrap;
  }
  .champ-nav-links a:hover {
    color: var(--ink);
    background: var(--surface-card);
  }
  .champ-nav-links a.active {
    color: var(--primary);
    border-bottom: 2px solid var(--primary);
    padding-bottom: 8px;
    background: transparent;
  }

  .champ-mobile-btn {
    display: none;
    width: 44px;
    height: 44px;
    min-width: 44px;
    align-items: center;
    justify-content: center;
    border: 1px solid var(--hairline);
    border-radius: 999px;
    background: var(--canvas);
    color: var(--ink);
    margin-left: auto;
    flex-shrink: 0;
  }

  .champ-mobile-btn span,
  .champ-mobile-btn span::before,
  .champ-mobile-btn span::after {
    display: block;
    width: 18px;
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

  .champ-mobile-btn span::before { top: -6px; }
  .champ-mobile-btn span::after { top: 6px; }

  .champ-mobile-btn span.open::before { transform: rotate(45deg) translate(2px, 4px); }
  .champ-mobile-btn span.open::after { transform: rotate(-45deg) translate(2px, -4px); }

  .champ-mobile-menu {
    display: grid;
    gap: 8px;
    margin-top: 12px;
    padding: 20px 24px;
    border-radius: 24px;
    background: rgba(250, 249, 245, 0.96);
    backdrop-filter: blur(20px);
    border: 1px solid rgba(0, 0, 0, 0.06);
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.08);
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

  @media (max-width: 767px) {
    .champ-nav-links {
      display: none;
    }
    .champ-mobile-btn {
      display: inline-flex;
    }
    .champ-nav-inner {
      height: 64px;
      padding: 0 20px;
      gap: 16px;
    }
    .champ-nav-logo {
      width: 36px;
      height: 36px;
    }
  }
  @media (max-width: 400px) {
    .champ-nav-inner {
      padding: 0 12px;
      gap: 8px;
    }
    .champ-nav-brand {
      gap: 6px;
    }
    .champ-nav-logo {
      width: 28px;
      height: 28px;
    }
    .champ-nav-name {
      font-size: 14px;
    }
    :global(.champ-nav-cta) {
      padding: 8px 14px !important;
      font-size: 13px !important;
      min-height: 36px !important;
      position: absolute;
      left: 50%;
      translate: -50% 0;
    }
    .champ-nav-inner {
      position: relative;
    }
  }
</style>
