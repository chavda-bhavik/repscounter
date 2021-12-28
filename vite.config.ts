import { defineConfig } from 'vite';
import reactRefresh from '@vitejs/plugin-react-refresh';
import tsconfigPaths from 'vite-tsconfig-paths';
import svgr from '@honkhonk/vite-plugin-svgr';

// https://vitejs.dev/config/
export default defineConfig({
    build: {
        brotliSize: false,
    },
    plugins: [tsconfigPaths(), reactRefresh(), svgr()],
    optimizeDeps: {
        exclude: ['@tailwindcss'],
    },
});
