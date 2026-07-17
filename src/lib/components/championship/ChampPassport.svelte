<script lang="ts">
  import { motionStaggered, motionFadeUp } from '$lib/actions/motion';
  import { Brain, Medal, Zap, ScrollText, ClipboardCheck, Star, Users, Trophy } from '@lucide/svelte';

  let featured = [
    { icon: Brain, label: 'Skills developed', a: 'var(--primary)' },
    { icon: Zap, label: 'Points accumulated', a: 'var(--accent-teal)' },
  ];

  let regular = [
    { icon: Medal, label: 'Badges earned', a: 'var(--accent-amber)' },
    { icon: ScrollText, label: 'Certificates obtained', a: 'var(--primary)' },
    { icon: ClipboardCheck, label: 'Activities completed' },
    { icon: Star, label: 'Leadership experiences' },
    { icon: Users, label: 'Mentorship participation' },
    { icon: Trophy, label: 'Championship accomplishments' },
    { icon: Medal, label: 'Chess performance assessments', a: 'var(--accent-amber)' },
    { icon: ClipboardCheck, label: 'Attendance & consistency records' },
  ];
</script>

<section class="section-soft champ-passport" use:motionFadeUp>
  <div class="container" style="padding: 120px 0;">
    <div class="champ-passport-header">
      <h2 class="champ-passport-title">The T.E.A.M.U.P. Development Passport</h2>
      <p class="champ-passport-lede">Every registered participant receives access to a personal digital T.E.A.M.U.P. Development Passport that records their progress throughout the programme.</p>
    </div>

    <div class="passport-bento" use:motionStaggered={{ stagger: 0.07, y: 16 }}>
      {#each featured as item}
        <div class="bento-feat" style="--ca: {item.a}">
          <span class="bento-feat-iw">
            <svelte:component this={item.icon} size={24} />
          </span>
          <span class="bento-feat-l">{item.label}</span>
        </div>
      {/each}

      {#each regular as item, i}
        <div class="bento-cell" class:bento-wide={i === regular.length - 1} style="--ca: {item.a || 'var(--muted)'}">
          <span class="bento-iw">
            <svelte:component this={item.icon} size={18} />
          </span>
          <span class="bento-l">{item.label}</span>
        </div>
      {/each}

      <div class="bento-stamp">
        <div class="stamp-r">
          <span class="stamp-t">PASSPORT</span>
          <span class="stamp-d">●</span>
        </div>
      </div>
    </div>

    <div class="champ-passport-footer" use:motionFadeUp>
      <p>The Passport encourages continuous growth while giving participants a lasting record of their developmental journey.</p>
      <p class="champ-passport-note">Parents and guardians will have access to their child's Development Passport throughout the programme.</p>
    </div>
  </div>
</section>

<style>
  .champ-passport-header {
    max-width: 680px;
    margin-bottom: 56px;
  }

  .champ-passport-title {
    font-family: var(--font-display);
    font-size: clamp(1.8rem, 3vw, 2.5rem);
    font-weight: 500;
    line-height: 1.15;
    letter-spacing: -0.01em;
    color: var(--ink);
    margin: 0;
  }

  .champ-passport-lede {
    font-size: 16px;
    line-height: 1.6;
    color: var(--body);
    margin: 16px 0 0;
  }

  .passport-bento {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 12px;
    margin-bottom: 48px;
  }

  .bento-feat {
    grid-column: span 2;
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 32px 28px;
    border-radius: 12px;
    background: var(--surface-card);
    border: 1px solid var(--hairline);
    transition: transform 300ms ease, box-shadow 300ms ease;
    cursor: default;
  }

  .bento-feat:hover {
    transform: translateY(-3px);
    box-shadow: 0 12px 32px rgba(20, 20, 19, 0.08);
  }

  .bento-feat-iw {
    width: 52px;
    height: 52px;
    display: grid;
    place-items: center;
    border-radius: 14px;
    background: color-mix(in srgb, var(--ca) 18%, transparent);
    color: var(--ca);
  }

  .bento-feat-l {
    font-family: var(--font-display);
    font-size: 22px;
    font-weight: 500;
    line-height: 1.2;
    letter-spacing: -0.01em;
    color: var(--ink);
  }

  .bento-cell {
    display: flex;
    align-items: center;
    gap: 14px;
    padding: 20px 22px;
    border-radius: 12px;
    background: var(--surface-card);
    border: 1px solid var(--hairline);
    transition: transform 300ms ease, box-shadow 300ms ease, border-color 300ms ease;
    cursor: default;
  }

  .bento-cell:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(20, 20, 19, 0.06);
    border-color: color-mix(in srgb, var(--ca) 30%, var(--hairline));
  }

  .bento-wide {
    grid-column: span 2;
  }

  .bento-iw {
    width: 38px;
    height: 38px;
    display: grid;
    place-items: center;
    border-radius: 10px;
    background: var(--surface-soft);
    color: var(--ca);
    flex-shrink: 0;
  }

  .bento-cell:hover .bento-iw {
    background: color-mix(in srgb, var(--ca) 18%, var(--surface-soft));
  }

  .bento-l {
    font-size: 14px;
    line-height: 1.35;
    color: var(--body);
    transition: color 300ms ease;
  }

  .bento-cell:hover .bento-l {
    color: var(--ink);
  }

  .bento-stamp {
    display: grid;
    place-items: center;
    padding: 20px;
    border-radius: 12px;
    background: var(--surface-card);
    border: 1px solid var(--hairline);
  }

  .stamp-r {
    width: 84px;
    height: 84px;
    border-radius: 999px;
    border: 2px solid var(--hairline);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 2px;
  }

  .stamp-t {
    font-size: 9px;
    font-weight: 600;
    letter-spacing: 0.18em;
    color: var(--muted-soft);
    text-transform: uppercase;
  }

  .stamp-d {
    font-size: 6px;
    color: var(--hairline);
  }

  .champ-passport-footer p {
    font-size: 15px;
    line-height: 1.6;
    color: var(--body);
    max-width: 680px;
    margin: 0;
  }

  .champ-passport-note {
    margin-top: 12px !important;
  }

  @media (--md-down) {
    .passport-bento {
      grid-template-columns: repeat(3, 1fr);
    }
    .bento-feat {
      grid-column: span 3;
    }
    .bento-wide {
      grid-column: span 2;
    }
    .bento-stamp {
      display: none;
    }
  }

  @media (--sm-down) {
    .champ-passport-title {
      font-size: clamp(1.4rem, 5vw, 1.8rem);
    }
    .passport-bento {
      grid-template-columns: 1fr;
    }
    .bento-feat {
      grid-column: 1;
      padding: 24px 20px;
      gap: 16px;
    }
    .bento-feat-l {
      font-size: 18px;
    }
    .bento-wide {
      grid-column: 1;
    }
    .bento-cell {
      padding: 16px 18px;
    }
    .bento-stamp {
      display: none;
    }
  }
</style>
