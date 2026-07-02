<script lang="ts">
  import { slide } from 'svelte/transition';

  let open = $state(false);
</script>

<nav class="tu-nav">
  <div class="tu-nav-bg"></div>
  <div class="tu-nav-inner container">
    <a href="/" class="tu-nav-brand">
      <img src="/logo.svg" alt="BEEE" class="tu-nav-logo" />
      <span class="tu-nav-name">BEEE</span>
    </a>
    <div class="tu-nav-links">
      <a href="/">Home</a>
      <a href="/championship">Championship</a>
      <a href="/teamup" class="active">TEAMUP</a>
      <a href="/register">Register</a>
      <a href="/faq">FAQ</a>
    </div>
    <a href="/register" class="button-primary tu-nav-cta">Register Now</a>
    <button class="tu-mobile-btn" onclick={() => open = !open} aria-label="Menu">
      <span class:open={open}></span>
    </button>
  </div>
  {#if open}
    <div class="tu-mobile-menu" transition:slide={{ duration: 200 }}>
      <a href="/" onclick={() => open = false}>Home</a>
      <a href="/championship" onclick={() => open = false}>Championship</a>
      <a href="/teamup" class="active" onclick={() => open = false}>TEAMUP</a>
      <a href="/register" onclick={() => open = false}>Register</a>
      <a href="/faq" onclick={() => open = false}>FAQ</a>
      <a href="/register" class="button-primary" onclick={() => open = false}>Register Now</a>
    </div>
  {/if}
</nav>

<style>
  .tu-nav {
    position: fixed;
    top: 16px;
    left: 50%;
    translate: -50% 0;
    z-index: 50;
    width: min(1200px, calc(100% - 32px));
    border-radius: 999px;
    isolation: isolate;
  }

  .tu-nav-bg {
    position: absolute;
    inset: 0;
    border-radius: 999px;
    background: rgba(250, 249, 245, 0.88);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border: 1px solid rgba(0, 0, 0, 0.06);
    box-shadow: 0 4px 24px rgba(0, 0, 0, 0.06);
    z-index: -1;
  }

  .tu-nav-inner {
    display: flex;
    align-items: center;
    height: 56px;
    gap: 24px;
    width: 100%;
    padding: 0 24px;
  }

  .tu-nav-brand {
    display: flex;
    align-items: center;
    gap: 10px;
    text-decoration: none;
    color: var(--ink);
    font-weight: 600;
    font-size: 16px;
  }

  .tu-nav-logo {
    width: 28px;
    height: 28px;
    object-fit: contain;
  }

  .tu-nav-name {
    letter-spacing: -0.02em;
  }

  .tu-nav-links {
    display: flex;
    align-items: center;
    gap: 6px;
    margin-left: auto;
  }

  .tu-nav-links a {
    padding: 6px 14px;
    border-radius: 999px;
    font-size: 13px;
    font-weight: 500;
    color: var(--body);
    text-decoration: none;
    transition: background 160ms ease, color 160ms ease;
  }

  .tu-nav-links a:hover,
  .tu-nav-links a.active {
    background: var(--surface-card);
    color: var(--ink);
  }

  .tu-nav-cta {
    min-height: 36px;
    padding: 8px 18px;
    font-size: 13px;
    white-space: nowrap;
  }

  .tu-mobile-btn {
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

  .tu-mobile-btn span,
  .tu-mobile-btn span::before,
  .tu-mobile-btn span::after {
    display: block;
    width: 14px;
    height: 2px;
    border-radius: 999px;
    background: currentColor;
    transition: transform 200ms ease;
  }

  .tu-mobile-btn span {
    position: relative;
  }

  .tu-mobile-btn span::before,
  .tu-mobile-btn span::after {
    position: absolute;
    content: '';
  }

  .tu-mobile-btn span::before { top: -5px; }
  .tu-mobile-btn span::after { top: 5px; }

  .tu-mobile-btn span.open::before { transform: rotate(45deg) translate(1px, 3px); }
  .tu-mobile-btn span.open::after { transform: rotate(-45deg) translate(1px, -3px); }

  .tu-mobile-menu {
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

  .tu-mobile-menu a {
    padding: 10px 14px;
    border-radius: 10px;
    font-size: 14px;
    font-weight: 500;
    color: var(--body);
    text-decoration: none;
  }

  .tu-mobile-menu a:hover {
    background: var(--surface-card);
    color: var(--ink);
  }

  .tu-mobile-menu .button-primary {
    text-align: center;
    margin-top: 4px;
  }

  @media (max-width: 767px) {
    .tu-nav-links,
    .tu-nav-cta {
      display: none;
    }
    .tu-mobile-btn {
      display: inline-flex;
    }
  }
</style>