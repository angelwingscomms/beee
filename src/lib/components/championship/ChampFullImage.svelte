<script lang="ts">
  import { inView } from 'motion';

  let { src, alt = '', overlay = true, children }: { src: string; alt?: string; overlay?: boolean; children?: import('svelte').Snippet } = $props();

  let el: HTMLElement;
  let visible = $state(false);

  $effect(() => {
    if (!el) return;
    const stop = inView(el, () => { visible = true });
    return () => stop?.();
  });
</script>

<section class="champ-full-img" bind:this={el} class:visible>
  <div class="champ-full-img-bg" style="background-image: url({src})" role="img" aria-label={alt}></div>
  {#if overlay}
    <div class="champ-full-img-overlay"></div>
  {/if}
  <div class="champ-full-img-noise"></div>
  {#if children}
    <div class="champ-full-img-content container">
      {@render children()}
    </div>
  {/if}
</section>

<style>
  .champ-full-img {
    position: relative;
    height: 70vh;
    min-height: 480px;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .champ-full-img-bg {
    position: absolute;
    inset: 0;
    background-size: cover;
    background-position: center;
    opacity: 0;
    transform: scale(1.08);
    transition: opacity 1s cubic-bezier(0.16, 1, 0.3, 1), transform 1.2s cubic-bezier(0.16, 1, 0.3, 1);
    filter: saturate(1.05) contrast(1.08);
  }

  .champ-full-img.visible .champ-full-img-bg {
    opacity: 1;
    transform: scale(1);
  }

  .champ-full-img-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(180deg, rgba(24,23,21,0.1) 0%, rgba(24,23,21,0.6) 50%, rgba(24,23,21,0.85) 100%);
  }

  .champ-full-img-noise::before {
    content: '';
    position: absolute;
    inset: 0;
    opacity: 0.03;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
    background-repeat: repeat;
    background-size: 256px 256px;
    pointer-events: none;
    z-index: 1;
  }

  .champ-full-img-content {
    position: relative;
    z-index: 2;
    text-align: center;
    max-width: 640px;
  }

  @media (max-width: 767px) {
    .champ-full-img {
      height: 56vh;
      min-height: 340px;
    }
  }
</style>
