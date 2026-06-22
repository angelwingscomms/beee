<script>
  import { observe } from '$lib/actions/observe';

  let cards = $state([
    { t: "Chess Development", d: "A structured chess program that builds foundational skills, sharpens strategic thinking, and challenges players at every level." },
    { t: "Leadership & Mentorship", d: "Mentorship-driven guidance that cultivates leadership, resilience, and a mindset built for growth both on and off the board." },
    { t: "Innovation & Upskilling", d: "A space where technology, creativity, and innovation converge — empowering participants to upskill and reimagine what's possible." }
  ]);
</script>

<section class="section-band" id="about">
  <div class="container">
    <h2 class="display-lg" style="margin-bottom: 16px">More Than A Tournament</h2>
    <p class="lead" style="margin-bottom: 48px; max-width: 600px">
      Most championships end with a trophy. This one begins with a journey.
    </p>
    <div class="feature-grid">
      {#each cards as card, i}
        <div class="feature-card" use:observe style="transition-delay: {i * 100}ms">
          <span class="spike-mark" style="color: var(--primary)"></span>
          <h3>{card.t}</h3>
          <p>{card.d}</p>
        </div>
      {/each}
    </div>
  </div>
</section>

<style>
  .feature-card {
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.6s ease, transform 0.6s ease, box-shadow 240ms ease, background 240ms ease;
    transform-style: preserve-3d;
    perspective: 800px;
  }

  .feature-card.in-view {
    opacity: 1;
    transform: translateY(0);
  }

  @media (prefers-reduced-motion: reduce) {
    .feature-card {
      opacity: 1;
      transform: none;
      transition: none;
    }
  }
</style>
