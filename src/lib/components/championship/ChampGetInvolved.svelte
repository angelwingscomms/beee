<script lang="ts">
  import Button from '$lib/components/Button.svelte';
  import { motionFadeUp } from '$lib/actions/motion';
</script>

<section class="section-dark champ-involved" use:motionFadeUp>
  <div class="container" style="padding: 120px 0;">
    <div class="champ-involved-grid">
      <div class="champ-involved-col">
        <h3 class="champ-involved-title">Why Participate?</h3>
        <ul class="champ-involved-list">
          <li>Receive advanced chess training.</li>
          <li>Develop strategic and analytical thinking skills.</li>
          <li>Build leadership and confidence.</li>
          <li>Participate in mentorship and personal development activities.</li>
          <li>Earn badges, certificates, scholarships, and recognition awards.</li>
          <li>Connect with talented young players across Abuja.</li>
          <li>Compete for the BEEE Spectacular Chess Championship title.</li>
        </ul>
      </div>
      <div class="champ-involved-col">
        <h3 class="champ-involved-title">Information for Schools</h3>
        <p class="champ-involved-text">Participating schools receive a unique registration code through which eligible players may enrol in the programme.</p>
        <p class="champ-involved-text">The TEAMUP™ Development Programme complements summer learning by providing meaningful developmental opportunities that continue beyond the classroom.</p>
      </div>
      <div class="champ-involved-col">
        <h3 class="champ-involved-title">Registration</h3>
        <p class="champ-involved-text">Early registration provides greater opportunities to participate fully, complete more activities, earn additional Development Passport points, and maximise the overall learning experience.</p>
        <div class="champ-involved-action">
          <Button href="/register" class="champ-involved-btn">Register Now</Button>
        </div>
      </div>
    </div>
  </div>
</section>

<style>
  .champ-involved-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 32px;
  }

  .champ-involved-col {
    display: grid;
    gap: 12px;
    align-content: start;
  }

  .champ-involved-title {
    font-family: var(--font-display);
    font-size: clamp(1.4rem, 2.2vw, 1.8rem);
    font-weight: 500;
    line-height: 1.15;
    letter-spacing: -0.01em;
    color: var(--on-dark);
    margin: 0;
  }

  .champ-involved-text {
    font-size: 14px;
    line-height: 1.6;
    color: var(--on-dark-soft);
    margin: 0;
  }

  .champ-involved-list {
    display: grid;
    gap: 8px;
    list-style: none;
    margin: 0;
    padding: 0;
  }

  .champ-involved-list li {
    position: relative;
    padding-left: 20px;
    font-size: 14px;
    line-height: 1.5;
    color: var(--on-dark-soft);
  }

  .champ-involved-list li::before {
    content: '';
    position: absolute;
    left: 0;
    top: 9px;
    width: 6px;
    height: 6px;
    border-radius: 999px;
    background: var(--primary);
  }

  .champ-involved-action {
    margin-top: 8px;
  }

  :global(.champ-involved-btn) {
    min-height: 44px;
    padding: 12px 24px;
    font-size: 14px;
  }

  @media (--md-down) {
    .champ-involved-grid {
      grid-template-columns: 1fr 1fr;
      gap: 40px;
    }
    .champ-involved-col:last-child {
      grid-column: 1 / -1;
    }
  }

  @media (--sm-down) {
    .champ-involved-grid {
      grid-template-columns: 1fr;
      gap: 40px;
    }
    .champ-involved-col:last-child {
      grid-column: 1;
    }
  }
</style>
