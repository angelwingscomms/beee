<script lang="ts">
  import type { PageProps } from './$types';

  let { data }: PageProps = $props();
</script>

<svelte:head>
  <title>Dashboard — BEEE</title>
</svelte:head>

<div class="dash-shell">
  <div class="dash-card">
    <h1 class="dash-title">Welcome{data.user?.name ? `, ${data.user.name}` : ''}</h1>
    <p class="dash-sub">Your BEEE account overview</p>

    {#if data.registrations && data.registrations.length > 0}
      <div class="dash-section">
        <h2 class="dash-section-title">Registrations</h2>
        <div class="dash-regs">
          {#each data.registrations as reg}
            <div class="dash-reg">
              <div class="dash-reg-top">
                <span class="dash-reg-name">{reg.fn || ''} {reg.ln || ''}</span>
                <span class="dash-reg-badge" class:dash-reg-badge--paid={reg.st === 'paid'}>
                  {reg.st === 'paid' ? 'Paid' : 'Pending'}
                </span>
              </div>
              {#if reg.sn}
                <p class="dash-reg-school">{reg.sn}</p>
              {/if}
              {#if reg.ref}
                <p class="dash-reg-ref">Ref: <code>{reg.ref}</code></p>
              {/if}
            </div>
          {/each}
        </div>
      </div>
    {/if}

    <div class="dash-actions">
      <a href="/register" class="dash-btn">Register Another</a>
      <a href="/" class="dash-btn dash-btn--outline">Home</a>
    </div>
  </div>
</div>

<style>
  .dash-shell {
    min-height: 100vh;
    padding: 120px 2rem 4rem;
    max-width: 640px;
    margin: 0 auto;
  }
  .dash-card {
    background: var(--surface);
    border: 1px solid var(--hairline);
    border-radius: 16px;
    padding: 2.5rem 2rem;
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
    margin: 0 0 24px;
  }
  .dash-section {
    margin-bottom: 24px;
  }
  .dash-section-title {
    font-family: var(--font-registration);
    font-size: 13px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.04em;
    color: var(--muted);
    margin: 0 0 12px;
  }
  .dash-regs {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  .dash-reg {
    padding: 14px 16px;
    border-radius: 10px;
    background: var(--surface-soft);
  }
  .dash-reg-top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
  }
  .dash-reg-name {
    font-weight: 600;
    font-size: 14px;
    color: var(--body-strong);
  }
  .dash-reg-badge {
    font-family: var(--font-registration);
    font-size: 12px;
    font-weight: 600;
    padding: 3px 10px;
    border-radius: 20px;
    background: rgba(242,120,48,0.1);
    color: var(--primary);
  }
  .dash-reg-badge--paid {
    background: rgba(93,184,114,0.12);
    color: #5db872;
  }
  .dash-reg-school {
    font-size: 13px;
    color: var(--body);
    margin: 4px 0 0;
  }
  .dash-reg-ref {
    font-size: 12px;
    color: var(--muted);
    margin: 4px 0 0;
  }
  .dash-reg-ref code {
    font-size: 12px;
  }
  .dash-actions {
    display: flex;
    gap: 10px;
    margin-top: 24px;
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
    transition: opacity 0.2s;
  }
  .dash-btn:hover { opacity: 0.85; }
  .dash-btn--outline {
    background: transparent;
    border: 1px solid var(--hairline);
    color: var(--body-strong);
  }
  .dash-btn--outline:hover { background: var(--surface-soft); }
</style>
