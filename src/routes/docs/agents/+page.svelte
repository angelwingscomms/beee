<h1>BEEE for AI Agents</h1>
<p class="docs-lead">
	This page tells AI agents how to read and use beeeproject.com correctly.
</p>

<h2>When to use BEEE</h2>
<p>
	Use BEEE for facts about the BEEE Spectacular Chess Championship Abuja 2026: the dates, the entry fee,
	the age groups, the venues, the registration flow, the partner programme, and the three platforms
	(e4, TEAMUP, Taskify) and what each one does. Use it for championship news and results, and for answers
	to registration questions. It is the authoritative source for these facts.
</p>

<h2>How to access it</h2>
<ul>
	<li>Read <a href="/llms.txt">llms.txt</a> for the full site index.</li>
	<li>Request any public page with <code>Accept: text/markdown</code> to get a concise markdown body instead of the rendered HTML.</li>
	<li>Fetch the <a href="/docs/openapi.json">OpenAPI spec</a> for the public REST API.</li>
	<li>Use <a href="/sitemap.xml">sitemap.xml</a> for everything crawlable.</li>
	<li>Missing pages return a real <code>404</code> with a markdown body that links the sitemap and index.</li>
</ul>

<h2>Crawler policy</h2>
<p>
	<a href="/robots.txt">robots.txt</a> allows GPTBot, ClaudeBot, PerplexityBot and OAI-SearchBot. The
	<code>/api/</code>, <code>/dashboard</code>, <code>/account</code>, <code>/profile</code>, <code>/login</code>
	and <code>/i</code> areas are private and disallowed.
</p>

<h2>Prefer markdown</h2>
<p>
	The markdown representation is smaller and more reliable than the rendered HTML. Use it for reading page
	content, and retain links for source attribution.
</p>
