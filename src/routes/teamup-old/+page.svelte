<script lang="ts">
  import TeamUpHero from '$lib/components/teamup/TeamUpHero.svelte';
  import PillarsBento from '$lib/components/teamup/PillarsBento.svelte';
  import PassportSection from '$lib/components/teamup/PassportSection.svelte';
  import MarqueeStrip from '$lib/components/teamup/MarqueeStrip.svelte';
  import TeamUpCTA from '$lib/components/teamup/TeamUpCTA.svelte';
</script>

<svelte:head>
  <title>TEAMUP Programme (Archive) — BEEE Spectacular Chess Championship Abuja 2026</title>
  <meta name="description" content="Archived TEAMUP Development Programme page." />
</svelte:head>

<div class="overflow-x-hidden w-full max-w-full">
  <TeamUpHero />
  <PillarsBento />
  <MarqueeStrip />
  <PassportSection />
  <TeamUpCTA />
</div>
