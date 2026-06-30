<script lang="ts">
  import ChampHero from '$lib/components/championship/ChampHero.svelte';
  import ChampIntro from '$lib/components/championship/ChampIntro.svelte';
  import ChampAbout from '$lib/components/championship/ChampAbout.svelte';
  import ChampFeatures from '$lib/components/championship/ChampFeatures.svelte';
  import ChampPassport from '$lib/components/championship/ChampPassport.svelte';
  import ChampHow from '$lib/components/championship/ChampHow.svelte';
  import ChampGetInvolved from '$lib/components/championship/ChampGetInvolved.svelte';
  import ChampCTA from '$lib/components/championship/ChampCTA.svelte';
</script>

<svelte:head>
  <title>BEEE Spectacular Chess Championship Abuja 2026 — More Than a Chess Championship</title>
  <meta name="description" content="The BEEE Spectacular Chess Championship Abuja 2026 is a unique youth development initiative that combines competitive chess with leadership development, mentorship, creativity, innovation, and personal growth through the T.E.A.M.U.P. Programme. Designed for chess players aged 10–14 years in schools across Abuja." />
  <script type="application/ld+json">{
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Event",
        "name": "BEEE Spectacular Chess Championship Abuja 2026",
        "description": "A unique youth development initiative combining competitive chess with leadership development, mentorship, creativity, innovation, and personal growth through the T.E.A.M.U.P. Development Programme.",
        "startDate": "2026-06",
        "endDate": "2026-10",
        "location": {
          "@type": "Place",
          "name": "Abuja",
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Abuja",
            "addressCountry": "NG"
          }
        },
        "offers": {
          "@type": "Offer",
          "price": "12500",
          "priceCurrency": "NGN"
        },
        "organizer": {
          "@type": "Organization",
          "name": "BEEE",
          "url": "https://beeeproject.com"
        }
      },
      {
        "@type": "Organization",
        "@id": "https://beeeproject.com#organization",
        "name": "BEEE Spectacular Chess Championship",
        "url": "https://beeeproject.com",
        "logo": "https://beeeproject.com/logo.png",
        "description": "Youth development initiative combining competitive chess with leadership development and personal growth through the T.E.A.M.U.P. Programme.",
        "contactPoint": {
          "@type": "ContactPoint",
          "email": "info@beeeproject.com",
          "telephone": "+234-802-092-0872",
          "contactType": "customer service"
        }
      }
    ]
  }</script>
</svelte:head>

<main class="overflow-x-hidden w-full max-w-full">
  <ChampHero />
  <ChampIntro />
  <ChampAbout />
  <ChampFeatures />
  <ChampPassport />
  <ChampHow />
  <ChampGetInvolved />
  <ChampCTA />
</main>
