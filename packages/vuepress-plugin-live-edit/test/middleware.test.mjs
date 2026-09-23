/**
 * The dev-server endpoints, and the rule that decides when a freshly written
 * asset is served directly.
 */

import { test } from 'node:test'
import assert from 'node:assert/strict'
import { mkdtempSync, mkdirSync, writeFileSync, readFileSync } from 'node:fs'
import { execFileSync } from 'node:child_process'
import { tmpdir } from 'node:os'
import path from 'node:path'

import { createLiveEditMiddleware } from '../src/server/middleware.mjs'

function scratch() {
  const root = mkdtempSync(path.join(tmpdir(), 'live-edit-mw-'))
  mkdirSync(path.join(root, 'docs'))
  mkdirSync(path.join(root, 'public', 'imgs'), { recursive: true })
  writeFileSync(path.join(root, 'docs', 'page.md'), '# Page\n\nText.\n')
  return root
}

/** Drive the middleware with a fake request, collecting the response. */
function call(middleware, { url, method = 'GET', headers = {}, body }) {
  return new Promise((resolve) => {
    const chunks = []
    const req = {
      url,
      method,
      headers,
      on(event, handler) {
        if (event === 'data' && body) handler(Buffer.from(JSON.stringify(body)))
        if (event === 'end') handler()
        return req
      },
    }
    const res = {
      statusCode: 200,
      headers: {},
      setHeader(name, value) {
        this.headers[name.toLowerCase()] = value
      },
      end(payload) {
        resolve({ status: this.statusCode, headers: this.headers, body: payload })
      },
    }
    middleware(req, res, () => resolve({ passedThrough: true }))
  })
}

function build(root, base = '/docs/') {
  return createLiveEditMiddleware({
    docsDir: path.join(root, 'docs'),
    publicDir: path.join(root, 'public'),
    base,
  })
}

test('an unknown endpoint is reported, not passed through', async () => {
  const root = scratch()
  const result = await call(build(root), { url: '/__live-edit/nope' })
  assert.equal(result.status, 404)
})

test('unrelated requests pass through', async () => {
  const root = scratch()
  const result = await call(build(root), { url: '/docs/some/page.html' })
  assert.equal(result.passedThrough, true)
})

test('a page loads and saves back unchanged', async () => {
  const root = scratch()
  const middleware = build(root)

  const loaded = await call(middleware, {
    url: '/__live-edit/source',
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: { route: '/docs/page.html' },
  })
  const source = JSON.parse(loaded.body)
  assert.equal(source.path, 'page.md')

  const saved = await call(middleware, {
    url: '/__live-edit/save',
    method: 'POST',
    body: { route: '/docs/page.html', baseSource: source.source, expectHash: source.hash, doc: source.doc },
  })
  assert.equal(JSON.parse(saved.body).unchanged, true)
  assert.equal(readFileSync(path.join(root, 'docs', 'page.md'), 'utf8'), '# Page\n\nText.\n')
})

test('a save against a stale hash is refused', async () => {
  const root = scratch()
  const middleware = build(root)
  const source = JSON.parse(
    (await call(middleware, { url: '/__live-edit/source', method: 'POST', body: { route: '/docs/page.html' } })).body,
  )

  writeFileSync(path.join(root, 'docs', 'page.md'), '# Changed elsewhere\n')
  const result = await call(middleware, {
    url: '/__live-edit/save',
    method: 'POST',
    body: { route: '/docs/page.html', baseSource: source.source, expectHash: source.hash, doc: source.doc },
  })

  assert.equal(result.status, 409)
  assert.equal(readFileSync(path.join(root, 'docs', 'page.md'), 'utf8'), '# Changed elsewhere\n')
})

test('a freshly written asset is served to an image request', async () => {
  const root = scratch()
  const middleware = build(root)

  const png = readFileSync(new URL('./fixtures/dot.png', import.meta.url))
  const upload = await call(middleware, {
    url: '/__live-edit/asset',
    method: 'POST',
    body: { route: '/docs/page.html', data: `data:image/png;base64,${png.toString('base64')}`, name: 'shot' },
  })
  const asset = JSON.parse(upload.body)
  assert.match(asset.src, /^\/imgs\/shot\.webp$/)

  // The browser asks for it with the site base in front.
  const served = await call(middleware, {
    url: `/docs${asset.src}`,
    headers: { 'sec-fetch-dest': 'image' },
  })
  assert.equal(served.headers['content-type'], 'image/webp')
  assert.ok(served.body.length > 0)
})

test('only image requests are answered from the asset store', async () => {
  // Vite requests asset URLs as modules when a compiled template references
  // them. Answering those with image bytes breaks module loading for the page.
  const root = scratch()
  const middleware = build(root)

  const png = readFileSync(new URL('./fixtures/dot.png', import.meta.url))
  const asset = JSON.parse(
    (await call(middleware, {
      url: '/__live-edit/asset',
      method: 'POST',
      body: { route: '/docs/page.html', data: `data:image/png;base64,${png.toString('base64')}`, name: 'shot' },
    })).body,
  )

  for (const dest of ['script', 'empty', 'document', undefined]) {
    const result = await call(middleware, {
      url: `/docs${asset.src}`,
      headers: dest ? { 'sec-fetch-dest': dest } : {},
    })
    assert.equal(result.passedThrough, true, `sec-fetch-dest: ${dest} should pass through`)
  }
})

test('a page path cannot escape the docs directory', async () => {
  const root = scratch()
  const result = await call(build(root), {
    url: '/__live-edit/source',
    method: 'POST',
    body: { path: '../../etc/passwd' },
  })
  assert.equal(result.status, 400)
})

/** Load a page, then save it back, returning the save response. */
async function roundTrip(middleware, route = '/docs/page.html') {
  const loaded = await call(middleware, {
    url: '/__live-edit/source',
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: { route },
  })
  const source = JSON.parse(loaded.body)
  const saved = await call(middleware, {
    url: '/__live-edit/save',
    method: 'POST',
    body: { route, baseSource: source.source, expectHash: source.hash, doc: source.doc },
  })
  return JSON.parse(saved.body)
}

test('a save reports images that are not there', async () => {
  const root = scratch()
  writeFileSync(path.join(root, 'docs', 'page.md'), '# Page\n\n![gone](/imgs/missing.webp)\n')

  const result = await roundTrip(build(root))
  assert.deepEqual(
    result.warnings.map((warning) => warning.src),
    ['/imgs/missing.webp'],
  )
  assert.equal(result.warnings[0].where, 'image')
})

test('an image that exists is not reported', async () => {
  const root = scratch()
  writeFileSync(path.join(root, 'public', 'imgs', 'there.webp'), 'x')
  writeFileSync(path.join(root, 'docs', 'page.md'), '# Page\n\n![here](/imgs/there.webp)\n')

  assert.deepEqual((await roundTrip(build(root))).warnings, [])
})

test('a reference written with the site base still resolves', async () => {
  const root = scratch()
  writeFileSync(path.join(root, 'public', 'imgs', 'there.webp'), 'x')
  writeFileSync(path.join(root, 'docs', 'page.md'), '# Page\n\n![here](/docs/imgs/there.webp)\n')

  assert.deepEqual((await roundTrip(build(root))).warnings, [])
})

test('an external image is never reported as missing', async () => {
  const root = scratch()
  writeFileSync(path.join(root, 'docs', 'page.md'), '# Page\n\n![x](https://example.com/a.webp)\n')

  assert.deepEqual((await roundTrip(build(root))).warnings, [])
})

test('outside a repository the change marks say so rather than failing', async () => {
  const root = scratch()
  const result = await call(build(root), {
    url: '/__live-edit/changes',
    method: 'POST',
    body: { route: '/docs/page.html' },
  })
  const payload = JSON.parse(result.body)
  assert.equal(result.status, 200)
  assert.equal(payload.available, false)
  assert.deepEqual(payload.keys, [])
})

/** A scratch repo with `page.md` committed. */
function repo(content) {
  const root = scratch()
  writeFileSync(path.join(root, 'docs', 'page.md'), content)
  const git = (...args) =>
    execFileSync('git', args, { cwd: root, stdio: ['ignore', 'pipe', 'ignore'], encoding: 'utf8' })
  git('init', '-q')
  git('config', 'user.email', 'test@example.com')
  git('config', 'user.name', 'test')
  git('add', '-A')
  git('commit', '-qm', 'first')
  return root
}

const changesOf = async (root) =>
  JSON.parse(
    (
      await call(build(root), {
        url: '/__live-edit/changes',
        method: 'POST',
        body: { route: '/docs/page.html' },
      })
    ).body,
  )

test('a committed file with no edits has no changed blocks', async () => {
  const root = repo('# Page\n\nOne.\n\nTwo.\n')
  const payload = await changesOf(root)
  assert.equal(payload.available, true)
  assert.deepEqual(payload.keys, [])
})

test('only the edited block is reported as changed', async () => {
  const root = repo('# Page\n\nOne.\n\nTwo.\n')
  writeFileSync(path.join(root, 'docs', 'page.md'), '# Page\n\nOne, edited.\n\nTwo.\n')

  // Block 0 is the heading, 2 is the first paragraph, 4 the second.
  assert.deepEqual((await changesOf(root)).keys, ['2'])
})

test('an added block is reported, and its neighbours are not', async () => {
  const root = repo('# Page\n\nOne.\n\nTwo.\n')
  writeFileSync(path.join(root, 'docs', 'page.md'), '# Page\n\nOne.\n\nInserted.\n\nTwo.\n')

  assert.deepEqual((await changesOf(root)).keys, ['4'])
})

test('a file git does not track yet counts as entirely new', async () => {
  const root = repo('# Page\n\nOne.\n')
  writeFileSync(path.join(root, 'docs', 'fresh.md'), '# Fresh\n\nNew.\n')

  const payload = JSON.parse(
    (
      await call(build(root), {
        url: '/__live-edit/changes',
        method: 'POST',
        body: { route: '/docs/fresh.html' },
      })
    ).body,
  )
  assert.equal(payload.untracked, true)
  assert.deepEqual(payload.keys, ['0', '2'])
})
