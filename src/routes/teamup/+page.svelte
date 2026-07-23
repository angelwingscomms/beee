<script lang="ts">
  import PageHero from '$lib/components/system/PageHero.svelte';
  import CTABand from '$lib/components/system/CTABand.svelte';
  import FeatureRows from '$lib/components/system/FeatureRows.svelte';
  import { revealImage } from '$lib/motion/reveal';

  const PILLARS = [
    { letter: 't', name: 'Technology', body: 'Using technology creatively and responsibly to solve problems and expand learning.' },
    { letter: 'e', name: 'Enterprise', body: 'Developing initiative, innovation and practical problem-solving skills.' },
    { letter: 'a', name: 'Art', body: 'Encouraging creativity, imagination, communication, and design thinking.' },
    { letter: 'm', name: 'Mentorship', body: 'Learning from experienced professionals, educators, and inspiring role models.' },
    { letter: 'u', name: 'Upskill', body: 'Building leadership, teamwork, strategic reasoning and other essential life skills for the future.' }
  ];

  const included = [
    { index: '01', title: 'Mentored learning sessions' },
    { index: '02', title: 'Chess training and development' },
    { index: '03', title: 'Leadership exercises' },
    { index: '04', title: 'Innovation challenges' },
    { index: '05', title: 'Collaborative projects' },
    { index: '06', title: 'Personal development activities' },
    { index: '07', title: 'Project-based challenges' },
    { index: '08', title: 'Assessments and milestone tracking' }
  ];
</script>

<PageHero
  field="night"
  eyebrow="TEAMUP™ · THE DEVELOPMENT PROGRAMME"
  title="The TEAMUP™ Development Programme"
  sub="A holistic approach to developing every child , building skills that last."
/>

{#each PILLARS as pillar, i (pillar.letter)}
  <section class="rv-section rv-field-{i % 2 === 0 ? 'cloud' : 'night'} pillar-section">
    <div class="rv-wrap rv-grid">
      <div class="pillar-text" class:pillar-text--shift={i === 1 || i === 3}>
        <span class="pillar-chip" style:background={`var(--spec-${pillar.letter})`}>{pillar.letter.toUpperCase()}</span>
        <h2 class="rv-d3 pillar-name">{pillar.name}</h2>
        <p class="rv-body">{pillar.body}</p>
      </div>
      {#if pillar.letter === 'm'}
        <div class="pillar-image">
          <div class="rv-frame" use:revealImage>
            <img
              src="/images/rv/teamup-mentor.webp"
              alt="A mentor working through ideas with three young participants"
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>
      {/if}
    </div>
  </section>
{/each}

<section class="rv-section rv-field-cloud">
  <div class="rv-wrap">
    <h2 class="rv-d3 included-title">What is included</h2>
    <FeatureRows items={included} />
  </div>
</section>

<CTABand />

<style>
  .pillar-text {
    grid-column: 2 / span 6;
  }

  .pillar-text--shift {
    grid-column: 6 / span 6;
  }

  .pillar-chip {
    width: 56px;
    height: 56px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #0A0F1A;
    font-family: var(--font-mono);
    font-weight: 700;
    font-size: 20px;
    margin-bottom: var(--space-3);
  }

  .pillar-name {
    margin-bottom: var(--space-2);
  }

  .pillar-image {
    grid-column: 1 / span 5;
    grid-row: 1;
  }

  .rv-frame {
    aspect-ratio: 4 / 3;
  }

  .included-title {
    margin-bottom: var(--space-6);
  }

  @media (--sm-down) {
    .pillar-text, .pillar-text--shift, .pillar-image {
      grid-column: 1 / -1;
    }
    .pillar-image { margin-bottom: var(--space-4); grid-row: auto; }
  }
</style>
