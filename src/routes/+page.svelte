<script lang="ts">
	import Hero from '$lib/components/home/Hero.svelte';
	import Pillars from '$lib/components/home/Pillars.svelte';
	import Different from '$lib/components/home/Different.svelte';
	import Journey from '$lib/components/home/Journey.svelte';
	import TeamUp from '$lib/components/home/TeamUp.svelte';
	import Passport from '$lib/components/home/Passport.svelte';
	import FinalCTA from '$lib/components/home/FinalCTA.svelte';
</script>

<svelte:head>
	<title>BEEE Spectacular Chess Championship Abuja 2026</title>
	<meta name="description" content="More Than A Chess Championship. Compete. Develop. Excel. Join the BEEE Spectacular Chess Championship Abuja 2026 and access the T.E.A.M.U.P. Development Programme." />
</svelte:head>

<Hero />
<Pillars />
<Different />
<Journey />
<TeamUp />
<Passport />
<FinalCTA />

<style>
	:global(body) {
		background: var(--canvas);
	}
</style>
