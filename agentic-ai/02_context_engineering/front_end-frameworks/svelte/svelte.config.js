/** @type {import("@sveltejs/vite-plugin-svelte").SvelteConfig} */
import adapter from '@sveltejs/adapter-auto';

export default {
  kit: {
    adapter: adapter(),
    alias: {
      '$lib': 'src/lib'
    }
  }
};
