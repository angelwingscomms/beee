<script lang="ts">
  import { goto, invalidateAll } from '$app/navigation';
  import { browser } from '$app/environment';
  import type { PageProps } from './$types';
  import type { Registration } from '$lib/types/registration';
  import { resolve_active_reg } from '$lib/active_reg';
  import { D_PAY_REQUIRED } from '$lib/constants';

  let { data }: PageProps = $props();

  let show_modal = $state(false);
  let is_upgrading = $state(false);
  let is_paying = $state(false);
  let pay_error = $state('');

  const is_partner = $derived(data.profile?.c?.includes('fab') ?? false);

  const all_regs = $derived(data.registrations ?? []);
  let active_id = $state<string>('');

  const active_reg = $derived<Registration | undefined>(
    all_regs.find((r) => r.i === active_id) ?? all_regs[0]
  );

  $effect(() => {
    if (!browser) return;
    active_id = resolve_active_reg(
      all_regs.map((r) => r.i ?? ''),
      localStorage.getItem('active_reg')
    );
  });

  async function switch_reg(e: Event) {
    const id = (e.target as HTMLSelectElement).value;
    active_id = id;
    try { localStorage.setItem('active_reg', id); } catch {}
    await invalidateAll();
  }

  const reg_label = (r: Registration) =>
    `${r.fn ?? ''} ${r.ln ?? ''}`.trim() + (r.sn ? ` · ${r.sn}` : '');

  async function become_partner() {
    is_upgrading = true;
    try {
      const r = await fetch('/api/become-partner', { method: 'POST' });
      if (r.ok) {
        show_modal = false;
        await goto('/dashboard/partner');
      }
    } finally {
      is_upgrading = false;
    }
  }

  async function unlock_full_access() {
    if (!active_reg?.i) return;
    is_paying = true;
    pay_error = '';
    let auth_url = '';
    try {
      const r = await fetch('/api/register-init-payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ registrationId: active_reg.i })
      });
      if (!r.ok) {
        const e = await r.json().catch(() => ({}));
        throw new Error(e.error || 'Payment initialization failed');
      }
      const d = await r.json();
      if (!d.access_code) throw new Error('Invalid response from payment gateway');
      auth_url = d.authorization_url;
      const PaystackPop = (await import('@paystack/inline-js')).default;
      const popup = new PaystackPop();
      const fb = setTimeout(() => { window.location.href = auth_url; }, 15000);
      popup.resumeTransaction(d.access_code, {
        onLoad: () => clearTimeout(fb),
        onSuccess: (tx) => { clearTimeout(fb); window.location.href = `/payment/callback?reference=${tx.reference}`; },
        onCancel: () => { clearTimeout(fb); is_paying = false; },
        onError: () => { clearTimeout(fb); window.location.href = auth_url; }
      });
    } catch (error) {
      if (auth_url) {
        window.location.href = auth_url;
      } else {
        pay_error = error instanceof Error ? error.message : 'Unknown error';
        is_paying = false;
      }
    }
  }
</script>

<div class="dash-shell">
  <div class="dash-card">
    <header class="dash-head">
      <div>
        <h1 class="dash-title">Welcome{data.user?.name ? `, ${data.user.name}` : ''}</h1>
        <p class="dash-sub">Your BEEE player dashboard</p>
      </div>
      {#if data.user?.picture}
        <img class="dash-avatar" src={data.user.picture} alt="" />
      {/if}
    </header>

    {#if data.profile}
      <div class="dash-profile">
        <span class="dash-chip">{data.user.email}</span>
        {#if data.profile.c?.includes('rpb')}<span class="dash-chip dash-chip--accent">Player</span>{/if}
        {#if is_partner}<span class="dash-chip dash-chip--accent">Partner</span>{/if}
      </div>
    {/if}

    {#if all_regs.length > 1}
      <div class="reg-switch">
        <label for="reg-select" class="reg-switch-label">Active registration</label>
        <select id="reg-select" class="reg-select" value={active_id} onchange={switch_reg}>
          {#each all_regs as r (r.i)}
            <option value={r.i}>{reg_label(r)}</option>
          {/each}
        </select>
      </div>
    {/if}

    {#if active_reg}
      <div class="reg-detail">
        <h2 class="reg-detail-name">{reg_label(active_reg) || 'Registration'}</h2>
        <dl class="reg-detail-grid">
          {#if active_reg.sn}<div><dt>School</dt><dd>{active_reg.sn}</dd></div>{/if}
          {#if data.user?.ph?.length}<div><dt>Phone</dt><dd>{data.user.ph.join(', ')}</dd></div>{/if}
          <div><dt>Status</dt><dd class="reg-detail-status">{active_reg.st === 'i' ? 'Full access' : 'Registered'}</dd></div>
          {#if active_reg.ref}<div><dt>Reference</dt><dd><code>{active_reg.ref}</code></dd></div>{/if}
        </dl>
        {#if active_reg.st === 'r'}
          <div class="unlock-box">
            <p class="unlock-text">Your player is registered. Full access to the complete championship experience unlocks with the one-time fee. From {D_PAY_REQUIRED}, continued access to e4 Chess Coach requires it.</p>
            <button class="dash-btn" onclick={unlock_full_access} disabled={is_paying}>{is_paying ? 'Opening payment…' : 'unlock full access'}</button>
            {#if pay_error}<p class="unlock-error" role="alert">{pay_error}</p>{/if}
          </div>
        {/if}
      </div>
    {/if}

    <div class="dash-actions">
      <a href="/dashboard/settings" class="dash-btn dash-btn--outline">Settings</a>
      <a href="/register" class="dash-btn">Register another player</a>
      {#if is_partner}
        <a href="/dashboard/partner" class="dash-btn dash-btn--outline">Partner dashboard →</a>
      {:else}
        <button class="dash-btn dash-btn--outline" onclick={() => (show_modal = true)}>Become a partner</button>
      {/if}
      <a href="https://e4.beeeproject.com" class="dash-btn dash-btn--outline" target="_blank" rel="noopener">e4™ Chess Coach →</a>
    </div>
  </div>
</div>

{#if show_modal}
  <div class="modal-backdrop" role="dialog" aria-modal="true" onclick={() => (show_modal = false)}>
    <div class="modal" onclick={(e) => e.stopPropagation()}>
      <h2 class="modal-title">Become a BEEE partner?</h2>
      <p class="modal-body">
        Share your partner link to earn rewards on every player you refer. Ready to join the
        partner programme?
      </p>
      <div class="modal-actions">
        <button class="dash-btn dash-btn--outline" onclick={() => (show_modal = false)}>Not now</button>
        <button class="dash-btn" disabled={is_upgrading} onclick={become_partner}>
          {is_upgrading ? 'Setting up…' : 'Yes, become a partner'}
        </button>
      </div>
    </div>
  </div>
{/if}

<style>
  .dash-shell {
    min-height: 100vh;
    padding: 120px 2rem 4rem;
    max-width: 720px;
    margin: 0 auto;
  }
  .dash-card {
    background: var(--surface);
    border: 1px solid var(--hairline);
    border-radius: 16px;
    padding: 2.5rem 2rem;
  }
  .dash-head {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 16px;
  }
  .dash-title {
    font-family: var(--font-display);
    font-size: 1.8rem;
    font-weight: 500;
    margin: 0 0 4px;
    color: var(--ink);
  }
  .dash-sub {
    font-family: var(--font-registration);
    font-size: 14px;
    color: var(--muted);
    margin: 0;
  }
  .dash-avatar {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    object-fit: cover;
    border: 1px solid var(--hairline);
  }
  .dash-profile {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin: 16px 0 8px;
  }
  .dash-chip {
    font-family: var(--font-registration);
    font-size: 12px;
    color: var(--muted);
    background: var(--surface-soft);
    border: 1px solid var(--hairline);
    border-radius: 20px;
    padding: 4px 12px;
  }
  .dash-chip--accent {
    color: var(--primary);
    background: rgba(242, 120, 48, 0.1);
    border-color: transparent;
    font-weight: 600;
  }
  .dash-actions {
    display: flex;
    gap: 10px;
    margin-top: 28px;
    flex-wrap: wrap;
  }
  .dash-btn {
    display: inline-flex;
    align-items: center;
    padding: 12px 20px;
    border-radius: 10px;
    font-family: var(--font-registration);
    font-size: 14px;
    font-weight: 600;
    text-decoration: none;
    background: var(--ink);
    color: white;
    border: 1px solid transparent;
    cursor: pointer;
    transition: opacity 160ms var(--ease-out);
  }
  .dash-btn:hover { opacity: 0.85; }
  .dash-btn--outline {
    background: transparent;
    border: 1px solid var(--hairline);
    color: var(--body-strong);
  }
  .dash-btn--outline:hover { background: var(--surface-soft); }
  .reg-switch {
    margin: 20px 0 4px;
    display: flex;
    flex-direction: column;
    gap: 6px;
  }
  .reg-switch-label {
    font-family: var(--font-registration);
    font-size: 12px;
    color: var(--muted);
  }
  .reg-select {
    appearance: none;
    width: 100%;
    min-height: 40px;
    padding: 8px 14px;
    border-radius: 10px;
    background: var(--surface-soft);
    color: var(--ink);
    border: 1px solid var(--hairline);
    font-family: var(--font-registration);
    font-size: 14px;
    cursor: pointer;
    outline: none;
  }
  .reg-detail {
    margin-top: 20px;
    padding: 18px 20px;
    border: 1px solid var(--hairline);
    border-radius: 12px;
    background: var(--surface-soft);
  }
  .reg-detail-name {
    font-family: var(--font-display);
    font-size: 1.3rem;
    font-weight: 500;
    color: var(--ink);
    margin: 0 0 12px;
  }
  .reg-detail-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
    gap: 14px 20px;
    margin: 0;
  }
  .reg-detail-grid dt {
    font-family: var(--font-registration);
    font-size: 11px;
    text-transform: uppercase;
    letter-spacing: 0.04em;
    color: var(--muted);
    margin-bottom: 2px;
  }
  .reg-detail-grid dd {
    margin: 0;
    font-family: var(--font-registration);
    font-size: 14px;
    color: var(--body-strong);
  }
  .reg-detail-grid code {
    font-family: var(--font-code);
    font-size: 12px;
    color: var(--muted);
  }
  .reg-detail-status {
    color: var(--success);
    font-weight: 600;
  }
  .unlock-box {
    margin-top: 18px;
    padding-top: 18px;
    border-top: 1px solid var(--hairline);
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }
  .unlock-text {
    font-family: var(--font-registration);
    font-size: 13px;
    line-height: 1.5;
    color: var(--muted);
    margin: 0;
  }
  .unlock-error {
    font-family: var(--font-registration);
    font-size: 13px;
    color: var(--error);
    margin: 0;
  }
  .modal-backdrop {
    position: fixed;
    inset: 0;
    background: rgba(20, 20, 19, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1.5rem;
    z-index: 100;
  }
  .modal {
    background: var(--surface);
    border: 1px solid var(--hairline);
    border-radius: 16px;
    padding: 2rem;
    max-width: 420px;
    width: 100%;
  }
  .modal-title {
    font-family: var(--font-display);
    font-size: 1.4rem;
    font-weight: 500;
    color: var(--ink);
    margin: 0 0 12px;
  }
  .modal-body {
    font-size: 14px;
    line-height: 1.6;
    color: var(--body);
    margin: 0 0 24px;
  }
  .modal-actions {
    display: flex;
    gap: 10px;
    justify-content: flex-end;
  }
</style>
