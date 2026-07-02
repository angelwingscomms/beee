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
      <img src="/logo.svg" alt="BEEE" class="champ-nav-logo" />
      <span class="champ-nav-name">BEEE</span>
    </a>
    <div class="champ-nav-links">
      <a href="/" class:active={path === '/'}>Home</a>
      <a href="/faq" class:active={path === '/faq'}>FAQ</a>
    </div>
    <RegisterBtn href="/register" class="champ-nav-cta">Register Now</RegisterBtn>
    <button class="champ-mobile-btn" onclick={() => open = !open} aria-label="Menu">
      <span class:open={open}></span>
    </button>
  </div>
  {#if open}
    <div class="champ-mobile-menu" transition:slide={{ duration: 200 }}>
      <a href="/" class:active={path === '/'} onclick={() => open = false}>Home</a>
      <a href="/faq" class:active={path === '/faq'} onclick={() => open = false}>FAQ</a>
      <RegisterBtn href="/register" onclick={() => open = false}>Register Now</RegisterBtn>
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
    isolation: isolate;
  }

  .champ-nav-bg {
    position: absolute;
    inset: 0;
    border-radius: 999px;
    z-index: -1;
    background: rgba(250, 249, 245, 0.6);
    backdrop-filter: blur(24px) saturate(1.35);
    -webkit-backdrop-filter: blur(24px) saturate(1.35);
    border: 1px solid rgba(255, 255, 255, 0.35);
    box-shadow:
      0 4px 24px rgba(0, 0, 0, 0.06),
      inset 0 1px 0 rgba(255, 255, 255, 0.65),
      inset 0 -1px 0 rgba(255, 255, 255, 0.12),
      inset 1px 0 0 rgba(255, 255, 255, 0.08),
      inset -1px 0 0 rgba(255, 255, 255, 0.08);
  }

  .champ-nav-bg::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: inherit;
    background: linear-gradient(
      105deg,
      transparent 20%,
      rgba(255, 255, 255, 0.12) 37%,
      rgba(255, 255, 255, 0.28) 42%,
      rgba(255, 255, 255, 0.12) 47%,
      transparent 65%
    );
    background-size: 200% 100%;
    animation: sheen 7s ease-in-out infinite;
    pointer-events: none;
  }

  @keyframes sheen {
    0% { background-position: 150% 0; }
    50% { background-position: -50% 0; }
    100% { background-position: 150% 0; }
  }

  :global(.dark) .champ-nav-bg {
    background: rgba(24, 23, 21, 0.55);
    border-color: rgba(255, 255, 255, 0.07);
    backdrop-filter: blur(28px) saturate(1.2);
    box-shadow:
      0 4px 24px rgba(0, 0, 0, 0.25),
      inset 0 1px 0 rgba(255, 255, 255, 0.07),
      inset 0 -1px 0 rgba(255, 255, 255, 0.03),
      inset 1px 0 0 rgba(255, 255, 255, 0.04),
      inset -1px 0 0 rgba(255, 255, 255, 0.04);
  }

  :global(.dark) .champ-nav-bg::before {
    background: linear-gradient(
      105deg,
      transparent 20%,
      rgba(255, 255, 255, 0.025) 37%,
      rgba(255, 255, 255, 0.05) 42%,
      rgba(255, 255, 255, 0.025) 47%,
      transparent 65%
    );
  }

  .champ-nav-inner {
    display: flex;
    align-items: center;
    height: 56px;
    gap: 24px;
    width: 100%;
    padding: 0 24px;
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
    color: var(--color-primary);
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

  :global(.champ-nav-cta) {
    min-height: 36px;
    padding: 8px 18px;
    font-size: 13px;
    white-space: nowrap;
  }
  :global(.champ-nav-cta.register-btn) {
    background: transparent !important;
    border: 2px solid #F27830 !important;
    color: #F27830 !important;
    box-shadow: none !important;
  }
  :global(.champ-nav-cta.register-btn:hover) {
    background: #F27830 !important;
    color: #fff !important;
  }

  .champ-nav-links a:hover {
    color: var(--ink);
    background: var(--surface-card);
  }
  .champ-nav-links a.active {
    color: var(--primary);
    border-bottom: 2px solid var(--primary);
    padding-bottom: 4px;
    background: transparent;
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

  .champ-mobile-menu :global(.register-btn) {
    text-align: center;
    margin-top: 4px;
  }

  @media (max-width: 767px) {
    .champ-nav-links,
    :global(.champ-nav-cta) {
      display: none;
    }
    .champ-mobile-btn {
      display: inline-flex;
    }
  }
</style>
