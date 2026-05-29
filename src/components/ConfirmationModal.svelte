<script lang="ts">
	let {
		schoolName,
		amount,
		playerName,
		playerEmail,
		onConfirm,
		onCancel,
		isProcessing = false
	}: {
		schoolName: string;
		amount: number;
		playerName: string;
		playerEmail: string;
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
			<section class="modal-section" aria-labelledby="school-summary-title">
				<h3 id="school-summary-title">School</h3>
				<div class="summary-list">
					<div class="summary-item">
						<div class="player-number">s</div>
						<div>
							<strong>{schoolName}</strong>
						</div>
					</div>
				</div>
			</section>

			<section class="modal-section" aria-labelledby="player-summary-title">
				<h3 id="player-summary-title">Player</h3>
				<div class="summary-list">
					<div class="summary-item">
						<div class="player-number">1</div>
						<div>
							<strong>{playerName}</strong>
							<span>{playerEmail}</span>
						</div>
					</div>
				</div>
			</section>

			<div class="modal-total">
				<div>
					<p>Registration fee</p>
				</div>
				<strong>{formatCurrency(amount)}</strong>
			</div>
		</div>

		<div class="modal-actions">
			<button type="button" onclick={onCancel} disabled={isProcessing} class="button-secondary">
				Cancel
			</button>
			<button type="button" onclick={onConfirm} disabled={isProcessing} class="button-primary">
				{#if isProcessing}
					<span class="spinner" aria-hidden="true"></span>
					Processing
				{:else}
					Confirm and Pay
				{/if}
			</button>
		</div>
	</div>
</div>
