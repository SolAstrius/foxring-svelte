import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

const BACKEND_URL = process.env.PUBLIC_BACKEND_URL || 'https://foxr.ing';

export default defineConfig({
	plugins: [sveltekit()],
	define: {
		__BACKEND_URL__: JSON.stringify(BACKEND_URL),
	},
});
