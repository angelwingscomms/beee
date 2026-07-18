<script lang="ts">
	import type { PageProps } from './$types';
	import Hex3 from '$lib/components/loaders/hex/hex-3.svelte';

	let { data }: PageProps = $props();

	let payment_state = $state<'verifying' | 'success' | 'failed'>('verifying');
	let error_msg = $state('');

	$effect(() => {
		console.log('[payment-callback] effect ran, reference=', data.reference);
		if (!data.reference) {
			payment_state = 'failed';
			error_msg = 'No payment reference found.';
			console.warn('[payment-callback] no reference -> failed');
			return;
		}
		verify(data.reference);
	});

  async function verify(reference: string) {
    console.log('[payment-callback] verify start, reference=', reference);
    try {
      console.log('[payment-callback] POST /api/verify-payment', { reference, registrationId: reference });
      const res = await fetch('/api/verify-payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reference, registrationId: reference })
      });
      console.log('[payment-callback] verify response status:', res.status, res.statusText);
      const body = await res.json();
      console.log('[payment-callback] verify response body:', body);
      if (!res.ok || !body.success) {
        console.error('[payment-callback] verify failed:', body.error);
        throw new Error(body.error || 'Verification failed');
      }
      payment_state = 'success';
      console.log('[payment-callback] payment SUCCESS, redirect=', body.redirect);
      try { localStorage.setItem('active_reg', reference); } catch {}
      console.log('[payment-callback] set active_reg=', reference);
      if (body.redirect) {
        setTimeout(() => {
          console.log('[payment-callback] redirecting to', body.redirect);
          window.location.href = body.redirect;
        }, 2000);
      }
    } catch (err) {
      payment_state = 'failed';
      error_msg = err instanceof Error ? err.message : 'Verification failed';
      console.error('[payment-callback] error:', err);
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
