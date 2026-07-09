<script lang="ts">
  import { goto } from '$app/navigation';
  import { motionFadeUp } from '$lib/actions/motion';
  import TextInput from '$lib/components/TextInput.svelte';

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
      const r = await fetch('/api/affiliate/signup', {
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

<svelte:head>
  <title>Affiliate Program — BEEE</title>
  <meta name="description" content="Join the BEEE Affiliate Program. Earn 10% commission on every registration you refer." />
</svelte:head>

<div class="affiliate-page">
  <section class="affiliate-hero" use:motionFadeUp>
    <div class="affiliate-grid">
      <div class="affiliate-info">
        <p class="affiliate-badge">Affiliate Program</p>
        <h1 class="affiliate-title">Share the Experience.<br>Earn Rewards.</h1>
        <p class="affiliate-intro">
          Help families discover the BEEE TEAMUP programme and chess championship.
          You earn 10% of every registration fee from players you refer.
        </p>
        <div class="affiliate-steps">
          <div class="step">
            <span class="step-num">1</span>
            <div>
              <strong>Share Your Link</strong>
              <p>Get your unique affiliate code after signing up. Share it with parents, schools, and community.</p>
            </div>
          </div>
          <div class="step">
            <span class="step-num">2</span>
            <div>
              <strong>They Register</strong>
              <p>When someone registers using your code, they get a 10% discount automatically applied.</p>
            </div>
          </div>
          <div class="step">
            <span class="step-num">3</span>
            <div>
              <strong>You Get Paid</strong>
              <p>After payment is confirmed, 10% of the registration fee is sent directly to your bank account.</p>
            </div>
          </div>
        </div>
      </div>
      <div class="affiliate-form-wrap">
        <div class="affiliate-card">
          <h2 class="affiliate-form-title">Become an Affiliate</h2>
          <p class="affiliate-form-sub">Set up your account in under a minute.</p>
          <form novalidate onsubmit={handleSubmit}>
            <div class="affiliate-fields">
              <TextInput id="af-email" label="Email" type="email" bind:value={email} required error={eme}
                oninput={() => eme = ''}
                wrapperClass="!bg-white !border-[var(--hairline)]"
                labelClass="!text-muted"
                inputClass="!text-ink placeholder:!text-muted-soft" />
              <TextInput id="af-pw" label="Password" type="password" bind:value={password} required error={pwe}
                oninput={() => pwe = ''} placeholder="Min 8 characters" showToggle
                wrapperClass="!bg-white !border-[var(--hairline)]"
                labelClass="!text-muted"
                inputClass="!text-ink placeholder:!text-muted-soft" />
              <TextInput id="af-cpw" label="Confirm Password" type="password" bind:value={confirmPassword} required error={cpe}
                oninput={() => cpe = ''} showToggle
                wrapperClass="!bg-white !border-[var(--hairline)]"
                labelClass="!text-muted"
                inputClass="!text-ink placeholder:!text-muted-soft" />
            </div>
            {#if apiError}
              <div class="affiliate-error" role="alert">{apiError}</div>
            {/if}
            <button type="submit" class="button-primary affiliate-submit" disabled={!allValid || isProcessing}>
              {#if isProcessing}
                <span class="spinner" aria-hidden="true"></span> Creating account...
              {:else}
                Become an Affiliate
              {/if}
            </button>
          </form>
          <div class="affiliate-divider"><span>or</span></div>
          <a href="/login/google?next=/affiliate/settings" class="button-secondary affiliate-google">
            Continue with Google
          </a>
          <p class="affiliate-signin">
            Already an affiliate? <a href="/login/google?next=/affiliate/settings">Sign in</a>
          </p>
        </div>
      </div>
    </div>
  </section>
</div>

<style>
  .affiliate-page {
    background: var(--canvas);
    min-height: 100vh;
  }
  .affiliate-hero {
    padding: 140px 0 80px;
  }
  .affiliate-grid {
    display: grid;
    grid-template-columns: 1fr 420px;
    gap: 64px;
    align-items: start;
    width: min(1200px, calc(100% - 48px));
    margin: 0 auto;
  }
  .affiliate-info {}
  .affiliate-badge {
    font-size: 13px;
    font-weight: 600;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: var(--primary);
    margin: 0 0 16px;
  }
  .affiliate-title {
    font-family: var(--font-display);
    font-size: clamp(2.2rem, 3.5vw, 3.2rem);
    font-weight: 500;
    line-height: 1.08;
    letter-spacing: -0.02em;
    color: var(--ink);
    margin: 0 0 20px;
  }
  .affiliate-intro {
    font-size: 16px;
    line-height: 1.6;
    color: var(--body);
    margin: 0 0 40px;
    max-width: 480px;
  }
  .affiliate-steps {
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
  .affiliate-card {
    background: var(--surface-soft);
    border-radius: 16px;
    padding: 36px;
    position: sticky;
    top: 100px;
  }
  .affiliate-form-title {
    font-family: var(--font-display);
    font-size: 1.6rem;
    font-weight: 500;
    color: var(--ink);
    margin: 0 0 4px;
  }
  .affiliate-form-sub {
    font-size: 14px;
    color: var(--muted);
    margin: 0 0 24px;
  }
  .affiliate-fields {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  .affiliate-error {
    margin: 16px 0 0;
    padding: 12px 16px;
    border-radius: 8px;
    background: rgba(255, 55, 45, 0.08);
    color: var(--error);
    font-size: 13px;
    line-height: 1.4;
  }
  .affiliate-submit {
    width: 100%;
    margin-top: 20px;
    padding: 14px 24px;
    font-size: 15px;
  }
  .affiliate-divider {
    display: flex;
    align-items: center;
    gap: 16px;
    margin: 20px 0;
    font-size: 13px;
    color: var(--muted);
  }
  .affiliate-divider::before,
  .affiliate-divider::after {
    content: '';
    flex: 1;
    height: 1px;
    background: var(--hairline);
  }
  .affiliate-google {
    width: 100%;
    justify-content: center;
    text-decoration: none;
  }
  .affiliate-signin {
    margin: 20px 0 0;
    text-align: center;
    font-size: 13px;
    color: var(--muted);
  }
  .affiliate-signin a {
    color: var(--primary);
    text-decoration: underline;
  }
  @media (max-width: 860px) {
    .affiliate-grid {
      grid-template-columns: 1fr;
      gap: 40px;
    }
    .affiliate-card {
      position: static;
    }
    .affiliate-hero {
      padding: 120px 0 60px;
    }
  }
</style>
