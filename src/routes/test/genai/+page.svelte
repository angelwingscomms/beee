<script lang="ts">
	import { GoogleGenAI } from '@google/genai';

	let api_key = $state('');
	let prompt = $state('What is the capital of France?');
	let response_text = $state('');
	let loading = $state(false);
	let error = $state('');

	async function send() {
		loading = true;
		error = '';
		response_text = '';
		try {
			const ai = new GoogleGenAI({ apiKey: api_key });
			const resp = await ai.models.generateContent({
				model: 'gemini-2.0-flash',
				contents: prompt || 'Say hello and introduce yourself briefly.'
			});
			response_text = resp.text ?? '(no text in response)';
		} catch (e) {
			error = e instanceof Error ? `${e.name}: ${e.message}` : String(e);
		} finally {
			loading = false;
		}
	}
</script>

<div class="max-w-xl mx-auto mt-8 p-4">
	<h1 class="text-2xl font-bold mb-4">@google/genai browser test</h1>
	<p class="text-sm text-gray-600 mb-4">Tests whether the SDK works client-side (expects CORS failure).</p>

	<input
		bind:value={api_key}
		type="password"
		placeholder="Gemini API Key"
		class="w-full border border-gray-300 p-2 mb-2 rounded"
	/>
	<textarea
		bind:value={prompt}
		placeholder="Prompt"
		class="w-full border border-gray-300 p-2 mb-2 rounded"
		rows="3"
	></textarea>
	<button
		onclick={send}
		disabled={loading || !api_key}
		class="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
	>
		{loading ? 'Sending...' : 'Send'}
	</button>

	{#if error}
		<div class="mt-4 p-3 bg-red-100 border border-red-400 rounded text-red-700">
			<p class="font-bold">Error:</p>
			<p class="whitespace-pre-wrap break-all">{error}</p>
		</div>
	{/if}

	{#if response_text}
		<div class="mt-4 p-3 bg-green-100 border border-green-400 rounded">
			<p class="font-bold">Response:</p>
			<p class="mt-1 whitespace-pre-wrap">{response_text}</p>
		</div>
	{/if}
</div>
