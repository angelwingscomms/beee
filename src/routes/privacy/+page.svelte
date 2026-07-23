<script lang="ts">
  import Button from '$lib/components/Button.svelte';
  import PageHero from '$lib/components/system/PageHero.svelte';
</script>

<PageHero eyebrow="YOUR DATA, RESPECTED" title="Privacy Policy." />

<section class="rv-section rv-section--flush">
  <div class="rv-wrap legal-inner">
    <p class="rv-micro legal-updated">Last updated: 13 July 2026</p>

    <section class="legal-section">
      <h2 class="rv-title">1. Who we are</h2>
      <p class="rv-body">BEEE (Be Everything Excellent Every Day) operates the BEEE Spectacular Chess Championship Abuja 2026 ("the Championship"). This policy explains what personal data we collect, why we collect it, and the choices you have. For questions, contact <a href="mailto:info@beeeproject.com" class="rv-link">info@beeeproject.com</a>.</p>
    </section>

    <section class="legal-section">
      <h2 class="rv-title">2. Data we collect</h2>
      <p class="rv-body">When you register or create an account we collect: your name, email address, phone number, school or organisation, and a password (stored hashed, never in plain text). If you register a team we also collect player names and team details. Partners additionally provide bank account details needed to pay commissions.</p>
      <p class="rv-body">If you sign in with Google, we receive your name, email, and profile picture from Google. We do not receive your Google password.</p>
    </section>

    <section class="legal-section">
      <h2 class="rv-title">3. How we use your data</h2>
      <ul class="rv-body">
        <li>To create and manage your account and registrations.</li>
        <li>To process payments through our payment partner, Paystack.</li>
        <li>To communicate with you about the Championship (confirmations, schedules, results).</li>
        <li>To pay partner commissions to the bank details you provide.</li>
        <li>To improve our programmes and prevent fraud.</li>
      </ul>
    </section>

    <section class="legal-section">
      <h2 class="rv-title">4. Payments</h2>
      <p class="rv-body">Payments are processed by Paystack, a Nigerian payment processor. We send Paystack the information needed to charge you and confirm your registration. We do not store your card or bank details on our servers. Paystack's own privacy policy governs how they handle that data.</p>
    </section>

    <section class="legal-section">
      <h2 class="rv-title">5. Cookies and local storage</h2>
      <p class="rv-body">We use a session cookie to keep you signed in, and browser local storage to remember your theme preference and any partner referral code. You can clear these at any time in your browser settings; doing so will sign you out.</p>
    </section>

    <section class="legal-section">
      <h2 class="rv-title">6. Data sharing</h2>
      <p class="rv-body">We share data only with service providers who need it to run the Championship: Paystack (payments), our email provider (transactional emails), and, where relevant, your school or team coordinator. We do not sell your personal data.</p>
    </section>

    <section class="legal-section">
      <h2 class="rv-title">7. Your rights</h2>
      <p class="rv-body">You may request access to, correction of, or deletion of your personal data at any time by emailing <a href="mailto:info@beeeproject.com" class="rv-link">info@beeeproject.com</a>. We will respond within 30 days.</p>
    </section>

    <section class="legal-section">
      <h2 class="rv-title">8. Data retention</h2>
      <p class="rv-body">We keep registration and account data for as long as your account exists and for a reasonable period afterwards to meet legal and operational obligations. Partner bank details are removed when a partner account is closed.</p>
    </section>

    <section class="legal-section">
      <h2 class="rv-title">9. Contact</h2>
      <p class="rv-body">Questions about this policy? Email <a href="mailto:info@beeeproject.com" class="rv-link">info@beeeproject.com</a> or call +234 802 092 0872.</p>
    </section>

    <div class="legal-cta">
      <Button href="/register">Register now</Button>
    </div>
  </div>
</section>

<style>
  .legal-inner {
    max-width: 68ch;
  }

  .legal-updated {
    color: var(--muted);
    margin: 0 0 var(--space-6);
  }

  .legal-section {
    margin-bottom: var(--space-6);
  }

  .legal-section h2 {
    margin-top: var(--space-6);
  }

  .legal-section p,
  .legal-section li {
    margin: 0 0 var(--space-2);
  }

  .legal-section ul {
    padding-left: 20px;
  }

  .legal-cta {
    margin-top: var(--space-3);
  }
</style>
