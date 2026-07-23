<script lang="ts">
  import { revealLines, revealChildren } from '$lib/motion/reveal';
  import { glSection } from '$lib/gl/store';

  const AWARDS = [
    { index: '01', name: 'Championship Trophy', line: 'The ultimate honour, lifted under the stadium lights.' },
    { index: '02', name: 'Medals & Awards', line: 'Top performers honoured across the competitive categories.' },
    { index: '03', name: 'Certificates of Participation', line: 'Every child who joins the journey is recognised.' },
    { index: '04', name: 'Certificates of Achievement', line: 'For measurable growth and accomplishment.' },
    { index: '05', name: 'TEAMUP™ Excellence Awards', line: 'Whole-child excellence, celebrated.' },
    { index: '06', name: 'Leadership Recognition Awards', line: 'For those who step up and lead by example.' },
    { index: '07', name: 'Innovation & Creativity Awards', line: 'Original thinking and design, honoured.' },
    { index: '08', name: 'Special Merit Awards', line: 'Distinctive individual contribution.' },
    { index: '09', name: 'School Recognition Awards', line: 'Participation and collective spirit, rewarded.' }
  ];
</script>

<section id="awards" class="rv-field-cloud rv-section" use:glSection={'ambient'}>
  <div class="rv-wrap">
    <p class="rv-micro awards-eyebrow">OCTOBER · NATIONAL STADIUM</p>
    <h2 class="rv-d2" use:revealLines>Every child leaves with more than they came with.</h2>

    <div class="awards-rows" use:revealChildren>
      {#each AWARDS as a, i (a.index)}
        <div class="rv-row">
          <span class="rv-micro" style:color={i === 0 ? 'var(--honey)' : undefined}>{a.index}</span>
          <p class="rv-title" style:color={i === 0 ? 'var(--honey)' : undefined}>{a.name}</p>
          <p class="rv-body awards-line">{a.line}</p>
        </div>
      {/each}
    </div>
  </div>
</section>

<style>
  .awards-eyebrow { color: var(--beam); }
  .awards-rows { margin-top: var(--space-6); }
  .awards-line { grid-column: 2; }

  @media (--md-up) {
    .rv-row { grid-template-columns: 64px 1fr 1fr; align-items: center; }
    .awards-line { grid-column: auto; }
  }
</style>
