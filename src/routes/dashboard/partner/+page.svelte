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

<div class="settings-page rv-field-cloud">
  <section class="rv-wrap settings-inner">
    <p class="rv-micro settings-eyebrow">PARTNER DASHBOARD</p>
    <h1 class="rv-d3 settings-title">Partner Dashboard</h1>

    <div class="settings-card">
      <h2 class="rv-title settings-card-title">Your Partner Code</h2>
      <div class="code-row">
        <span class="rv-title rv-num code-value" id="partner-code-text">{data.ac || ','}</span>
        <button class="rv-btn rv-btn--ghost felt code-copy-btn" onclick={copyCode} disabled={!data.ac}>
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>
      <p class="rv-micro code-label">Share this link to earn commissions:</p>
      <code class="rv-body code-url">https://beeeproject.com/i/{data.ac || '{code}'}</code>
    </div>

    <div class="settings-card">
      <h2 class="rv-title settings-card-title">Set a Custom Partner Code</h2>
      <p class="rv-body settings-card-sub">Replace the random code above with one of your own. It must be unique and pass a quick check so it sounds right when shared.</p>
      <form onsubmit={saveCustomCode}>
        <div class="field">
          <label for="customCode" class="rv-label">Custom code</label>
          <input id="customCode" class="rv-input" type="text" bind:value={customCode}
            placeholder="e.g. chesskids" maxlength={24} autocapitalize="off" autocomplete="off" spellcheck={false}
            oninput={() => { customCodeError = ''; customCodeMsg = ''; }}
          />
          {#if customCodeError}<p class="rv-error-text field-msg">{customCodeError}</p>{/if}
        </div>
        <div class="settings-save-row">
          <button type="submit" class="rv-btn rv-btn--beam felt" disabled={isSavingCode}>
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
      <h2 class="rv-title settings-card-title">Bank Account Details</h2>
      <p class="rv-body settings-card-sub">Where we'll send your referral earnings.</p>
      <form onsubmit={saveBank}>
        <div class="field">
          <label for="ba" class="rv-label">Account Number</label>
          <input id="ba" class="rv-input" type="text" inputmode="numeric"
            bind:value={ba} placeholder="0123456789" maxlength={10}
            oninput={() => { bae = ''; saveMsg = ''; }}
          />
          {#if bae}<p class="rv-error-text field-msg">{bae}</p>{/if}
        </div>
        <div class="field">
          <label for="bn" class="rv-label">Bank</label>
          <BankSelect value={bn} onChange={onBankSelect} />
          {#if bke}<p class="rv-error-text field-msg">{bke}</p>{/if}
        </div>
        <div class="settings-save-row">
          <button type="submit" class="rv-btn rv-btn--beam felt" disabled={isSaving || (!ba && !bk)}>
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
      <h2 class="rv-title settings-card-title">Registered Users</h2>
      <p class="rv-body settings-card-sub">Players who registered using your partner code.</p>
      {#if data.registrations.length}
        <div class="reg-list">
          {#each data.registrations as reg}
            <div class="reg-row">
              <div class="rv-body reg-name">{reg.fn || ''} {reg.ln || ''}{#if reg.sn} <span class="reg-school">{reg.sn}</span>{/if}</div>
              <div class="reg-meta">
                <span class="rv-micro reg-email">{reg.e}</span>
                <span class="rv-micro reg-badge" class:reg-badge--paid={reg.st === 'i'}>
                  {reg.st === 'i' ? 'Paid' : 'Pending'}
                </span>
              </div>
            </div>
          {/each}
        </div>
      {:else}
        <p class="rv-body stats-placeholder">No users have registered with your code yet.</p>
      {/if}
    </div>
  </section>
</div>

<style>
  .settings-page {
    min-height: 100vh;
  }
  .settings-inner {
    padding: calc(var(--section-pad) + 72px) 0 var(--space-7);
    max-width: 640px;
  }
  .settings-eyebrow {
    color: var(--beam);
    margin-bottom: 8px;
  }
  .settings-title {
    margin: 0 0 32px;
  }
  .settings-card {
    background: var(--cloud-dim);
    border: 1px solid var(--hairline);
    border-radius: var(--radius-card);
    padding: var(--space-4);
    margin-bottom: 20px;
  }
  .settings-card-title {
    margin: 0 0 4px;
  }
  .settings-card-sub {
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
    letter-spacing: 0.06em;
    color: var(--beam);
  }
  .code-copy-btn {
    flex-shrink: 0;
    min-height: 34px;
    padding: 8px 16px;
    font-size: 13px;
  }
  .code-label {
    color: var(--muted);
    margin: 0 0 6px;
  }
  .code-url {
    display: block;
    padding: 10px 14px;
    background: var(--cloud);
    border-radius: 8px;
    word-break: break-all;
    line-height: 1.5;
  }
  .field {
    margin-bottom: 14px;
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
  .save-error {
    font-size: 14px;
    color: var(--error);
  }
  .stats-placeholder {
    color: var(--muted);
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
    background: var(--cloud);
  }
  .reg-name {
    font-weight: 600;
  }
  .reg-school {
    font-weight: 400;
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
    color: var(--muted);
  }
  .reg-badge {
    padding: 3px 10px;
    border-radius: var(--radius-pill);
    background: color-mix(in srgb, var(--beam) 10%, transparent);
    color: var(--beam);
    white-space: nowrap;
  }
  .reg-badge--paid {
    background: color-mix(in srgb, var(--success) 12%, transparent);
    color: var(--success);
  }
  @media (max-width: 560px) {
    .reg-row { flex-direction: column; align-items: flex-start; gap: 8px; }
  }
</style>
