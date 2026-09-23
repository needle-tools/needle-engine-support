/**
 * Frontmatter parses into editable fields and rebuilds unchanged, over every
 * page in the repo.
 */

import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

import { parseFrontmatter, serializeFrontmatter, newEntry } from '../src/core/frontmatter.mjs'
import { frontmatterOf } from '../src/core/doc.mjs'
import { listMarkdownFiles } from '../src/core/paths.mjs'

const DOCS = path.resolve(fileURLToPath(new URL('../../../documentation', import.meta.url)))
const files = listMarkdownFiles(DOCS)

test('every page\'s frontmatter rebuilds byte for byte', () => {
  let checked = 0
  const broken = []
  for (const file of files) {
    const block = frontmatterOf(readFileSync(file, 'utf8'))
    if (!block) continue
    checked++
    if (serializeFrontmatter(parseFrontmatter(block)) !== block) broken.push(path.relative(DOCS, file))
  }
  assert.ok(checked > 100, `expected most pages to have frontmatter, got ${checked}`)
  assert.deepEqual(broken, [], `${broken.length} page(s) did not rebuild`)
})

test('plain keys parse as editable fields', () => {
  const { entries } = parseFrontmatter('---\ntitle: A Page\ndescription: Something\n---\n')
  assert.deepEqual(
    entries.map((e) => [e.key, e.value, e.scalar]),
    [['title', 'A Page', true], ['description', 'Something', true]],
  )
})

test('nested YAML stays a block and is not editable as a field', () => {
  const block = ['---', 'title: A Page', 'head:', '  - - meta', '    - content: x', '---', ''].join('\n')
  const parsed = parseFrontmatter(block)
  assert.equal(parsed.entries.length, 2)
  assert.equal(parsed.entries[0].scalar, true)
  assert.equal(parsed.entries[1].scalar, false, 'head: should stay raw')
  assert.equal(serializeFrontmatter(parsed), block)
})

test('a multi-line quoted value stays a block', () => {
  const block = ['---', "description: 'one", " two'", '---', ''].join('\n')
  const parsed = parseFrontmatter(block)
  assert.equal(parsed.entries[0].scalar, false)
  assert.equal(serializeFrontmatter(parsed), block)
})

test('editing a field rewrites only that line', () => {
  const block = '---\ntitle: Old\ndescription: Kept\n---\n'
  const parsed = parseFrontmatter(block)
  parsed.entries[0].value = 'New'
  assert.equal(serializeFrontmatter(parsed), '---\ntitle: New\ndescription: Kept\n---\n')
})

test('a value needing quotes gets them', () => {
  const parsed = parseFrontmatter('---\ntitle: Old\n---\n')
  parsed.entries[0].value = 'Has: a colon'
  assert.equal(serializeFrontmatter(parsed), "---\ntitle: 'Has: a colon'\n---\n")
})

test('a field can be added', () => {
  const parsed = parseFrontmatter('---\ntitle: A\n---\n')
  parsed.entries.push(newEntry('image', '/imgs/a.webp'))
  assert.equal(serializeFrontmatter(parsed), '---\ntitle: A\nimage: /imgs/a.webp\n---\n')
})
