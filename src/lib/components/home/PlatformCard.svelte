<script lang="ts">
let { bg, title, body, href }: { bg: string; title: string; body: string; href?: string } = $props();
</script>

<div class="col-span-12 md:col-span-4 rounded-3xl p-8 md:p-10 flex flex-col group" style="background:{bg}">
  <h3 class="font-hero text-2xl font-bold text-[#141413] mb-4">{@html title}</h3>
  <p class="font-['Inter'] text-[#141413]/80 text-[15px] leading-[1.65] font-normal mb-8" style="white-space:pre-line">{body}</p>
  {#if href}
    <a {href} class="learn-more mt-auto inline-flex items-center gap-1.5 text-sm font-semibold text-[#141413] no-underline">
      Learn More <span class="learn-more-arrow" style="display:inline-block">→</span>
    </a>
  {/if}
</div>

<style>
  .learn-more { border-bottom: 1px solid rgba(20, 20, 19, 0.35); padding-bottom: 2px; width: fit-content; }
  @media (prefers-reduced-motion: no-preference) {
    .learn-more-arrow { transition: transform 200ms cubic-bezier(0.22, 1, 0.36, 1); }
    .learn-more:hover .learn-more-arrow { transform: translateX(4px); }
  }
</style>
