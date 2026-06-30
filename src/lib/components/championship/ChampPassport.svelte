<script lang="ts">
  import { motionFadeUp } from '$lib/actions/motion';
</script>

<section class="section-dark champ-passport" use:motionFadeUp>
  <div class="container" style="padding: 120px 0;">
    <div class="champ-passport-header">
      <h2 class="champ-passport-title">The T.E.A.M.U.P. Development Passport</h2>
      <p class="champ-passport-lede">Every registered participant receives access to a personal digital T.E.A.M.U.P. Development Passport.</p>
      <p class="champ-passport-desc">The Passport records each participant's progress throughout the programme, including:</p>
    </div>
    <div class="champ-passport-grid">
      <div class="champ-passport-item">
        <span class="champ-passport-icon">&#10003;</span>
        <span>Skills developed</span>
      </div>
      <div class="champ-passport-item">
        <span class="champ-passport-icon">&#10003;</span>
        <span>Activities completed</span>
      </div>
      <div class="champ-passport-item">
        <span class="champ-passport-icon">&#10003;</span>
        <span>Achievement badges earned</span>
      </div>
      <div class="champ-passport-item">
        <span class="champ-passport-icon">&#10003;</span>
        <span>Passport points accumulated</span>
      </div>
      <div class="champ-passport-item">
        <span class="champ-passport-icon">&#10003;</span>
        <span>Certificates obtained</span>
      </div>
      <div class="champ-passport-item">
        <span class="champ-passport-icon">&#10003;</span>
        <span>Leadership experiences</span>
      </div>
      <div class="champ-passport-item">
        <span class="champ-passport-icon">&#10003;</span>
        <span>Mentorship participation</span>
      </div>
      <div class="champ-passport-item">
        <span class="champ-passport-icon">&#10003;</span>
        <span>Championship accomplishments</span>
      </div>
    </div>
    <p class="champ-passport-footer">The Passport encourages continuous growth while giving participants a lasting record of their developmental journey.</p>
  </div>
</section>

<style>
  .champ-passport-header {
    max-width: 680px;
    margin-bottom: 48px;
  }

  .champ-passport-title {
    font-family: var(--font-display);
    font-size: clamp(1.8rem, 3vw, 2.5rem);
    font-weight: 500;
    line-height: 1.15;
    letter-spacing: -0.01em;
    color: var(--on-dark);
    margin: 0;
  }

  .champ-passport-lede {
    font-size: 16px;
    line-height: 1.6;
    color: var(--on-dark-soft);
    margin: 16px 0 0;
  }

  .champ-passport-desc {
    font-size: 16px;
    line-height: 1.6;
    color: var(--on-dark-soft);
    margin: 20px 0 0;
  }

  .champ-passport-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 16px;
    margin-bottom: 40px;
  }

  .champ-passport-item {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 16px 20px;
    border-radius: 12px;
    background: var(--surface-dark-elevated);
    border: 1px solid rgba(250, 249, 245, 0.06);
    font-size: 14px;
    line-height: 1.4;
    color: var(--on-dark-soft);
  }

  .champ-passport-icon {
    flex-shrink: 0;
    width: 20px;
    height: 20px;
    display: grid;
    place-items: center;
    border-radius: 999px;
    background: var(--primary);
    color: var(--on-primary);
    font-size: 11px;
    font-weight: 600;
    line-height: 1;
  }

  .champ-passport-footer {
    font-size: 15px;
    line-height: 1.6;
    color: var(--on-dark-soft);
    max-width: 680px;
    margin: 0;
  }

  @media (max-width: 1024px) {
    .champ-passport-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media (max-width: 767px) {
    .champ-passport-grid {
      grid-template-columns: 1fr;
    }
  }
</style>
