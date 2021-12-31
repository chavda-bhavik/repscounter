import { defineConfig } from 'vite';
import reactRefresh from '@vitejs/plugin-react-refresh';
import tsconfigPaths from 'vite-tsconfig-paths';
import svgrPlugin from 'vite-plugin-svgr';

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
    ],
    optimizeDeps: {
        exclude: ['@tailwindcss'],
    },
});
