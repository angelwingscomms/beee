<script lang="ts">
  import { motionFadeUp } from '$lib/actions/motion';

  let current = $state(0);

  const testimonials = [
    {
      name: 'Amara O.',
      role: 'Parent of participant, Abuja',
      quote: 'The transformation in my son has been remarkable. He approaches problems with patience and strategy now — skills that extend far beyond the chessboard.'
    },
    {
      name: 'Kelechi M.',
      role: 'T.E.A.M.U.P. mentor',
      quote: 'Watching these young minds discover their potential through chess is extraordinary. The framework gives them structure while the game teaches them life.'
    },
    {
      name: 'Mrs. Adebayo',
      role: 'Parent, Wuse Zone 4',
      quote: 'The Development Passport kept us involved every step of the way. We saw every milestone, every breakthrough. BEEE set a new standard.'
    },
    {
      name: 'Tunde A.',
      role: '2025 participant',
      quote: 'I made friends, learned openings I had never seen, and won my first trophy. But the confidence I gained is what I carry with me every day.'
    }
  ];

  function next() {
    current = (current + 1) % testimonials.length;
  }

  function prev() {
    current = (current - 1 + testimonials.length) % testimonials.length;
  }
</script>

<section id="testimonials" class="champ-testimonials section-soft" use:motionFadeUp>
  <div class="container" style="padding: 120px 0; position: relative; z-index: 1;">
    <div class="champ-testimonials-inner">
      <div class="champ-testimonials-text">
        {#each testimonials as t, i}
          <div class="champ-testimonial" class:active={i === current} style="transition-delay: {Math.abs(i - current) * 0.06}s">
            <blockquote class="champ-testimonial-quote">&ldquo;{t.quote}&rdquo;</blockquote>
            <div class="champ-testimonial-author">
              <div class="champ-testimonial-avatar" style="background-image: url('https://picsum.photos/seed/person-{i + 1}/120/120')"></div>
              <div>
                <strong class="champ-testimonial-name">{t.name}</strong>
                <span class="champ-testimonial-role">{t.role}</span>
              </div>
            </div>
          </div>
        {/each}
        <div class="champ-testimonial-controls">
          <button onclick={prev} class="champ-testimonial-arrow" aria-label="Previous">&larr;</button>
          <div class="champ-testimonial-dots">
            {#each testimonials as _, i}
              <button class="champ-testimonial-dot" class:active={i === current} onclick={() => current = i} aria-label="Go to testimonial {i + 1}"></button>
            {/each}
          </div>
          <button onclick={next} class="champ-testimonial-arrow" aria-label="Next">&rarr;</button>
        </div>
      </div>
    </div>
  </div>
</section>

<style>
  .champ-testimonials-inner {
    max-width: 680px;
    margin: 0 auto;
    text-align: center;
  }

  .champ-testimonial {
    display: none;
    animation: testimonial-fade 400ms ease both;
  }

  .champ-testimonial.active {
    display: block;
  }

  .champ-testimonial-quote {
    margin: 0;
    font-family: var(--font-display);
    font-size: clamp(1.3rem, 2.2vw, 1.7rem);
    font-weight: 500;
    line-height: 1.4;
    letter-spacing: -0.005em;
    color: var(--ink);
  }

  .champ-testimonial-author {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 14px;
    margin-top: 32px;
  }

  .champ-testimonial-avatar {
    width: 44px;
    height: 44px;
    border-radius: 999px;
    background-size: cover;
    background-position: center;
    flex-shrink: 0;
    filter: grayscale(0.3) contrast(1.1);
    border: 2px solid var(--surface-card);
  }

  .champ-testimonial-name {
    display: block;
    font-size: 14px;
    font-weight: 600;
    color: var(--ink);
    line-height: 1.3;
  }

  .champ-testimonial-role {
    display: block;
    font-size: 13px;
    color: var(--muted);
    line-height: 1.3;
    margin-top: 2px;
  }

  .champ-testimonial-controls {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 20px;
    margin-top: 40px;
  }

  .champ-testimonial-arrow {
    width: 38px;
    height: 38px;
    display: grid;
    place-items: center;
    border-radius: 999px;
    border: 1px solid var(--hairline);
    background: var(--canvas);
    color: var(--ink);
    font-size: 16px;
    line-height: 1;
    transition: background 160ms ease, border-color 160ms ease;
  }

  .champ-testimonial-arrow:hover {
    background: var(--surface-card);
    border-color: var(--hairline-soft);
  }

  .champ-testimonial-dots {
    display: flex;
    gap: 8px;
  }

  .champ-testimonial-dot {
    width: 8px;
    height: 8px;
    border-radius: 999px;
    border: none;
    background: var(--hairline);
    padding: 0;
    transition: background 200ms ease, scale 200ms ease;
  }

  .champ-testimonial-dot.active {
    background: var(--primary);
    scale: 1.3;
  }

  @keyframes testimonial-fade {
    from { opacity: 0; transform: translateY(8px); }
    to { opacity: 1; transform: translateY(0); }
  }

  @media (--sm-down) {
    .champ-testimonial-quote {
      font-size: 1.15rem;
    }
  }
</style>
