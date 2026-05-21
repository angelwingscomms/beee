<script lang="ts">
  export let index: number;
  export let player: { name: string; email: string; chessRating: string };
  export let errors: Record<string, string> = {};
  export let onChange: (field: string, value: string) => void;

  const ratingLevels = ['Beginner', 'Intermediate', 'Advanced', 'Expert'];
</script>

<div class="border-l-4 border-primary pl-6 py-4">
  <h3 class="text-lg font-semibold text-foreground mb-4">Player {index + 1}</h3>

  <div class="space-y-4">
    <div>
      <label for="player_{index}_name" class="block text-sm font-medium text-foreground mb-2">
        Full Name *
      </label>
      <input
        type="text"
        id="player_{index}_name"
        value={player.name}
        on:input={(e) => onChange('name', e.currentTarget.value)}
        placeholder="Enter player full name"
        class="w-full px-4 py-2 rounded-lg border-2 focus:outline-none focus:border-primary"
      />
      {#if errors[`player_${index}_name`]}
        <p class="text-red-500 text-sm mt-1">{errors[`player_${index}_name`]}</p>
      {/if}
    </div>

    <div>
      <label for="player_{index}_email" class="block text-sm font-medium text-foreground mb-2">
        Email *
      </label>
      <input
        type="email"
        id="player_{index}_email"
        value={player.email}
        on:input={(e) => onChange('email', e.currentTarget.value)}
        placeholder="player@example.com"
        class="w-full px-4 py-2 rounded-lg border-2 focus:outline-none focus:border-primary"
      />
      {#if errors[`player_${index}_email`]}
        <p class="text-red-500 text-sm mt-1">{errors[`player_${index}_email`]}</p>
      {/if}
    </div>

    <div>
      <label for="player_{index}_rating" class="block text-sm font-medium text-foreground mb-2">
        Chess Rating Level *
      </label>
      <select
        id="player_{index}_rating"
        value={player.chessRating}
        on:change={(e) => onChange('chessRating', e.currentTarget.value)}
        class="w-full px-4 py-2 rounded-lg border-2 focus:outline-none focus:border-primary"
      >
        <option value="">Select a rating level</option>
        {#each ratingLevels as level}
          <option value={level}>{level}</option>
        {/each}
      </select>
      {#if errors[`player_${index}_chessRating`]}
        <p class="text-red-500 text-sm mt-1">{errors[`player_${index}_chessRating`]}</p>
      {/if}
    </div>
  </div>
</div>
