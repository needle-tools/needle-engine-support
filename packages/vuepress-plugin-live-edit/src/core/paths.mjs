/**
 * Path helpers. Page paths arrive from the browser, so every read and write in
 * this package resolves through `assertInside`. Directories come from the host
 * config.
 */

import { readdirSync, statSync } from 'node:fs'
import path from 'node:path'

/**
 * Resolve `candidate` and require it to stay inside `root`.
 *
 * @param {string} root
 * @param {string} candidate relative or absolute
 * @returns {string} resolved absolute path
 * @throws when the result escapes `root`
 */
export function assertInside(root, candidate) {
  const resolvedRoot = path.resolve(root)
  const resolved = path.resolve(resolvedRoot, candidate)
  const rel = path.relative(resolvedRoot, resolved)
  if (rel.startsWith('..') || path.isAbsolute(rel)) {
    throw new Error(`live-edit: refusing to touch ${candidate} outside ${resolvedRoot}`)
  }
  return resolved
}

/**
 * Every `.md` file under `dir`, skipping dotfolders and dependencies.
 *
 * @param {string} dir
 * @returns {string[]} absolute paths, sorted so test output is stable
 */
export function listMarkdownFiles(dir) {
  /** @type {string[]} */
  const out = []
  const walk = (current) => {
    let entries
    try {
      entries = readdirSync(current, { withFileTypes: true })
    } catch {
      return
    }
    for (const entry of entries) {
      if (entry.name.startsWith('.') || entry.name === 'node_modules') continue
      const full = path.join(current, entry.name)
      if (entry.isDirectory()) walk(full)
      else if (entry.name.endsWith('.md')) out.push(full)
    }
  }
  walk(dir)
  return out.sort()
}

/**
 * Map a browser route to the markdown file behind it.
 *
 * VuePress serves `/foo/` from `foo/index.md` or `foo/README.md`, and
 * `/foo.html` from `foo.md`.
 *
 * @param {string} route e.g. `/docs/how-to-guides/networking/sync-state.html`
 * @param {{ docsDir: string, base?: string }} options
 * @returns {string | null} absolute path, or null when no source file exists
 */
export function routeToSourceFile(route, { docsDir, base = '/' }) {
  let rel = String(route).split('?')[0].split('#')[0]
  try {
    rel = decodeURIComponent(rel)
  } catch {
    // keep the raw form; assertInside still guards the result
  }
  if (base !== '/' && rel.startsWith(base)) rel = rel.slice(base.length)
  rel = rel.replace(/^\/+/, '')

  /** @type {string[]} */
  const candidates = []
  if (rel === '' || rel.endsWith('/')) {
    candidates.push(`${rel}index.md`, `${rel}README.md`)
  } else if (rel.endsWith('.html')) {
    candidates.push(`${rel.slice(0, -5)}.md`)
  } else if (rel.endsWith('.md')) {
    candidates.push(rel)
  } else {
    candidates.push(`${rel}.md`, `${rel}/index.md`, `${rel}/README.md`)
  }

  for (const candidate of candidates) {
    try {
      const full = assertInside(docsDir, candidate)
      if (statSync(full).isFile()) return full
    } catch {
      // not this one
    }
  }
  return null
}

/**
 * Turn arbitrary text into a filename-safe slug.
 * @param {string} text
 * @param {string} fallback used when nothing usable survives
 * @returns {string}
 */
export function slugify(text, fallback = 'image') {
  const slug = String(text || '')
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 60)
  return slug || fallback
}
