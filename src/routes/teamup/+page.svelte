<script lang="ts">
  import TeamUpNav from '$lib/components/teamup/TeamUpNav.svelte';
  import TeamUpHero from '$lib/components/teamup/TeamUpHero.svelte';
  import PillarsBento from '$lib/components/teamup/PillarsBento.svelte';
  import PassportSection from '$lib/components/teamup/PassportSection.svelte';
  import MarqueeStrip from '$lib/components/teamup/MarqueeStrip.svelte';
  import TeamUpCTA from '$lib/components/teamup/TeamUpCTA.svelte';
  import TeamUpFooter from '$lib/components/teamup/TeamUpFooter.svelte';
</script>

<svelte:head>
  <title>T.E.A.M.U.P. Programme — BEEE Spectacular Chess Championship Abuja 2026</title>
  <meta name="description" content="The T.E.A.M.U.P. Development Programme helps participants grow as chess players, learners, leaders, creators, and problem-solvers through Technology, Enterprise, Art, Mentorship, and Upskill." />
</svelte:head>

<div class="overflow-x-hidden w-full max-w-full">
  <TeamUpNav />
  <TeamUpHero />
  <PillarsBento />
  <MarqueeStrip />
  <PassportSection />
  <TeamUpCTA />
  <TeamUpFooter />
</div>