<script lang="ts">
  import { revealLines, revealChildren } from '$lib/motion/reveal';
  import { glSection } from '$lib/gl/store';

  const PLATFORMS = [
    { index: '01', name: 'e4', name_role: 'THE AI CHESS COACH', body: "Live analysis of every move, answers in voice or text, and puzzles built from your child's own mistakes.", link_label: 'Meet e4 →', href: '/e4' },
    { index: '02', name: 'TEAMUP', name_role: 'THE DEVELOPMENT PROGRAMME', body: 'Technology, Enterprise, Art, Mentorship, Upskill. The journey beyond the board.', link_label: 'Explore TEAMUP →', href: '/teamup' },
    { index: '03', name: 'Taskify', name_role: 'THE DEVELOPMENT PASSPORT', body: 'Every badge, milestone and certificate, recorded where parents can see it.', link_label: 'Open the passport →', href: '/taskify' }
  ];
</script>

<section id="platforms" class="rv-field-cloud rv-section" use:glSection={'ambient'}>
  <div class="rv-wrap">
    <p class="rv-micro platforms-eyebrow">THE THREE PLATFORMS</p>
    <h2 class="rv-d2" use:revealLines>Registered on day one.<br />Equipped from day one.</h2>

    <div class="platforms-rows" use:revealChildren>
      {#each PLATFORMS as p (p.index)}
        <div class="rv-row platforms-row">
          <span class="rv-micro">{p.index}</span>
          <div class="platforms-name-col">
            <p class="rv-title">{p.name}<sup class="platforms-tm">™</sup></p>
            <p class="rv-micro platforms-role">{p.name_role}</p>
          </div>
          <p class="rv-body platforms-desc">{p.body}</p>
          <a href={p.href} class="rv-link platforms-link">{p.link_label}</a>
        </div>
      {/each}
    </div>
  </div>
</section>

<style>
  .platforms-eyebrow { color: var(--beam); }
  .platforms-rows { margin-top: var(--space-6); }

  .platforms-row {
    grid-template-columns: 64px 1fr;
    row-gap: 8px;
  }

  .platforms-tm { font-size: 60%; }
  .platforms-role { color: var(--muted); margin-top: 4px; }
  .platforms-desc { grid-column: 2; }
  .platforms-link {
    grid-column: 2;
    font-family: var(--font-sans);
    font-size: 15px;
    font-weight: 600;
    justify-self: start;
  }

  .platforms-row:hover {
    background: color-mix(in srgb, var(--beam) 4%, transparent);
    transition: background 300ms;
  }

  @media (--md-up) {
    .platforms-row {
      grid-template-columns: 64px 1fr 1fr auto;
      row-gap: 0;
      align-items: center;
    }
    .platforms-desc { grid-column: auto; }
    .platforms-link { grid-column: auto; }
  }
</style>
