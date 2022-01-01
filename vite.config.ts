import { defineConfig } from 'vite';
import reactRefresh from '@vitejs/plugin-react-refresh';
import tsconfigPaths from 'vite-tsconfig-paths';
import svgrPlugin from 'vite-plugin-svgr';
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig({
    build: {
        brotliSize: false,
    },
    plugins: [
        tsconfigPaths(),
        reactRefresh(),
        svgrPlugin({
            svgrOptions: {
                icon: true,
                dimensions: false,
            },
        }),
        VitePWA({
            // includeAssets: ['favicon.svg', 'favicon.ico', 'robots.txt', 'apple-touch-icon.png'],
            registerType: 'autoUpdate',
            workbox: {
                cleanupOutdatedCaches: true,
                clientsClaim: true,
                skipWaiting: true,
                navigateFallback: undefined,
                runtimeCaching: [
                    {
                        handler: 'NetworkOnly',
                        urlPattern: /.*\/graphql$/,
                        method: 'POST',
                        options: {
                            backgroundSync: {
                                name: 'data',
                                options: {
                                    maxRetentionTime: 24 * 60 * 90, // 90 days
                                },
                            },
                        },
                    },
                ],
            },
            manifest: {
                name: 'Repscounter',
                short_name: 'Repscounteer',
                description: 'Application to count your exercise reps and calculate your calories burned',
                lang: 'en-US',
                display: 'standalone',
                theme_color: '#EDEDE5',
                icons: [
                    {
                        src: '/icons/favicon-16x16.png',
                        sizes: '16x16',
                        type: 'image/png',
                    },
                    {
                        src: '/icons/favicon-32x32.png',
                        sizes: '32x32',
                        type: 'image/png',
                    },
                    {
                        src: '/icons/icon-72x72.png',
                        sizes: '72x72',
                        type: 'image/png',
                    },
                    {
                        src: '/icons/icon-120x120.png',
                        sizes: '120x120',
                        type: 'image/png',
                    },
                    {
                        src: '/icons/icon-128x128.png',
                        sizes: '128x128',
                        type: 'image/png',
                    },
                    {
                        src: '/icons/icon-144x144.png',
                        sizes: '144x144',
                        type: 'image/png',
                    },
                    {
                        src: '/icons/icon-152x152.png',
                        sizes: '152x152',
                        type: 'image/png',
                    },
                    {
                        src: '/icons/icon-180x180.png',
                        sizes: '180x180',
                        type: 'image/png',
                    },
                    {
                        src: '/icons/icon-192x192.png',
                        sizes: '192x192',
                        type: 'image/png',
                    },
                    {
                        src: '/icons/icon-256x256.png',
                        sizes: '256x256',
                        type: 'image/png',
                    },
                    {
                        src: '/icons/icon-512x512.png',
                        sizes: '512x512',
                        type: 'image/png',
                    },
                ],
            },
        }),
    ],
    optimizeDeps: {
        exclude: ['@tailwindcss'],
    },
});
