<script lang="ts">
  import { revealLines, revealFade } from '$lib/motion/reveal';
  import { glActive, glSection } from '$lib/gl/store';
</script>

<section id="finale" class="rv-field-night finale" use:glSection={'finale'}>
  <div class="finale-square" use:revealFade aria-hidden="true"></div>
  {#if !$glActive}
    <div class="rv-beam-fallback"></div>
  {/if}

  <div class="finale-content">
    <p class="rv-micro finale-eyebrow">SLOTS ARE LIMITED · FIRST COMPLETED, FIRST CONFIRMED</p>
    <h2 class="rv-d1" use:revealLines>Make your move.</h2>
    <p class="rv-body-lg finale-sub">₦15,000 covers everything: e4, TEAMUP, Taskify, the live rounds and the Grand Finale. Through a partner link it is ₦13,500.</p>
    <div use:revealFade>
      <a href="/register" class="rv-btn rv-btn--beam rv-btn--big felt">Register your child</a>
    </div>
    <p class="rv-micro finale-note">NO PRIOR CHESS EXPERIENCE REQUIRED</p>
  </div>
</section>

<style>
  .finale {
    min-height: 100svh;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    overflow: hidden;
    position: relative;
  }

  .finale-square {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 180px;
    height: 180px;
    background: color-mix(in srgb, var(--beam) 18%, transparent);
    border: 1px solid color-mix(in srgb, var(--beam) 45%, transparent);
    box-shadow: 0 0 120px 40px rgba(242, 120, 48, 0.18);
    transform: translate(-50%, -50%) perspective(600px) rotateX(55deg) translateY(90px);
  }

  @media (--sm-down) {
    .finale-square { width: 120px; height: 120px; }
  }

  .finale-content {
    position: relative;
    z-index: var(--z-content);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--space-3);
    max-width: 640px;
    padding-inline: var(--margin-x);
  }

  .finale-eyebrow { color: var(--honey); }
  .finale-sub { color: var(--dusk-body); }
  .finale-note { color: var(--dusk-body); margin-top: var(--space-1); }
</style>
