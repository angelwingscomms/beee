<script lang="ts">
  import { motionFadeUp } from '$lib/actions/motion';
</script>

<section class="tu-cta" use:motionFadeUp>
  <div class="tu-cta-inner">
    <h2 class="tu-cta-title">Ready to develop beyond the board?</h2>
    <p class="tu-cta-body">
      Join the BEEE Spectacular Chess Championship and unlock the full T.E.A.M.U.P. Development Programme — where every move builds a brighter future.
    </p>
    <a href="/register" class="tu-cta-btn">Register Now</a>
  </div>
</section>

<style>
  .tu-cta {
    padding: 0 24px;
    max-width: 800px;
    margin: 0 auto;
  }

  .tu-cta-inner {
    border-radius: 16px;
    background: var(--primary);
    color: var(--on-primary);
    padding: 72px 64px;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    transition: box-shadow 400ms ease;
  }

  .tu-cta-inner:hover {
    box-shadow: 0 16px 56px rgba(242, 120, 48, 0.25);
  }

  .tu-cta-title {
    font-family: var(--font-display);
    font-size: clamp(1.6rem, 3vw, 2.4rem);
    font-weight: 500;
    line-height: 1.12;
    letter-spacing: -0.01em;
    color: var(--on-primary);
    margin: 0;
  }

  .tu-cta-body {
    font-size: 16px;
    line-height: 1.6;
    color: rgba(255, 255, 255, 0.88);
    margin: 16px 0 0;
    max-width: 520px;
  }

  .tu-cta-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    height: 48px;
    padding: 0 36px;
    margin-top: 32px;
    font-size: 15px;
    font-weight: 600;
    line-height: 1;
    border-radius: 10px;
    background: var(--canvas);
    color: var(--primary);
    text-decoration: none;
    border: none;
    transition: transform 200ms ease, box-shadow 200ms ease;
  }

  .tu-cta-btn:hover {
    transform: scale(1.04);
    box-shadow: 0 6px 24px rgba(0, 0, 0, 0.12);
  }

  .tu-cta-btn:active {
    transform: scale(0.97);
  }

  @media (max-width: 767px) {
    .tu-cta-inner {
      padding: 48px 28px;
    }
    .tu-cta-btn {
      width: 100%;
    }
  }
</style>