<script lang="ts">
let { bg, title, body, href, index = '', tag = '' }: { bg: string; title: string; body: string; href?: string; index?: string; tag?: string } = $props();
</script>

<div class="platform-card col-span-12 md:col-span-4 relative overflow-hidden rounded-[1.75rem] p-8 md:p-10 flex flex-col" style="background:{bg}">
  <span class="deco-orb" aria-hidden="true"></span>

  <div class="relative z-10 flex items-center justify-between mb-8">
    <span class="font-hero text-sm font-bold tracking-[0.2em] text-[#141413]/45">{index}</span>
    {#if tag}
      <span class="font-hero text-[10px] font-bold uppercase tracking-[0.18em] text-[#141413]/60 border border-[#141413]/20 rounded-full px-3 py-1">{tag}</span>
    {/if}
  </div>

  <h3 class="relative z-10 font-hero text-2xl md:text-[1.75rem] font-bold text-[#141413] leading-tight mb-4">{@html title}</h3>
  <p class="relative z-10 font-['Inter'] text-[#141413]/75 text-[15px] leading-[1.7] font-normal mb-8" style="white-space:pre-line">{body}</p>

  {#if href}
    <a {href} class="learn-more relative z-10 mt-auto inline-flex items-center gap-2 text-sm font-semibold text-[#141413] no-underline">
      <span class="learn-more-label">Learn More</span>
      <span class="learn-more-arrow" aria-hidden="true">&rarr;</span>
    </a>
  {/if}
</div>

<style>
  .platform-card {
    transition: transform 500ms cubic-bezier(0.22, 1, 0.36, 1), box-shadow 500ms cubic-bezier(0.22, 1, 0.36, 1);
    box-shadow: 0 1px 2px rgba(10, 15, 26, 0.08);
    will-change: transform;
  }

  .deco-orb {
    position: absolute;
    top: -35%;
    right: -20%;
    width: 60%;
    aspect-ratio: 1;
    border-radius: 9999px;
    background: rgba(255, 255, 255, 0.35);
    filter: blur(10px);
    transform: scale(0.6);
    opacity: 0;
    transition: transform 700ms cubic-bezier(0.22, 1, 0.36, 1), opacity 700ms ease;
    pointer-events: none;
  }

  .learn-more::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: -3px;
    width: 100%;
    height: 1px;
    background: rgba(20, 20, 19, 0.35);
    transform-origin: left;
    transition: transform 400ms cubic-bezier(0.22, 1, 0.36, 1);
  }

  @media (prefers-reduced-motion: no-preference) and (hover: hover) {
    .platform-card:hover {
      transform: translateY(-8px);
      box-shadow: 0 24px 48px -16px rgba(10, 15, 26, 0.45);
    }
    .platform-card:hover .deco-orb {
      transform: scale(1.15);
      opacity: 1;
    }
    .learn-more-arrow {
      display: inline-block;
      transition: transform 300ms cubic-bezier(0.22, 1, 0.36, 1);
    }
    .platform-card:hover .learn-more-arrow {
      transform: translateX(5px);
    }
    .platform-card:hover .learn-more::after {
      transform: scaleX(0);
    }
    .learn-more::before {
      content: '';
      position: absolute;
      left: 0;
      bottom: -3px;
      width: 100%;
      height: 1px;
      background: #141413;
      transform: scaleX(0);
      transform-origin: right;
      transition: transform 400ms cubic-bezier(0.22, 1, 0.36, 1);
    }
    .platform-card:hover .learn-more::before {
      transform: scaleX(1);
      transform-origin: left;
      transition-delay: 120ms;
    }
  }
</style>
