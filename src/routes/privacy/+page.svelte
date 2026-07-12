<script lang="ts">
  import Button from '$lib/components/Button.svelte';
</script>

<svelte:head>
  <title>Privacy Policy — BEEE</title>
  <meta name="description" content="How BEEE collects, uses, and protects your personal data when you register for the BEEE Spectacular Chess Championship Abuja 2026." />
</svelte:head>

<div class="legal">
  <div class="container legal-inner">
    <h1 class="legal-title">Privacy Policy</h1>
    <p class="legal-updated">Last updated: 13 July 2026</p>

    <section class="legal-section">
      <h2>1. Who we are</h2>
      <p>BEEE (Be Everything Excellent Every Day) operates the BEEE Spectacular Chess Championship Abuja 2026 ("the Championship"). This policy explains what personal data we collect, why we collect it, and the choices you have. For questions, contact <a href="mailto:info@beeeproject.com">info@beeeproject.com</a>.</p>
    </section>

    <section class="legal-section">
      <h2>2. Data we collect</h2>
      <p>When you register or create an account we collect: your name, email address, phone number, school or organisation, and a password (stored hashed, never in plain text). If you register a team we also collect player names and team details. Affiliates additionally provide bank account details needed to pay commissions.</p>
      <p>If you sign in with Google, we receive your name, email, and profile picture from Google. We do not receive your Google password.</p>
    </section>

    <section class="legal-section">
      <h2>3. How we use your data</h2>
      <ul>
        <li>To create and manage your account and registrations.</li>
        <li>To process payments through our payment partner, Paystack.</li>
        <li>To communicate with you about the Championship (confirmations, schedules, results).</li>
        <li>To pay affiliate commissions to the bank details you provide.</li>
        <li>To improve our programmes and prevent fraud.</li>
      </ul>
    </section>

    <section class="legal-section">
      <h2>4. Payments</h2>
      <p>Payments are processed by Paystack (a Flutterwave-adjacent Nigerian payment processor). We send Paystack the information needed to charge you and confirm your registration. We do not store your card or bank details on our servers. Paystack's own privacy policy governs how they handle that data.</p>
    </section>

    <section class="legal-section">
      <h2>5. Cookies and local storage</h2>
      <p>We use a session cookie to keep you signed in, and browser local storage to remember your theme preference and any affiliate referral code. You can clear these at any time in your browser settings; doing so will sign you out.</p>
    </section>

    <section class="legal-section">
      <h2>6. Data sharing</h2>
      <p>We share data only with service providers who need it to run the Championship: Paystack (payments), our email provider (transactional emails), and, where relevant, your school or team coordinator. We do not sell your personal data.</p>
    </section>

    <section class="legal-section">
      <h2>7. Your rights</h2>
      <p>You may request access to, correction of, or deletion of your personal data at any time by emailing <a href="mailto:info@beeeproject.com">info@beeeproject.com</a>. We will respond within 30 days.</p>
    </section>

    <section class="legal-section">
      <h2>8. Data retention</h2>
      <p>We keep registration and account data for as long as your account exists and for a reasonable period afterwards to meet legal and operational obligations. Affiliate bank details are removed when an affiliate account is closed.</p>
    </section>

    <section class="legal-section">
      <h2>9. Contact</h2>
      <p>Questions about this policy? Email <a href="mailto:info@beeeproject.com">info@beeeproject.com</a> or call +234 802 092 0872.</p>
    </section>

    <div class="legal-cta">
      <Button href="/register">Register now</Button>
    </div>
  </div>
</div>

<style>
  .legal {
    background: var(--canvas);
    padding: 120px 0 80px;
    min-height: 100dvh;
  }
  .legal-inner {
    max-width: 760px;
  }
  .legal-title {
    font-family: var(--font-hero);
    font-size: clamp(2.2rem, 5vw, 3.5rem);
    font-weight: 700;
    letter-spacing: -0.03em;
    color: var(--ink);
    margin: 0;
  }
  .legal-updated {
    color: var(--body);
    margin: 8px 0 40px;
    font-size: 15px;
  }
  .legal-section {
    margin-bottom: 36px;
  }
  .legal-section h2 {
    font-family: var(--font-hero);
    font-size: 1.4rem;
    font-weight: 600;
    color: var(--ink);
    margin: 0 0 12px;
  }
  .legal-section p,
  .legal-section li {
    font-size: 16px;
    line-height: 1.7;
    color: var(--body);
    margin: 0 0 12px;
  }
  .legal-section a {
    color: var(--primary);
    text-underline-offset: 3px;
  }
  .legal-section ul {
    padding-left: 20px;
  }
  .legal-cta {
    margin-top: 16px;
  }
</style>
