<script lang="ts">
  import { motionFadeUp, motionStaggered } from '$lib/actions/motion';
  import { Check, Award, FileText, Target, Star, BookOpen, BadgeCheck } from '@lucide/svelte';

  let passport_items = [
    { icon: Award, label: 'Milestones Achieved' },
    { icon: BadgeCheck, label: 'Badges Earned' },
    { icon: BookOpen, label: 'Skills Acquired' },
    { icon: FileText, label: 'Projects Completed' },
    { icon: Star, label: 'Leadership Activities' },
    { icon: Check, label: 'Certificates Obtained' },
  ];

  let passport_img = 'https://picsum.photos/seed/passport/800/600';
</script>

<section class="passport-sec">
  <div class="passport-inner">
    <div class="passport-content" use:motionFadeUp>
      <h2 class="passport-title">Development Passport</h2>
      <p class="passport-intro">A living digital record of every achievement. Throughout the programme, participants build a Development Passport containing records of milestones, skills, projects, and more.</p>
    </div>
    <div class="passport-grid-wrap">
      <div class="passport-grid" use:motionStaggered={{ stagger: 0.08, y: 20 }}>
        {#each passport_items as { icon: Icon, label }}
          <div class="passport-item">
            <span class="passport-icon-wrap">
              <Icon size={18} />
            </span>
            <span class="passport-label">{label}</span>
          </div>
        {/each}
      </div>
      <div class="passport-visual" use:motionFadeUp>
        <div class="passport-img-frame">
          <div class="passport-img" style="background-image: url({passport_img})"></div>
        </div>
      </div>
    </div>
    <div class="passport-note-wrap" use:motionFadeUp>
      <div class="passport-note-icon">
        <Check size={14} />
      </div>
      <p class="passport-note">Parents and guardians will have access to their child's Development Passport throughout the programme.</p>
    </div>
  </div>
</section>

<style>
  .passport-sec {
    padding: 128px 0;
    background: var(--canvas);
    position: relative;
  }

  .passport-inner {
    width: min(1200px, calc(100% - 48px));
    margin: 0 auto;
  }

  .passport-content {
    text-align: center;
    margin-bottom: 56px;
  }

  .passport-title {
    font-family: var(--font-display);
    font-size: clamp(1.8rem, 3vw, 2.6rem);
    font-weight: 500;
    line-height: 1.12;
    letter-spacing: -0.01em;
    color: var(--ink);
    margin: 0;
  }

  .passport-intro {
    font-size: 16px;
    line-height: 1.6;
    color: var(--body);
    margin: 16px auto 0;
    max-width: 600px;
  }

  .passport-grid-wrap {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 48px;
    align-items: center;
  }

  .passport-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
    grid-auto-flow: dense;
  }

  .passport-item {
    display: flex;
    align-items: center;
    gap: 14px;
    padding: 20px 24px;
    border-radius: 12px;
    background: var(--surface-card);
    transition: transform 300ms var(--ease-out), background 300ms var(--ease-out);
    cursor: default;
  }

  .passport-item:hover {
    transform: translateY(-2px);
    background: color-mix(in srgb, var(--surface-card) 93%, var(--primary));
  }

  .passport-icon-wrap {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 36px;
    height: 36px;
    border-radius: 10px;
    background: var(--primary);
    color: var(--on-primary);
    flex-shrink: 0;
  }

  .passport-label {
    font-size: 15px;
    font-weight: 500;
    color: var(--ink);
  }

  .passport-visual {
    display: grid;
    place-items: center;
  }

  .passport-img-frame {
    width: min(100%, 420px);
    aspect-ratio: 4/3;
    border-radius: 14px;
    overflow: hidden;
    position: relative;
  }

  .passport-img {
    position: absolute;
    inset: 0;
    background-size: cover;
    background-position: center;
    filter: grayscale(0.3) contrast(1.1);
    transition: transform 800ms var(--ease-out);
  }

  .passport-img-frame:hover .passport-img {
    transform: scale(1.05);
  }

  .passport-note-wrap {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-top: 48px;
    padding: 20px 24px;
    border-radius: 12px;
    background: var(--surface-soft);
    max-width: 640px;
  }

  .passport-note-icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 28px;
    height: 28px;
    border-radius: 999px;
    background: var(--accent-teal);
    color: white;
    flex-shrink: 0;
  }

  .passport-note {
    font-size: 14px;
    line-height: 1.5;
    color: var(--body);
    margin: 0;
  }

  @media (--md-down) {
    .passport-grid-wrap {
      grid-template-columns: 1fr;
      gap: 40px;
    }
    .passport-visual {
      order: -1;
    }
    .passport-img-frame {
      max-width: 360px;
    }
  }

  @media (--sm-down) {
    .passport-sec {
      padding: 80px 0;
    }
    .passport-grid {
      grid-template-columns: 1fr;
    }
    .passport-item {
      padding: 16px 18px;
    }
  }
</style>