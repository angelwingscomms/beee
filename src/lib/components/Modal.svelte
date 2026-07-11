<script lang="ts">
  import type { Snippet } from 'svelte';

  let { onclose, children }: { onclose: () => void; children?: Snippet } = $props();
</script>

<svelte:window onkeydown={(e) => e.key === 'Escape' && onclose()} />

<div class="modal-backdrop" role="presentation" onclick={onclose}>
  <div
    class="modal-card"
    role="dialog"
    aria-modal="true"
    onclick={(e) => e.stopPropagation()}
  >
    <button type="button" class="modal-close" onclick={onclose} aria-label="Close">✕</button>
    {@render children?.()}
  </div>
</div>

<style>
  .modal-backdrop {
    position: fixed;
    inset: 0;
    z-index: 100;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(0, 0, 0, 0.7);
    padding: 1rem;
  }

  .modal-card {
    position: relative;
    width: 100%;
    max-width: 30rem;
    background: #0f172a;
    border: 1px solid rgba(245, 158, 11, 0.4);
    border-radius: 1.5rem;
    padding: 2.5rem 2rem;
    color: #fff;
  }

  .modal-close {
    position: absolute;
    top: 1rem;
    right: 1rem;
    background: transparent;
    border: 0;
    color: #fff;
    font-size: 1.1rem;
    cursor: pointer;
    line-height: 1;
  }
</style>
