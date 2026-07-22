<script lang="ts">
  import { onMount } from 'svelte';
  import gsap from 'gsap';
  import type { Snippet } from 'svelte';

  let { onclose, children }: { onclose: () => void; children?: Snippet } = $props();

  let card: HTMLDivElement;
  let backdrop: HTMLDivElement;

  onMount(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    card.focus();

    if (!matchMedia('(prefers-reduced-motion: reduce)').matches) {
      gsap.fromTo(backdrop, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.25, ease: 'power2.out' });
      gsap.fromTo(
        card,
        { scale: 0.92, y: 24, autoAlpha: 0 },
        { scale: 1, y: 0, autoAlpha: 1, duration: 0.45, ease: 'back.out(1.6)', delay: 0.06 },
      );
    }

    return () => {
      document.body.style.overflow = prev;
    };
  });

  // ponytail: focus is set, not trapped, add a trap if the modal ever holds a form
</script>

<svelte:window onkeydown={(e) => e.key === 'Escape' && onclose()} />

<div
  bind:this={backdrop}
  class="modal-backdrop"
  role="presentation"
  onclick={onclose}
>
  <div
    bind:this={card}
    class="modal-card"
    role="dialog"
    aria-modal="true"
    tabindex="-1"
    onclick={(e) => e.stopPropagation()}
  >
    <button type="button" class="modal-close" onclick={onclose} aria-label="Close">
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
      </svg>
    </button>
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
    background: rgba(3, 7, 18, 0.72);
    backdrop-filter: blur(14px) saturate(120%);
    -webkit-backdrop-filter: blur(14px) saturate(120%);
    padding: 1rem;
  }

  .modal-card {
    position: relative;
    width: 100%;
    max-width: 30rem;
    background: #0f172a;
    border: 1px solid rgba(255, 178, 0, 0.22);
    border-radius: 1.75rem;
    padding: 3.5rem 2rem 2.5rem;
    color: #fff;
    text-align: center;
    outline: none;
    box-shadow:
      0 40px 100px -20px rgba(0, 0, 0, 0.75),
      0 0 0 1px rgba(255, 255, 255, 0.04) inset,
      0 1px 0 rgba(255, 255, 255, 0.10) inset;
  }

  .modal-close {
    position: absolute;
    top: 1rem;
    right: 1rem;
    width: 2.125rem;
    height: 2.125rem;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.09);
    border-radius: 50%;
    color: #94a3b8;
    cursor: pointer;
    transition: background 0.2s, color 0.2s, border-color 0.2s, transform 0.2s;
  }

  .modal-close:hover {
    background: rgba(255, 255, 255, 0.12);
    color: #fff;
    border-color: rgba(255, 255, 255, 0.18);
    transform: rotate(90deg);
  }

  .modal-close:focus-visible {
    outline: 2px solid rgba(255, 178, 0, 0.7);
    outline-offset: 2px;
  }

  /* phone: bottom sheet instead of a floating card */
  @media (max-width: 480px) {
    .modal-backdrop {
      align-items: flex-end;
      padding: 0;
    }

    .modal-card {
      max-width: none;
      border-radius: 1.5rem 1.5rem 0 0;
      border-bottom: none;
      padding: 3rem 1.5rem calc(2rem + env(safe-area-inset-bottom));
    }
  }
</style>
