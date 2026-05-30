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
  class="fixed right-5 top-5 z-40 inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium !text-white transition-colors hover:bg-primary-active">
  learn chess with AI
</a>
