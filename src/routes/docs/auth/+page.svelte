<h1>BEEE Authentication Docs</h1>
<p class="docs-lead">
	BEEE uses a cookie-based session, with optional Google sign-in. Session cookies are
	<code>httpOnly</code>, <code>SameSite=Lax</code> and named <code>session</code>.
</p>

<h2>Email and password</h2>
<ol>
	<li><code>POST /api/auth/signup</code> with <code>{ email, password, name }</code> - creates the account and sets the session cookie.</li>
	<li><code>POST /api/auth/login</code> with <code>{ email, password }</code> - verifies the password and sets the session cookie.</li>
	<li>Send the <code>session</code> cookie on every authenticated request.</li>
	<li><code>POST /api/auth/logout</code> clears the session cookie.</li>
</ol>

<h2>Google sign-in</h2>
<p>
	Start the flow at <code>/google</code>. The OAuth callback is <code>/google</code>. On success we set
	the same <code>session</code> cookie. Google sign-in is available when the account was created with Google;
	accounts created with a password should sign in with email and password.
</p>

<h2>Public access</h2>
<p>
	The public endpoints (<code>/api/banks</code>, <code>/api/validate-partner</code>, <code>/api/user/check</code>)
	need no session. Use them before authentication to power the registration form.
</p>

<p>See the <a href="/docs/api">API reference</a> for the full endpoint list.</p>
