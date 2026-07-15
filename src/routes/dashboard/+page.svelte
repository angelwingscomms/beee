<script lang="ts">
  import type { PageProps } from './$types';

  let { data }: PageProps = $props();

  const member_since = data.profile?.d
    ? new Date(data.profile.d).toLocaleDateString(undefined, { year: 'numeric', month: 'short' })
    : null;
  const e4_since = data.e4?.joined
    ? new Date(data.e4.joined).toLocaleDateString(undefined, { year: 'numeric', month: 'short' })
    : null;
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
        {#if member_since}<span class="dash-chip">Member since {member_since}</span>{/if}
        {#if data.profile.c?.includes('rpb')}<span class="dash-chip dash-chip--accent">Player</span>{/if}
        {#if data.profile.c?.includes('fab')}<span class="dash-chip dash-chip--accent">Partner</span>{/if}
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
  .dash-section {
    margin-top: 28px;
  }
  .dash-section-head {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    margin-bottom: 12px;
  }
  .dash-section-title {
    font-family: var(--font-registration);
    font-size: 13px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.04em;
    color: var(--muted);
    margin: 0;
  }
  .dash-link {
    font-family: var(--font-registration);
    font-size: 13px;
    font-weight: 600;
    color: var(--primary);
    text-decoration: none;
  }
  .dash-link:hover { text-decoration: underline; }
  .dash-empty {
    font-size: 14px;
    color: var(--muted);
    margin: 0;
  }
  .dash-e4 {
    padding: 18px;
    border-radius: 12px;
    background: var(--surface-soft);
    border: 1px solid var(--hairline);
  }
  .dash-e4--empty { display: flex; flex-direction: column; gap: 12px; }
  .dash-e4-stats {
    display: flex;
    gap: 24px;
    margin-bottom: 14px;
  }
  .dash-stat { display: flex; flex-direction: column; }
  .dash-stat-num {
    font-family: var(--font-display);
    font-size: 1.5rem;
    font-weight: 600;
    color: var(--ink);
  }
  .dash-stat-label {
    font-family: var(--font-registration);
    font-size: 12px;
    color: var(--muted);
  }
  .dash-e4-btn {
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
  .dash-e4-btn:hover { opacity: 0.85; }
  .dash-actions {
    display: flex;
    gap: 10px;
    margin-top: 28px;
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
