<script lang="ts">
  import Button from '$lib/components/Button.svelte';
  import PageHero from '$lib/components/system/PageHero.svelte';
</script>

<PageHero eyebrow="THE FINE PRINT, IN PLAIN TYPE" title="Terms of Service." />

<section class="rv-section rv-section--flush">
  <div class="rv-wrap legal-inner">
    <p class="rv-micro legal-updated">Last updated: 13 July 2026</p>

    <section class="legal-section">
      <h2 class="rv-title">1. Acceptance</h2>
      <p class="rv-body">By registering for or participating in the BEEE Spectacular Chess Championship Abuja 2026 ("the Championship"), you agree to these terms. If you are registering a participant under 18, you confirm you are a parent or guardian with authority to do so.</p>
    </section>

    <section class="legal-section">
      <h2 class="rv-title">2. Registration and fees</h2>
      <p class="rv-body">Registration requires payment of the stated participation fee via our payment partner, Paystack. Registration is confirmed only once payment is successfully verified. Fees are per the amount shown at checkout and may vary if a partner discount code is applied.</p>
    </section>

    <section class="legal-section">
      <h2 class="rv-title">3. Conduct</h2>
      <p class="rv-body">Participants and attendees are expected to act with respect and sportsmanship. We may remove any participant from the Championship, without refund, for cheating, harassment, unsafe behaviour, or any conduct that undermines the event.</p>
    </section>

    <section class="legal-section">
      <h2 class="rv-title">4. Refunds</h2>
      <p class="rv-body">Fees are generally non-refundable. Refunds may be considered only in cases of event cancellation by BEEE or documented extenuating circumstances, at our discretion. Where a payment fails or is reversed, the associated registration is not confirmed.</p>
    </section>

    <section class="legal-section">
      <h2 class="rv-title">5. Media and likeness</h2>
      <p class="rv-body">The Championship is photographed and recorded. By participating, you grant BEEE permission to use images and recordings of participants for promotional and reporting purposes, in line with our Privacy Policy.</p>
    </section>

    <section class="legal-section">
      <h2 class="rv-title">6. Accounts and security</h2>
      <p class="rv-body">You are responsible for keeping your account credentials secure. You must not share your login or use another person's account. We may suspend accounts used fraudulently or in breach of these terms.</p>
    </section>

    <section class="legal-section">
      <h2 class="rv-title">7. Partner programme</h2>
      <p class="rv-body">Partners earn commissions on valid registrations made using their code, paid to the bank details they provide. We may withhold or reverse commissions linked to fraud, refunds, or terms violations.</p>
    </section>

    <section class="legal-section">
      <h2 class="rv-title">8. Changes</h2>
      <p class="rv-body">We may update these terms from time to time. Continued participation after changes are posted constitutes acceptance of the updated terms.</p>
    </section>

    <section class="legal-section">
      <h2 class="rv-title">9. Contact</h2>
      <p class="rv-body">Questions about these terms? Email <a href="mailto:info@beeeproject.com" class="rv-link">info@beeeproject.com</a> or call +234 802 092 0872.</p>
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

  .legal-section p {
    margin: 0 0 var(--space-2);
  }

  .legal-cta {
    margin-top: var(--space-3);
  }
</style>
