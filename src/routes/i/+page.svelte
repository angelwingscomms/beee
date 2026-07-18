<script lang="ts">
    import { enhance } from '$app/forms';
    import type { PageProps } from './$types';
    import type { Registration } from '$lib/types/registration';

    let { data, form }: PageProps = $props();

    let selectedReg: Registration | null = $state(null);

    const st_label = (st: string | undefined) =>
        st === 'i' ? 'Paid' : st === 'r' ? 'Pending' : (st ?? '');
    const is_paid = (st: string | undefined) => st === 'i';
</script>

<svelte:head>
    <title>Admin — BEEE T.E.A.M.U.P.</title>
</svelte:head>

<div class="page-shell">
    <div class="container" style="padding-top:72px;padding-bottom:72px">
        {#if form?.success}
            <h1 class="display-md" style="margin-bottom:32px">Registrations ({form.registrations.length})</h1>
            <div class="admin-table-wrap">
                <table class="admin-table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Status</th>
                            <th>Amount</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {#each form.registrations as reg}
                            <tr class="clickable" onclick={() => selectedReg = reg}>
                                <td>{reg.fn} {reg.ln}</td>
                                <td>{reg.e}</td>
                                <td>{reg.p}</td>
                                <td><span class="badge-pill" class:paid={is_paid(reg.st)} class:pending={!is_paid(reg.st)}>{st_label(reg.st)}</span></td>
                                <td>₦{(reg.amt / 100).toLocaleString()}</td>
                                <td>{new Date(reg.d).toLocaleDateString()}</td>
                            </tr>
                        {/each}
                    </tbody>
                </table>
            </div>
        {:else}
            <div class="login-card">
                <div class="login-card-inner">
                    <h1 class="display-md" style="margin-bottom:8px">Admin</h1>
                    <p class="login-sub">Enter your password to view registrations.</p>
                    <form method="POST" use:enhance>
                        <div class="field" style="margin-top:24px">
                            <label for="password">Password</label>
                            <input id="password" type="password" name="password" required class="text-input" />
                        </div>
                        {#if form?.error}
                            <div class="error-message">{form.error}</div>
                        {/if}
                        <button type="submit" class="button-primary" style="margin-top:20px;width:100%">Login</button>
                    </form>
                </div>
            </div>
        {/if}
    </div>
</div>

{#if selectedReg}
    <!-- svelte-ignore a11y_no_static_element_interactions -->
    <div class="modal-backdrop" role="presentation" onclick={() => selectedReg = null}>
        <!-- svelte-ignore a11y_no_static_element_interactions -->
        <div class="modal-card" role="dialog" aria-modal="true" aria-labelledby="reg-detail-title" tabindex="-1" onclick={(e) => e.stopPropagation()} onkeydown={(e) => e.key === 'Escape' && (selectedReg = null)}>
            <div class="modal-header">
                <h2 id="reg-detail-title">{selectedReg.fn} {selectedReg.ln}</h2>
                <button class="modal-close" onclick={() => selectedReg = null} aria-label="Close">
                    <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true"><path d="M4.5 4.5l9 9M13.5 4.5l-9 9" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
                </button>
            </div>
            <div class="modal-body">
                <div class="detail-row">
                    <span class="detail-label">First Name</span>
                    <span>{selectedReg.fn}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Last Name</span>
                    <span>{selectedReg.ln}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Email</span>
                    <span>{selectedReg.e}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Phone</span>
                    <span>{selectedReg.p}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Amount</span>
                    <span>₦{(selectedReg.amt / 100).toLocaleString()}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Status</span>
                    <span><span class="badge-pill" class:paid={is_paid(selectedReg.st)} class:pending={!is_paid(selectedReg.st)}>{st_label(selectedReg.st)}</span></span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Date</span>
                    <span>{new Date(selectedReg.d).toLocaleDateString()}</span>
                </div>
            </div>
        </div>
    </div>
{/if}

<style>
    .admin-table-wrap {
        overflow-x: auto;
    }

    .admin-table {
        width: 100%;
        border-collapse: collapse;
        font-size: 14px;
    }

    .admin-table th {
        text-align: left;
        padding: 12px;
        border-bottom: 1px solid var(--hairline);
        color: var(--muted);
        font-weight: 500;
        font-size: 13px;
        white-space: nowrap;
    }

    .admin-table td {
        padding: 12px;
        border-bottom: 1px solid var(--hairline-soft);
        color: var(--body);
    }

    .admin-table tbody tr:hover {
        background: var(--surface-soft);
    }

    .admin-table tbody tr:last-child td {
        border-bottom: none;
    }

    .admin-table .clickable {
        cursor: pointer;
    }

    .login-card {
        max-width: 400px;
    }

    .login-card-inner {
        border-radius: 12px;
        background: var(--surface-card);
        padding: 32px;
    }

    .login-sub {
        margin: 0;
        color: var(--muted);
        font-size: 14px;
        line-height: 1.5;
    }

    .badge-pill.paid {
        background: var(--success) !important;
        color: var(--on-primary) !important;
    }

    .badge-pill.pending {
        background: var(--surface-cream-strong) !important;
        color: var(--muted) !important;
    }

    .modal-backdrop {
        position: fixed;
        inset: 0;
        background: rgba(20, 20, 19, 0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 100;
        padding: 1rem;
    }

    .modal-card {
        background: var(--canvas);
        border-radius: 12px;
        width: 100%;
        max-width: 520px;
        max-height: 90vh;
        overflow-y: auto;
        box-shadow: 0 24px 80px rgba(242, 120, 48, 0.08);
    }

    .modal-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 20px 24px 0;
    }

    .modal-header h2 {
        font-size: 18px;
        color: var(--ink);
        margin: 0;
    }

    .modal-close {
        display: grid;
        place-items: center;
        width: 32px;
        height: 32px;
        background: none;
        border: 1px solid var(--hairline);
        border-radius: 8px;
        color: var(--muted);
        cursor: pointer;
        padding: 0;
        transition: color 150ms ease, border-color 150ms ease;
    }

    .modal-close:hover {
        color: var(--ink);
        border-color: var(--ink);
    }

    .modal-body {
        padding: 16px 24px 24px;
    }

    .detail-row {
        display: flex;
        justify-content: space-between;
        padding: 8px 0;
        border-bottom: 1px solid var(--hairline-soft);
        font-size: 14px;
    }

    .detail-row:last-of-type {
        border-bottom: none;
    }

    .detail-label {
        color: var(--muted);
        font-weight: 400;
    }

    .detail-row span:last-child {
        font-weight: 400;
    }
</style>
