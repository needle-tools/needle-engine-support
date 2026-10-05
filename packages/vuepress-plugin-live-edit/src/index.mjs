/**
 * VuePress plugin entry.
 *
 * Adds the editor to the dev server only: the Vite plugin is `apply: 'serve'`
 * and the client entry is registered only in dev, so `vuepress build` includes
 * none of it.
 *
 * Usage, in `.vuepress/config.ts`:
 *
 *     import { liveEditPlugin } from '@needle-tools/vuepress-plugin-live-edit'
 *     plugins: [ liveEditPlugin({ componentsDir: path.resolve(__dirname, './components') }) ]
 */

import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { createLiveEditMiddleware, ENDPOINT } from './server/middleware.mjs'

const PACKAGE_DIR = path.dirname(fileURLToPath(new URL('../package.json', import.meta.url)))

/**
 * @param {object} [options]
 * @param {string} [options.docsDir] markdown root; defaults to the VuePress source dir
 * @param {string} [options.publicDir] static assets root; defaults to `<source>/.vuepress/public`
 * @param {string} [options.componentsDir] directory registered with register-components
 * @param {string} [options.configFile] VuePress config, scanned for container registrations
 * @param {number} [options.contentWidth] rendered content width, used for 2x detection
 * @param {boolean} [options.enabled] force on or off; defaults to dev-only
 * @returns {import('vuepress').Plugin}
 */
export function liveEditPlugin(options = {}) {
  return (app) => {
    const isDev = app.env.isDev
    const enabled = options.enabled ?? isDev

    const docsDir = options.docsDir ?? app.dir.source()
    const publicDir = options.publicDir ?? path.join(docsDir, '.vuepress', 'public')
    const componentsDir = options.componentsDir ?? path.join(docsDir, '.vuepress', 'components')
    const configFile = options.configFile ?? path.join(docsDir, '.vuepress', 'config.ts')

    return {
      name: 'vuepress-plugin-live-edit',

      // Only in dev, so ProseMirror stays out of production bundles.
      // VuePress writes this into a quoted JS import without escaping backslashes.
      clientConfigFile: enabled ? path.join(PACKAGE_DIR, 'src/client/config.js').replaceAll('\\', '/') : undefined,

      // VuePress serializes these itself, unlike Vite's `define`.
      define: {
        __LIVE_EDIT_ENDPOINT__: ENDPOINT,
        __LIVE_EDIT_BASE__: app.options.base ?? '/',
      },

      extendsBundlerOptions: (bundlerOptions, bundlerApp) => {
        if (!enabled) return
        if (bundlerApp.options.bundler.name !== '@vuepress/bundler-vite') return

        const vite = (bundlerOptions.viteOptions ??= {})
        const plugins = (vite.plugins ??= [])

        plugins.push({
          name: 'needle:live-edit',
          apply: 'serve',
          configureServer(server) {
            const middleware = createLiveEditMiddleware({
              docsDir,
              publicDir,
              componentsDir,
              configFile,
              base: bundlerApp.options.base ?? '/',
              contentWidth: options.contentWidth,
              // VuePress re-renders from its own watcher; emitting directly
              // makes the reload follow the save without waiting on fs events.
              onWrite: (file) => server.watcher.emit('change', file),
            })

            // Registered directly, to run before Vite's SPA fallback.
            server.middlewares.use(middleware)
          },
        })

        // The editor loads lazily; without this Vite discovers these
        // mid-session, re-optimizes and forces a reload.
        const optimize = (vite.optimizeDeps ??= {})
        optimize.include = [
          ...(optimize.include ?? []),
          'prosemirror-model',
          'prosemirror-state',
          'prosemirror-view',
          'prosemirror-keymap',
          'prosemirror-commands',
          'prosemirror-history',
          'prosemirror-inputrules',
          'prosemirror-schema-list',
          'prosemirror-gapcursor',
          'prosemirror-tables',
          '@vue/compiler-dom',
        ]
      },
    }
  }
}

export default liveEditPlugin
export { ENDPOINT }
