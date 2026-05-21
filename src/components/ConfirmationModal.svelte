<script lang="ts">
  interface Player {
    name: string;
    email: string;
    chessRating: string;
  }

  export let schoolName: string;
  export let players: Player[];
  export let amount: number;
  export let isProcessing: boolean;
  export let onConfirm: () => void;
  export let onCancel: () => void;
</script>

<div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
  <div class="bg-secondary rounded-lg max-w-2xl w-full max-h-96 overflow-y-auto border-2 border-primary">
    <div class="p-8">
      <h2 class="text-2xl font-bold text-foreground mb-6">Confirm Registration</h2>

      <!-- School Info -->
      <div class="mb-6 pb-6 border-b border-secondary-light">
        <p class="text-sm text-muted mb-1">School</p>
        <p class="text-lg font-semibold text-foreground">{schoolName}</p>
      </div>

      <!-- Players Summary -->
      <div class="mb-6 pb-6 border-b border-secondary-light">
        <p class="text-sm text-muted mb-3">Team Members</p>
        <div class="space-y-2">
          {#each players as player, index (index)}
            <div class="flex justify-between items-center text-sm">
              <span class="text-foreground">
                <span class="font-medium">{player.name}</span>
                <span class="text-muted"> • {player.chessRating}</span>
              </span>
            </div>
          {/each}
        </div>
      </div>

      <!-- Payment Summary -->
      <div class="mb-8 p-4 bg-primary bg-opacity-10 border-2 border-primary rounded-lg">
        <div class="flex justify-between items-center">
          <p class="text-foreground font-semibold">Total Amount</p>
          <p class="text-2xl font-bold text-primary">₦{amount.toLocaleString()}</p>
        </div>
        <p class="text-sm text-muted mt-2">
          Payment will be processed through Paystack
        </p>
      </div>

      <!-- Action Buttons -->
      <div class="flex gap-4">
        <button
          type="button"
          on:click={onCancel}
          disabled={isProcessing}
          class="flex-1 px-6 py-3 border-2 border-secondary-light rounded-lg text-foreground hover:bg-secondary disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-semibold"
        >
          Cancel
        </button>
        <button
          type="button"
          on:click={onConfirm}
          disabled={isProcessing}
          class="flex-1 px-6 py-3 bg-primary hover:bg-primary-dark disabled:opacity-50 disabled:cursor-not-allowed text-background rounded-lg transition-colors font-semibold"
        >
          {isProcessing ? 'Processing...' : 'Confirm & Pay'}
        </button>
      </div>
    </div>
  </div>
</div>

<style>
  :global(body) {
    overflow: hidden;
  }
</style>
