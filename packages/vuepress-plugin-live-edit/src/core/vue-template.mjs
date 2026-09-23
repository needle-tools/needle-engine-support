/**
 * Element parsing via Vue's template compiler. Markup in these pages is Vue
 * template syntax, not plain HTML.
 *
 * Attribute names come from each prop's source span rather than the parsed
 * directive, so `:actions`, `v-bind:actions` and `@click` round-trip as
 * written.
 */

import { createRequire } from 'node:module'

const require = createRequire(import.meta.url)
const { parse: parseTemplate, NodeTypes } = require('@vue/compiler-dom')

// Re-exported so server-side callers have one import for markup handling.
export { serializeElement } from './markup.mjs'

/**
 * A component wrapping markdown content parses as an opening tag with no end
 * tag. Vue treats that as an error and discards the element, so errors are
 * ignored and the partial tree is used.
 */
const PARSE_OPTIONS = { comments: true, onError: () => {}, onWarn: () => {} }

/**
 * @typedef {Object} ParsedElement
 * @property {string} tag
 * @property {Array<{ name: string, value: string | true }>} attributes ordered as written
 * @property {boolean} selfClosing
 * @property {string} inner raw inner markup, empty when self-closing
 */

/**
 * Parse the first element of a markup fragment.
 *
 * @param {string} src
 * @returns {ParsedElement | null} null when the fragment holds no element
 */
export function parseElement(src) {
  let root
  try {
    root = parseTemplate(src, PARSE_OPTIONS)
  } catch {
    return null
  }

  const element = root.children?.find((child) => child.type === NodeTypes.ELEMENT)
  if (!element) return null

  /** @type {Array<{ name: string, value: string | true }>} */
  const attributes = []
  for (const prop of element.props || []) {
    // The source span preserves `:x` vs `v-bind:x` vs `x`.
    const source = prop.loc?.source ?? ''
    const eq = source.indexOf('=')
    const name = (eq === -1 ? source : source.slice(0, eq)).trim()
    if (!name) continue

    if (prop.type === NodeTypes.ATTRIBUTE) {
      attributes.push({ name, value: prop.value ? prop.value.content : true })
    } else {
      attributes.push({ name, value: prop.exp ? prop.exp.loc.source : true })
    }
  }

  let inner = ''
  if (!element.isSelfClosing && element.children?.length) {
    const first = element.children[0]
    const last = element.children[element.children.length - 1]
    inner = src.slice(first.loc.start.offset, last.loc.end.offset)
  }

  return {
    tag: element.tag,
    attributes,
    selfClosing: Boolean(element.isSelfClosing) || element.children?.length === 0,
    inner,
  }
}

/**
 * Every element tag appearing in a markup fragment, including nested ones.
 * @param {string} src
 * @returns {Array<{ tag: string, attributes: Array<{ name: string, value: string | true }>, hasChildren: boolean }>}
 */
export function collectElements(src) {
  let root
  try {
    root = parseTemplate(src, PARSE_OPTIONS)
  } catch {
    return []
  }

  /** @type {Array<{ tag: string, attributes: any[], hasChildren: boolean }>} */
  const out = []
  const visit = (node) => {
    if (node.type === NodeTypes.ELEMENT) {
      const parsed = parseElement(src.slice(node.loc.start.offset, node.loc.end.offset))
      if (parsed) out.push({ tag: parsed.tag, attributes: parsed.attributes, hasChildren: !parsed.selfClosing })
    }
    for (const child of node.children || []) visit(child)
  }
  for (const child of root.children || []) visit(child)
  return out
}

/**
 * Is this source a single element and nothing else?
 *
 * CommonMark only treats a tag as an HTML block when its opening tag fits on
 * one line, so a component written across several lines arrives as a
 * paragraph. This recognizes that case.
 *
 * @param {string} src
 * @returns {boolean}
 */
export function isSingleElement(src) {
  const trimmed = src.trim()
  if (!trimmed.startsWith('<') || !trimmed.endsWith('>')) return false

  let root
  try {
    root = parseTemplate(trimmed, PARSE_OPTIONS)
  } catch {
    return false
  }

  const children = (root.children || []).filter(
    (child) => child.type !== NodeTypes.TEXT || child.content.trim() !== '',
  )
  if (children.length !== 1) return false
  const only = children[0]
  return only.type === NodeTypes.ELEMENT && only.loc.end.offset >= trimmed.length
}
