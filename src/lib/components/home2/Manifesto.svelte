<script lang="ts">
  import { revealLines, revealFade } from '$lib/motion/reveal';
  import { glSection } from '$lib/gl/store';
</script>

<section id="manifesto" class="rv-field-night manifesto" use:glSection={'manifesto'}>
  <div class="manifesto-inner">
    <h2 class="rv-d2 manifesto-line" use:revealLines>More than a</h2>
    <h2 class="rv-d2 manifesto-line" use:revealLines={{ delay: 0.15 }}>chess championship.</h2>
    <p class="rv-micro manifesto-caption" use:revealFade={{ delay: 0.4 }}>COMPETE · DEVELOP · EXCEL</p>
  </div>
</section>

<style>
  .manifesto {
    min-height: 100svh;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .manifesto-inner {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: var(--space-2);
    padding-inline: var(--margin-x);
  }

  .manifesto-line {
    max-width: 20ch;
  }

  .manifesto-caption {
    color: var(--honey);
    margin-top: var(--space-4);
  }
</style>
