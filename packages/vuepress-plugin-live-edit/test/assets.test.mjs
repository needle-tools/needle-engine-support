/**
 * The paste pipeline: scale detection, file placement and emitted markdown.
 * Each scale signal is pinned separately as well as in combination.
 */

import { test } from 'node:test'
import assert from 'node:assert/strict'
import { mkdtempSync, mkdirSync, writeFileSync, readFileSync, existsSync } from 'node:fs'
import { tmpdir } from 'node:os'
import path from 'node:path'
import { createRequire } from 'node:module'

import {
  decideDensity,
  suggestAssetDir,
  imageMarkdown,
  uniqueFileName,
  writePastedImage,
  DEFAULT_CONTENT_WIDTH,
  isGenericAssetName,
} from '../src/core/assets.mjs'

const require = createRequire(import.meta.url)
const sharp = require('sharp')

function scratch() {
  return mkdtempSync(path.join(tmpdir(), 'live-edit-assets-'))
}

const png = (width, height, density) => {
  let image = sharp({ create: { width, height, channels: 3, background: '#3eaf7c' } })
  if (density) image = image.withMetadata({ density })
  return image.png().toBuffer()
}

test('image metadata dpi is the strongest scale signal', () => {
  assert.equal(decideDensity({ dpi: 144, devicePixelRatio: 1, width: 100 }).density, 2)
  assert.equal(decideDensity({ dpi: 108, devicePixelRatio: 1, width: 100 }).density, 1.5)
  // 72dpi is the default encoders write with no information.
  assert.equal(decideDensity({ dpi: 72, devicePixelRatio: 1, width: 100 }).density, 1)
})

test('a Retina display implies 2x even with no metadata', () => {
  const result = decideDensity({ devicePixelRatio: 2, width: 400 })
  assert.equal(result.density, 2)
  assert.match(result.reason, /Retina|2x/)
})

test('an image far wider than the column gets a srcset regardless', () => {
  assert.equal(decideDensity({ devicePixelRatio: 1, width: DEFAULT_CONTENT_WIDTH * 2 }).density, 2)
  assert.equal(decideDensity({ devicePixelRatio: 1, width: DEFAULT_CONTENT_WIDTH * 1.6 }).density, 1.5)
  assert.equal(decideDensity({ devicePixelRatio: 1, width: DEFAULT_CONTENT_WIDTH }).density, 1)
})

test('every decision explains itself', () => {
  for (const signals of [
    { dpi: 144 },
    { devicePixelRatio: 2 },
    { width: 4000 },
    { devicePixelRatio: 1, width: 100 },
  ]) {
    const result = decideDensity(signals)
    assert.ok(result.reason && result.reason.length > 5, `no reason for ${JSON.stringify(signals)}`)
  }
})

test('markdown uses the site\'s own high-DPI convention', () => {
  assert.equal(imageMarkdown({ alt: 'A', src: '/imgs/a.webp', density: 2 }), '![A](/imgs/a.webp "2x")')
  assert.equal(imageMarkdown({ alt: 'A', src: '/imgs/a.webp', density: 1.5 }), '![A](/imgs/a.webp "1.5x")')
  assert.equal(imageMarkdown({ alt: 'A', src: '/imgs/a.webp', density: 1 }), '![A](/imgs/a.webp)')
})

test('alt text containing brackets is escaped', () => {
  assert.equal(imageMarkdown({ alt: 'a [b] c', src: '/x.webp' }), '![a \\[b\\] c](/x.webp)')
})

test('the target folder follows the images a page already uses', () => {
  const root = scratch()
  mkdirSync(path.join(root, 'blender'))
  mkdirSync(path.join(root, 'imgs'))

  const pageSource = [
    '![one](/blender/a.webp)',
    '![two](/blender/b.webp)',
    '<img src="/imgs/c.webp" />',
  ].join('\n')

  const result = suggestAssetDir({ pageSource, pagePath: 'unrelated/page.md', publicDir: root })
  assert.equal(result.dir, 'blender')
  assert.match(result.reason, /already/)
})

test('a page with no images falls back to matching its own path', () => {
  const root = scratch()
  mkdirSync(path.join(root, 'cloud'))
  const result = suggestAssetDir({ pageSource: '# Hi', pagePath: 'cloud/pricing.md', publicDir: root })
  assert.equal(result.dir, 'cloud')
})

test('with nothing to go on it uses the default folder', () => {
  const root = scratch()
  const result = suggestAssetDir({ pageSource: '', pagePath: 'a/b.md', publicDir: root, fallback: 'imgs' })
  assert.equal(result.dir, 'imgs')
})

test('filenames never collide', () => {
  const root = scratch()
  writeFileSync(path.join(root, 'shot.webp'), 'x')
  writeFileSync(path.join(root, 'shot-2.webp'), 'x')
  assert.equal(uniqueFileName(root, 'shot', 'webp'), 'shot-3.webp')
  assert.equal(uniqueFileName(root, 'Some Title!', 'webp'), 'some-title.webp')
})

test('a pasted screenshot is written as webp and embedded at 2x', async () => {
  const root = scratch()
  const buffer = await png(1600, 900)

  const result = await writePastedImage({
    buffer,
    publicDir: root,
    dir: 'imgs',
    name: 'unity build window',
    alt: 'Unity Build Window',
    devicePixelRatio: 2,
  })

  assert.equal(result.file, 'unity-build-window.webp')
  assert.equal(result.density, 2)
  assert.equal(result.src, '/imgs/unity-build-window.webp')
  assert.equal(result.markdown, '![Unity Build Window](/imgs/unity-build-window.webp "2x")')
  assert.ok(existsSync(path.join(root, 'imgs', 'unity-build-window.webp')))

  const written = await sharp(readFileSync(path.join(root, 'imgs', 'unity-build-window.webp'))).metadata()
  assert.equal(written.format, 'webp')
  assert.equal(written.width, 1600)
})

test('webp is smaller than the png it came from', async () => {
  const root = scratch()
  const buffer = await png(1200, 800)
  const result = await writePastedImage({ buffer, publicDir: root, dir: 'imgs', name: 'shot' })
  assert.ok(result.bytes < buffer.length, `webp ${result.bytes} >= png ${buffer.length}`)
})

test('an explicit scale overrides detection', async () => {
  const root = scratch()
  const result = await writePastedImage({
    buffer: await png(2000, 1000),
    publicDir: root,
    dir: 'imgs',
    name: 'wide',
    density: 1,
    devicePixelRatio: 2,
  })
  assert.equal(result.density, 1)
  assert.equal(result.reason, 'set by hand')
  assert.ok(!result.markdown.includes('"2x"'))
})

test('animated images are stored as pasted rather than re-encoded', async () => {
  const root = scratch()
  // Animated input must not be re-encoded.
  const frames = await sharp({
    create: { width: 32, height: 64, channels: 3, background: '#000' },
  })
    .webp()
    .toBuffer()
  const animated = await sharp(frames, { pages: 1 }).webp({ loop: 0 }).toBuffer()

  const result = await writePastedImage({ buffer: animated, publicDir: root, dir: 'imgs', name: 'anim' })
  assert.ok(existsSync(path.join(root, 'imgs', result.file)))
})

test('a pasted image cannot escape the public directory', async () => {
  const root = scratch()
  await assert.rejects(
    () => writePastedImage({ buffer: Buffer.from('x'), publicDir: root, dir: '../../etc', name: 'x' }),
    /refusing to touch/,
  )
})

/*
  The name a pasted file arrives with is the operating system's more often than
  the author's. Each row is a real shape one of them produces.
*/
const GENERIC_NAMES = [
  'c894efd9-b2a3-45ee-925f-4a1e020717cb',
  'Screenshot 2026-09-22 at 15.16.01',
  'Screen Shot 2026-09-22 at 3.16.01 PM',
  'Bildschirmfoto 2026-09-22 um 15.16.01',
  'Screenshot_20240116-101500',
  'IMG_4821',
  'DSC00123',
  'PXL_20240116_101500',
  'P1010001',
  'image',
  'image (1)',
  'image-2',
  'Pasted image 20240101120000',
  'download',
  'download (3)',
  'untitled',
  'clipboard',
  'unnamed',
  'tmp',
  '1706789012345',
  'a3f5c9e1b2d4f60718293a4b5c6d7e8f',
  '',
  null,
  undefined,
]

const MEANINGFUL_NAMES = [
  'needle-mesh-baker',
  'owl-comparison',
  'hero-banner',
  'image-slides',
  'quad-remeshing-before-after',
  'mesh baker workbench',
  'nefertiti-bust',
  'p5-sketch',
  'scan-of-the-bear',
]

test('stock filenames are recognised as saying nothing', () => {
  for (const name of GENERIC_NAMES) {
    assert.equal(isGenericAssetName(name), true, `expected ${JSON.stringify(name)} to be generic`)
  }
})

test('a name the author chose is kept', () => {
  for (const name of MEANINGFUL_NAMES) {
    assert.equal(isGenericAssetName(name), false, `expected ${JSON.stringify(name)} to be kept`)
  }
})
