<script lang="ts">
  import { invalidateAll } from '$app/navigation';
  import type { PageData } from './$types';
  import PhoneInput from '$lib/components/PhoneInput.svelte';

  let { data }: { data: PageData } = $props();

  let ph = $state(data.phone || '+234');
  let saving = $state(false);
  let msg = $state('');
  let err = $state('');

  async function save() {
    saving = true;
    msg = '';
    err = '';
    try {
      const r = await fetch('/api/user/update-phone', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: ph })
      });
      const d = await r.json();
      if (!r.ok) throw new Error(d.error || 'Failed to save');
      msg = 'Phone number updated';
      await invalidateAll();
    } catch (e) {
      err = e instanceof Error ? e.message : 'Something went wrong';
    } finally {
      saving = false;
    }
  }
</script>

<div class="shell">
  <div class="card">
    <h1 class="title">Settings</h1>
    <p class="sub">Manage your account details</p>

    <div class="field">
      <label class="label" for="settings-email">Email</label>
      <input id="settings-email" class="input" type="email" value={data.email} disabled />
    </div>

    <div class="field">
      <PhoneInput
        id="settings-phone"
        label="Phone number"
        value={ph}
        placeholder="Your phone number"
        onChange={(v) => { ph = v; err = ''; }}
      />
    </div>

    {#if msg}
      <div class="success">{msg}</div>
    {/if}
    {#if err}
      <div class="error" role="alert">{err}</div>
    {/if}

    <button class="btn" onclick={save} disabled={saving}>
      {saving ? 'Saving…' : 'Save'}
    </button>

    <a href="/dashboard" class="back">← Back to Dashboard</a>
  </div>
</div>

<style>
  .shell {
    min-height: 100vh;
    padding: 120px 2rem 4rem;
    max-width: 520px;
    margin: 0 auto;
  }
  .card {
    background: var(--surface);
    border: 1px solid var(--hairline);
    border-radius: 16px;
    padding: 2.5rem 2rem;
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
  .title {
    font-family: var(--font-display);
    font-size: 1.6rem;
    font-weight: 500;
    margin: 0;
    color: var(--ink);
  }
  .sub {
    font-family: var(--font-registration);
    font-size: 14px;
    color: var(--muted);
    margin: -8px 0 0;
  }
  .field {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }
  .label {
    font-family: var(--font-registration);
    font-size: 13px;
    font-weight: 600;
    color: var(--body-strong);
  }
  .input {
    padding: 10px 14px;
    border-radius: 10px;
    border: 1px solid var(--hairline);
    background: var(--surface-soft);
    color: var(--ink);
    font-family: var(--font-registration);
    font-size: 14px;
    outline: none;
  }
  .input:disabled {
    opacity: 0.5;
  }
  .success {
    padding: 10px 14px;
    border-radius: 8px;
    background: rgba(93, 184, 114, 0.1);
    color: #2d8f4a;
    font-size: 13px;
  }
  .error {
    padding: 10px 14px;
    border-radius: 8px;
    background: rgba(255,55,45,0.08);
    color: var(--error);
    font-size: 13px;
  }
  .btn {
    width: 100%;
    padding: 14px 24px;
    border: none;
    border-radius: 10px;
    background: var(--ink);
    color: white;
    font-family: var(--font-registration);
    font-size: 15px;
    font-weight: 600;
    cursor: pointer;
    transition: opacity 0.2s;
  }
  .btn:disabled {
    background: var(--surface-card);
    color: var(--muted);
    cursor: not-allowed;
  }
  .btn:not(:disabled):hover { opacity: 0.85; }
  .back {
    font-family: var(--font-registration);
    font-size: 13px;
    color: var(--muted);
    text-decoration: none;
    text-align: center;
  }
  .back:hover { color: var(--ink); }
</style>
