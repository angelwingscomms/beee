<script lang="ts">
  import { revealLines } from '$lib/motion/reveal';
  import { glSection } from '$lib/gl/store';
</script>

<section id="philosophy" class="rv-field-cloud philosophy" use:glSection={'ambient'}>
  <div class="philosophy-sticky">
    <h2 class="rv-d1 philosophy-line" use:revealLines={{ start: 'top 70%' }}>Chess is not the destination.</h2>
    <h2 class="rv-d1 philosophy-line" use:revealLines={{ start: 'top 70%' }}>It is the <span class="rv-note">platform</span>.</h2>
  </div>
</section>

<style>
  .philosophy {
    height: 130vh;
    position: relative;
  }

  .philosophy-sticky {
    position: sticky;
    top: 0;
    height: 100svh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
  }

  .philosophy-line {
    max-width: 14ch;
  }

  @media (prefers-reduced-motion: reduce) {
    .philosophy { height: auto; }
    .philosophy-sticky { position: static; height: auto; padding-block: var(--section-pad); }
  }
</style>
