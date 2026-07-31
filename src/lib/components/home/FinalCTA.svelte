<script lang="ts">
  import { motionFadeUp } from '$lib/actions/motion';
  import Button from '$lib/components/Button.svelte';
</script>

<div class="cta-card" use:motionFadeUp>
  <h2 class="cta-title">Ready To Begin?</h2>
  <p class="cta-body">
    Join a championship where every move contributes to growth,
    achievement, and future success.
  </p>
  <Button href="/register" class="cta-button">Register Now</Button>
</div>

<style>
  .cta-card {
    background: var(--primary);
    color: var(--on-primary);
    padding: 64px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    transition: box-shadow 240ms var(--ease-out);
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

  :global(.cta-button) {
    height: 44px;
    padding: 0 28px;
    margin-top: 28px;
    font-size: 15px;
    font-weight: 600;
  }

  @media (--sm-down) {
    .cta-card {
      padding: 40px 28px;
    }
    .cta-title {
      font-size: 24px;
    }
      :global(.cta-button) {
        width: 100%;
      }
  }
</style>
