import App from './App.svelte';

let app: any;

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    app = new App({
      target: document.getElementById('svelte')!,
    });
  });
} else {
  app = new App({
    target: document.getElementById('svelte')!,
  });
}

export default app;
