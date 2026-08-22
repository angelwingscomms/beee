<h1>BEEE Developer Documentation</h1>
<p class="docs-lead">
	Everything an engineer or an AI agent needs to work with beeeproject.com: the public REST API,
	the OpenAPI spec, authentication, webhooks and the agent access layer.
</p>

<h2>Machine-readable files</h2>
<ul>
	<li><a href="/llms.txt">llms.txt</a> - the site index for AI agents</li>
	<li><a href="/sitemap.xml">sitemap.xml</a> - XML site map of crawlable pages</li>
	<li><a href="/robots.txt">robots.txt</a> - crawler policy; GPTBot, ClaudeBot, PerplexityBot and OAI-SearchBot are allowed</li>
	<li><a href="/docs/openapi.json">OpenAPI spec</a> - the public REST API, in OpenAPI 3.1</li>
</ul>

<h2>Guides</h2>
<ul class="docs-toc">
	<li><a href="/docs/api">API reference</a> - endpoints, methods, request bodies and responses</li>
	<li><a href="/docs/auth">Authentication</a> - session cookie, email/password and Google sign-in</li>
	<li><a href="/docs/webhooks">Webhooks</a> - Paystack payment event webhooks</li>
	<li><a href="/docs/agents">AI agents</a> - how to read and use the site programmatically</li>
</ul>

<h2>Quick facts</h2>
<table>
	<tbody>
		<tr><th>Base URL</th><td>https://beeeproject.com/api</td></tr>
		<tr><th>Content type</th><td>application/json</td></tr>
		<tr><th>Auth</th><td>httpOnly session cookie, or none for public endpoints</td></tr>
		<tr><th>Markdown negotiated</th><td>Add <code>Accept: text/markdown</code> to any public page</td></tr>
	</tbody>
</table>
