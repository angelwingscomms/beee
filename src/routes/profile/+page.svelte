<script lang="ts">
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';

  let user = $derived($page.data.user);
  if (!user) goto('/login?next=/profile');
</script>

<svelte:head>
  <title>Profile — BEEE</title>
</svelte:head>

<div class="shell">
  <div class="card">
    <h1>Profile</h1>
    {#if user}
      <p class="email">{user.email}</p>
      <p class="muted">Manage your account settings from the dashboard.</p>
      <a href="/dashboard" class="btn">Go to Dashboard</a>
    {:else}
      <p>Please <a href="/login?next=/profile">log in</a> to view your profile.</p>
    {/if}
  </div>
</div>

<style>
  .shell { min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 2rem; }
  .card { max-width: 400px; width: 100%; background: var(--surface); border: 1px solid var(--hairline); border-radius: 16px; padding: 2.5rem 2rem; }
  h1 { font-family: var(--font-display); font-size: 1.6rem; font-weight: 500; margin: 0 0 12px; color: var(--ink); }
  .email { font-size: 14px; color: var(--body); margin: 0 0 4px; }
  .muted { font-size: 13px; color: var(--muted); margin: 0 0 20px; }
  .btn { display: inline-block; padding: 10px 20px; border-radius: 10px; background: var(--ink); color: white; font-size: 14px; font-weight: 600; text-decoration: none; }
</style>
