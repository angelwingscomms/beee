<script lang="ts">
  import RegistrationForm from '../components/RegistrationForm.svelte';
  import ChessboardPulse from '$lib/components/ChessboardPulse.svelte';
</script>

<RegistrationForm />
<div class="py-12">
  <ChessboardPulse />
</div>

<a
  href="/chess/learn"
  class="fixed right-5 top-5 z-40 inline-flex items-center gap-1.5 rounded-full bg-primary px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-primary-active">
  learn chess with AI
</a>
