<script lang="ts">
  import { writable } from 'svelte/store';
  import LocationSelector from './LocationSelector.svelte';
  import PlayerForm from './PlayerForm.svelte';
  import ConfirmationModal from './ConfirmationModal.svelte';
  import { z } from 'zod';

  interface Player {
    name: string;
    email: string;
    chessRating: string;
  }

  interface FormData {
    schoolName: string;
    schoolEmail: string;
    schoolPhone: string;
    location: { lat: number; lng: number; address: string } | null;
    players: Player[];
  }

  let schoolName = '';
  let schoolEmail = '';
  let schoolPhone = '';
  let players: Player[] = [
    { name: '', email: '', chessRating: '' },
    { name: '', email: '', chessRating: '' },
    { name: '', email: '', chessRating: '' },
    { name: '', email: '', chessRating: '' },
  ];
  let location: { lat: number; lng: number; address: string } | null = null;
  let showConfirmation = false;
  let isProcessing = false;
  let errors: Record<string, string> = {};

  const REGISTRATION_AMOUNT = 50000;

  const schoolSchema = z.object({
    schoolName: z.string().min(2, 'School name must be at least 2 characters'),
    schoolEmail: z.string().email('Invalid email address'),
    schoolPhone: z.string().regex(/^[\d\s\-\+\(\)]+$/, 'Invalid phone number'),
  });

  const playerSchema = z.object({
    name: z.string().min(2, 'Player name must be at least 2 characters'),
    email: z.string().email('Invalid email address'),
    chessRating: z.string().min(1, 'Chess rating is required'),
  });

  function validateForm() {
    errors = {};

    const schoolValidation = schoolSchema.safeParse({
      schoolName,
      schoolEmail,
      schoolPhone,
    });

    if (!schoolValidation.success) {
      schoolValidation.error.errors.forEach((error) => {
        errors[error.path[0] as string] = error.message;
      });
    }

    if (!location) {
      errors['location'] = 'Please select a location';
    }

    players.forEach((player, index) => {
      const playerValidation = playerSchema.safeParse(player);
      if (!playerValidation.success) {
        playerValidation.error.errors.forEach((error) => {
          errors[`player_${index}_${error.path[0]}`] = error.message;
        });
      }
    });

    return Object.keys(errors).length === 0;
  }

  function handleLocationChange(event: CustomEvent) {
    location = event.detail;
  }

  function handlePlayerChange(index: number, field: keyof Player, value: string) {
    players[index][field] = value;
  }

  async function handleSubmit() {
    if (!validateForm()) {
      return;
    }

    showConfirmation = true;
  }

  async function confirmPayment() {
    isProcessing = true;

    try {
      // Mock API call to register
      const registerResponse = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          schoolName,
          schoolEmail,
          schoolPhone,
          location,
          players,
        }),
      });

      const registerData = await registerResponse.json();

      if (!registerResponse.ok) {
        alert('Registration failed: ' + registerData.message);
        isProcessing = false;
        return;
      }

      // Initialize Paystack payment
      const paymentResponse = await fetch('/api/payment/initialize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: REGISTRATION_AMOUNT,
          email: schoolEmail,
          schoolName,
          registrationId: registerData.registrationId,
        }),
      });

      const paymentData = await paymentResponse.json();

      if (!paymentResponse.ok) {
        alert('Payment initialization failed: ' + paymentData.message);
        isProcessing = false;
        return;
      }

      // Redirect to Paystack (in a real app)
      // For demo, we'll show success
      console.log('[v0] Payment initialized:', paymentData);

      // Mock payment success
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Send confirmation email
      await fetch('/api/email/confirm', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: schoolEmail,
          schoolName,
          registrationId: registerData.registrationId,
          amount: REGISTRATION_AMOUNT,
        }),
      });

      showConfirmation = false;
      isProcessing = false;

      // Show success message
      alert(
        'Registration successful! A confirmation email has been sent to ' + schoolEmail
      );

      // Reset form
      schoolName = '';
      schoolEmail = '';
      schoolPhone = '';
      location = null;
      players = [
        { name: '', email: '', chessRating: '' },
        { name: '', email: '', chessRating: '' },
        { name: '', email: '', chessRating: '' },
        { name: '', email: '', chessRating: '' },
      ];
      errors = {};
    } catch (error) {
      console.error('[v0] Payment error:', error);
      alert('An error occurred. Please try again.');
      isProcessing = false;
    }
  }
</script>

<div style="min-height: 100vh; background: linear-gradient(to bottom right, rgb(15,23,42), rgb(30,41,59), rgb(15,23,42)); padding: 3rem 1rem;">
  <div style="max-width: 56rem; margin: 0 auto;">
    <!-- Header -->
    <div style="text-align: center; margin-bottom: 3rem;">
      <h1 style="font-size: 3rem; font-weight: bold; color: rgb(6, 182, 212); margin-bottom: 0.75rem;">BEEE TEAMUP</h1>
      <p style="font-size: 1.5rem; color: rgb(241, 245, 249); font-weight: 600; margin-bottom: 0.5rem;">Chess Tournament Registration</p>
      <p style="color: rgb(148, 163, 184); font-size: 1.125rem;">Register your 4-player team for ₦{REGISTRATION_AMOUNT.toLocaleString()}</p>
    </div>

    <form on:submit|preventDefault={handleSubmit} class="space-y-8">
      <!-- School Information Section -->
      <div class="bg-secondary rounded-lg p-8 border border-secondary-light">
        <h2 class="text-2xl font-bold text-foreground mb-6">School Information</h2>

        <div class="space-y-4">
          <div>
            <label for="schoolName" class="block text-sm font-medium text-foreground mb-2">
              School Name *
            </label>
            <input
              type="text"
              id="schoolName"
              bind:value={schoolName}
              placeholder="Enter your school name"
              class="w-full px-4 py-2 rounded-lg border-2 focus:outline-none focus:border-primary"
            />
            {#if errors.schoolName}
              <p class="text-red-500 text-sm mt-1">{errors.schoolName}</p>
            {/if}
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label for="schoolEmail" class="block text-sm font-medium text-foreground mb-2">
                School Email *
              </label>
              <input
                type="email"
                id="schoolEmail"
                bind:value={schoolEmail}
                placeholder="school@example.com"
                class="w-full px-4 py-2 rounded-lg border-2 focus:outline-none focus:border-primary"
              />
              {#if errors.schoolEmail}
                <p class="text-red-500 text-sm mt-1">{errors.schoolEmail}</p>
              {/if}
            </div>

            <div>
              <label for="schoolPhone" class="block text-sm font-medium text-foreground mb-2">
                Phone Number *
              </label>
              <input
                type="tel"
                id="schoolPhone"
                bind:value={schoolPhone}
                placeholder="+234 (0) XXX XXX XXXX"
                class="w-full px-4 py-2 rounded-lg border-2 focus:outline-none focus:border-primary"
              />
              {#if errors.schoolPhone}
                <p class="text-red-500 text-sm mt-1">{errors.schoolPhone}</p>
              {/if}
            </div>
          </div>
        </div>
      </div>

      <!-- Location Section -->
      <LocationSelector on:locationChange={handleLocationChange} bind:location />
      {#if errors.location}
        <p class="text-red-500 text-sm">{errors.location}</p>
      {/if}

      <!-- Players Section -->
      <div class="bg-secondary rounded-lg p-8 border border-secondary-light">
        <h2 class="text-2xl font-bold text-foreground mb-6">Team Players (4 Slots)</h2>

        <div class="space-y-6">
          {#each players as player, index (index)}
            <PlayerForm
              {index}
              {player}
              {errors}
              onChange={(field, value) => handlePlayerChange(index, field, value)}
            />
          {/each}
        </div>
      </div>

      <!-- Price Summary -->
      <div class="bg-primary bg-opacity-10 border-2 border-primary rounded-lg p-6">
        <div class="flex justify-between items-center">
          <div>
            <p class="text-muted text-sm">Total Registration Fee</p>
            <p class="text-3xl font-bold text-primary">₦{REGISTRATION_AMOUNT.toLocaleString()}</p>
            <p class="text-muted text-sm mt-2">For 4-player team registration</p>
          </div>
          <div class="text-right">
            <p class="text-sm text-muted">Amount per player</p>
            <p class="text-2xl font-bold text-accent">₦{(REGISTRATION_AMOUNT / 4).toLocaleString()}</p>
          </div>
        </div>
      </div>

      <!-- Submit Button -->
      <button
        type="submit"
        disabled={isProcessing}
        class="w-full bg-primary hover:bg-primary-dark disabled:opacity-50 disabled:cursor-not-allowed text-background font-bold py-4 px-6 rounded-lg transition-colors duration-200 text-lg"
      >
        {isProcessing ? 'Processing...' : 'Proceed to Payment'}
      </button>
    </form>
  </div>

  {#if showConfirmation}
    <ConfirmationModal
      {schoolName}
      {players}
      amount={REGISTRATION_AMOUNT}
      onConfirm={confirmPayment}
      onCancel={() => {
        showConfirmation = false;
      }}
      isProcessing={isProcessing}
    />
  {/if}
</div>
