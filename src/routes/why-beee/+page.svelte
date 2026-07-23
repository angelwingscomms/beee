<script lang="ts">
  import aboutBg from '$lib/assets/images/championship/about-new.png?enhanced';
  import { revealLines, revealFade } from '$lib/motion/reveal';
</script>

<section class="why-hero rv-field-night" style="background-image: url({aboutBg.img.src})">
  <div class="why-scrim"></div>
  <div class="rv-wrap why-grid">
    <div class="why-sticky">
      <p class="rv-micro why-eyebrow">WHY CHESS · WHY NOW</p>
      <h1 class="rv-d2" use:revealLines>Why BEEE?</h1>
    </div>
    <div class="why-text" use:revealFade>
      <p class="rv-body-lg why-intro">Every child holds extraordinary potential. We build strategic thinkers, confident leaders, and lifelong learners , one move at a time.</p>
      <blockquote class="rv-note why-quote">Chess is not the destination. It is the platform.</blockquote>
      <div class="why-vision">
        <span class="rv-micro why-vision-eyebrow">OUR VISION</span>
        <p class="rv-body">A generation of confident thinkers who carry chess-forged skills into academics, leadership, and life.</p>
      </div>
      <a href="/register" class="rv-btn rv-btn--beam felt">Register Now →</a>
    </div>
  </div>
</section>

<style>
  .why-hero {
    position: relative;
    background-size: cover;
    background-position: center;
    padding-block: calc(var(--section-pad) + 72px) var(--section-pad);
  }

  .why-scrim {
    position: absolute;
    inset: 0;
    pointer-events: none;
    background: linear-gradient(100deg, rgba(10, 15, 26, 0.2) 0%, rgba(10, 15, 26, 0.72) 46%, rgba(10, 15, 26, 0.92) 100%);
  }

  .why-grid {
    position: relative;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--space-6);
    align-items: start;
  }

  .why-sticky {
    position: sticky;
    top: 96px;
  }

  .why-eyebrow {
    color: var(--honey);
    margin-bottom: var(--space-2);
  }

  .why-text {
    max-width: 60ch;
  }

  .why-intro {
    color: var(--dusk-ink);
  }

  .why-quote {
    margin: var(--space-5) 0;
    font-size: var(--fs-d3);
    color: var(--beam);
    line-height: 1.25;
  }

  .why-vision {
    margin-bottom: var(--space-5);
  }

  .why-vision-eyebrow {
    display: block;
    color: var(--dusk-body);
    margin-bottom: 8px;
  }

  .why-vision p {
    color: var(--dusk-ink);
  }

  @media (--sm-down) {
    .why-grid {
      grid-template-columns: 1fr;
      gap: var(--space-4);
    }
    .why-sticky {
      position: static;
    }
  }
</style>
