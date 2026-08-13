import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';

export default defineConfig({
  plugins: [
    svelte()
  ],
  base: '/holbertonschool-agentic_ai/',
  server: {
    host: "0.0.0.0",
    port: 3000
  }
});