<script lang="ts">
  import { browser } from '$app/environment';
  import { page } from '$app/stores';
  import '../app.css';
  import Cursor from '../components/Cursor.svelte';
  import ChampNav from '$lib/components/championship/ChampNav.svelte';
  import Footer from '$lib/components/home/Footer.svelte';
  let { children } = $props();

  let url = $derived($page.url);
  let og_img = $derived($page.data.ogImage ?? `https://beeeproject.com/og.png`);

  $effect(() => {
    if (browser) {
      const c = $page.url.searchParams.get('c');
      if (c) localStorage.setItem('partner_c', c);
    }
  });
</script>

<svelte:head>
  <title>BEEE — Be Everything Excellent Every Day</title>
  <meta name="description" content="BEEE TEAMUP™ youth development programme and Spectacular Chess Championship." />
  <link rel="canonical" href={`https://beeeproject.com${url.pathname}`} />
  <meta property="og:title" content="BEEE — Be Everything Excellent Every Day" />
  <meta property="og:description" content="BEEE TEAMUP™ youth development programme and Spectacular Chess Championship." />
  <meta property="og:url" content={`https://beeeproject.com${url.pathname}`} />
  <meta property="og:type" content="website" />
  <meta property="og:image" content={og_img} />
  <meta property="og:locale" content="en_NG" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="BEEE — Be Everything Excellent Every Day" />
  <meta name="twitter:description" content="BEEE TEAMUP™ youth development programme and Spectacular Chess Championship." />
  <meta name="twitter:image" content={og_img} />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
</svelte:head>

<a href="#main-content" class="skip-link">Skip to main content</a>
<Cursor />
<ChampNav />
<main id="main-content" tabindex="-1">
  {@render children()}
</main>
<Footer />
