<script lang="ts">
  import { page } from '$app/stores';
</script>

<svelte:head>
  <title>{$page.status === 404 ? 'Page not found' : 'Something went wrong'} | BEEE</title>
  <meta name="robots" content="noindex, nofollow" />
</svelte:head>

<section class="err rv-field-cloud">
  <p class="rv-micro err-code">{$page.status}</p>
  <h1 class="rv-d2 err-title">{$page.status === 404 ? 'This square is empty.' : 'Something went wrong.'}</h1>
  {#if $page.status === 404}
    <p class="rv-body err-sub">The page you are looking for is not on the board.</p>
  {/if}
  <a href="/" class="rv-btn rv-btn--beam rv-btn--big felt">Back to Home</a>
</section>

<style>
  .err {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: var(--space-2);
    text-align: center;
    padding: 24px;
  }
  .err-code {
    color: var(--beam);
  }
  .err-title {
    margin: 0;
  }
  .err-sub {
    color: var(--muted);
    margin-bottom: var(--space-2);
  }
</style>
