<script lang="ts">
  import Intro from '$lib/components/home2/Intro.svelte';
  import HomeCanvas from '$lib/components/home2/HomeCanvas.svelte';
  import JourneyRail from '$lib/components/home2/JourneyRail.svelte';
  import HeroWalk from '$lib/components/home2/HeroWalk.svelte';
  import Manifesto from '$lib/components/home2/Manifesto.svelte';
  import JourneyMap from '$lib/components/home2/JourneyMap.svelte';
  import KnightInterlude from '$lib/components/home2/KnightInterlude.svelte';
  import PrismSplit from '$lib/components/home2/PrismSplit.svelte';
  import Platforms from '$lib/components/home2/Platforms.svelte';
  import Philosophy from '$lib/components/home2/Philosophy.svelte';
  import Awards from '$lib/components/home2/Awards.svelte';
  import Finale from '$lib/components/home2/Finale.svelte';
</script>

<svelte:head>
  <script type="application/ld+json">{
    "@context": "https://schema.org",
    "@type": "Event",
    "@id": "https://beeeproject.com/#championship-2026",
    "name": "BEEE Spectacular Chess Championship Abuja 2026",
    "description": "Chess, leadership, and life skills for Abuja kids aged 10-14. AI training, mentorship, and the TEAMUP programme.",
    "startDate": "2026-10-10",
    "endDate": "2026-10-10",
    "eventStatus": "https://schema.org/EventScheduled",
    "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
    "image": "https://beeeproject.com/og.png",
    "url": "https://beeeproject.com/",
    "location": { "@type": "Place", "name": "National Stadium, Abuja", "address": { "@type": "PostalAddress", "addressLocality": "Abuja", "addressCountry": "NG" } },
    "offers": { "@type": "Offer", "price": "15000", "priceCurrency": "NGN", "availability": "https://schema.org/InStock", "url": "https://beeeproject.com/register", "validFrom": "2026-01-01" },
    "organizer": { "@id": "https://beeeproject.com/#organization" },
    "performer": { "@id": "https://beeeproject.com/#organization" }
  }</script>
</svelte:head>

<Intro />
<HomeCanvas />
<JourneyRail />

<HeroWalk />
<Manifesto />
<JourneyMap />
<KnightInterlude />
<PrismSplit />
<Platforms />
<Philosophy />
<Awards />
<Finale />
