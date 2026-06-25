<script lang="ts">
  let el: HTMLElement;
  let visible = $state(false);

  $effect(() => {
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { visible = true; obs.disconnect(); }
    }, { threshold: 0.2 });
    obs.observe(el);
    return () => obs.disconnect();
  });
</script>

<section bind:this={el} class="champ-cta" class:visible>
  <div class="champ-cta-bg"></div>
  <div class="champ-cta-overlay"></div>
  <div class="champ-cta-noise"></div>
  <div class="container champ-cta-body" class:visible>
    <h2 class="champ-cta-title">Ready to Compete, Develop & Excel?</h2>
    <p class="champ-cta-sub">Register for the BEEE Spectacular Chess Championship Abuja 2026 and begin the T.E.A.M.U.P. journey.</p>
    <div class="champ-cta-actions">
      <a href="/register" class="champ-cta-btn-primary">Register Now</a>
      <a href="/faq" class="champ-cta-btn-secondary">View FAQ</a>
    </div>
    <p class="champ-cta-signoff">Aspire to BEEE. Be Everything Excellent Every Day.</p>
  </div>
</section>

<footer class="champ-footer">
  <div class="container champ-footer-inner">
    <div class="champ-footer-brand">
      <span class="spike-mark" style="color:var(--on-dark)"></span>
      <span class="champ-footer-wordmark">BEEE</span>
    </div>
    <div class="champ-footer-links">
      <div class="champ-footer-col">
        <strong>Programme</strong>
        <a href="#features">Approach</a>
        <a href="#about">The Journey</a>
        <a href="/register">Register</a>
      </div>
      <div class="champ-footer-col">
        <strong>Resources</strong>
        <a href="/faq">FAQ</a>
        <a href="/design">Design System</a>
      </div>
      <div class="champ-footer-col">
        <strong>Connect</strong>
        <span>info@beeeproject.com</span>
        <span>Abuja, Nigeria</span>
      </div>
    </div>
  </div>
  <div class="container champ-footer-bottom">
    <span>&copy; 2026 BEEE. All rights reserved.</span>
    <span>T.E.A.M.U.P. Programme</span>
  </div>
</footer>

<style>
  .champ-cta {
    position: relative;
    min-height: 80vh;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    background: var(--surface-dark);
  }

  .champ-cta-bg {
    position: absolute;
    inset: 0;
    background-image: url('https://picsum.photos/seed/chess-tournament-finale/1920/1080');
    background-size: cover;
    background-position: center;
    opacity: 0;
    transform: scale(1.08);
    transition: opacity 1.2s cubic-bezier(0.16, 1, 0.3, 1), transform 1.4s cubic-bezier(0.16, 1, 0.3, 1);
    filter: saturate(1.05) contrast(1.1);
  }

  .champ-cta.visible .champ-cta-bg {
    opacity: 1;
    transform: scale(1);
  }

  .champ-cta-overlay {
    position: absolute;
    inset: 0;
    background:
      radial-gradient(ellipse 70% 50% at 50% 50%, rgba(24,23,21,0.3) 0%, rgba(24,23,21,0.8) 100%);
  }

  .champ-cta-noise::before {
    content: '';
    position: absolute;
    inset: 0;
    opacity: 0.03;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
    background-repeat: repeat;
    background-size: 256px 256px;
    pointer-events: none;
    z-index: 1;
  }

  .champ-cta-body {
    position: relative;
    z-index: 2;
    text-align: center;
    max-width: 720px;
    padding: 120px 0;
  }

  .champ-cta-body > * {
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 600ms cubic-bezier(0.16, 1, 0.3, 1), transform 600ms cubic-bezier(0.16, 1, 0.3, 1);
  }

  .champ-cta-body.visible > * {
    opacity: 1;
    transform: translateY(0);
  }

  .champ-cta-body.visible > *:nth-child(2) { transition-delay: 0.12s; }
  .champ-cta-body.visible > *:nth-child(3) { transition-delay: 0.24s; }
  .champ-cta-body.visible > *:nth-child(4) { transition-delay: 0.36s; }

  .champ-cta-title {
    margin: 0;
    font-family: var(--font-display);
    font-size: clamp(2rem, 3.6vw, 3.2rem);
    font-weight: 500;
    line-height: 1.1;
    letter-spacing: -0.015em;
    color: var(--on-dark);
    text-wrap: balance;
  }

  .champ-cta-sub {
    max-width: 520px;
    margin: 20px auto 0;
    font-size: 17px;
    line-height: 1.65;
    color: rgba(250, 249, 245, 0.7);
  }

  .champ-cta-actions {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 12px;
    margin-top: 36px;
  }

  .champ-cta-btn-primary,
  .champ-cta-btn-secondary {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-height: 48px;
    padding: 14px 32px;
    border-radius: 999px;
    font-size: 15px;
    font-weight: 500;
    line-height: 1;
    transition: background 160ms ease, border-color 160ms ease, transform 160ms ease;
  }

  .champ-cta-btn-primary {
    background: var(--primary);
    color: var(--on-primary);
    border: 1px solid var(--primary);
  }

  .champ-cta-btn-primary:hover {
    background: var(--primary-active);
    border-color: var(--primary-active);
    transform: scale(1.03);
  }

  .champ-cta-btn-secondary {
    background: transparent;
    color: var(--on-dark);
    border: 1px solid rgba(250, 249, 245, 0.25);
  }

  .champ-cta-btn-secondary:hover {
    background: rgba(250, 249, 245, 0.08);
    border-color: rgba(250, 249, 245, 0.4);
    transform: scale(1.03);
  }

  .champ-cta-signoff {
    margin: 40px 0 0;
    font-size: 12px;
    font-weight: 500;
    color: rgba(250, 249, 245, 0.4);
    letter-spacing: 0.14em;
    text-transform: uppercase;
  }

  /* ── Footer ── */
  .champ-footer {
    background: var(--surface-dark);
    border-top: 1px solid rgba(250, 249, 245, 0.06);
    padding: 64px 0 32px;
  }

  .champ-footer-inner {
    display: grid;
    grid-template-columns: 1fr 2fr;
    gap: 48px;
    padding-bottom: 48px;
    border-bottom: 1px solid rgba(250, 249, 245, 0.06);
  }

  .champ-footer-brand {
    display: flex;
    align-items: center;
    gap: 10px;
    color: var(--on-dark);
    font-size: 18px;
    font-weight: 600;
  }

  .champ-footer-wordmark {
    font-family: var(--font-display);
  }

  .champ-footer-links {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 32px;
  }

  .champ-footer-col strong {
    display: block;
    font-size: 13px;
    font-weight: 600;
    color: var(--on-dark);
    margin-bottom: 16px;
    letter-spacing: 0.04em;
    text-transform: uppercase;
  }

  .champ-footer-col a,
  .champ-footer-col span {
    display: block;
    font-size: 14px;
    color: var(--on-dark-soft);
    line-height: 1.6;
    margin-top: 8px;
  }

  .champ-footer-col a:hover {
    color: var(--on-dark);
  }

  .champ-footer-bottom {
    display: flex;
    justify-content: space-between;
    gap: 16px;
    padding-top: 24px;
    font-size: 13px;
    color: var(--on-dark-soft);
  }

  @media (max-width: 767px) {
    .champ-cta-body {
      padding: 80px 0;
    }
    .champ-cta-title {
      font-size: clamp(1.6rem, 6vw, 2rem);
    }
    .champ-cta-sub {
      font-size: 15px;
    }
    .champ-footer-inner {
      grid-template-columns: 1fr;
      gap: 32px;
    }
    .champ-footer-links {
      grid-template-columns: 1fr 1fr;
    }
    .champ-footer-bottom {
      flex-direction: column;
      text-align: center;
    }
  }
</style>
