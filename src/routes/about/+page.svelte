<script lang="ts">
  import PageHero from '$lib/components/system/PageHero.svelte';
  import CTABand from '$lib/components/system/CTABand.svelte';
  import FeatureRows from '$lib/components/system/FeatureRows.svelte';
  import { revealFade } from '$lib/motion/reveal';

  const features = [
    { index: '01', title: 'Structured Learning', body: 'A guided programme with weekly goals.' },
    { index: '02', title: 'Achievement Tracking', body: 'Tracking of achievements, with recognition for personal growth, skills development, and outstanding accomplishments across BEEE programmes.' },
    { index: '03', title: 'Network & Collaborate', body: 'Opportunities to network, collaborate, and share experiences with like-minded individuals.' },
    { index: '04', title: 'Digital Tools & Mentorship', body: 'Access to innovative digital tools, mentorship, and immersive learning experiences.' },
    { index: '05', title: 'Life Skills Development', body: 'Development of skills that support success in education, leadership, enterprise, and life.' }
  ];
</script>

<PageHero eyebrow="BEEE® · BE EVERYTHING EXCELLENT EVERY DAY" title="BEEE™" sub="A Vision and Mission Beyond a Championship" />

<section class="rv-section rv-section--flush">
  <div class="rv-wrap">
    <p class="rv-body">BEEE (Be Everything Excellent Every Day) is a learning and development platform for young people. We combine structured programmes, digital tools, and mentorship so students grow in education, leadership, and life.</p>
  </div>
</section>

<section class="rv-field-night rv-section about-belief">
  <div class="rv-wrap">
    <p class="rv-body-lg about-belief-text" use:revealFade>We believe every young person has extraordinary potential. Our job is to give it structure: purposeful learning, real mentors, and real challenges.</p>
  </div>
</section>

<section class="rv-section">
  <div class="rv-wrap">
    <h2 class="rv-d3 about-features-title">Benefits of BEEE Programmes</h2>
    <FeatureRows items={features} />
  </div>
</section>

<CTABand title="Aspire to BEEE" sub="Be Everything Excellent Every Day. Start your journey today." ctaLabel="Start Your Child's Journey" />

<style>
  .about-belief-text {
    max-width: 52ch;
    margin-inline: auto;
    text-align: center;
    color: var(--dusk-ink);
  }

  .about-features-title {
    margin-bottom: var(--space-6);
  }
</style>
