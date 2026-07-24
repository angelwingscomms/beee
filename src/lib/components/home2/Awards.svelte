<script lang="ts">
  import { revealLines, revealChildren } from '$lib/motion/reveal';
  import { glSection } from '$lib/gl/store';

  const AWARDS = [
    { index: '01', name: 'TEAMUP™ Excellence Awards', line: 'Celebrating whole-child excellence, rewarding with a variety of honours.' },
    { index: '02', name: 'Medals & Awards', line: 'Top performers honoured across competitive categories.' },
    { index: '03', name: 'Badges of Competence', line: 'Verified skills, milestones, and proficiencies.' },
    { index: '04', name: 'Certificates of Participation', line: 'Recognition for every child who joins the journey.' },
    { index: '05', name: 'Certificates of Achievement', line: 'For measurable growth and accomplishment.' },
    { index: '06', name: 'Leadership Recognition', line: 'For those who step up and lead by example.' },
    { index: '07', name: 'Innovation & Creativity', line: 'Honouring original thinking and design.' },
    { index: '08', name: 'Special Merit Awards', line: 'Distinctive individual contribution.' },
    { index: '09', name: 'School Recognition', line: 'Celebrating participation and collective spirit.' }
  ];
</script>

<section id="awards" class="rv-field-cloud rv-section" use:glSection={'ambient'}>
  <div class="rv-wrap">
    <p class="rv-micro awards-eyebrow">AWARDS &amp; RECOGNITION</p>
    <h2 class="rv-d2" use:revealLines>Honours worth <span class="rv-note">competing for</span>.</h2>

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
