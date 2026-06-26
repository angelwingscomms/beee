<script lang="ts">
  import { page } from '$app/stores';
  import '../app.css';
  import Cursor from '../components/Cursor.svelte';
  import ChampNav from '$lib/components/championship/ChampNav.svelte';
  import Footer from '$lib/components/home/Footer.svelte';
  let { children } = $props();

  let url = $derived($page.url);
  let og_img = $derived(`https://beeeproject.com/og.png`);
</script>

<svelte:head>
  <title>BEEE — Building Exceptional Experiences Through Education</title>
  <meta name="description" content="BEEE T.E.A.M.U.P. youth development programme and Spectacular Chess Championship." />
  <link rel="canonical" href={`https://beeeproject.com${url.pathname}`} />
  <meta property="og:title" content="BEEE — Building Exceptional Experiences Through Education" />
  <meta property="og:description" content="BEEE T.E.A.M.U.P. youth development programme and Spectacular Chess Championship." />
  <meta property="og:url" content={`https://beeeproject.com${url.pathname}`} />
  <meta property="og:type" content="website" />
  <meta property="og:image" content={og_img} />
  <meta property="og:locale" content="en_NG" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="BEEE — Building Exceptional Experiences Through Education" />
  <meta name="twitter:description" content="BEEE T.E.A.M.U.P. youth development programme and Spectacular Chess Championship." />
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
