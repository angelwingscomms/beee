<script lang="ts">
	let {
		schoolName,
		amount,
		email,
		onConfirm,
		onCancel,
		isProcessing = false
	}: {
		schoolName: string;
		amount: number;
		email: string;
		onConfirm: () => void;
		onCancel: () => void;
		isProcessing?: boolean;
	} = $props();

	function formatCurrency(value: number): string {
		return `ngn ${value.toLocaleString()}`;
	}
</script>

<div class="modal-backdrop" role="presentation">
	<div class="modal-card" role="dialog" aria-modal="true" aria-labelledby="confirm-title">
		<div class="modal-header">
			<h2 id="confirm-title">confirm registration</h2>
			<p>review your details before payment.</p>
		</div>

		<div class="modal-body">
			<section class="modal-section" aria-labelledby="school-summary-title">
				<h3 id="school-summary-title">details</h3>
				<div class="summary-list">
					<div class="summary-item">
						<div class="player-number">s</div>
						<div>
							<strong>{schoolName}</strong>
							<span>{email}</span>
						</div>
					</div>
				</div>
			</section>

			<div class="modal-total">
				<div>
					<p>registration fee</p>
				</div>
				<strong>{formatCurrency(amount)}</strong>
			</div>
		</div>

		<div class="modal-actions">
			<button type="button" onclick={onCancel} disabled={isProcessing} class="button-secondary">
				cancel
			</button>
			<button type="button" onclick={onConfirm} disabled={isProcessing} class="button-primary">
				{#if isProcessing}
					<span class="spinner" aria-hidden="true"></span>
					processing
				{:else}
					confirm and pay
				{/if}
			</button>
		</div>
	</div>
</div>
