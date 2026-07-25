<script lang="ts">
  import BankSelect from '$lib/components/BankSelect.svelte';
  import type { PageData } from './$types';
  import { invalidateAll } from '$app/navigation';

  let { data }: { data: PageData } = $props();

  let ba = $state(data.ba || '');
  let bn = $state(data.bn || '');
  let bk = $state(data.bk || '');
  let bae = $state('');
  let bke = $state('');
  let saveMsg = $state('');
  let isSaving = $state(false);

  let copied = $state(false);

  // ── Custom partner code ──────────────────────────────────
  let customCode = $state('');
  let customCodeError = $state('');
  let customCodeMsg = $state('');
  let isSavingCode = $state(false);

  async function saveCustomCode(e: Event) {
    e.preventDefault();
    if (!customCode.trim()) {
      customCodeError = 'Enter a code first';
      return;
    }
    isSavingCode = true;
    customCodeError = '';
    customCodeMsg = '';
    try {
      const r = await fetch('/api/partner/set-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: customCode.trim() })
      });
      const d = await r.json().catch(() => ({}));
      if (r.ok) {
        customCodeMsg = `Saved! Your partner code is now ${d.code}`;
        customCode = '';
        await invalidateAll();
      } else {
        customCodeError = d.error || 'Could not save that code';
      }
    } catch {
      customCodeError = 'Network error , please try again';
    } finally {
      isSavingCode = false;
    }
  }

  async function copyCode() {
    if (!data.ac) return;
    try {
      await navigator.clipboard.writeText(`https://beeeproject.com/i/${data.ac}`);
      copied = true;
      setTimeout(() => { copied = false; }, 2000);
    } catch {
      const el = document.getElementById('partner-code-text');
      if (el) {
        const range = document.createRange();
        range.selectNodeContents(el);
        const sel = window.getSelection();
        sel?.removeAllRanges();
        sel?.addRange(range);
      }
    }
  }

  function onBankSelect(b: { n: string; c: string } | null) {
    bk = b?.c || '';
    bn = b?.n || '';
    bke = '';
    saveMsg = '';
  }

  function validateBank(): boolean {
    let v = true; bae = ''; bke = '';
    if (!ba || !/^\d{10}$/.test(ba)) { bae = 'Must be exactly 10 digits'; v = false; }
    if (!bk) { bke = 'Please select your bank'; v = false; }
    return v;
  }

  async function saveBank(e: Event) {
    e.preventDefault();
    if (!validateBank()) return;
    isSaving = true; saveMsg = '';
    try {
      const r = await fetch('/api/partner/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ba: ba.trim(), bn, bk })
      });
      if (r.ok) {
        saveMsg = 'saved';
      } else {
        const d = await r.json().catch(() => ({}));
        saveMsg = 'error:' + (d.error || 'Failed to save');
      }
    } catch {
      saveMsg = 'error:Network error';
    } finally {
      isSaving = false;
    }
  }
</script>

<div class="settings-page">
  <section class="container" style="padding: 140px 0 80px; max-width: 640px;">
    <h1 class="settings-title">Partner Dashboard</h1>

    <div class="settings-card">
      <h2 class="settings-card-title">Your Partner Code</h2>
      <div class="code-row">
        <span class="code-value" id="partner-code-text">{data.ac || ','}</span>
        <button class="button-secondary code-copy-btn" onclick={copyCode} disabled={!data.ac}>
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>
      <p class="code-label">Share this link to earn commissions:</p>
      <div class="code-url-row">
        <code class="code-url">https://beeeproject.com/i/{data.ac || '{code}'}</code>
        <button class="button-secondary code-copy-btn" onclick={copyCode} disabled={!data.ac}>
          {copied ? 'Copied!' : 'Copy Link'}
        </button>
      </div>
    </div>

    <div class="settings-card">
      <h2 class="settings-card-title">Set a Custom Partner Code</h2>
      <p class="settings-card-sub">Replace the random code above with one of your own. It must be unique and pass a quick check so it sounds right when shared.</p>
      <p class="warning-note">Warning: your old partner code will stop working. Anyone you've already shared your link with before will no longer be able to use it. Make sure you update your shared links afterward.</p>
      <form onsubmit={saveCustomCode}>
        <div class="field">
          <label for="customCode">Custom code</label>
          <input id="customCode" class="text-input" type="text" bind:value={customCode}
            placeholder="e.g. chesskids" autocapitalize="off" autocomplete="off" spellcheck={false}
            oninput={() => { customCodeError = ''; customCodeMsg = ''; }}
          />
          {#if customCodeError}<p class="field-msg field-error">{customCodeError}</p>{/if}
        </div>
        <div class="settings-save-row">
          <button type="submit" class="button-primary" disabled={isSavingCode}>
            {#if isSavingCode}
              <span class="spinner" aria-hidden="true"></span> Saving...
            {:else}
              Set Custom Code
            {/if}
          </button>
          {#if customCodeMsg}<span class="save-success">{customCodeMsg}</span>{/if}
        </div>
      </form>
    </div>

    <div class="settings-card">
      <h2 class="settings-card-title">Bank Account Details</h2>
      <p class="settings-card-sub">Where we'll send your referral earnings.</p>
      <form onsubmit={saveBank}>
        <div class="field">
          <label for="ba">Account Number</label>
          <input id="ba" class="text-input" type="text" inputmode="numeric"
            bind:value={ba} placeholder="0123456789" maxlength={10}
            oninput={() => { bae = ''; saveMsg = ''; }}
          />
          {#if bae}<p class="field-msg field-error">{bae}</p>{/if}
        </div>
        <div class="field">
          <label for="bn">Bank</label>
          <BankSelect value={bn} onChange={onBankSelect} />
          {#if bke}<p class="field-msg field-error">{bke}</p>{/if}
        </div>
        <div class="settings-save-row">
          <button type="submit" class="button-primary" disabled={isSaving || (!ba && !bk)}>
            {#if isSaving}
              <span class="spinner" aria-hidden="true"></span> Saving...
            {:else}
              Save Changes
            {/if}
          </button>
          {#if saveMsg === 'saved'}
            <span class="save-success">Saved ✓</span>
          {:else if saveMsg.startsWith('error')}
            <span class="save-error">{saveMsg.replace('error:', '')}</span>
          {/if}
        </div>
      </form>
    </div>

    <div class="settings-card">
      <h2 class="settings-card-title">Registered Users</h2>
      <p class="settings-card-sub">Players who registered using your partner code.</p>
      {#if data.registrations.length}
        <div class="reg-list">
          {#each data.registrations as reg}
            <div class="reg-row">
              <div class="reg-name">{reg.fn || ''} {reg.ln || ''}{#if reg.sn} <span class="reg-school">{reg.sn}</span>{/if}</div>
              <div class="reg-meta">
                <span class="reg-email">{reg.e}</span>
                <span class="reg-badge" class:reg-badge--paid={reg.st === 'i'}>
                  {reg.st === 'i' ? 'Paid' : 'Pending'}
                </span>
              </div>
            </div>
          {/each}
        </div>
      {:else}
        <p class="stats-placeholder">No users have registered with your code yet.</p>
      {/if}
    </div>
  </section>
</div>

<style>
  .settings-page {
    background: var(--canvas);
    min-height: 100vh;
  }
  .settings-title {
    font-family: var(--font-display);
    font-size: clamp(1.8rem, 3vw, 2.4rem);
    font-weight: 500;
    color: var(--ink);
    margin: 0 0 32px;
  }
  .settings-card {
    background: var(--surface-soft);
    border-radius: 16px;
    padding: 28px;
    margin-bottom: 20px;
  }
  .settings-card-title {
    font-size: 16px;
    font-weight: 600;
    color: var(--ink);
    margin: 0 0 4px;
  }
  .settings-card-sub {
    font-size: 14px;
    color: var(--muted);
    margin: 0 0 20px;
  }
  .code-row {
    display: flex;
    align-items: center;
    gap: 12px;
    margin: 16px 0 12px;
  }
  .code-value {
    font-size: 28px;
    font-weight: 600;
    letter-spacing: 0.06em;
    color: var(--primary);
    font-family: var(--font-display);
  }
  .code-copy-btn {
    flex-shrink: 0;
    min-height: 34px;
    padding: 8px 16px;
    font-size: 13px;
  }
  .code-label {
    font-size: 13px;
    color: var(--muted);
    margin: 0 0 6px;
  }
  .code-url-row {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .code-url {
    display: block;
    padding: 10px 14px;
    background: var(--canvas);
    border-radius: 8px;
    font-size: 13px;
    word-break: break-all;
    color: var(--body);
    line-height: 1.5;
  }
  .field {
    margin-bottom: 14px;
  }
  .field label {
    display: block;
    font-size: 13px;
    font-weight: 500;
    color: var(--body-strong);
    margin-bottom: 6px;
  }
  .field-error {
    font-size: 12px;
    color: var(--error);
    margin: 4px 0 0;
  }
  .settings-save-row {
    display: flex;
    align-items: center;
    gap: 16px;
    margin-top: 20px;
  }
  .save-success {
    font-size: 14px;
    color: var(--success);
    font-weight: 500;
  }
  .warning-note {
    font-size: 13px;
    color: var(--warning);
    margin: -4px 0 12px;
    line-height: 1.4;
  }
  .save-error {
    font-size: 14px;
    color: var(--error);
  }
  .stats-placeholder {
    color: var(--muted);
    font-size: 14px;
    margin: 12px 0 0;
  }
  .reg-list {
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin-top: 12px;
  }
  .reg-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    padding: 12px 16px;
    border-radius: 10px;
    background: var(--canvas);
  }
  .reg-name {
    font-weight: 600;
    font-size: 14px;
    color: var(--ink);
  }
  .reg-school {
    font-weight: 400;
    font-size: 12px;
    color: var(--muted);
    margin-left: 6px;
  }
  .reg-meta {
    display: flex;
    align-items: center;
    gap: 12px;
    flex-shrink: 0;
  }
  .reg-email {
    font-size: 13px;
    color: var(--muted);
  }
  .reg-badge {
    font-size: 12px;
    font-weight: 600;
    padding: 3px 10px;
    border-radius: 20px;
    background: rgba(242, 120, 48, 0.1);
    color: var(--primary);
    white-space: nowrap;
  }
  .reg-badge--paid {
    background: rgba(93, 184, 114, 0.12);
    color: #5db872;
  }
  @media (max-width: 560px) {
    .reg-row { flex-direction: column; align-items: flex-start; gap: 8px; }
  }
  @media (--sm-down) {
    .settings-card { padding: 20px; }
    .code-value { font-size: 22px; }
  }
</style>
