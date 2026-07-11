<script lang="ts">
  import { motionFadeUp, motionStaggered } from '$lib/actions/motion';
  import { Medal, BadgeCheck, ScrollText, Award, Trophy, Crown, Lightbulb, Sparkles, School } from '@lucide/svelte';

  const honours = [
    { icon: Medal, label: 'Medals and Awards', accent: '#ffb200' },
    { icon: BadgeCheck, label: 'Badges of Competence', accent: '#7ec8e3' },
    { icon: ScrollText, label: 'Certificates of Participation', accent: '#f5e6c8' },
    { icon: Award, label: 'Certificates of Achievement', accent: '#ffb200' },
    { icon: Crown, label: 'Leadership Recognition Awards', accent: '#f5e6c8' },
    { icon: Lightbulb, label: 'Innovation and Creativity Awards', accent: '#ffb200' },
    { icon: Sparkles, label: 'Special Merit Awards', accent: '#7ec8e3' },
    { icon: School, label: 'School Recognition Awards', accent: '#f5e6c8' },
  ];

  function spotlight(e: PointerEvent) {
    const el = e.currentTarget as HTMLElement;
    const r = el.getBoundingClientRect();
    el.style.setProperty('--mx', `${e.clientX - r.left}px`);
    el.style.setProperty('--my', `${e.clientY - r.top}px`);
  }
</script>

<section id="awards" class="relative overflow-hidden py-24 md:py-36 bg-white" use:motionFadeUp>
  <!-- Atmosphere -->
  <span class="awards-watermark hidden md:block" aria-hidden="true">HONOURS</span>

  <div class="relative max-w-7xl mx-auto px-6">
    <!-- Header -->
    <div class="lg:grid lg:grid-cols-12 lg:gap-10 lg:items-end mb-12 md:mb-16">
      <div class="lg:col-span-8">
        <p class="flex items-center gap-3 font-['JetBrains_Mono'] text-amber-400 text-xs font-medium uppercase tracking-[0.3em] mb-5">
          <span class="inline-block h-px w-8 bg-amber-400/60" aria-hidden="true"></span>
          Awards &amp; Recognition
        </p>
        <h2 class="font-hero text-4xl md:text-6xl text-[#141413] font-bold tracking-tight leading-[1.05] text-balance">
          More than one way to
          <span class="awards-win">win<svg class="awards-win-swash" viewBox="0 0 100 10" preserveAspectRatio="none" aria-hidden="true"><path d="M2 7 Q 50 -2 98 6" /></svg></span>
        </h2>
      </div>
      <div class="lg:col-span-4 mt-8 lg:mt-0">
        <p class="font-['Inter'] text-gray-600 text-base leading-relaxed">
          Trophies crown champions — but effort, leadership, and creativity never go unnoticed here. Every participant competes for honours that recognise growth on and off the board.
        </p>
        <div class="mt-6 flex items-baseline gap-3">
          <span class="font-hero text-5xl font-extrabold text-amber-400 leading-none">09</span>
          <span class="font-['Inter'] text-[12px] uppercase tracking-[0.18em] text-gray-500">honours to compete for</span>
        </div>
      </div>
    </div>

    <!-- Bento grid -->
    <ul class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 list-none p-0 m-0" use:motionStaggered={{ stagger: 0.06, y: 18 }}>
      <!-- Featured: T.E.A.M.U.P.™ Excellence Awards -->
      <li class="honour-card honour-feat relative flex flex-col overflow-hidden rounded-[20px] p-7 sm:col-span-2 lg:row-span-2" style="--aa: #ffb200" onpointermove={spotlight}>
        <div class="flex items-start justify-between">
          <span class="feat-ring" aria-hidden="true">
            <span class="feat-ring-dash"></span>
            <Trophy size={26} />
          </span>
          <span class="honour-num font-['JetBrains_Mono'] text-[11px] tracking-[0.2em]">01</span>
        </div>
        <div class="mt-auto pt-10">
          <h3 class="font-hero text-2xl md:text-[26px] font-bold text-[#141413] tracking-tight leading-snug m-0">T.E.A.M.U.P.™ Excellence Awards</h3>
          <p class="font-['Inter'] text-sm text-gray-600 leading-relaxed mt-2.5 mb-0 max-w-[36ch]">
            Excellence across Technology, Enterprise, Art, Mentorship, and Upskilling.
          </p>
        </div>
        <span class="feat-watermark" aria-hidden="true"><Trophy size={210} strokeWidth={1} /></span>
      </li>

      {#each honours as h, i}
        <li class="honour-card relative flex min-h-[170px] flex-col overflow-hidden rounded-[20px] p-5" style="--aa: {h.accent}" onpointermove={spotlight}>
          <div class="flex items-start justify-between">
            <span class="honour-icon grid h-12 w-12 shrink-0 place-items-center rounded-[14px]">
              <h.icon size={22} />
            </span>
            <span class="honour-num font-['JetBrains_Mono'] text-[11px] tracking-[0.2em]">{String(i + 2).padStart(2, '0')}</span>
          </div>
          <span class="honour-label mt-auto pt-8 font-hero text-[17px] font-semibold tracking-tight leading-snug">{h.label}</span>
        </li>
      {/each}
    </ul>

    <!-- Footer strip -->
    <div class="mt-12 flex flex-col gap-3 border-t border-[#141413]/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
      <p class="font-['Inter'] text-sm text-gray-500 m-0">Every honour is recorded in your child's TASKIFY™ Development Passport.</p>
      <a href="/taskify" class="font-['Inter'] text-sm text-amber-400 no-underline transition-colors hover:text-[#141413]">See how achievements are tracked →</a>
    </div>
  </div>
</section>

<style>
  /* ————— Atmosphere ————— */
  .awards-watermark {
    position: absolute;
    top: 44px;
    right: -0.06em;
    font-family: var(--font-hero);
    font-weight: 800;
    font-size: clamp(5rem, 11vw, 10.5rem);
    line-height: 1;
    letter-spacing: -0.02em;
    color: rgba(20, 20, 19, 0.02);
    -webkit-text-stroke: 1px rgba(20, 20, 19, 0.07);
    pointer-events: none;
    user-select: none;
  }

  /* ————— Headline accent ————— */
  .awards-win {
    position: relative;
    display: inline-block;
    font-family: 'Playfair Display', var(--font-display), serif;
    font-style: italic;
    font-weight: 500;
    font-size: 1.08em;
    color: #ffb200;
    padding: 0 0.06em;
  }

  .awards-win-swash {
    position: absolute;
    left: 0;
    bottom: -0.12em;
    width: 100%;
    height: 0.16em;
    overflow: visible;
  }

  .awards-win-swash path {
    fill: none;
    stroke: rgba(255, 178, 0, 0.75);
    stroke-width: 2.5;
    stroke-linecap: round;
    vector-effect: non-scaling-stroke;
  }

  /* ————— Cards ————— */
  .honour-card {
    background: #faf9f7;
    border: 1px solid rgba(20, 20, 19, 0.08);
    transition: transform 350ms cubic-bezier(0.16, 1, 0.3, 1), border-color 350ms ease, box-shadow 350ms ease;
  }

  .honour-card::before {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(240px circle at var(--mx, 50%) var(--my, 50%), color-mix(in srgb, var(--aa) 10%, transparent), transparent 70%);
    opacity: 0;
    transition: opacity 350ms ease;
  }

  .honour-card:hover {
    transform: translateY(-4px);
    border-color: color-mix(in srgb, var(--aa) 40%, transparent);
    box-shadow:
      0 18px 40px -18px color-mix(in srgb, var(--aa) 30%, rgba(20, 20, 19, 0.25));
  }

  .honour-card:hover::before {
    opacity: 1;
  }

  .honour-icon {
    background: color-mix(in srgb, var(--aa) 14%, transparent);
    color: var(--aa);
    transition: transform 350ms cubic-bezier(0.16, 1, 0.3, 1), background 350ms ease;
  }

  .honour-card:hover .honour-icon {
    transform: scale(1.08) rotate(-4deg);
    background: color-mix(in srgb, var(--aa) 22%, transparent);
  }

  .honour-num {
    color: rgba(20, 20, 19, 0.3);
    transition: color 350ms ease;
  }

  .honour-card:hover .honour-num {
    color: color-mix(in srgb, var(--aa) 75%, transparent);
  }

  .honour-label {
    color: rgba(20, 20, 19, 0.85);
    transition: color 350ms ease;
  }

  .honour-card:hover .honour-label {
    color: #141413;
  }

  /* ————— Featured card ————— */
  .honour-feat {
    background: rgba(255, 178, 0, 0.08);
    border-color: rgba(255, 178, 0, 0.35);
  }

  .feat-ring {
    position: relative;
    display: grid;
    place-items: center;
    width: 64px;
    height: 64px;
    border-radius: 999px;
    background: rgba(255, 178, 0, 0.14);
    color: #ffb200;
  }

  .feat-ring-dash {
    position: absolute;
    inset: -7px;
    border-radius: 999px;
    border: 1px dashed rgba(255, 178, 0, 0.4);
    animation: awards-spin 30s linear infinite;
  }

  .feat-watermark {
    position: absolute;
    right: -34px;
    bottom: -40px;
    color: #ffb200;
    opacity: 0.06;
    transform: rotate(12deg);
    pointer-events: none;
    transition: opacity 350ms ease, transform 600ms cubic-bezier(0.16, 1, 0.3, 1);
  }

  .honour-feat:hover .feat-watermark {
    opacity: 0.1;
    transform: rotate(8deg) scale(1.04);
  }

  @keyframes awards-spin {
    to {
      transform: rotate(360deg);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .honour-card,
    .honour-card::before,
    .honour-icon,
    .honour-num,
    .honour-label,
    .feat-watermark {
      transition: none;
    }
    .honour-card:hover {
      transform: none;
    }
    .feat-ring-dash {
      animation: none;
    }
  }
</style>
