<script lang="ts">
  import { browser, dev } from '$app/environment';
  import { goto, invalidateAll } from '$app/navigation';
  import ConfirmationModal from '../../components/ConfirmationModal.svelte';
  import PhoneInput from '$lib/components/PhoneInput.svelte';
  import TextInput from '$lib/components/TextInput.svelte';
  import { motionFadeUp } from '$lib/actions/motion';
  import { page } from '$app/stores';
  import { REG_AMOUNT, DEV_REG_FEE_NAIRA, DISCOUNT_PCT } from '$lib/constants';
  import { gen_partner_code } from '$lib/partner_code';

  let gf = $state('');
  let gl = $state('');
  let em = $state('');
  let sc = $state('');
  let ph = $state('+234');
  let pw = $state('');
  let ac = $state('');
  let googleRedirecting = $state(false);
  let useDifferentEmail = $state(false);
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
  let phe = $state('');
  let ph_valid = $state(false);
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

  // When logged in the parent-phone field is hidden, so use the phone we already
  // have on file from the session (stored without '+') instead of the empty placeholder.
  let parentPhone = $derived(loggedInUser?.ph?.[0] ? '+' + loggedInUser.ph[0] : ph);
  // Show the editable parent-phone field only when a valid phone is already on
  // the account; otherwise it stays hidden and resolves at confirmation time.
  const hasValidAccountPhone = $derived(!!loggedInUser?.ph?.[0]?.match(/^\d{7,15}$/));

  // ponytail: when logged in, the reg is under the session parent , no email/pw entry needed.
  $effect(() => {
    if (loggedInUser?.email) {
      em = loggedInUser.email;
      pw = '';
      if (loggedInUser.ph?.[0]) ph = '+' + loggedInUser.ph[0];
    }
  });

  $effect(() => {
    if (browser) {
      const saved = sessionStorage.getItem('reg_form_data');
      if (saved) {
        try {
          const data = JSON.parse(saved);
          gf = data.gf || '';
          gl = data.gl || '';
          sc = data.sc || '';
          ph = (data.user?.ph?.[0] ? '+' + data.user.ph[0] : data.ph) || '+234';
          ac = data.ac || '';
        } catch {}
        sessionStorage.removeItem('reg_form_data');
      }
    }
  });

  let allValid = $derived(
    gf.trim() && gl.trim() && sc.trim() &&
    (loggedInUser || ph_valid) &&
    (loggedInUser && !useDifferentEmail
      ? true
      : em.trim() && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(em.trim()) && (loggedInUser || pw.trim().length >= 8))
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
        // The green discount callout already shows the applied discount , no
        // need for a duplicate helper line here (and error styling would turn
        // the input border red on success).
        ace = '';
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
      // Prefill from the ?c= query param (e.g. /register?c=CODE or the
      // /i/CODE redirect) directly, falling back to a previously stored code.
      const fromUrl = $page.url.searchParams.get('c');
      const stored = localStorage.getItem('partner_c');
      const code = (fromUrl || stored || '').trim();
      if (code && !ac) {
        ac = code;
        validatePartnerCode(ac);
      }
    }
  });

  function handlePartnerInput(e: Event) {
    const input = e.target as HTMLInputElement;
    let val = input.value.trim();
    const match = val.match(/(?:[?&]c=|[/]i[/])([^&\/?#\s]+)/);
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
    gfe = ''; gle = ''; eme = ''; sce = ''; phe = ''; pwe = '';
  }

  function validateForm(): boolean {
    clearErrors();
    apiError = '';
    let v = true;
    if (!gf.trim()) { gfe = 'Required'; v = false; }
    if (!gl.trim()) { gle = 'Required'; v = false; }
    if (!loggedInUser || useDifferentEmail) {
      if (!em.trim()) { eme = 'Required'; v = false; }
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(em.trim())) { eme = 'Invalid email'; v = false; }
    }
    if (!loggedInUser) {
      if (!pw || pw.length < 8) { pwe = 'Min 8 characters'; v = false; }
    }
    if (!sc.trim()) { sce = 'Required'; v = false; }
    if (!loggedInUser && (!ph.trim() || ph.trim() === '+234')) { phe = 'Required'; v = false; }
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
    // A logged-in parent has no editable phone field; the '+' dial code alone
    // is a placeholder, not a real number , send it empty so the server leaves
    // the phone to be resolved at confirmation time (not a bogus '+234').
    const phoneToSend = (parentPhone.trim() === '+234' || parentPhone.trim() === '') ? '' : parentPhone.trim();
    const payload = { firstName: gf.trim(), lastName: gl.trim(), email: em.trim(), phone: phoneToSend, school: sc.trim(), password: pw, partnerCode: ac.trim() || undefined };
    // ponytail: verbose diagnostics so a 400 "Invalid phone" is debuggable from the browser.
    console.log('[register] confirmPayment payload:', payload);
    console.log('[register] loggedInUser:', loggedInUser);
    console.log('[register] loggedInUser.ph:', loggedInUser?.ph);
    console.log('[register] resolved parentPhone:', parentPhone, '| ph field:', ph, '| ph_valid:', ph_valid);
    try {
      const r = await fetch('/api/register-init-payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (!r.ok) {
        const e = await r.json().catch(() => ({}));
        console.warn('[register] register-init-payment rejected:', r.status, e);
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

  function continueWithGoogle() {
    googleRedirecting = true;
    sessionStorage.setItem('reg_form_data', JSON.stringify({
      gf, gl, sc, ph, ac
    }));
    window.location.href = '/login/google?next=/register';
  }

  async function logoutGoogle() {
    await fetch('/api/auth/logout', { method: 'POST' });
    await invalidateAll();
    useDifferentEmail = false;
    em = '';
    pw = '';
  }

  function closeConfirmation() {
    showConfirmation = false;
  }
</script>

<div class="overflow-x-hidden w-full max-w-full reg-page rv-field-cloud">
  <section class="reg-header rv-section rv-section--flush" use:motionFadeUp>
    <div class="rv-wrap">
      <p class="rv-micro reg-event">REGISTRATION · ABUJA 2026</p>
      <h1 class="rv-d2 reg-title">Take your seat.</h1>
      <p class="rv-body-lg reg-sub">Three minutes, one form, and every platform unlocks.</p>
    </div>
  </section>

  <section class="reg-body">
    {#if loggedInUser}
      <div class="rv-wrap">
        <div class="reg-loggedin-note">
          Signed in as <strong>{loggedInUser.email ?? 'your account'}</strong> , you're registering another player.
          <button type="button" class="reg-not-you" onclick={logoutGoogle}>Not you?</button>
        </div>
        <div class="reg-different-email">
          <button type="button" class="reg-different-email-btn" onclick={() => useDifferentEmail = !useDifferentEmail}>
            {useDifferentEmail ? 'Use Google email instead' : 'Use a different email'}
          </button>
        </div>
      </div>
    {/if}
    <div class="rv-wrap reg-grid">
      <form
        class="reg-form"
        novalidate
        onsubmit={(e) => { e.preventDefault(); handleSubmit(); }}
      >
        <p class="reg-login-link">Already registered? <a href="/login">Log in</a></p>
        <fieldset class="reg-fieldset">
          <div class="reg-row">
            <TextInput id="gf" label="First name" bind:value={gf} required error={gfe} oninput={() => gfe = ''} />
            <TextInput id="gl" label="Last name" bind:value={gl} required error={gle} oninput={() => gle = ''} />
          </div>
          <TextInput id="sc" label="School name" bind:value={sc} required error={sce} oninput={() => sce = ''} />
          {#if !loggedInUser || hasValidAccountPhone}
            <PhoneInput id="ph" label="Parent's phone number" value={ph} placeholder="Parent's phone number" bind:valid={ph_valid} onChange={(v) => { ph = v; phe = ''; }} />
          {/if}
          {#if !loggedInUser || useDifferentEmail}
            <TextInput id="em" label="Parent's email" type="email" bind:value={em} required error={eme} oninput={() => eme = ''} />
          {/if}
          {#if !loggedInUser}
            <div class="reg-google-divider"><span>or</span></div>
            <button type="button" class="reg-google-btn" onclick={continueWithGoogle} disabled={googleRedirecting}>
              <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
              {googleRedirecting ? 'Opening Google…' : 'Continue with Google'}
            </button>
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
              oninput={handlePartnerInput}
            />
            {#if !ac.trim()}
              <span class="reg-partner-ph" class:fading={ac_fading} style="left: {ac_label_w}px">{ac_placeholder}</span>
            {/if}
          </div>
          <p class="reg-partner-help">Register through a Partner Registration Link and enjoy a 10% discount.</p>
          {#if acLoading}
            <div class="reg-discount-callout">
              <span>Checking partner code…</span>
            </div>
          {:else if acValid && (baseAmount - AMOUNT) > 0}
            <div class="rv-callout-ok reg-discount-callout valid">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M8 1L10 5.5L14.5 6L11 9.5L12 14L8 11.5L4 14L5 9.5L1.5 6L6 5.5L8 1Z" fill="currentColor"/>
              </svg>
              <span>10% discount applied , ₦{(baseAmount - AMOUNT).toLocaleString()} off</span>
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
          <div class="rv-error-text reg-error" role="alert">{apiError}</div>
        {/if}

        <button type="submit" class="rv-btn rv-btn--beam rv-btn--big felt reg-submit" disabled={!allValid}>
          Register &amp; continue to payment
        </button>
        <div class="reg-fine">
          <p class="rv-micro">Online coaching begins 1 August 2026, players get access immediately on registration.</p>
        </div>
      </form>

      <aside class="reg-summary" use:motionFadeUp>
        <p class="rv-micro reg-summary-eyebrow">REGISTRATION · ABUJA 2026</p>
        <div class="reg-summary-price">
          <span class="rv-title rv-num reg-amount">₦{baseAmount.toLocaleString()}</span>
          <span class="rv-micro reg-per">per participant</span>
        </div>
        <div class="reg-summary-note-wrap">
          <p class="rv-body reg-summary-note">Participants may join the championship journey at any time before the online training phase concludes on 29 August 2026.</p>
          <p class="rv-body reg-summary-note">However, early registration is encouraged to give your child a richer and more rewarding learning experience and the opportunity to benefit from the complete coaching and training programme.</p>
        </div>
        <div class="reg-age-callout">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true"><circle cx="10" cy="10" r="9.5" stroke="currentColor"/><path d="M10 6V10M10 13.5V14" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
          <div>
            <strong class="rv-title">Age requirement</strong>
            <p class="rv-body">Participants must be between 10 and 14 years old.</p>
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
    phone={parentPhone}
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
  .reg-header {
    padding: calc(var(--section-pad) + 72px) 0 0;
    text-align: left;
  }
  .reg-event {
    color: var(--beam);
    margin: 0 0 8px;
  }
  .reg-title {
    margin: 0;
  }
  .reg-sub {
    color: var(--muted);
    margin-top: var(--space-3);
  }
  .reg-body {
    padding: var(--space-6) 0 var(--space-8);
  }
  .reg-grid {
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    gap: var(--gutter);
    align-items: start;
  }
  .reg-loggedin-note {
    margin: 0 0 24px;
    padding: 14px 18px;
    border-radius: 10px;
    background: color-mix(in srgb, var(--success) 12%, transparent);
    color: var(--body-strong);
    font-size: 14px;
    line-height: 1.45;
  }
  .reg-loggedin-note strong {
    font-weight: 600;
  }

  .reg-form {
    grid-column: span 12;
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
  .reg-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
  }
  .reg-divider {
    display: flex;
    align-items: center;
    gap: 16px;
    font-family: var(--font-mono);
    font-size: var(--fs-micro);
    font-weight: 500;
    letter-spacing: var(--ls-mono);
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
  .reg-partner-wrap {
    margin-top: -12px;
  }
  .reg-partner-help {
    margin: 6px 0 0;
    font-size: 13px;
    line-height: 1.4;
    color: var(--muted);
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
    color: var(--muted-soft);
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
    border: 1px solid color-mix(in srgb, var(--error) 45%, transparent);
    background: color-mix(in srgb, var(--error) 10%, transparent);
    color: var(--error);
    border-radius: 12px;
    padding: 12px 16px;
    font-size: 14px;
  }
  .reg-discount-callout.invalid svg {
    color: var(--error);
  }
  :global(.reg-submit) {
    width: 100%;
  }

  .reg-summary {
    grid-column: span 12;
    background: var(--cloud-dim);
    border-radius: var(--radius-card);
    padding: var(--space-4);
    display: flex;
    flex-direction: column;
    gap: 20px;
    position: sticky;
    top: 100px;
  }
  .reg-summary-eyebrow {
    color: var(--beam);
  }
  .reg-summary-price {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }
  .reg-amount {
    font-size: clamp(2rem, 3vw, 2.6rem);
  }
  .reg-per {
    color: var(--muted);
  }
  .reg-summary-note-wrap {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }
  .reg-summary-note {
    color: var(--muted);
    margin: 0;
  }
  .reg-age-callout {
    display: flex;
    gap: 12px;
    padding: 16px;
    border-radius: 10px;
    background: color-mix(in srgb, var(--beam) 8%, transparent);
    color: var(--body-strong);
  }
  .reg-age-callout svg {
    flex-shrink: 0;
    margin-top: 2px;
    color: var(--beam);
  }
  .reg-age-callout strong {
    display: block;
    margin-bottom: 4px;
  }
  .reg-age-callout p {
    margin: 0;
  }

  .reg-fine {
    display: flex;
    flex-direction: column;
    gap: 4px;
    margin: 16px 0 0;
  }
  .reg-fine p {
    color: var(--muted);
    margin: 0;
  }
  .reg-login-link {
    font-size: 15px;
    color: var(--muted);
    margin: 0 0 16px;
    line-height: 1.4;
  }
  .reg-login-link a {
    color: var(--beam);
    font-weight: 600;
    text-decoration: none;
  }
  .reg-login-link a:hover {
    text-decoration: underline;
  }

  .reg-google-divider {
    display: flex;
    align-items: center;
    gap: 12px;
    color: var(--muted);
    font-size: 13px;
    font-weight: 500;
  }
  .reg-google-divider::before,
  .reg-google-divider::after {
    content: '';
    flex: 1;
    height: 1px;
    background: var(--hairline);
  }
  .reg-google-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    width: 100%;
    padding: 12px 24px;
    border: 1px solid var(--hairline);
    border-radius: 12px;
    background: transparent;
    color: var(--ink);
    font-family: var(--font-sans);
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    transition: border-color var(--dur-micro) var(--ease-out);
  }
  .reg-google-btn:hover:not(:disabled) {
    border-color: var(--beam);
  }
  .reg-google-btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  .reg-not-you {
    background: none;
    border: none;
    color: var(--muted);
    font-size: 13px;
    text-decoration: underline;
    cursor: pointer;
    padding: 0;
    margin-left: 8px;
  }
  .reg-not-you:hover {
    color: var(--ink);
  }
  .reg-different-email {
    margin: -16px 0 24px;
  }
  .reg-different-email-btn {
    background: none;
    border: none;
    color: var(--beam);
    font-size: 13px;
    text-decoration: underline;
    cursor: pointer;
    padding: 0;
  }
  .reg-different-email-btn:hover {
    color: var(--beam-active);
  }

  @media (--md-up) {
    .reg-summary {
      grid-column: 1 / span 5;
    }
    .reg-form {
      grid-column: 6 / span 7;
    }
  }
  @media (max-width: 480px) {
    .reg-row {
      grid-template-columns: 1fr;
    }
  }
</style>
