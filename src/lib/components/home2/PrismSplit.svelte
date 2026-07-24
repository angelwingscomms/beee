<script lang="ts">
  import { revealLines, revealChildren, revealFade } from '$lib/motion/reveal';
  import { glSection } from '$lib/gl/store';

  const PILLARS = [
    { letter: 't', name: 'Technology', line: 'SOLVE REAL PROBLEMS WITH REAL TOOLS' },
    { letter: 'e', name: 'Enterprise', line: 'INITIATIVE, INNOVATION, PRACTICAL THINKING' },
    { letter: 'a', name: 'Art', line: 'CREATIVITY, COMMUNICATION, DESIGN' },
    { letter: 'm', name: 'Mentorship', line: 'LEARN BESIDE PEOPLE WORTH COPYING' },
    { letter: 'u', name: 'Upskill', line: 'LEADERSHIP, TEAMWORK, LIFE SKILLS' }
  ];
</script>

<section id="split" class="rv-field-night rv-section" use:glSection={'split'}>
  <div class="rv-wrap">
    <p class="rv-micro split-eyebrow">
      <span class="split-eyebrow-full">TEAMUP™ · TECHNOLOGY · ENTERPRISE · ART · MENTORSHIP · UPSKILL</span>
      <span class="split-eyebrow-short">TEAMUP™</span>
    </p>
    <h2 class="rv-d2 split-title" use:revealLines>One game in.<br />Five directions out.</h2>

    <div class="split-rows" use:revealChildren>
      {#each PILLARS as pillar (pillar.letter)}
        <div class="rv-row split-row">
          <span class="split-mark" style:color={`var(--spec-${pillar.letter})`} aria-hidden="true">{pillar.letter.toUpperCase()}</span>
          <div>
            <p class="rv-title">{pillar.name}</p>
            <p class="rv-micro split-line-desc">{pillar.line}</p>
          </div>
        </div>
      {/each}
    </div>

    <a href="/teamup" class="rv-micro rv-link split-exit" use:revealFade>EXPLORE TEAMUP →</a>
  </div>
</section>

<style>
  .split-eyebrow { color: var(--honey); }
  .split-eyebrow-short { display: none; }
  @media (--sm-down) {
    .split-eyebrow-full { display: none; }
    .split-eyebrow-short { display: inline; }
  }

  .split-title {
    margin-top: var(--space-2);
    max-width: 16ch;
  }

  .split-rows {
    margin-top: var(--space-6);
  }

  .split-mark {
    font-family: var(--font-mono);
    font-weight: 700;
    font-size: 20px;
  }

  .split-line-desc {
    color: var(--dusk-body);
    margin-top: 4px;
  }

  .split-exit {
    color: var(--honey);
    display: inline-block;
    margin-top: var(--space-5);
  }
</style>
