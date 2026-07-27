<script lang="ts">
  import { motionFadeUp } from '$lib/actions/motion';
  import quotesData from '$lib/data/quotes.json';
  import storiesData from '$lib/data/quotes-stories.json';
  import { seo_for } from '$lib/seo';

  let activeCategory = $state('all');
  let selectedQuote = $state<string | null>(null);

  $: allCategories = ['all', ...new Set(quotesData.map((q) => q.category))];

  $: filteredQuotes = activeCategory === 'all'
    ? quotesData
    : quotesData.filter((q) => q.category === activeCategory);

  function handleFilter(category: string) {
    activeCategory = category;
  }

  function openQuoteModal(quoteId: string) {
    selectedQuote = quoteId;
  }

  function closeQuoteModal() {
    selectedQuote = null;
  }

  const selectedQuoteData = $derived(
    selectedQuote ? quotesData.find((q) => q.id === selectedQuote) : null
  );
</script>

<div class="quotes-page" data-testid="quotes-page">
  <section class="quotes-hero" use:motionFadeUp data-testid="quotes-hero">
    <div class="quotes-hero-inner">
      <p class="quotes-eyebrow" data-testid="quotes-eyebrow">QUOTES</p>
      <h1 class="quotes-title">Chess Quotes That<br>Inspire Excellence</h1>
      <p class="quotes-subtitle">
        Motivational wisdom from chess masters, illuminating how the royal game
        builds minds, characters, and champions.
      </p>
    </div>
  </section>

  <section class="quotes-filters" use:motionFadeUp>
    <div class="container">
      <div class="filters" data-testid="quote-filters">
        {#each allCategories as category}
          <button
            class="filter-btn {activeCategory === category ? 'active' : ''}"
            onclick={() => handleFilter(category)}
            data-testid="filter-{category}"
          >
            {category === 'all' ? 'All' : category.charAt(0).toUpperCase() + category.slice(1)}
          </button>
        {/each}
      </div>
    </div>
  </section>

  <section class="quotes-grid-section" use:motionFadeUp>
    <div class="container">
      {#if filteredQuotes.length === 0}
        <div class="empty-state" data-testid="empty-state">
          <p>No quotes found for this category. Try another filter.</p>
        </div>
      {:else}
        <div class="quotes-grid">
          {#each filteredQuotes as quote (quote.id)}
            <article
              class="quote-card"
              onclick={() => openQuoteModal(quote.id)}
              use:motionFadeUp
              data-testid="quote-card-{quote.id}"
            >
              <blockquote class="quote-text">
                '{quote.text}'
              </blockquote>
              <cite class="quote-author">— {quote.author}</cite>
              <span class="quote-category" data-testid="quote-category-{quote.id}">
                {quote.category}
              </span>
            </article>
          {/each}
        </div>
      {/if}
    </div>
  </section>

  <section class="stories-section" use:motionFadeUp>
    <div class="container">
      <h2 class="stories-title">Transformations Through Chess</h2>
      <p class="stories-intro">
        Real stories of people whose lives were enriched by the beauty of chess.
      </p>
      <div class="stories-grid">
        {#each storiesData as story (story.id)}
          <article class="story-card" use:motionFadeUp data-testid="story-card-{story.id}">
            <div class="story-image-wrapper">
              <img
                src={story.image}
                alt="Portrait of {story.personName}"
                class="story-image"
                loading="lazy"
                data-testid="story-image-{story.id}"
              />
            </div>
            <div class="story-content">
              <h3 class="story-name" data-testid="story-name-{story.id}">
                {story.personName}
              </h3>
              <p class="story-title" data-testid="story-title-{story.id}">
                {story.storyTitle}
              </p>
              <p class="story-description" data-testid="story-description-{story.id}>
                {story.description}
              </p>
              {#if story.impact}
                <div class="story-impact" data-testid="story-impact-{story.id}>
                  <span class="impact-label">Chess Impact:</span>
                  <span class="impact-value">{story.impact} aspects of life positively</span>
                </div>
              {/if}
            </div>
          </article>
        {/each}
      </div>
    </div>
  </section>

  {#if selectedQuoteData}
    <div
      class="modal-overlay"
      onclick={closeQuoteModal}
      role="dialog"
      aria-modal="true"
      aria-label="Quote detail"
      data-testid="modal-overlay"
    >
      <div class="modal-content" onclick={(e) => e.stopPropagation()}>
        <button class="modal-close" onclick={closeQuoteModal} aria-label="Close modal" data-testid="modal-close">
          ×
        </button>
        <blockquote class="modal-quote-text">
          '{selectedQuoteData.text}'
        </blockquote>
        <cite class="modal-quote-author">— {selectedQuoteData.author}</cite>
        <span class="modal-quote-category">{selectedQuoteData.category}</span>
      </div>
    </div>
  {/if}
</div>

<style>
  .quotes-page {
    min-height: 100vh;
    background: var(--canvas);
    color: var(--ink);
  }

  .quotes-hero {
    position: relative;
    padding: 120px 0 80px;
    text-align: center;
    background: var(--canvas);
    overflow: hidden;
  }

  .quotes-hero::before {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(
      ellipse at center,
      rgba(242, 120, 48, 0.08) 0%,
      transparent 70%
    );
    pointer-events: none;
  }

  .quotes-hero-inner {
    position: relative;
    z-index: 1;
    max-width: 800px;
    margin: 0 auto;
    padding: 0 20px;
  }

  .quotes-eyebrow {
    font-size: 13px;
    font-weight: 600;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--primary);
    margin: 0 0 16px;
  }

  .quotes-title {
    font-family: var(--font-display);
    font-size: clamp(2.25rem, 5vw, 4rem);
    font-weight: 700;
    line-height: 1.1;
    letter-spacing: -0.02em;
    color: var(--ink);
    margin: 0;
  }

  .quotes-subtitle {
    font-size: 1.125rem;
    line-height: 1.7;
    color: var(--body);
    margin: 24px auto 0;
    max-width: 600px;
  }

  .quotes-filters {
    padding: 0 0 40px;
    background: var(--surface-soft);
  }

  .filters {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 10px;
  }

  .filter-btn {
    padding: 8px 20px;
    border: 1px solid var(--hairline);
    border-radius: 999px;
    background: var(--surface-card);
    color: var(--body);
    font-size: 0.875rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 200ms ease;
    font-family: inherit;
  }

  .filter-btn:hover {
    background: var(--surface-soft);
    color: var(--ink);
  }

  .filter-btn.active {
    background: var(--primary);
    color: white;
    border-color: var(--primary);
  }

  .quotes-grid-section {
    padding: 60px 0 80px;
  }

  .empty-state {
    text-align: center;
    padding: 60px 20px;
    color: var(--body);
    font-size: 1.125rem;
  }

  .quotes-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 24px;
  }

  .quote-card {
    background: var(--surface-card);
    border-radius: 20px;
    border: 1px solid var(--hairline);
    border-left: 4px solid var(--primary);
    padding: 28px;
    cursor: pointer;
    transition: transform 300ms ease, box-shadow 300ms ease;
  }

  @media (hover: hover) {
    .quote-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 12px 32px rgba(242, 120, 48, 0.12);
    }
  }

  .quote-text {
    font-family: var(--font-display);
    font-size: 1.125rem;
    line-height: 1.7;
    font-style: italic;
    color: var(--ink);
    margin: 0 0 20px;
  }

  .quote-author {
    display: block;
    font-size: 0.9375rem;
    font-weight: 600;
    color: var(--primary);
    margin-bottom: 10px;
  }

  .quote-category {
    font-size: 0.75rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: var(--body-strong);
    opacity: 0.75;
  }

  .stories-section {
    padding: 60px 0 100px;
    background: var(--surface-soft);
  }

  .stories-title {
    font-family: var(--font-display);
    font-size: clamp(1.75rem, 3vw, 2.5rem);
    font-weight: 700;
    text-align: center;
    color: var(--ink);
    margin: 0 0 8px;
  }

  .stories-intro {
    text-align: center;
    color: var(--body);
    max-width: 560px;
    margin: 0 auto 48px;
    line-height: 1.6;
  }

  .stories-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
    gap: 28px;
  }

  .story-card {
    background: white;
    border-radius: 24px;
    overflow: hidden;
    box-shadow: 0 2px 16px rgba(0, 0, 0, 0.06);
    border: 1px solid rgba(242, 120, 48, 0.08);
    transition: transform 300ms ease, box-shadow 300ms ease;
  }

  @media (hover: hover) {
    .story-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 12px 40px rgba(242, 120, 48, 0.12);
    }
  }

  .story-image-wrapper {
    width: 100%;
    height: 240px;
    overflow: hidden;
  }

  .story-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  .story-content {
    padding: 24px;
  }

  .story-name {
    font-family: var(--font-display);
    font-size: 1.25rem;
    font-weight: 600;
    color: var(--ink);
    margin: 0 0 4px;
  }

  .story-title {
    font-size: 0.8125rem;
    font-weight: 600;
    color: var(--primary);
    text-transform: uppercase;
    letter-spacing: 0.06em;
    margin: 0 0 12px;
  }

  .story-description {
    font-size: 0.9375rem;
    line-height: 1.7;
    color: var(--body);
    margin: 0 0 16px;
  }

  .story-impact {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 0.8125rem;
    font-weight: 500;
    color: var(--primary);
  }

  .impact-label {
    font-weight: 600;
  }

  .modal-overlay {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.55);
    backdrop-filter: blur(6px);
    z-index: 1000;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
    animation: fadeInOverlay 250ms ease;
  }

  .modal-content {
    background: white;
    border-radius: 24px;
    padding: 40px;
    max-width: 560px;
    width: 100%;
    position: relative;
    animation: scaleInModal 300ms ease;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);
  }

  .modal-close {
    position: absolute;
    top: 16px;
    right: 16px;
    width: 36px;
    height: 36px;
    border: none;
    background: var(--surface-soft);
    border-radius: 50%;
    font-size: 1.25rem;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background 200ms ease, transform 200ms ease;
    color: var(--body);
  }

  .modal-close:hover {
    background: var(--primary);
    color: white;
  }

  .modal-quote-text {
    font-family: var(--font-display);
    font-size: clamp(1.25rem, 2vw, 1.5rem);
    line-height: 1.7;
    font-style: italic;
    color: var(--ink);
    margin: 0 0 24px;
  }

  .modal-quote-author {
    display: block;
    font-size: 1.125rem;
    font-weight: 600;
    color: var(--primary);
    margin-bottom: 8px;
  }

  .modal-quote-category {
    font-size: 0.8125rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: var(--body-strong);
    opacity: 0.75;
  }

  @keyframes fadeInOverlay {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  @keyframes scaleInModal {
    from { opacity: 0; transform: scale(0.92); }
    to { opacity: 1; transform: scale(1); }
  }

  @media (--sm-down) {
    .quotes-hero {
      padding: 80px 0 60px;
    }

    .quotes-title {
      font-size: 2rem;
    }

    .quotes-subtitle {
      font-size: 1rem;
    }

    .quotes-grid {
      grid-template-columns: 1fr;
      gap: 16px;
    }

    .quote-card {
      padding: 24px;
    }

    .stories-grid {
      grid-template-columns: 1fr;
      gap: 20px;
    }

    .story-image-wrapper {
      height: 200px;
    }

    .modal-content {
      padding: 24px;
    }
  }
</style>