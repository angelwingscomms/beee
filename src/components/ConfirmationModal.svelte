<script lang="ts">
	let {
		schoolName,
		schoolEmail,
		schoolPhone,
		players,
		amount,
		onConfirm,
		onCancel,
		isProcessing = false
	}: {
		schoolName: string;
		schoolEmail: string;
		schoolPhone: string;
		players: string[][];
		amount: number;
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
						<div>
							<strong>{schoolName}</strong>
							<span>{schoolEmail}</span>
							<span>{schoolPhone}</span>
						</div>
					</div>
				</div>
			</section>

			<section class="modal-section" aria-labelledby="players-summary-title">
				<h3 id="players-summary-title">Players</h3>
				<div class="summary-list">
					{#each players as [first, last], i}
						<div class="summary-item">
							<div>
								<strong>{first} {last}</strong>
							</div>
						</div>
					{/each}
				</div>
			</section>

			<div class="modal-total">
				<div>
					<p>Register now</p>
					<p class="summary-item-desc">₦12,500 per player<br><span class="text-[15px] !text-[#000]" style="font-family:var(--font-display)">Total: ₦50,000<br>per school team</span></p>
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
