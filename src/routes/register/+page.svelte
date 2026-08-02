<script lang="ts">
  import { browser, dev } from '$app/environment';
  import { goto, invalidateAll } from '$app/navigation';
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

<div class="overflow-x-hidden w-full max-w-full reg-page" style="background: url({regBg.img.src}) center center / cover no-repeat fixed">
  <div class="reg-bg-overlay"></div>
  <section class="reg-header" use:motionFadeUp>
    <div class="container">
      <p class="reg-event">BEEE Spectacular Chess Championship</p>
      <h1 class="reg-title">Register for Abuja 2026</h1>
    </div>
  </section>

  <section class="reg-body">
    {#if loggedInUser}
      <div class="container">
        <div class="reg-loggedin-note">
          Signed in as <strong>{loggedInUser.email ?? 'your account'}</strong>, you're registering another player.
          <button type="button" class="reg-not-you" onclick={logoutGoogle}>Not you?</button>
        </div>
        <div class="reg-different-email">
          <button type="button" class="reg-different-email-btn" onclick={() => useDifferentEmail = !useDifferentEmail}>
            {useDifferentEmail ? 'Use Google email instead' : 'Use a different email'}
          </button>
        </div>
      </div>
    {/if}
    <div class="container reg-grid">
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
              wrapperClass="!bg-white/10 !border-white/20"
              labelClass="!text-white/60"
              inputClass="!text-white placeholder:!text-white/30"
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
            <div class="reg-discount-callout valid">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M8 1L10 5.5L14.5 6L11 9.5L12 14L8 11.5L4 14L5 9.5L1.5 6L6 5.5L8 1Z" fill="currentColor"/>
              </svg>
              <span>10% discount applied, ₦{(baseAmount - AMOUNT).toLocaleString()} off</span>
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
          <p>Online coaching begins August 1, 2026, players get access on registration.</p>
        </div>
      </form>

      <aside class="reg-summary" use:motionFadeUp>
        <div class="reg-summary-price">
          <span class="reg-amount">₦{baseAmount.toLocaleString()}</span>
          <span class="reg-per">per participant</span>
        </div>
        <div class="reg-summary-note-wrap">
          <p class="reg-summary-note">Portal access is free for everyone from August 1 to August 10; from August 11, continued participation requires the ₦15,000 registration fee. Participants may join the championship journey at any time before the online training phase concludes on September 10, 2026.</p>
           <p class="reg-summary-note">However, early registration is highly recommended to give your child an earlier start in their championship journey and a more rewarding learning experience.</p>
        </div>
        <div class="reg-age-callout">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true"><circle cx="10" cy="10" r="9.5" stroke="currentColor"/><path d="M10 6V10M10 13.5V14" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
          <div>
            <strong>Age requirement</strong>
            <p>Participants must be between 10 and 14 years old.</p>
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
    transition: opacity 300ms var(--ease-out);
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
  .reg-summary-note-wrap {
    display: flex;
    flex-direction: column;
    gap: 4px;
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
    font-size: 15px;
    color: rgba(255, 255, 255, 0.7);
    margin: 0 0 16px;
    line-height: 1.4;
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

  .reg-google-divider {
    display: flex;
    align-items: center;
    gap: 12px;
    color: rgba(255, 255, 255, 0.4);
    font-size: 13px;
    font-weight: 500;
  }
  .reg-google-divider::before,
  .reg-google-divider::after {
    content: '';
    flex: 1;
    height: 1px;
    background: rgba(255, 255, 255, 0.15);
  }
  .reg-google-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    width: 100%;
    padding: 12px 24px;
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 10px;
    background: rgba(255, 255, 255, 0.06);
    color: rgba(255, 255, 255, 0.85);
    font-family: var(--font-registration);
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    transition: background 160ms var(--ease-out);
  }
  .reg-google-btn:hover:not(:disabled) {
    background: rgba(255, 255, 255, 0.12);
  }
  .reg-google-btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  .reg-not-you {
    background: none;
    border: none;
    color: rgba(255, 255, 255, 0.6);
    font-family: var(--font-registration);
    font-size: 13px;
    text-decoration: underline;
    cursor: pointer;
    padding: 0;
    margin-left: 8px;
  }
  .reg-not-you:hover {
    color: #fff;
  }
  .reg-different-email {
    margin: -16px 0 24px;
  }
  .reg-different-email-btn {
    background: none;
    border: none;
    color: var(--primary);
    font-family: var(--font-registration);
    font-size: 13px;
    text-decoration: underline;
    cursor: pointer;
    padding: 0;
  }
  .reg-different-email-btn:hover {
    color: #8ff0d8;
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
