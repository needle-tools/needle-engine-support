/**
 * Which files a document points at. Read from the document and its markup,
 * not by matching text, so a reference is found wherever it is written.
 */

import { test } from 'node:test'
import assert from 'node:assert/strict'

import { markdownToDoc } from '../src/core/doc.mjs'
import { collectAssetRefs } from '../src/core/asset-refs.mjs'

const refs = (markdown, options = {}) => collectAssetRefs(markdownToDoc(markdown, options)).map((ref) => ref.src)

test('a markdown image is a reference', () => {
  assert.deepEqual(refs('![alt](/imgs/a.webp)\n'), ['/imgs/a.webp'])
})

test('the scale title is not part of the path', () => {
  assert.deepEqual(refs('![alt](/imgs/a.webp "2x")\n'), ['/imgs/a.webp'])
})

test('a relative reference is kept as written', () => {
  assert.deepEqual(refs('![alt](./local.png)\n'), ['./local.png'])
})

test('somewhere else is not our problem', () => {
  const markdown = [
    '![a](https://example.com/a.webp)',
    '',
    '![b](//cdn.example.com/b.webp)',
    '',
    '![c](data:image/png;base64,AAAA)',
    '',
  ].join('\n')
  assert.deepEqual(refs(markdown), [])
})

test('a query or fragment is not part of the path on disk', () => {
  assert.deepEqual(refs('![a](/imgs/a.webp?v=2)\n'), ['/imgs/a.webp'])
})

test('an img tag is read like a markdown image', () => {
  assert.deepEqual(refs('<img src="/imgs/tag.webp" alt="x" />\n'), ['/imgs/tag.webp'])
})

test('srcset candidates are split from their descriptors', () => {
  const markdown = '<img src="/imgs/a.webp" srcset="/imgs/a.webp 1x, /imgs/a@2x.webp 2x" />\n'
  assert.deepEqual(refs(markdown), ['/imgs/a.webp', '/imgs/a@2x.webp'])
})

test('a video poster counts', () => {
  assert.deepEqual(refs('<video poster="/imgs/poster.webp" src="/media/clip.mp4"></video>\n'), [
    '/imgs/poster.webp',
    '/media/clip.mp4',
  ])
})

test('paths inside a bound component prop are found', () => {
  const markdown = [
    '<image-slides',
    '  :images="[',
    "    { src: '/docs/a.webp', caption: 'not a path' },",
    "    { src: '/docs/b.webp' },",
    '  ]"',
    '/>',
    '',
  ].join('\n')
  const componentTags = new Set(['image-slides'])
  assert.deepEqual(refs(markdown, { componentTags }), ['/docs/a.webp', '/docs/b.webp'])
})

test('an unparseable expression hides nothing else', () => {
  const markdown = ['![a](/imgs/a.webp)', '', '<image-slides :images="[{ src: \'/b.webp\' }," />', ''].join('\n')
  const componentTags = new Set(['image-slides'])
  // The broken attribute yields nothing, and the image beside it still counts.
  assert.deepEqual(refs(markdown, { componentTags }), ['/imgs/a.webp'])
})

test('the same file referenced twice is reported once per place', () => {
  const markdown = '![a](/imgs/a.webp)\n\n![b](/imgs/a.webp)\n'
  assert.deepEqual(refs(markdown), ['/imgs/a.webp'])
})

test('a standalone img tag is an image, not raw html', () => {
  // The editor unifies the two so they share one editing surface.
  const found = collectAssetRefs(markdownToDoc('<img src="/imgs/b.webp" />\n', {}))
  assert.deepEqual(found.map((ref) => ref.where), ['image'])
})

test('a reference in other markup says which markup', () => {
  const found = collectAssetRefs(markdownToDoc('<video poster="/imgs/p.webp"></video>\n', {}))
  assert.deepEqual(found.map((ref) => ref.where), ['html'])
})
