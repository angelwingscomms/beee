<script lang="ts">
  import { motionFadeUp } from '$lib/actions/motion';
</script>

<section class="tu-footer" use:motionFadeUp>
  <div class="container tu-footer-inner">
    <div class="tu-footer-top">
      <div class="tu-footer-brand">
        <p class="tu-footer-event">BEEE Spectacular Chess Championship Abuja 2026</p>
        <p class="tu-footer-tagline">More Than A Chess Championship</p>
      </div>
      <nav class="tu-footer-nav">
        <a href="/">Home</a>
        <a href="/championship">Championship</a>
        <a href="/teamup">TEAMUP</a>
        <a href="/register">Registration</a>
        <a href="/faq">FAQ</a>
      </nav>
    </div>
    <div class="tu-footer-divider"></div>
    <div class="tu-footer-bottom">
      <div class="tu-footer-contact">
        <a href="mailto:info@beeeproject.com">info@beeeproject.com</a>
        <span class="tu-contact-sep">|</span>
        <span>+234 802 092 0872</span>
      </div>
      <p class="tu-footer-copy">&copy; 2026 BEEE Spectacular Chess Championship</p>
    </div>
  </div>
</section>

<style>
  .tu-footer {
    position: relative;
    padding: 80px 0 48px;
    background: var(--surface-dark);
    color: var(--on-dark-soft);
    margin-top: 128px;
  }

  .tu-footer::before {
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

  .tu-footer-inner {
    position: relative;
    z-index: 1;
  }

  .tu-footer-top {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 40px;
  }

  .tu-footer-event {
    font-family: var(--font-display);
    font-size: 20px;
    font-weight: 500;
    line-height: 1.25;
    letter-spacing: -0.01em;
    color: var(--on-dark);
    margin: 0;
    max-width: 360px;
  }

  .tu-footer-tagline {
    font-size: 14px;
    line-height: 1.5;
    color: var(--on-dark-soft);
    margin: 8px 0 0;
  }

  .tu-footer-nav {
    display: flex;
    flex-wrap: wrap;
    gap: 8px 20px;
    min-width: 200px;
  }

  .tu-footer-nav a {
    font-size: 14px;
    font-weight: 500;
    line-height: 1.4;
    color: var(--on-dark-soft);
    text-decoration: none;
    transition: color 160ms ease;
    white-space: nowrap;
  }

  .tu-footer-nav a:hover {
    color: var(--primary);
  }

  .tu-footer-divider {
    height: 1px;
    background: rgba(250, 249, 245, 0.1);
    margin: 32px 0;
    border: none;
  }

  .tu-footer-bottom {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 24px;
    font-size: 13px;
  }

  .tu-footer-contact {
    display: flex;
    align-items: center;
    gap: 10px;
    flex-wrap: wrap;
  }

  .tu-footer-contact a {
    color: var(--on-dark-soft);
    text-decoration: none;
    transition: color 160ms ease;
  }

  .tu-footer-contact a:hover {
    color: var(--primary);
  }

  .tu-contact-sep {
    color: rgba(250, 249, 245, 0.2);
  }

  .tu-footer-copy {
    margin: 0;
    color: var(--muted-soft);
  }

  @media (max-width: 767px) {
    .tu-footer {
      padding: 64px 0 40px;
      margin-top: 80px;
    }

    .tu-footer-top {
      flex-direction: column;
      gap: 32px;
    }

    .tu-footer-bottom {
      flex-direction: column;
      align-items: flex-start;
      gap: 12px;
    }
  }
</style>