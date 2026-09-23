/**
 * Autodiscovery, checked against the real components and corpus. Assertions are
 * lower bounds and shape checks, so ordinary doc edits do not break the build.
 */

import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync, mkdtempSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

import { buildRegistry, componentTagSet, parseComponentProps } from '../src/core/registry.mjs'
import { listMarkdownFiles } from '../src/core/paths.mjs'
import { parseElement, serializeElement, collectElements } from '../src/core/vue-template.mjs'
import { assertInside, routeToSourceFile, slugify } from '../src/core/paths.mjs'

const files = listMarkdownFiles(path.resolve(fileURLToPath(new URL('../../../documentation', import.meta.url))))

const REPO_ROOT = path.resolve(fileURLToPath(new URL('../../..', import.meta.url)))
const DOCS_DIR = path.join(REPO_ROOT, 'documentation')
const COMPONENTS_DIR = path.join(DOCS_DIR, '.vuepress', 'components')

const registry = buildRegistry({
  docsDir: DOCS_DIR,
  componentsDir: COMPONENTS_DIR,
  configFile: path.join(DOCS_DIR, '.vuepress', 'config.ts'),
})

const container = (name) => registry.containers.find((entry) => entry.name === name)
const component = (tag) => registry.components.find((entry) => entry.tag === tag)

test('containers registered in the site config are discovered', () => {
  // These exist only as markdownContainerPlugin calls.
  for (const name of ['file', 'file-tree']) {
    const found = container(name)
    assert.ok(found, `${name} was not discovered`)
    assert.equal(found.source, 'site-config')
  }
})

test('built-in containers are present even when unused', () => {
  for (const name of ['tip', 'warning', 'details', 'danger']) {
    assert.ok(container(name), `${name} missing`)
  }
})

test('container usage counts reflect the corpus', () => {
  assert.ok(container('tip').usage > 200, `tip used ${container('tip').usage} times`)
  assert.ok(container('tip').examples.length > 0, 'no example titles captured')
})

test('components are discovered from .vue files with their real props', () => {
  const embed = component('video-embed')
  assert.ok(embed, 'video-embed not found')
  assert.equal(embed.source, 'component-file')

  // `crop` and `shadow` sit behind long block comments in the source.
  const names = embed.props.map((prop) => prop.name)
  for (const name of ['src', 'sources', 'controls', 'crop', 'shadow']) {
    assert.ok(names.includes(name), `video-embed prop ${name} missing (got ${names.join(', ')})`)
  }
})

test('required props and doc comments survive extraction', () => {
  const step = component('walkthrough-step')
  assert.ok(step, 'walkthrough-step not found')
  const src = step.props.find((prop) => prop.name === 'src')
  assert.ok(src?.required, 'src should be required')
  assert.ok(
    step.props.some((prop) => prop.description),
    'no prop descriptions captured',
  )
})

test('components used but never declared are still discovered', () => {
  // No .vue file: it is in the registry only because the scan saw it used.
  const engine = component('needle-engine')
  assert.ok(engine, 'needle-engine not found')
  assert.equal(engine.source, 'discovered')
  assert.equal(engine.file, null)
  assert.ok(engine.usage > 0)
})

test('a component is only counted where it is really embedded', () => {
  // The docs mention `<needle-engine>` more often than they embed it.
  const engine = component('needle-engine')
  const mentions = files
    .map((file) => (readFileSync(file, 'utf8').match(/<needle-engine/g) || []).length)
    .reduce((a, b) => a + b, 0)
  assert.ok(mentions > 50, `expected many mentions, saw ${mentions}`)
  assert.ok(engine.usage < 10, `counted ${engine.usage} embeds among ${mentions} mentions`)
})

test('attributes of an undeclared component are recorded from usage', () => {
  // Synthetic: with no .vue file there are no props, so observed attributes
  // are the only fields the editor can offer.
  const root = mkdtempSync(path.join(tmpdir(), 'live-edit-registry-'))
  writeFileSync(
    path.join(root, 'page.md'),
    [
      '# Demo',
      '',
      '<my-widget mode="compact" count="3"></my-widget>',
      '',
      '<my-widget mode="wide"></my-widget>',
      '',
      '```html',
      '<my-widget mode="this-one-is-a-code-sample"></my-widget>',
      '```',
      '',
    ].join('\n'),
  )

  const scanned = buildRegistry({ docsDir: root })
  const widget = scanned.components.find((entry) => entry.tag === 'my-widget')
  assert.ok(widget, 'my-widget not discovered')
  assert.equal(widget.source, 'discovered')
  assert.equal(widget.usage, 2, 'the code sample should not count')

  const attrs = Object.fromEntries(widget.attrsSeen.map((a) => [a.name, a.count]))
  assert.deepEqual(attrs, { mode: 2, count: 1 })
})

test('containers are discovered from usage alone', () => {
  const root = mkdtempSync(path.join(tmpdir(), 'live-edit-registry-'))
  writeFileSync(path.join(root, 'page.md'), ':::custom-thing With a title\nbody\n:::\n')

  const scanned = buildRegistry({ docsDir: root })
  const found = scanned.containers.find((entry) => entry.name === 'custom-thing')
  assert.ok(found, 'custom-thing not discovered')
  assert.equal(found.source, 'discovered')
  assert.deepEqual(found.examples, ['With a title'])
})

test('markdown placeholders in code samples are not mistaken for components', () => {
  // These appear in inline code as placeholders to substitute.
  for (const tag of ['your-project-name', 'your-blendfile-name', 'your-user']) {
    assert.equal(component(tag), undefined, `${tag} should not be a component`)
  }
})

test('every discovered component has a usable shape', () => {
  for (const entry of registry.components) {
    assert.equal(typeof entry.tag, 'string')
    assert.ok(Array.isArray(entry.props), `${entry.tag} props not an array`)
    assert.ok(Array.isArray(entry.attrsSeen), `${entry.tag} attrsSeen not an array`)
  }
  assert.ok(componentTagSet(registry).has('video-embed'))
})

test('prop extraction survives an unparseable component', () => {
  assert.deepEqual(parseComponentProps('<script>this is not valid javascript {{{</script>'), [])
  assert.deepEqual(parseComponentProps(''), [])
})

test('Vue attribute syntax round-trips as written', () => {
  const source = '<walkthrough-step src="/a.html" :actions="[1,2]" split @done="x" />'
  const parsed = parseElement(source)
  assert.equal(parsed.tag, 'walkthrough-step')
  assert.deepEqual(
    parsed.attributes.map((attribute) => attribute.name),
    ['src', ':actions', 'split', '@done'],
  )
  // A bare attribute stays bare rather than becoming `split=""`.
  assert.equal(parsed.attributes.find((attribute) => attribute.name === 'split').value, true)
  assert.equal(serializeElement(parsed), source)
})

test('elements with children keep their contents', () => {
  const parsed = parseElement('<needle-engine src="a.glb">inner <b>text</b></needle-engine>')
  assert.equal(parsed.selfClosing, false)
  assert.equal(parsed.inner, 'inner <b>text</b>')
  assert.equal(serializeElement(parsed), '<needle-engine src="a.glb">inner <b>text</b></needle-engine>')
})

test('nested elements are all collected', () => {
  const tags = collectElements('<div><video-embed src="a" /><tool-tile image="b" /></div>').map((e) => e.tag)
  assert.deepEqual(tags, ['div', 'video-embed', 'tool-tile'])
})

test('malformed markup degrades instead of throwing', () => {
  assert.doesNotThrow(() => parseElement('<not closed'))
  assert.doesNotThrow(() => collectElements('<<>>'))
})

test('paths cannot escape their root', () => {
  assert.throws(() => assertInside('/tmp/root', '../etc/passwd'), /refusing to touch/)
  assert.throws(() => assertInside('/tmp/root', '/etc/passwd'), /refusing to touch/)
  assert.equal(assertInside('/tmp/root', 'a/b.md'), path.resolve('/tmp/root/a/b.md'))
})

test('routes resolve to the markdown behind them', () => {
  assert.equal(
    routeToSourceFile('/docs/deployment.html', { docsDir: DOCS_DIR, base: '/docs/' }),
    path.join(DOCS_DIR, 'deployment.md'),
  )
  assert.equal(
    routeToSourceFile('/docs/getting-started/', { docsDir: DOCS_DIR, base: '/docs/' }),
    path.join(DOCS_DIR, 'getting-started', 'index.md'),
  )
  assert.equal(routeToSourceFile('/docs/nope.html', { docsDir: DOCS_DIR, base: '/docs/' }), null)
})

test('a traversing route resolves to nothing rather than escaping', () => {
  assert.equal(routeToSourceFile('/docs/../../../etc/passwd', { docsDir: DOCS_DIR, base: '/docs/' }), null)
  assert.equal(routeToSourceFile('/docs/%2e%2e/%2e%2e/package.json', { docsDir: DOCS_DIR, base: '/docs/' }), null)
})

test('slugify produces filename-safe stems', () => {
  assert.equal(slugify('Unity Build Window!'), 'unity-build-window')
  assert.equal(slugify('  --- '), 'image')
  assert.equal(slugify('Ünïcödé Trïck'), 'unicode-trick')
})

test('the config file is scanned without being executed', () => {
  // The config is TypeScript with side effects, so it is read as text.
  const raw = readFileSync(path.join(DOCS_DIR, '.vuepress', 'config.ts'), 'utf8')
  assert.ok(raw.includes("type: 'file'"))
  assert.equal(container('file').source, 'site-config')
})
