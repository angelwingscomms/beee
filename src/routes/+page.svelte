<script lang="ts">
  import Hero from '$components/home/Hero.svelte';
  import Navbar from '$components/home/Navbar.svelte';
  import TrustBar from '$components/home/TrustBar.svelte';
  import WhyBeee from '$components/home/WhyBeee.svelte';
  import Journey from '$components/home/Journey.svelte';
  import TeamUp from '$components/home/TeamUp.svelte';
  import Passport from '$components/home/Passport.svelte';
  import Benefits from '$components/home/Benefits.svelte';
  import ProgressTracking from '$components/home/ProgressTracking.svelte';
  import Parents from '$components/home/Parents.svelte';
  import Awards from '$components/home/Awards.svelte';
  import FAQ from '$components/home/FAQ.svelte';
  import FinalCTA from '$components/home/FinalCTA.svelte';
  import Footer from '$components/home/Footer.svelte';

  let menuOpen = $state(false);

  function toggleMenu() {
    menuOpen = !menuOpen;
  }

  const journey = [
    { title: 'Register', detail: 'Parent registration opens the child profile and confirms the programme pathway.', code: '01' },
    { title: 'T.E.A.M.U.P.', detail: 'Children begin structured growth across technology, enterprise, art, mentorship and upskilling.', code: '02' },
    { title: 'Development Passport', detail: 'Attendance, achievements, badges and milestones are tracked in one visible record.', code: '03' },
    { title: 'Preliminary Rounds', detail: 'Participants test discipline, strategy and confidence in guided competitive settings.', code: '04' },
    { title: 'Advanced Stages', detail: 'Top performers receive deeper mentoring, reports and readiness support.', code: '05' },
    { title: 'Grand Finale', detail: 'The journey culminates in Abuja with recognition for growth, excellence and leadership.', code: '06' }
  ];

  const teamup = [
    { name: 'Technology', points: ['Problem Solving', 'Digital Literacy', 'Innovation Mindset'], detail: 'Children learn to approach problems with curiosity, structure and practical digital confidence.' },
    { name: 'Enterprise', points: ['Financial Awareness', 'Initiative', 'Value Creation'], detail: 'Participants connect strategy to responsibility, enterprise thinking and useful real-world action.' },
    { name: 'Art', points: ['Creative Thinking', 'Expression', 'Design Confidence'], detail: 'Creativity becomes part of the development journey, not an optional side activity.' },
    { name: 'Mentorship', points: ['Guidance', 'Character', 'Leadership Habits'], detail: 'Young minds receive direction from adults who model discipline, focus and excellence.' },
    { name: 'Upskill', points: ['Practical Projects', 'Communication', 'Applied Learning'], detail: 'Every child builds useful skills that can be seen, discussed, improved and celebrated.' }
  ];

  const benefits = [
    ['Strategic Thinking', 'Make stronger decisions with patience, planning and foresight.'],
    ['Leadership', 'Learn responsibility, initiative and positive influence.'],
    ['Communication', 'Explain ideas clearly and listen with discipline.'],
    ['Creativity', 'Use imagination to solve problems beyond the board.'],
    ['Confidence', 'Build calm self-belief through visible progress.'],
    ['Problem Solving', 'Practice analysis, resilience and smart adjustment.']
  ];

  const awards = ['Championship Trophy', 'Medals', 'Certificates', 'Achievement Badges', 'Leadership Awards', 'Innovation Awards', 'Special Recognition Awards'];

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
</script>

<svelte:head>
  <title>BEEE Spectacular Chess Championship Abuja 2026</title>
  <meta
    name="description"
    content="Register your child for the BEEE T.E.A.M.U.P. developmental journey culminating in the Spectacular Chess Championship Abuja 2026."
  />
</svelte:head>

<div class="beee-page">
  <Navbar {menuOpen} onMenuToggle={toggleMenu} />
  <Hero />
  <TrustBar />
  <WhyBeee />
  <Journey {journey} />
  <TeamUp {teamup} />
  <Passport />
  <Benefits {benefits} />
  <section class="mid-page-cta">
    <div class="container mid-cta-card">
      <h3>Ready to begin the journey?</h3>
      <p>Join BEEE and give your child a transformative experience.</p>
      <a class="primary-cta" href="/register">Register Now</a>
    </div>
  </section>
  <ProgressTracking />
  <Parents />
  <Awards {awards} />
  <FAQ {faqs} />
  <FinalCTA />
  <Footer />
</div>

<div class="sticky-cta">
  <span>Join BEEE Today</span>
  <a class="primary-cta" href="/register">Register Child</a>
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

  .mid-page-cta {
    padding: 60px 0;
    background: #070807;
  }

  .mid-cta-card {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 18px;
    border: 1px solid var(--line);
    border-radius: 8px;
    background: var(--panel);
    padding: 26px 30px;
  }

  .mid-cta-card h3 {
    margin: 0;
    color: var(--text);
    font-family: var(--font-championship), var(--font-registration), sans-serif;
    font-size: 1.5rem;
  }

  .mid-cta-card p {
    margin: 0;
    color: var(--muted-dark);
  }

  .mid-cta-card .primary-cta {
    display: inline-flex;
    min-height: 48px;
    align-items: center;
    justify-content: center;
    border-radius: 8px;
    padding: 0 20px;
    font-size: 14px;
    font-weight: 800;
    border: 1px solid var(--gold);
    background: linear-gradient(135deg, var(--gold), #df8f1f);
    color: #130f08;
    box-shadow: 0 14px 38px rgba(245, 184, 75, 0.18);
    transition: transform 180ms ease;
    white-space: nowrap;
  }

  .mid-cta-card .primary-cta:hover {
    transform: translateY(-2px);
  }

  .sticky-cta {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: var(--sticky-cta-z, 90);
    display: none;
    align-items: center;
    justify-content: space-between;
    gap: 14px;
    border-top: 1px solid var(--line);
    background: rgba(7, 8, 7, 0.95);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    padding: 14px 20px;
  }

  .sticky-cta span {
    color: var(--text);
    font-weight: 800;
    font-size: 15px;
  }

  .sticky-cta .primary-cta {
    display: inline-flex;
    min-height: 44px;
    align-items: center;
    justify-content: center;
    border-radius: 8px;
    padding: 0 18px;
    font-size: 13px;
    font-weight: 800;
    border: 1px solid var(--gold);
    background: linear-gradient(135deg, var(--gold), #df8f1f);
    color: #130f08;
    box-shadow: 0 14px 38px rgba(245, 184, 75, 0.18);
    text-decoration: none;
  }

  @media (max-width: 700px) {
    .mid-cta-card {
      flex-direction: column;
      text-align: center;
    }

    .sticky-cta {
      display: flex;
    }

    .beee-page {
      padding-bottom: 72px;
    }
  }

  @media (max-width: 1023px) {
    .mid-cta-card {
      flex-wrap: wrap;
    }
  }
</style>
