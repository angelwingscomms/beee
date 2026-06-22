<script lang="ts">
</script>

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

<style>
  .footer {
    border-top: 1px solid var(--line);
    background: #050605;
    padding: 54px 0 28px;
    color: var(--muted-dark);
  }
  .container { width: min(1180px, calc(100% - 40px)); margin: 0 auto; }
  .footer-grid { display: grid; grid-template-columns: 1.4fr repeat(5, 1fr); gap: 28px; }
  .footer img { width: 54px; }
  .footer p { max-width: 260px; line-height: 1.5; }
  .footer nav { display: grid; align-content: start; gap: 10px; }
  .footer strong { color: var(--text); }
  .footer a { color: var(--muted-dark); font-size: 14px; }
  .footer a:hover { color: var(--gold); }
  .copyright { margin-top: 40px; border-top: 1px solid var(--line); padding-top: 22px; font-size: 13px; }
  @media (max-width: 1023px) { .footer-grid { grid-template-columns: repeat(2, 1fr); } .footer-grid > div { grid-column: 1 / -1; } }
  @media (max-width: 700px) { .footer-grid { grid-template-columns: 1fr; } }
</style>
