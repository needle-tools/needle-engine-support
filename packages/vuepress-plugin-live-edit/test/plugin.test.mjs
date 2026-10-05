import { test } from 'node:test'
import assert from 'node:assert/strict'
import { existsSync } from 'node:fs'

import { liveEditPlugin } from '../src/index.mjs'

test('the client config path is safe for VuePress to write into an import', () => {
  const app = {
    env: { isDev: true },
    dir: { source: () => 'documentation' },
    options: { base: '/' },
  }
  const { clientConfigFile } = liveEditPlugin()(app)

  assert.ok(clientConfigFile)
  assert.equal(clientConfigFile.includes('\\'), false)
  assert.equal(existsSync(clientConfigFile), true)
})
