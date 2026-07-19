<script lang="ts">
  import { motionMagnetic } from '$lib/actions/motion';

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
  <a {href} class="btn {className}" style={bg_style} use:motionMagnetic>
    {#if children}{@render children()}{:else}Register Now{/if}
  </a>
{:else}
  <button {disabled} {onclick} class="btn {className}" style={bg_style} use:motionMagnetic>
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
    font-size: 15px;
    font-weight: 600;
    letter-spacing: 0.01em;
    line-height: 1;
    text-decoration: none;
    cursor: pointer;
    transition: transform 160ms ease, box-shadow 160ms ease, background-color 160ms ease;
    white-space: nowrap;
    opacity: 1;
    box-shadow: 0 1px 2px rgba(20, 20, 19, 0.12);
  }
  .btn:hover:not(:disabled) {
    transform: translateY(-1px);
    box-shadow: 0 6px 20px rgba(242, 120, 48, 0.28), 0 2px 6px rgba(20, 20, 19, 0.10);
  }
  .btn:active:not(:disabled) {
    background: rgb(199, 82, 0);
    transform: translateY(0) scale(0.98);
    box-shadow: 0 1px 2px rgba(20, 20, 19, 0.12);
  }
  .btn:focus-visible {
    outline: 2px solid #141413;
    outline-offset: 3px;
  }
  .btn:disabled {
    cursor: not-allowed;
    transform: none;
    background: #e6dfd8;
    color: #8e8b82;
    box-shadow: none;
  }
  @media (prefers-reduced-motion: reduce) {
    .btn, .btn:hover:not(:disabled), .btn:active:not(:disabled) { transform: none; }
  }
</style>
