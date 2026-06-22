<script lang="ts">
  import { motionFadeUp } from '$lib/actions/motion';
</script>

<section class="final-cta" use:motionFadeUp>
  <div class="container">
    <div class="cta-card">
      <h2 class="cta-title">Ready To Begin?</h2>
      <p class="cta-body">
        Join a championship where every move contributes to growth,
        achievement, and future success.
      </p>
      <a href="/register" class="cta-button">Register Now</a>
    </div>
  </div>
</section>

<style>
  .final-cta {
    padding: 96px 0;
    background: var(--canvas);
  }

  .cta-card {
    border-radius: 12px;
    background: var(--primary);
    color: var(--on-primary);
    padding: 64px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    transition: box-shadow 240ms ease;
  }

  .cta-card:hover {
    box-shadow: 0 12px 40px rgba(242, 120, 48, 0.2);
  }

  .cta-title {
    font-family: var(--font-display);
    font-size: 32px;
    font-weight: 500;
    line-height: 1.15;
    letter-spacing: -0.01em;
    color: var(--on-primary);
    margin: 0;
  }

  .cta-body {
    font-size: 16px;
    line-height: 1.55;
    color: rgba(255, 255, 255, 0.85);
    margin: 14px 0 0;
    max-width: 560px;
  }

  .cta-button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    height: 44px;
    padding: 0 28px;
    margin-top: 28px;
    font-size: 15px;
    font-weight: 600;
    line-height: 1;
    border-radius: 8px;
    background: var(--canvas);
    color: var(--primary);
    text-decoration: none;
    border: none;
    transition: transform 180ms ease, box-shadow 180ms ease;
  }

  .cta-button:hover {
    transform: scale(1.03);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
  }

  .cta-button:active {
    transform: scale(0.98);
  }

  @media (max-width: 767px) {
    .final-cta {
      padding: 64px 0;
    }
    .cta-card {
      padding: 40px 28px;
    }
    .cta-title {
      font-size: 24px;
    }
    .cta-button {
      width: 100%;
    }
  }
</style>
