<script lang="ts">
  import { goto, invalidateAll } from '$app/navigation';
  import { onMount } from 'svelte';

  onMount(async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
    } catch {}
    await invalidateAll();
    goto('/');
  });
</script>

<svelte:head>
  <title>Signing out — BEEE</title>
</svelte:head>

<div class="shell">
  <p>Signing out…</p>
</div>

<style>
  .shell { min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 2rem; color: var(--muted); }
</style>
