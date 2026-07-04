<script lang="ts">
  import { motionFadeUp } from '$lib/actions/motion';
</script>

<footer class="champ-footer" use:motionFadeUp>
  <div class="container champ-footer-inner">
    <div class="champ-footer-top">
      <div class="champ-footer-brand">
        <img src="/logo.svg" alt="BEEE" class="champ-footer-logo" />
        <div>
          <p class="champ-footer-event">BEEE Spectacular Chess Championship Abuja 2026</p>
          <p class="champ-footer-tagline">More Than A Chess Championship</p>
        </div>
      </div>
      <nav class="champ-footer-nav">
        <div class="champ-footer-col">
          <strong>Pages</strong>
          <a href="/">Home</a>
          <a href="/championship">Championship</a>
          <a href="/register">Registration</a>
          <a href="/faq">FAQ</a>
        </div>
        <div class="champ-footer-col">
          <strong>Programme</strong>
          <a href="/teamup">TEAMUP</a>
          <a href="/passport">Development Passport</a>
        </div>
        <div class="champ-footer-col">
          <strong>Connect</strong>
          <a href="mailto:info@beeeproject.com">info@beeeproject.com</a>
          <span>+234 802 092 0872</span>
        </div>
      </nav>
    </div>
    <div class="champ-footer-divider"></div>
    <div class="champ-footer-bottom">
      <p class="champ-footer-copy">&copy; 2026 BEEE Spectacular Chess Championship. All rights reserved.</p>
    </div>
  </div>
</footer>

<style>
  .champ-footer {
    background: var(--canvas);
    border-top: 1px solid var(--hairline-soft);
    padding: 80px 0 48px;
  }

  .champ-footer-inner {
    position: relative;
    z-index: 1;
  }

  .champ-footer-top {
    display: flex;
    justify-content: space-between;
    gap: 48px;
  }

  .champ-footer-brand {
    display: flex;
    align-items: flex-start;
    gap: 16px;
    min-width: 240px;
  }

  .champ-footer-logo {
    width: 40px;
    height: 40px;
    object-fit: contain;
    margin-top: 2px;
  }

  .champ-footer-event {
    font-family: var(--font-display);
    font-size: 18px;
    font-weight: 500;
    line-height: 1.25;
    letter-spacing: -0.01em;
    color: var(--ink);
    margin: 0;
  }

  .champ-footer-tagline {
    font-size: 13px;
    line-height: 1.5;
    color: var(--muted);
    margin: 6px 0 0;
  }

  .champ-footer-nav {
    display: flex;
    gap: 40px;
  }

  .champ-footer-col {
    min-width: 120px;
  }

  .champ-footer-col strong {
    display: block;
    color: var(--ink);
    font-size: 13px;
    font-weight: 600;
    margin-bottom: 12px;
  }

  .champ-footer-col a,
  .champ-footer-col span {
    display: block;
    margin-top: 8px;
    color: var(--body);
    font-size: 14px;
    text-decoration: none;
    transition: color 160ms ease;
  }

  .champ-footer-col a:hover {
    color: var(--primary);
  }

  .champ-footer-divider {
    height: 1px;
    background: var(--hairline);
    margin: 48px 0 32px;
  }

  .champ-footer-bottom {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .champ-footer-copy {
    margin: 0;
    color: var(--muted);
    font-size: 13px;
  }

  @media (max-width: 767px) {
    .champ-footer-top {
      flex-direction: column;
      gap: 32px;
    }
    .champ-footer-nav {
      flex-wrap: wrap;
      gap: 24px;
    }
    .champ-footer-bottom {
      flex-direction: column;
      gap: 8px;
      align-items: flex-start;
    }
  }
</style>
