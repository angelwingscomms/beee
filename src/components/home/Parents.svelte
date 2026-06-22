<script lang="ts">
</script>

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

<style>
  .section { padding: 104px 0; }
  .parents-section { background: var(--cream); color: var(--ink-dark); }
  .container { width: min(1180px, calc(100% - 40px)); margin: 0 auto; }
  .parents-grid { display: grid; grid-template-columns: minmax(320px, 0.72fr) 1fr; gap: 56px; align-items: center; }
  .section-kicker {
    display: inline-flex; width: fit-content; margin: 0;
    border: 1px solid rgba(245, 184, 75, 0.28); border-radius: 999px;
    background: rgba(245, 184, 75, 0.09); color: var(--gold);
    padding: 7px 12px; font-size: 12px; font-weight: 900;
    letter-spacing: 0.08em; text-transform: uppercase;
  }
  .parents-copy h2 {
    margin: 16px 0 0; font-family: var(--font-championship), var(--font-registration), sans-serif;
    font-weight: 800; font-size: clamp(2.1rem, 5vw, 4.4rem); line-height: 1.04; color: var(--ink-dark);
  }
  .parents-copy p { max-width: 650px; margin: 18px 0 0; color: #6b6257; font-size: 18px; line-height: 1.6; }
  .parents-copy ul { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 12px; margin: 28px 0 0; padding: 0; list-style: none; }
  .parents-copy li { border: 1px solid #ded3c3; border-radius: 8px; background: #fff; padding: 14px 16px; font-weight: 800; }
  .cta-row { display: flex; align-items: center; flex-wrap: wrap; gap: 12px; margin-top: 30px; }
  .primary-cta {
    display: inline-flex; min-height: 48px; align-items: center; justify-content: center;
    border-radius: 8px; padding: 0 20px; font-size: 14px; font-weight: 800;
    border: 1px solid var(--gold); background: linear-gradient(135deg, var(--gold), #df8f1f);
    color: #130f08; box-shadow: 0 14px 38px rgba(245, 184, 75, 0.18);
    transition: transform 180ms ease;
  }
  .primary-cta:hover { transform: translateY(-2px); }
  .secondary-cta {
    display: inline-flex; min-height: 48px; align-items: center; justify-content: center;
    border-radius: 8px; padding: 0 20px; font-size: 14px; font-weight: 800;
    transition: transform 180ms ease, border-color 180ms ease, background 180ms ease;
  }
  .secondary-cta:hover { transform: translateY(-2px); }
  .dark-text { border: 1px solid rgba(23, 22, 20, 0.16); background: #fff; color: var(--ink-dark); }
  .parent-dashboard {
    display: grid; min-height: 520px; place-items: center;
    border: 1px solid #ded3c3; border-radius: 8px;
    background: #fff; box-shadow: 0 18px 45px rgba(23, 22, 20, 0.06);
  }
  .phone-shell { width: min(310px, 88%); border: 10px solid #171614; border-radius: 32px; background: #10120f; padding: 18px; color: var(--text); }
  .phone-header { color: var(--gold); font-weight: 900; margin-bottom: 18px; }
  .phone-card { display: flex; justify-content: space-between; gap: 16px; border-radius: 8px; background: rgba(255, 255, 255, 0.08); padding: 16px; margin-top: 10px; }
  .phone-card span { color: var(--muted-dark); }
  .reveal { animation: fade-up both; animation-timeline: view(); animation-range: entry 0% cover 28%; }
  @keyframes fade-up { from { opacity: 0; transform: translateY(26px); } to { opacity: 1; transform: translateY(0); } }
  @media (prefers-reduced-motion: reduce) { .reveal { animation: none !important; } }
  @media (max-width: 1023px) { .parents-grid { grid-template-columns: 1fr; } }
  @media (max-width: 700px) { .section { padding: 72px 0; } .parents-copy ul { grid-template-columns: 1fr; } }
</style>
