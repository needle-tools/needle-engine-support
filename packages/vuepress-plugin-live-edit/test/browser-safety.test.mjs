/**
 * Modules reachable from the client must not import Node built-ins. Vite
 * externalizes them and the editor fails to load at runtime, taking the whole
 * page with it.
 */

import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync, readdirSync } from 'node:fs'
import { createRequire } from 'node:module'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const SRC = path.resolve(fileURLToPath(new URL('../src', import.meta.url)))

/** Relative import specifiers in a source file. */
function importsOf(source) {
  const specifiers = []
  const re = /(?:^|\n)\s*import\s[^'"]*['"]([^'"]+)['"]/g
  let match
  while ((match = re.exec(source))) specifiers.push(match[1])
  return specifiers
}

/** Resolve a relative specifier against a file, trying the usual extensions. */
function resolve(fromFile, specifier) {
  if (!specifier.startsWith('.')) return null
  const base = path.resolve(path.dirname(fromFile), specifier)
  for (const candidate of [base, `${base}.mjs`, `${base}.js`, path.join(base, 'index.mjs')]) {
    try {
      readFileSync(candidate, 'utf8')
      return candidate
    } catch {
      // try the next
    }
  }
  return null
}

/** Every module reachable from the client entry points. */
function clientGraph() {
  const clientDir = path.join(SRC, 'client')
  const queue = readdirSync(clientDir)
    .filter((name) => name.endsWith('.js') || name.endsWith('.mjs'))
    .map((name) => path.join(clientDir, name))

  const seen = new Set()
  while (queue.length) {
    const file = queue.pop()
    if (seen.has(file)) continue
    seen.add(file)
    const source = readFileSync(file, 'utf8')
    for (const specifier of importsOf(source)) {
      const resolved = resolve(file, specifier)
      if (resolved && !seen.has(resolved)) queue.push(resolved)
    }
  }
  return [...seen]
}

test('the client import graph reaches the core schema', () => {
  // A guard on the guard: if resolution silently fails the test proves nothing.
  const graph = clientGraph()
  assert.ok(
    graph.some((file) => file.endsWith(path.join('core', 'schema.mjs'))),
    `expected core/schema.mjs in the graph, got ${graph.length} files`,
  )
})

test('no module reachable from the client imports a Node built-in', () => {
  const offenders = []
  for (const file of clientGraph()) {
    if (file.endsWith('.css')) continue
    const source = readFileSync(file, 'utf8')
    if (/from\s+['"]node:/.test(source) || /createRequire/.test(source)) {
      offenders.push(path.relative(SRC, file))
    }
  }
  assert.deepEqual(offenders, [], 'these are bundled for the browser and would fail to load')
})

test('every node view named in the view map is defined', () => {
  // A missing class only shows up at runtime, where it breaks the whole editor.
  const source = readFileSync(path.join(SRC, 'client', 'node-views.js'), 'utf8')

  const map = /export function createNodeViews[\s\S]*?\n}/.exec(source)
  assert.ok(map, 'createNodeViews not found')

  const used = [...map[0].matchAll(/new\s+([A-Z]\w+)\s*\(/g)].map((m) => m[1])
  assert.ok(used.length >= 6, `expected several node views, found ${used.join(', ')}`)

  const defined = new Set([...source.matchAll(/(?:export\s+)?class\s+([A-Z]\w+)/g)].map((m) => m[1]))
  const missing = used.filter((name) => !defined.has(name))
  assert.deepEqual(missing, [], 'referenced but not defined in this module')
})

test('client modules parse', () => {
  // A truncated or malformed file only fails in the browser, where it takes the
  // page with it. Parsing is enough; importing would need VuePress's virtual
  // modules and would fail for unrelated reasons.
  const require = createRequire(import.meta.url)
  const { parse } = require('@babel/parser')
  const { parse: parseSfc } = require('@vue/compiler-sfc')

  for (const file of clientGraph()) {
    if (file.endsWith('.css')) continue
    const source = readFileSync(file, 'utf8')
    // A single-file component's script is the part that has to be valid JS.
    const code = file.endsWith('.vue')
      ? parseSfc(source).descriptor.scriptSetup?.content ?? parseSfc(source).descriptor.script?.content ?? ''
      : source

    assert.doesNotThrow(
      () => parse(code, { sourceType: 'module', plugins: ['typescript'] }),
      `${path.relative(SRC, file)} has a syntax error`,
    )
  }
})
