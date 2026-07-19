<script lang="ts">
  const steps = [
    { num: 1, title: 'Online Training & Coaching', sub: 'July 28 – August 29, 2026', img: '/images/championship/learn.png' },
    { num: 2, title: 'Preliminary Championship Rounds', sub: 'September 2026', img: '/images/championship/compete.png' },
    { num: 3, title: 'Elite Stage', sub: 'Top qualifiers advance', img: '/images/championship/qualify.png' },
    { num: 4, title: 'Championship Grand Finale', sub: 'October 2026', img: '/images/championship/grandfinale.png' },
  ];
</script>

<section class="relative bg-navy py-16 md:py-20 px-6" aria-labelledby="home-journey-heading">
  <div class="max-w-7xl mx-auto">
    <div class="text-center mb-10 md:mb-14">
      <h2 id="home-journey-heading" class="font-hero text-3xl md:text-5xl text-white font-bold tracking-[-0.02em]">
        Your <span class="text-amber-400">Championship</span> Journey
      </h2>
    </div>

    <div class="hj-track flex flex-col md:flex-row items-stretch gap-3 md:gap-2">
      {#each steps as step, i}
        <div class="hj-card relative flex-1 rounded-3xl overflow-hidden border border-white/10">
          <img src={step.img} alt="" loading={i === 0 ? 'eager' : 'lazy'} class="absolute inset-0 w-full h-full object-cover" />
          <div class="absolute inset-0 bg-gradient-to-t from-navy via-navy/40 to-transparent"></div>
          <div class="relative z-10 h-full flex flex-col justify-end p-5">
            <span class="font-hero text-2xl font-extrabold text-amber-400 leading-none mb-1">{step.num}</span>
            <h3 class="font-hero text-white font-bold text-base leading-tight mb-1">{step.title}</h3>
            <p class="text-white/75 text-sm leading-snug">{step.sub}</p>
          </div>
        </div>
        {#if i < steps.length - 1}
          <div class="hj-chevron flex items-center justify-center text-amber-400 shrink-0" aria-hidden="true">
            <svg class="hj-chevron-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="M9 6l6 6-6 6" />
            </svg>
          </div>
        {/if}
      {/each}
    </div>

    <div class="text-center mt-8 md:mt-10">
      <a href="/championship" class="font-hero text-sm md:text-base font-semibold text-amber-400 hover:text-white transition-colors">
        See the full championship journey &rarr;
      </a>
    </div>
  </div>
</section>

<style>
  .hj-card {
    aspect-ratio: 3 / 4;
  }

  .hj-chevron-icon {
    width: 20px;
    height: 20px;
    transform: rotate(90deg);
  }

  @media (--md-up) {
    .hj-card {
      aspect-ratio: 3 / 4;
    }

    .hj-chevron-icon {
      transform: rotate(0deg);
    }
  }
</style>
