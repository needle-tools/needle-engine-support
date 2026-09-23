/**
 * Asserts `dom-contract.mjs` still matches what the site's markdown renderer
 * produces. The reference is the container plugin the default theme installs,
 * not a stand-in.
 */

import { test } from 'node:test'
import assert from 'node:assert/strict'
import { createRequire } from 'node:module'

import { containerShape, containerTitleFallback, classifyHtmlBlock, THEME_HOOKS } from '../src/core/dom-contract.mjs'
import { parseElement, collectElements } from '../src/core/vue-template.mjs'
import { markdownToDoc, docToMarkdown } from '../src/core/doc.mjs'
import { schema } from '../src/core/schema.mjs'

const require = createRequire(import.meta.url)
const MarkdownIt = require('markdown-it')
const { hint } = await import('@vuepress/plugin-markdown-hint')

/** markdown-it with the container plugin the default theme installs. */
const reference = new MarkdownIt('default', { html: true, linkify: false }).use(hint, {
  hint: true,
  alert: false,
})

/** Tag and classes of the outermost element of a rendered fragment. */
function rootOf(html) {
  const element = parseElement(html.trim())
  assert.ok(element, `could not parse rendered output: ${html.slice(0, 60)}`)
  const classAttr = element.attributes.find((attribute) => attribute.name === 'class')
  return {
    tag: element.tag,
    classes: classAttr && classAttr.value !== true ? classAttr.value.split(/\s+/).filter(Boolean) : [],
  }
}

/** Every element in a rendered fragment, with its classes. */
function elementsOf(html) {
  return collectElements(html.trim()).map((element) => {
    const classAttr = element.attributes.find((attribute) => attribute.name === 'class')
    return {
      tag: element.tag,
      classes: classAttr && classAttr.value !== true ? classAttr.value.split(/\s+/).filter(Boolean) : [],
    }
  })
}

test('the reference renderer is the theme\'s own container plugin', () => {
  // If this stops producing hint markup, the rest of the file asserts nothing.
  const html = reference.render('::: tip Title\nBody.\n:::\n')
  assert.match(html, new RegExp(THEME_HOOKS.containerClass))
  assert.match(html, new RegExp(THEME_HOOKS.containerTitleClass))
})

test('container markup matches the contract', () => {
  for (const name of ['tip', 'warning', 'danger', 'info', 'details']) {
    const html = reference.render(`::: ${name} Title\nBody.\n:::\n`)
    const expected = containerShape(name)
    const actual = rootOf(html)

    assert.equal(actual.tag, expected.tag, `${name}: wrong element`)
    for (const className of expected.classes) {
      assert.ok(actual.classes.includes(className), `${name}: missing class ${className} (got ${actual.classes.join(' ')})`)
    }
  }
})

test('container titles match the contract', () => {
  for (const name of ['tip', 'warning', 'details']) {
    const html = reference.render(`::: ${name} Title\nBody.\n:::\n`)
    const expected = containerShape(name).title
    const title = elementsOf(html).find((element) => element.tag === expected.tag && element.tag !== 'p' ? true
      : element.classes.includes(THEME_HOOKS.containerTitleClass))

    assert.ok(title, `${name}: no title element in ${html.trim().slice(0, 80)}`)
    assert.equal(title.tag, expected.tag, `${name}: title should be <${expected.tag}>`)
    for (const className of expected.classes) {
      assert.ok(title.classes.includes(className), `${name}: title missing class ${className}`)
    }
  }
})

test('the title of an untitled container falls back to its name', () => {
  for (const name of ['tip', 'warning']) {
    const html = reference.render(`:::${name}\nBody.\n:::\n`)
    assert.match(
      html,
      new RegExp(`class="${THEME_HOOKS.containerTitleClass}"[^>]*>${containerTitleFallback(name)}<`),
      `${name}: fallback title changed`,
    )
  }
})

test('a container the editor can produce is one the renderer understands', () => {
  // Every type the editor offers must render as a container, not as text.
  for (const name of ['tip', 'warning', 'danger', 'info', 'note', 'caution', 'details', 'important']) {
    const html = reference.render(`::: ${name} T\nB.\n:::\n`)
    assert.match(html, new RegExp(THEME_HOOKS.containerClass), `${name} did not render as a container`)
  }
})

test('the editor builds the element the contract names', () => {
  // The node carries what the view needs to pick the element.
  for (const name of ['tip', 'details']) {
    const doc = markdownToDoc(`::: ${name} Title\nBody.\n:::\n`, {})
    const container = doc.child(0)
    assert.equal(container.type.name, 'container')
    assert.equal(container.attrs.name, name)
    assert.equal(containerShape(container.attrs.name).tag, name === 'details' ? 'details' : 'div')
  }
})

test('lists match the renderer on tightness', () => {
  // A tight list renders without paragraph wrappers, a loose one with them.
  // The editor always wraps and uses this flag for spacing.
  const cases = [
    { src: '- one\n- two\n', tight: true },
    { src: '- one\n\n- two\n', tight: false },
    { src: '1. one\n2. two\n', tight: true },
  ]
  for (const { src, tight } of cases) {
    const html = reference.render(src)
    const rendersParagraphs = /<li>\s*<p>/.test(html)
    assert.equal(rendersParagraphs, !tight, `renderer disagrees about tightness for ${JSON.stringify(src)}`)

    const list = markdownToDoc(src, {}).child(0)
    assert.equal(list.attrs.tight, tight, `editor disagrees about tightness for ${JSON.stringify(src)}`)
  }
})

test('tables match the renderer on structure and alignment', () => {
  const src = '| A | B |\n| --- | ---: |\n| one | two |\n'
  const html = reference.render(src)
  assert.match(html, /<table>/)
  assert.match(html, /<th[^>]*>A<\/th>/)
  assert.match(html, /text-align:\s*right/, 'renderer no longer emits column alignment')

  const table = markdownToDoc(src, {}).child(0)
  assert.equal(table.type.name, 'table')
  assert.equal(table.child(0).child(1).attrs.align, 'right')
})

test('block constructs use the same element as the renderer', () => {
  const cases = [
    { src: '# Heading\n', tag: 'h1', node: 'heading' },
    { src: '## Heading\n', tag: 'h2', node: 'heading' },
    { src: 'Text.\n', tag: 'p', node: 'paragraph' },
    { src: '> Quote.\n', tag: 'blockquote', node: 'blockquote' },
    { src: '---\n', tag: 'hr', node: 'horizontal_rule' },
    { src: '- one\n', tag: 'ul', node: 'bullet_list' },
    { src: '1. one\n', tag: 'ol', node: 'ordered_list' },
  ]

  for (const { src, tag, node } of cases) {
    assert.match(reference.render(src), new RegExp(`<${tag}[ >]`), `renderer: ${JSON.stringify(src)}`)

    const first = markdownToDoc(src, {}).child(0)
    assert.equal(first.type.name, node, `editor node for ${JSON.stringify(src)}`)

    // The schema's own DOM spec has to name the same element.
    const spec = first.type.spec.toDOM?.(first)
    if (Array.isArray(spec)) assert.equal(spec[0], tag, `schema toDOM for ${node}`)
  }
})

test('every node type the editor can create renders somehow', () => {
  // A node with neither a DOM spec nor a node view would be invisible.
  const withNodeViews = new Set(['container', 'component', 'html', 'source', 'table', 'code_block', 'image'])
  for (const [name, type] of Object.entries(schema.nodes)) {
    if (name === 'doc' || name === 'text') continue
    const hasSpec = typeof type.spec.toDOM === 'function'
    assert.ok(hasSpec || withNodeViews.has(name), `${name} has no toDOM and no node view`)
  }
})

test('a bold link nests the same way as the renderer', () => {
  // The theme sets a font-weight on links, so <strong><a> and <a><strong>
  // render at different weights.
  const html = reference.render('**[Text](https://example.com)**\n')
  assert.match(html, /<strong><a/, 'renderer no longer puts strong outside the link')

  const marks = schema.marks
  assert.ok(marks.strong.rank < marks.link.rank, 'strong must outrank link to render outside it')
  assert.ok(marks.em.rank < marks.link.rank, 'em must outrank link to render outside it')
})

test('a bold link serializes back to the dominant form', () => {
  const src = '**[Text](https://example.com)**\n'
  const doc = markdownToDoc(src, {})

  // Drop the origin so the serializer runs instead of re-emitting the source.
  const paragraph = doc.child(0)
  const stripped = schema.nodes.doc.create(null, [
    paragraph.type.create({ ...paragraph.attrs, oSrc: null, oKey: null }, paragraph.content),
  ])
  assert.equal(docToMarkdown(stripped, src, {}), src)
})

test('inline HTML is a node, not literal text', () => {
  // `<img class="inline-logo" …>` appears mid-sentence in these docs. As text
  // it would show as escaped markup in the editor.
  const src = 'The <img class="inline-logo" src="/imgs/a.webp" /> app does things.\n'
  const doc = markdownToDoc(src, {})
  const paragraph = doc.child(0)

  const kinds = []
  paragraph.content.forEach((child) => kinds.push(child.type.name))
  assert.ok(kinds.includes('html_inline'), `got ${kinds.join(', ')}`)
  assert.equal(docToMarkdown(doc, src, {}), src)
})

test('blocks that render nothing are classified as such', () => {
  // The page drops comments and hoists styles out of the content. Writing them
  // as innerHTML would apply the styles to the editor.
  assert.equal(classifyHtmlBlock('<!-- a note -->'), 'comment')
  assert.equal(classifyHtmlBlock('<style>\n.a { color: red }\n</style>'), 'style')
  assert.equal(classifyHtmlBlock('<script>x()</script>'), 'script')
  assert.equal(classifyHtmlBlock('<img src="/a.webp" />'), 'markup')

  for (const src of ['<!-- a note -->\n', '<style>\n.a { color: red }\n</style>\n']) {
    assert.equal(docToMarkdown(markdownToDoc(src, {}), src, {}), src, 'must still round-trip')
  }
})
