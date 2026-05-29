<script lang="ts">
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	type State = 'verifying' | 'success' | 'failed';
	let state = $state<State>('verifying');
	let error_msg = $state('');

	$effect(() => {
		if (!data.reference) {
			state = 'failed';
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
			state = 'success';
		} catch (err) {
			state = 'failed';
			error_msg = err instanceof Error ? err.message : 'Verification failed';
		}
	}
</script>

<svelte:head>
	<title>Payment {state === 'success' ? 'Confirmed' : state === 'failed' ? 'Failed' : 'Verifying'} — BEEE T.E.A.M.U.P.</title>
</svelte:head>

<main class="callback-shell">
	<div class="callback-card">
		{#if state === 'verifying'}
			<div class="status-icon spin" aria-hidden="true">⟳</div>
			<h1>Verifying payment…</h1>
			<p>Please wait while we confirm your payment with Paystack.</p>
		{:else if state === 'success'}
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
	.status-icon.spin {
		display: inline-block;
		animation: spin 1s linear infinite;
	}
	.status-icon.success { color: #5db872; }
	.status-icon.failed  { color: #e05c5c; }
	@keyframes spin { to { transform: rotate(360deg); } }
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
