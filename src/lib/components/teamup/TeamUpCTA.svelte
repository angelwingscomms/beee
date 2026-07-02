<script lang="ts">
  import { motionFadeUp } from '$lib/actions/motion';
  import RegisterBtn from '$lib/components/RegisterBtn.svelte';
</script>

<section class="tu-cta" use:motionFadeUp>
  <div class="tu-cta-inner">
    <h2 class="tu-cta-title">Ready to develop beyond the board?</h2>
    <p class="tu-cta-body">
      Join the BEEE Spectacular Chess Championship and unlock the full TEAMUP Development Programme — where every move builds a brighter future.
    </p>
    <RegisterBtn href="/register" class="tu-cta-btn">Register Now</RegisterBtn>
  </div>
</section>

<style>
  .tu-cta {
    margin: 0 auto;
  }

  .tu-cta-inner {
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

  :global(.tu-cta-btn) {
    height: 48px;
    padding: 0 36px;
    margin-top: 32px;
    font-size: 15px;
    font-weight: 600;
  }

  @media (max-width: 767px) {
    .tu-cta-inner {
      padding: 48px 28px;
    }
      :global(.tu-cta-btn) {
        width: 100%;
      }
  }
</style>