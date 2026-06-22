<script lang="ts">
  import { Brain, Users, Lightbulb } from '@lucide/svelte';
  import { motionFadeUp } from '$lib/actions/motion';
</script>

<section class="section light" id="why">
  <div class="container">
    <div class="section-heading" use:motionFadeUp>
      <p class="section-kicker">Why BEEE</p>
      <h2>More Than A Tournament</h2>
      <p>Most championships end with a trophy. This one begins with a journey.</p>
    </div>
    <div class="three-grid">
      <article class="card" use:motionFadeUp>
        <Brain size={30} />
        <h3>Chess Development</h3>
        <p>Structured chess learning builds focus, pattern recognition, patience and decision quality before competition begins.</p>
      </article>
      <article class="card" use:motionFadeUp>
        <Users size={30} />
        <h3>Leadership & Mentorship</h3>
        <p>Participants are guided to communicate better, lead responsibly and treat excellence as a habit.</p>
      </article>
      <article class="card" use:motionFadeUp>
        <Lightbulb size={30} />
        <h3>Innovation & Upskilling</h3>
        <p>The journey connects strategy with technology, enterprise, creative thinking and practical projects.</p>
      </article>
    </div>
  </div>
</section>

<style>
  .section { padding: 104px 0; }
  .light { background: var(--cream); color: var(--ink-dark); }
  .container { width: min(1180px, calc(100% - 40px)); margin: 0 auto; }
  .section-heading { max-width: 760px; margin: 0 auto 44px; text-align: center; }
  .section-kicker {
    display: inline-flex; width: fit-content; margin: 0;
    border: 1px solid rgba(245, 184, 75, 0.28); border-radius: 999px;
    background: rgba(245, 184, 75, 0.09); color: var(--gold);
    padding: 7px 12px; font-size: 12px; font-weight: 900;
    letter-spacing: 0.08em; text-transform: uppercase;
  }
  .section-heading h2 {
    margin: 16px 0 0; font-family: var(--font-championship), var(--font-registration), sans-serif;
    font-weight: 800; font-size: clamp(2.1rem, 5vw, 4.4rem); line-height: 1.04; color: var(--ink-dark);
  }
  .section-heading p:not(.section-kicker) {
    max-width: 650px; margin: 18px auto 0; color: #6b6257; font-size: 18px; line-height: 1.6;
  }
  .three-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 18px; }
  .card {
    min-height: 280px; padding: 30px;
    border: 1px solid #ded3c3; border-radius: 8px; background: #fff;
    box-shadow: 0 18px 45px rgba(23, 22, 20, 0.06);
  }
  .card svg { color: var(--gold-dark); }
  .card h3 { margin: 22px 0 10px; font-size: 22px; color: var(--ink-dark); }
  .card p { margin: 0; color: #6b6257; line-height: 1.6; }
  @media (max-width: 1023px) { .three-grid { grid-template-columns: repeat(2, 1fr); } }
  @media (max-width: 700px) { .section { padding: 72px 0; } .three-grid { grid-template-columns: 1fr; } }
</style>
