<script lang="ts">
  import regBg from '$lib/assets/images/register-bg.png?enhanced';
  import ConfirmationModal from '../../components/ConfirmationModal.svelte';
  import PhoneInput from '$lib/components/PhoneInput.svelte';
  import TextInput from '$lib/components/TextInput.svelte';
  import { motionFadeUp } from '$lib/actions/motion';
  import RegisterBtn from '$lib/components/RegisterBtn.svelte';

  let gf = $state('');
  let gl = $state('');
  let em = $state('');
  let sc = $state('');
  let ph = $state('+234');
  let gfe = $state('');
  let gle = $state('');
  let eme = $state('');
  let sce = $state('');
  let phe = $state('');

  let showConfirmation = $state(false);
  let isProcessing = $state(false);
  let apiError = $state('');
  let registrationId = $state('');

  const AMOUNT = 15000;

  let allValid = $derived(
    gf.trim() && gl.trim() && em.trim() &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(em.trim()) &&
    sc.trim() && ph.trim() && ph.trim() !== '+234'
  );

  function clearErrors() {
    gfe = ''; gle = ''; eme = ''; sce = ''; phe = '';
  }

  function validateForm(): boolean {
    clearErrors();
    apiError = '';
    let v = true;
    if (!gf.trim()) { gfe = 'Required'; v = false; }
    if (!gl.trim()) { gle = 'Required'; v = false; }
    if (!em.trim()) { eme = 'Required'; v = false; }
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(em.trim())) { eme = 'Invalid email'; v = false; }
    if (!sc.trim()) { sce = 'Required'; v = false; }
    if (!ph.trim() || ph.trim() === '+234') { phe = 'Required'; v = false; }
    return v;
  }

  function handleSubmit() {
    if (!validateForm()) return;
    showConfirmation = true;
  }

  async function confirmPayment() {
    isProcessing = true;
    apiError = '';
    let auth_url = '';
    try {
      const r = await fetch('/api/register-init-payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ firstName: gf.trim(), lastName: gl.trim(), email: em.trim(), phone: ph.trim(), school: sc.trim() })
      });
      if (!r.ok) {
        const e = await r.json().catch(() => ({}));
        throw new Error(e.error || 'Payment initialization failed');
      }
      const d = await r.json();
      if (!d.access_code) throw new Error('Invalid response from payment gateway');
      registrationId = d.registrationId;
      auth_url = d.authorization_url;

      const PaystackPop = (await import('@paystack/inline-js')).default;
      const popup = new PaystackPop();
      const fb = setTimeout(() => { window.location.href = auth_url; }, 15000);
      popup.resumeTransaction(d.access_code, {
        onLoad: () => clearTimeout(fb),
        onSuccess: (tx) => {
          clearTimeout(fb);
          window.location.href = `/payment/callback?reference=${tx.reference}`;
        },
        onCancel: () => {
          clearTimeout(fb);
          isProcessing = false;
        },
        onError: () => {
          clearTimeout(fb);
          window.location.href = auth_url;
        }
      });
    } catch (error) {
      if (auth_url) {
        window.location.href = auth_url;
      } else {
        apiError = error instanceof Error ? error.message : 'Unknown error';
        isProcessing = false;
      }
    }
  }

  function closeConfirmation() {
    showConfirmation = false;
  }
</script>

<svelte:head>
  <title>Register — BEEE Spectacular Chess Championship Abuja 2026</title>
  <meta name="description" content="Register your child for the BEEE TEAMUP programme and Spectacular Chess Championship Abuja 2026." />
</svelte:head>

<div class="overflow-x-hidden w-full max-w-full reg-page" style="background: url({regBg.img.src}) center center / cover no-repeat fixed">
  <div class="reg-bg-overlay"></div>
  <section class="reg-header" use:motionFadeUp>
    <div class="container">
      <p class="reg-event">BEEE Spectacular Chess Championship</p>
      <h1 class="reg-title">Abuja 2026</h1>
    </div>
  </section>

  <section class="reg-body">
    <div class="container reg-grid">
      <form
        class="reg-form"
        novalidate
        onsubmit={(e) => { e.preventDefault(); handleSubmit(); }}
      >
        <fieldset class="reg-fieldset">
          <div class="reg-row">
            <TextInput id="gf" label="First name" bind:value={gf} required error={gfe} oninput={() => gfe = ''} />
            <TextInput id="gl" label="Last name" bind:value={gl} required error={gle} oninput={() => gle = ''} />
          </div>
          <TextInput id="sc" label="School name" bind:value={sc} required error={sce} oninput={() => sce = ''} />
          <TextInput id="em" label="Email" type="email" bind:value={em} required error={eme} oninput={() => eme = ''} />
          <PhoneInput id="ph" value={ph} placeholder="Phone number" theme onChange={(v) => { ph = v; phe = ''; }} />
        </fieldset>

        {#if apiError}
          <div class="reg-error" role="alert">{apiError}</div>
        {/if}

        <RegisterBtn class="reg-submit" disabled={!allValid}>
          Register
        </RegisterBtn>
        <div class="reg-fine">
          <p>Qualification slots are limited and will be allocated on a first-completed-registration basis</p>
          <p>Participants must be between 10 and 14 years of age</p>
          <p>Sponsorship of participants is by parents or other interested sponsor</p>
        </div>
      </form>

      <aside class="reg-summary" use:motionFadeUp>
        <div class="reg-summary-price">
          <span class="reg-amount">₦15,000</span>
          <span class="reg-per">per participant</span>
        </div>
        <div class="reg-summary-deadline">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><rect x="0.5" y="0.5" width="15" height="15" rx="7.5" stroke="currentColor"/><path d="M8 4.5V8L10.5 10" stroke="currentColor" stroke-linecap="round"/></svg>
          Limited slots available
        </div>
        <p class="reg-summary-note">Registration may be paid for by a parent or sponsor</p>
        <div class="reg-age-callout">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true"><circle cx="10" cy="10" r="9.5" stroke="currentColor"/><path d="M10 6V10M10 13.5V14" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
          <div>
            <strong>Age requirement</strong>
            <p>Participants must be between 10 and 14 years old (born 2011–2015)</p>
          </div>
        </div>
      </aside>
    </div>
  </section>

</div><!-- .reg-page -->

{#if showConfirmation}
  <ConfirmationModal
    firstName={gf}
    lastName={gl}
    school={sc}
    email={em}
    phone={ph}
    {AMOUNT}
    onConfirm={confirmPayment}
    onCancel={closeConfirmation}
    {isProcessing}
  />
{/if}

<style>
  .reg-page {
    position: relative;
    min-height: 100vh;
  }
  .reg-bg-overlay {
    position: absolute;
    inset: 0;
    background: rgba(0,0,0,0.55);
    pointer-events: none;
  }
  .reg-page > :not(.reg-bg-overlay) {
    position: relative;
    z-index: 1;
  }
  .reg-header {
    padding: 140px 0 0;
    text-align: left;
  }
  .reg-event {
    font-family: var(--font-registration);
    font-size: clamp(13px, 1.2vw, 15px);
    font-weight: 600;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: var(--primary);
    margin: 0 0 8px;
  }
  .reg-title {
    font-family: var(--font-display);
    font-size: clamp(2.6rem, 4vw, 3.8rem);
    font-weight: 500;
    line-height: 1.06;
    letter-spacing: -0.02em;
    color: white;
    margin: 0 0 10px;
  }
  .reg-body {
    padding: 56px 0 80px;
  }
  .reg-grid {
    display: grid;
    grid-template-columns: 1fr 360px;
    gap: 48px;
    align-items: start;
  }

  .reg-form {
    display: flex;
    flex-direction: column;
    gap: 24px;
  }
  .reg-fieldset {
    border: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
  .reg-legend {
    font-family: var(--font-registration);
    font-size: 13px;
    font-weight: 600;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    color: var(--muted);
    padding: 0;
    margin-bottom: 4px;
  }
  .reg-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
  }
  .reg-divider {
    display: flex;
    align-items: center;
    gap: 16px;
    font-family: var(--font-registration);
    font-size: 13px;
    font-weight: 600;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    color: var(--muted);
  }
  .reg-divider::before,
  .reg-divider::after {
    content: '';
    flex: 1;
    height: 1px;
    background: var(--hairline);
  }
  .reg-error {
    padding: 12px 16px;
    border-radius: 8px;
    background: rgba(255, 55, 45, 0.08);
    color: var(--error);
    font-family: var(--font-registration);
    font-size: 13px;
    line-height: 1.4;
  }
  :global(.reg-submit) {
    width: 100%;
    padding: 16px 24px;
    font-family: var(--font-registration);
    font-size: 16px;
    font-weight: 600;
    letter-spacing: 0.01em;
  }

  .reg-summary {
    background: var(--surface-soft);
    border-radius: 16px;
    padding: 32px;
    display: flex;
    flex-direction: column;
    gap: 20px;
    position: sticky;
    top: 100px;
  }
  .reg-summary-price {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }
  .reg-amount {
    font-family: var(--font-display);
    font-size: clamp(2rem, 3vw, 2.6rem);
    font-weight: 500;
    color: var(--ink);
    line-height: 1.05;
  }
  .reg-per {
    font-family: var(--font-registration);
    font-size: 14px;
    color: var(--muted);
  }
  .reg-summary-deadline {
    display: flex;
    align-items: center;
    gap: 8px;
    font-family: var(--font-registration);
    font-size: 14px;
    font-weight: 500;
    color: var(--body-strong);
  }
  .reg-summary-note {
    font-family: var(--font-registration);
    font-size: 13px;
    line-height: 1.5;
    color: var(--muted);
    margin: 0;
  }
  .reg-age-callout {
    display: flex;
    gap: 12px;
    padding: 16px;
    border-radius: 10px;
    background: rgba(242, 120, 48, 0.08);
    color: var(--body-strong);
  }
  .reg-age-callout svg {
    flex-shrink: 0;
    margin-top: 2px;
    color: var(--primary);
  }
  .reg-age-callout strong {
    display: block;
    font-family: var(--font-registration);
    font-size: 14px;
    font-weight: 600;
    color: var(--ink);
    margin-bottom: 4px;
  }
  .reg-age-callout p {
    font-family: var(--font-registration);
    font-size: 13px;
    line-height: 1.5;
    color: var(--body);
    margin: 0;
  }

  .reg-fine {
    display: flex;
    flex-direction: column;
    gap: 4px;
    margin: 16px 0 0;
  }
  .reg-fine p {
    font-family: var(--font-registration);
    font-size: 13px;
    line-height: 1.5;
    color: white;
    margin: 0;
  }
  .reg-bul {
    margin: 0 6px;
    color: var(--hairline);
  }

  @media (max-width: 860px) {
    .reg-grid {
      grid-template-columns: 1fr;
      gap: 32px;
    }
    .reg-summary {
      order: -1;
      position: static;
    }
    .reg-body {
      padding: 40px 0 60px;
    }
  }
  @media (max-width: 480px) {
    .reg-row {
      grid-template-columns: 1fr;
    }
    .reg-header {
      padding: 120px 0 0;
    }
  }
</style>
