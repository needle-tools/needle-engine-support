import * as path from 'path';
import { defineConfig, optimizeDeps } from 'vite';
import viteCompression from 'vite-plugin-compression';
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig({

    base: "./",
    // publicDir: "./assets", // this would copy all assets in the outdir (but not inside assets)
    assetsInclude: ['*'],
    // logLevel: 'info',

    plugins: [
        viteCompression({ deleteOriginFile: true }),
        visualizer(),
        {
            name: 'reload',
            handleHotUpdate({ file, server }) {
                if (file.endsWith('.glb') || file.endsWith(".gltf") || file.endsWith(".bin")) {
                    server.ws.send({
                        type: 'full-reload',
                        path: '*'
                    });
                }
            },
        }
    ],

    server: {
        // hmr: false,
        // watch: ["generated/**"]
        https: true,
        proxy: { // workaround: specifying a proxy skips HTTP2 which is currently problematic in Vite since it causes session memory timeouts.
            'https://localhost:3000': 'https://localhost:3000'
        },
        watch: {
            awaitWriteFinish: {
                stabilityThreshold: 500,
                pollInterval: 1000
            },
        },
        strictPort: true,
    },
    build: {
        outDir: "./dist",
        emptyOutDir: true,
        keepNames: true,
    },

    esbuild: {
        // KEEP NAMES so that getComponent can rely on constructor names
        // otherwise I've had issues that getComponent didnt find the type when called with the constructor
        // maybe there is a better way to do it. Until then this should be ok I guess
        keepNames: true
    },

    resolve: {
        alias: {
            'three': () => {
                const absPath = path.resolve(__dirname, 'node_modules/three');
                return absPath;
            },
            '@needle-tools/engine': () => {
                const absPath = path.resolve(__dirname, 'node_modules/@needle-tools/engine');
                return absPath;
            },
        }
    }
});