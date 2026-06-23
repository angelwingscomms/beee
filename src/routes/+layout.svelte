<script lang="ts">
  import '../app.css';
  import Cursor from '../components/Cursor.svelte';
  import ChampNav from '$lib/components/championship/ChampNav.svelte';
  let { children } = $props();
</script>

<svelte:head>
  <title>BEEE — Building Exceptional Experiences Through Education</title>

  <meta name="description" content="BEEE T.E.A.M.U.P. youth development programme and Spectacular Chess Championship." />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
</svelte:head>

<a href="#main-content" class="skip-link">Skip to main content</a>
<Cursor />
<ChampNav />
<main id="main-content" tabindex="-1">
  {@render children()}
</main>
