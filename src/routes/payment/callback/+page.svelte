<script lang="ts">
	import type { PageProps } from './$types';
	import Hex3 from '$lib/components/loaders/hex/hex-3.svelte';

	let { data }: PageProps = $props();

	let payment_state = $state<'verifying' | 'success' | 'failed'>('verifying');
	let error_msg = $state('');

	$effect(() => {
		if (!data.reference) {
			payment_state = 'failed';
			error_msg = 'No payment reference found.';
			return;
		}
		verify(data.reference);
	});

  async function verify(reference: string) {
    try {
      const res = await fetch('/api/verify-payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reference, registrationId: reference })
      });
      const body = await res.json();
      if (!res.ok || !body.success) {
        throw new Error(body.error || 'Verification failed');
      }
      payment_state = 'success';
      if (body.redirect) {
        setTimeout(() => { window.location.href = body.redirect; }, 2000);
      }
    } catch (err) {
      payment_state = 'failed';
      error_msg = err instanceof Error ? err.message : 'Verification failed';
    }
  }
</script>

<svelte:head>
	<title>Payment {payment_state === 'success' ? 'Confirmed' : payment_state === 'failed' ? 'Failed' : 'Verifying'} — BEEE T.E.A.M.U.P.</title>
</svelte:head>

<main class="callback-shell">
	<div class="callback-card">
		{#if payment_state === 'verifying'}
			<Hex3 size={32} dotSize={4} speed={1.2} bloom color="var(--primary)" />
			<h1>Verifying payment…</h1>
			<p>Please wait while we confirm your payment with Paystack.</p>
		{:else if payment_state === 'success'}
			<div class="status-icon success" aria-hidden="true">✓</div>
			<h1>Registration Confirmed!</h1>
			<p>Your payment was successful. A confirmation email will be sent to you shortly.</p>
			<p class="ref">Reference: <code>{data.reference}</code></p>
			<a href="/" class="button-primary">Back to Home</a>
		{:else}
			<div class="status-icon failed" aria-hidden="true">✗</div>
			<h1>Payment Failed</h1>
			<p>{error_msg || 'Something went wrong. Please try again.'}</p>
			<a href="/" class="button-primary">Try Again</a>
		{/if}
	</div>
</main>

<style>
	.callback-shell {
		min-height: 100vh;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 2rem;
	}
	.callback-card {
		text-align: center;
		max-width: 480px;
		width: 100%;
		padding: 3rem 2rem;
	}
	.status-icon {
		font-size: 4rem;
		display: block;
		margin-bottom: 1rem;
	}
	.status-icon.success { color: var(--success); }
	.status-icon.failed  { color: var(--error); }
	.ref {
		margin-top: 1rem;
		font-size: 0.85rem;
		opacity: 0.7;
	}
	.button-primary {
		display: inline-block;
		margin-top: 1.5rem;
	}
</style>
