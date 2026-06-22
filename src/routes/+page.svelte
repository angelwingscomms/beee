<script lang="ts">
  import { onMount } from 'svelte';
  import confetti from 'canvas-confetti';

  onMount(() => {
    if (typeof window === 'undefined') return;

    // ——— Trust bar counters (one-shot via IO) ———
    const trust_bar = document.querySelector('.trust-bar');
    if (trust_bar) {
      const io = new IntersectionObserver(([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        document.querySelectorAll('.trust-stat').forEach(el => {
          const target = +(el.dataset.count ?? '0');
          const strong = el.querySelector('strong')!;
          let val = 0;
          const step = Math.max(1, Math.ceil(target / 60));
          const t = setInterval(() => {
            val = Math.min(val + step, target);
            strong.textContent = String(val);
            if (val >= target) clearInterval(t);
          }, 16);
        });
      }, { threshold: 0.3 });
      io.observe(trust_bar);
    }

    // ——— FAQ accordion ———
    document.querySelectorAll('.faq-question').forEach(q => {
      q.addEventListener('click', () => {
        (q.parentElement!)!.classList.toggle('is-open');
      });
    });

    // ——— Mystery confetti (once on reveal) ———
    const mystery_el = document.querySelector('.mystery-section');
    if (mystery_el && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      let confetti_fired = false;
      const mo = new IntersectionObserver(([e]) => {
        if (e.isIntersecting && !confetti_fired) {
          confetti_fired = true;
          confetti({
            particleCount: window.innerWidth < 640 ? 80 : 150,
            spread: 80,
            origin: { y: 0.6 },
            disableForReducedMotion: true
          });
          mo.disconnect();
        }
      }, { threshold: 0.5 });
      mo.observe(mystery_el);
    }
  });
</script>

<svelte:head>
  <title>BEEE Spectacular Chess Championship — Every Move Builds a Future</title>
  <meta name="description" content="The BEEE T.E.A.M.U.P. youth development journey culminates in the Spectacular Chess Championship. Register your child for an elite program blending chess, technology, enterprise, art, mentorship, upskilling, and personal growth." />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
</svelte:head>

<!-- ════════════════════════════════════
     S1: STICKY HEADER
     ════════════════════════════════════ -->
<header class="site-header" role="banner">
  <div class="container header-inner">
    <div class="brand-lockup">
      <span class="spike-mark" style="color: var(--primary)"></span>
      <span class="brand-name">BEEE</span>
    </div>
    <nav class="header-nav">
      <a href="#teamp">TEAMUP</a>
      <a href="#journey">Journey</a>
      <a href="#faq">FAQ</a>
    </nav>
    <a href="/register" class="button-primary header-cta cta-entrance">Register Now</a>
  </div>
</header>

<!-- ════════════════════════════════════
     S2: HERO (sticky)
     ════════════════════════════════════ -->
<div class="sticky-section" style="height: 300vh">
  <div class="sticky-inner">
    <section class="hero-band hero-section">
      <div class="container hero-grid">
        <div>
          <p class="eyebrow" style="margin-bottom: 20px">BEEE Spectacular Chess Championship 2026</p>
          <h1 class="display-xl hero-title" style="max-width: 680px; margin: 0">
            Every Move<br>Builds a Future
          </h1>
          <p class="lead hero-subtitle" style="max-width: 520px">
            Where the T.E.A.M.U.P. journey meets the board — a youth development programme 
            that transforms children through chess, technology, enterprise, art, mentorship, 
            upskilling, and personal development.
          </p>
          <div class="hero-actions">
            <a href="/register" class="button-primary cta-entrance">Start the Journey</a>
            <a href="#about" class="button-secondary">Explore the Programme</a>
          </div>
          <p class="hero-scroll-hint" style="margin-top: 48px; color: var(--muted); font-size: 13px; font-weight: 500">
            ↓ Scroll to discover
          </p>
        </div>
        <div class="hero-artifact">
          <div class="artifact-stage">
            <div class="artifact-topline">
              <span>Development Passport</span>
              <span class="status-dot"></span>
            </div>
            <div class="surreal-board">
              <div class="board-plane"></div>
              <div class="logo-gate">
                <img src="/logo.svg" alt="BEEE" />
              </div>
              <div class="floating-rank">♚</div>
              <div class="floating-rank">♛</div>
            </div>
            <div class="artifact-footer">
              <span>T.E.A.M.U.P. → Championship</span>
              <span>2026 Edition</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</div>

<!-- ════════════════════════════════════
     S3: TRUST BAR
     ════════════════════════════════════ -->
<section class="trust-bar section-band section-soft">
  <div class="container">
    <div class="trust-grid">
      <div class="trust-stat"><strong data-count="500">0</strong><span>Young Champions</span></div>
      <div class="trust-stat"><strong data-count="50">0</strong><span>Partner Schools</span></div>
      <div class="trust-stat"><strong data-count="6">0</strong><span>Pillar Programme</span></div>
      <div class="trust-stat"><strong data-count="2026">0</strong><span>Edition</span></div>
    </div>
  </div>
</section>

<!-- ════════════════════════════════════
     S4: WHY BEEE EXISTS (sticky)
     ════════════════════════════════════ -->
<div class="sticky-section" style="height: 200vh; background: var(--surface-soft)">
  <div class="sticky-inner">
    <section class="why-section" id="about">
      <div class="container why-grid">
        <div class="why-text appear-on-scroll">
          <h2 class="display-lg" style="margin: 0 0 24px">Chess Alone<br>Isn't Enough</h2>
          <p class="body-md" style="max-width: 480px; color: var(--body)">
            A child who plays chess learns strategy. A child in the T.E.A.M.U.P. programme 
            learns strategy, technology, enterprise, art, mentorship, upskilling, and personal 
            development — then proves it all at the BEEE Spectacular Chess Championship.
          </p>
          <p class="body-md" style="max-width: 480px; color: var(--body); margin-top: 16px">
            We don't just teach chess. We build future leaders.
          </p>
        </div>
        <div class="why-visual">
          <div class="path-illustration">
            <div class="path-node" style="--node-color: var(--primary)">
              <span class="path-label">Pawn</span>
              <span class="path-desc">Beginner</span>
            </div>
            <div class="path-connector"></div>
            <div class="path-node" style="--node-color: var(--accent-amber)">
              <span class="path-label">Knight</span>
              <span class="path-desc">Learner</span>
            </div>
            <div class="path-connector"></div>
            <div class="path-node" style="--node-color: var(--accent-teal)">
              <span class="path-label">Bishop</span>
              <span class="path-desc">Strategist</span>
            </div>
            <div class="path-connector"></div>
            <div class="path-node" style="--node-color: var(--primary)">
              <span class="path-label">Queen</span>
              <span class="path-desc">Champion</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</div>

<!-- ════════════════════════════════════
     S5: TEAMUP PILLARS
     ════════════════════════════════════ -->
<section class="section-band" id="teamp">
  <div class="container appear-on-scroll">
    <div class="section-header">
      <div>
        <h2 class="display-lg" style="margin: 0">T.E.A.M.U.P.</h2>
        <p class="title-md" style="margin: 12px 0 0; color: var(--muted)">Six pillars. One journey. Unlimited potential.</p>
      </div>
      <p>Every pillar builds on the next, creating a complete youth development experience that transforms how children see themselves and their future.</p>
    </div>
    <div class="pillars-grid">
      <div class="pillar-card" style="--card-color: var(--primary)">
        <span class="pillar-icon">♚</span>
        <h3 class="pillar-name">Technology</h3>
        <p class="pillar-desc">The digital foundation — coding, digital literacy, and computational thinking for the modern world.</p>
        <span class="pillar-tag">King</span>
      </div>
      <div class="pillar-card" style="--card-color: var(--accent-amber)">
        <span class="pillar-icon">♛</span>
        <h3 class="pillar-name">Enterprise</h3>
        <p class="pillar-desc">Building futures — entrepreneurship, financial literacy, and leadership skills.</p>
        <span class="pillar-tag">Queen</span>
      </div>
      <div class="pillar-card" style="--card-color: #8b5cf6">
        <span class="pillar-icon">♝</span>
        <h3 class="pillar-name">Art</h3>
        <p class="pillar-desc">Creative thinking — visual arts, design, and creative expression through multiple media.</p>
        <span class="pillar-tag">Bishop</span>
      </div>
      <div class="pillar-card" style="--card-color: #3b82f6">
        <span class="pillar-icon">♞</span>
        <h3 class="pillar-name">Mentorship</h3>
        <p class="pillar-desc">Guided growth — one-on-one mentoring from professionals, coaches, and role models.</p>
        <span class="pillar-tag">Knight</span>
      </div>
      <div class="pillar-card" style="--card-color: #5db8a6">
        <span class="pillar-icon">♜</span>
        <h3 class="pillar-name">Upskill</h3>
        <p class="pillar-desc">Practical mastery — hands-on workshops, certifications, and real-world projects.</p>
        <span class="pillar-tag">Rook</span>
      </div>
      <div class="pillar-card" style="--card-color: var(--primary)">
        <span class="pillar-icon">♟</span>
        <h3 class="pillar-name">Personal Dev.</h3>
        <p class="pillar-desc">Character first — resilience, emotional intelligence, and self-confidence.</p>
        <span class="pillar-tag">Pawn</span>
      </div>
    </div>
  </div>
</section>

<!-- ════════════════════════════════════
     S6: DEVELOPMENT PASSPORT (sticky)
     ════════════════════════════════════ -->
<div class="sticky-section section-dark" style="height: 300vh">
  <div class="sticky-inner">
    <section class="passport-section">
      <div class="container passport-grid">
        <div class="passport-steps">
          <h2 class="display-lg" style="margin: 0; color: var(--on-dark)">The Development<br>Passport</h2>
          <p class="body-md" style="color: var(--on-dark-soft); margin: 16px 0 40px; max-width: 400px">
            Every skill earned. Every milestone reached. Every stamp collected. 
            Your child's complete growth journey, visible at a glance.
          </p>
          <div class="passport-step passport-step-1">
            <span class="step-number">01</span>
            <div>
              <strong>Discover</strong>
              <p>Child identifies interests across all six pillars</p>
            </div>
          </div>
          <div class="passport-step passport-step-2">
            <span class="step-number">02</span>
            <div>
              <strong>Engage</strong>
              <p>Active participation in pillar activities and workshops</p>
            </div>
          </div>
          <div class="passport-step passport-step-3">
            <span class="step-number">03</span>
            <div>
              <strong>Earn</strong>
              <p>Badges, stamps, and certificates for each completed milestone</p>
            </div>
          </div>
          <div class="passport-step passport-step-4">
            <span class="step-number">04</span>
            <div>
              <strong>Champion</strong>
              <p>Graduate to the BEEE Spectacular Chess Championship</p>
            </div>
          </div>
        </div>
        <div class="passport-visual">
          <div class="passport-book">
            <div class="passport-cover">
              <span class="spike-mark" style="color: var(--primary)"></span>
              <span>BEEE PASSPORT</span>
            </div>
            <div class="passport-badges">
              <svg class="passport-badge passport-badge-1" viewBox="0 0 48 48" width="48" height="48" style="--badge-color: var(--primary)">
                <path class="badge-ring-1" d="M24 2A22 22 0 1 1 23.99 2" fill="none" stroke="var(--badge-color)" stroke-width="3" stroke-linecap="round"/>
                <text x="24" y="25" text-anchor="middle" fill="var(--badge-color)" font-weight="700" font-size="18" font-family="var(--font-display)">T</text>
              </svg>
              <svg class="passport-badge passport-badge-2" viewBox="0 0 48 48" width="48" height="48" style="--badge-color: var(--accent-amber)">
                <path class="badge-ring-2" d="M24 2A22 22 0 1 1 23.99 2" fill="none" stroke="var(--badge-color)" stroke-width="3" stroke-linecap="round"/>
                <text x="24" y="25" text-anchor="middle" fill="var(--badge-color)" font-weight="700" font-size="18" font-family="var(--font-display)">E</text>
              </svg>
              <svg class="passport-badge passport-badge-3" viewBox="0 0 48 48" width="48" height="48" style="--badge-color: #8b5cf6">
                <path class="badge-ring-3" d="M24 2A22 22 0 1 1 23.99 2" fill="none" stroke="#8b5cf6" stroke-width="3" stroke-linecap="round"/>
                <text x="24" y="25" text-anchor="middle" fill="#8b5cf6" font-weight="700" font-size="18" font-family="var(--font-display)">A</text>
              </svg>
              <svg class="passport-badge" viewBox="0 0 48 48" width="48" height="48" style="--badge-color: #3b82f6">
                <path class="badge-ring-4" d="M24 2A22 22 0 1 1 23.99 2" fill="none" stroke="#3b82f6" stroke-width="3" stroke-linecap="round"/>
                <text x="24" y="25" text-anchor="middle" fill="#3b82f6" font-weight="700" font-size="18" font-family="var(--font-display)">M</text>
              </svg>
              <svg class="passport-badge" viewBox="0 0 48 48" width="48" height="48" style="--badge-color: #5db8a6">
                <path class="badge-ring-5" d="M24 2A22 22 0 1 1 23.99 2" fill="none" stroke="#5db8a6" stroke-width="3" stroke-linecap="round"/>
                <text x="24" y="25" text-anchor="middle" fill="#5db8a6" font-weight="700" font-size="18" font-family="var(--font-display)">U</text>
              </svg>
              <svg class="passport-badge" viewBox="0 0 48 48" width="48" height="48" style="--badge-color: var(--primary)">
                <path class="badge-ring-6" d="M24 2A22 22 0 1 1 23.99 2" fill="none" stroke="var(--badge-color)" stroke-width="3" stroke-linecap="round"/>
                <text x="24" y="25" text-anchor="middle" fill="var(--badge-color)" font-weight="700" font-size="18" font-family="var(--font-display)">P</text>
              </svg>
            </div>
              <div class="passport-progress">
                <div class="progress-bar"><div class="progress-fill"></div></div>
                <span>Overall Progress</span>
              </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</div>

<!-- ════════════════════════════════════
     S7: CHAMPIONSHIP JOURNEY TIMELINE (sticky)
     ════════════════════════════════════ -->
<div class="sticky-section section-soft" style="height: 300vh">
  <div class="sticky-inner">
    <section class="timeline-section" id="journey">
      <div class="container">
        <h2 class="display-lg" style="margin: 0 0 48px; text-align: center">From First Move to Championship</h2>
        <div class="timeline-track"><div class="timeline-line"></div></div>
        <div class="timeline-strip">
          <div class="milestone milestone-1">
            <span class="milestone-icon">♟</span>
            <strong>Discovery</strong>
            <p>Find your passion</p>
          </div>
          <div class="milestone milestone-2">
            <span class="milestone-icon">♙</span>
            <strong>Foundation</strong>
            <p>Learn the basics</p>
          </div>
          <div class="milestone milestone-3">
            <span class="milestone-icon">♞</span>
            <strong>Practice</strong>
            <p>Sharpen skills</p>
          </div>
          <div class="milestone milestone-4">
            <span class="milestone-icon">♝</span>
            <strong>Compete</strong>
            <p>School qualifiers</p>
          </div>
          <div class="milestone milestone-5">
            <span class="milestone-icon">♜</span>
            <strong>Semi-Finals</strong>
            <p>Regional face-off</p>
          </div>
          <div class="milestone milestone-6">
            <span class="milestone-icon">♚</span>
            <strong>Finals</strong>
            <p>BEEE Spectacular</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</div>

<!-- ════════════════════════════════════
     S8: BENEFITS GRID
     ════════════════════════════════════ -->
<section class="section-band">
  <div class="container appear-on-scroll">
    <div class="section-header" style="margin-bottom: 48px">
      <h2 class="display-lg" style="margin: 0">Skills That Last<br>a Lifetime</h2>
      <p>Every child leaves the BEEE programme with more than chess skills — they gain the tools to thrive in school, career, and life.</p>
    </div>
    <div class="benefits-grid">
      <div class="benefit-card"><span class="benefit-icon">♚</span><h3>Strategic Thinking</h3><p>Problem-solving, planning, and foresight through advanced chess training.</p></div>
      <div class="benefit-card"><span class="benefit-icon">♛</span><h3>Digital Literacy</h3><p>Coding, design, and technology skills for the 21st century.</p></div>
      <div class="benefit-card"><span class="benefit-icon">♝</span><h3>Confidence</h3><p>Public speaking, presentation, and self-advocacy through mentorship.</p></div>
      <div class="benefit-card"><span class="benefit-icon">♞</span><h3>Teamwork</h3><p>Collaboration, communication, and leadership in group projects.</p></div>
      <div class="benefit-card"><span class="benefit-icon">♜</span><h3>Creativity</h3><p>Artistic expression, design thinking, and innovative problem-solving.</p></div>
      <div class="benefit-card"><span class="benefit-icon">♟</span><h3>Discipline</h3><p>Focus, resilience, and personal responsibility through structured growth.</p></div>
    </div>
  </div>
</section>

<!-- ════════════════════════════════════
     S9: MYSTERY SECTION
     ════════════════════════════════════ -->
<section class="mystery-section section-band section-dark">
  <div class="container" style="text-align: center">
    <div class="mystery-blur" style="max-width: 600px; margin: 0 auto">
      <span class="badge-coral" style="margin-bottom: 20px">Coming Soon</span>
      <h2 class="display-lg" style="color: var(--on-dark); margin: 0 0 16px">What's Your<br>Next Move?</h2>
      <p class="body-md" style="color: var(--on-dark-soft); max-width: 440px; margin: 0 auto">
        Something extraordinary is coming. Something that blends chess, technology, and surprise.
      </p>
    </div>
    <button class="button-secondary-dark" style="margin-top: 32px">Unlock the Secret</button>
  </div>
</section>

<!-- ════════════════════════════════════
     S10: PARENT SECTION
     ════════════════════════════════════ -->
<section class="parent-section section-band">
  <div class="container">
    <div class="section-header">
      <h2 class="display-lg" style="margin: 0">Built for Parents.<br>Designed for Children.</h2>
      <p>Every decision we make starts with two questions: Is this good for the child? Is this clear for the parent?</p>
    </div>
    <div class="parent-grid">
      <div class="parent-card feature-card">
        <div class="parent-quote">"The transformation in my child's confidence since joining BEEE has been remarkable. She approaches every challenge with a strategic mindset now."</div>
        <div class="parent-author">
          <div class="author-avatar"></div>
          <div><strong>Parent of Participant</strong><br><span style="color: var(--muted); font-size: 13px">BEEE TEAMUP 2025</span></div>
        </div>
      </div>
      <div class="parent-card product-mockup-card-dark">
        <h3 style="margin: 0 0 12px; color: var(--on-dark)">Your Child's Journey, Tracked</h3>
        <p style="color: var(--on-dark-soft); font-size: 14px; line-height: 1.55; margin: 0">
          The Development Passport gives you real-time visibility into every skill, badge, and milestone your child achieves.
        </p>
      </div>
    </div>
  </div>
</section>

<!-- ════════════════════════════════════
     S11: AWARDS & RECOGNITION
     ════════════════════════════════════ -->
<section class="section-band section-soft">
  <div class="container appear-on-scroll">
    <h2 class="display-lg" style="margin: 0 0 48px; text-align: center">Recognised. Accredited. Trusted.</h2>
    <div class="awards-track">
      <div class="award-logo">School 1</div>
      <div class="award-logo">School 2</div>
      <div class="award-logo">School 3</div>
      <div class="award-logo">School 4</div>
      <div class="award-logo">School 5</div>
      <div class="award-logo">School 6</div>
      <div class="award-logo">School 7</div>
      <div class="award-logo">School 8</div>
    </div>
  </div>
</section>

<!-- ════════════════════════════════════
     S12: FAQ
     ════════════════════════════════════ -->
<section class="section-band" id="faq">
  <div class="container" style="max-width: 720px">
    <h2 class="display-lg" style="margin: 0 0 48px; text-align: center">Still Have Questions?</h2>
    <div class="faq-list appear-on-scroll">
      <div class="faq-item">
        <button class="faq-question">What age group is this for? <span class="faq-arrow">↓</span></button>
        <div class="faq-answer"><p>Ages 7-17. Our programme is divided into three tiers — Junior (7-10), Intermediate (11-13), and Senior (14-17) — each with age-appropriate curriculum and chess training.</p></div>
      </div>
      <div class="faq-item">
        <button class="faq-question">Does my child need chess experience? <span class="faq-arrow">↓</span></button>
        <div class="faq-answer"><p>Not at all. We welcome every level from complete beginner to experienced player. Our coaches assess each child and provide tailored instruction.</p></div>
      </div>
      <div class="faq-item">
        <button class="faq-question">How much does it cost? <span class="faq-arrow">↓</span></button>
        <div class="faq-answer"><p>We offer tiered pricing with scholarship options. Contact us for a detailed breakdown based on your child's tier and selected programme tracks.</p></div>
      </div>
      <div class="faq-item">
        <button class="faq-question">What's the time commitment? <span class="faq-arrow">↓</span></button>
        <div class="faq-answer"><p>2 hours per week for pillar activities plus the championship day. Flexible scheduling available for school groups.</p></div>
      </div>
      <div class="faq-item">
        <button class="faq-question">How do I register my school? <span class="faq-arrow">↓</span></button>
        <div class="faq-answer"><p>Contact our school coordinator through the registration form. We'll set up a custom programme for your institution.</p></div>
      </div>
      <div class="faq-item">
        <button class="faq-question">What if my child can't attend all sessions? <span class="faq-arrow">↓</span></button>
        <div class="faq-answer"><p>We have a flexible attendance policy. Missed sessions can be made up through our digital learning platform.</p></div>
      </div>
    </div>
  </div>
</section>

<!-- ════════════════════════════════════
     S13: FINAL CTA
     ════════════════════════════════════ -->
<section class="cta-section section-band section-dark">
  <div class="container" style="text-align: center">
    <div class="final-cta">
      <h2 class="display-md" style="color: var(--on-dark); margin: 0 0 12px">The Best Move Is the First One.</h2>
      <p class="body-md" style="color: var(--on-dark-soft); margin: 0 auto 32px; max-width: 480px">
        Register your child for the BEEE Spectacular Chess Championship 2026 and start their transformation today.
      </p>
      <a href="/register" class="button-primary cta-entrance" style="font-size: 16px; padding: 16px 32px">Register Your Child</a>
    </div>
  </div>
</section>

<!-- ════════════════════════════════════
     S14: FOOTER
     ════════════════════════════════════ -->
<footer class="site-footer" role="contentinfo">
  <div class="container footer-grid">
    <div class="footer-brand">
      <span class="spike-mark" style="color: var(--on-dark); margin-bottom: 12px"></span>
      <span style="display: block; margin-bottom: 8px; color: var(--on-dark)">BEEE</span>
      <span style="font-size: 13px; color: var(--on-dark-soft)">Building Exceptional Experiences Through Education</span>
    </div>
    <div class="footer-col">
      <strong>Programme</strong>
      <a href="#">TEAMUP</a>
      <a href="#">Passport</a>
      <a href="#">Curriculum</a>
    </div>
    <div class="footer-col">
      <strong>Event</strong>
      <a href="#">Schedule</a>
      <a href="#">Venues</a>
      <a href="#">Rules</a>
    </div>
    <div class="footer-col">
      <strong>Company</strong>
      <a href="#">About</a>
      <a href="#">Blog</a>
      <a href="#">Contact</a>
    </div>
    <div class="footer-col">
      <strong>Legal</strong>
      <a href="#">Privacy</a>
      <a href="#">Terms</a>
    </div>
  </div>
  <div class="container" style="margin-top: 48px; padding-top: 24px; border-top: 1px solid var(--surface-dark-elevated)">
    <p style="color: var(--on-dark-soft); font-size: 13px; margin: 0">&copy; 2026 BEEE. All rights reserved.</p>
  </div>
</footer>

<style>
  /* ══════════════════════════════════
     LAYOUT & CONTAINER
     ══════════════════════════════════ */
  .container {
    width: min(1200px, calc(100% - 48px));
    margin: 0 auto;
  }

  /* ══════════════════════════════════
     S1: STICKY HEADER
     ══════════════════════════════════ */
  .site-header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 40;
    height: 64px;
    background: rgba(250, 249, 245, 0.92);
    backdrop-filter: blur(18px);
    border-bottom: 1px solid var(--hairline-soft);
  }
  .header-inner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 64px;
  }
  .brand-lockup {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    font-size: 18px;
    font-weight: 600;
    color: var(--ink);
  }
  .brand-name {
    font-family: var(--font-championship);
    letter-spacing: -0.02em;
  }
  .header-nav {
    display: flex;
    gap: 22px;
    font-size: 14px;
    font-weight: 500;
    color: var(--ink);
  }
  .header-nav a:hover {
    color: var(--primary);
  }
  @media (max-width: 767px) {
    .header-nav {
      display: none;
    }
    .header-cta {
      font-size: 13px;
      padding: 8px 14px;
      min-height: 34px;
    }
  }

  /* ══════════════════════════════════
     STICKY CHAPTER SYSTEM
     ══════════════════════════════════ */
  .sticky-section {
    position: relative;
    width: 100%;
  }
  .sticky-inner {
    position: sticky;
    top: 0;
    height: 100vh;
    overflow-y: auto;
    display: flex;
    align-items: center;
  }
  .sticky-inner > section {
    width: 100%;
  }
  @media (max-width: 1023px) {
    .sticky-inner {
      align-items: flex-start;
    }
  }

  /* ══════════════════════════════════
     S2: HERO
     ══════════════════════════════════ */
  .hero-section {
    padding: 88px 0 72px;
    background: var(--canvas);
  }
  @media (max-width: 767px) {
    .hero-section {
      padding: 80px 0 48px;
    }
  }
  .hero-grid {
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(380px, 0.88fr);
    gap: 56px;
    align-items: center;
  }
  @media (max-width: 1023px) {
    .hero-grid {
      grid-template-columns: 1fr;
    }
  }
  .hero-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    margin-top: 32px;
  }
  .hero-scroll-hint {
    margin-top: 48px;
    color: var(--muted);
    font-size: 13px;
    font-weight: 500;
  }

  /* ══════════════════════════════════
     S3: TRUST BAR
     ══════════════════════════════════ */
  .trust-bar {
    padding: 40px 0;
  }
  .trust-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 24px;
  }
  @media (max-width: 767px) {
    .trust-grid {
      grid-template-columns: repeat(2, 1fr);
      gap: 16px;
    }
  }
  .trust-stat {
    text-align: center;
  }
  .trust-stat strong {
    display: block;
    font-family: var(--font-display);
    font-size: 42px;
    font-weight: 500;
    line-height: 1;
    color: var(--primary);
    margin-bottom: 8px;
  }
  @media (max-width: 767px) {
    .trust-stat strong {
      font-size: 32px;
    }
  }
  .trust-stat span {
    display: block;
    font-size: 14px;
    font-weight: 500;
    color: var(--muted);
  }

  /* ══════════════════════════════════
     S4: WHY BEEE
     ══════════════════════════════════ */
  .why-section {
    padding: 96px 0;
    background: var(--surface-soft);
  }
  .why-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 64px;
    align-items: center;
  }
  @media (max-width: 767px) {
    .why-grid {
      grid-template-columns: 1fr;
      gap: 32px;
    }
  }
  .path-illustration {
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding: 32px;
    background: var(--canvas);
    border-radius: 16px;
  }
  .path-node {
    display: flex;
    align-items: center;
    gap: 16px;
    padding: 16px;
    border-left: 3px solid var(--node-color);
    background: var(--surface-soft);
    border-radius: 0 8px 8px 0;
  }
  .path-label {
    font-weight: 600;
    font-size: 16px;
    color: var(--ink);
  }
  .path-desc {
    margin-left: auto;
    font-size: 13px;
    color: var(--muted);
  }
  .path-connector {
    width: 2px;
    height: 24px;
    margin-left: 16px;
    background: var(--hairline);
  }

  /* ══════════════════════════════════
     S5: TEAMUP PILLARS
     ══════════════════════════════════ */
  .section-header {
    display: grid;
    grid-template-columns: minmax(0, 0.82fr) minmax(260px, 0.44fr);
    gap: 40px;
    align-items: end;
    margin-bottom: 32px;
  }
  @media (max-width: 767px) {
    .section-header {
      grid-template-columns: 1fr;
      gap: 16px;
    }
  }
  .pillars-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
  }
  @media (max-width: 767px) {
    .pillars-grid {
      grid-template-columns: 1fr;
    }
  }
  @media (min-width: 768px) and (max-width: 1023px) {
    .pillars-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }
  .pillar-card {
    position: relative;
    padding: 28px;
    border-radius: 12px;
    background: var(--surface-card);
    border-top: 3px solid var(--card-color);
    transition: transform 300ms cubic-bezier(.34,1.56,.64,1), box-shadow 300ms ease;
  }
  .pillar-card:hover {
    transform: translateY(-6px) scale(1.02);
    box-shadow: 0 12px 32px rgba(20, 20, 19, 0.1);
  }
  .pillar-card:hover .pillar-name {
    color: var(--card-color);
  }
  .pillar-icon {
    font-size: 32px;
    display: block;
    margin-bottom: 16px;
  }
  .pillar-name {
    margin: 0 0 8px;
    font-size: 18px;
    font-weight: 500;
    color: var(--ink);
  }
  .pillar-desc {
    margin: 0;
    font-size: 14px;
    line-height: 1.55;
    color: var(--body);
  }
  .pillar-tag {
    display: inline-block;
    margin-top: 12px;
    padding: 2px 10px;
    border-radius: 999px;
    font-size: 11px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    background: var(--card-color);
    color: white;
  }

  /* ══════════════════════════════════
     S6: DEVELOPMENT PASSPORT
     ══════════════════════════════════ */
  .passport-section {
    padding: 96px 0;
  }
  .passport-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 60px;
    align-items: start;
  }
  @media (max-width: 767px) {
    .passport-grid {
      grid-template-columns: 1fr;
    }
  }
  .passport-steps {
    position: relative;
    z-index: 2;
  }
  .passport-step {
    display: flex;
    gap: 16px;
    padding: 16px 0;
    border-bottom: 1px solid rgba(250, 249, 245, 0.1);
    opacity: 0;
  }
  .passport-cover {
    opacity: 0;
  }
  .passport-progress {
    opacity: 0;
  }
  .progress-fill {
    width: 0%;
  }
  .passport-step strong {
    display: block;
    color: var(--on-dark);
    font-size: 16px;
    margin-bottom: 4px;
  }
  .passport-step p {
    margin: 0;
    color: var(--on-dark-soft);
    font-size: 14px;
    line-height: 1.5;
  }
  .step-number {
    font-family: var(--font-display);
    font-size: 28px;
    font-weight: 500;
    color: var(--primary);
    line-height: 1;
    flex-shrink: 0;
  }
  .passport-visual {
    position: sticky;
    top: 96px;
  }
  .passport-book {
    background: var(--surface-dark-elevated);
    border-radius: 16px;
    padding: 32px;
    border: 1px solid rgba(250, 249, 245, 0.1);
  }
  .passport-cover {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 18px;
    font-weight: 600;
    color: var(--on-dark);
    margin-bottom: 24px;
  }
  .passport-badges {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 12px;
    margin-bottom: 24px;
  }
  .passport-badge {
    width: 100%;
    height: auto;
    max-height: 56px;
  }
  .passport-badge text {
    opacity: 0;
  }
  .passport-progress {
    display: flex;
    align-items: center;
    gap: 16px;
  }
  .progress-bar {
    flex: 1;
    height: 8px;
    border-radius: 999px;
    background: rgba(250, 249, 245, 0.1);
  }
  .progress-fill {
    height: 100%;
    border-radius: 999px;
    background: var(--primary);
  }
  .passport-progress span {
    font-size: 13px;
    color: var(--on-dark-soft);
    flex-shrink: 0;
  }

  /* ══════════════════════════════════
     S7: TIMELINE
     ══════════════════════════════════ */
  .timeline-section {
    padding: 96px 0;
  }
  .timeline-track {
    position: relative;
    height: 4px;
    background: var(--hairline);
    border-radius: 2px;
    margin: 0 110px 48px;
  }
  .timeline-line {
    height: 100%;
    border-radius: 2px;
    background: linear-gradient(90deg, var(--primary), var(--accent-amber));
  }
  .timeline-strip {
    display: flex;
    gap: 24px;
    overflow-x: auto;
    padding-bottom: 16px;
    scroll-snap-type: x mandatory;
  }
  .milestone {
    flex: 0 0 220px;
    padding: 24px;
    border-radius: 12px;
    background: var(--canvas);
    scroll-snap-align: start;
    text-align: center;
    opacity: 0;
    transition: transform 300ms ease, box-shadow 300ms ease;
  }
  .milestone:hover {
    transform: translateY(-4px);
    box-shadow: 0 0 20px rgba(242, 120, 48, 0.15);
  }
  .milestone-icon {
    font-size: 36px;
    display: block;
    margin-bottom: 12px;
    transition: transform 300ms ease;
  }
  .milestone:hover .milestone-icon {
    transform: scale(1.15);
  }
  .milestone strong {
    display: block;
    font-size: 16px;
    color: var(--ink);
    margin-bottom: 4px;
  }
  .milestone p {
    margin: 0;
    font-size: 13px;
    color: var(--muted);
  }

  /* ══════════════════════════════════
     S8: BENEFITS GRID
     ══════════════════════════════════ */
  .benefits-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
  }
  @media (max-width: 767px) {
    .benefits-grid {
      grid-template-columns: 1fr;
    }
  }
  @media (min-width: 768px) and (max-width: 1023px) {
    .benefits-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }
  .benefit-card {
    padding: 28px;
    border-radius: 12px;
    background: var(--surface-card);
  }
  .benefit-card .benefit-icon {
    font-size: 28px;
    display: block;
    margin-bottom: 12px;
  }
  .benefit-card h3 {
    margin: 0 0 8px;
    font-size: 16px;
    font-weight: 500;
    color: var(--ink);
  }
  .benefit-card p {
    margin: 0;
    font-size: 14px;
    line-height: 1.55;
    color: var(--body);
  }

  /* ══════════════════════════════════
     S9: MYSTERY
     ══════════════════════════════════ */
  .mystery-section {
    padding: 96px 0;
  }
  .mystery-blur {
    filter: blur(4px);
    transition: filter 600ms ease;
  }

  /* ══════════════════════════════════
     S10: PARENT SECTION
     ══════════════════════════════════ */
  .parent-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 24px;
  }
  @media (max-width: 767px) {
    .parent-grid {
      grid-template-columns: 1fr;
    }
  }
  .parent-card {
    padding: 32px;
    border-radius: 12px;
  }
  .parent-quote {
    font-size: 16px;
    line-height: 1.6;
    color: var(--body);
    font-style: italic;
    margin-bottom: 24px;
  }
  .parent-author {
    display: flex;
    align-items: center;
    gap: 12px;
  }
  .author-avatar {
    width: 40px;
    height: 40px;
    border-radius: 999px;
    background: var(--surface-cream-strong);
  }

  /* ══════════════════════════════════
     S11: AWARDS MARQUEE
     ══════════════════════════════════ */
  @keyframes marquee { from { translate: 0; } to { translate: -50%; } }

  .awards-track {
    display: flex;
    gap: 24px;
    overflow: hidden;
    white-space: nowrap;
    animation: marquee 30s linear infinite;
  }
  .award-logo {
    flex: 0 0 auto;
    padding: 16px 32px;
    background: var(--canvas);
    border-radius: 8px;
    font-weight: 500;
    font-size: 14px;
    color: var(--muted);
    border: 1px solid var(--hairline);
  }

  /* ══════════════════════════════════
     S12: FAQ
     ══════════════════════════════════ */
  .faq-list {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  .faq-item {
    border: 1px solid var(--hairline);
    border-radius: 12px;
    overflow: hidden;
  }
  .faq-question {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: 20px 24px;
    background: var(--canvas);
    border: none;
    font-size: 16px;
    font-weight: 500;
    color: var(--ink);
    text-align: left;
    cursor: pointer;
  }
  .faq-question:hover {
    background: var(--surface-soft);
  }
  .faq-arrow {
    transition: transform 200ms ease;
    font-size: 14px;
    color: var(--muted);
  }
  .faq-item.is-open .faq-arrow {
    transform: rotate(180deg);
  }
  .faq-answer {
    max-height: 0;
    overflow: hidden;
    padding: 0 24px;
    background: var(--surface-soft);
    transition: max-height 300ms cubic-bezier(.34,1.56,.64,1), opacity 300ms ease;
    opacity: 0;
  }
  .faq-item.is-open .faq-answer {
    max-height: 300px;
    opacity: 1;
  }
  .faq-answer p {
    margin: 0;
    padding: 0 0 20px;
    font-size: 15px;
    line-height: 1.55;
    color: var(--body);
  }

  /* ══════════════════════════════════
     S13: CTA
     ══════════════════════════════════ */
  .cta-section {
    padding: 96px 0;
  }

  /* ══════════════════════════════════
     S14: FOOTER
     ══════════════════════════════════ */
  .site-footer {
    background: var(--surface-dark);
    padding: 64px 0 32px;
  }
  .footer-grid {
    display: grid;
    grid-template-columns: 2fr 1fr 1fr 1fr 1fr;
    gap: 40px;
  }
  @media (max-width: 767px) {
    .footer-grid {
      grid-template-columns: 1fr 1fr;
      gap: 24px;
    }
    .footer-brand {
      grid-column: 1 / -1;
    }
  }
  .footer-col {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  .footer-col strong {
    color: var(--on-dark);
    font-size: 14px;
    font-weight: 500;
    margin-bottom: 8px;
    display: block;
  }
  .footer-col a {
    color: var(--on-dark-soft);
    font-size: 14px;
    transition: color 200ms ease;
  }
  .footer-col a:hover {
    color: var(--on-dark);
  }

  /* ══════════════════════════════════
     SCROLL-DRIVEN CSS ANIMATIONS
     ══════════════════════════════════ */
  @keyframes fade-up { from { opacity: 0; translate: 0 25px; } to { opacity: 1; translate: 0 0; } }
  @keyframes fade-up-lg { from { opacity: 0; translate: 0 40px; } to { opacity: 1; translate: 0 0; } }
  @keyframes fade-left { from { opacity: 0; translate: -30px 0; } to { opacity: 1; translate: 0 0; } }
  @keyframes scale-in { from { opacity: 0; scale: 0; } to { opacity: 1; scale: 1; } }
  @keyframes grow-x { from { width: 0%; } to { width: 100%; } }
  @keyframes draw-ring { from { stroke-dashoffset: 138.23; } to { stroke-dashoffset: 0; } }
  @keyframes blur-out { from { filter: blur(16px); } to { filter: blur(0px); } }
  @keyframes hint-out { from { opacity: 1; } to { opacity: 0; } }

  .badge-ring-1, .badge-ring-2, .badge-ring-3,
  .badge-ring-4, .badge-ring-5, .badge-ring-6 {
    stroke-dasharray: 138.23;
  }

  @supports (animation-timeline: scroll()) {
    .hero-section { view-timeline-name: --hero; view-timeline-axis: block; }
    .passport-section { view-timeline-name: --passport; view-timeline-axis: block; }
    .timeline-section { view-timeline-name: --timeline; view-timeline-axis: block; }
    .pillars-grid { view-timeline-name: --pillars; view-timeline-axis: block; }
    .benefits-grid { view-timeline-name: --benefits; view-timeline-axis: block; }
    .parent-section { view-timeline-name: --parents; view-timeline-axis: block; }
    .cta-section { view-timeline-name: --cta; view-timeline-axis: block; }
    .mystery-section { view-timeline-name: --mystery; view-timeline-axis: block; }

    .hero-title { animation: fade-up-lg linear forwards; animation-timeline: --hero; animation-range: entry 0% entry 25%; }
    .hero-subtitle { animation: fade-up linear forwards; animation-timeline: --hero; animation-range: entry 15% entry 40%; }
    .hero-actions { animation: fade-up linear forwards; animation-timeline: --hero; animation-range: entry 30% entry 55%; }
    .hero-scroll-hint { animation: hint-out linear forwards; animation-timeline: --hero; animation-range: entry 0% entry 15%; }

    .passport-cover { animation: fade-up linear forwards; animation-timeline: --passport; animation-range: entry 0% entry 10%; }
    .progress-fill { animation: grow-x linear forwards; animation-timeline: --passport; animation-range: entry 0% entry 70%; }
    .passport-step-1 { animation: fade-left linear forwards; animation-timeline: --passport; animation-range: entry 5% entry 20%; }
    .badge-ring-1 { animation: draw-ring linear forwards; animation-timeline: --passport; animation-range: entry 10% entry 25%; }
    .passport-badge-1 text { animation: scale-in linear forwards; animation-timeline: --passport; animation-range: entry 15% entry 30%; }
    .passport-step-2 { animation: fade-left linear forwards; animation-timeline: --passport; animation-range: entry 25% entry 40%; }
    .badge-ring-2 { animation: draw-ring linear forwards; animation-timeline: --passport; animation-range: entry 30% entry 45%; }
    .passport-badge-2 text { animation: scale-in linear forwards; animation-timeline: --passport; animation-range: entry 35% entry 50%; }
    .passport-step-3 { animation: fade-left linear forwards; animation-timeline: --passport; animation-range: entry 45% entry 60%; }
    .badge-ring-3 { animation: draw-ring linear forwards; animation-timeline: --passport; animation-range: entry 50% entry 65%; }
    .passport-badge-3 text { animation: scale-in linear forwards; animation-timeline: --passport; animation-range: entry 55% entry 70%; }
    .passport-step-4 { animation: fade-left linear forwards; animation-timeline: --passport; animation-range: entry 65% entry 80%; }
    .badge-ring-4 { animation: draw-ring linear forwards; animation-timeline: --passport; animation-range: entry 70% entry 85%; }
    .badge-ring-5 { animation: draw-ring linear forwards; animation-timeline: --passport; animation-range: entry 75% entry 90%; }
    .badge-ring-6 { animation: draw-ring linear forwards; animation-timeline: --passport; animation-range: entry 80% entry 95%; }
    .passport-progress { animation: fade-up linear forwards; animation-timeline: --passport; animation-range: entry 85% entry 100%; }

    .timeline-line { animation: grow-x linear forwards; animation-timeline: --timeline; animation-range: entry 0% entry 60%; }
    .milestone-1 { animation: fade-left linear forwards; animation-timeline: --timeline; animation-range: entry 5% entry 25%; }
    .milestone-2 { animation: fade-left linear forwards; animation-timeline: --timeline; animation-range: entry 20% entry 40%; }
    .milestone-3 { animation: fade-left linear forwards; animation-timeline: --timeline; animation-range: entry 35% entry 55%; }
    .milestone-4 { animation: fade-left linear forwards; animation-timeline: --timeline; animation-range: entry 50% entry 70%; }
    .milestone-5 { animation: fade-left linear forwards; animation-timeline: --timeline; animation-range: entry 65% entry 85%; }
    .milestone-6 { animation: fade-left linear forwards; animation-timeline: --timeline; animation-range: entry 80% entry 100%; }

    .pillar-card { animation: fade-up-lg linear forwards; animation-timeline: --pillars; animation-range: entry 0% entry 100%; }
    .benefit-card { animation: fade-up linear forwards; animation-timeline: --benefits; animation-range: entry 0% entry 100%; }
    .parent-card { animation: fade-up linear forwards; animation-timeline: --parents; animation-range: entry 0% entry 100%; }
    .final-cta { animation: fade-up linear forwards; animation-timeline: --cta; animation-range: entry 0% entry 100%; }
    .mystery-blur { animation: blur-out linear forwards; animation-timeline: --mystery; animation-range: entry 0% entry 100%; }

    .appear-on-scroll { view-timeline-name: --appear; view-timeline-axis: block; }
    .appear-on-scroll > * {
      opacity: 0;
      animation: fade-up linear forwards;
      animation-timeline: --appear;
      animation-range: entry 0% entry 100%;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .hero-title, .hero-subtitle, .hero-actions, .hero-scroll-hint,
    .passport-cover, .progress-fill, .passport-step, .badge-ring-1, .badge-ring-2,
    .badge-ring-3, .badge-ring-4, .badge-ring-5, .badge-ring-6,
    .passport-badge-1 text, .passport-badge-2 text, .passport-badge-3 text,
    .passport-progress, .timeline-line, .milestone, .pillar-card,
    .benefit-card, .parent-card, .final-cta, .mystery-blur,
    .appear-on-scroll > * {
      animation: none !important;
      opacity: 1 !important;
      translate: none !important;
      scale: none !important;
      filter: none !important;
      width: auto !important;
    }
    .progress-fill { width: 100% !important; }
    .badge-ring-1, .badge-ring-2, .badge-ring-3,
    .badge-ring-4, .badge-ring-5, .badge-ring-6 {
      stroke-dashoffset: 0 !important;
    }
  }
</style>
