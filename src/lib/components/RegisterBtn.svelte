<script lang="ts">
  let {
    href,
    disabled = false,
    children,
    class: className = '',
    onclick
  }: {
    href?: string;
    disabled?: boolean;
    children?: import('svelte').Snippet;
    class?: string;
    onclick?: (e: Event) => void;
  } = $props();
</script>

{#if href}
  <a {href} class="register-btn {className}">
    {#if children}{@render children()}{:else}Register Now{/if}
  </a>
{:else}
  <button {disabled} {onclick} class="register-btn {className}">
    {#if children}{@render children()}{:else}Register{/if}
  </button>
{/if}

<style>
  .register-btn {
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
  .register-btn:hover {
    transform: scale(1.02);
  }
  .register-btn:active {
    transform: scale(0.98);
  }
  .register-btn:disabled {
    opacity: 0.35;
    cursor: not-allowed;
    transform: none;
  }
</style>
