/**
 * Asset references in an edited document.
 *
 * Reads the document, not the markdown. Image nodes carry their `src`
 * directly, raw markup goes through the same Vue template parser the editor
 * renders with, and a bound attribute such as `:images="[{ src: '/a.webp' }]"`
 * is parsed as JavaScript. Nothing here pattern-matches source text.
 */

import { createRequire } from 'node:module'
import { collectElements } from './vue-template.mjs'

const require = createRequire(import.meta.url)
const { parse: parseJs } = require('@babel/parser')

/** Attributes whose whole value is one URL. */
const URL_ATTRS = new Set(['src', 'poster', 'data-src'])

/** Attributes holding a comma-separated candidate list. */
const SET_ATTRS = new Set(['srcset', 'data-srcset'])

/**
 * Extensions this repo serves itself. A bound attribute can hold any string,
 * so only those that name a file are treated as references.
 */
const ASSET_EXT = /\.(?:avif|gif|jpe?g|png|svg|webp|mp4|webm|mov|ogg|glb|gltf|hdr|exr|ktx2?|bin|pdf|zip)$/i

/** Somewhere else: another origin, a data URI, or an in-page anchor. */
function isExternal(value) {
  return /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i.test(value) || value.startsWith('#')
}

/**
 * Every string literal in a JavaScript expression.
 *
 * An expression being typed can be unparseable; that yields nothing rather
 * than throwing, so one bad attribute cannot hide the rest of the document.
 *
 * @param {string} expression
 * @returns {string[]}
 */
function stringsIn(expression) {
  const out = []
  let ast
  try {
    ast = parseJs(`(${expression})`, { errorRecovery: true })
  } catch {
    return out
  }

  const visit = (node) => {
    if (!node || typeof node !== 'object') return
    if (Array.isArray(node)) {
      for (const entry of node) visit(entry)
      return
    }
    if (node.type === 'StringLiteral' && typeof node.value === 'string') out.push(node.value)
    for (const key of Object.keys(node)) {
      if (key === 'loc' || key === 'leadingComments' || key === 'trailingComments') continue
      visit(node[key])
    }
  }
  visit(ast.program?.body ?? [])
  return out
}

/**
 * Collect the files a document points at.
 *
 * @param {import('prosemirror-model').Node} doc
 * @returns {Array<{ src: string, where: string }>} `where` names the thing
 *   holding the reference, for the message shown to the author
 */
export function collectAssetRefs(doc) {
  /** @type {Array<{ src: string, where: string }>} */
  const refs = []
  const seen = new Set()

  const add = (value, where) => {
    const raw = String(value ?? '').trim()
    if (!raw || isExternal(raw)) return
    // A query or fragment is not part of the path on disk.
    const src = raw.split(/[?#]/)[0]
    if (!src) return
    const key = `${src}\u0000${where}`
    if (seen.has(key)) return
    seen.add(key)
    refs.push({ src, where })
  }

  const fromAttributes = (attributes, where) => {
    for (const attribute of attributes ?? []) {
      const { name, value } = attribute ?? {}
      if (value === true || value == null || name == null) continue
      const bare = String(name).replace(/^[:@]/, '')

      if (URL_ATTRS.has(bare)) {
        add(value, where)
      } else if (SET_ATTRS.has(bare)) {
        // `a.webp 1x, b.webp 2x` — the descriptor is not part of the path.
        for (const candidate of String(value).split(',')) add(candidate.trim().split(/\s+/)[0], where)
      } else if (String(name).startsWith(':')) {
        for (const literal of stringsIn(String(value))) if (ASSET_EXT.test(literal)) add(literal, where)
      }
    }
  }

  const fromMarkup = (markup, where) => {
    for (const element of collectElements(String(markup || ''))) fromAttributes(element.attributes, where)
  }

  doc.descendants((node) => {
    switch (node.type.name) {
      case 'image':
        add(node.attrs.src, 'image')
        fromAttributes(node.attrs.attributes, 'image')
        break
      case 'html':
      case 'source':
        fromMarkup(node.attrs.text, 'html')
        break
      case 'html_inline':
        fromMarkup(node.attrs.text, 'inline html')
        break
      case 'component':
        fromAttributes(node.attrs.attributes, `<${node.attrs.tag}>`)
        if (node.attrs.inner) fromMarkup(node.attrs.inner, `<${node.attrs.tag}>`)
        break
      default:
        break
    }
  })

  return refs
}
