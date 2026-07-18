<script lang="ts">
  import { browser, dev } from '$app/environment';
  import { goto } from '$app/navigation';
  import regBg from '$lib/assets/images/register-bg.png?enhanced';
  import ConfirmationModal from '../../components/ConfirmationModal.svelte';
  import PhoneInput from '$lib/components/PhoneInput.svelte';
  import TextInput from '$lib/components/TextInput.svelte';
  import { motionFadeUp } from '$lib/actions/motion';
  import Button from '$lib/components/Button.svelte';
  import { page } from '$app/stores';
  import { REG_AMOUNT, DEV_REG_FEE_NAIRA, DISCOUNT_PCT } from '$lib/constants';
  import { gen_partner_code } from '$lib/partner_code';

  let gf = $state('');
  let gl = $state('');
  let em = $state('');
  let sc = $state('');
  let proprietor_phone = $state('+234');
  let ph = $state('+234');
  let pw = $state('');
  let ac = $state('');
  let gfe = $state('');

  const dummy_ac = gen_partner_code();
  const ac_examples = [`beeeproject.com/partner/${dummy_ac}`, dummy_ac];
  let ac_placeholder = $state(ac_examples[0]);
  let ac_fading = $state(false);
  let ac_field_el = $state<HTMLDivElement | null>(null);
  let ac_label_w = $state(0);
  function measure_ac_label() {
    const wrap = ac_field_el?.querySelector('.ti-wrap');
    const lbl = ac_field_el?.querySelector('label');
    if (!wrap || !lbl) return;
    const wrapRect = wrap.getBoundingClientRect();
    const lblRect = lbl.getBoundingClientRect();
    ac_label_w = lblRect.right - wrapRect.left + 12;
  }
  $effect(() => {
    measure_ac_label();
    if (typeof window !== 'undefined') window.addEventListener('resize', measure_ac_label);
    return () => window.removeEventListener('resize', measure_ac_label);
  });
  $effect(() => {
    if (ac.trim()) return;
    let i = 0;
    const t = setInterval(() => {
      ac_fading = true;
      setTimeout(() => {
        i = (i + 1) % ac_examples.length;
        ac_placeholder = ac_examples[i];
        ac_fading = false;
      }, 300);
    }, 3000);
    return () => clearInterval(t);
  });
  let gle = $state('');
  let eme = $state('');
  let sce = $state('');
  let proprietor_phone_error = $state('');
  let phe = $state('');
  let pwe = $state('');
  let ace = $state('');

  let showConfirmation = $state(false);
  let isProcessing = $state(false);
  let apiError = $state('');
  let registrationId = $state('');

  let acValid = $state<boolean | null>(null);
  let acLoading = $state(false);

  const baseAmount = dev ? DEV_REG_FEE_NAIRA : REG_AMOUNT;
  let AMOUNT = $state(baseAmount);

  const loggedInUser = $derived($page.data.user);

  // ponytail: when logged in, the reg is under the session parent — no email/pw entry needed.
  $effect(() => {
    if (loggedInUser?.email) {
      em = loggedInUser.email;
      pw = '';
    }
  });

  let allValid = $derived(
    gf.trim() && gl.trim() && sc.trim() &&
    proprietor_phone.trim() && proprietor_phone.trim() !== '+234' &&
    ph.trim() && ph.trim() !== '+234' &&
    (loggedInUser
      ? true // email + password come from the logged-in parent session
      : em.trim() && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(em.trim()) && pw.trim().length >= 8)
  );

  let valTimer: ReturnType<typeof setTimeout> | undefined;
  async function validatePartnerCode(code: string) {
    if (!code.trim()) {
      acValid = null;
      ace = '';
      AMOUNT = baseAmount;
      return;
    }
    acLoading = true;
    try {
      const r = await fetch('/api/validate-partner', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: code.trim() })
      });
      const d = await r.json();
      if (d.valid) {
        acValid = true;
        ace = '10% discount applied';
        AMOUNT = d.amount;
      } else {
        acValid = false;
        ace = 'Invalid partner code';
        AMOUNT = baseAmount;
      }
    } catch {
      acValid = null;
      ace = '';
      AMOUNT = baseAmount;
    } finally {
      acLoading = false;
    }
  }

  $effect(() => {
    if (browser) {
      const stored = localStorage.getItem('partner_c');
      if (stored && !ac) {
        ac = stored;
        validatePartnerCode(ac);
      }
    }
  });

  function handlePartnerInput(e: Event) {
    const input = e.target as HTMLInputElement;
    let val = input.value.trim();
    const match = val.match(/[?&]c=([^&\s]+)/);
    if (match) val = match[1];
    ac = val;
    clearTimeout(valTimer);
    if (!val) {
      acValid = null;
      ace = '';
      AMOUNT = baseAmount;
      return;
    }
    ace = 'Checking…';
    valTimer = setTimeout(() => validatePartnerCode(val), 400);
  }

  function clearErrors() {
    gfe = ''; gle = ''; eme = ''; sce = ''; proprietor_phone_error = ''; phe = ''; pwe = '';
  }

  function validateForm(): boolean {
    clearErrors();
    apiError = '';
    let v = true;
    if (!gf.trim()) { gfe = 'Required'; v = false; }
    if (!gl.trim()) { gle = 'Required'; v = false; }
    if (!loggedInUser) {
      if (!em.trim()) { eme = 'Required'; v = false; }
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(em.trim())) { eme = 'Invalid email'; v = false; }
      if (!pw || pw.length < 8) { pwe = 'Min 8 characters'; v = false; }
    }
    if (!sc.trim()) { sce = 'Required'; v = false; }
    if (!proprietor_phone.trim() || proprietor_phone.trim() === '+234') { proprietor_phone_error = 'Required'; v = false; }
    if (!ph.trim() || ph.trim() === '+234') { phe = 'Required'; v = false; }
    return v;
  }

  async function handleSubmit() {
    if (!validateForm()) return;
    apiError = '';
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
        body: JSON.stringify({ firstName: gf.trim(), lastName: gl.trim(), email: em.trim(), proprietorPhone: proprietor_phone.trim(), phone: ph.trim(), school: sc.trim(), password: pw, partnerCode: ac.trim() || undefined })
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
  <meta name="description" content="Register your child for the BEEE T.E.A.M.U.P. programme and Spectacular Chess Championship Abuja 2026." />
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
    {#if loggedInUser}
      <div class="container">
        <div class="reg-loggedin-note">
          Signed in as <strong>{loggedInUser.email ?? 'your account'}</strong> — you're registering another player.
        </div>
      </div>
    {/if}
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
          <PhoneInput id="proprietor_phone" label="Proprietor's phone number" value={proprietor_phone} placeholder="Proprietor's phone number" onChange={(v) => { proprietor_phone = v; proprietor_phone_error = ''; }} />
          <PhoneInput id="ph" label="Parent's phone number" value={ph} placeholder="Parent's phone number" onChange={(v) => { ph = v; phe = ''; }} />
          {#if !loggedInUser}
            <TextInput id="em" label="Parent's Email" type="email" bind:value={em} required error={eme} oninput={() => eme = ''} />
            <TextInput id="pw" label="Password" type="password" bind:value={pw} required error={pwe} oninput={() => pwe = ''} showToggle />
          {/if}
        </fieldset>

        <div class="reg-divider">Partner Code</div>

        <div class="reg-partner-wrap">
          <div class="reg-partner-field" bind:this={ac_field_el}>
            <TextInput
              id="ac"
              label="Partner code (optional)"
              placeholder=""
              bind:value={ac}
              error={ace}
              wrapperClass="!bg-white/10 !border-white/20"
              labelClass="!text-white/60"
              inputClass="!text-white placeholder:!text-white/30"
              oninput={handlePartnerInput}
            />
            {#if !ac.trim()}
              <span class="reg-partner-ph" class:fading={ac_fading} style="left: {ac_label_w}px">{ac_placeholder}</span>
            {/if}
          </div>
          <p class="reg-partner-help">Registering with a partner code gives a 10% discount.</p>
          {#if acLoading}
            <div class="reg-discount-callout">
              <span>Checking partner code…</span>
            </div>
          {:else if acValid && (baseAmount - AMOUNT) > 0}
            <div class="reg-discount-callout valid">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M8 1L10 5.5L14.5 6L11 9.5L12 14L8 11.5L4 14L5 9.5L1.5 6L6 5.5L8 1Z" fill="currentColor"/>
              </svg>
              <span>10% discount applied — ₦{(baseAmount - AMOUNT).toLocaleString()} off</span>
            </div>
          {:else if acValid === false}
            <div class="reg-discount-callout invalid">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M8 1L4 15L8 11.5L12 15L8 1Z" fill="currentColor"/>
              </svg>
              <span>Invalid partner code</span>
            </div>
          {/if}
        </div>

        {#if apiError}
          <div class="reg-error" role="alert">{apiError}</div>
        {/if}

        <Button class="reg-submit" disabled={!allValid}>
          Register
        </Button>
        <div class="reg-fine">
          <p>Participants must be between 10 and 14 years of age</p>
          <p>Online coaching begins July 28 2026</p>
        </div>
        <p class="reg-login-link">Already registered? <a href="/login">Log in</a></p>
      </form>

      <aside class="reg-summary" use:motionFadeUp>
        <div class="reg-summary-price">
          <span class="reg-amount">₦{baseAmount.toLocaleString()}</span>
          <span class="reg-per">per participant</span>
        </div>
        <p class="reg-summary-note">Sign up early to give your child a richer, more rewarding championship experience.</p>
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
    background: linear-gradient(180deg, rgba(10, 15, 26, 0.82) 0%, rgba(10, 15, 26, 0.62) 40%, rgba(10, 15, 26, 0.70) 100%);
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
    font-family: var(--font-hero);
    font-size: clamp(2.6rem, 4vw, 3.8rem);
    font-weight: 700;
    line-height: 1.06;
    letter-spacing: -0.03em;
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
  .reg-loggedin-note {
    margin: 0 0 24px;
    padding: 14px 18px;
    border-radius: 10px;
    background: rgba(93, 184, 166, 0.12);
    color: #6fe0c4;
    font-family: var(--font-registration);
    font-size: 14px;
    line-height: 1.45;
  }
  .reg-loggedin-note strong {
    color: #8ff0d8;
    font-weight: 600;
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
    color: rgba(250, 249, 245, 0.72);
  }
  .reg-divider::before,
  .reg-divider::after {
    content: '';
    flex: 1;
    height: 1px;
    background: rgba(250, 249, 245, 0.25);
  }
  .reg-partner-wrap {
    margin-top: -12px;
  }
  .reg-partner-help {
    margin: 6px 0 0;
    font-size: 13px;
    line-height: 1.4;
    color: rgba(255, 255, 255, 0.55);
  }
  .reg-partner-field {
    position: relative;
  }
  .reg-partner-ph {
    position: absolute;
    top: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    pointer-events: none;
    font-size: 12px;
    color: rgba(255, 255, 255, 0.3);
    transition: opacity 300ms ease;
  }
  .reg-partner-ph.fading {
    opacity: 0;
  }
  .reg-discount-callout {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-top: 8px;
    padding: 10px 14px;
    border-radius: 8px;
    background: rgba(93, 184, 114, 0.12);
    color: #7ddf8a;
    font-size: 13px;
    line-height: 1.4;
  }
  .reg-discount-callout svg {
    flex-shrink: 0;
    width: 16px;
    height: 16px;
  }
  .reg-discount-callout.valid svg {
    color: var(--success);
  }
  .reg-discount-callout.invalid {
    background: rgba(255, 55, 45, 0.12);
    color: #ff6b6b;
  }
  .reg-discount-callout.invalid svg {
    color: #ff6b6b;
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
    font-weight: 600;
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
  .reg-login-link {
    font-family: var(--font-registration);
    font-size: 13px;
    color: rgba(255, 255, 255, 0.6);
    margin: 4px 0 0;
  }
  .reg-login-link a {
    color: var(--primary);
    font-weight: 600;
    text-decoration: none;
  }
  .reg-login-link a:hover {
    text-decoration: underline;
  }

  :global(.phone-label) {
    color: white !important;
  }
  :global(.country-trigger) {
    color: #fff !important;
  }
  :global(.country-trigger .country-abbr) {
    color: #fff !important;
  }
  :global(.country-trigger .country-code-label) {
    color: rgba(255,255,255,0.7) !important;
  }
  :global(.country-trigger .chevron) {
    color: rgba(255,255,255,0.6) !important;
  }
  :global(.phone-input) {
    color: #fff !important;
  }
  :global(.phone-input::placeholder) {
    color: rgba(255,255,255,0.4) !important;
  }

  @media (--md-down) {
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
