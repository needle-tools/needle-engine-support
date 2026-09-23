/**
 * Source -> block tree with exact line ranges.
 *
 * Invariant:
 *
 *     serializeBlocks(parseBlocks(src).blocks) === src    // byte for byte
 *
 * Every line belongs to exactly one block and each block keeps its source
 * slice, so a save can rewrite only the blocks that changed.
 *
 * Structure comes from markdown-it plus markdown-it-container, matching what
 * VuePress renders with. Container names are enumerated by a line scan so the
 * plugin can be registered per name; the parser decides everything else.
 *
 * Frontmatter is removed first; markdown-it would read the opening `---` as a
 * thematic break. Unaccounted lines become `raw` blocks.
 */

import { createRequire } from 'node:module'

const require = createRequire(import.meta.url)
const MarkdownIt = require('markdown-it')
const containerPlugin = require('markdown-it-container')

import { isSingleElement } from './vue-template.mjs'

/** Names only; the parser decides the structure. */
const CONTAINER_NAME = /^[ \t]{0,3}:{2,}[ \t]*([A-Za-z][\w-]*)/
/** VuePress import-code syntax: `@[code ts](@code/foo.ts)`. */
const CODE_IMPORT = /^[ \t]*@\[code(?:[ \t]+[^\]]*)?\]\([^)]*\)[ \t]*$/

/** markdown-it instances are keyed by the container names they know about. */
const instanceCache = new Map()

/**
 * A markdown-it that understands exactly the containers named.
 * @param {string[]} names
 */
function markdownItFor(names) {
  const key = names.join(',')
  const cached = instanceCache.get(key)
  if (cached) return cached

  const md = new MarkdownIt('default', { html: true, linkify: false, breaks: false })
  for (const name of names) md.use(containerPlugin, name)
  instanceCache.set(key, md)
  return md
}

/**
 * Collect candidate container names. Over-collecting is harmless: a name that
 * opens no container produces no token.
 * @param {string} src
 */
function enumerateContainerNames(src) {
  const names = new Set()
  for (const line of src.split('\n')) {
    const match = CONTAINER_NAME.exec(line)
    if (match) names.add(match[1])
  }
  return [...names].sort()
}

/**
 * Split keeping line terminators attached, so `lines.join('')` reproduces the
 * input exactly, including CRLF and a missing final newline.
 * @param {string} src
 * @returns {string[]}
 */
export function splitLines(src) {
  if (src === '') return []
  return src.split(/(?<=\n)/)
}

/** @returns {string} the source covered by lines [start, end). */
function slice(lines, start, end) {
  return lines.slice(start, end).join('')
}

/** A line with nothing but whitespace. */
function isBlank(line) {
  return /^[ \t]*\r?\n?$/.test(line)
}

/**
 * Parse the leading `---` frontmatter, if present.
 * @returns {{ end: number, yaml: string } | null}
 */
function parseFrontmatter(lines) {
  if (lines.length === 0) return null
  if (!/^---[ \t]*\r?\n?$/.test(lines[0])) return null
  for (let i = 1; i < lines.length; i++) {
    if (/^(---|\.\.\.)[ \t]*\r?\n?$/.test(lines[i])) {
      return { end: i + 1, yaml: slice(lines, 1, i) }
    }
  }
  return null // unterminated; treat as ordinary content
}

/**
 * @typedef {Object} Block
 * @property {string} type
 * @property {number} start inclusive line index
 * @property {number} end exclusive line index
 * @property {string} src exact original source for [start, end)
 * @property {object} attrs
 * @property {Block[]} [children] present on `container` blocks
 * @property {{ open: string, close: string }} [fence] container delimiters
 */

/** @returns {Block} */
function makeBlock(type, lines, start, end, attrs) {
  return { type, start, end, src: slice(lines, start, end), attrs: attrs || {} }
}

/** markdown-it token type -> our block type. */
function blockTypeFor(token) {
  const type = token.type.endsWith('_open') ? token.type.slice(0, -5) : token.type
  switch (type) {
    case 'heading': return 'heading'
    case 'paragraph': return 'paragraph'
    case 'bullet_list':
    case 'ordered_list': return 'list'
    case 'blockquote': return 'blockquote'
    case 'table': return 'table'
    case 'html_block': return 'html'
    case 'hr': return 'hr'
    case 'fence':
    case 'code_block': return 'fence'
    default: return 'raw'
  }
}

/** Emit unclaimed lines. Blank runs become their own blocks. */
function pushGap(out, lines, from, to) {
  let i = from
  while (i < to) {
    const blank = isBlank(lines[i])
    let j = i + 1
    while (j < to && isBlank(lines[j]) === blank) j++
    out.push(makeBlock(blank ? 'blank' : 'raw', lines, i, j, {}))
    i = j
  }
}

/**
 * Walk a token stream into blocks, recursing through containers.
 *
 * @param {object[]} tokens
 * @param {{ i: number }} cursor position in `tokens`, advanced in place
 * @param {string[]} lines whole-document lines
 * @param {number} offset line offset of the tokenized substring
 * @param {number} from inclusive line bound of this scope
 * @param {number} to exclusive line bound of this scope
 * @param {number} level token nesting level of this scope
 * @returns {Block[]}
 */
function tokensToBlocks(tokens, cursor, lines, offset, from, to, level) {
  /** @type {Block[]} */
  const out = []
  let position = from

  const claim = (start, end, make) => {
    if (start > position) pushGap(out, lines, position, start)
    if (end <= start) return
    out.push(make(Math.max(start, position), end))
    position = end
  }

  while (cursor.i < tokens.length) {
    const token = tokens[cursor.i]
    if (token.level < level) break
    if (token.level > level) {
      cursor.i++
      continue
    }
    if (token.nesting === -1) break

    const isContainer = token.type.startsWith('container_') && token.type.endsWith('_open')
    if (!token.map) {
      cursor.i++
      continue
    }

    const start = offset + token.map[0]
    let end = Math.min(offset + token.map[1], to)

    if (isContainer) {
      const name = token.type.slice('container_'.length, -'_open'.length)
      // markdown-it-container's range stops at the closing fence.
      const closeLine = end
      const closed = closeLine < to && /^[ \t]{0,3}:{2,}[ \t]*\r?\n?$/.test(lines[closeLine] || '')
      const blockEnd = Math.min(closed ? closeLine + 1 : closeLine, to)

      cursor.i++
      const innerTo = Math.min(closeLine, to)
      const children = tokensToBlocks(tokens, cursor, lines, offset, start + 1, innerTo, level + 1)
      // Skip the matching close token.
      while (cursor.i < tokens.length && !(tokens[cursor.i].level === level && tokens[cursor.i].nesting === -1)) cursor.i++
      if (cursor.i < tokens.length) cursor.i++

      claim(start, blockEnd, (s, e) => {
        const block = makeBlock('container', lines, s, e, {
          name,
          info: (token.info || '').trim().replace(new RegExp(`^${name}\\s*`), ''),
          indent: /^[ \t]*/.exec(lines[s] || '')[0],
        })
        block.fence = { open: lines[s], close: closed ? lines[closeLine] : '' }
        block.children = children
        return block
      })
      continue
    }

    const type = blockTypeFor(token)
    const attrs = {}
    if (type === 'heading') attrs.level = Number(token.tag.slice(1)) || 1
    if (type === 'fence') {
      attrs.info = token.info || ''
      attrs.marker = token.markup || '```'
      attrs.indent = /^[ \t]*/.exec(lines[start] || '')[0]
    }

    claim(start, end, (s, e) => {
      // `@[code](...)` comes from a VuePress plugin we do not load, so it
      // arrives as a paragraph. This relabels it; bounds are already known.
      if (e - s === 1 && CODE_IMPORT.test(lines[s].replace(/\r?\n$/, ''))) {
        return makeBlock('codeImport', lines, s, e, { text: lines[s].trim() })
      }
      // A tag whose opening line is not self-contained is not an html_block by
      // CommonMark's rules, so a component written across several lines arrives
      // here as a paragraph.
      if (type === 'paragraph' && isSingleElement(slice(lines, s, e))) {
        return makeBlock('html', lines, s, e, {})
      }
      return makeBlock(type, lines, s, e, attrs)
    })

    cursor.i++
    // Skip this token's descendants; they belong to the block we just claimed.
    while (cursor.i < tokens.length && tokens[cursor.i].level > level) cursor.i++
    if (cursor.i < tokens.length && tokens[cursor.i].level === level && tokens[cursor.i].nesting === -1) cursor.i++
  }

  if (position < to) pushGap(out, lines, position, to)
  return out
}

/**
 * Parse a markdown document into a block tree covering every line exactly once.
 *
 * @param {string} src
 * @returns {{ blocks: Block[], lines: string[], src: string }}
 */
export function parseBlocks(src) {
  const lines = splitLines(src)
  /** @type {Block[]} */
  const blocks = []

  let offset = 0
  const frontmatter = parseFrontmatter(lines)
  if (frontmatter) {
    blocks.push(makeBlock('frontmatter', lines, 0, frontmatter.end, { yaml: frontmatter.yaml }))
    offset = frontmatter.end
  }

  const body = slice(lines, offset, lines.length)
  if (body !== '') {
    const md = markdownItFor(enumerateContainerNames(body))
    let tokens = []
    try {
      tokens = md.parse(body, {})
    } catch {
      tokens = [] // a tokenizer failure must not lose content
    }
    blocks.push(...tokensToBlocks(tokens, { i: 0 }, lines, offset, offset, lines.length, 0))
  }

  return { blocks, lines, src }
}

/**
 * Inline HTML fragments inside a chunk of markdown. A tag inside a code span is
 * content and is not reported.
 *
 * @param {string} src
 * @returns {string[]} each fragment as written, e.g. `<video-embed src="a">`
 */
export function inlineHtmlFragments(src) {
  let tokens
  try {
    tokens = markdownItFor([]).parse(src, {})
  } catch {
    return []
  }
  /** @type {string[]} */
  const out = []
  for (const token of tokens) {
    if (token.type !== 'inline' || !token.children) continue
    for (const child of token.children) {
      if (child.type === 'html_inline' && child.content) out.push(child.content)
    }
  }
  return out
}

/**
 * Re-emit a block tree as markdown, from each block's `src`.
 *
 * @param {Block[]} blocks
 * @returns {string}
 */
export function serializeBlocks(blocks) {
  let out = ''
  for (const block of blocks) {
    if (block.children && block.fence) {
      out += block.fence.open + serializeBlocks(block.children) + block.fence.close
    } else {
      out += block.src
    }
  }
  return out
}

/**
 * Walk the tree depth-first, parents before children.
 * @param {Block[]} blocks
 * @param {(block: Block, path: number[]) => void} visit
 */
export function walkBlocks(blocks, visit, path = []) {
  blocks.forEach((block, index) => {
    const here = [...path, index]
    visit(block, here)
    if (block.children) walkBlocks(block.children, visit, here)
  })
}
