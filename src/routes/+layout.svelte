<script lang="ts">
  import { browser, dev } from '$app/environment';
  import { page } from '$app/stores';
  import '../app.css';
  import Cursor from '../components/Cursor.svelte';
  import ChampNav from '$lib/components/championship/ChampNav.svelte';
  import Footer from '$lib/components/home/Footer.svelte';
  import DevBash from '../components/DevBash.svelte';
  import { SITE_URL, SITE_NAME, DEFAULT_OG_IMAGE, seo_for, is_indexable } from '$lib/seo';
  let { children } = $props();

  let url = $derived($page.url);
  let og_img = $derived($page.data.ogImage ?? DEFAULT_OG_IMAGE);
  let meta = $derived(seo_for(url.pathname));
  let canonical = $derived(`${SITE_URL}${url.pathname === '/' ? '/' : url.pathname.replace(/\/+$/, '')}`);
  let indexable = $derived(is_indexable(url.pathname));

  const org_schema = JSON.stringify({
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': `${SITE_URL}/#organization`,
        name: 'BEEE',
        alternateName: 'Be Everything Excellent Every Day',
        url: SITE_URL,
        logo: { '@type': 'ImageObject', url: `${SITE_URL}/logo.png` },
        sameAs: [
          'https://www.instagram.com/thebeeeproject',
          'https://www.facebook.com/thebeeeproject',
          'https://www.youtube.com/@thebeeeproject',
          'https://x.com/beeeproject'
        ],
        description:
          'BEEE runs the TEAMUP™ youth development programme and the Spectacular Chess Championship in Abuja, Nigeria.',
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Abuja',
          addressCountry: 'NG'
        },
        contactPoint: {
          '@type': 'ContactPoint',
          email: 'info@beeeproject.com',
          telephone: '+234-902-682-4439',
          contactType: 'customer service',
          areaServed: 'NG',
          availableLanguage: 'en'
        }
      },
      {
        '@type': 'WebSite',
        '@id': `${SITE_URL}/#website`,
        url: SITE_URL,
        name: SITE_NAME,
        publisher: { '@id': `${SITE_URL}/#organization` },
        inLanguage: 'en-NG'
      }
    ]
  });

  $effect(() => {
    if (browser) {
      const c = $page.url.searchParams.get('c');
      if (c) localStorage.setItem('partner_c', c);
      const path = $page.url.pathname;
      if (!path.startsWith('/369') && !path.startsWith('/api/')) {
        const payload = JSON.stringify({ k: 'pv', u: $page.url.pathname + $page.url.search, r: document.referrer.slice(0, 500), c: c || localStorage.getItem('partner_c') || '' });
        try { navigator.sendBeacon?.('/api/analytics/event', payload) || fetch('/api/analytics/event', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: payload, keepalive: true }); } catch {}
        const click = (e: MouseEvent) => {
          const el = (e.target as HTMLElement)?.closest('a,button,[data-analytics]') as HTMLElement | null;
          if (!el) return;
          const info = JSON.stringify({ k: 'click', u: $page.url.pathname + $page.url.search, el: (el.getAttribute('data-analytics') || el.textContent || el.tagName).slice(0, 80) });
          try { navigator.sendBeacon?.('/api/analytics/event', info) || fetch('/api/analytics/event', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: info, keepalive: true }); } catch {}
        };
        document.addEventListener('click', click, { passive: true });
        return () => document.removeEventListener('click', click);
      }
    }
  });
</script>

<svelte:head>
  <title>{meta.title}</title>
  <meta name="description" content={meta.description} />
  <link rel="canonical" href={canonical} />
  {#if indexable}
    <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
  {:else}
    <meta name="robots" content="noindex, nofollow" />
  {/if}
  <meta property="og:site_name" content={SITE_NAME} />
  <meta property="og:title" content={meta.title} />
  <meta property="og:description" content={meta.description} />
  <meta property="og:url" content={canonical} />
  <meta property="og:type" content="website" />
  <meta property="og:image" content={og_img} />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta property="og:image:alt" content="BEEE, Be Everything Excellent Every Day" />
  <meta property="og:locale" content="en_NG" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content={meta.title} />
  <meta name="twitter:description" content={meta.description} />
  <meta name="twitter:image" content={og_img} />
  <meta name="twitter:image:alt" content="BEEE, Be Everything Excellent Every Day" />
  {@html '<script type="application/ld+json">' + org_schema + '</script>'}
</svelte:head>

<a href="#main-content" class="skip-link">Skip to main content</a>
<Cursor />
<ChampNav />
<main id="main-content" tabindex="-1">
  {@render children()}
</main>
<Footer />
{#if dev}
  <!-- <DevBash /> -->
{/if}
