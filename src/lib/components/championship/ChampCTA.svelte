<script lang="ts">
  import { motionFadeUp } from '$lib/actions/motion';
</script>

<section class="section-dark" use:motionFadeUp>
  <div class="container" style="padding: 120px 0; position: relative; z-index: 1;">
    <div class="champ-cta-card">
      <div class="champ-cta-content">
        <h2 class="champ-cta-title">Ready to Compete, Develop & Excel?</h2>
        <p class="champ-cta-body">
          Register now for the BEEE Spectacular Chess Championship Abuja 2026
          and begin your journey through the T.E.A.M.U.P. Programme.
        </p>
        <div class="champ-cta-actions">
          <a href="/register" class="button-primary champ-cta-btn">Register Now</a>
          <a href="/faq" class="button-secondary-dark champ-cta-btn">View FAQ</a>
        </div>
      </div>
      <div class="champ-cta-visual">
        <span class="champ-cta-piece champ-cta-k">&#9818;</span>
        <span class="champ-cta-piece champ-cta-q">&#9819;</span>
      </div>
    </div>
  </div>
</section>

<style>
  .champ-cta-card {
    display: grid;
    grid-template-columns: 1.2fr 0.8fr;
    gap: 48px;
    align-items: center;
    border-radius: 20px;
    background: linear-gradient(135deg, var(--surface-dark-elevated), var(--surface-dark-soft));
    border: 1px solid rgba(250, 249, 245, 0.08);
    padding: 64px;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);
  }

  .champ-cta-content {
    max-width: 480px;
  }

  .champ-cta-title {
    font-family: var(--font-display);
    font-size: clamp(1.8rem, 3vw, 2.5rem);
    font-weight: 500;
    line-height: 1.15;
    letter-spacing: -0.01em;
    color: var(--on-dark);
    margin: 0;
  }

  .champ-cta-body {
    font-size: 16px;
    line-height: 1.6;
    color: var(--on-dark-soft);
    margin: 16px 0 0;
  }

  .champ-cta-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    margin-top: 32px;
  }

  .champ-cta-btn {
    min-height: 44px;
    padding: 12px 24px;
  }

  .champ-cta-visual {
    position: relative;
    display: grid;
    place-items: center;
    min-height: 200px;
  }

  .champ-cta-piece {
    position: absolute;
    font-size: 80px;
    line-height: 1;
    opacity: 0.12;
  }

  .champ-cta-k {
    top: 10%;
    right: 20%;
    font-size: 100px;
    opacity: 0.08;
    animation: champ-float 6s ease-in-out infinite;
  }

  .champ-cta-q {
    bottom: 10%;
    left: 20%;
    font-size: 70px;
    opacity: 0.1;
    animation: champ-float 8s ease-in-out infinite -2s;
  }

  @keyframes champ-float {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-12px); }
  }

  @media (max-width: 767px) {
    .champ-cta-card {
      grid-template-columns: 1fr;
      padding: 40px 28px;
      gap: 24px;
    }
    .champ-cta-visual {
      display: none;
    }
  }
</style>
