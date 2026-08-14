<script lang="ts">
  import { latest_posts } from '$lib/data/news';
  import { short_date } from '$lib/util/date';

  const posts = latest_posts(3);
</script>

<section class="news news-strip" data-testid="home-news">
  <div class="news-sheet">
    <p class="news-kicker">NEWS</p>
    <ol class="news-list">
      {#each posts as post, i (post.s)}
        <li>
          <a class="news-entry" href="/news/{post.s}">
            <span class="news-entry-i">{String(i + 1).padStart(2, '0')}</span>
            <span class="news-entry-d">{short_date(post.d)}</span>
            <span class="news-entry-t">{post.t}</span>
            <span class="news-entry-r">{post.r} min</span>
          </a>
        </li>
      {/each}
    </ol>
    <a href="/news" class="news-strip-more">All reports</a>
  </div>
</section>
