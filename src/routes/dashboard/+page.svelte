<script lang="ts">
  import { goto, invalidateAll } from '$app/navigation';
  import { browser } from '$app/environment';
  import type { PageProps } from './$types';
  import type { Registration } from '$lib/types/registration';
  import { resolve_active_reg } from '$lib/active_reg';

  let { data }: PageProps = $props();

  let show_modal = $state(false);
  let is_upgrading = $state(false);

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
</script>

<div class="dash-shell rv-field-cloud">
  <div class="rv-wrap">
    <div class="dash-card">
      <header class="dash-head">
        <div>
          <p class="rv-micro dash-eyebrow">YOUR DASHBOARD</p>
          <h1 class="rv-d3 dash-title">Welcome{data.user?.name ? `, ${data.user.name}` : ''}</h1>
          <p class="rv-body dash-sub">Your BEEE player dashboard</p>
        </div>
        {#if data.user?.picture}
          <img class="dash-avatar" src={data.user.picture} alt="" />
        {/if}
      </header>

      {#if data.profile}
        <div class="dash-profile">
          <span class="rv-micro dash-chip">{data.user.email}</span>
          {#if data.profile.c?.includes('rpb')}<span class="rv-micro dash-chip dash-chip--accent">Player</span>{/if}
          {#if is_partner}<span class="rv-micro dash-chip dash-chip--accent">Partner</span>{/if}
        </div>
      {/if}

      {#if all_regs.length > 1}
        <div class="reg-switch">
          <label for="reg-select" class="rv-label">Active registration</label>
          <select id="reg-select" class="rv-input reg-select" value={active_id} onchange={switch_reg}>
            {#each all_regs as r (r.i)}
              <option value={r.i}>{reg_label(r)}</option>
            {/each}
          </select>
        </div>
      {/if}

      {#if active_reg}
        <div class="reg-detail">
          <h2 class="rv-title reg-detail-name">{reg_label(active_reg) || 'Registration'}</h2>
          <dl class="reg-detail-grid">
            {#if active_reg.sn}<div><dt class="rv-micro">School</dt><dd class="rv-body">{active_reg.sn}</dd></div>{/if}
            {#if data.user?.ph?.length}<div><dt class="rv-micro">Phone</dt><dd class="rv-body">{data.user.ph.join(', ')}</dd></div>{/if}
            <div><dt class="rv-micro">Status</dt><dd class="rv-body reg-detail-status" class:is-pending={active_reg.st !== 'i'}>{active_reg.st === 'i' ? 'Paid' : 'Pending'}</dd></div>
            {#if active_reg.ref}<div><dt class="rv-micro">Reference</dt><dd class="rv-body"><code>{active_reg.ref}</code></dd></div>{/if}
          </dl>
        </div>
      {/if}

      <div class="dash-actions">
        <a href="/dashboard/settings" class="rv-btn rv-btn--ghost felt">Settings</a>
        <a href="/register" class="rv-btn rv-btn--beam felt">Register another player</a>
        {#if is_partner}
          <a href="/dashboard/partner" class="rv-btn rv-btn--ghost felt">Partner dashboard →</a>
        {:else}
          <button class="rv-btn rv-btn--ghost felt" onclick={() => (show_modal = true)}>Become a partner</button>
        {/if}
        <a href="https://e4.bproject.com" class="rv-btn rv-btn--ghost felt" target="_blank" rel="noopener">e4™ Chess Coach →</a>
      </div>
    </div>
  </div>
</div>

{#if show_modal}
  <div class="modal-backdrop" role="dialog" aria-modal="true" onclick={() => (show_modal = false)}>
    <div class="modal" onclick={(e) => e.stopPropagation()}>
      <h2 class="rv-title modal-title">Become a BEEE partner?</h2>
      <p class="rv-body modal-body">
        Share your partner link to earn rewards on every player you refer. Ready to join the
        partner programme?
      </p>
      <div class="modal-actions">
        <button class="rv-btn rv-btn--ghost felt" onclick={() => (show_modal = false)}>Not now</button>
        <button class="rv-btn rv-btn--beam felt" disabled={is_upgrading} onclick={become_partner}>
          {is_upgrading ? 'Setting up…' : 'Yes, become a partner'}
        </button>
      </div>
    </div>
  </div>
{/if}

<style>
  .dash-shell {
    min-height: 100vh;
    padding: calc(var(--section-pad) + 72px) 0 var(--space-7);
  }
  .dash-card {
    max-width: 720px;
    margin: 0 auto;
    background: var(--cloud-dim);
    border: 1px solid var(--hairline);
    border-radius: var(--radius-card);
    padding: var(--space-4);
  }
  .dash-head {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 16px;
  }
  .dash-eyebrow {
    color: var(--beam);
    margin-bottom: 8px;
  }
  .dash-title {
    margin: 0 0 4px;
  }
  .dash-sub {
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
    color: var(--muted);
    background: var(--cloud);
    border: 1px solid var(--hairline);
    border-radius: var(--radius-pill);
    padding: 4px 12px;
  }
  .dash-chip--accent {
    color: var(--beam);
    background: color-mix(in srgb, var(--beam) 10%, transparent);
    border-color: transparent;
  }
  .dash-actions {
    display: flex;
    gap: 10px;
    margin-top: 28px;
    flex-wrap: wrap;
  }
  .reg-switch {
    margin: 20px 0 4px;
    display: flex;
    flex-direction: column;
    gap: 6px;
  }
  .reg-select {
    appearance: none;
    cursor: pointer;
  }
  .reg-detail {
    margin-top: 20px;
    padding: 18px 20px;
    border: 1px solid var(--hairline);
    border-radius: var(--radius-card);
    background: var(--cloud);
  }
  .reg-detail-name {
    margin: 0 0 12px;
  }
  .reg-detail-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
    gap: 14px 20px;
    margin: 0;
  }
  .reg-detail-grid dt {
    color: var(--muted);
    margin-bottom: 2px;
  }
  .reg-detail-grid dd {
    margin: 0;
  }
  .reg-detail-grid code {
    font-family: var(--font-mono);
    font-size: 12px;
    color: var(--muted);
  }
  .reg-detail-status {
    display: inline-flex;
    color: var(--success);
    background: color-mix(in srgb, var(--success) 12%, transparent);
    border-radius: var(--radius-pill);
    padding: 2px 10px;
    font-weight: 600;
  }
  .reg-detail-status.is-pending {
    color: var(--warning);
    background: color-mix(in srgb, var(--warning) 12%, transparent);
  }
  .modal-backdrop {
    position: fixed;
    inset: 0;
    background: rgba(10, 15, 26, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1.5rem;
    z-index: var(--z-menu);
  }
  .modal {
    background: var(--cloud-dim);
    border: 1px solid var(--hairline);
    border-radius: var(--radius-card);
    padding: var(--space-4);
    max-width: 420px;
    width: 100%;
  }
  .modal-title {
    margin: 0 0 12px;
  }
  .modal-body {
    color: var(--body);
    margin: 0 0 24px;
  }
  .modal-actions {
    display: flex;
    gap: 10px;
    justify-content: flex-end;
  }
</style>
