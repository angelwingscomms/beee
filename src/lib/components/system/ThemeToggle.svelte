<script lang="ts">
  import { onMount } from 'svelte';
  let dark = $state(false);
  onMount(() => { dark = document.documentElement.classList.contains('dark'); });
  function toggle() {
    dark = !dark;
    document.documentElement.classList.toggle('dark', dark);
    try { localStorage.setItem('beee_theme', dark ? 'dark' : 'light'); } catch (e) {}
  }
</script>

<button class="rv-micro theme-toggle felt" onclick={toggle} aria-pressed={dark}>
  {dark ? 'LIGHTS ON' : 'LIGHTS OFF'}
</button>

<style>
  .theme-toggle { background: none; border: 1px solid color-mix(in srgb, currentColor 25%, transparent); border-radius: var(--radius-pill); padding: 8px 16px; color: inherit; }
</style>
