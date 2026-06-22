<script lang="ts">
  import { ShieldCheck } from '@lucide/svelte';
  import { motionFadeUp, motionScaleIn } from '$lib/actions/motion';
</script>

<section class="section passport-section" id="passport">
  <div class="container passport-grid">
    <div class="passport-mock" use:motionFadeUp aria-label="Development passport mockup">
      <div class="passport-cover" use:motionScaleIn={{ stiffness: 100, damping: 14, delay: 0.2 }}>
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
    <div class="passport-copy" use:motionFadeUp>
      <p class="section-kicker">Development Passport</p>
      <h2>Every participant receives a T.E.A.M.U.P. Development Passport.</h2>
      <p>The passport makes growth visible. Parents can see attendance, achievements, badges, leadership activities, projects, mentorship records, certificates and milestones in one structured record.</p>
      <span class="access-badge"><ShieldCheck size={17} />Parent Access Included</span>
      <a class="primary-cta" href="/register">Register Child</a>
    </div>
  </div>
</section>

<style>
  .section { padding: 104px 0; }
  .passport-section {
    background: radial-gradient(circle at 18% 15%, rgba(245, 184, 75, 0.16), transparent 24%),
                radial-gradient(circle at 82% 80%, rgba(88, 198, 159, 0.12), transparent 26%), #070807;
  }
  .container { width: min(1180px, calc(100% - 40px)); margin: 0 auto; }
  .passport-grid { display: grid; grid-template-columns: minmax(0, 0.95fr) minmax(340px, 0.82fr); gap: 56px; align-items: center; }
  .section-kicker {
    display: inline-flex; width: fit-content; margin: 0;
    border: 1px solid rgba(245, 184, 75, 0.28); border-radius: 999px;
    background: rgba(245, 184, 75, 0.09); color: var(--gold);
    padding: 7px 12px; font-size: 12px; font-weight: 900;
    letter-spacing: 0.08em; text-transform: uppercase;
  }
  .passport-copy h2 {
    margin: 16px 0 0; font-family: var(--font-championship), var(--font-registration), sans-serif;
    font-weight: 800; font-size: clamp(2.1rem, 5vw, 4.4rem); line-height: 1.04; color: var(--text);
  }
  .passport-copy p { max-width: 650px; margin: 18px 0 0; color: var(--muted-dark); font-size: 18px; line-height: 1.6; }
  .access-badge {
    display: inline-flex; align-items: center; gap: 7px; margin: 22px 0 24px;
    border: 1px solid rgba(255, 255, 255, 0.12); border-radius: 999px;
    background: rgba(255, 255, 255, 0.06); color: var(--text);
    padding: 8px 11px; font-size: 13px; font-weight: 700;
  }
  .primary-cta {
    display: inline-flex; min-height: 48px; align-items: center; justify-content: center;
    border-radius: 8px; padding: 0 20px; font-size: 14px; font-weight: 800;
    border: 1px solid var(--gold); background: linear-gradient(135deg, var(--gold), #df8f1f);
    color: #130f08; box-shadow: 0 14px 38px rgba(245, 184, 75, 0.18);
    transition: transform 180ms ease;
  }
  .primary-cta:hover { transform: translateY(-2px); }
  .passport-mock {
    min-height: 600px; overflow: hidden;
    background: linear-gradient(145deg, #10130f, #21190d); padding: 26px;
    border: 1px solid rgba(255, 255, 255, 0.12); border-radius: 8px;
    box-shadow: 0 24px 80px rgba(0, 0, 0, 0.18);
  }
  .passport-cover {
    display: grid; min-height: 250px; align-content: end;
    border: 1px solid rgba(245, 184, 75, 0.22); border-radius: 8px;
    background: linear-gradient(135deg, rgba(245, 184, 75, 0.16), transparent 45%),
                repeating-linear-gradient(90deg, rgba(255, 255, 255, 0.04) 0 1px, transparent 1px 30px);
    padding: 26px;
  }
  .passport-cover img { width: 70px; margin-bottom: 32px; }
  .passport-cover span { color: var(--gold); font-size: 13px; font-weight: 900; letter-spacing: 0.16em; }
  .passport-cover strong { margin-top: 8px; font-size: 34px; line-height: 1; }
  .stamp-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; margin-top: 18px; }
  .stamp-grid span {
    border: 1px solid rgba(245, 184, 75, 0.24); border-radius: 8px;
    padding: 16px; color: var(--muted-dark); font-weight: 800;
  }
  @media (max-width: 1023px) { .passport-grid { grid-template-columns: 1fr; } }
  @media (max-width: 700px) { .section { padding: 72px 0; } .passport-mock { min-height: auto; } }
</style>
