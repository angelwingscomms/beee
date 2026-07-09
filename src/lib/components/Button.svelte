<script lang="ts">
  let {
    href,
    disabled = false,
    bg = 'o',
    children,
    class: className = '',
    onclick
  }: {
    href?: string;
    disabled?: boolean;
    bg?: 'o' | '0' | string;
    children?: import('svelte').Snippet;
    class?: string;
    onclick?: (e: Event) => void;
  } = $props();

  const bg_style = $derived(
    bg === '0'
      ? 'background: transparent; border: 1px solid rgba(255,255,255,0.6);'
      : bg !== 'o' && bg.startsWith('#')
        ? `background: ${bg};`
        : ''
  );
</script>

{#if href}
  <a {href} class="btn {className}" style={bg_style}>
    {#if children}{@render children()}{:else}Register Now{/if}
  </a>
{:else}
  <button {disabled} {onclick} class="btn {className}" style={bg_style}>
    {#if children}{@render children()}{:else}Register{/if}
  </button>
{/if}

<style>
  .btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: 999px;
    border: none;
    background: linear-gradient(rgb(255, 138, 58) 0%, rgb(255, 107, 0) 50%, rgb(229, 92, 0) 100%);
    color: #fff;
    font-size: 14px;
    font-weight: 500;
    line-height: 1;
    text-decoration: none;
    cursor: pointer;
    transition: transform 160ms ease, box-shadow 160ms ease;
    white-space: nowrap;
    opacity: 1;
  }
  .btn:hover:not(:disabled) {
    transform: scale(1.02);
  }
  .btn:active:not(:disabled) {
    transform: scale(0.98);
  }
  .btn:disabled {
    cursor: not-allowed;
    transform: none;
  }
</style>
