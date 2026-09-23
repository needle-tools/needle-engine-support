/**
 * Dev-only HTTP endpoints, mounted on Vite's middleware stack.
 *
 * Parsing and serializing both happen here, so there is one implementation of
 * the round-trip. The client never parses markdown.
 *
 * Every path from the browser goes through `assertInside`. A save is refused if
 * the file changed on disk since the editor loaded it.
 */

import { createHash } from 'node:crypto'
import { extname } from 'node:path'
import { existsSync, readFileSync, statSync, writeFileSync } from 'node:fs'
import { execFileSync } from 'node:child_process'
import path from 'node:path'

import { assertInside, routeToSourceFile, slugify } from '../core/paths.mjs'
import { markdownToDoc, docToMarkdown, frontmatterOf } from '../core/doc.mjs'
import { parseBlocks } from '../core/blocks.mjs'
import { collectAssetRefs } from '../core/asset-refs.mjs'
import { schema } from '../core/schema.mjs'
import { createRegistryCache, componentTagSet } from '../core/registry.mjs'
import { writePastedImage, suggestAssetDir, isGenericAssetName } from '../core/assets.mjs'

export const ENDPOINT = '/__live-edit'

/** Large enough for a pasted image, small enough to bound memory. */
const MAX_BODY_BYTES = 32 * 1024 * 1024

const IMAGE_TYPES = {
  '.webp': 'image/webp',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.avif': 'image/avif',
  '.svg': 'image/svg+xml',
}

/** Hunk header of a `-U0` diff: `@@ -old,n +new,n @@`. */
const HUNK = /^@@ -\d+(?:,\d+)? \+(\d+)(?:,(\d+))? @@/

/**
 * Line ranges of a file that differ from the last commit.
 *
 * `-U0` means no context lines, so every range is exactly what changed.
 * Returns null when there is no repository or git cannot answer, and 'all'
 * for a file git does not track yet.
 *
 * @param {string} file
 * @returns {Array<{ start: number, end: number }> | 'all' | null}
 */
function gitChangedRanges(file) {
  const cwd = path.dirname(file)
  const git = (args) => execFileSync('git', args, { cwd, encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] })

  try {
    git(['rev-parse', '--is-inside-work-tree'])
  } catch {
    return null
  }

  try {
    git(['ls-files', '--error-unmatch', '--', file])
  } catch {
    return 'all'
  }

  let diff
  try {
    diff = git(['diff', '-U0', 'HEAD', '--', file])
  } catch {
    return null
  }

  const ranges = []
  for (const line of diff.split('\n')) {
    const match = HUNK.exec(line)
    if (!match) continue
    const start = Number(match[1])
    const count = match[2] == null ? 1 : Number(match[2])
    if (count === 0) {
      // Lines were removed here. Nothing in the new file covers them, so the
      // line the removal sits against is marked instead.
      ranges.push({ start: Math.max(start - 1, 0), end: Math.max(start, 1) })
    } else {
      ranges.push({ start: start - 1, end: start - 1 + count })
    }
  }
  return ranges
}

/**
 * Origin keys of the top-level blocks covering any of `ranges`.
 *
 * A block's origin key is its index in this same parse, which is what the
 * editor's nodes carry, so the client can match without counting positions.
 *
 * @param {string} source
 * @param {Array<{ start: number, end: number }> | 'all'} ranges
 * @returns {string[]}
 */
function blockKeysForLines(source, ranges) {
  const { blocks } = parseBlocks(source)
  const keys = []
  blocks.forEach((block, index) => {
    if (block.type === 'blank') return
    if (ranges === 'all') {
      keys.push(String(index))
      return
    }
    const touched = ranges.some((range) => block.start < range.end && range.start < block.end)
    if (touched) keys.push(String(index))
  })
  return keys
}

/** Identify file content, for detecting edits made elsewhere while editing. */
function hashOf(text) {
  return createHash('sha1').update(text).digest('hex').slice(0, 16)
}

function sendJson(res, status, payload) {
  const body = JSON.stringify(payload)
  res.statusCode = status
  res.setHeader('Content-Type', 'application/json; charset=utf-8')
  res.setHeader('Cache-Control', 'no-store')
  res.end(body)
}

/** Read a JSON request body, refusing anything oversized. */
function readJsonBody(req) {
  return new Promise((resolve, reject) => {
    /** @type {Buffer[]} */
    const chunks = []
    let size = 0
    req.on('data', (chunk) => {
      size += chunk.length
      if (size > MAX_BODY_BYTES) {
        reject(new Error(`request body over ${Math.round(MAX_BODY_BYTES / 1024 / 1024)}MB`))
        req.destroy()
        return
      }
      chunks.push(chunk)
    })
    req.on('end', () => {
      if (chunks.length === 0) return resolve({})
      try {
        resolve(JSON.parse(Buffer.concat(chunks).toString('utf8')))
      } catch (error) {
        reject(new Error(`malformed JSON body: ${error.message}`))
      }
    })
    req.on('error', reject)
  })
}

/** Decode `data:image/png;base64,...` or a bare base64 string. */
function decodeImage(dataUrl) {
  const match = /^data:([^;,]+)?(;base64)?,(.*)$/s.exec(dataUrl || '')
  if (!match) return Buffer.from(dataUrl || '', 'base64')
  return match[2] ? Buffer.from(match[3], 'base64') : Buffer.from(decodeURIComponent(match[3]), 'utf8')
}

/**
 * Build the live-edit middleware.
 *
 * @param {object} options
 * @param {string} options.docsDir
 * @param {string} options.publicDir
 * @param {string} [options.componentsDir]
 * @param {string} [options.configFile]
 * @param {string} [options.base] site base, e.g. `/docs/`
 * @param {number} [options.contentWidth] rendered column width, for 2x detection
 * @param {(file: string) => void} [options.onWrite] called after a successful save
 * @returns {(req: any, res: any, next: Function) => void}
 */
export function createLiveEditMiddleware({
  docsDir,
  publicDir,
  componentsDir,
  configFile,
  base = '/',
  contentWidth,
  onWrite,
}) {
  const registryCache = createRegistryCache({ docsDir, componentsDir, configFile })

  /*
    Vite builds its public-file list at startup, so an image written afterwards
    is not served until a restart and the paste shows as broken. Assets written
    in this session are served from here. Site URL path -> absolute file path.
  */
  const freshAssets = new Map()

  /** Parse/serialize options must be identical on load and save. */
  const docOptions = () => ({ componentTags: componentTagSet(registryCache.get()) })

  /** Resolve a route or repo-relative path from the client to a source file. */
  const resolveSource = (body) => {
    if (body.path) {
      const file = assertInside(docsDir, body.path)
      if (!statSync(file).isFile()) throw new Error(`not a file: ${body.path}`)
      return file
    }
    const file = routeToSourceFile(body.route || '/', { docsDir, base })
    if (!file) throw new Error(`no markdown source for route ${body.route}`)
    return file
  }

  /**
   * Asset references in a document that do not resolve to a file.
   *
   * A reference is written either from the site root or relative to the page,
   * and a root-relative one may or may not include the site base, so every
   * reading is tried before it is called missing.
   *
   * @param {import('prosemirror-model').Node} doc
   * @param {string} file the page's own path, for relative references
   */
  const missingAssets = (doc, file) => {
    const missing = []
    for (const ref of collectAssetRefs(doc)) {
      const candidates = ref.src.startsWith('/')
        ? [path.join(publicDir, withoutBase(ref.src)), path.join(publicDir, ref.src)]
        : [path.resolve(path.dirname(file), ref.src), path.join(publicDir, ref.src)]

      if (!candidates.some((candidate) => existsSync(candidate))) missing.push(ref)
    }
    return missing
  }

  const routes = {
    /** Everything the editor needs to render its menus. */
    async registry(req, res) {
      const registry = registryCache.get(new URL(req.url, 'http://localhost').searchParams.has('refresh'))
      sendJson(res, 200, registry)
    },

    /** Load a page as an editor document. */
    async source(req, res, body) {
      const file = resolveSource(body)
      const source = readFileSync(file, 'utf8')
      const doc = markdownToDoc(source, docOptions())
      sendJson(res, 200, {
        path: path.relative(docsDir, file),
        source,
        hash: hashOf(source),
        doc: doc.toJSON(),
        frontmatter: frontmatterOf(source),
        assetDir: suggestAssetDir({
          pageSource: source,
          pagePath: path.relative(docsDir, file),
          publicDir,
        }),
      })
    },

    /**
     * Serialize an edited document and write it back.
     *
     * Serialization is always against `baseSource`, the text the editor was
     * opened on, never the current file. Origin keys are positions in that
     * parse, so a re-parse after an insert would renumber them and unchanged
     * blocks would stop matching.
     *
     * `expectHash` is the file's expected hash: the last write, or the original.
     */
    async save(req, res, body) {
      const file = resolveSource(body)
      const current = readFileSync(file, 'utf8')

      if (body.expectHash && body.expectHash !== hashOf(current)) {
        // The file changed on disk; return the conflict rather than overwrite.
        sendJson(res, 409, {
          error: 'conflict',
          message: 'This file changed on disk since the editor loaded it.',
          source: current,
          hash: hashOf(current),
          doc: markdownToDoc(current, docOptions()).toJSON(),
        })
        return
      }

      const baseSource = typeof body.baseSource === 'string' ? body.baseSource : current
      const doc = schema.nodeFromJSON(body.doc)
      const markdown = docToMarkdown(doc, baseSource, {
        ...docOptions(),
        frontmatter: typeof body.frontmatter === 'string' ? body.frontmatter : undefined,
      })

      const warnings = missingAssets(doc, file).map((ref) => ({
        kind: 'missing-asset',
        src: ref.src,
        where: ref.where,
        message: `${ref.src} (${ref.where}) does not exist`,
      }))

      if (markdown === current) {
        sendJson(res, 200, { path: path.relative(docsDir, file), hash: hashOf(current), unchanged: true, warnings })
        return
      }

      writeFileSync(file, markdown, 'utf8')
      // The page may now use a container or component that was not there.
      registryCache.invalidate()
      onWrite?.(file)
      sendJson(res, 200, {
        path: path.relative(docsDir, file),
        hash: hashOf(markdown),
        bytes: Buffer.byteLength(markdown),
        unchanged: false,
        warnings,
      })
    },

    /**
     * Which blocks of the saved file differ from the last commit.
     *
     * Keys are indices into a parse of the file on disk, which is what the
     * editor's blocks carry, so they line up until an unsaved edit adds or
     * removes a block. A save refreshes them.
     */
    async changes(req, res, body) {
      const file = resolveSource(body)
      const ranges = gitChangedRanges(file)
      if (ranges === null) {
        sendJson(res, 200, { available: false, keys: [] })
        return
      }
      const current = readFileSync(file, 'utf8')
      sendJson(res, 200, { available: true, keys: blockKeysForLines(current, ranges), untracked: ranges === 'all' })
    },

    /** Store a pasted or dropped image and return how to embed it. */
    async asset(req, res, body) {
      const buffer = decodeImage(body.data)
      if (buffer.length === 0) throw new Error('empty image payload')

      const file = body.route || body.path ? resolveSource(body) : null
      const pageSource = file ? readFileSync(file, 'utf8') : ''
      const pagePath = file ? path.relative(docsDir, file) : ''

      const suggestion = suggestAssetDir({ pageSource, pagePath, publicDir })
      const dir = body.dir || suggestion.dir
      // A stock name from the operating system says less than the alt text or
      // the page it is being dropped on.
      const supplied = isGenericAssetName(body.name) ? '' : body.name
      const name = supplied || slugify(body.alt || '', path.basename(pagePath, '.md') || 'image')

      const written = await writePastedImage({
        buffer,
        publicDir,
        dir,
        name,
        alt: body.alt || '',
        devicePixelRatio: Number(body.devicePixelRatio) || 1,
        density: body.density ? Number(body.density) : undefined,
        contentWidth,
      })

      freshAssets.set(written.src, assertInside(publicDir, path.join(dir, written.file)))
      sendJson(res, 200, { ...written, dir, dirReason: suggestion.reason })
    }
  }

  /** Strip the site base, so `/docs/imgs/x.webp` matches the stored path. */
  const withoutBase = (url) => (base !== '/' && url.startsWith(base) ? url.slice(base.length - 1) : url)

  return function liveEditMiddleware(req, res, next) {
    const url = (req.url || '').split('?')[0]

    /*
      Only an actual image load is answered here. Vite also requests asset URLs
      as modules when a compiled template references them, and returning image
      bytes for those breaks module loading for the whole page.
    */
    if (req.method === 'GET' && req.headers['sec-fetch-dest'] === 'image') {
      let asset = null
      try {
        asset = freshAssets.get(withoutBase(decodeURIComponent(url)))
      } catch {
        asset = null
      }
      if (asset) {
        try {
          const body = readFileSync(asset)
          res.setHeader('Content-Type', IMAGE_TYPES[extname(asset).toLowerCase()] || 'application/octet-stream')
          res.setHeader('Cache-Control', 'no-cache')
          res.end(body)
          return
        } catch {
          // Deleted since it was written; fall through.
        }
      }
    }

    if (!url.startsWith(`${ENDPOINT}/`)) return next()

    const name = url.slice(ENDPOINT.length + 1)
    const handler = routes[name]
    if (!handler) return sendJson(res, 404, { error: `unknown live-edit endpoint: ${name}` })

    const run = async () => {
      const body = req.method === 'POST' ? await readJsonBody(req) : {}
      await handler(req, res, body)
    }

    run().catch((error) => {
      // Dev tooling: the message is far more useful than a bare 500, and this
      // server is only ever reachable from the developer's own machine.
      sendJson(res, 400, { error: error.message })
    })
  }
}
