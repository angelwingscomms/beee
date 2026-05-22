import { mount } from 'svelte';
import App from './App.svelte';

const target = document.getElementById('svelte');

if (!target) {
	throw new Error('Missing Svelte mount target');
}

const app = mount(App, { target });

export default app;
