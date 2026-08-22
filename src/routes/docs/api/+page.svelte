<h1>BEEE API Reference</h1>
<p class="docs-lead">
	The public REST API is served under <code>https://beeeproject.com/api</code> and returns JSON.
	The machine-readable description is the <a href="/docs/openapi.json">OpenAPI spec</a>.
</p>

<h2>Public endpoints</h2>
<table>
	<thead>
		<tr><th>Method</th><th>Path</th><th>What it does</th></tr>
	</thead>
	<tbody>
		<tr><td>GET</td><td><code>/api/banks</code></td><td>List Nigerian bank codes</td></tr>
		<tr><td>POST</td><td><code>/api/validate-partner</code></td><td>Validate a partner referral code and return the discounted amount</td></tr>
		<tr><td>POST</td><td><code>/api/register</code></td><td>Create a registration</td></tr>
		<tr><td>POST</td><td><code>/api/register-init-payment</code></td><td>Start a Paystack payment for a registration</td></tr>
		<tr><td>POST</td><td><code>/api/verify-payment</code></td><td>Verify a payment and confirm a registration</td></tr>
		<tr><td>GET</td><td><code>/api/user/check?email=</code></td><td>Check whether an email is already registered</td></tr>
	</tbody>
</table>

<h2>Authenticated endpoints</h2>
<table>
	<thead>
		<tr><th>Method</th><th>Path</th><th>What it does</th></tr>
	</thead>
	<tbody>
		<tr><td>POST</td><td><code>/api/auth/signup</code></td><td>Create an account and start a session</td></tr>
		<tr><td>POST</td><td><code>/api/auth/login</code></td><td>Sign in and start a session</td></tr>
		<tr><td>POST</td><td><code>/api/auth/logout</code></td><td>End the session</td></tr>
		<tr><td>POST</td><td><code>/api/become-partner</code></td><td>Upgrade the signed-in user to a partner</td></tr>
		<tr><td>POST</td><td><code>/api/partner/signup</code></td><td>Register as a partner</td></tr>
		<tr><td>POST</td><td><code>/api/partner/settings</code></td><td>Update partner settings</td></tr>
		<tr><td>POST</td><td><code>/api/partner/set-code</code></td><td>Set or change a partner code</td></tr>
	</tbody>
</table>

<p>
	Authentication and payment verification are described on the
	<a href="/docs/auth">authentication</a> and <a href="/docs/webhooks">webhooks</a> pages.
</p>
