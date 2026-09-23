/**
 * Parser invariants, over the real documentation rather than fixtures: every
 * file round-trips byte for byte and every line belongs to exactly one block.
 */

import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

import { parseBlocks, serializeBlocks, splitLines, walkBlocks } from '../src/core/blocks.mjs'
import { listMarkdownFiles } from '../src/core/paths.mjs'

const REPO_ROOT = path.resolve(fileURLToPath(new URL('../../..', import.meta.url)))
const DOCS_DIR = path.join(REPO_ROOT, 'documentation')
const files = listMarkdownFiles(DOCS_DIR)

test('the docs tree is actually being scanned', () => {
  assert.ok(files.length > 100, `expected the full docs tree, got ${files.length} files`)
})

test('every documentation file round-trips byte for byte', () => {
  /** @type {string[]} */
  const broken = []
  for (const file of files) {
    const src = readFileSync(file, 'utf8')
    const { blocks } = parseBlocks(src)
    if (serializeBlocks(blocks) !== src) broken.push(path.relative(REPO_ROOT, file))
  }
  assert.deepEqual(broken, [], `${broken.length} file(s) did not round-trip`)
})

test('blocks cover every line exactly once, with no gaps or overlaps', () => {
  /** @type {string[]} */
  const broken = []
  for (const file of files) {
    const src = readFileSync(file, 'utf8')
    const { blocks, lines } = parseBlocks(src)

    let cursor = 0
    let ok = true
    for (const block of blocks) {
      if (block.start !== cursor) ok = false
      cursor = block.end
    }
    if (cursor !== lines.length) ok = false
    if (!ok) broken.push(path.relative(REPO_ROOT, file))
  }
  assert.deepEqual(broken, [], `${broken.length} file(s) had gaps or overlaps`)
})

test('container children cover the container interior exactly', () => {
  /** @type {string[]} */
  const broken = []
  for (const file of files) {
    const src = readFileSync(file, 'utf8')
    const { blocks } = parseBlocks(src)
    walkBlocks(blocks, (block) => {
      if (!block.children) return
      const interiorStart = block.start + 1
      const interiorEnd = block.fence.close ? block.end - 1 : block.end
      let cursor = interiorStart
      for (const child of block.children) {
        if (child.start !== cursor) broken.push(`${path.relative(REPO_ROOT, file)} :${child.start}`)
        cursor = child.end
      }
      if (cursor !== interiorEnd) {
        broken.push(`${path.relative(REPO_ROOT, file)} container@${block.start} ends ${cursor} != ${interiorEnd}`)
      }
    })
  }
  assert.deepEqual(broken, [], 'container interiors were not covered exactly')
})

test('a block src always equals its own line range', () => {
  for (const file of files) {
    const src = readFileSync(file, 'utf8')
    const { blocks, lines } = parseBlocks(src)
    walkBlocks(blocks, (block) => {
      assert.equal(
        block.src,
        lines.slice(block.start, block.end).join(''),
        `${path.relative(REPO_ROOT, file)} block ${block.type}@${block.start}`,
      )
    })
  }
})

test('re-parsing serialized output is stable (idempotent)', () => {
  for (const file of files) {
    const src = readFileSync(file, 'utf8')
    const first = serializeBlocks(parseBlocks(src).blocks)
    const second = serializeBlocks(parseBlocks(first).blocks)
    assert.equal(second, first, path.relative(REPO_ROOT, file))
  }
})

test('splitLines preserves CRLF and a missing final newline', () => {
  for (const sample of ['a\r\nb\r\n', 'a\nb', '', '\n', 'x', 'a\n\n\nb\n']) {
    assert.equal(splitLines(sample).join(''), sample, JSON.stringify(sample))
  }
})
