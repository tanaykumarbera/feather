import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
    plugins: [react()],
    build: {
        // Output to assets/built to match Ghost theme structure
        outDir: 'assets/built',
        assetsDir: '.',
        // Do not empty the output directory as it might contain other assets
        emptyOutDir: true,
        manifest: true,
        rollupOptions: {
            input: '/source/client.jsx', // Entry point
            output: {
                entryFileNames: 'feather.js',
                assetFileNames: 'feather.[ext]', // Simpler naming for CSS if possible, though Vite hashes by default
            },
        },
    },
    resolve: {
        alias: {
            // Map legacy imports if any
            '@': path.resolve(__dirname, './source'),
        },
    },
    define: {
        // Polyfill process.env.NODE_ENV for some legacy libs if needed
        'process.env': {}
    }
});
