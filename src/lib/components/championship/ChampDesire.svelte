<script lang="ts">
  import { motionFadeUp } from '$lib/actions/motion';

  const frames = [
    {
      title: 'The board is set. Your opponent is waiting.',
      body: "Sixty-four squares. Thirty-two pieces. One clock. Every opening you've practiced, every endgame you've studied \u2014 this is where they meet the moment. The silence just before the first move. That's where champions are made.",
      symbol: '\u265F',
      gradient: 'linear-gradient(135deg, rgba(60, 120, 200, 0.10), transparent 60%)'
    },
    {
      title: "The real win isn't the trophy. It's who you become",
      body: "Under pressure, the noise fades. The mind sharpens. You start to see patterns you couldn't see before. Composure. Clarity. The confidence of someone who's learned to think before they move. That doesn't leave when the game ends.",
      symbol: '\u265E',
      gradient: 'linear-gradient(135deg, rgba(255, 178, 0, 0.10), transparent 60%)'
    },
    {
      title: 'What you learn here moves with you.',
      body: "The championship is one summer. What it teaches you lasts a lifetime. Sharper instincts. Steadier nerves. The quiet belief that hard problems have answers. Not everyone takes a trophy home. Everyone carries something forward.",
      symbol: '\u265A',
      gradient: 'linear-gradient(135deg, rgba(93, 184, 166, 0.10), transparent 60%)'
    }
  ];
</script>

<section class="section-dark champ-desire">
  <div class="container">
    <div class="champ-desire-inner">
      <div class="champ-desire-pinned">
        <h2 class="champ-desire-heading">A Trophy Has Your Name On It</h2>
        <p class="champ-desire-lede">One summer. One championship. One shot at being the first.</p>
      </div>
      <div class="champ-desire-frames">
        {#each frames as frame, i}
          <article class="champ-desire-frame" style="--i: {i}" use:motionFadeUp>
            <div class="champ-desire-frame-visual" style="background: {frame.gradient}">
              <span class="champ-desire-frame-symbol">{frame.symbol}</span>
            </div>
            <div class="champ-desire-frame-body">
              <h3 class="champ-desire-frame-title">{frame.title}</h3>
              <p class="champ-desire-frame-text">{frame.body}</p>
            </div>
          </article>
        {/each}
      </div>
    </div>
  </div>
</section>

<style>
  .champ-desire-inner {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 80px;
    padding: 120px 0;
    position: relative;
    z-index: 1;
  }

  .champ-desire-pinned {
    position: sticky;
    top: 50vh;
    transform: translateY(-50%);
    align-self: start;
  }

  .champ-desire-heading {
    font-family: var(--font-display);
    font-size: clamp(2rem, 4vw, 3.5rem);
    font-weight: 500;
    line-height: 1.1;
    letter-spacing: -0.01em;
    color: var(--on-dark);
    margin: 0;
    text-wrap: balance;
  }

  .champ-desire-lede {
    font-size: 17px;
    line-height: 1.6;
    color: var(--on-dark-soft);
    margin: 20px 0 0;
    max-width: 400px;
  }

  .champ-desire-frames {
    display: grid;
    gap: 48px;
  }

  .champ-desire-frame {
    min-height: 80vh;
    border-radius: 20px;
    background: var(--surface-dark-elevated);
    border: 1px solid rgba(250, 249, 245, 0.08);
    overflow: hidden;
    display: grid;
    grid-template-rows: 320px 1fr;
    transition: transform 400ms ease, box-shadow 400ms ease;
  }

  .champ-desire-frame:hover {
    transform: translateY(-4px);
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  }

  .champ-desire-frame-visual {
    position: relative;
    display: grid;
    place-items: center;
    overflow: hidden;
    background-color: var(--surface-dark-soft);
  }

  .champ-desire-frame-symbol {
    font-size: 100px;
    line-height: 1;
    opacity: 0.12;
    transition: transform 500ms ease, opacity 500ms ease;
  }

  .champ-desire-frame:hover .champ-desire-frame-symbol {
    transform: scale(1.12);
    opacity: 0.22;
  }

  .champ-desire-frame-body {
    padding: 44px 40px;
  }

  .champ-desire-frame-title {
    font-family: var(--font-display);
    font-size: clamp(1.35rem, 2.2vw, 1.65rem);
    font-weight: 500;
    line-height: 1.2;
    letter-spacing: -0.01em;
    color: var(--on-dark);
    margin: 0;
  }

  .champ-desire-frame-text {
    font-size: 16px;
    line-height: 1.7;
    color: var(--on-dark-soft);
    margin: 16px 0 0;
  }

  @media (max-width: 1024px) {
    .champ-desire-inner {
      gap: 56px;
    }

    .champ-desire-pinned {
      top: 40vh;
    }

    .champ-desire-frame {
      min-height: 70vh;
      grid-template-rows: 260px 1fr;
    }
  }

  @media (max-width: 767px) {
    .champ-desire-inner {
      grid-template-columns: 1fr;
      gap: 36px;
      padding: 80px 0;
    }

    .champ-desire-pinned {
      position: static;
      transform: none;
    }

    .champ-desire-lede {
      max-width: none;
    }

    .champ-desire-frames {
      gap: 28px;
    }

    .champ-desire-frame {
      min-height: auto;
      grid-template-rows: 200px 1fr;
    }

    .champ-desire-frame-body {
      padding: 28px 24px;
    }

    .champ-desire-frame-symbol {
      font-size: 72px;
    }
  }
</style>
