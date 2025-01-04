import swc from 'unplugin-swc';
import { defineConfig } from 'vitest/config'
import path from 'path';

export default defineConfig({
    test: {
        include: ['**/*.e2e-spec.ts'],
        globals: true,
        root: './',
        setupFiles: [
            './test/setup-e2e.ts'
        ]
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
        },
    },
    plugins: [
        swc.vite({
            module: { type: 'es6' }
        })
    ]
})