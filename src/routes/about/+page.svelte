<script lang="ts">
  import ChampIntro from '$lib/components/championship/ChampIntro.svelte';
  import ChampAbout from '$lib/components/championship/ChampAbout.svelte';
  import ChampTestimonials from '$lib/components/championship/ChampTestimonials.svelte';
  import ChampGetInvolved from '$lib/components/championship/ChampGetInvolved.svelte';
  import ChampCTA from '$lib/components/championship/ChampCTA.svelte';
</script>

<svelte:head>
  <title>About BEEE — More Than a Chess Championship</title>
  <meta name="description" content="BEEE combines competitive chess with mentorship, leadership, and personal development for young people aged 10–14 across Abuja. Learn why this is more than a championship." />
</svelte:head>

<div class="overflow-x-hidden w-full max-w-full">
  <ChampIntro />
  <ChampAbout />
  <ChampTestimonials />
  <ChampGetInvolved />
  <ChampCTA />
</div>
