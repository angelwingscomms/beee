<script lang="ts">
	import { onMount } from 'svelte';
	import Navbar from '$lib/components/home/Navbar.svelte';
	import Hero from '$lib/components/home/Hero.svelte';
	import TrustBar from '$lib/components/home/TrustBar.svelte';
	import WhyBeee from '$lib/components/home/WhyBeee.svelte';
	import Journey from '$lib/components/home/Journey.svelte';
	import Passport from '$lib/components/home/Passport.svelte';
	import ProgressTracking from '$lib/components/home/ProgressTracking.svelte';
	import Benefits from '$lib/components/home/Benefits.svelte';
	import Parents from '$lib/components/home/Parents.svelte';
	import Awards from '$lib/components/home/Awards.svelte';
	import FAQ from '$lib/components/home/FAQ.svelte';
	import FinalCTA from '$lib/components/home/FinalCTA.svelte';
	import Footer from '$lib/components/home/Footer.svelte';

	onMount(() => {
		if (typeof window === 'undefined') return;
		if (window.CSS?.supports('animation-timeline: scroll()') && window.CSS.supports('animation-range: cover 0% cover 100%')) {
			document.documentElement.classList.add('supports-scroll-animation');
		}
	});
</script>

<svelte:head>
	<title>BEEE Spectacular Chess Championship — Every Move Builds a Future</title>
	<meta name="description" content="The BEEE T.E.A.M.U.P. youth development journey culminates in the Spectacular Chess Championship. Register your child for an elite program blending chess, technology, enterprise, art, mentorship, upskilling, and personal growth." />
	<meta name="viewport" content="width=device-width, initial-scale=1" />
</svelte:head>

<Navbar />

<!-- HERO (sticky with scroll-driven animation) -->
<div class="sticky-section hero-scroll" style="height: 150vh">
	<div class="sticky-inner">
		<Hero />
	</div>
</div>

<TrustBar />
<WhyBeee />
<Passport />

<ProgressTracking />

<!-- JOURNEY / TIMELINE (sticky with scroll-driven animation) -->
<div class="sticky-section section-soft timeline-scroll" style="height: 300vh">
	<div class="sticky-inner">
		<Journey />
	</div>
</div>

<Benefits />
<Parents />
<Awards />
<FAQ />
<FinalCTA />
<Footer />

<style>
	/* ── Container ── */
	.container {
		width: min(1200px, calc(100% - 48px));
		margin: 0 auto;
	}

	/* ── Sticky chapter system ── */
	.sticky-section {
		position: relative;
		width: 100%;
	}
	.sticky-inner {
		position: sticky;
		top: 0;
		height: 100vh;
		display: flex;
		align-items: center;
	}
	.sticky-inner > section {
		width: 100%;
	}
	:global(html:not(.supports-scroll-animation)) .sticky-section {
		height: auto !important;
	}
	:global(html:not(.supports-scroll-animation)) .sticky-inner {
		position: static;
		height: auto;
	}
	@media (max-width: 1023px) {
		.sticky-inner {
			align-items: flex-start;
		}
	}

	/* ── Keyframes ── */
	@keyframes fade-up { from { opacity: 0; translate: 0 25px; } to { opacity: 1; translate: 0 0; } }
	@keyframes fade-up-lg { from { opacity: 0; translate: 0 40px; } to { opacity: 1; translate: 0 0; } }
	@keyframes fade-left { from { opacity: 0; translate: -30px 0; } to { opacity: 1; translate: 0 0; } }
	@keyframes scale-in { from { opacity: 0; scale: 0; } to { opacity: 1; scale: 1; } }
	@keyframes grow-x { from { width: 0%; } to { width: 100%; } }
	@keyframes draw-ring { from { stroke-dashoffset: 138.23; } to { stroke-dashoffset: 0; } }
	@keyframes blur-out { from { filter: blur(16px); } to { filter: blur(0px); } }
	@keyframes hint-out { from { opacity: 1; } to { opacity: 0; } }

	:global(.badge-ring-1),
	:global(.badge-ring-2),
	:global(.badge-ring-3),
	:global(.badge-ring-4),
	:global(.badge-ring-5),
	:global(.badge-ring-6) {
		stroke-dasharray: 138.23;
		stroke-dashoffset: 0;
	}

	@supports (animation-timeline: scroll()) {
		.hero-scroll { view-timeline-name: --hero; view-timeline-axis: block; }
		.timeline-scroll { view-timeline-name: --timeline; view-timeline-axis: block; }

		:global(.supports-scroll-animation) :global(.milestone),
		:global(.supports-scroll-animation) :global(.appear-on-scroll) > * {
			opacity: 0;
		}

		:global(.hero-title) { animation: fade-up-lg linear forwards; animation-timeline: --hero; animation-range: cover 0% cover 25%; }
		:global(.hero-subtitle) { animation: fade-up linear forwards; animation-timeline: --hero; animation-range: cover 15% cover 40%; }
		:global(.hero-actions) { animation: fade-up linear forwards; animation-timeline: --hero; animation-range: cover 30% cover 55%; }

		:global(.timeline-line) { animation: grow-x linear forwards; animation-timeline: --timeline; animation-range: cover 0% cover 60%; }
		:global(.milestone-1) { animation: fade-left linear forwards; animation-timeline: --timeline; animation-range: cover 5% cover 25%; }
		:global(.milestone-2) { animation: fade-left linear forwards; animation-timeline: --timeline; animation-range: cover 20% cover 40%; }
		:global(.milestone-3) { animation: fade-left linear forwards; animation-timeline: --timeline; animation-range: cover 35% cover 55%; }
		:global(.milestone-4) { animation: fade-left linear forwards; animation-timeline: --timeline; animation-range: cover 50% cover 70%; }
		:global(.milestone-5) { animation: fade-left linear forwards; animation-timeline: --timeline; animation-range: cover 65% cover 85%; }
		:global(.milestone-6) { animation: fade-left linear forwards; animation-timeline: --timeline; animation-range: cover 80% cover 100%; }
	}

	@media (prefers-reduced-motion: reduce) {
		:global(.hero-title), :global(.hero-subtitle), :global(.hero-actions),
		:global(.timeline-line), :global(.milestone),
		:global(.appear-on-scroll) > * {
			animation: none !important;
			opacity: 1 !important;
			translate: none !important;
			scale: none !important;
			filter: none !important;
			width: auto !important;
		}
		:global(.progress-fill) { width: 100% !important; }
	}
</style>
