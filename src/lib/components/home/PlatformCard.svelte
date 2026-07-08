<script lang="ts">
let { bg, title, body }: { bg: string; title: string; body: string } = $props();
</script>

<div class="col-span-12 md:col-span-4 rounded-3xl p-8 md:p-10 flex flex-col group" style="background:{bg}">
  <h3 class="font-hero text-2xl font-bold text-[#141413] mb-6">{@html title}</h3>
  <p class="font-['Inter'] text-[#3d3d3a] text-base leading-relaxed font-semibold">{body}</p>
</div>
