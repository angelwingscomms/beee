<script lang="ts">
  import { GraduationCap } from '@lucide/svelte';
  import { motionFadeUp } from '$lib/actions/motion';
</script>

<section class="final-cta-section noise">
  <div class="container final-cta-card" use:motionFadeUp>
    <GraduationCap size={36} />
    <h2>Every Great Journey Begins With A Move</h2>
    <p>Register today and give your child the opportunity to learn, compete, develop and excel.</p>
    <div class="cta-row center">
      <a class="primary-cta" href="/register">Register Now</a>
      <a class="secondary-cta" href="#passport">Download Prospectus</a>
    </div>
  </div>
</section>

<style>
  .final-cta-section { position: relative; background: var(--surface-dark); padding: 110px 0; }
  .container { width: min(1180px, calc(100% - 40px)); margin: 0 auto; }
  .final-cta-card { max-width: 900px; text-align: center; }
  .final-cta-card svg { color: var(--gold); }
  .final-cta-card h2 {
    font-family: var(--font-championship), var(--font-registration), sans-serif;
    font-weight: 800; font-size: clamp(2.2rem, 5vw, 5rem); line-height: 1; color: var(--text);
  }
  .final-cta-card p { max-width: 620px; margin: 20px auto 0; color: var(--muted-dark); font-size: 18px; line-height: 1.6; }
  .cta-row { display: flex; align-items: center; flex-wrap: wrap; gap: 12px; margin-top: 30px; }
  .center { justify-content: center; }
  .primary-cta {
    display: inline-flex; min-height: 48px; align-items: center; justify-content: center;
    border-radius: 8px; padding: 0 20px; font-size: 14px; font-weight: 800;
    border: 1px solid var(--primary); background: var(--primary);
    color: var(--on-primary);
    transition: transform 180ms ease;
  }
  .primary-cta:hover { transform: translateY(-2px); }
  .secondary-cta {
    display: inline-flex; min-height: 48px; align-items: center; justify-content: center;
    border-radius: 8px; padding: 0 20px; font-size: 14px; font-weight: 800;
    border: 1px solid rgba(255, 255, 255, 0.22); background: rgba(255, 255, 255, 0.06);
    color: var(--text); transition: transform 180ms ease;
  }
  .secondary-cta:hover { transform: translateY(-2px); }
  @media (max-width: 700px) { .final-cta-section { padding: 72px 0; } }
</style>
