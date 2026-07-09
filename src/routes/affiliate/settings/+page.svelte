<script lang="ts">
  import type { PageData } from './$types';
  let { data }: { data: PageData } = $props();
</script>

<svelte:head>
  <title>Affiliate Settings — BEEE</title>
</svelte:head>

<div class="affiliate-settings-page">
  <section class="container" style="padding: 140px 0 80px;">
    <h1 style="font-family: var(--font-display); font-size: 2.2rem; font-weight: 500; color: var(--ink); margin: 0 0 24px;">
      Affiliate Settings
    </h1>
    <p style="font-size: 16px; color: var(--body); margin: 0 0 32px;">
      Welcome, {data.name || data.email}.
    </p>

    {#if data.ac}
      <div style="background: var(--surface-soft); border-radius: 12px; padding: 24px; margin-bottom: 24px;">
        <p style="font-size: 14px; color: var(--muted); margin: 0 0 8px;">Your affiliate code</p>
        <p style="font-size: 24px; font-weight: 600; color: var(--primary); margin: 0 0 16px; letter-spacing: 0.04em;">
          {data.ac}
        </p>
        <p style="font-size: 14px; color: var(--muted); margin: 0;">
          Share this link:
          <code style="display: block; margin-top: 8px; padding: 8px 12px; background: var(--canvas); border-radius: 8px; font-size: 13px; word-break: break-all;">
            https://beeeproject.com/register?c={data.ac}
          </code>
        </p>
      </div>
    {:else}
      <p style="color: var(--muted);">No affiliate code generated yet.</p>
    {/if}

    <p style="margin-top: 32px; color: var(--muted); font-size: 14px;">
      Bank account settings coming soon.
    </p>
  </section>
</div>
