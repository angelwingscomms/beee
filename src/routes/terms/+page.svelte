<script lang="ts">
  import Button from '$lib/components/Button.svelte';
</script>

<svelte:head>
  <title>Terms of Service — BEEE</title>
  <meta name="description" content="The terms that apply when you register for or participate in the BEEE Spectacular Chess Championship Abuja 2026." />
</svelte:head>

<div class="legal">
  <div class="container legal-inner">
    <h1 class="legal-title">Terms of Service</h1>
    <p class="legal-updated">Last updated: 13 July 2026</p>

    <section class="legal-section">
      <h2>1. Acceptance</h2>
      <p>By registering for or participating in the BEEE Spectacular Chess Championship Abuja 2026 ("the Championship"), you agree to these terms. If you are registering a participant under 18, you confirm you are a parent or guardian with authority to do so.</p>
    </section>

    <section class="legal-section">
      <h2>2. Registration and fees</h2>
      <p>Registration requires payment of the stated participation fee via our payment partner, Paystack. Registration is confirmed only once payment is successfully verified. Fees are per the amount shown at checkout and may vary if an affiliate discount code is applied.</p>
    </section>

    <section class="legal-section">
      <h2>3. Conduct</h2>
      <p>Participants and attendees are expected to act with respect and sportsmanship. We may remove any participant from the Championship, without refund, for cheating, harassment, unsafe behaviour, or any conduct that undermines the event.</p>
    </section>

    <section class="legal-section">
      <h2>4. Refunds</h2>
      <p>Fees are generally non-refundable. Refunds may be considered only in cases of event cancellation by BEEE or documented extenuating circumstances, at our discretion. Where a payment fails or is reversed, the associated registration is not confirmed.</p>
    </section>

    <section class="legal-section">
      <h2>5. Media and likeness</h2>
      <p>The Championship is photographed and recorded. By participating, you grant BEEE permission to use images and recordings of participants for promotional and reporting purposes, in line with our Privacy Policy.</p>
    </section>

    <section class="legal-section">
      <h2>6. Accounts and security</h2>
      <p>You are responsible for keeping your account credentials secure. You must not share your login or use another person's account. We may suspend accounts used fraudulently or in breach of these terms.</p>
    </section>

    <section class="legal-section">
      <h2>7. Affiliate programme</h2>
      <p>Affiliates earn commissions on valid registrations made using their code, paid to the bank details they provide. We may withhold or reverse commissions linked to fraud, refunds, or terms violations.</p>
    </section>

    <section class="legal-section">
      <h2>8. Changes</h2>
      <p>We may update these terms from time to time. Continued participation after changes are posted constitutes acceptance of the updated terms.</p>
    </section>

    <section class="legal-section">
      <h2>9. Contact</h2>
      <p>Questions about these terms? Email <a href="mailto:info@beeeproject.com">info@beeeproject.com</a> or call +234 802 092 0872.</p>
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
