/**
 * blocks <-> ProseMirror document, and the markdown serializer.
 *
 * `docToMarkdown` rebuilds the document the editor loaded and compares node by
 * node. Unchanged nodes are written back as their original bytes; only changed
 * nodes are serialized. The comparison recurses into containers.
 *
 * Model code only, no DOM, so edit round-trips are testable in Node.
 */

import { createRequire } from 'node:module'
import { Fragment } from 'prosemirror-model'
import { MarkdownParser } from 'prosemirror-markdown'
import { parseBlocks } from './blocks.mjs'
import { schema } from './schema.mjs'
import { parseElement } from './vue-template.mjs'
import { serializeElement } from './markup.mjs'
import { parseTable, serializeTable } from './tables.mjs'

const require = createRequire(import.meta.url)
const MarkdownIt = require('markdown-it')

const markdownIt = new MarkdownIt('default', { html: true, linkify: false, breaks: false })

/**
 * markdown-it marks paragraphs inside a tight list as hidden. Tightness drives
 * both item spacing and whether items are separated by blank lines on save.
 */
function isTight(tokens, start) {
  for (let i = start + 1; i < tokens.length; i++) {
    const token = tokens[i]
    if (token.level <= tokens[start].level && token.nesting === -1) break
    if (token.type === 'paragraph_open') return Boolean(token.hidden)
  }
  return true
}

const TOKENS = {
  blockquote: { block: 'blockquote' },
  paragraph: { block: 'paragraph' },
  list_item: { block: 'list_item' },
  bullet_list: {
    block: 'bullet_list',
    getAttrs: (_tok, tokens, i) => ({ bullet: tokens[i + 1]?.markup || '-', tight: isTight(tokens, i) }),
  },
  ordered_list: {
    block: 'ordered_list',
    getAttrs: (tok, tokens, i) => ({ order: Number(tok.attrGet('start') || 1), tight: isTight(tokens, i) }),
  },
  heading: { block: 'heading', getAttrs: (tok) => ({ level: Number(tok.tag.slice(1)) || 1 }) },
  code_block: { block: 'code_block', noCloseToken: true },
  fence: {
    block: 'code_block',
    getAttrs: (tok) => ({ info: tok.info || '', marker: tok.markup || '```' }),
    noCloseToken: true,
  },
  hr: { node: 'horizontal_rule' },
  image: {
    node: 'image',
    getAttrs: (tok) => ({
      src: tok.attrGet('src'),
      title: tok.attrGet('title'),
      alt: tok.children?.[0]?.content || null,
    }),
  },
  hardbreak: { node: 'hard_break' },
  em: { mark: 'em' },
  strong: { mark: 'strong' },
  link: {
    mark: 'link',
    getAttrs: (tok) => ({ href: tok.attrGet('href'), title: tok.attrGet('title') || null }),
  },
  code_inline: { mark: 'code', noCloseToken: true },
  html_inline: { node: 'html_inline', getAttrs: (tok) => ({ text: tok.content }) },
}

const proseParser = new MarkdownParser(schema, markdownIt, TOKENS)

/*
  A table cell holds inline content, but the block rules still run over it, so a
  cell starting with a tag would parse as an html block. Disabling that rule
  keeps such a cell inline; `htmlInlineAsText` then carries the tag through as
  literal text.
*/
const cellMarkdownIt = new MarkdownIt('default', { html: true, linkify: false, breaks: false }).disable('html_block')
const cellParser = new MarkdownParser(schema, cellMarkdownIt, TOKENS)

/** Parse a run of inline markdown into a fragment, for table cells. */
function parseInline(text) {
  if (!text) return Fragment.empty
  try {
    const parsed = cellParser.parse(text)
    return parsed.childCount > 0 ? parsed.child(0).content : Fragment.empty
  } catch {
    return Fragment.from(schema.text(text))
  }
}

/* ------------------------------------------------------------------ *
 * blocks -> ProseMirror
 * ------------------------------------------------------------------ */

/**
 * Build an image node from an `<img>` element.
 *
 * `srcset="<src> 2x"` is the HTML spelling of markdown's `"2x"` title, so it
 * maps onto the same attribute. Everything else is kept as written.
 */
function imageFromElement(parsed) {
  const written = parsed.attributes.map(({ name, value }) => ({ name, value: value === true ? '' : value }))
  const src = written.find((attribute) => attribute.name === 'src')?.value ?? ''

  let alt = null
  let title = null
  const extra = []
  for (const attribute of written) {
    if (attribute.name === 'src') continue
    if (attribute.name === 'alt') {
      alt = attribute.value
      continue
    }
    const scale = attribute.name === 'srcset' ? /^\s*(\S+)\s+([\d.]+x)\s*$/.exec(attribute.value) : null
    if (scale && scale[1] === src) {
      title = scale[2]
      continue
    }
    extra.push(attribute)
  }

  return schema.nodes.image.create({ src, alt, title, attributes: extra })
}

/** Block types handed to the markdown parser for rich editing. */
const PROSE_TYPES = new Set(['paragraph', 'heading', 'list', 'blockquote', 'hr'])

/** Block types edited as their own source rather than as rich content. */
const SOURCE_KINDS = { frontmatter: 'frontmatter', codeImport: 'codeImport', raw: 'raw' }

function sourceNode(kind, text, origin) {
  return schema.nodes.source.create({ kind, text, ...origin })
}

/**
 * Convert a block list into ProseMirror nodes.
 *
 * Blank-line runs are folded into the preceding node's `oTrail` rather than
 * becoming nodes, so spacing round-trips without invisible nodes.
 *
 * @param {import('./blocks.mjs').Block[]} blocks
 * @param {object} [options]
 * @param {Set<string>} [options.componentTags] tags to treat as editable components
 * @param {string} [options.path] internal: origin key prefix
 * @returns {import('prosemirror-model').Node[]}
 */
export function blocksToNodes(blocks, options = {}, path = '') {
  const componentTags = options.componentTags || new Set()
  /** @type {import('prosemirror-model').Node[]} */
  const out = []

  const attachTrail = (text) => {
    if (out.length === 0) {
      // Nothing precedes these, so keep them as a node.
      out.push(sourceNode('blank', text, { oSrc: text, oTrail: '', oKey: `${path}blank` }))
      return
    }
    const last = out[out.length - 1]
    out[out.length - 1] = last.type.create({ ...last.attrs, oTrail: last.attrs.oTrail + text }, last.content, last.marks)
  }

  blocks.forEach((block, index) => {
    const key = `${path}${index}`
    const origin = { oSrc: block.src, oTrail: '', oKey: key }

    if (block.type === 'blank') {
      attachTrail(block.src)
      return
    }

    if (block.type === 'container') {
      const children = blocksToNodes(block.children || [], options, `${key}.`)
      if (children.length === 0) children.push(schema.nodes.paragraph.create({ oKey: `${key}.0` }))
      out.push(
        schema.nodes.container.create(
          {
            ...origin,
            name: block.attrs.name,
            info: block.attrs.info || '',
            indent: block.attrs.indent || '',
            colons: (block.fence?.open || ':::').trim().match(/^:+/)?.[0] || ':::',
            openFence: block.fence?.open ?? null,
            closeFence: block.fence?.close || '',
          },
          children,
        ),
      )
      return
    }

    if (block.type === 'fence') {
      const lines = block.src.split(/\r?\n/)
      const body = lines.slice(1, lines.length - 1)
      // Drop the closing fence line when the block actually had one.
      if (body.length && /^[ \t]{0,3}(`{3,}|~{3,})[ \t]*$/.test(body[body.length - 1])) body.pop()
      const code = body.join('\n')
      out.push(
        schema.nodes.code_block.create(
          { ...origin, info: block.attrs.info || '', marker: block.attrs.marker || '```', indent: block.attrs.indent || '' },
          code ? schema.text(code) : null,
        ),
      )
      return
    }

    if (block.type === 'html') {
      const parsed = parseElement(block.src)
      const tag = parsed?.tag.toLowerCase()
      if (tag === 'img') {
        // The same node a markdown image produces, so both edit identically.
        out.push(schema.nodes.paragraph.create(origin, imageFromElement(parsed)))
        return
      }
      if (parsed && componentTags.has(tag)) {
        out.push(schema.nodes.component.create({ ...origin, ...parsed }))
      } else {
        out.push(schema.nodes.html.create({ ...origin, text: block.src.replace(/\n+$/, '') }))
      }
      return
    }

    if (block.type === 'table') {
      const table = parseTable(block.src, schema, parseInline)
      if (table) {
        out.push(table.type.create({ ...table.attrs, ...origin }, table.content))
        return
      }
    }

    if (PROSE_TYPES.has(block.type)) {
      let parsed = null
      try {
        parsed = proseParser.parse(block.src)
      } catch {
        parsed = null
      }
      if (parsed && parsed.childCount > 0) {
        parsed.forEach((child, _offset, i) => {
          // Only the first child inherits the origin; re-emitting it per node
          // would duplicate the source.
          out.push(
            child.type.create(
              i === 0 ? { ...child.attrs, ...origin } : { ...child.attrs, oKey: `${key}#${i}` },
              child.content,
              child.marks,
            ),
          )
        })
        return
      }
    }

    out.push(sourceNode(SOURCE_KINDS[block.type] || 'raw', block.src.replace(/\n+$/, ''), origin))
  })

  return out
}

/**
 * Build the editor document for a markdown source.
 * @param {string} src
 * @param {{ componentTags?: Set<string> }} [options]
 */
/**
 * Split off frontmatter and the blank lines after it. Both are re-emitted by
 * `docToMarkdown` and never enter the document, where a selection plus a
 * keystroke could replace them.
 */
function splitFrontmatter(blocks) {
  if (blocks[0]?.type !== 'frontmatter') return { frontmatter: '', gap: '', content: blocks }
  // Blank lines between frontmatter and the first block, re-emitted verbatim.
  let at = 1
  let gap = ''
  while (blocks[at]?.type === 'blank') gap += blocks[at++].src
  return { frontmatter: blocks[0].src, gap, content: blocks.slice(at) }
}

/** The frontmatter block's source, or '' when the page has none. */
export function frontmatterOf(src) {
  return splitFrontmatter(parseBlocks(src).blocks).frontmatter
}

export function markdownToDoc(src, options = {}) {
  const { blocks } = parseBlocks(src)
  const nodes = blocksToNodes(splitFrontmatter(blocks).content, options)
  if (nodes.length === 0) nodes.push(schema.nodes.paragraph.create())
  return schema.nodes.doc.create(null, nodes)
}

/* ------------------------------------------------------------------ *
 * ProseMirror -> markdown
 * ------------------------------------------------------------------ */

/**
 * Escape markdown syntax. `<` is left alone so inline HTML survives.
 *
 * `atLineStart` gates the escapes that only matter there. Inline content is
 * serialized per text node, and a node can begin mid-line - after inline code,
 * for instance - where a leading `+` or `-` is just punctuation.
 */
function escapeText(text, atLineStart) {
  const escaped = text
    .replace(/([\\`*[\]])/g, '\\$1')
    // CommonMark only opens emphasis on `_` at a word boundary.
    .replace(/(^|\W)_|_(?=\W|$)/g, (match) => match.replace('_', '\\_'))

  if (!atLineStart) return escaped

  return escaped
    .replace(/^(\s*)([-+*])(\s)/, '$1\\$2$3')
    .replace(/^(\s*)(#{1,6})(\s)/, '$1\\$2$3')
    .replace(/^(\s*)(\d+)([.)]\s)/, '$1$2\\$3')
}

/**
 * An image, as markdown when markdown can express it and as an `<img>` tag
 * when it carries attributes markdown has no place for.
 */
function serializeImage(node) {
  const { src, alt, title, attributes } = node.attrs

  if (!attributes || attributes.length === 0) {
    return `![${alt || ''}](${src}${title ? ` "${title}"` : ''})`
  }

  const written = [{ name: 'src', value: src }]
  if (alt != null) written.push({ name: 'alt', value: alt })
  if (title) written.push({ name: 'srcset', value: `${src} ${title}` })
  written.push(...attributes)
  return serializeElement({ tag: 'img', attributes: written, selfClosing: true })
}

/** Delimiters, outermost first. Matches the schema's mark ranks. */
const MARK_ORDER = ['strong', 'em', 'link', 'code']
const MARK_DELIMITERS = { strong: '**', em: '_', code: '`' }

/** Identity for open/close bookkeeping. Links differ by target. */
function markKey(mark) {
  if (mark.type.name !== 'link') return mark.type.name
  return `link:${mark.attrs.href}\u0000${mark.attrs.title || ''}`
}

function openDelimiter(mark) {
  return mark.type.name === 'link' ? '[' : MARK_DELIMITERS[mark.type.name]
}

function closeDelimiter(mark) {
  if (mark.type.name !== 'link') return MARK_DELIMITERS[mark.type.name]
  const title = mark.attrs.title ? ` "${mark.attrs.title}"` : ''
  return `](${mark.attrs.href}${title})`
}

/**
 * Serialize inline content with a mark stack. Delimiters open and close at the
 * ends of a mark's run, not per node.
 */
function serializeInline(fragment) {
  let out = ''
  /** @type {import('prosemirror-model').Mark[]} */
  let open = []

  const closeTo = (depth) => {
    while (open.length > depth) out += closeDelimiter(open.pop())
  }

  fragment.forEach((node) => {
    if (node.type.name === 'image') {
      closeTo(0)
      out += serializeImage(node)
      return
    }
    if (node.type.name === 'hard_break') {
      closeTo(0)
      out += '\\\n'
      return
    }
    if (node.type.name === 'html_inline') {
      closeTo(0)
      out += node.attrs.text
      return
    }
    if (!node.isText) return

    const marks = [...node.marks].sort(
      (a, b) => MARK_ORDER.indexOf(a.type.name) - MARK_ORDER.indexOf(b.type.name),
    )

    // Keep the marks already open that this node still carries.
    let shared = 0
    while (shared < open.length && shared < marks.length && markKey(open[shared]) === markKey(marks[shared])) shared++
    closeTo(shared)
    for (const mark of marks.slice(shared)) {
      out += openDelimiter(mark)
      open.push(mark)
    }

    const isCode = marks.some((mark) => mark.type.name === 'code')
    const atLineStart = out === '' || out.endsWith('\n')
    out += isCode ? node.text.replace(/`/g, '``') : escapeText(node.text, atLineStart)
  })

  closeTo(0)
  return out
}

/** Indent every line of `text` by `prefix`, leaving blank lines bare. */
function indent(text, prefix) {
  return text
    .split('\n')
    .map((line) => (line.trim() === '' ? line : prefix + line))
    .join('\n')
}

/**
 * Serialize one block node to markdown, always ending in exactly one newline.
 * @param {import('prosemirror-model').Node} node
 * @param {Map<string, any>} originals
 * @param {import('prosemirror-model').Node} [twin] the node as originally loaded
 */
function serializeBlock(node, originals, twin) {
  const name = node.type.name

  switch (name) {
    case 'paragraph':
      return `${serializeInline(node.content)}\n`

    case 'heading': {
      const text = serializeInline(node.content)
      // An empty heading would otherwise keep the separating space.
      return text ? `${'#'.repeat(node.attrs.level)} ${text}\n` : `${'#'.repeat(node.attrs.level)}\n`
    }

    case 'horizontal_rule':
      return '---\n'

    case 'code_block': {
      const marker = node.attrs.marker || '```'
      const body = node.textContent
      return `${marker}${node.attrs.info || ''}\n${body}${body.endsWith('\n') || body === '' ? '' : '\n'}${marker}\n`
    }

    case 'blockquote':
      return `${indent(serializeChildren(node, originals).replace(/\n$/, ''), '> ')}\n`

    case 'bullet_list':
    case 'ordered_list': {
      const parts = []
      let index = node.attrs.order || 1
      node.forEach((item) => {
        const marker = name === 'bullet_list' ? `${node.attrs.bullet || '-'} ` : `${index++}. `
        const body = serializeChildren(item, originals).replace(/\n+$/, '')
        const padded = indent(body, ' '.repeat(marker.length)).slice(marker.length)
        parts.push(`${marker}${padded}\n`)
      })
      return parts.join(node.attrs.tight === false ? '\n' : '')
    }

    case 'container': {
      const colons = node.attrs.colons || ':::'
      const info = node.attrs.info ? ` ${node.attrs.info}` : ''
      // Regenerate the header only when the header itself changed.
      const headerUntouched =
        twin != null &&
        node.attrs.openFence != null &&
        twin.attrs.name === node.attrs.name &&
        twin.attrs.info === node.attrs.info &&
        twin.attrs.colons === node.attrs.colons &&
        twin.attrs.indent === node.attrs.indent
      const head = headerUntouched
        ? node.attrs.openFence
        : `${node.attrs.indent || ''}${colons}${node.attrs.name}${info}\n`
      const body = serializeChildren(node, originals)
      // Re-emit a fence read from the source verbatim; `null` means new.
      const close = node.attrs.closeFence ?? `${node.attrs.indent || ''}${colons}\n`
      return head + body + close
    }

    case 'table':
      return serializeTable(node, serializeInline)

    case 'html': {
      const text = node.attrs.text || ''
      return text.endsWith('\n') ? text : `${text}\n`
    }

    case 'component': {
      // A newline before the first `>` means the opening tag spanned lines.
      const opening = /^<[^>]*\n/.test(node.attrs.oSrc ?? '')
      return `${serializeElement(node.attrs, { multiline: opening })}\n`
    }

    case 'source': {
      const text = node.attrs.text || ''
      return text.endsWith('\n') ? text : `${text}\n`
    }

    default:
      return node.attrs?.oSrc || ''
  }
}

/**
 * Serialize a node's children, re-using original source for untouched ones.
 * @param {import('prosemirror-model').Node} parent
 * @param {Map<string, any>} originals
 */
function serializeChildren(parent, originals) {
  return emitSequence(childrenOf(parent), originals)
}

/**
 * Emit one node: its original bytes when unchanged, a fresh serialization when
 * not. Either way the trailing blank lines it carried are appended.
 */
function emitNode(node, originals) {
  const key = node.attrs?.oKey
  const twin = key != null ? originals.get(key) : null
  const trail = node.attrs?.oTrail ?? ''

  if (twin && twin.eq(node)) return (node.attrs.oSrc ?? '') + trail

  // Changed: recurse, so only the child that moved is regenerated.
  let body = serializeBlock(node, originals, twin)

  // `serializeBlock` always terminates its output; a block that ended the file
  // without a newline must keep it that way.
  const endedFileUnterminated = node.attrs?.oSrc != null && !node.attrs.oSrc.endsWith('\n') && trail === ''
  if (endedFileUnterminated) body = body.replace(/\n$/, '')

  return body + trail
}

/** How many blocks this text holds, ignoring the blank lines between them. */
function blockCount(text) {
  return parseBlocks(text).blocks.filter((block) => block.type !== 'blank').length
}

/**
 * What has to go between two blocks so both survive being written next to
 * each other.
 *
 * Markdown decides where one block ends, and the rule is not uniform: a
 * paragraph written under a heading or a fence stays its own block, but the
 * same paragraph under a list or another paragraph is swallowed by it as a
 * lazy continuation. Rather than keep a table of which pairs need a blank
 * line, the parser that renders the site is asked: whatever separator first
 * leaves both blocks standing is the one used.
 *
 * Nothing is added where nothing is needed, so a document that was not edited
 * still comes back byte for byte.
 */
function separatorFor(before, after, previousIsNew) {
  if (before === '' || after === '') return ''

  const wanted = blockCount(before) + blockCount(after)
  for (const separator of ['', '\n', '\n\n']) {
    if (blockCount(before + separator + after) < wanted) continue
    /*
      Nothing is required here, but a block that was just created is still set
      off with a blank line, so an inserted block reads the way the editor
      shows it. This is deliberately limited to the block that was created:
      adding one between a list item's own children would make the list loose
      and change how it renders.
    */
    if (separator === '' && previousIsNew) return '\n'
    return separator
  }
  // Two lists of the same marker cannot be held apart by blank lines alone.
  return '\n'
}

/** Emit a run of sibling nodes, keeping each one a block of its own. */
function emitSequence(nodes, originals) {
  const pieces = nodes.map((node) => emitNode(node, originals))

  let out = ''
  pieces.forEach((piece, index) => {
    if (index > 0) out += separatorFor(pieces[index - 1], piece, nodes[index - 1].attrs?.oSrc == null)
    out += piece
  })
  return out
}

/** @returns {import('prosemirror-model').Node[]} */
function childrenOf(parent) {
  const out = []
  parent.forEach((child) => out.push(child))
  return out
}

/** Index a node tree by origin key. */
function indexByKey(nodes, map = new Map()) {
  for (const node of nodes) {
    if (node.attrs?.oKey != null) map.set(node.attrs.oKey, node)
    if (node.content && node.content.childCount) {
      const children = []
      node.forEach((child) => children.push(child))
      indexByKey(children, map)
    }
  }
  return map
}

/**
 * Serialize an edited document back to markdown.
 *
 * @param {import('prosemirror-model').Node} doc the (possibly edited) document
 * @param {string} original the source it was loaded from
 * @param {{ componentTags?: Set<string>, frontmatter?: string }} [options] must
 *   match the load options; `frontmatter` replaces the original's, if edited
 * @returns {string}
 */
export function docToMarkdown(doc, original, options = {}) {
  const { blocks } = parseBlocks(original)
  // Split the same way as on load, so origin keys line up.
  const split = splitFrontmatter(blocks)
  const pristine = blocksToNodes(split.content, options)
  const originals = indexByKey(pristine)

  const frontmatter = options.frontmatter ?? split.frontmatter
  return frontmatter + split.gap + emitSequence(childrenOf(doc), originals)
}
