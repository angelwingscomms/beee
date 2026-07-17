<script lang="ts">
  import { browser } from '$app/environment';
  import { goto, invalidateAll } from '$app/navigation';
  import { page } from '$app/stores';
  import TextInput from '$lib/components/TextInput.svelte';

  let { data } = $props();

  let em = $state(data.email || '');
  let pw = $state('');
  let eme = $state('');
  let pwe = $state('');
  let apiError = $state('');
  let isProcessing = $state(false);

  const next = $derived($page.url.searchParams.get('next') || '/');

  let allValid = $derived(
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(em.trim()) && pw.length >= 8
  );

  function validate(): boolean {
    eme = ''; pwe = ''; apiError = '';
    let v = true;
    if (!em.trim()) { eme = 'Required'; v = false; }
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(em.trim())) { eme = 'Invalid email'; v = false; }
    if (!pw) { pwe = 'Required'; v = false; }
    return v;
  }

  async function handleSubmit(e: Event) {
    e.preventDefault();
    if (!validate() || isProcessing) return;
    isProcessing = true;
    try {
      const r = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: em.trim(), password: pw })
      });
      const d = await r.json();
      if (!r.ok) {
        apiError = d.error || 'Login failed';
        isProcessing = false;
        return;
      }
      isProcessing = false;
      try {
        await invalidateAll();
        await goto(next);
      } catch {
        window.location.href = next;
      }
    } catch {
      apiError = 'Network error. Please try again.';
      isProcessing = false;
    }
  }
</script>

<svelte:head>
  <title>Login — BEEE</title>
</svelte:head>

<div class="login-shell">
  <div class="login-card">
    <h1 class="login-title">Welcome back</h1>
    <p class="login-sub">Sign in to your BEEE account</p>

    <form onsubmit={handleSubmit} novalidate>
      <TextInput id="em" label="Email" type="email" bind:value={em} error={eme} oninput={() => eme = ''} />
      <TextInput id="pw" label="Password" type="password" bind:value={pw} error={pwe} oninput={() => pwe = ''} showToggle />

      {#if apiError}
        <div class="login-error" role="alert">{apiError}</div>
      {/if}

      <button class="login-btn" disabled={!allValid || isProcessing}>
        {isProcessing ? 'Signing in…' : 'Sign In'}
      </button>
    </form>

    <div class="login-divider"><span>or</span></div>

    <a href="/login/google?next={encodeURIComponent(next)}" class="login-google">
      <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
      Sign in with Google
    </a>

    <p class="login-register-link">New to BEEE? <a href="/register">Register</a></p>
  </div>
</div>

<style>
  .login-shell {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2rem;
    background: var(--canvas);
  }
  .login-card {
    width: 100%;
    max-width: 400px;
    background: #ffffff;
    box-shadow: 0 8px 40px rgba(20, 20, 19, 0.06);
    border-radius: 16px;
    padding: 2.5rem 2rem;
    border: 1px solid var(--hairline);
  }
  .login-title {
    font-family: var(--font-hero);
    font-size: 1.8rem;
    font-weight: 700;
    margin: 0 0 4px;
    color: var(--ink);
  }
  .login-sub {
    font-family: var(--font-registration);
    font-size: 14px;
    color: var(--muted);
    margin: 0 0 24px;
  }
  .login-card form {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
  .login-error {
    padding: 10px 14px;
    border-radius: 8px;
    background: rgba(255,55,45,0.08);
    color: var(--error);
    font-size: 13px;
    line-height: 1.4;
  }
  .login-btn {
    width: 100%;
    padding: 14px 24px;
    border: none;
    border-radius: 10px;
    background: var(--ink);
    color: white;
    font-family: var(--font-registration);
    font-size: 15px;
    font-weight: 600;
    cursor: pointer;
    transition: opacity 0.2s;
  }
  .login-btn:disabled {
    background: var(--surface-card);
    color: var(--muted);
    cursor: not-allowed;
  }
  .login-btn:not(:disabled):hover {
    opacity: 0.85;
  }
  .login-btn:focus-visible {
    outline: 2px solid var(--primary);
    outline-offset: 2px;
  }
  .login-divider {
    display: flex;
    align-items: center;
    gap: 12px;
    margin: 20px 0;
    color: var(--muted);
    font-size: 13px;
  }
  .login-divider::before,
  .login-divider::after {
    content: '';
    flex: 1;
    height: 1px;
    background: var(--hairline);
  }
  .login-google {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    width: 100%;
    padding: 12px 24px;
    border: 1px solid var(--hairline);
    border-radius: 10px;
    background: var(--surface);
    color: var(--body-strong);
    font-family: var(--font-registration);
    font-size: 14px;
    font-weight: 500;
    text-decoration: none;
    transition: background 0.2s;
  }
  .login-google:hover {
    background: var(--surface-soft);
  }
  .login-register-link {
    margin: 24px 0 0;
    text-align: center;
    font-family: var(--font-registration);
    font-size: 13px;
    color: var(--muted);
  }
  .login-register-link a {
    color: var(--ink);
    font-weight: 600;
    text-decoration: none;
  }
  .login-register-link a:hover {
    text-decoration: underline;
  }
</style>
