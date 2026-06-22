<script lang="ts">
</script>

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

<style>
  .section { padding: 104px 0; }
  .tracking-section { background: #0b0d0c; }
  .container { width: min(1180px, calc(100% - 40px)); margin: 0 auto; }
  .tracking-grid { display: grid; grid-template-columns: 0.8fr 1fr; gap: 56px; align-items: center; }
  .section-heading { max-width: 760px; margin: 0 auto 44px; }
  .align-left { margin-inline: 0; text-align: left; }
  .section-kicker {
    display: inline-flex; width: fit-content; margin: 0;
    border: 1px solid rgba(245, 184, 75, 0.28); border-radius: 999px;
    background: rgba(245, 184, 75, 0.09); color: var(--gold);
    padding: 7px 12px; font-size: 12px; font-weight: 900;
    letter-spacing: 0.08em; text-transform: uppercase;
  }
  .section-heading h2 {
    margin: 16px 0 0; font-family: var(--font-championship), var(--font-registration), sans-serif;
    font-weight: 800; font-size: clamp(2.1rem, 5vw, 4.4rem); line-height: 1.04; color: var(--text);
  }
  .section-heading p:not(.section-kicker) {
    max-width: 650px; margin: 18px 0 0; color: var(--muted-dark); font-size: 18px; line-height: 1.6;
  }
  .dashboard {
    padding: 28px;
    border: 1px solid rgba(255, 255, 255, 0.12); border-radius: 8px;
    background: var(--panel); box-shadow: 0 24px 80px rgba(0, 0, 0, 0.18);
    color: var(--text);
  }
  .dashboard-top { display: flex; justify-content: space-between; gap: 16px; border-bottom: 1px solid var(--line); padding-bottom: 18px; }
  .dashboard-top span { color: var(--muted-dark); }
  .dashboard-top strong { color: var(--gold); }
  .progress-row { margin-top: 24px; }
  .progress-row span { font-weight: 900; }
  .progress-row div { height: 12px; margin-top: 10px; overflow: hidden; border-radius: 999px; background: rgba(255, 255, 255, 0.1); }
  .progress-row i { display: block; width: 72%; height: 100%; border-radius: inherit; background: linear-gradient(90deg, var(--gold), var(--green)); }
  .badge-row, .tracking-tabs { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 22px; }
  .badge-row span, .tracking-tabs span {
    display: inline-flex; align-items: center; gap: 7px;
    border: 1px solid rgba(255, 255, 255, 0.12); border-radius: 999px;
    background: rgba(255, 255, 255, 0.06); color: var(--muted-dark);
    padding: 8px 11px; font-size: 13px; font-weight: 700;
  }
  .xp-card { margin-top: 22px; border-radius: 8px; background: rgba(245, 184, 75, 0.12); padding: 22px; color: var(--gold); font-size: 20px; font-weight: 900; }
  .reveal { animation: fade-up both; animation-timeline: view(); animation-range: entry 0% cover 28%; }
  @keyframes fade-up { from { opacity: 0; transform: translateY(26px); } to { opacity: 1; transform: translateY(0); } }
  @media (prefers-reduced-motion: reduce) { .reveal { animation: none !important; } }
  @media (max-width: 1023px) { .tracking-grid { grid-template-columns: 1fr; } }
  @media (max-width: 700px) { .section { padding: 72px 0; } .dashboard-top { align-items: stretch; flex-direction: column; } }
</style>
