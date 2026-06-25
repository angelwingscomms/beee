<script lang="ts">
  import { scroll } from 'motion';
  import { onMount } from 'svelte';
  import { motionStaggered } from '$lib/actions/motion';

  let section: HTMLElement;
  let textEl: HTMLElement;
  let progress = $state(0);

  onMount(() => {
    if (!section) return;
    const stop = scroll(() => {
      const rect = section.getBoundingClientRect();
      const sectionTop = rect.top + window.scrollY;
      const sectionH = rect.height;
      const scrollStart = sectionTop - window.innerHeight * 0.5;
      const scrollEnd = sectionTop + sectionH - window.innerHeight * 0.3;
      const p = Math.min(1, Math.max(0, (window.scrollY - scrollStart) / (scrollEnd - scrollStart)));
      progress = p;
    }, { axis: 'y' });
    return () => stop();
  });

  function revealStyles(index: number) {
    const threshold = 0.1 + index * 0.18;
    const opacity = progress > threshold ? 1 : 0.15 + (progress / threshold) * 0.85;
    const y = progress > threshold ? 0 : 20 - (progress / threshold) * 20;
    return `opacity: ${Math.min(1, opacity)}; transform: translateY(${y}px)`;
  }
</script>

<section class="section-dark" id="about" bind:this={section}>
  <div class="container" style="padding: 120px 0; position: relative; z-index: 1;">
    <div class="champ-about-grid">
      <div class="champ-about-sticky">
        <p class="champ-about-label">The Championship</p>
        <h2 class="champ-about-title">Designed for young learners across Abuja</h2>
      </div>
      <div class="champ-about-text" bind:this={textEl}>
        <p style={revealStyles(0)}>
          The BEEE Spectacular Chess Championship Abuja 2026 provides participants with opportunities
          to sharpen their strategic thinking, build confidence, develop critical life skills,
          and connect with other talented young minds.
        </p>
        <p style={revealStyles(1)}>
          Unlike traditional tournaments that focus solely on competition, BEEE integrates development
          into every stage of the journey through the <strong>T.E.A.M.U.P. Programme</strong>
          &mdash; Technology, Enterprise, Art, Mentorship and Upskill.
        </p>
        <p style={revealStyles(2)}>
          Every participant gains access to the T.E.A.M.U.P. Development Programme, a unique journey
          that combines chess, innovation, leadership, mentorship, creativity, and personal growth.
        </p>
        <p style={revealStyles(3)}>
          <strong class="champ-about-quote">Think. Compete. Develop. Excel.</strong>
        </p>
        <div class="champ-benefits" use:motionStaggered={{ stagger: 0.06, y: 14 }}>
          {#each ['Advanced chess training', 'Strategic & analytical thinking', 'Confidence & leadership', 'Mentored personal development', 'Healthy competition & sportsmanship', 'Connect with talented young players', 'Certificates, scholarships & awards', 'Compete for the Championship Trophy'] as benefit}
            <span class="champ-benefit-item">{benefit}</span>
          {/each}
        </div>
      </div>
    </div>
  </div>
</section>

<style>
  .champ-about-grid {
    display: grid;
    grid-template-columns: 0.9fr 1.1fr;
    gap: 56px;
    align-items: start;
  }

  .champ-about-sticky {
    position: sticky;
    top: 96px;
  }

  .champ-about-label {
    font-size: 13px;
    font-weight: 500;
    color: var(--primary);
    margin: 0 0 16px;
    letter-spacing: 0.04em;
    text-transform: uppercase;
  }

  .champ-about-title {
    font-family: var(--font-display);
    font-size: clamp(1.8rem, 3vw, 2.5rem);
    font-weight: 500;
    line-height: 1.15;
    letter-spacing: -0.01em;
    color: var(--on-dark);
    margin: 0;
  }

  .champ-about-text {
    display: grid;
    gap: 20px;
  }

  .champ-about-text p {
    margin: 0;
    font-size: 17px;
    line-height: 1.7;
    color: var(--on-dark-soft);
    will-change: opacity, transform;
  }

  .champ-about-text strong {
    color: var(--on-dark);
    font-weight: 600;
  }

  .champ-about-quote {
    font-family: var(--font-display);
    font-size: 22px;
    letter-spacing: 0.04em;
    color: var(--primary);
  }

  .champ-benefits {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-top: 24px;
    padding-top: 24px;
    border-top: 1px solid rgba(250, 249, 245, 0.1);
  }

  .champ-benefit-item {
    font-size: 13px;
    font-weight: 500;
    color: var(--on-dark-soft);
    letter-spacing: 0.02em;
    padding: 6px 16px;
    border-radius: 999px;
    border: 1px solid rgba(250, 249, 245, 0.12);
    background: rgba(250, 249, 245, 0.04);
    white-space: nowrap;
    line-height: 1;
  }

  @media (max-width: 767px) {
    .champ-about-grid {
      grid-template-columns: 1fr;
      gap: 32px;
    }
    .champ-about-sticky {
      position: static;
    }
    .champ-about-text p {
      font-size: 15px;
    }
  }
</style>
