<script lang="ts">
  import { page } from '$app/stores';
  import ThemeToggle from '$lib/components/system/ThemeToggle.svelte';

  let links = $derived.by(() => {
    let p = $page.url.pathname;
    return [
      { href: '/', label: 'Home' },
      { href: '/register', label: 'Register' },
      { href: '/e4', label: 'e4' },
      { href: '/teamup', label: 'TEAMUP' },
      { href: '/taskify', label: 'Taskify' },
      { href: '/about', label: 'About' },
      { href: '/faq', label: 'FAQ' },
      { href: '/partner', label: 'Partners' }
    ].filter((l) => l.href !== p);
  });
</script>

<footer class="rv-field-night noise footer">
  <div class="rv-wrap">
    <p class="rv-d3 footer-headline">
      Be Everything <span style="color: var(--honey)">Excellent</span> Every Day.
    </p>

    <div class="footer-grid">
      <div class="footer-col">
        <p class="rv-micro footer-label">THE CHAMPIONSHIP</p>
        <p class="rv-body footer-about">
          BEEE Spectacular Chess Championship, Abuja 2026. More than a chess championship.
        </p>
      </div>
      <div class="footer-col">
        <p class="rv-micro footer-label">THE MAP</p>
        <nav class="footer-nav">
          {#each links as l (l.href)}
            <a href={l.href} class="rv-link">{l.label}</a>
          {/each}
        </nav>
      </div>
      <div class="footer-col">
        <p class="rv-micro footer-label">SIGNAL</p>
        <nav class="footer-nav">
          <a href="mailto:info@beeeproject.com" class="rv-link">info@beeeproject.com</a>
          <a href="tel:+2348020920872" class="rv-link">+234 802 092 0872</a>
          <a href="https://instagram.com/thebeeeproject" class="rv-link">@thebeeeproject</a>
          <a href="https://x.com/beeeproject" class="rv-link">beeeproject</a>
        </nav>
      </div>
    </div>

    <div class="footer-bottom">
      <span class="rv-micro">© 2026 BEEE®</span>
      <a href="/privacy" class="rv-link rv-micro">Privacy</a>
      <a href="/terms" class="rv-link rv-micro">Terms</a>
      <span class="footer-toggle"><ThemeToggle /></span>
    </div>
  </div>
</footer>

<style>
  .footer {
    padding-block: var(--space-8) var(--space-5);
  }

  .footer-headline {
    max-width: 16ch;
  }

  .footer-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: var(--gutter);
    margin-top: var(--space-7);
  }

  .footer-col {
    display: flex;
    flex-direction: column;
    gap: var(--space-2);
  }

  .footer-label {
    color: var(--honey);
  }

  .footer-about {
    color: var(--dusk-body);
  }

  .footer-nav {
    display: flex;
    flex-direction: column;
    gap: 10px;
    align-items: flex-start;
  }

  .footer-nav .rv-link {
    font-family: var(--font-sans);
    font-size: 15px;
  }

  .footer-bottom {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: var(--space-3);
    margin-top: var(--space-7);
    padding-top: var(--space-3);
    border-top: 1px solid color-mix(in srgb, var(--dusk-ink) 14%, transparent);
  }

  .footer-toggle {
    margin-left: auto;
  }

  @media (--sm-down) {
    .footer-grid {
      grid-template-columns: 1fr;
      gap: var(--space-5);
    }
  }
</style>
