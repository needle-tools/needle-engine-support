/**
 * Image paste pipeline: convert, place, name and pick an embed scale.
 *
 * Clipboard bitmaps carry no reliable scale, so `decideDensity` infers it from
 * three signals and returns a reason string for the UI. Output is webp;
 * animations are stored as pasted.
 */

import { existsSync, mkdirSync, readdirSync, writeFileSync } from 'node:fs'
import path from 'node:path'
import { createRequire } from 'node:module'
import { assertInside, slugify } from './paths.mjs'

const require = createRequire(import.meta.url)

/** Lazy: a missing native binary should break pasting, not dev start. */
let sharpModule
function sharp() {
  if (!sharpModule) sharpModule = require('sharp')
  return sharpModule
}

/** Rendered width of the docs content column, in CSS pixels. */
export const DEFAULT_CONTENT_WIDTH = 740

/** 72 dpi is the "no information" default almost every encoder writes. */
const NEUTRAL_DPI = 72

/**
 * Decide the scale factor a pasted bitmap should be embedded at.
 *
 * @param {object} signals
 * @param {number} [signals.dpi] pixel density from image metadata
 * @param {number} [signals.devicePixelRatio] DPR of the pasting browser
 * @param {number} [signals.width] intrinsic pixel width
 * @param {number} [signals.contentWidth] rendered column width
 * @returns {{ density: 1 | 1.5 | 2, reason: string }}
 */
export function decideDensity({ dpi, devicePixelRatio, width, contentWidth = DEFAULT_CONTENT_WIDTH }) {
  // 1. Metadata, when the encoder recorded any. macOS stamps 144 dpi on a
  //    Retina screenshot.
  if (dpi && dpi > NEUTRAL_DPI + 1) {
    if (dpi >= 130) return { density: 2, reason: `image metadata reports ${Math.round(dpi)} dpi` }
    if (dpi >= 100) return { density: 1.5, reason: `image metadata reports ${Math.round(dpi)} dpi` }
  }

  // 2. The display it was pasted from.
  if (devicePixelRatio >= 2) return { density: 2, reason: 'pasted from a 2x (Retina) display' }
  if (devicePixelRatio >= 1.5) return { density: 1.5, reason: `pasted from a ${devicePixelRatio}x display` }

  // 3. Width: anything far wider than the column is downscaled anyway.
  if (width >= contentWidth * 2) return { density: 2, reason: `${width}px wide for a ${contentWidth}px column` }
  if (width >= contentWidth * 1.5) return { density: 1.5, reason: `${width}px wide for a ${contentWidth}px column` }

  return { density: 1, reason: 'no high-DPI signal' }
}

/**
 * Pick the public subdirectory for a page's images: where the page's existing
 * images live, else a folder matching the page path, else `fallback`.
 *
 * @param {object} options
 * @param {string} [options.pageSource] markdown of the page being edited
 * @param {string} [options.pagePath] path of the page, relative to the docs root
 * @param {string} options.publicDir
 * @param {string} [options.fallback]
 * @returns {{ dir: string, reason: string }} `dir` is relative to publicDir
 */
export function suggestAssetDir({ pageSource = '', pagePath = '', publicDir, fallback = 'imgs' }) {
  /** @type {Map<string, number>} */
  const counts = new Map()
  const re = /(?:!\[[^\]]*\]\(|<img[^>]*\ssrc=["'])\s*\/([^)"'\s]+)/g
  let match
  while ((match = re.exec(pageSource))) {
    const dir = path.posix.dirname(match[1])
    if (!dir || dir === '.') continue
    const top = dir.split('/')[0]
    counts.set(top, (counts.get(top) || 0) + 1)
  }
  if (counts.size > 0) {
    const [dir, count] = [...counts.entries()].sort((a, b) => b[1] - a[1])[0]
    if (existsSync(path.join(publicDir, dir))) {
      return { dir, reason: `${count} image${count === 1 ? '' : 's'} on this page already live there` }
    }
  }

  let existing = []
  try {
    existing = readdirSync(publicDir, { withFileTypes: true })
      .filter((e) => e.isDirectory())
      .map((e) => e.name)
  } catch {
    existing = []
  }

  const segments = pagePath.split(/[\\/]/).filter(Boolean)
  const slug = segments.length ? path.basename(segments[segments.length - 1], '.md') : ''
  for (const candidate of [slug, ...segments.slice(0, -1).reverse()]) {
    const hit = existing.find((dir) => dir === candidate)
    if (hit) return { dir: hit, reason: `matches the page path (${candidate})` }
  }

  return { dir: fallback, reason: 'default image folder' }
}

/**
 * A camera, phone or screen recorder naming a file after its counter or the
 * moment it was taken: `IMG_4821`, `DSC00123`, `PXL_20240116_101500`.
 */
const CAMERA_FILE = /^(?:img|dsc|dscn|dji|gopro|pxl|mvimg|pano|burst|photo|p)\d{4,}$/

/** A UUID, as several browsers name a pasted file. */
const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/

/** A content hash or generated id. */
const HEX_BLOB = /^[0-9a-f]{16,}$/

/** Words that describe the file rather than the picture in it. */
const GENERIC_WORD =
  /^(?:image|images|img|picture|pic|photo|file|download|downloaded|untitled|unnamed|noname|clipboard|paste|pasted|pasted image|temp|tmp|capture|captured|snap|snapshot|export|exported|screenshot|screen shot|screen capture|screen recording|bildschirmfoto|bildschirmaufnahme|capture d ecran|scan|scanned|document|new|copy|output|result|asset|media|upload|uploaded)$/

/**
 * Does this filename say anything about the picture?
 *
 * The name a pasted or dropped file arrives with is often the operating
 * system's, not the author's, so it is only worth keeping when it is neither a
 * generated id nor a stock word with a date or counter hung off it. When it is
 * not worth keeping the caller falls back to the alt text or the page slug.
 *
 * @param {string} [name] filename stem, without extension
 * @returns {boolean}
 */
export function isGenericAssetName(name) {
  const raw = String(name ?? '').trim()
  if (!raw) return true

  // One spelling for `Screen Shot`, `screen-shot` and `screen_shot`.
  const text = raw.toLowerCase().replace(/[\s._-]+/g, ' ').trim()
  if (!text) return true

  const joined = text.replace(/ /g, '')
  if (UUID.test(raw.toLowerCase()) || HEX_BLOB.test(joined)) return true
  if (/^\d+$/.test(joined)) return true
  if (CAMERA_FILE.test(joined)) return true

  // Strip the counter, date and clock time a stock name carries, so
  // `Screenshot 2026-09-22 at 15.16.01` is judged as `screenshot`.
  const stem = text
    .replace(/\(\d+\)$/, '')
    .replace(/\b(?:at|um|a|le|del)\b/g, ' ')
    .replace(/\b\d+\b/g, ' ')
    .replace(/\b[ap]m\b/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()

  return GENERIC_WORD.test(stem)
}

/**
 * Reserve a filename in `dir` that does not collide with anything already there.
 * @returns {string} bare filename including extension
 */
export function uniqueFileName(dir, base, ext) {
  const stem = slugify(base)
  let candidate = `${stem}.${ext}`
  let n = 2
  while (existsSync(path.join(dir, candidate))) {
    candidate = `${stem}-${n}.${ext}`
    n++
  }
  return candidate
}

/**
 * Build the markdown for an embedded image. The `"2x"` / `"1.5x"` title is this
 * site's convention; its renderer turns it into a `srcset`.
 *
 * @param {{ alt?: string, src: string, density?: number }} options
 * @returns {string}
 */
export function imageMarkdown({ alt = '', src, density = 1 }) {
  const title = density === 2 ? ' "2x"' : density === 1.5 ? ' "1.5x"' : ''
  return `![${alt.replace(/([[\]])/g, '\\$1')}](${src}${title})`
}

/**
 * Write a pasted image into the public folder and return how to embed it.
 *
 * @param {object} options
 * @param {Buffer} options.buffer raw bytes as pasted
 * @param {string} options.publicDir
 * @param {string} [options.dir] target subfolder, relative to publicDir
 * @param {string} [options.name] preferred file stem
 * @param {string} [options.alt]
 * @param {number} [options.devicePixelRatio]
 * @param {number} [options.contentWidth]
 * @param {1|1.5|2} [options.density] explicit override; skips detection
 * @param {number} [options.quality] webp quality
 * @returns {Promise<{ src: string, markdown: string, density: number, reason: string,
 *   width: number, height: number, bytes: number, file: string, animated: boolean }>}
 */
export async function writePastedImage({
  buffer,
  publicDir,
  dir = 'imgs',
  name = 'image',
  alt = '',
  devicePixelRatio = 1,
  contentWidth = DEFAULT_CONTENT_WIDTH,
  density,
  quality = 80,
}) {
  const targetDir = assertInside(publicDir, dir)
  mkdirSync(targetDir, { recursive: true })

  const image = sharp()(buffer, { animated: true })
  const meta = await image.metadata()
  const animated = (meta.pages || 1) > 1

  const decided =
    density != null
      ? { density, reason: 'set by hand' }
      : decideDensity({
          dpi: meta.density,
          devicePixelRatio,
          width: meta.width || 0,
          contentWidth,
        })

  let output
  let ext
  if (animated) {
    // Stored byte-for-byte; re-encoding an animation is lossy. The extension
    // follows the detected format, since these are the original bytes.
    output = buffer
    ext = meta.format === 'gif' ? 'gif' : meta.format === 'png' ? 'png' : 'webp'
  } else {
    output = await sharp()(buffer).webp({ quality, effort: 4 }).toBuffer()
    ext = 'webp'
  }

  const file = uniqueFileName(targetDir, name || alt || 'image', ext)
  const full = assertInside(publicDir, path.join(dir, file))
  writeFileSync(full, output)

  const src = `/${path.posix.join(dir.split(path.sep).join('/'), file)}`
  return {
    src,
    markdown: imageMarkdown({ alt, src, density: decided.density }),
    density: decided.density,
    reason: decided.reason,
    width: meta.width || 0,
    height: meta.height || 0,
    bytes: output.length,
    file,
    animated,
  }
}
