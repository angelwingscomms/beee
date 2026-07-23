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

<div class="shell rv-field-cloud">
  <div class="card">
    <p class="rv-micro eyebrow">SETTINGS</p>
    <h1 class="rv-d3 title">Settings</h1>
    <p class="rv-body sub">Manage your account details</p>

    <div class="field">
      <label class="rv-label" for="settings-email">Email</label>
      <input id="settings-email" class="rv-input" type="email" value={data.email} disabled />
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
      <div class="rv-callout-ok">{msg}</div>
    {/if}
    {#if err}
      <div class="rv-error-text error" role="alert">{err}</div>
    {/if}

    <button class="rv-btn rv-btn--beam felt" onclick={save} disabled={saving}>
      {saving ? 'Saving…' : 'Save'}
    </button>

    <a href="/dashboard" class="rv-micro back">← Back to Dashboard</a>
  </div>
</div>

<style>
  .shell {
    min-height: 100vh;
    padding: calc(var(--section-pad) + 72px) 2rem var(--space-7);
    max-width: 520px;
    margin: 0 auto;
  }
  .card {
    background: var(--cloud-dim);
    border: 1px solid var(--hairline);
    border-radius: var(--radius-card);
    padding: var(--space-4);
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
  .eyebrow {
    color: var(--beam);
  }
  .title {
    margin: 0;
  }
  .sub {
    color: var(--muted);
    margin: -8px 0 0;
  }
  .field {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }
  .error {
    padding: 10px 14px;
  }
  .back {
    color: var(--muted);
    text-decoration: none;
    text-align: center;
  }
  .back:hover { color: var(--ink); }
</style>
