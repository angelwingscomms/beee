<script lang="ts">
  import { motionFadeUp } from '$lib/actions/motion';
</script>

<section id="champ-intro" class="champ-intro" use:motionFadeUp>
  <div class="container">
    <div class="champ-intro-inner">
      <p class="champ-intro-lede">The BEEE Spectacular Chess Championship Abuja 2026 is a unique youth development initiative that combines competitive chess with leadership development, mentorship, creativity, innovation, and personal growth through the T.E.A.M.U.P.&trade; (Technology, Enterprise, Art, Mentorship and Upskill) Development Programme.</p>
      <div class="champ-intro-ruler"></div>
      <p class="champ-intro-body">Designed for chess players aged 10&ndash;14 years in schools across Abuja, the programme provides participants with a structured journey of learning, achievement, and competition that extends far beyond the chessboard.</p>
    </div>
  </div>
</section>

<style>
  .champ-intro {
    background: var(--canvas);
    padding: 96px 0;
  }

  .champ-intro-inner {
    max-width: 720px;
    margin: 0 auto;
  }

  .champ-intro-lede {
    margin: 0;
    font-family: var(--font-display);
    font-size: clamp(1.3rem, 2.2vw, 1.7rem);
    font-weight: 500;
    line-height: 1.5;
    letter-spacing: -0.01em;
    color: var(--ink);
  }

  .champ-intro-ruler {
    width: 48px;
    height: 2px;
    background: var(--primary);
    margin: 32px 0;
  }

  .champ-intro-body {
    margin: 0;
    font-size: 16px;
    line-height: 1.7;
    color: var(--body);
  }

  @media (--sm-down) {
    .champ-intro {
      padding: 64px 0;
    }
    .champ-intro-lede {
      font-size: clamp(1.1rem, 4vw, 1.3rem);
    }
    .champ-intro-body {
      font-size: 15px;
    }
  }
</style>
