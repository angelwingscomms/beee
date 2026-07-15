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
      <a href="/championship">Championship</a>
      <a href="/teamup" class="active">T.E.A.M.U.P.</a>
      <a href="/register">Register</a>
      <a href="/faq">FAQs</a>
    </div>
    <a href="/register" class="button-primary tu-nav-cta">Register Now</a>
    <button class="tu-mobile-btn" onclick={() => open = !open} aria-label="Menu">
      <span class:open={open}></span>
    </button>
  </div>
  {#if open}
    <div class="tu-mobile-menu" transition:slide={{ duration: 200 }}>
      <a href="/championship" onclick={() => open = false}>Championship</a>
      <a href="/teamup" class="active" onclick={() => open = false}>T.E.A.M.U.P.</a>
      <a href="/register" onclick={() => open = false}>Register</a>
      <a href="/faq" onclick={() => open = false}>FAQs</a>
      <a href="/register" class="button-primary" onclick={() => open = false}>Register Now</a>
    </div>
  {/if}
</nav>

<style>
  .tu-nav {
    position: fixed;
    top: 24px;
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
    z-index: -1;
  }

  .tu-nav-inner {
    display: flex;
    align-items: center;
    height: 72px;
    gap: 32px;
    width: 100%;
    padding: 0 32px;
  }

  .tu-nav-brand {
    display: flex;
    align-items: center;
    gap: 12px;
    text-decoration: none;
    color: var(--ink);
    font-weight: 600;
    font-size: 18px;
  }

  .tu-nav-logo {
    width: 44px;
    height: 44px;
    object-fit: contain;
  }

  .tu-nav-name {
    letter-spacing: -0.02em;
  }

  .tu-nav-links {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-left: auto;
  }

  .tu-nav-links a {
    padding: 10px 22px;
    border-radius: 999px;
    font-size: 15px;
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
    min-height: 44px;
    padding: 10px 24px;
    font-size: 14px;
    white-space: nowrap;
  }

  .tu-mobile-btn {
    display: none;
    width: 44px;
    height: 44px;
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
    width: 18px;
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

  .tu-mobile-btn span::before { top: -6px; }
  .tu-mobile-btn span::after { top: 6px; }

  .tu-mobile-btn span.open::before { transform: rotate(45deg) translate(2px, 4px); }
  .tu-mobile-btn span.open::after { transform: rotate(-45deg) translate(2px, -4px); }

  .tu-mobile-menu {
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

  .tu-mobile-menu a {
    padding: 12px 16px;
    border-radius: 12px;
    font-size: 16px;
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
    .tu-nav-inner {
      height: 64px;
      padding: 0 20px;
    }
    .tu-nav-logo {
      width: 36px;
      height: 36px;
    }
  }
</style>