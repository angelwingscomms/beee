<script lang="ts">
  import { BookOpenCheck, FileBadge, Handshake, Trophy } from '@lucide/svelte';
</script>

<section class="trust-bar" aria-label="BEEE trust signals">
  <div class="container trust-grid">
    <div><BookOpenCheck size={24} /><strong>Development Programme</strong><span>Progress Tracking</span></div>
    <div><FileBadge size={24} /><strong>Digital Passport</strong><span>Achievements & Badges</span></div>
    <div><Handshake size={24} /><strong>Mentorship</strong><span>Leadership & Growth</span></div>
    <div><Trophy size={24} /><strong>Championship</strong><span>Grand Finale</span></div>
  </div>
</section>

<style>
  .trust-bar {
    background: var(--canvas);
    color: var(--ink);
    padding: 28px 0;
  }

  .container {
    width: min(1180px, calc(100% - 40px));
    margin: 0 auto;
  }

  .trust-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 18px;
  }

  .trust-grid div {
    display: grid;
    gap: 7px;
    min-height: 116px;
    border-right: 1px solid var(--hairline);
    align-content: center;
    padding: 6px 22px;
  }

  .trust-grid div:last-child {
    border-right: 0;
  }

  .trust-grid svg {
    color: var(--gold-dark);
  }

  .trust-grid strong {
    color: var(--ink-dark);
    font-size: 16px;
  }

  .trust-grid span {
    color: var(--muted);
    font-size: 14px;
  }

  @media (max-width: 1023px) {
    .trust-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media (max-width: 700px) {
    .trust-grid {
      grid-template-columns: 1fr;
    }

    .trust-grid div {
      border-right: 0;
      border-bottom: 1px solid var(--hairline);
      text-align: center;
      justify-items: center;
    }
  }
</style>
