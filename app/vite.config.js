import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';
import svgr from "vite-plugin-svgr";
import * as path from "path";

export default defineConfig({
    server: {
        host: '0.0.0.0',
        port: 3002,
        open: false,
    },
    plugins: [
        react(),
        svgr(),
        laravel({
            input: ['resources/js/app.js'],
            refresh: true,
        }),
    ],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "/app/resources/js/"),
        },
    },
});
