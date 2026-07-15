<script lang="ts">
  import { goto } from '$app/navigation';
  import type { PageProps } from './$types';

  let { data }: PageProps = $props();

  let show_modal = $state(false);
  let is_upgrading = $state(false);

  const is_partner = $derived(data.profile?.c?.includes('fab') ?? false);

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

<svelte:head>
  <title>Dashboard — BEEE</title>
</svelte:head>

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

    <div class="dash-actions">
      <a href="/register" class="dash-btn">Register another player</a>
      {#if is_partner}
        <a href="/dashboard/partner" class="dash-btn dash-btn--outline">Partner dashboard →</a>
      {:else}
        <button class="dash-btn dash-btn--outline" onclick={() => (show_modal = true)}>Become a partner</button>
      {/if}
      <a href="https://e4.bproject.com" class="dash-btn dash-btn--outline" target="_blank" rel="noopener">E4™ Chess Coach →</a>
    </div>
  </div>
</div>

{#if show_modal}
  <div class="modal-backdrop" role="dialog" aria-modal="true" onclick={() => (show_modal = false)}>
    <div class="modal" onclick={(e) => e.stopPropagation()}>
      <h2 class="modal-title">Become a BEEE partner?</h2>
      <p class="modal-body">
        Share your partner link to earn rewards on every player you refer. Ready to join the
        partner program?
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
    transition: opacity 0.2s;
  }
  .dash-btn:hover { opacity: 0.85; }
  .dash-btn--outline {
    background: transparent;
    border: 1px solid var(--hairline);
    color: var(--body-strong);
  }
  .dash-btn--outline:hover { background: var(--surface-soft); }
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
