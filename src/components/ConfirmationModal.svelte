<script lang="ts">
	import Button from '$lib/components/Button.svelte';

	let {
		firstName,
		lastName,
		school,
		email,
		phone,
		AMOUNT,
		onConfirm,
		onCancel,
		isProcessing = false
	}: {
		firstName: string;
		lastName: string;
		school: string;
		email: string;
		phone: string;
		AMOUNT: number;
		onConfirm: () => void;
		onCancel: () => void;
		isProcessing?: boolean;
	} = $props();

	function formatCurrency(value: number): string {
		return `₦${value.toLocaleString()}`;
	}
</script>

<div class="modal-backdrop" role="presentation">
	<div class="modal-card" role="dialog" aria-modal="true" aria-labelledby="confirm-title">
		<div class="modal-header">
			<h2 id="confirm-title">Confirm Registration</h2>
			<p>Review your details before payment.</p>
		</div>

		<div class="modal-body">
			<section class="modal-section" aria-labelledby="participant-summary-title">
				<h3 id="participant-summary-title">Participant</h3>
				<div class="summary-list">
					<div class="summary-item">
						<div>
							<strong>{firstName} {lastName}</strong>
							<span>{school}</span>
							<span>{email}</span>
							<span>{phone}</span>
						</div>
					</div>
				</div>
			</section>

			<div class="modal-total">
				<div>
					<p>Register now</p>
					<p class="summary-item-desc">{formatCurrency(AMOUNT)} per participant</p>
				</div>
				<strong>{formatCurrency(AMOUNT)}</strong>
			</div>
		</div>

		<div class="modal-actions">
			<button type="button" onclick={onCancel} disabled={isProcessing} class="button-secondary">
				Cancel
			</button>
			<Button onclick={onConfirm} disabled={isProcessing}>
				{#if isProcessing}
					<span class="spinner" aria-hidden="true"></span>
					Processing
				{:else}
					Confirm &amp; Pay {formatCurrency(AMOUNT)}
				{/if}
			</Button>
		</div>
		<p class="modal-secure-note">Payments processed securely by Paystack.</p>
	</div>
</div>
