<script lang="ts">
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
	<div class="modal-card rv-modal" role="dialog" aria-modal="true" aria-labelledby="confirm-title">
		<div class="modal-header rv-modal-header">
			<h2 id="confirm-title" class="rv-title">Confirm Registration</h2>
			<p>Review your details before payment.</p>
		</div>

		<div class="modal-body">
			<section class="modal-section" aria-labelledby="participant-summary-title">
				<h3 id="participant-summary-title">Participant</h3>
				<div class="summary-list">
					<div class="summary-item rv-modal-summary">
						<div>
							<strong>{firstName} {lastName}</strong>
							<span>{school}</span>
							<span>{email}</span>
							<span>{phone}</span>
						</div>
					</div>
				</div>
			</section>

			<div class="modal-total rv-modal-total">
				<div>
					<p>Register now</p>
					<p class="summary-item-desc">{formatCurrency(AMOUNT)} per participant</p>
				</div>
				<strong>{formatCurrency(AMOUNT)}</strong>
			</div>
		</div>

		<div class="modal-actions rv-modal-actions">
			<button type="button" onclick={onCancel} disabled={isProcessing} class="rv-btn rv-btn--ghost felt">
				Cancel
			</button>
			<button type="button" onclick={onConfirm} disabled={isProcessing} class="rv-btn rv-btn--beam felt">
				{#if isProcessing}
					<span class="spinner" aria-hidden="true"></span>
					Processing
				{:else}
					Confirm &amp; pay {formatCurrency(AMOUNT)}
				{/if}
			</button>
		</div>
		<p class="modal-secure-note rv-modal-note">Payments processed securely by Paystack.</p>
	</div>
</div>

<style>
	:global(.rv-modal) {
		background: var(--nightfall-soft);
		color: var(--dusk-ink);
	}
	:global(.rv-modal .modal-header) {
		border-bottom-color: color-mix(in srgb, var(--dusk-ink) 14%, transparent);
	}
	:global(.rv-modal .modal-header h2) {
		color: var(--dusk-ink);
	}
	:global(.rv-modal .modal-header p),
	:global(.rv-modal .modal-section p) {
		color: var(--dusk-body);
	}
	:global(.rv-modal .modal-section h3) {
		color: var(--dusk-ink);
	}
	:global(.rv-modal .summary-item) {
		background: color-mix(in srgb, var(--dusk-ink) 6%, transparent);
	}
	:global(.rv-modal .summary-item strong) {
		color: var(--dusk-ink);
	}
	:global(.rv-modal .summary-item span) {
		color: var(--dusk-body);
	}
	:global(.rv-modal .modal-total) {
		border-top-color: color-mix(in srgb, var(--dusk-ink) 14%, transparent);
	}
	:global(.rv-modal .modal-total p) {
		color: var(--dusk-body);
	}
	:global(.rv-modal .modal-total strong) {
		color: var(--dusk-ink);
		font-family: var(--font-grotesk);
	}
	:global(.rv-modal .rv-modal-actions) {
		border-top-color: color-mix(in srgb, var(--dusk-ink) 14%, transparent);
		background: transparent;
	}
	:global(.rv-modal .rv-modal-note) {
		background: transparent;
		color: var(--dusk-body);
	}
</style>
