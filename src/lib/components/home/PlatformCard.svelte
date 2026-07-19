<script lang="ts">
let { bg, title, body, href, label = 'Learn More' }: { bg: string; title: string; body: string; href?: string; label?: string } = $props();
</script>

<div class="platform-card col-span-12 md:col-span-4 relative overflow-hidden rounded-[1.75rem] p-8 md:p-10 flex flex-col" style="background:{bg}">
  <h3 class="relative z-10 font-hero text-3xl md:text-[2.25rem] font-extrabold text-[#141413] leading-tight mb-4">{@html title}</h3>
  <p class="relative z-10 font-['Inter'] text-[#141413]/80 text-[17px] md:text-[18px] leading-[1.6] font-medium mb-8" style="white-space:pre-line">{body}</p>

  {#if href}
    <a {href} class="learn-more relative z-10 mt-auto inline-flex items-center gap-2 text-sm font-semibold text-[#141413] no-underline">
      <span class="learn-more-label">{label}</span>
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

  @media (prefers-reduced-motion: no-preference) and (hover: hover) {
    .platform-card:hover {
      transform: translateY(-8px);
      box-shadow: 0 24px 48px -16px rgba(10, 15, 26, 0.45);
    }
    .learn-more-arrow {
      display: inline-block;
      transition: transform 300ms cubic-bezier(0.22, 1, 0.36, 1);
    }
    .platform-card:hover .learn-more-arrow {
      transform: translateX(5px);
    }
  }
</style>
