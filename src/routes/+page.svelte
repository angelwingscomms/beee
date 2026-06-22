<script lang="ts">
  import Navbar from '../components/home/Navbar.svelte';
  import Hero from '../components/home/Hero.svelte';
  import TrustBar from '../components/home/TrustBar.svelte';
  import WhyBeee from '../components/home/WhyBeee.svelte';
  import Journey from '../components/home/Journey.svelte';
  import TeamUp from '../components/home/TeamUp.svelte';
  import Passport from '../components/home/Passport.svelte';
  import Benefits from '../components/home/Benefits.svelte';
  import ProgressTracking from '../components/home/ProgressTracking.svelte';
  import Parents from '../components/home/Parents.svelte';
  import Awards from '../components/home/Awards.svelte';
  import FAQ from '../components/home/FAQ.svelte';
  import FinalCTA from '../components/home/FinalCTA.svelte';
  import Footer from '../components/home/Footer.svelte';
  import MobileStickyCTA from '../components/home/MobileStickyCTA.svelte';

  let menu_open = $state(false);
  function menu_toggle() { menu_open = !menu_open; }

  const journey = [
    { code: '01', title: 'Register', detail: 'Complete the simple registration form to begin your child\'s championship journey.' },
    { code: '02', title: 'T.E.A.M.U.P.', detail: 'Participants gain access to the T.E.A.M.U.P. development framework combining chess with life skills.' },
    { code: '03', title: 'Development Passport', detail: 'Every child receives a digital passport tracking attendance, achievements, badges and mentorship records.' },
    { code: '04', title: 'Preliminary Rounds', detail: 'Structured preliminary rounds allow participants to gain confidence and demonstrate growth.' },
    { code: '05', title: 'Advanced Stages', detail: 'Top performers advance through increasingly challenging stages of competition and skill demonstration.' },
    { code: '06', title: 'Grand Finale', detail: 'The championship concludes with a Grand Finale celebrating every participant\'s developmental journey.' },
  ];

  const teamup = [
    {
      name: 'Technology',
      detail: 'Digital literacy, problem solving and innovation mindset for the modern world.',
      points: ['Problem Solving', 'Digital Literacy', 'Innovation Mindset'],
    },
    {
      name: 'Enterprise',
      detail: 'Entrepreneurial thinking, project management and real-world application.',
      points: ['Entrepreneurial Thinking', 'Project Management', 'Real-World Application'],
    },
    {
      name: 'Art',
      detail: 'Creative expression, design thinking and visual communication skills.',
      points: ['Creative Expression', 'Design Thinking', 'Visual Communication'],
    },
    {
      name: 'Mentorship',
      detail: 'Guided growth through experienced mentors who inspire and challenge.',
      points: ['Guided Growth', 'Peer Learning', 'Leadership Development'],
    },
    {
      name: 'Upskill',
      detail: 'Continuous improvement through structured skill acquisition and practice.',
      points: ['Continuous Improvement', 'Structured Practice', 'Skill Mastery'],
    },
  ];

  const benefits = [
    ['Strategic Thinking', 'Develop the ability to plan ahead, anticipate outcomes and make calculated decisions under pressure.'],
    ['Leadership', 'Build confidence to lead teams, communicate effectively and inspire others through example.'],
    ['Communication', 'Learn to articulate ideas clearly, listen actively and present with conviction.'],
    ['Creativity', 'Unlock creative problem-solving approaches that extend beyond the chessboard into everyday life.'],
    ['Confidence', 'Grow self-assurance through achievement, constructive feedback and public performance.'],
    ['Problem Solving', 'Master structured approaches to breaking down complex challenges into manageable steps.'],
  ];

  const awards = [
    'Championship Trophy',
    'Medals',
    'Certificates',
    'Achievement Badges',
    'Leadership Awards',
    'Innovation Awards',
    'Special Recognition Awards',
  ];

  const faqs = [
    ['Who can participate?', 'The BEEE Spectacular Chess Championship is open to children and young people of all skill levels. Age categories are designed to ensure fair and enjoyable competition for everyone.'],
    ['Do I need prior chess experience?', 'No prior chess experience is required. The programme includes development sessions designed to help every participant learn, grow and compete at their own pace.'],
    ['What is T.E.A.M.U.P.?', 'T.E.A.M.U.P. is our flagship youth development framework that stands for Technology, Enterprise, Art, Mentorship and Upskill. It combines chess with life skills development for a holistic growth experience.'],
    ['How is progress tracked?', 'Every participant receives a Development Passport that tracks attendance, achievements, badges, mentorship records and certificates. Parents have access to view real-time progress.'],
    ['What is the Development Passport?', 'The Development Passport is a digital record of each participant\'s journey. It includes attendance logs, achievement badges, leadership activities, projects, mentorship records and certificates.'],
    ['Can parents monitor progress?', 'Yes. Parents receive access to their child\'s Development Passport, allowing them to monitor progress, view achievements, track attendance, celebrate milestones and access certificates.'],
    ['What happens after registration?', 'After registration, you will receive a confirmation with next steps, including access to the T.E.A.M.U.P. portal, your child\'s Development Passport and information about preliminary rounds.'],
    ['How do I register?', 'Registration is simple and can be completed online via the Register button. You will need to provide your child\'s name, age and contact information.'],
  ];
</script>

<svelte:head>
  <title>BEEE Spectacular Chess Championship Abuja 2026 — Where Young Minds Compete, Develop, Excel</title>
  <meta name="description" content="A premium youth development programme culminating in a championship. Register your child for the BEEE Spectacular Chess Championship Abuja 2026 — a transformational journey in leadership, strategy and personal growth." />
  <meta property="og:title" content="BEEE Spectacular Chess Championship Abuja 2026" />
  <meta property="og:description" content="A transformational journey in leadership, strategy, innovation and personal growth. Register your child today." />
  <meta property="og:type" content="website" />
  <meta name="keywords" content="chess championship, Abuja, youth development, children chess, Nigeria, BEEE, TEAMUP" />
</svelte:head>

<Navbar menuOpen={menu_open} onMenuToggle={menu_toggle} />
<Hero />
<TrustBar />
<WhyBeee />
<Journey journey={journey} />
<TeamUp teamup={teamup} />

<!-- Mid-page CTA after TeamUp -->
<section class="mid-cta section-soft">
  <div class="container mid-cta-inner">
    <p>Ready to begin the pathway?</p>
    <a class="button-primary" href="/register">Register Child</a>
  </div>
</section>

<Passport />
<Benefits benefits={benefits} />

<!-- Mid-page CTA after Benefits -->
<section class="mid-cta section-soft">
  <div class="container mid-cta-inner">
    <p>Give your child the opportunity to learn, compete and excel.</p>
    <a class="button-primary" href="/register">Register Now</a>
  </div>
</section>

<ProgressTracking />
<Parents />

<!-- Mid-page CTA after Parents -->
<section class="mid-cta section-soft">
  <div class="container mid-cta-inner">
    <p>Join BEEE and give your child a transformative experience.</p>
    <a class="button-primary" href="/register">Register Now</a>
  </div>
</section>

<Awards awards={awards} />
<FAQ faqs={faqs} />
<FinalCTA />
<Footer />
<MobileStickyCTA />

<style>
  .mid-cta {
    padding: 32px 0;
  }

  .mid-cta-inner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
  }

  .mid-cta-inner p {
    margin: 0;
    color: var(--body-strong);
    font-weight: 600;
    font-size: 17px;
  }

  .container {
    width: min(1180px, calc(100% - 40px));
    margin: 0 auto;
  }

  @media (max-width: 700px) {
    .mid-cta-inner {
      flex-direction: column;
      text-align: center;
    }
  }
</style>
