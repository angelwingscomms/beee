<script lang="ts">
let { bg, title, body, href }: { bg: string; title: string; body: string; href?: string } = $props();
</script>

<div class="col-span-12 md:col-span-4 rounded-3xl p-8 md:p-10 flex flex-col group" style="background:{bg}">
  <h3 class="font-hero text-2xl font-bold text-[#141413] mb-6">{@html title}</h3>
  <p class="font-['Inter'] text-[#3d3d3a] text-base leading-relaxed font-semibold mb-6" style="white-space:pre-line">{body}</p>
  {#if href}
    <a {href} class="mt-auto inline-flex items-center gap-1 text-sm font-semibold text-black no-underline">
      Learn More <span style="display:inline-block">→</span>
    </a>
  {/if}
</div>
