<script lang="ts">
  import RegistrationForm from '../../components/RegistrationForm.svelte';
  import { motionFadeUp, motionScaleIn } from '$lib/actions/motion';
</script>

<svelte:head>
  <title>Register — BEEE Spectacular Chess Championship Abuja 2026</title>
  <meta name="description" content="Register your child for the BEEE T.E.A.M.U.P. programme and Spectacular Chess Championship Abuja 2026." />
</svelte:head>

<div class="overflow-x-hidden w-full max-w-full">
  <section class="reg-hero">
    <div class="reg-hero-noise"></div>
    <div class="reg-hero-glow"></div>
    <div class="container reg-hero-inner" use:motionFadeUp>
      <h1 class="reg-hero-title">
        Secure Your Child's
        <span
          class="reg-hero-inline-img"
          style="background-image: url(https://picsum.photos/seed/chess-knight/200/80);"
        ></span>
        Place in the Championship
      </h1>

    </div>
  </section>

  <section class="reg-form-section" id="form">
    <div class="reg-form-bg"></div>
    <div class="container" style="padding: 100px 0 120px;">
      <div class="reg-form-card" use:motionScaleIn>
        <RegistrationForm />
      </div>
    </div>
  </section>
</div>

<style>
  .reg-hero {
    position: relative;
    min-height: 70dvh;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    background: var(--canvas);
    padding-top: 120px;
  }

  .reg-hero-noise {
    position: absolute;
    inset: 0;
    opacity: 0.035;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
    background-repeat: repeat;
    background-size: 256px 256px;
    pointer-events: none;
    z-index: 0;
  }

  .reg-hero-glow {
    position: absolute;
    inset: 0;
    pointer-events: none;
    z-index: 0;
    background:
      radial-gradient(ellipse 60% 50% at 20% 40%, rgba(242, 120, 48, 0.08), transparent 70%),
      radial-gradient(ellipse 50% 50% at 80% 60%, rgba(255, 178, 0, 0.05), transparent 60%);
  }

  .reg-hero-inner {
    position: relative;
    z-index: 1;
    text-align: center;
    padding: 80px 0;
  }

  .reg-hero-title {
    font-family: var(--font-display);
    font-size: clamp(2.8rem, 5vw, 4.5rem);
    font-weight: 500;
    line-height: 1.06;
    letter-spacing: -0.02em;
    color: var(--ink);
    margin: 0 auto;
    max-width: 48rem;
    text-wrap: balance;
  }

  .reg-hero-inline-img {
    display: inline-block;
    width: 80px;
    height: 36px;
    border-radius: 999px;
    vertical-align: middle;
    background-size: cover;
    background-position: center;
    margin: -6px 8px 0;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06), 0 0 0 2px rgba(255, 255, 255, 0.2);
  }

  .reg-form-section {
    position: relative;
    background: var(--canvas);
    overflow: hidden;
  }

  .reg-form-bg {
    position: absolute;
    inset: 0;
    pointer-events: none;
    background:
      radial-gradient(ellipse 60% 40% at 30% 30%, rgba(242, 120, 48, 0.05), transparent 60%),
      radial-gradient(ellipse 40% 40% at 80% 70%, rgba(255, 178, 0, 0.03), transparent 50%);
  }

  .reg-form-card {
    position: relative;
    border-radius: 20px;
  }

  @media (max-width: 767px) {
    .reg-hero {
      min-height: auto;
      padding: 100px 0 60px;
    }
    .reg-hero-title {
      font-size: clamp(2rem, 8vw, 2.8rem);
    }
    .reg-hero-inline-img {
      width: 56px;
      height: 28px;
      margin: -4px 6px 0;
    }
  }
</style>
