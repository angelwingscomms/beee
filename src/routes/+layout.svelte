<script lang="ts">
  import '../app.css';
  let { children } = $props();
</script>

<svelte:head>
  <title>BEEE TEAMUP Chess Tournament - Registration</title>

  <meta name="description" content="Register your school for BEEE TEAMUP Chess Tournament" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
</svelte:head>

{@render children()}
