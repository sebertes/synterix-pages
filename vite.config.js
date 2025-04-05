import {sveltekit} from '@sveltejs/kit/vite';
import {defineConfig} from 'vite';

export default defineConfig({
    plugins: [
        sveltekit(),
    ],
    css: {
        preprocessorOptions: {
            sass: {
                api: 'modern',
                additionalData: `@use '$lib/variables' as *;`,
            },
            scss: {
                api: 'modern',
                additionalData: `@use '$lib/variables' as *;`,
            }
        },
    }
});
