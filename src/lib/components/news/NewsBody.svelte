<script lang="ts">
  import { motionStaggered } from '$lib/actions/motion';
  import type { NewsBlock } from '$lib/types/news';

  let { b }: { b: NewsBlock[] } = $props();

  const first_label = (caption: string) =>
    caption.toLowerCase().includes('categor') ? 'Category' : 'Place';
</script>

{#each b as block, i (i)}
  {#if block.k === 'p'}
    <p class="news-p">{block.t}</p>
  {:else if block.k === 'h'}
    <h2 class="news-h">{block.t}</h2>
  {:else if block.k === 'q'}
    <blockquote class="news-quote">
      {block.t}
      <cite class="news-quote-a">{block.a}</cite>
    </blockquote>
  {:else if block.k === 'f'}
    <dl class="news-facts">
      {#each block.r as fact (fact.l)}
        <div class="news-fact">
          <dt class="news-fact-l">{fact.l}</dt>
          <dd class="news-fact-v">{fact.v}</dd>
        </div>
      {/each}
    </dl>
  {:else if block.k === 'l'}
    <div class="news-ledger-wrap">
      <table class="news-ledger">
        <caption class="news-ledger-cap">{block.t}</caption>
        <thead>
          <tr class="news-row">
            <th scope="col" class="news-row-p">{first_label(block.t)}</th>
            <th scope="col" class="news-row-n">Player</th>
            <th scope="col" class="news-row-c">Fed</th>
            <th scope="col" class="news-row-v">Pts</th>
          </tr>
        </thead>
        <tbody class="news-rows" use:motionStaggered={{ stagger: 0.07, y: 12 }}>
          {#each block.r as row (row.n + row.p)}
            <tr class="news-row {row.w ? 'is-win' : ''}">
              <th scope="row" class="news-row-p">{row.p}</th>
              <td class="news-row-n">{row.n}</td>
              <td class="news-row-c">{row.c}</td>
              <td class="news-row-v">{row.v}</td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  {:else if block.k === 'n'}
    <div class="news-numeral">
      <span class="news-numeral-n">{block.n}</span>
      <span class="news-numeral-d">{block.d}</span>
      <p class="news-numeral-cap">{block.t}</p>
    </div>
  {/if}
{/each}
