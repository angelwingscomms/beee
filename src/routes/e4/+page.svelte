<script lang="ts">
  import PageHero from '$lib/components/system/PageHero.svelte';
  import CTABand from '$lib/components/system/CTABand.svelte';
  import FeatureRows from '$lib/components/system/FeatureRows.svelte';
  import { revealImage } from '$lib/motion/reveal';

  const features = [
    { index: '01', title: 'Guided AI Instruction', body: 'Learn and improve at your own pace with personalised AI feedback.' },
    { index: '02', title: 'Step-by-step strategy coaching', body: 'Master sophisticated strategies and tactical patterns.' },
    { index: '03', title: 'Train like the pros', body: 'The same engine-backed analysis top players prepare with.' },
    { index: '04', title: 'Deep Game Analysis', body: 'Break down every move to reveal strengths and areas for improvement.' },
    { index: '05', title: 'Virtual & Real Opponents', body: 'Play against AI or real opponents across different styles.' },
    { index: '06', title: 'Custom Puzzles', body: 'Train with puzzles auto-generated from real game mistakes.' }
  ];
</script>

<PageHero eyebrow="E4™ · THE AI CHESS COACH" title="e4™" sub="AI Chess Coach" />

<section class="rv-section rv-section--flush e4-intro">
  <div class="rv-wrap">
    <p class="rv-body">An AI-assisted chess learning platform providing guided instruction, game analysis, and personalised practice.</p>
    <p class="rv-body">e4 analyses every move as your child plays , flagging mistakes, suggesting better plans, and answering questions by voice or text.</p>
  </div>
</section>

<section class="rv-section rv-section--flush">
  <div class="rv-wrap">
    <div class="rv-frame e4-frame" use:revealImage>
      <img
        src="/images/e4-ui.webp"
        alt="The e4 AI chess coach interface showing live move analysis for a young player"
        width="1536"
        height="1024"
        loading="lazy"
        decoding="async"
      />
    </div>
  </div>
</section>

<section class="rv-section">
  <div class="rv-wrap">
    <h2 class="rv-d3 e4-features-title">Benefits of e4™</h2>
    <FeatureRows items={features} />
  </div>
</section>

<CTABand title="Ready to Train Smarter?" sub="Give your child an edge with AI-powered chess coaching." ctaLabel="Start Your Child's Journey" />

<style>
  .e4-intro .rv-body + .rv-body {
    margin-top: var(--space-3);
  }

  .e4-frame {
    aspect-ratio: 16 / 10;
  }

  .e4-features-title {
    margin-bottom: var(--space-6);
  }
</style>
