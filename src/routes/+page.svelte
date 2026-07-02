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
    <div class="container why-beee-rail-inner">
      <div class="why-beee-rail-grid">
        <div class="why-beee-rail-img-col">
          <img src="/images/championship/about-new.png" alt="" class="why-beee-rail-img" />
        </div>
        <div class="why-beee-rail-text-col">
          <p class="championship-rail-eyebrow">OUR MISSION</p>
          <h2 class="why-beee-rail-title">Why BEEE?</h2>
          <p class="why-beee-rail-sub">We believe every young person possesses extraordinary potential. Chess is not the destination — it is the platform for developing strategic thinkers, leaders, and changemakers.</p>
          <blockquote class="why-beee-rail-quote">Chess is not the destination. It is the platform.</blockquote>
          <a href="/why-beee" class="why-beee-rail-btn">Our Mission &amp; Vision &rarr;</a>
        </div>
      </div>
    </div>
  </section>
  <section class="section-soft teamup-rail">
    <div class="container" style="padding: 120px 0; text-align: center;">
      <p class="championship-rail-eyebrow">THE PROGRAMME</p>
      <h2 class="teamup-rail-title">The TEAMUP™ Development Programme</h2>
      <p class="teamup-rail-sub">Five integrated pillars — Technology, Enterprise, Art, Mentorship, and Upskill — designed to develop well-rounded young leaders through chess and beyond.</p>
      <div class="teamup-rail-chips">
        <a href="/teamup" class="teamup-rail-chip">
          <img src="/images/championship/technology.png" alt="" class="teamup-rail-chip-img" />
          <span class="teamup-rail-chip-overlay"></span>
          <span class="teamup-rail-chip-label">Technology</span>
        </a>
        <a href="/teamup" class="teamup-rail-chip">
          <img src="/images/championship/enterprise.png" alt="" class="teamup-rail-chip-img" />
          <span class="teamup-rail-chip-overlay"></span>
          <span class="teamup-rail-chip-label">Enterprise</span>
        </a>
        <a href="/teamup" class="teamup-rail-chip">
          <img src="/images/championship/art.png" alt="" class="teamup-rail-chip-img" />
          <span class="teamup-rail-chip-overlay"></span>
          <span class="teamup-rail-chip-label">Art</span>
        </a>
        <a href="/teamup" class="teamup-rail-chip">
          <img src="/images/championship/mentorship.png" alt="" class="teamup-rail-chip-img" />
          <span class="teamup-rail-chip-overlay"></span>
          <span class="teamup-rail-chip-label">Mentorship</span>
        </a>
        <a href="/teamup" class="teamup-rail-chip">
          <img src="/images/championship/upskill.png" alt="" class="teamup-rail-chip-img" />
          <span class="teamup-rail-chip-overlay"></span>
          <span class="teamup-rail-chip-label">Upskill</span>
        </a>
      </div>
      <a href="/teamup" class="teamup-rail-btn">Explore the Programme &rarr;</a>
    </div>
  </section>
  <section class="section-soft championship-rail">
    <div class="container" style="padding: 120px 0; text-align: center;">
      <p class="championship-rail-eyebrow">The Championship Journey</p>
      <h2 class="championship-rail-title">From Registration to Grand Finale</h2>
      <p class="championship-rail-sub">Five stages. One transformative experience.</p>
      <div class="championship-rail-track">
        <a href="/championship" class="championship-rail-step">
          <div class="championship-rail-step-circle"><span class="championship-rail-step-icon">♟</span></div>
          <span class="championship-rail-step-label">Register</span>
        </a>
        <a href="/championship" class="championship-rail-step">
          <div class="championship-rail-step-circle"><span class="championship-rail-step-icon">♞</span></div>
          <span class="championship-rail-step-label">Learn</span>
        </a>
        <a href="/championship" class="championship-rail-step">
          <div class="championship-rail-step-circle"><span class="championship-rail-step-icon">♛</span></div>
          <span class="championship-rail-step-label">Grow</span>
        </a>
        <a href="/championship" class="championship-rail-step">
          <div class="championship-rail-step-circle"><span class="championship-rail-step-icon">♜</span></div>
          <span class="championship-rail-step-label">Compete</span>
        </a>
        <a href="/championship" class="championship-rail-step">
          <div class="championship-rail-step-circle"><span class="championship-rail-step-icon">♚</span></div>
          <span class="championship-rail-step-label">Become</span>
        </a>
      </div>
      <a href="/championship" class="championship-rail-btn">View the Journey &rarr;</a>
    </div>
  </section>
  <ChampCTA />
</main>

<style>
  .championship-rail-eyebrow {
    font-size: 13px;
    font-weight: 500;
    color: var(--primary);
    margin: 0 0 16px;
    letter-spacing: 0.04em;
    text-transform: uppercase;
  }

  .why-beee-rail-inner {
    padding: 120px 0;
  }

  .why-beee-rail-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 56px;
    align-items: center;
  }

  .why-beee-rail-img {
    width: 100%;
    aspect-ratio: 4 / 3;
    object-fit: cover;
    border-radius: 12px;
    min-height: 320px;
  }

  .why-beee-rail-text-col {
    text-align: left;
  }

  .why-beee-rail-title {
    font-family: var(--font-display);
    font-size: clamp(1.8rem, 3vw, 2.5rem);
    font-weight: 500;
    line-height: 1.15;
    letter-spacing: -0.01em;
    color: var(--ink);
    margin: 0;
  }

  .why-beee-rail-sub {
    font-family: var(--font-display);
    font-size: 20px;
    line-height: 1.3;
    color: var(--body);
    margin: 16px 0 24px;
    max-width: 600px;
  }

  .why-beee-rail-quote {
    margin: 0 0 28px;
    padding: 0 0 0 16px;
    border-left: 3px solid var(--primary);
    font-family: var(--font-display);
    font-size: clamp(1.2rem, 2vw, 1.6rem);
    font-style: italic;
    color: var(--primary);
    line-height: 1.4;
  }

  .why-beee-rail-btn {
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

  .why-beee-rail-btn:hover {
    opacity: 0.85;
  }

  .teamup-rail-title {
    font-family: var(--font-display);
    font-size: clamp(1.8rem, 3vw, 2.5rem);
    font-weight: 500;
    line-height: 1.15;
    letter-spacing: -0.01em;
    color: var(--ink);
    margin: 0;
  }

  .teamup-rail-sub {
    font-family: var(--font-display);
    font-size: 20px;
    line-height: 1.3;
    color: var(--body);
    margin: 16px auto 32px;
    max-width: 600px;
  }

  .teamup-rail-chips {
    display: flex;
    justify-content: center;
    gap: 20px;
    margin-bottom: 32px;
  }

  .teamup-rail-chip {
    position: relative;
    display: block;
    width: 140px;
    height: 140px;
    border-radius: 10px;
    overflow: hidden;
    text-decoration: none;
    flex-shrink: 0;
  }

  .teamup-rail-chip-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  .teamup-rail-chip-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.2) 60%, transparent 100%);
    pointer-events: none;
  }

  .teamup-rail-chip-label {
    position: absolute;
    bottom: 10px;
    left: 10px;
    color: #fff;
    font-size: 11px;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.04em;
    line-height: 1.2;
  }

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

  .teamup-rail-btn:hover {
    opacity: 0.85;
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

  .championship-rail-btn:hover {
    opacity: 0.85;
  }

  .championship-rail-track {
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    max-width: 720px;
    margin: 0 auto 40px;
    padding: 0 0 4px;
    background: linear-gradient(to bottom, transparent 23px, color-mix(in srgb, var(--primary) 28%, transparent) 23px, color-mix(in srgb, var(--primary) 28%, transparent) 25px, transparent 25px);
    background-attachment: local;
  }

  .championship-rail-step {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    text-decoration: none;
    flex-shrink: 0;
    z-index: 1;
  }

  .championship-rail-step-circle {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    background: var(--surface-card);
    border: 2px solid var(--primary);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .championship-rail-step-icon {
    font-size: 20px;
    line-height: 1;
    color: var(--primary);
  }

  .championship-rail-step-label {
    font-size: 12px;
    font-weight: 500;
    color: var(--body);
    text-align: center;
    line-height: 1.2;
  }

  @media (max-width: 1023px) {
    .why-beee-rail-grid {
      grid-template-columns: 1fr;
      gap: 32px;
    }

    .why-beee-rail-img {
      min-height: 220px;
    }

    .why-beee-rail-text-col {
      text-align: left;
    }

    .why-beee-rail-sub {
      margin: 16px 0 24px;
    }

    .teamup-rail-chips {
      justify-content: flex-start;
      gap: 12px;
      overflow-x: auto;
      scroll-snap-type: x mandatory;
      padding: 0 0 4px 16px;
      margin-bottom: 28px;
      -webkit-overflow-scrolling: touch;
    }

    .teamup-rail-chips::-webkit-scrollbar {
      display: none;
    }

    .teamup-rail-chips {
      scrollbar-width: none;
    }

    .teamup-rail-chip {
      width: 96px;
      height: 96px;
      scroll-snap-align: start;
    }

    .championship-rail-track {
      gap: 12px;
      overflow-x: auto;
      scroll-snap-type: x mandatory;
      padding: 0 0 4px 16px;
      margin-bottom: 36px;
      -webkit-overflow-scrolling: touch;
      justify-content: flex-start;
      background: linear-gradient(to bottom, transparent 17px, color-mix(in srgb, var(--primary) 28%, transparent) 17px, color-mix(in srgb, var(--primary) 28%, transparent) 19px, transparent 19px);
      background-attachment: local;
    }

    .championship-rail-track::-webkit-scrollbar {
      display: none;
    }

    .championship-rail-track {
      scrollbar-width: none;
    }

    .championship-rail-step {
      scroll-snap-align: start;
    }

    .championship-rail-step-circle {
      width: 36px;
      height: 36px;
    }

    .championship-rail-step-icon {
      font-size: 16px;
    }
  }

  @media (max-width: 767px) {
    .why-beee-rail-inner {
      padding: 80px 0;
    }
  }
</style>
