<script lang="ts">
  import ChampHero from '$lib/components/championship/ChampHero.svelte';
  import ChampIntro from '$lib/components/championship/ChampIntro.svelte';
  import ChampCTA from '$lib/components/championship/ChampCTA.svelte';
</script>

<svelte:head>
  <title>BEEE Spectacular Chess Championship Abuja 2026 — More Than a Chess Championship</title>
  <meta name="description" content="The BEEE Spectacular Chess Championship Abuja 2026 is a unique youth development initiative that combines competitive chess with leadership development, mentorship, creativity, innovation, and personal growth through the TEAMUP Programme. Designed for chess players aged 10–14 years in schools across Abuja." />
  <script type="application/ld+json">{
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Event",
        "name": "BEEE Spectacular Chess Championship Abuja 2026",
        "description": "A unique youth development initiative combining competitive chess with leadership development, mentorship, creativity, innovation, and personal growth through the TEAMUP Development Programme.",
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
        "description": "Youth development initiative combining competitive chess with leadership development and personal growth through the TEAMUP Programme.",
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
  <section class="section-soft why-beee-rail">
    <div class="container" style="padding: 120px 0; text-align: center;">
      <h2 class="why-beee-rail-title">Why BEEE?</h2>
      <p class="why-beee-rail-sub">We believe every young person possesses extraordinary potential. Chess is not the destination — it is the platform for developing strategic thinkers, leaders, and changemakers.</p>
      <a href="/why-beee" class="why-beee-rail-btn">Our Mission &amp; Vision &rarr;</a>
    </div>
  </section>
  <section class="section-soft teamup-rail">
    <div class="container" style="padding: 120px 0; text-align: center;">
      <h2 class="teamup-rail-title">The TEAMUP™ Development Programme</h2>
      <p class="teamup-rail-sub">Five integrated pillars — Technology, Enterprise, Art, Mentorship, and Upskill — designed to develop well-rounded young leaders through chess and beyond.</p>
      <a href="/teamup" class="teamup-rail-btn">Explore the Programme &rarr;</a>
    </div>
  </section>
  <section class="section-soft championship-rail">
    <div class="container" style="padding: 120px 0; text-align: center;">
      <p class="championship-rail-eyebrow">The Championship Journey</p>
      <h2 class="championship-rail-title">From Registration to Grand Finale</h2>
      <p class="championship-rail-sub">Five stages. One transformative experience.</p>
      <a href="/championship" class="championship-rail-btn">View the Journey &rarr;</a>
    </div>
  </section>
  <ChampCTA />
</main>

<style>
  .why-beee-rail-title,
  .teamup-rail-title {
    font-family: var(--font-display);
    font-size: clamp(1.8rem, 3vw, 2.5rem);
    font-weight: 500;
    line-height: 1.15;
    letter-spacing: -0.01em;
    color: var(--ink);
    margin: 0;
  }

  .why-beee-rail-sub,
  .teamup-rail-sub {
    font-family: var(--font-display);
    font-size: 20px;
    line-height: 1.3;
    color: var(--body);
    margin: 16px auto 32px;
    max-width: 600px;
  }

  .why-beee-rail-btn,
  .teamup-rail-btn {
    display: inline-block;
    font-family: var(--font-display);
    font-size: 15px;
    font-weight: 500;
    color: var(--on-primary);
    background: var(--primary);
    padding: 14px 32px;
    border-radius: 999px;
    text-decoration: none;
    transition: opacity 200ms ease;
  }

  .why-beee-rail-btn:hover,
  .teamup-rail-btn:hover,
  .championship-rail-btn:hover {
    opacity: 0.85;
  }

  .championship-rail-eyebrow {
    font-size: 13px;
    font-weight: 500;
    color: var(--primary);
    margin: 0 0 16px;
    letter-spacing: 0.04em;
    text-transform: uppercase;
  }

  .championship-rail-title {
    font-family: var(--font-display);
    font-size: clamp(1.8rem, 3vw, 2.5rem);
    font-weight: 500;
    line-height: 1.15;
    letter-spacing: -0.01em;
    color: var(--ink);
    margin: 0;
  }

  .championship-rail-sub {
    font-family: var(--font-display);
    font-size: 20px;
    line-height: 1.3;
    color: var(--body);
    margin: 12px auto 32px;
    max-width: 600px;
  }

  .championship-rail-btn {
    display: inline-block;
    font-family: var(--font-display);
    font-size: 15px;
    font-weight: 500;
    color: var(--on-primary);
    background: var(--primary);
    padding: 14px 32px;
    border-radius: 999px;
    text-decoration: none;
    transition: opacity 200ms ease;
  }
</style>
