<script lang="ts">
    import { enhance } from '$app/forms';
    import type { PageProps } from './$types';

    let { data, form }: PageProps = $props();

    let selectedReg = $state<null | typeof form.registrations[0]>(null);
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
                            <th>School</th>
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
                                <td>{reg.sn}</td>
                                <td>{reg.e}</td>
                                <td>{reg.p}</td>
                                <td><span class="badge-pill" class:paid={reg.st === 'paid'}>{reg.st}</span></td>
                                <td>₦{(reg.amt / 100).toLocaleString()}</td>
                                <td>{new Date(reg.d).toLocaleDateString()}</td>
                            </tr>
                        {/each}
                    </tbody>
                </table>
            </div>
        {:else}
            <div style="max-width:400px">
                <h1 class="display-md" style="margin-bottom:24px">Admin</h1>
                <form method="POST" use:enhance>
                    <div class="field">
                        <label for="password">Password</label>
                        <input id="password" type="password" name="password" required class="text-input" />
                    </div>
                    {#if form?.error}
                        <div class="error-message">{form.error}</div>
                    {/if}
                    <button type="submit" class="button-primary" style="margin-top:20px;width:100%">Login</button>
                </form>
            </div>
        {/if}
    </div>
</div>

{#if selectedReg}
    <!-- svelte-ignore a11y_no_static_element_interactions -->
    <div class="modal-backdrop" role="presentation" onclick={() => selectedReg = null}>
        <!-- svelte-ignore a11y_no_static_element_interactions -->
        <div class="modal-card" role="dialog" aria-modal="true" aria-labelledby="reg-detail-title" onclick={(e) => e.stopPropagation()}>
            <div class="modal-header">
                <h2 id="reg-detail-title">{selectedReg.sn}</h2>
                <button class="modal-close" onclick={() => selectedReg = null} aria-label="Close">&times;</button>
            </div>
            <div class="modal-body">
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
                    <span><span class="badge-pill" class:paid={selectedReg.st === 'paid'}>{selectedReg.st}</span></span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Date</span>
                    <span>{new Date(selectedReg.d).toLocaleDateString()}</span>
                </div>

                <h3 class="players-heading">Players</h3>
                <table class="players-table">
                    <thead>
                        <tr>
                            <th>First Name</th>
                            <th>Last Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        {#each selectedReg.ps as [first, last]}
                            <tr>
                                <td>{first}</td>
                                <td>{last}</td>
                            </tr>
                        {/each}
                    </tbody>
                </table>
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

    .badge-pill.paid {
        background: var(--success) !important;
        color: var(--on-primary) !important;
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
        box-shadow: 0 24px 80px rgba(0,0,0,0.2);
    }

    .modal-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 20px 24px 0;
    }

    .modal-header h2 {
        font-size: 18px;
        font-weight: 600;
        color: var(--ink);
        margin: 0;
    }

    .modal-close {
        background: none;
        border: none;
        font-size: 24px;
        color: var(--muted);
        cursor: pointer;
        padding: 0;
        line-height: 1;
    }

    .modal-close:hover {
        color: var(--ink);
    }

    .modal-body {
        padding: 16px 24px 24px;
    }

    .detail-row {
        display: flex;
        justify-content: space-between;
        padding: 8px 0 8px 10px;
        border-left: 2px solid var(--hairline-soft);
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

    .players-heading {
        font-size: 15px;
        font-weight: 600;
        color: var(--ink);
        margin: 20px 0 12px;
    }

    .players-table {
        width: 100%;
        border-collapse: collapse;
        font-size: 14px;
    }

    .players-table th {
        text-align: left;
        padding: 10px 12px;
        border-bottom: 1px solid var(--hairline);
        color: var(--muted);
        font-weight: 500;
        font-size: 13px;
    }

    .players-table td {
        padding: 10px 12px;
        border-bottom: 1px solid var(--hairline-soft);
        color: var(--body);
    }

    .players-table tbody tr:last-child td {
        border-bottom: none;
    }
</style>
