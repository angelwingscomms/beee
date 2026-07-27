<script lang="ts">
  import { page } from '$app/stores';
  import { motionFadeUp } from '$lib/actions/motion';

  let links = $derived.by(() => {
    let p = $page.url.pathname;
    return [
      { href: '/', label: 'Home' },
      { href: '/register', label: 'Register' },
      { href: '/teamup', label: 'TEAMUP' },
      { href: '/quotes', label: 'Quotes' },
      { href: '/faq', label: 'FAQ' },
      { href: '/privacy', label: 'Privacy' },
      { href: '/terms', label: 'Terms' },
    ].filter(l => l.href !== p);
  });
</script>

<section class="footer" use:motionFadeUp>
  <div class="container footer-inner">
    <div class="footer-top">
      <div class="footer-brand">
        <p class="footer-event">BEEE Spectacular Chess Championship Abuja 2026</p>
        <p class="footer-motto">Aspire to BEEE</p>
        <p class="footer-tagline">Be Everything Excellent Every Day</p>
      </div>
      <nav class="footer-nav">
        {#each links as l}
          <a href={l.href}>{l.label}</a>
        {/each}
      </nav>
    </div>
    <div class="footer-divider"></div>
    <div class="footer-bottom">
      <div class="footer-contact">
        <a href="mailto:info@beeeproject.com">info@beeeproject.com</a>
        <span class="contact-sep">|</span>
        <span>+234 802 092 0872</span>
      </div>
      <a href="/partner" class="footer-partner">Become a Partner →</a>
      <p class="footer-copy">&copy; 2026 BEEE Spectacular Chess Championship</p>
    </div>
  </div>
</section>

<style>
  .footer {
    position: relative;
    padding: 72px 0 40px;
    background:
      radial-gradient(1100px 460px at 12% -15%, color-mix(in srgb, var(--navy-blob) 55%, transparent), transparent 70%),
      var(--color-navy);
    color: var(--on-dark-soft);
    overflow: hidden;
  }

  .footer::before {
    content: '';
    position: absolute;
    inset: 0;
    opacity: 0.025;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
    background-repeat: repeat;
    background-size: 256px 256px;
    pointer-events: none;
    z-index: 0;
  }

  .footer-inner {
    position: relative;
    z-index: 1;
    width: min(1200px, calc(100% - 48px));
    margin: 0 auto;
  }

  .footer-top {
    display: grid;
    grid-template-columns: minmax(0, 1.4fr) minmax(0, 1fr);
    align-items: start;
    gap: 40px;
  }

  .footer-event {
    font-family: var(--font-display);
    font-size: var(--fs-display-md);
    font-weight: 500;
    line-height: 1.12;
    letter-spacing: -0.01em;
    color: var(--on-dark);
    margin: 0;
    max-width: 620px;
  }

  .footer-motto {
    font-family: var(--font-display);
    font-size: 24px;
    font-weight: 600;
    line-height: 1.3;
    color: var(--color-amber);
    margin: 12px 0 0;
  }

  .footer-tagline {
    font-size: 20px;
    line-height: 1.4;
    color: #fff;
    margin: 8px 0 0;
  }

  .footer-nav {
    display: flex;
    flex-wrap: wrap;
    gap: 12px 28px;
    min-width: 200px;
  }

  .footer-nav a {
    display: inline-block;
    font-size: 18px;
    font-weight: 500;
    line-height: 1.4;
    color: var(--on-dark-soft);
    text-decoration: none;
    transition: color 160ms ease, transform 160ms ease;
    white-space: nowrap;
  }

  @media (hover: hover) {
    .footer-nav a:hover {
      color: var(--primary);
      transform: translateX(2px);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .footer-nav a {
      transition: color 160ms ease;
    }
  }

  .footer-divider {
    height: 1px;
    background: rgba(250, 249, 245, 0.1);
    margin: 24px 0;
    border: none;
  }

  .footer-bottom {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
    font-size: 18px;
  }

  .footer-contact {
    display: flex;
    align-items: center;
    gap: 10px;
    flex-wrap: wrap;
  }

  .footer-contact a {
    color: var(--on-dark-soft);
    text-decoration: none;
    font-size: 18px;
    transition: color 160ms ease;
  }

  .footer-contact a:hover {
    color: #fff;
  }

  .contact-sep {
    color: rgba(250, 249, 245, 0.2);
  }

  .footer-partner {
    font-size: 16px;
    font-weight: 600;
    color: var(--accent-amber);
    text-decoration: none;
    transition: color 160ms ease;
  }

  .footer-partner:hover {
    color: #ffffff;
  }

  .footer-copy {
    margin: 0;
    color: var(--on-dark-soft);
  }

  @media (--sm-down) {
    .footer {
      padding: 40px 0 32px;
    }

    .footer-top {
      grid-template-columns: 1fr;
      gap: 20px;
    }

    .footer-bottom {
      flex-direction: column;
      align-items: flex-start;
      gap: 12px;
    }
  }
</style>
