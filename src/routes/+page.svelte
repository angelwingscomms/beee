<script lang="ts">
  import ChampHero from '$lib/components/championship/ChampHero.svelte';
  import ChampAbout from '$lib/components/championship/ChampAbout.svelte';
  import ChampFeatures from '$lib/components/championship/ChampFeatures.svelte';
  import ChampHow from '$lib/components/championship/ChampHow.svelte';
  import ChampMarquee from '$lib/components/championship/ChampMarquee.svelte';
  import ChampCTA from '$lib/components/championship/ChampCTA.svelte';
</script>

<svelte:head>
  <title>Championship — BEEE Spectacular Chess Championship Abuja 2026</title>
  <meta name="description" content="More Than A Chess Championship. The BEEE Spectacular Chess Championship Abuja 2026 combines competitive chess with structured learning, mentorship, and personal growth through the T.E.A.M.U.P. Programme." />
</svelte:head>

<div class="overflow-x-hidden w-full max-w-full">
  <ChampHero />
  <ChampAbout />
  <ChampFeatures />
  <ChampHow />
  <ChampMarquee />
  <ChampCTA />
</div>
