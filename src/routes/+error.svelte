<script lang="ts">
  import { page } from '$app/stores';
  import Button from '$lib/components/Button.svelte';
</script>

<svelte:head>
  <title>{$page.status === 404 ? 'Page not found' : 'Something went wrong'} | BEEE</title>
  <meta name="robots" content="noindex, nofollow" />
</svelte:head>

<section class="err">
  <p class="err-code">{$page.status}</p>
  <h1 class="err-title">{$page.status === 404 ? 'This square is empty.' : 'Something went wrong.'}</h1>
  <Button href="/" class="err-btn">Back to Home</Button>
</section>

<style>
  .err {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 16px;
    background: var(--navy);
    text-align: center;
    padding: 24px;
  }
  .err-code {
    font-family: var(--font-hero);
    font-size: clamp(80px, 18vw, 160px);
    font-weight: 800;
    line-height: 1;
    color: var(--primary);
    margin: 0;
  }
  .err-title {
    font-family: var(--font-hero);
    font-size: clamp(20px, 3vw, 28px);
    font-weight: 600;
    color: #faf9f5;
    margin: 0 0 12px;
  }
  :global(.err-btn) { padding: 14px 32px; }
</style>
