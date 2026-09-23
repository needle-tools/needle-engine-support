/**
 * Writing markup back out. Pure string building, so it is usable in the
 * browser; parsing lives in vue-template.mjs, which needs Vue's compiler.
 */

/**
 * Rebuild markup from parsed parts. Only called for edited elements; untouched
 * ones are re-emitted from their original bytes.
 *
 * @param {{ tag: string, attributes?: Array<{ name: string, value: string | true }>,
 *   selfClosing?: boolean, inner?: string }} element
 * @returns {string}
 */
export function serializeElement({ tag, attributes = [], selfClosing = true, inner = '' }, options = {}) {
  const written = attributes.map(({ name, value }) =>
    value === true ? name : `${name}="${String(value).replace(/"/g, '&quot;')}"`,
  )

  // An element the author wrote across several lines stays that way, so
  // changing one attribute does not reflow the whole tag onto one line.
  if (options.multiline && written.length > 1 && !inner) {
    const indent = options.indent ?? '  '
    return `<${tag}\n${written.map((attribute) => `${indent}${attribute}`).join('\n')}\n${selfClosing ? '/>' : `></${tag}>`}`
  }

  const attrs = written.map((attribute) => ` ${attribute}`).join('')
  if (inner) return `<${tag}${attrs}>${inner}</${tag}>`
  if (selfClosing) return `<${tag}${attrs} />`
  return `<${tag}${attrs}></${tag}>`
}
