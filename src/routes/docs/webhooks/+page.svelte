<h1>BEEE Webhooks</h1>
<p class="docs-lead">
	Paystack notifies beeeproject.com of payment events through a webhook. Configure the endpoint in the
	Paystack dashboard under Settings &gt; API Keys and Webhooks.
</p>

<h2>Endpoint</h2>
<table>
	<tbody>
		<tr><th>Method</th><td>POST</td></tr>
		<tr><th>Path</th><td><code>/api/webhooks/paystack</code></td></tr>
		<tr><th>Signature header</th><td><code>x-paystack-signature</code></td></tr>
		<tr><th>Signature algorithm</th><td>HMAC SHA512 over the raw body using your Paystack secret key</td></tr>
	</tbody>
</table>

<h2>Behaviour</h2>
<ul>
	<li>Respond <code>200</code> immediately. Paystack retries if it does not get a prompt success.</li>
	<li>Verify the HMAC SHA512 signature before trusting any data.</li>
	<li>Handle the <code>charge.success</code> event idempotently, so retries do not double-confirm.</li>
</ul>

<h2>Paystack IPs</h2>
<p>
	Paystack sends from <code>52.31.139.75</code>, <code>52.49.173.169</code> and <code>52.214.14.220</code>.
</p>

<p>Payment flow details are in the <a href="/docs/api">API reference</a>.</p>
