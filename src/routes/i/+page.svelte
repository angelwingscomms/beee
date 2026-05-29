<script lang="ts">
    import { enhance } from '$app/forms';
    import type { PageProps } from './$types';

    let { data, form }: PageProps = $props();
</script>

<svelte:head>
    <title>Admin — BEEE T.E.A.M.U.P.</title>
</svelte:head>

<div class="min-h-screen bg-neutral-950 text-neutral-100 p-8">
    {#if form?.success}
        <h1 class="text-2xl font-bold mb-6">Registrations ({form.registrations.length})</h1>
        <div class="overflow-x-auto">
            <table class="w-full text-left border-collapse">
                <thead>
                    <tr class="border-b border-neutral-700">
                        <th class="p-2">School</th>
                        <th class="p-2">Email</th>
                        <th class="p-2">Phone</th>
                        <th class="p-2">Players</th>
                        <th class="p-2">Status</th>
                        <th class="p-2">Amount</th>
                        <th class="p-2">Date</th>
                    </tr>
                </thead>
                <tbody>
                    {#each form.registrations as reg}
                        <tr class="border-b border-neutral-800">
                            <td class="p-2">{reg.n}</td>
                            <td class="p-2">{reg.e}</td>
                            <td class="p-2">{reg.p}</td>
                            <td class="p-2">{reg.pl.length}</td>
                            <td class="p-2">{reg.st}</td>
                            <td class="p-2">{(reg.amt / 100).toLocaleString()}</td>
                            <td class="p-2">{new Date(reg.d).toLocaleDateString()}</td>
                        </tr>
                    {/each}
                </tbody>
            </table>
        </div>
    {:else}
        <h1 class="text-2xl font-bold mb-6">Admin Login</h1>
        <form method="POST" use:enhance class="max-w-sm">
            <label class="block mb-2">
                Password
                <input type="password" name="password" required
                    class="w-full mt-1 px-3 py-2 bg-neutral-800 border border-neutral-700 rounded text-neutral-100" />
            </label>
            {#if form?.error}
                <p class="text-red-400 mb-2">{form.error}</p>
            {/if}
            <button type="submit" class="px-4 py-2 bg-blue-600 rounded hover:bg-blue-700">
                Login
            </button>
        </form>
    {/if}
</div>
