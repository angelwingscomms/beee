<script lang="ts">
  import { goto } from '$app/navigation';
  import { dev } from '$app/environment';
  import { MIN_TRANSFER_AMNT, DEV_REG_FEE, REG_AMOUNT, DISCOUNT_PCT, COMMISSION_PCT } from '$lib/constants';
  import TextInput from '$lib/components/TextInput.svelte';
  import PageHero from '$lib/components/system/PageHero.svelte';
  import { revealFade } from '$lib/motion/reveal';

  const payout_naira = (MIN_TRANSFER_AMNT / 100).toLocaleString();
  const fee_naira = (DEV_REG_FEE / 100).toLocaleString();
  // Commissions are only paid on referred registrations, which always carry the
  // partner discount , so the 10% commission is of the discounted fee, not the full one.
  const commission_naira = Math.round(REG_AMOUNT * (1 - DISCOUNT_PCT / 100) * COMMISSION_PCT / 100).toLocaleString();

  let email = $state('');
  let password = $state('');
  let confirmPassword = $state('');
  let eme = $state('');
  let pwe = $state('');
  let cpe = $state('');
  let apiError = $state('');
  let isProcessing = $state(false);

  let allValid = $derived(
    email.trim().length > 0 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()) &&
    password.length >= 8 &&
    password === confirmPassword
  );

  function clearErrors() { eme = ''; pwe = ''; cpe = ''; apiError = ''; }

  function validate(): boolean {
    clearErrors(); let v = true;
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) { eme = 'Valid email required'; v = false; }
    if (password.length < 8) { pwe = 'Min 8 characters'; v = false; }
    if (password !== confirmPassword) { cpe = 'Passwords must match'; v = false; }
    return v;
  }

  async function handleSubmit(e: Event) {
    e.preventDefault();
    if (!validate()) return;
    isProcessing = true;
    apiError = '';
    try {
      const r = await fetch('/api/partner/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), password, name: email.trim().split('@')[0] })
      });
      const d = await r.json();
      if (!r.ok) {
        apiError = d.error || 'Something went wrong';
        return;
      }
      if (d.redirect) goto(d.redirect);
    } catch {
      apiError = 'Network error. Please try again.';
    } finally {
      isProcessing = false;
    }
  }
</script>

<PageHero eyebrow="BEEE PARTNER PROGRAMME" title="Share the Experience.<br>Earn Rewards." />

<section class="rv-section rv-section--flush">
  <div class="rv-wrap">
    <p class="rv-body-lg partner-intro" use:revealFade>
      Help families discover the BEEE TEAMUP™ (Technology, Enterprise, Art, Mentorship, Upskill) programme and chess championship.
      {#if dev}
        In test mode you receive a ₦{payout_naira} payout for every referral , players pay the ₦{fee_naira} test fee.
      {:else}
        You earn ₦{commission_naira} per registration you refer.
      {/if}
    </p>
  </div>
</section>

<section id="partner-signup" class="rv-section">
  <div class="rv-wrap rv-grid partner-grid">
    <div class="partner-steps-col">
      <div class="partner-steps" use:revealFade>
        <div class="rv-row partner-step">
          <span class="rv-micro partner-step-num">01</span>
          <div>
            <p class="rv-title">Share Your Link</p>
            <p class="rv-body">Get your unique partner code after signing up. Share it with parents, schools, and community.</p>
          </div>
        </div>
        <div class="rv-row partner-step">
          <span class="rv-micro partner-step-num">02</span>
          <div>
            <p class="rv-title">They Register</p>
            <p class="rv-body">{#if dev}When someone registers using your code, they pay the ₦{fee_naira} test fee.{:else}When someone registers using your code, they get a 10% discount automatically applied.{/if}</p>
          </div>
        </div>
        <div class="rv-row partner-step">
          <span class="rv-micro partner-step-num">03</span>
          <div>
            <p class="rv-title">You Get Paid</p>
            <p class="rv-body">{#if dev}After payment is confirmed, ₦{payout_naira} is sent directly to your bank account.{:else}After payment is confirmed, ₦{commission_naira} is sent directly to your bank account.{/if}</p>
          </div>
        </div>
      </div>
    </div>

    <div class="partner-form-col">
      <div class="partner-card">
        <p class="rv-title">Become a Partner</p>
        <p class="rv-body partner-form-sub">Set up your account in under a minute.</p>
        <form novalidate onsubmit={handleSubmit}>
          <div class="partner-fields">
            <TextInput id="af-email" label="Email" type="email" bind:value={email} required error={eme}
              oninput={() => eme = ''} />
            <TextInput id="af-pw" label="Password" type="password" bind:value={password} required error={pwe}
              oninput={() => pwe = ''} placeholder="Min 8 characters" showToggle />
            <TextInput id="af-cpw" label="Confirm Password" type="password" bind:value={confirmPassword} required error={cpe}
              oninput={() => cpe = ''} showToggle />
          </div>
          {#if apiError}
            <div class="rv-error-text partner-error" role="alert">{apiError}</div>
          {/if}
          <button type="submit" class="rv-btn rv-btn--beam felt partner-submit" disabled={!allValid || isProcessing}>
            {#if isProcessing}
              <span class="spinner" aria-hidden="true"></span> Creating account...
            {:else}
              Become a Partner
            {/if}
          </button>
        </form>
        <div class="partner-divider"><span>or</span></div>
        <a href="/login/google?next=/dashboard/partner" class="rv-btn rv-btn--ghost felt partner-google">
          Continue with Google
        </a>
        <p class="rv-micro partner-signin">
          Already a partner? <a href="/login/google?next=/dashboard/partner" class="rv-link">Sign in</a>
        </p>
      </div>
    </div>
  </div>
</section>

<section class="rv-field-night rv-section partner-cta">
  <div class="rv-wrap partner-cta-inner">
    <a href="#partner-signup" class="rv-btn rv-btn--beam rv-btn--big felt">Become a partner</a>
    <p class="rv-micro partner-cta-sub">Payouts go to the bank account you choose.</p>
  </div>
</section>

<style>
  .partner-intro {
    max-width: 60ch;
  }

  .partner-grid {
    align-items: start;
  }

  .partner-steps-col {
    grid-column: 1 / -1;
    margin-bottom: var(--space-6);
  }

  .partner-steps { display: flex; flex-direction: column; }
  .partner-step { grid-template-columns: 48px 1fr; }
  .partner-step-num { color: var(--beam); }

  .partner-form-col {
    grid-column: 1 / -1;
  }

  .partner-card {
    background: var(--cloud-dim);
    border-radius: var(--radius-card);
    padding: var(--space-5);
    max-width: 480px;
  }

  .partner-form-sub {
    margin-top: 4px;
    margin-bottom: var(--space-4);
    color: var(--muted);
  }

  .partner-fields {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .partner-error {
    margin-top: var(--space-2);
  }

  .partner-submit {
    width: 100%;
    margin-top: var(--space-3);
  }

  .spinner {
    display: inline-block;
    width: 14px;
    height: 14px;
    border: 2px solid currentColor;
    border-right-color: transparent;
    border-radius: 50%;
    animation: spin 0.6s linear infinite;
  }
  @keyframes spin { to { transform: rotate(360deg); } }

  .partner-divider {
    display: flex;
    align-items: center;
    gap: 16px;
    margin: var(--space-3) 0;
    color: var(--muted);
    font-size: 13px;
  }
  .partner-divider::before, .partner-divider::after {
    content: '';
    flex: 1;
    height: 1px;
    background: var(--hairline);
  }

  .partner-google {
    width: 100%;
  }

  .partner-signin {
    margin-top: var(--space-3);
    text-align: center;
    color: var(--muted);
  }

  .partner-cta-inner {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--space-2);
    text-align: center;
  }

  .partner-cta-sub {
    color: var(--dusk-body);
  }

  @media (--md-up) {
    .partner-steps-col { grid-column: 1 / span 7; margin-bottom: 0; }
    .partner-form-col { grid-column: 8 / span 5; }
  }
</style>
