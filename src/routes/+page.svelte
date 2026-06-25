<script lang="ts">
  import ChampHero from '$lib/components/championship/ChampHero.svelte';
  import ChampFullImage from '$lib/components/championship/ChampFullImage.svelte';
  import ChampMarquee from '$lib/components/championship/ChampMarquee.svelte';
  import ChampAbout from '$lib/components/championship/ChampAbout.svelte';
  import ChampFeatures from '$lib/components/championship/ChampFeatures.svelte';
  import ChampTestimonials from '$lib/components/championship/ChampTestimonials.svelte';
  import ChampCTA from '$lib/components/championship/ChampCTA.svelte';
</script>

<svelte:head>
  <title>Championship — BEEE Spectacular Chess Championship Abuja 2026</title>
  <meta name="description" content="More Than A Chess Championship. The BEEE Spectacular Chess Championship Abuja 2026 combines competitive chess with structured learning, mentorship, and personal growth through the T.E.A.M.U.P. Programme." />
  <script type="application/ld+json">{
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Event",
        "name": "BEEE Spectacular Chess Championship Abuja 2026",
        "description": "A unique championship combining competitive chess with structured youth development through the T.E.A.M.U.P. Programme.",
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
        "description": "Youth development programme and Spectacular Chess Championship Abuja 2026.",
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
  <!-- ATTENTION: Hero -->
  <ChampHero />

  <!-- INTEREST: Marquee + About -->
  <ChampMarquee />
  <ChampAbout />

  <!-- Full-width image breaks between key sections -->
  <ChampFullImage src="https://picsum.photos/seed/chess-mentorship/1920/1080" alt="Chess mentorship session" />

  <!-- DESIRE: Features with alternating image layout -->
  <ChampFeatures />

  <ChampFullImage src="https://picsum.photos/seed/chess-tournament/1920/1080" alt="Chess tournament" />

  <!-- Testimonials: social proof -->
  <ChampTestimonials />

  <!-- ACTION: CTA + Footer -->
  <ChampCTA />
</main>
