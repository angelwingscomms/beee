<script lang="ts">
  import RegistrationForm from '../components/RegistrationForm.svelte';
  import ChessboardPulse from '$lib/components/ChessboardPulse.svelte';
</script>

<div class="relative">
  <a href="/chess/learn" class="absolute top-2 right-2 text-xs text-sky-500 hover:text-sky-300 transition-colors underline decoration-dotted underline-offset-2">
    learn chess with AI
  </a>
  <RegistrationForm />
  <div class="py-12">
    <ChessboardPulse />
  </div>
</div>
