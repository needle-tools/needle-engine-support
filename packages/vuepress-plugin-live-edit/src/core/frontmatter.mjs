/**
 * Frontmatter as editable fields.
 *
 * Most pages here use plain `key: value` pairs, which edit well as a form. Some
 * use nested YAML such as `head:`; those entries are kept as raw lines and
 * re-emitted verbatim, so nothing is reformatted by opening the editor.
 */

/** A top-level key at column 0. */
const ENTRY = /^([A-Za-z_][\w.-]*)\s*:\s*(.*)$/

/**
 * @typedef {Object} FrontmatterEntry
 * @property {string} key
 * @property {string} value scalar value, empty for block entries
 * @property {boolean} scalar whether it edits as a single field
 * @property {string[]} lines original lines, used for block entries
 */

/**
 * Split a frontmatter block into entries.
 *
 * @param {string} block the whole block, `---` fences included
 * @returns {{ open: string, close: string, entries: FrontmatterEntry[] }}
 */
export function parseFrontmatter(block) {
  const lines = block.split('\n')
  const open = lines[0] ?? '---'

  let closeAt = lines.length - 1
  while (closeAt > 0 && !/^(---|\.\.\.)\s*$/.test(lines[closeAt])) closeAt--
  const close = lines[closeAt] ?? '---'
  const inner = lines.slice(1, closeAt)

  /** @type {FrontmatterEntry[]} */
  const entries = []
  for (let i = 0; i < inner.length; i++) {
    const match = ENTRY.exec(inner[i])
    if (!match) {
      // A stray line outside any entry; keep it as its own block.
      entries.push({ key: '', value: '', scalar: false, lines: [inner[i]] })
      continue
    }

    const own = [inner[i]]
    while (i + 1 < inner.length && (inner[i + 1].trim() === '' || /^\s/.test(inner[i + 1]))) {
      own.push(inner[++i])
    }
    // Trailing blank lines belong to the block, not to the value.
    const continued = own.slice(1).some((line) => line.trim() !== '')
    entries.push({
      key: match[1],
      value: continued ? '' : match[2],
      scalar: !continued && match[2] !== '',
      lines: own,
    })
  }

  return { open, close, entries }
}

/** Does this value need quoting to survive a YAML round-trip? */
function needsQuoting(value) {
  if (value === '') return false
  if (/^['"]/.test(value)) return false
  return /:\s|^[!&*[\]{}#|>@`]|#\s|^\s|\s$/.test(value)
}

/** Quote a value, escaping any single quotes. */
function quote(value) {
  return `'${value.replace(/'/g, "''")}'`
}

/**
 * Rebuild a frontmatter block.
 *
 * A scalar entry whose value is unchanged is written from its original line, so
 * existing quoting and spacing survive. Block entries are always verbatim.
 *
 * @param {{ open: string, close: string, entries: FrontmatterEntry[] }} parsed
 * @returns {string} ending in a newline
 */
export function serializeFrontmatter({ open, close, entries }) {
  const out = [open]
  for (const entry of entries) {
    if (!entry.scalar) {
      out.push(...entry.lines)
      continue
    }
    const original = ENTRY.exec(entry.lines?.[0] ?? '')
    if (original && original[1] === entry.key && original[2] === entry.value) {
      out.push(entry.lines[0])
    } else {
      out.push(`${entry.key}: ${needsQuoting(entry.value) ? quote(entry.value) : entry.value}`)
    }
  }
  out.push(close, '')
  return out.join('\n')
}

/** An empty scalar entry, for adding a field in the editor. */
export function newEntry(key = '', value = '') {
  return { key, value, scalar: true, lines: [`${key}: ${value}`] }
}
