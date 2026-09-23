/**
 * Writes a plain value back as a JavaScript literal.
 *
 * A bound prop (`:images="[…]"`) holds an expression, so editing it as
 * structured data means producing source again. Only data literals are
 * produced; anything else is left to the raw expression field.
 */

/** Keys that can be written bare rather than quoted. */
const BARE_KEY = /^[A-Za-z_$][\w$]*$/

/** Single-quoted, since the expression sits inside a double-quoted attribute. */
function quote(text) {
  return `'${String(text).replace(/\\/g, '\\\\').replace(/'/g, "\\'").replace(/\n/g, '\\n')}'`
}

/**
 * @param {unknown} value
 * @param {string} indent current indentation
 * @returns {string}
 */
export function stringifyLiteral(value, indent = '') {
  if (value === null) return 'null'
  if (value === undefined) return 'undefined'
  if (typeof value === 'string') return quote(value)
  if (typeof value === 'number' || typeof value === 'boolean') return String(value)

  const inner = `${indent}  `

  if (Array.isArray(value)) {
    if (value.length === 0) return '[]'
    const entries = value.map((entry) => `${inner}${stringifyLiteral(entry, inner)}`)
    return `[\n${entries.join(',\n')}\n${indent}]`
  }

  if (typeof value === 'object') {
    const keys = Object.keys(value).filter((key) => value[key] !== undefined)
    if (keys.length === 0) return '{}'
    // Objects stay on one line: these are short records, and a row per entry
    // reads better than a block per entry.
    const pairs = keys.map((key) => `${BARE_KEY.test(key) ? key : quote(key)}: ${stringifyLiteral(value[key], inner)}`)
    return `{ ${pairs.join(', ')} }`
  }

  return 'null'
}

/**
 * Can this value be written as a literal and read back unchanged?
 * @param {unknown} value
 */
export function isLiteral(value) {
  if (value === null) return true
  if (['string', 'number', 'boolean', 'undefined'].includes(typeof value)) return true
  if (Array.isArray(value)) return value.every(isLiteral)
  if (typeof value === 'object') return Object.values(value).every(isLiteral)
  return false
}

/**
 * The union of keys across an array of records, in first-seen order.
 *
 * The element shape of an array prop is not declared anywhere Vue exposes, so
 * it is taken from the value that is actually there.
 *
 * @param {unknown[]} entries
 * @returns {string[]}
 */
export function shapeOf(entries) {
  const keys = []
  for (const entry of entries) {
    if (typeof entry === 'string') {
      if (!keys.includes('src')) keys.unshift('src')
      continue
    }
    if (!entry || typeof entry !== 'object') continue
    for (const key of Object.keys(entry)) if (!keys.includes(key)) keys.push(key)
  }
  return keys
}
