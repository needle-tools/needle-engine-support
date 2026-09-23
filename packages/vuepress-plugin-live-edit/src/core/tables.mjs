/**
 * Markdown tables <-> ProseMirror table nodes.
 *
 * Parsing goes through markdown-it. Serialization pads columns to a uniform
 * width.
 */

import { createRequire } from 'node:module'

const require = createRequire(import.meta.url)
const MarkdownIt = require('markdown-it')

const md = new MarkdownIt('default', { html: true, linkify: false })

/** markdown-it puts alignment in a style attribute on the cell. */
function alignOf(token) {
  const style = token.attrGet?.('style') || ''
  const match = /text-align:\s*(left|center|right)/.exec(style)
  return match ? match[1] : null
}

/**
 * Parse a markdown table into a ProseMirror table node.
 *
 * @param {string} src the table block's source
 * @param {import('prosemirror-model').Schema} schema
 * @param {(text: string) => import('prosemirror-model').Fragment} parseInline
 * @returns {import('prosemirror-model').Node | null} null when `src` is not a table
 */
export function parseTable(src, schema, parseInline) {
  let tokens
  try {
    tokens = md.parse(src, {})
  } catch {
    return null
  }
  if (!tokens.some((token) => token.type === 'table_open')) return null

  const rows = []
  let cells = null
  let cellType = null
  let align = null

  for (const token of tokens) {
    switch (token.type) {
      case 'tr_open':
        cells = []
        break
      case 'th_open':
      case 'td_open':
        cellType = token.type === 'th_open' ? schema.nodes.table_header : schema.nodes.table_cell
        align = alignOf(token)
        break
      case 'inline':
        if (cells && cellType) {
          cells.push(cellType.create({ align }, parseInline(token.content)))
          cellType = null
        }
        break
      case 'th_close':
      case 'td_close':
        // An empty cell emits no inline token.
        if (cellType && cells) {
          cells.push(cellType.create({ align }, null))
          cellType = null
        }
        break
      case 'tr_close':
        if (cells && cells.length) rows.push(schema.nodes.table_row.create(null, cells))
        cells = null
        break
      default:
        break
    }
  }

  if (rows.length === 0) return null
  return schema.nodes.table.create(null, rows)
}

/** Escape a pipe so it stays inside its cell. */
function escapeCell(text) {
  return text.replace(/\|/g, '\\|').replace(/\n+/g, ' ')
}

/** `---`, `:--`, `:-:` or `--:` for a column's alignment. */
function delimiterFor(align, width) {
  const dashes = Math.max(3, width)
  if (align === 'center') return `:${'-'.repeat(dashes - 2)}:`
  if (align === 'left') return `:${'-'.repeat(dashes - 1)}`
  if (align === 'right') return `${'-'.repeat(dashes - 1)}:`
  return '-'.repeat(dashes)
}

/**
 * Serialize a ProseMirror table node to a markdown table.
 *
 * @param {import('prosemirror-model').Node} node
 * @param {(fragment: import('prosemirror-model').Fragment) => string} serializeInline
 * @returns {string} ending in a single newline
 */
export function serializeTable(node, serializeInline) {
  /** @type {string[][]} */
  const rows = []
  /** @type {Array<string | null>} */
  const aligns = []

  node.forEach((row, _offset, rowIndex) => {
    const cells = []
    row.forEach((cell, _cellOffset, columnIndex) => {
      cells.push(escapeCell(serializeInline(cell.content)))
      if (rowIndex === 0) aligns[columnIndex] = cell.attrs.align
    })
    rows.push(cells)
  })

  if (rows.length === 0) return ''

  const columns = Math.max(...rows.map((row) => row.length))
  for (const row of rows) while (row.length < columns) row.push('')

  const widths = []
  for (let column = 0; column < columns; column++) {
    widths[column] = Math.max(3, ...rows.map((row) => row[column].length))
  }

  const line = (cells) => `| ${cells.map((cell, i) => cell.padEnd(widths[i])).join(' | ')} |`.replace(/\s+$/, '')

  const [header, ...body] = rows
  const out = [
    line(header),
    `| ${widths.map((width, i) => delimiterFor(aligns[i], width)).join(' | ')} |`,
    ...body.map(line),
  ]
  return `${out.join('\n')}\n`
}
