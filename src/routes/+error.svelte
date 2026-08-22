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
  {#if $page.status === 404}
    <p class="err-help">The page you are looking for is not here. Try one of these instead, or ask for the site map and llms.txt to read the whole site as markdown.</p>
    <nav class="err-links">
      <a href="/">Home</a>
      <a href="/about">About</a>
      <a href="/register">Register</a>
      <a href="/faq">FAQ</a>
      <a href="/news">News</a>
      <a href="/docs">Developer docs</a>
      <a href="/llms.txt">llms.txt</a>
      <a href="/sitemap.xml">Site map</a>
    </nav>
  {/if}
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
  .err-help {
    max-width: 480px;
    color: color-mix(in srgb, #faf9f5 70%, transparent);
    margin: 0 0 18px;
    line-height: 1.6;
  }
  .err-links {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    justify-content: center;
    margin-bottom: 22px;
  }
  .err-links a {
    color: var(--primary);
    font-size: 14px;
    text-decoration: underline;
    text-underline-offset: 3px;
  }
  :global(.err-btn) { padding: 14px 32px; }
</style>
