<script lang="ts">
  import { fade, fly, scale } from 'svelte/transition';
  import { observe } from '$lib/actions/observe';
  import { motionReveal, motionFadeUp, motionStaggered } from '$lib/actions/motion';
</script>

<svelte:head>
  <title>BEEE Spectacular Chess Championship Abuja 2026</title>
</svelte:head>

<main class="page">
</main>

<style>
  :global(body) {
    background-color: #050505;
    color: #f0f0f0;
    overflow-x: hidden;
    cursor: default;
  }

  .page {
    width: 100vw;
    min-height: 100vh;
    position: relative;
  }
</style>
