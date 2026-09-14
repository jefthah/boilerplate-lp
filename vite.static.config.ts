import { cp, mkdir, readdir } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig, normalizePath } from 'vite';

const projectPath = (relativePath: string): string =>
    normalizePath(fileURLToPath(new URL(relativePath, import.meta.url)));

const publicDirectory = projectPath('./public');
const outputDirectory = projectPath('./dist');
const includedPublicEntries = new Set([
    'assets',
    'lms',
    'apple-touch-icon.png',
    'favicon.ico',
    'favicon.svg',
    'robots.txt',
]);

const copyPublicAssets = () => ({
    name: 'copy-public-assets',
    apply: 'build' as const,
    async closeBundle() {
        await mkdir(outputDirectory, { recursive: true });

        for (const entry of await readdir(publicDirectory, {
            withFileTypes: true,
        })) {
            if (!includedPublicEntries.has(entry.name)) {
                continue;
            }

            await cp(
                join(publicDirectory, entry.name),
                join(outputDirectory, entry.name),
                {
                    recursive: true,
                    force: true,
                },
            );
        }
    },
});

export default defineConfig({
    root: projectPath('./static'),
    publicDir: false,
    plugins: [
        react({
            babel: {
                plugins: ['babel-plugin-react-compiler'],
            },
        }),
        tailwindcss(),
        copyPublicAssets(),
    ],
    resolve: {
        alias: [
            {
                find: '@inertiajs/react',
                replacement: projectPath('./static/shims/inertia.tsx'),
            },
            {
                find: '@/components/tracking/TrackedCTA',
                replacement: projectPath('./static/shims/tracked-cta.tsx'),
            },
            {
                find: '@',
                replacement: projectPath('./resources/js'),
            },
        ],
    },
    build: {
        outDir: outputDirectory,
        emptyOutDir: true,
        chunkSizeWarningLimit: 1000,
    },
});
