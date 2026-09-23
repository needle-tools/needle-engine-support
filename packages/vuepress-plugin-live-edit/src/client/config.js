/**
 * VuePress client entry. Registered only in dev.
 *
 * The app context is captured for `vue-host.js`, which needs it to resolve
 * globally registered components by name.
 */

import { defineClientConfig } from 'vuepress/client'
import LiveEdit from './LiveEdit.vue'
import { setAppContext } from './vue-host.js'

export default defineClientConfig({
  enhance({ app }) {
    setAppContext(app._context)
  },
  rootComponents: [LiveEdit],
})
