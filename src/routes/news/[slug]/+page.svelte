<script lang="ts">
  import NewsBody from '$lib/components/news/NewsBody.svelte';
  import { SITE_URL, SITE_NAME } from '$lib/seo';
  import { long_date } from '$lib/util/date';

  let { data } = $props();

  const p = $derived(data.p);
  const url = $derived(`${SITE_URL}/news/${p.s}`);

  const schema = $derived(
    JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'NewsArticle',
      headline: p.t,
      description: p.m,
      datePublished: p.d,
      dateModified: p.d,
      inLanguage: 'en-NG',
      author: { '@type': 'Organization', name: p.a, url: SITE_URL },
      publisher: { '@id': `${SITE_URL}/#organization`, '@type': 'Organization', name: SITE_NAME },
      mainEntityOfPage: { '@type': 'WebPage', '@id': url },
      isBasedOn: p.o.map((s) => s.u)
    })
  );
</script>

<svelte:head>
  {@html '<script type="application/ld+json">' + schema + '</script>'}
</svelte:head>

<article class="news news-sheet" data-testid="news-post">
  <p class="news-kicker">{p.k}</p>
  <h1 class="news-title">{p.t}</h1>
  <p class="news-dek">{p.x}</p>
  <div class="news-meta">
    <span>{p.a}</span>
    <span>{long_date(p.d)}</span>
    <span>{p.r} min read</span>
  </div>

  <NewsBody b={p.b} />

  <h2 class="news-h">Sources</h2>
  <ol class="news-sources" data-testid="news-sources">
    {#each p.o as source (source.u)}
      <li class="news-source">
        <a href={source.u} target="_blank" rel="noopener noreferrer">{source.t}</a>
      </li>
    {/each}
  </ol>

  <a href="/news" class="news-strip-more">All reports</a>
</article>
