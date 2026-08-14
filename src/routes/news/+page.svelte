<script lang="ts">
  import { NEWS } from '$lib/data/news';
  import { long_date, short_date } from '$lib/util/date';

  const lead = NEWS[0];
  const rest = NEWS.slice(1);
</script>

<section class="news news-index news-sheet" data-testid="news-index">
  <p class="news-kicker">NEWS</p>
  <h1 class="news-title">Reports from the board</h1>
  <p class="news-dek">
    Results, players and what they mean for the next generation in Abuja.
  </p>

  <a class="news-lead" href="/news/{lead.s}" data-testid="news-lead">
    <p class="news-kicker">{long_date(lead.d)}</p>
    <h2 class="news-title">{lead.t}</h2>
    <p class="news-dek">{lead.x}</p>
  </a>

  {#if rest.length}
    <p class="news-kicker">Archive</p>
    <ol class="news-list" data-testid="news-list">
      {#each rest as post, i (post.s)}
        <li>
          <a class="news-entry" href="/news/{post.s}">
            <span class="news-entry-i">{String(i + 2).padStart(2, '0')}</span>
            <span class="news-entry-d">{short_date(post.d)}</span>
            <span class="news-entry-t">{post.t}</span>
            <span class="news-entry-r">{post.r} min</span>
          </a>
        </li>
      {/each}
    </ol>
  {/if}
</section>
