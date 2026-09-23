/**
 * Browser-mode tests for the editor chrome.
 *
 * These need a real layout engine: the bugs they cover are geometric, and
 * jsdom reports every getBoundingClientRect as zero, so it would pass them
 * all without testing anything. The Node suite stays on `node --test`.
 */

import { defineConfig } from 'vitest/config'
import { playwright } from '@vitest/browser-playwright'

export default defineConfig({
  test: {
    include: ['test-browser/**/*.test.js'],
    browser: {
      enabled: true,
      provider: playwright(),
      headless: true,
      instances: [{ browser: 'chromium' }],
    },
  },
})
