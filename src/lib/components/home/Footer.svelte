<script lang="ts">
  import { motionFadeUp } from '$lib/actions/motion';
</script>

<section class="footer" use:motionFadeUp>
  <div class="container footer-inner">
    <div class="footer-top">
      <div class="footer-brand">
        <p class="footer-event">BEEE Spectacular Chess Championship Abuja 2026</p>
        <p class="footer-tagline">More Than A Chess Championship</p>
      </div>
      <nav class="footer-nav">
        <a href="/">Home</a>
        <a href="/about">About</a>
        <a href="/teamup">T.E.A.M.U.P.</a>
        <a href="/register">Registration</a>
        <a href="/faq">FAQ</a>
        <a href="/contact">Contact</a>
      </nav>
    </div>
    <div class="footer-divider"></div>
    <div class="footer-bottom">
      <div class="footer-contact">
        <a href="mailto:info@beeeproject.com">info@beeeproject.com</a>
        <span class="contact-sep">|</span>
        <span>+2348036513400</span>
      </div>
      <p class="footer-copy">&copy; 2026 BEEE Spectacular Chess Championship</p>
    </div>
  </div>
</section>

<style>
  .footer {
    position: relative;
    padding: 80px 0 48px;
    background: var(--surface-dark);
    color: var(--on-dark-soft);
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
  }

  .footer-top {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 40px;
  }

  .footer-event {
    font-family: var(--font-display);
    font-size: 20px;
    font-weight: 500;
    line-height: 1.25;
    letter-spacing: -0.01em;
    color: var(--on-dark);
    margin: 0;
    max-width: 360px;
  }

  .footer-tagline {
    font-size: 14px;
    line-height: 1.5;
    color: var(--on-dark-soft);
    margin: 8px 0 0;
  }

  .footer-nav {
    display: flex;
    flex-wrap: wrap;
    gap: 8px 20px;
    min-width: 200px;
  }

  .footer-nav a {
    font-size: 14px;
    font-weight: 500;
    line-height: 1.4;
    color: var(--on-dark-soft);
    text-decoration: none;
    transition: color 160ms ease;
    white-space: nowrap;
  }

  .footer-nav a:hover {
    color: var(--primary);
  }

  .footer-divider {
    height: 1px;
    background: rgba(250, 249, 245, 0.1);
    margin: 32px 0;
    border: none;
  }

  .footer-bottom {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 24px;
    font-size: 13px;
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
    transition: color 160ms ease;
  }

  .footer-contact a:hover {
    color: var(--primary);
  }

  .contact-sep {
    color: rgba(250, 249, 245, 0.2);
  }

  .footer-copy {
    margin: 0;
    color: var(--muted-soft);
  }

  @media (max-width: 767px) {
    .footer {
      padding: 64px 0 40px;
    }

    .footer-top {
      flex-direction: column;
      gap: 32px;
    }

    .footer-nav {
      gap: 6px 16px;
    }

    .footer-bottom {
      flex-direction: column;
      align-items: flex-start;
      gap: 12px;
    }
  }
</style>
