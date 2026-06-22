<script lang="ts">
  import {
    Award,
    BadgeCheck,
    BookOpenCheck,
    Brain,
    BriefcaseBusiness,
    CalendarDays,
    ChartNoAxesCombined,
    ChevronDown,
    CircleCheck,
    Crown,
    FileBadge,
    GraduationCap,
    Handshake,
    Lightbulb,
    MapPin,
    Medal,
    Menu,
    Palette,
    ShieldCheck,
    Sparkles,
    Trophy,
    Users,
    X
  } from '@lucide/svelte';

  let menuOpen = false;
  let activeTeamup = 'Technology';
  let openFaq = 0;

  const journey = [
    {
      title: 'Register',
      detail: 'Parent registration opens the child profile and confirms the programme pathway.',
      code: '01'
    },
    {
      title: 'T.E.A.M.U.P.',
      detail: 'Children begin structured growth across technology, enterprise, art, mentorship and upskilling.',
      code: '02'
    },
    {
      title: 'Development Passport',
      detail: 'Attendance, achievements, badges and milestones are tracked in one visible record.',
      code: '03'
    },
    {
      title: 'Preliminary Rounds',
      detail: 'Participants test discipline, strategy and confidence in guided competitive settings.',
      code: '04'
    },
    {
      title: 'Advanced Stages',
      detail: 'Top performers receive deeper mentoring, reports and readiness support.',
      code: '05'
    },
    {
      title: 'Grand Finale',
      detail: 'The journey culminates in Abuja with recognition for growth, excellence and leadership.',
      code: '06'
    }
  ];

  const teamup = [
    {
      name: 'Technology',
      points: ['Problem Solving', 'Digital Literacy', 'Innovation Mindset'],
      detail: 'Children learn to approach problems with curiosity, structure and practical digital confidence.'
    },
    {
      name: 'Enterprise',
      points: ['Financial Awareness', 'Initiative', 'Value Creation'],
      detail: 'Participants connect strategy to responsibility, enterprise thinking and useful real-world action.'
    },
    {
      name: 'Art',
      points: ['Creative Thinking', 'Expression', 'Design Confidence'],
      detail: 'Creativity becomes part of the development journey, not an optional side activity.'
    },
    {
      name: 'Mentorship',
      points: ['Guidance', 'Character', 'Leadership Habits'],
      detail: 'Young minds receive direction from adults who model discipline, focus and excellence.'
    },
    {
      name: 'Upskill',
      points: ['Practical Projects', 'Communication', 'Applied Learning'],
      detail: 'Every child builds useful skills that can be seen, discussed, improved and celebrated.'
    }
  ];

  const benefits = [
    ['Strategic Thinking', 'Make stronger decisions with patience, planning and foresight.'],
    ['Leadership', 'Learn responsibility, initiative and positive influence.'],
    ['Communication', 'Explain ideas clearly and listen with discipline.'],
    ['Creativity', 'Use imagination to solve problems beyond the board.'],
    ['Confidence', 'Build calm self-belief through visible progress.'],
    ['Problem Solving', 'Practice analysis, resilience and smart adjustment.']
  ];

  const awards = [
    'Championship Trophy',
    'Medals',
    'Certificates',
    'Achievement Badges',
    'Leadership Awards',
    'Innovation Awards',
    'Special Recognition Awards'
  ];

  const faqs = [
    ['Who can participate?', 'School-age children and young people can participate. Registration captures age and experience so each child can be placed appropriately.'],
    ['Do I need prior chess experience?', 'No. BEEE is designed as a developmental journey. Beginners can start with the foundations while experienced players continue into more advanced stages.'],
    ['What is T.E.A.M.U.P.?', 'T.E.A.M.U.P. is the programme layer covering Technology, Enterprise, Art, Mentorship and Upskill activities before the championship finale.'],
    ['How is progress tracked?', 'Progress is tracked through attendance, milestones, badges, certificates, reports and parent-visible development records.'],
    ['What is the Development Passport?', 'It is a structured record of each participant\'s activities, achievements, badges, leadership moments, projects and certificates.'],
    ['Can parents monitor progress?', 'Yes. Parent access is included so families can follow attendance, achievements, milestones and certificates.'],
    ['What happens after registration?', 'The team confirms your child\'s details, shares next steps and begins the participant profile for the development journey.'],
    ['How do I register?', 'Use any Register Child button on this page. Registration is always one click away from the homepage.']
  ];

  function closeMenu() {
    menuOpen = false;
  }
</script>

<svelte:head>
  <title>BEEE Spectacular Chess Championship Abuja 2026</title>
  <meta
    name="description"
    content="Register your child for the BEEE T.E.A.M.U.P. developmental journey culminating in the Spectacular Chess Championship Abuja 2026."
  />
</svelte:head>

<div class="beee-page">
  <header class="beee-nav">
    <a class="brand" href="#top" on:click={closeMenu} aria-label="BEEE homepage">
      <img src="/logo.svg" alt="" />
      <span>BEEE</span>
    </a>

    <nav class="desktop-nav" aria-label="Primary navigation">
      <a href="#why">About</a>
      <a href="#teamup">T.E.A.M.U.P.</a>
      <a href="#journey">Journey</a>
      <a href="#faq">FAQ</a>
    </nav>

    <div class="nav-actions">
      <a class="nav-register" href="/register">Register</a>
      <button class="menu-button" type="button" aria-label="Open menu" aria-expanded={menuOpen} on:click={() => (menuOpen = !menuOpen)}>
        {#if menuOpen}<X size={20} />{:else}<Menu size={20} />{/if}
      </button>
    </div>

    {#if menuOpen}
      <nav class="mobile-nav" aria-label="Mobile navigation">
        <a href="#why" on:click={closeMenu}>About</a>
        <a href="#teamup" on:click={closeMenu}>T.E.A.M.U.P.</a>
        <a href="#journey" on:click={closeMenu}>Journey</a>
        <a href="#faq" on:click={closeMenu}>FAQ</a>
      </nav>
    {/if}
  </header>

  <section class="hero" id="top">
    <div class="hero-bg" aria-hidden="true"></div>
    <div class="container hero-grid">
      <div class="hero-copy reveal">
        <p class="eyebrow">BEEE Spectacular Chess Championship Abuja 2026</p>
        <h1>Where Young Minds <span>Compete.</span> <span>Develop.</span> <span>Excel.</span></h1>
        <p class="hero-lead">
          More than a championship. A transformational journey in leadership, strategy, innovation and personal growth.
        </p>
        <div class="cta-row">
          <a class="primary-cta" href="/register">Register Child</a>
          <a class="secondary-cta" href="#teamup">Explore T.E.A.M.U.P.</a>
        </div>
        <div class="hero-meta" aria-label="Event details">
          <span><CalendarDays size={16} />October 2026 Grand Finale</span>
          <span><MapPin size={16} />Abuja</span>
          <span><CircleCheck size={16} />Open Registration</span>
        </div>
        <p class="mystery">Featuring a Grand Finale unlike any other school chess championship.</p>
      </div>

      <div class="hero-visual reveal">
        <div class="board-shell" aria-label="Animated chessboard preview">
          <div class="board-glow"></div>
          <div class="chessboard">
            {#each Array(64) as _, index}
              <span class:dark={(Math.floor(index / 8) + index) % 2 === 0}></span>
            {/each}
            <img class="piece piece-king" src="/pieces/gioco/wK.svg" alt="" />
            <img class="piece piece-queen" src="/pieces/gioco/bQ.svg" alt="" />
            <img class="piece piece-knight" src="/pieces/gioco/wN.svg" alt="" />
            <img class="piece piece-rook" src="/pieces/gioco/bR.svg" alt="" />
          </div>
          <div class="board-caption">
            <span>Development in progress</span>
            <strong>Level 4</strong>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section class="trust-bar" aria-label="BEEE trust signals">
    <div class="container trust-grid">
      <div><BookOpenCheck size={24} /><strong>Development Programme</strong><span>Progress Tracking</span></div>
      <div><FileBadge size={24} /><strong>Digital Passport</strong><span>Achievements & Badges</span></div>
      <div><Handshake size={24} /><strong>Mentorship</strong><span>Leadership & Growth</span></div>
      <div><Trophy size={24} /><strong>Championship</strong><span>Grand Finale</span></div>
    </div>
  </section>

  <section class="section light" id="why">
    <div class="container">
      <div class="section-heading reveal">
        <p class="section-kicker">Why BEEE</p>
        <h2>More Than A Tournament</h2>
        <p>Most championships end with a trophy. This one begins with a journey.</p>
      </div>
      <div class="three-grid">
        <article class="card reveal">
          <Brain size={30} />
          <h3>Chess Development</h3>
          <p>Structured chess learning builds focus, pattern recognition, patience and decision quality before competition begins.</p>
        </article>
        <article class="card reveal">
          <Users size={30} />
          <h3>Leadership & Mentorship</h3>
          <p>Participants are guided to communicate better, lead responsibly and treat excellence as a habit.</p>
        </article>
        <article class="card reveal">
          <Lightbulb size={30} />
          <h3>Innovation & Upskilling</h3>
          <p>The journey connects strategy with technology, enterprise, creative thinking and practical projects.</p>
        </article>
      </div>
    </div>
  </section>

  <section class="section journey-section" id="journey">
    <div class="container">
      <div class="section-heading align-left reveal">
        <p class="section-kicker">Championship Journey</p>
        <h2>A Roadmap To The Grand Finale</h2>
        <p>Each step gives parents a clear view of what happens after registration.</p>
      </div>
      <div class="journey-map">
        <div class="journey-line" aria-hidden="true"></div>
        {#each journey as item}
          <article class="journey-step reveal" tabindex="0">
            <span>{item.code}</span>
            <h3>{item.title}</h3>
            <p>{item.detail}</p>
          </article>
        {/each}
      </div>
      <div class="inline-cta reveal">
        <p>Ready to begin the pathway?</p>
        <a class="primary-cta" href="/register">Register Child</a>
      </div>
    </div>
  </section>

  <section class="section teamup-section" id="teamup">
    <div class="container">
      <div class="section-heading reveal">
        <p class="section-kicker">Programme Core</p>
        <h2>The T.E.A.M.U.P. Experience</h2>
      </div>
      <div class="teamup-layout">
        <div class="pentagon" aria-label="Interactive T.E.A.M.U.P. pentagon">
          {#each teamup as item, index}
            <button
              class={`pentagon-node node-${index + 1}`}
              type="button"
              class:active={activeTeamup === item.name}
              on:mouseenter={() => (activeTeamup = item.name)}
              on:focus={() => (activeTeamup = item.name)}
              on:click={() => (activeTeamup = item.name)}
            >
              {item.name}
            </button>
          {/each}
          <div class="pentagon-lines"></div>
        </div>
        <article class="teamup-panel reveal">
          {#each teamup as item}
            {#if activeTeamup === item.name}
              <p class="section-kicker">{item.name}</p>
              <h3>{item.detail}</h3>
              <div class="teamup-points">
                {#each item.points as point}
                  <span><Sparkles size={16} />{point}</span>
                {/each}
              </div>
            {/if}
          {/each}
        </article>
      </div>
    </div>
  </section>

  <section class="section passport-section" id="passport">
    <div class="container passport-grid">
      <div class="passport-mock reveal" aria-label="Development passport mockup">
        <div class="passport-cover">
          <img src="/logo.svg" alt="" />
          <span>T.E.A.M.U.P.</span>
          <strong>Development Passport</strong>
        </div>
        <div class="stamp-grid">
          {#each ['Attendance', 'Achievements', 'Badges', 'Leadership', 'Projects', 'Mentorship', 'Certificates', 'Milestones'] as stamp}
            <span>{stamp}</span>
          {/each}
        </div>
      </div>
      <div class="passport-copy reveal">
        <p class="section-kicker">Development Passport</p>
        <h2>Every participant receives a T.E.A.M.U.P. Development Passport.</h2>
        <p>
          The passport makes growth visible. Parents can see attendance, achievements, badges, leadership activities, projects,
          mentorship records, certificates and milestones in one structured record.
        </p>
        <span class="access-badge"><ShieldCheck size={17} />Parent Access Included</span>
        <a class="primary-cta" href="/register">Register Child</a>
      </div>
    </div>
  </section>

  <section class="section benefits-section">
    <div class="container">
      <div class="section-heading reveal">
        <p class="section-kicker">Benefits</p>
        <h2>Growth Parents Can Recognise</h2>
      </div>
      <div class="benefit-grid">
        {#each benefits as benefit}
          <article class="benefit-card reveal">
            <BadgeCheck size={24} />
            <h3>{benefit[0]}</h3>
            <p>{benefit[1]}</p>
          </article>
        {/each}
      </div>
    </div>
  </section>

  <section class="section tracking-section">
    <div class="container tracking-grid">
      <div class="section-heading align-left reveal">
        <p class="section-kicker">Progress Tracking</p>
        <h2>Track Growth Beyond The Chessboard</h2>
        <p>Parents see a development record, not just a match result.</p>
      </div>
      <div class="dashboard reveal">
        <div class="dashboard-top">
          <span>Participant Dashboard</span>
          <strong>Level 4: Innovator</strong>
        </div>
        <div class="progress-row">
          <span>72% Progress</span>
          <div><i></i></div>
        </div>
        <div class="badge-row">
          <span>Leadership Star</span>
          <span>Creative Explorer</span>
          <span>Technology Explorer</span>
        </div>
        <div class="xp-card">XP: <strong>3,450</strong></div>
        <div class="tracking-tabs">
          <span>Milestones</span><span>Badges</span><span>Certificates</span><span>Reports</span><span>Parent Access</span>
        </div>
      </div>
    </div>
  </section>

  <section class="section parents-section">
    <div class="container parents-grid">
      <div class="parent-dashboard reveal">
        <div class="phone-shell">
          <div class="phone-header">Parent View</div>
          <div class="phone-card"><span>Attendance</span><strong>9/10</strong></div>
          <div class="phone-card"><span>Latest badge</span><strong>Leadership Star</strong></div>
          <div class="phone-card"><span>Certificate</span><strong>Ready</strong></div>
        </div>
      </div>
      <div class="parents-copy reveal">
        <p class="section-kicker">For Parents</p>
        <h2>See Your Child's Growth In Real Time</h2>
        <ul>
          <li>Monitor progress</li>
          <li>View achievements</li>
          <li>Track attendance</li>
          <li>Celebrate milestones</li>
          <li>Access certificates</li>
          <li>Support development</li>
        </ul>
        <div class="cta-row">
          <a class="secondary-cta dark-text" href="#passport">View Sample Passport</a>
          <a class="primary-cta" href="/register">Register Child</a>
        </div>
      </div>
    </div>
  </section>

  <section class="section awards-section">
    <div class="container">
      <div class="section-heading reveal">
        <p class="section-kicker">Awards & Recognition</p>
        <h2>Recognition For Development And Excellence</h2>
        <p>Awards celebrate effort, leadership, innovation and progress. They do not replace the journey.</p>
      </div>
      <div class="awards-grid">
        {#each awards as award, index}
          <article class="award-card reveal">
            {#if index === 0}<Trophy size={24} />{:else if index < 3}<Medal size={24} />{:else if index < 5}<Award size={24} />{:else}<Crown size={24} />{/if}
            <span>{award}</span>
          </article>
        {/each}
      </div>
    </div>
  </section>

  <section class="section faq-section" id="faq">
    <div class="container faq-container">
      <div class="section-heading reveal">
        <p class="section-kicker">FAQ</p>
        <h2>Questions Parents Ask First</h2>
      </div>
      <div class="faq-list">
        {#each faqs as faq, index}
          <article class="faq-item">
            <button type="button" on:click={() => (openFaq = openFaq === index ? -1 : index)}>
              <span>{faq[0]}</span>
              <ChevronDown size={20} class:rotated={openFaq === index} />
            </button>
            {#if openFaq === index}
              <p>{faq[1]}</p>
            {/if}
          </article>
        {/each}
      </div>
    </div>
  </section>

  <section class="final-cta-section">
    <div class="container final-cta-card reveal">
      <GraduationCap size={36} />
      <h2>Every Great Journey Begins With A Move</h2>
      <p>Register today and give your child the opportunity to learn, compete, develop and excel.</p>
      <div class="cta-row center">
        <a class="primary-cta" href="/register">Register Now</a>
        <a class="secondary-cta" href="#passport">Download Prospectus</a>
      </div>
    </div>
  </section>

  <footer class="footer">
    <div class="container footer-grid">
      <div>
        <img src="/logo.svg" alt="BEEE" />
        <p>Premium youth development culminating in a championship.</p>
      </div>
      <nav aria-label="Footer championship links"><strong>Championship</strong><a href="#journey">Journey</a><a href="/register">Register</a></nav>
      <nav aria-label="Footer TEAMUP links"><strong>TEAMUP</strong><a href="#teamup">Experience</a><a href="#passport">Passport</a></nav>
      <nav aria-label="Footer parent links"><strong>Parents</strong><a href="#passport">Progress</a><a href="#faq">FAQ</a></nav>
      <nav aria-label="Footer resources links"><strong>Resources</strong><a href="#why">About</a><a href="#passport">Prospectus</a></nav>
      <nav aria-label="Footer contact links"><strong>Contact</strong><a href="/register">Registration Desk</a><a href="#top">Back to top</a></nav>
    </div>
    <div class="container copyright">© BEEE Spectacular Chess Championship Abuja 2026</div>
  </footer>
</div>

<style>
  :global(html) {
    scroll-padding-top: 72px;
  }

  .beee-page {
    --bg: #070807;
    --bg-soft: #0e1110;
    --panel: rgba(255, 255, 255, 0.07);
    --panel-strong: rgba(255, 255, 255, 0.11);
    --line: rgba(255, 255, 255, 0.14);
    --text: #f7f3ea;
    --muted-dark: #b8b1a4;
    --gold: #f5b84b;
    --gold-dark: #b98221;
    --green: #58c69f;
    --blue: #5ba7ff;
    --ink-dark: #171614;
    --cream: #f4efe6;
    --cream-2: #e9dfd1;
    min-height: 100vh;
    background: var(--bg);
    color: var(--text);
    font-family: var(--font-registration), Inter, system-ui, sans-serif;
  }

  .container {
    width: min(1180px, calc(100% - 40px));
    margin: 0 auto;
  }

  .beee-nav {
    position: sticky;
    top: 0;
    z-index: 100;
    display: flex;
    height: 72px;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(7, 8, 7, 0.84);
    padding: 0 max(20px, calc((100vw - 1180px) / 2));
    backdrop-filter: blur(18px);
  }

  .brand,
  .desktop-nav,
  .nav-actions,
  .hero-meta,
  .cta-row {
    display: flex;
    align-items: center;
  }

  .brand {
    gap: 10px;
    font-weight: 800;
    color: var(--text);
  }

  .brand img {
    width: 34px;
    height: 34px;
    object-fit: contain;
  }

  .desktop-nav {
    gap: 26px;
    color: var(--muted-dark);
    font-size: 14px;
    font-weight: 600;
  }

  .desktop-nav a:hover,
  .footer a:hover {
    color: var(--gold);
  }

  .nav-actions {
    gap: 10px;
  }

  .nav-register,
  .primary-cta,
  .secondary-cta {
    display: inline-flex;
    min-height: 48px;
    align-items: center;
    justify-content: center;
    border-radius: 8px;
    padding: 0 20px;
    font-size: 14px;
    font-weight: 800;
    transition: transform 180ms ease, border-color 180ms ease, background 180ms ease;
  }

  .nav-register,
  .primary-cta {
    border: 1px solid var(--gold);
    background: linear-gradient(135deg, var(--gold), #df8f1f);
    color: #130f08;
    box-shadow: 0 14px 38px rgba(245, 184, 75, 0.18);
  }

  .secondary-cta {
    border: 1px solid rgba(255, 255, 255, 0.22);
    background: rgba(255, 255, 255, 0.06);
    color: var(--text);
  }

  .dark-text {
    border-color: rgba(23, 22, 20, 0.16);
    background: #fff;
    color: var(--ink-dark);
  }

  .nav-register:hover,
  .primary-cta:hover,
  .secondary-cta:hover {
    transform: translateY(-2px);
  }

  .menu-button {
    display: none;
    width: 44px;
    height: 44px;
    place-items: center;
    border: 1px solid var(--line);
    border-radius: 8px;
    background: rgba(255, 255, 255, 0.06);
    color: var(--text);
  }

  .mobile-nav {
    position: absolute;
    top: 72px;
    right: 20px;
    left: 20px;
    display: grid;
    gap: 8px;
    border: 1px solid var(--line);
    border-radius: 10px;
    background: rgba(11, 13, 12, 0.96);
    padding: 14px;
    box-shadow: 0 24px 60px rgba(0, 0, 0, 0.4);
  }

  .mobile-nav a {
    border-radius: 8px;
    padding: 14px;
    color: var(--text);
    font-weight: 700;
  }

  .hero {
    position: relative;
    min-height: 90vh;
    overflow: hidden;
    padding: 96px 0 72px;
  }

  .hero-bg {
    position: absolute;
    inset: 0;
    background:
      linear-gradient(90deg, rgba(7, 8, 7, 0.98) 0%, rgba(7, 8, 7, 0.86) 45%, rgba(7, 8, 7, 0.62) 100%),
      radial-gradient(circle at 76% 22%, rgba(245, 184, 75, 0.24), transparent 24%),
      linear-gradient(135deg, rgba(255, 255, 255, 0.06) 25%, transparent 25%) 0 0 / 72px 72px,
      linear-gradient(315deg, rgba(255, 255, 255, 0.045) 25%, transparent 25%) 0 0 / 72px 72px,
      #070807;
  }

  .hero-bg::after {
    position: absolute;
    inset: 0;
    background: radial-gradient(circle at center, transparent, rgba(0, 0, 0, 0.64));
    content: '';
  }

  .hero-grid {
    position: relative;
    z-index: 1;
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(340px, 0.72fr);
    gap: 56px;
    align-items: center;
  }

  .eyebrow,
  .section-kicker {
    display: inline-flex;
    width: fit-content;
    margin: 0;
    border: 1px solid rgba(245, 184, 75, 0.28);
    border-radius: 999px;
    background: rgba(245, 184, 75, 0.09);
    color: var(--gold);
    padding: 7px 12px;
    font-size: 12px;
    font-weight: 900;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  .hero h1,
  .section-heading h2,
  .passport-copy h2,
  .parents-copy h2,
  .final-cta-card h2 {
    margin: 16px 0 0;
    color: var(--text);
    font-family: var(--font-championship), var(--font-registration), sans-serif;
    font-weight: 800;
    letter-spacing: 0;
  }

  .hero h1 {
    max-width: 760px;
    font-size: clamp(3.1rem, 7vw, 6.8rem);
    line-height: 0.98;
  }

  .hero h1 span {
    display: block;
  }

  .hero-lead {
    max-width: 610px;
    margin: 28px 0 0;
    color: #ded7ca;
    font-size: clamp(1.05rem, 2vw, 1.32rem);
    line-height: 1.6;
  }

  .cta-row {
    flex-wrap: wrap;
    gap: 12px;
    margin-top: 30px;
  }

  .center {
    justify-content: center;
  }

  .hero-meta {
    flex-wrap: wrap;
    gap: 10px;
    margin-top: 30px;
  }

  .hero-meta span,
  .access-badge,
  .teamup-points span,
  .badge-row span,
  .tracking-tabs span {
    display: inline-flex;
    align-items: center;
    gap: 7px;
    border: 1px solid rgba(255, 255, 255, 0.12);
    border-radius: 999px;
    background: rgba(255, 255, 255, 0.06);
    color: var(--muted-dark);
    padding: 8px 11px;
    font-size: 13px;
    font-weight: 700;
  }

  .mystery {
    max-width: 490px;
    margin: 22px 0 0;
    color: rgba(245, 184, 75, 0.78);
    font-size: 14px;
  }

  .board-shell {
    position: relative;
    border: 1px solid rgba(255, 255, 255, 0.14);
    border-radius: 12px;
    background: linear-gradient(180deg, rgba(255, 255, 255, 0.09), rgba(255, 255, 255, 0.035));
    padding: 28px;
    box-shadow: 0 40px 100px rgba(0, 0, 0, 0.48);
  }

  .board-glow {
    position: absolute;
    inset: 12%;
    border-radius: 999px;
    background: rgba(245, 184, 75, 0.18);
    filter: blur(40px);
  }

  .chessboard {
    position: relative;
    display: grid;
    grid-template-columns: repeat(8, 1fr);
    aspect-ratio: 1;
    overflow: hidden;
    border: 1px solid rgba(255, 255, 255, 0.18);
    border-radius: 8px;
    transform: perspective(950px) rotateX(54deg) rotateZ(-34deg);
  }

  .chessboard span {
    background: rgba(245, 239, 230, 0.12);
  }

  .chessboard span.dark {
    background: rgba(245, 184, 75, 0.22);
  }

  .piece {
    position: absolute;
    width: 12%;
    filter: drop-shadow(0 8px 18px rgba(0, 0, 0, 0.48));
    animation: piece-drift 7s ease-in-out infinite;
  }

  .piece-king { top: 13%; left: 18%; }
  .piece-queen { top: 26%; right: 24%; animation-delay: -1.4s; }
  .piece-knight { bottom: 18%; left: 36%; animation-delay: -2.8s; }
  .piece-rook { bottom: 26%; right: 12%; animation-delay: -4.2s; }

  .board-caption {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 20px;
    color: var(--muted-dark);
    font-size: 13px;
    font-weight: 800;
  }

  .board-caption strong {
    color: var(--gold);
  }

  .trust-bar {
    background: #fff;
    color: var(--ink-dark);
    padding: 28px 0;
  }

  .trust-grid,
  .three-grid,
  .benefit-grid,
  .awards-grid {
    display: grid;
    gap: 18px;
  }

  .trust-grid {
    grid-template-columns: repeat(4, 1fr);
  }

  .trust-grid div {
    display: grid;
    gap: 7px;
    min-height: 116px;
    border-right: 1px solid #e6ded0;
    align-content: center;
    padding: 6px 22px;
  }

  .trust-grid div:last-child {
    border-right: 0;
  }

  .trust-grid svg {
    color: var(--gold-dark);
  }

  .trust-grid strong {
    color: var(--ink-dark);
    font-size: 16px;
  }

  .trust-grid span {
    color: #655d50;
    font-size: 14px;
  }

  .section {
    padding: 104px 0;
  }

  .light,
  .parents-section,
  .awards-section,
  .faq-section {
    background: var(--cream);
    color: var(--ink-dark);
  }

  .journey-section,
  .benefits-section,
  .tracking-section {
    background: #0b0d0c;
  }

  .teamup-section,
  .passport-section {
    background:
      radial-gradient(circle at 18% 15%, rgba(245, 184, 75, 0.16), transparent 24%),
      radial-gradient(circle at 82% 80%, rgba(88, 198, 159, 0.12), transparent 26%),
      #070807;
  }

  .section-heading {
    max-width: 760px;
    margin: 0 auto 44px;
    text-align: center;
  }

  .align-left {
    margin-inline: 0;
    text-align: left;
  }

  .light .section-heading h2,
  .parents-copy h2,
  .awards-section .section-heading h2,
  .faq-section .section-heading h2 {
    color: var(--ink-dark);
  }

  .section-heading h2,
  .passport-copy h2,
  .parents-copy h2 {
    font-size: clamp(2.1rem, 5vw, 4.4rem);
    line-height: 1.04;
  }

  .section-heading p:not(.section-kicker),
  .passport-copy p,
  .parents-copy p {
    max-width: 650px;
    margin: 18px auto 0;
    color: #6b6257;
    font-size: 18px;
    line-height: 1.6;
  }

  .journey-section .section-heading p:not(.section-kicker),
  .teamup-section .section-heading p:not(.section-kicker),
  .tracking-section .section-heading p:not(.section-kicker),
  .passport-copy p {
    color: var(--muted-dark);
  }

  .three-grid {
    grid-template-columns: repeat(3, 1fr);
  }

  .card,
  .benefit-card,
  .award-card,
  .journey-step,
  .teamup-panel,
  .dashboard,
  .passport-mock,
  .parent-dashboard,
  .faq-item {
    border: 1px solid rgba(255, 255, 255, 0.12);
    border-radius: 8px;
    background: var(--panel);
    box-shadow: 0 24px 80px rgba(0, 0, 0, 0.18);
  }

  .light .card,
  .award-card,
  .faq-item {
    border-color: #ded3c3;
    background: #fff;
    box-shadow: 0 18px 45px rgba(23, 22, 20, 0.06);
  }

  .card {
    min-height: 280px;
    padding: 30px;
  }

  .card svg,
  .benefit-card svg,
  .award-card svg {
    color: var(--gold-dark);
  }

  .card h3,
  .benefit-card h3,
  .journey-step h3 {
    margin: 22px 0 10px;
    color: inherit;
    font-size: 22px;
  }

  .card p,
  .benefit-card p,
  .journey-step p,
  .faq-item p {
    margin: 0;
    color: #6b6257;
    line-height: 1.6;
  }

  .journey-map {
    position: relative;
    display: grid;
    grid-template-columns: repeat(6, minmax(190px, 1fr));
    gap: 16px;
    overflow-x: auto;
    padding: 34px 0 18px;
  }

  .journey-line {
    position: absolute;
    top: 58px;
    left: 8%;
    width: 84%;
    height: 2px;
    background: linear-gradient(90deg, var(--gold), var(--green));
    transform-origin: left;
    animation: line-grow linear both;
    animation-timeline: view();
    animation-range: entry 0% cover 55%;
  }

  .journey-step {
    position: relative;
    min-width: 190px;
    padding: 26px 22px;
    color: var(--text);
    transition: transform 180ms ease, background 180ms ease;
  }

  .journey-step:hover,
  .journey-step:focus {
    background: var(--panel-strong);
    transform: translateY(-5px);
  }

  .journey-step span {
    display: grid;
    width: 48px;
    height: 48px;
    place-items: center;
    border: 1px solid rgba(245, 184, 75, 0.4);
    border-radius: 999px;
    background: #10120f;
    color: var(--gold);
    font-weight: 900;
  }

  .journey-step p,
  .benefit-card p {
    color: var(--muted-dark);
  }

  .inline-cta {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 18px;
    margin-top: 28px;
    border: 1px solid var(--line);
    border-radius: 8px;
    background: rgba(255, 255, 255, 0.05);
    padding: 20px;
  }

  .inline-cta p {
    margin: 0;
    color: var(--text);
    font-weight: 800;
  }

  .teamup-layout,
  .passport-grid,
  .tracking-grid,
  .parents-grid {
    display: grid;
    grid-template-columns: minmax(0, 0.95fr) minmax(340px, 0.82fr);
    gap: 56px;
    align-items: center;
  }

  .pentagon {
    position: relative;
    width: min(540px, 100%);
    aspect-ratio: 1;
    margin: 0 auto;
  }

  .pentagon-lines {
    position: absolute;
    inset: 18%;
    clip-path: polygon(50% 0%, 98% 35%, 79% 92%, 21% 92%, 2% 35%);
    border: 1px solid rgba(245, 184, 75, 0.28);
    background: linear-gradient(145deg, rgba(245, 184, 75, 0.12), rgba(88, 198, 159, 0.07));
  }

  .pentagon-node {
    position: absolute;
    z-index: 2;
    min-width: 132px;
    border: 1px solid var(--line);
    border-radius: 999px;
    background: rgba(255, 255, 255, 0.08);
    color: var(--text);
    padding: 12px 16px;
    font-weight: 900;
    transition: transform 180ms ease, background 180ms ease, border-color 180ms ease;
  }

  .pentagon-node.active,
  .pentagon-node:hover,
  .pentagon-node:focus {
    border-color: rgba(245, 184, 75, 0.78);
    background: rgba(245, 184, 75, 0.16);
    transform: scale(1.08);
  }

  .node-1 { top: 0; left: 50%; transform: translateX(-50%); }
  .node-2 { top: 33%; right: 0; }
  .node-3 { right: 12%; bottom: 4%; }
  .node-4 { bottom: 4%; left: 12%; }
  .node-5 { top: 33%; left: 0; }

  .node-1.active,
  .node-1:hover,
  .node-1:focus {
    transform: translateX(-50%) scale(1.08);
  }

  .teamup-panel {
    min-height: 330px;
    padding: 34px;
  }

  .teamup-panel h3 {
    margin: 20px 0;
    font-size: clamp(1.7rem, 3vw, 2.6rem);
    line-height: 1.14;
  }

  .teamup-points {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
  }

  .passport-mock {
    min-height: 600px;
    overflow: hidden;
    background: linear-gradient(145deg, #10130f, #21190d);
    padding: 26px;
  }

  .passport-cover {
    display: grid;
    min-height: 250px;
    align-content: end;
    border: 1px solid rgba(245, 184, 75, 0.22);
    border-radius: 8px;
    background:
      linear-gradient(135deg, rgba(245, 184, 75, 0.16), transparent 45%),
      repeating-linear-gradient(90deg, rgba(255, 255, 255, 0.04) 0 1px, transparent 1px 30px);
    padding: 26px;
  }

  .passport-cover img {
    width: 70px;
    margin-bottom: 32px;
  }

  .passport-cover span {
    color: var(--gold);
    font-size: 13px;
    font-weight: 900;
    letter-spacing: 0.16em;
  }

  .passport-cover strong {
    margin-top: 8px;
    font-size: 34px;
    line-height: 1;
  }

  .stamp-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
    margin-top: 18px;
  }

  .stamp-grid span {
    border: 1px solid rgba(245, 184, 75, 0.24);
    border-radius: 8px;
    padding: 16px;
    color: var(--muted-dark);
    font-weight: 800;
  }

  .passport-copy .access-badge {
    margin: 22px 0 24px;
    color: var(--text);
  }

  .benefit-grid {
    grid-template-columns: repeat(3, 1fr);
  }

  .benefit-card {
    padding: 26px;
    color: var(--text);
  }

  .tracking-grid {
    grid-template-columns: 0.8fr 1fr;
  }

  .dashboard {
    padding: 28px;
    color: var(--text);
  }

  .dashboard-top {
    display: flex;
    justify-content: space-between;
    gap: 16px;
    border-bottom: 1px solid var(--line);
    padding-bottom: 18px;
  }

  .dashboard-top span {
    color: var(--muted-dark);
  }

  .dashboard-top strong {
    color: var(--gold);
  }

  .progress-row {
    margin-top: 24px;
  }

  .progress-row span {
    font-weight: 900;
  }

  .progress-row div {
    height: 12px;
    margin-top: 10px;
    overflow: hidden;
    border-radius: 999px;
    background: rgba(255, 255, 255, 0.1);
  }

  .progress-row i {
    display: block;
    width: 72%;
    height: 100%;
    border-radius: inherit;
    background: linear-gradient(90deg, var(--gold), var(--green));
  }

  .badge-row,
  .tracking-tabs {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-top: 22px;
  }

  .xp-card {
    margin-top: 22px;
    border-radius: 8px;
    background: rgba(245, 184, 75, 0.12);
    padding: 22px;
    color: var(--gold);
    font-size: 20px;
    font-weight: 900;
  }

  .parents-grid {
    grid-template-columns: minmax(320px, 0.72fr) 1fr;
  }

  .parent-dashboard {
    display: grid;
    min-height: 520px;
    place-items: center;
    border-color: #ded3c3;
    background: #fff;
  }

  .phone-shell {
    width: min(310px, 88%);
    border: 10px solid #171614;
    border-radius: 32px;
    background: #10120f;
    padding: 18px;
    color: var(--text);
  }

  .phone-header {
    color: var(--gold);
    font-weight: 900;
    margin-bottom: 18px;
  }

  .phone-card {
    display: flex;
    justify-content: space-between;
    gap: 16px;
    border-radius: 8px;
    background: rgba(255, 255, 255, 0.08);
    padding: 16px;
    margin-top: 10px;
  }

  .phone-card span {
    color: var(--muted-dark);
  }

  .parents-copy ul {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 12px;
    margin: 28px 0 0;
    padding: 0;
    list-style: none;
  }

  .parents-copy li {
    border: 1px solid #ded3c3;
    border-radius: 8px;
    background: #fff;
    padding: 14px 16px;
    font-weight: 800;
  }

  .awards-grid {
    grid-template-columns: repeat(4, 1fr);
  }

  .award-card {
    display: flex;
    min-height: 120px;
    align-items: center;
    gap: 14px;
    padding: 22px;
    color: var(--ink-dark);
    font-weight: 900;
  }

  .faq-container {
    max-width: 850px;
  }

  .faq-item {
    overflow: hidden;
    margin-top: 10px;
    border-color: #ded3c3;
    background: #fff;
  }

  .faq-item button {
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    border: 0;
    background: transparent;
    color: var(--ink-dark);
    padding: 20px 22px;
    text-align: left;
    font-weight: 900;
  }

  .faq-item p {
    padding: 0 22px 22px;
  }

  .rotated {
    transform: rotate(180deg);
  }

  .final-cta-section {
    background: #070807;
    padding: 110px 0;
  }

  .final-cta-card {
    max-width: 900px;
    text-align: center;
  }

  .final-cta-card svg {
    color: var(--gold);
  }

  .final-cta-card h2 {
    font-size: clamp(2.2rem, 5vw, 5rem);
    line-height: 1;
  }

  .final-cta-card p {
    max-width: 620px;
    margin: 20px auto 0;
    color: var(--muted-dark);
    font-size: 18px;
    line-height: 1.6;
  }

  .footer {
    border-top: 1px solid var(--line);
    background: #050605;
    padding: 54px 0 28px;
    color: var(--muted-dark);
  }

  .footer-grid {
    display: grid;
    grid-template-columns: 1.4fr repeat(5, 1fr);
    gap: 28px;
  }

  .footer img {
    width: 54px;
  }

  .footer p {
    max-width: 260px;
    line-height: 1.5;
  }

  .footer nav {
    display: grid;
    align-content: start;
    gap: 10px;
  }

  .footer strong {
    color: var(--text);
  }

  .footer a {
    color: var(--muted-dark);
    font-size: 14px;
  }

  .copyright {
    margin-top: 40px;
    border-top: 1px solid var(--line);
    padding-top: 22px;
    font-size: 13px;
  }

  .reveal {
    animation: fade-up both;
    animation-timeline: view();
    animation-range: entry 0% cover 28%;
  }

  @keyframes fade-up {
    from {
      opacity: 0;
      transform: translateY(26px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes line-grow {
    from {
      transform: scaleX(0);
    }
    to {
      transform: scaleX(1);
    }
  }

  @keyframes piece-drift {
    0%, 100% {
      transform: translate3d(0, 0, 0) scale(1);
    }
    50% {
      transform: translate3d(8px, -10px, 0) scale(1.04);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .reveal,
    .journey-line,
    .piece {
      animation: none !important;
    }
  }

  @media (max-width: 1023px) {
    .desktop-nav {
      display: none;
    }

    .menu-button {
      display: grid;
    }

    .hero-grid,
    .teamup-layout,
    .passport-grid,
    .tracking-grid,
    .parents-grid {
      grid-template-columns: 1fr;
    }

    .trust-grid,
    .three-grid,
    .benefit-grid,
    .awards-grid,
    .footer-grid {
      grid-template-columns: repeat(2, 1fr);
    }

    .footer-grid > div {
      grid-column: 1 / -1;
    }
  }

  @media (max-width: 700px) {
    .container {
      width: min(100% - 28px, 1180px);
    }

    .beee-nav {
      padding-inline: 14px;
    }

    .brand span {
      display: none;
    }

    .nav-register {
      min-height: 42px;
      padding-inline: 14px;
    }

    .hero {
      min-height: auto;
      padding: 56px 0 64px;
    }

    .hero-grid {
      gap: 34px;
    }

    .hero h1 {
      font-size: 3rem;
    }

    .hero-meta span {
      width: 100%;
      justify-content: center;
    }

    .board-shell {
      padding: 18px;
    }

    .trust-grid,
    .three-grid,
    .benefit-grid,
    .awards-grid,
    .footer-grid,
    .parents-copy ul {
      grid-template-columns: 1fr;
    }

    .trust-grid div {
      border-right: 0;
      border-bottom: 1px solid #e6ded0;
      text-align: center;
      justify-items: center;
    }

    .section {
      padding: 72px 0;
    }

    .journey-map {
      grid-template-columns: 1fr;
      overflow: visible;
    }

    .journey-line {
      display: none;
    }

    .inline-cta,
    .dashboard-top {
      align-items: stretch;
      flex-direction: column;
    }

    .pentagon {
      display: flex;
      width: 100%;
      aspect-ratio: auto;
      gap: 10px;
      overflow-x: auto;
      padding-bottom: 10px;
    }

    .pentagon-lines {
      display: none;
    }

    .pentagon-node {
      position: static;
      min-width: max-content;
    }

    .node-1,
    .node-1.active,
    .node-1:hover,
    .node-1:focus {
      transform: none;
    }

    .pentagon-node.active,
    .pentagon-node:hover,
    .pentagon-node:focus {
      transform: none;
    }

    .passport-mock {
      min-height: auto;
    }
  }
</style>
