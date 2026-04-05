import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { mockApiPlugin } from './src/lib/mock-api';

const BACKEND_URL = process.env.PUBLIC_BACKEND_URL || '';
const PUBLIC_URL = process.env.PUBLIC_SITE_URL || 'https://foxr.ing';
const USE_MOCKS = !process.env.PUBLIC_BACKEND_URL;

export default defineConfig({
	plugins: [
		...(USE_MOCKS ? [mockApiPlugin()] : []),
		sveltekit(),
	],
	define: {
		__BACKEND_URL__: JSON.stringify(BACKEND_URL),
		__PUBLIC_URL__: JSON.stringify(PUBLIC_URL),
	},
});
