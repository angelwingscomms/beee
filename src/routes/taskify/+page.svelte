<script lang="ts">
  import PageHero from '$lib/components/system/PageHero.svelte';
  import CTABand from '$lib/components/system/CTABand.svelte';
  import FeatureRows from '$lib/components/system/FeatureRows.svelte';
  import { revealImage } from '$lib/motion/reveal';

  const features = [
    { index: '01', title: 'Skill Milestones', body: 'Track growth in strategic thinking, problem-solving, and leadership.' },
    { index: '02', title: 'Game Assessments', body: 'Measure chess performance and improvement through game data.' },
    { index: '03', title: 'Innovation Challenges', body: 'Solve creative challenges and develop original solutions.' },
    { index: '04', title: 'Leadership Activities', body: 'Build collaboration, communication, and team management skills.' },
    { index: '05', title: 'Mentorship Participation', body: 'Stay engaged with experienced educators and professionals.' },
    { index: '06', title: 'Project Completion', body: 'Demonstrate follow-through and the ability to deliver results.' },
    { index: '07', title: 'Attendance Records', body: 'Earn rewards for reliability and consistent participation.' },
    { index: '08', title: 'Personal Growth', body: 'Develop self-awareness and a growth mindset through reflection.' },
    { index: '09', title: 'Badges & Awards', body: 'Celebrate every achievement with badges and recognition.' }
  ];
</script>

<PageHero eyebrow="TASKIFY™ · THE DEVELOPMENT PASSPORT" title="Taskify™" sub="Digital Development Passport" />

<section class="rv-section rv-section--flush">
  <div class="rv-wrap">
    <p class="rv-body">Your child doesn't just attend , every badge, milestone, project, and certificate is recorded in their own Taskify™ passport. By the Grand Finale, they'll have a documented record of what they built, won, and learned.</p>
  </div>
</section>

<section class="rv-section rv-section--flush">
  <div class="rv-wrap">
    <div class="rv-frame taskify-frame" use:revealImage>
      <img
        src="/images/rv/passport-macro.webp"
        alt="The Taskify development passport booklet"
        loading="lazy"
        decoding="async"
      />
    </div>
  </div>
</section>

<section class="rv-section">
  <div class="rv-wrap">
    <h2 class="rv-d3 taskify-features-title">How Progress Is Measured</h2>
    <FeatureRows items={features} />
    <p class="rv-body taskify-closing">This system provides participants and parents with a visible track record of achievement throughout the championship cycle.</p>
  </div>
</section>

<CTABand title="Start Building Their Record" sub="Every achievement deserves to be documented and celebrated." ctaLabel="Start Your Child's Journey" />

<style>
  .taskify-frame {
    aspect-ratio: 4 / 3;
    max-width: 640px;
  }

  .taskify-features-title {
    margin-bottom: var(--space-6);
  }

  .taskify-closing {
    margin-top: var(--space-6);
  }
</style>
