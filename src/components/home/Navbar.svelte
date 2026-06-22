<script lang="ts">
  import { Menu, X } from '@lucide/svelte';

  let { menuOpen = false, onMenuToggle }: { menuOpen: boolean; onMenuToggle: () => void } = $props();

  function closeMenu() {
    if (menuOpen) onMenuToggle();
  }
</script>

<header class="beee-nav">
  <a class="brand" href="#top" onclick={closeMenu} aria-label="BEEE homepage">
    <img src="/logo.svg" alt="" />
    <span>BEEE</span>
  </a>

  <nav class="desktop-nav" aria-label="Primary navigation">
    <a href="#why">About</a>
    <a href="#teamup">T.E.A.M.U.P.</a>
    <a href="#journey">Journey</a>
    <a href="#faq">FAQ</a>
  </nav>

  <div class="nav-actions">
    <a class="nav-register" href="/register">Register</a>
    <button class="menu-button" type="button" aria-label="Open menu" aria-expanded={menuOpen} onclick={onMenuToggle}>
      {#if menuOpen}<X size={20} />{:else}<Menu size={20} />{/if}
    </button>
  </div>

  {#if menuOpen}
    <nav class="mobile-nav" aria-label="Mobile navigation">
      <a href="#why" onclick={closeMenu}>About</a>
      <a href="#teamup" onclick={closeMenu}>T.E.A.M.U.P.</a>
      <a href="#journey" onclick={closeMenu}>Journey</a>
      <a href="#faq" onclick={closeMenu}>FAQ</a>
    </nav>
  {/if}
</header>

<style>
  .beee-nav {
    position: sticky;
    top: 0;
    z-index: 100;
    display: flex;
    height: 72px;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(7, 8, 7, 0.84);
    padding: 0 max(20px, calc((100vw - 1180px) / 2));
    backdrop-filter: blur(18px);
  }

  .brand,
  .desktop-nav,
  .nav-actions {
    display: flex;
    align-items: center;
  }

  .brand {
    gap: 10px;
    font-weight: 800;
    color: var(--text);
  }

  .brand img {
    width: 34px;
    height: 34px;
    object-fit: contain;
  }

  .desktop-nav {
    gap: 26px;
    color: var(--muted-dark);
    font-size: 14px;
    font-weight: 600;
  }

  .desktop-nav a:hover {
    color: var(--gold);
  }

  .nav-actions {
    gap: 10px;
  }

  .nav-register {
    display: inline-flex;
    min-height: 48px;
    align-items: center;
    justify-content: center;
    border-radius: 8px;
    padding: 0 20px;
    font-size: 14px;
    font-weight: 800;
    transition: transform 180ms ease, border-color 180ms ease, background 180ms ease;
    border: 1px solid var(--gold);
    background: linear-gradient(135deg, var(--gold), #df8f1f);
    color: #130f08;
    box-shadow: 0 14px 38px rgba(245, 184, 75, 0.18);
  }

  .nav-register:hover {
    transform: translateY(-2px);
  }

  .menu-button {
    display: none;
    width: 44px;
    height: 44px;
    place-items: center;
    border: 1px solid var(--line);
    border-radius: 8px;
    background: rgba(255, 255, 255, 0.06);
    color: var(--text);
  }

  .mobile-nav {
    position: absolute;
    top: 72px;
    right: 20px;
    left: 20px;
    display: grid;
    gap: 8px;
    border: 1px solid var(--line);
    border-radius: 10px;
    background: rgba(11, 13, 12, 0.96);
    padding: 14px;
    box-shadow: 0 24px 60px rgba(0, 0, 0, 0.4);
  }

  .mobile-nav a {
    border-radius: 8px;
    padding: 14px;
    color: var(--text);
    font-weight: 700;
  }

  @media (max-width: 1023px) {
    .desktop-nav {
      display: none;
    }

    .menu-button {
      display: grid;
    }
  }

  @media (max-width: 700px) {
    .beee-nav {
      padding-inline: 14px;
    }

    .brand span {
      display: none;
    }

    .nav-register {
      min-height: 42px;
      padding-inline: 14px;
    }
  }
</style>
