<script lang="ts">
  import { goto } from '$app/navigation';
  import { dev } from '$app/environment';
  import { motionFadeUp } from '$lib/actions/motion';
  import { MIN_TRANSFER_AMNT, DEV_REG_FEE, REG_AMOUNT, DISCOUNT_PCT, COMMISSION_PCT } from '$lib/constants';
  import TextInput from '$lib/components/TextInput.svelte';

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

<div class="partner-page">
  <section class="partner-hero" use:motionFadeUp>
    <div class="partner-grid">
      <div class="partner-info">
        <p class="partner-badge">BEEE PARTNER PROGRAMME</p>
        <h1 class="partner-title">Share the Experience.<br>Earn Rewards.</h1>
        <p class="partner-intro">
          Help families discover the BEEE TEAMUP™ (Technology, Enterprise, Art, Mentorship, Upskill) programme and chess championship.
          {#if dev}
            In test mode you receive a ₦{payout_naira} payout for every referral , players pay the ₦{fee_naira} test fee.
          {:else}
            You earn ₦{commission_naira} per registration you refer.
          {/if}
        </p>
        <div class="partner-steps">
          <div class="step">
            <span class="step-num">1</span>
            <div>
              <strong>Share Your Link</strong>
              <p>Get your unique partner code after signing up. Share it with parents, schools, and community.</p>
            </div>
          </div>
          <div class="step">
            <span class="step-num">2</span>
            <div>
              <strong>They Register</strong>
              <p>{#if dev}When someone registers using your code, they pay the ₦{fee_naira} test fee.{:else}When someone registers using your code, they get a 10% discount automatically applied.{/if}</p>
            </div>
          </div>
          <div class="step">
            <span class="step-num">3</span>
            <div>
              <strong>You Get Paid</strong>
              <p>{#if dev}After payment is confirmed, ₦{payout_naira} is sent directly to your bank account.{:else}After payment is confirmed, ₦{commission_naira} is sent directly to your bank account.{/if}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="partner-form-wrap">
        <div class="partner-card">
          <h2 class="partner-form-title">Become a Partner</h2>
          <p class="partner-form-sub">Set up your account in under a minute.</p>
          <form novalidate onsubmit={handleSubmit}>
            <div class="partner-fields">
              <TextInput id="af-email" label="Email" type="email" bind:value={email} required error={eme}
                oninput={() => eme = ''}
                wrapperClass="!bg-white !border-[var(--hairline)]"
                labelClass="!text-white"
                inputClass="!text-[var(--ink)] placeholder:!text-[var(--muted-soft)]" />
              <TextInput id="af-pw" label="Password" type="password" bind:value={password} required error={pwe}
                oninput={() => pwe = ''} placeholder="Min 8 characters" showToggle
                wrapperClass="!bg-white !border-[var(--hairline)]"
                labelClass="!text-white"
                inputClass="!text-[var(--ink)] placeholder:!text-[var(--muted-soft)]" />
              <TextInput id="af-cpw" label="Confirm Password" type="password" bind:value={confirmPassword} required error={cpe}
                oninput={() => cpe = ''} showToggle
                wrapperClass="!bg-white !border-[var(--hairline)]"
                labelClass="!text-white"
                inputClass="!text-[var(--ink)] placeholder:!text-[var(--muted-soft)]" />
            </div>
            {#if apiError}
              <div class="partner-error" role="alert">{apiError}</div>
            {/if}
            <button type="submit" class="button-primary partner-submit" disabled={!allValid || isProcessing}>
              {#if isProcessing}
                <span class="spinner" aria-hidden="true"></span> Creating account...
              {:else}
                Become a Partner
              {/if}
            </button>
          </form>
          <div class="partner-divider"><span>or</span></div>
          <a href="/login/google?next=/dashboard/partner" class="button-secondary partner-google">
            Continue with Google
          </a>
          <p class="partner-signin">
            Already a partner? <a href="/login/google?next=/dashboard/partner">Sign in</a>
          </p>
        </div>
      </div>
    </div>
  </section>
</div>

<style>
  .partner-page {
    background: var(--canvas);
    min-height: 100vh;
    overflow-x: hidden;
  }
  .partner-hero {
    padding: 140px 0 80px;
  }
  .partner-grid {
    display: grid;
    grid-template-columns: 1fr 420px;
    gap: 64px;
    align-items: start;
    width: min(1200px, calc(100% - 48px));
    margin: 0 auto;
  }
  .partner-info {
    min-width: 0;
  }
  .partner-form-wrap {
    min-width: 0;
  }
  .partner-badge {
    font-size: 13px;
    font-weight: 600;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: var(--primary);
    margin: 0 0 16px;
  }
  .partner-title {
    font-family: var(--font-hero);
    font-size: clamp(2.2rem, 3.5vw, 3.2rem);
    font-weight: 700;
    line-height: 1.08;
    letter-spacing: -0.03em;
    color: var(--ink);
    margin: 0 0 20px;
  }
  .partner-intro {
    font-size: 16px;
    line-height: 1.6;
    color: var(--body);
    margin: 0 0 40px;
    max-width: 480px;
  }
  .partner-steps {
    display: flex;
    flex-direction: column;
    gap: 24px;
  }
  .step {
    display: flex;
    gap: 16px;
    align-items: flex-start;
  }
  .step-num {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--primary);
    color: #fff;
    font-size: 14px;
    font-weight: 600;
  }
  .step strong {
    display: block;
    font-size: 15px;
    color: var(--ink);
    margin-bottom: 4px;
  }
  .step p {
    font-size: 14px;
    line-height: 1.5;
    color: var(--muted);
    margin: 0;
  }
  .partner-card {
    background: var(--surface-soft);
    border-radius: 16px;
    padding: 36px;
    position: sticky;
    top: 100px;
    max-width: 100%;
  }
  .partner-form-title {
    font-family: var(--font-hero);
    font-size: 1.6rem;
    font-weight: 700;
    color: var(--ink);
    margin: 0 0 4px;
  }
  .partner-form-sub {
    font-size: 14px;
    color: var(--muted);
    margin: 0 0 24px;
  }
  .partner-fields {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  .partner-error {
    margin: 16px 0 0;
    padding: 12px 16px;
    border-radius: 8px;
    background: rgba(255, 55, 45, 0.08);
    color: var(--error);
    font-size: 13px;
    line-height: 1.4;
  }
  .partner-submit {
    width: 100%;
    margin-top: 20px;
    padding: 14px 24px;
    font-size: 15px;
  }
  .partner-divider {
    display: flex;
    align-items: center;
    gap: 16px;
    margin: 20px 0;
    font-size: 13px;
    color: var(--muted);
  }
  .partner-divider::before,
  .partner-divider::after {
    content: '';
    flex: 1;
    height: 1px;
    background: var(--hairline);
  }
  .partner-google {
    width: 100%;
    justify-content: center;
    text-decoration: none;
  }
  .partner-signin {
    margin: 20px 0 0;
    text-align: center;
    font-size: 13px;
    color: var(--muted);
  }
  .partner-signin a {
    color: var(--primary);
    text-decoration: underline;
  }
  @media (max-width: 860px) {
    .partner-grid {
      grid-template-columns: 1fr;
      gap: 40px;
    }
    .partner-card {
      position: static;
    }
    .partner-hero {
      padding: 120px 0 60px;
    }
  }
</style>
