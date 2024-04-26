import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
    base: '/',
    server: {
        port: 3000,
    },
    plugins: [react()],
    test: {
        globals: true,
        environment: 'jsdom',
        setupFiles: './src/setupTests.ts',
        css: true,
        reporters: ['verbose'],
        coverage: {
            reporter: ['text', 'json', 'html'],
            include: ['src/**/*'],
            exclude: [],
        }
    },
    esbuild: {
        loader: "jsx"
    },
    optimizeDeps: {
        esbuildOptions: {
            loader: {
                ".js": "jsx",
            },
        },
    },

})