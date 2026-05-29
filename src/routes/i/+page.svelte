<script lang="ts">
    import { enhance } from '$app/forms';
    import type { PageProps } from './$types';

    let { data, form }: PageProps = $props();
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
                            <th>Players</th>
                            <th>Status</th>
                            <th>Amount</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {#each form.registrations as reg}
                            <tr>
                                <td>{reg.n}</td>
                                <td>{reg.e}</td>
                                <td>{reg.p}</td>
                                <td>{reg.pl.length}</td>
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

    .badge-pill.paid {
        background: var(--success) !important;
        color: var(--on-primary) !important;
    }
</style>
