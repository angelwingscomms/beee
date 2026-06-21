<script lang="ts">
  import '../app.css';
  let { children } = $props();
</script>

<svelte:head>
  <title>BEEE — Building Exceptional Experiences Through Education</title>

  <meta name="description" content="BEEE T.E.A.M.U.P. youth development programme and Spectacular Chess Championship." />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
</svelte:head>

<a href="#main-content" class="skip-link" tabindex="1">Skip to main content</a>
<main id="main-content" tabindex="-1" role="main">
  {@render children()}
</main>
