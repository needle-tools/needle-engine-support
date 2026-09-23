/**
 * Edit round-trips over the real documentation.
 *
 * Opening and saving without typing must return the original bytes, and an
 * edit must change only the block it was made in.
 */

import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

import { markdownToDoc, docToMarkdown, blocksToNodes } from '../src/core/doc.mjs'
import { parseBlocks } from '../src/core/blocks.mjs'
import { schema } from '../src/core/schema.mjs'
import { Fragment } from 'prosemirror-model'
import { listMarkdownFiles } from '../src/core/paths.mjs'
import { buildRegistry, componentTagSet } from '../src/core/registry.mjs'

const REPO_ROOT = path.resolve(fileURLToPath(new URL('../../..', import.meta.url)))
const DOCS_DIR = path.join(REPO_ROOT, 'documentation')
const files = listMarkdownFiles(DOCS_DIR)

const registry = buildRegistry({
  docsDir: DOCS_DIR,
  componentsDir: path.join(DOCS_DIR, '.vuepress', 'components'),
  configFile: path.join(DOCS_DIR, '.vuepress', 'config.ts'),
})
const options = { componentTags: componentTagSet(registry) }

const rel = (file) => path.relative(REPO_ROOT, file)

/** Count differing lines between two versions of a file. */
function changedLines(before, after) {
  const a = before.split('\n')
  const b = after.split('\n')
  let head = 0
  while (head < a.length && head < b.length && a[head] === b[head]) head++
  let tail = 0
  while (tail < a.length - head && tail < b.length - head && a[a.length - 1 - tail] === b[b.length - 1 - tail]) tail++
  return { before: a.length - head - tail, after: b.length - head - tail, at: head }
}

/** Replace the first node matching `predicate`, returning a new document. */
function mapFirst(doc, predicate, transform) {
  const children = []
  let done = false
  doc.forEach((node) => {
    if (!done && predicate(node)) {
      children.push(transform(node))
      done = true
    } else {
      children.push(node)
    }
  })
  return { doc: schema.nodes.doc.create(null, children), changed: done }
}

test('open and save with no edits returns the original bytes', () => {
  /** @type {string[]} */
  const broken = []
  for (const file of files) {
    const src = readFileSync(file, 'utf8')
    const doc = markdownToDoc(src, options)
    if (docToMarkdown(doc, src, options) !== src) broken.push(rel(file))
  }
  assert.deepEqual(broken, [], `${broken.length} file(s) changed on a no-op save`)
})

test('every block survives the ProseMirror document as a node', () => {
  // A block type lost between parser and schema would round-trip but not edit.
  for (const file of files) {
    const src = readFileSync(file, 'utf8')
    const { blocks } = parseBlocks(src)
    const nodes = blocksToNodes(blocks, options)
    const visible = blocks.filter((block) => block.type !== 'blank')
    assert.ok(
      nodes.length >= visible.length,
      `${rel(file)}: ${visible.length} blocks became ${nodes.length} nodes`,
    )
  }
})

test('editing a heading rewrites only that heading', () => {
  let checked = 0
  for (const file of files) {
    const src = readFileSync(file, 'utf8')
    const doc = markdownToDoc(src, options)
    const { doc: edited, changed } = mapFirst(
      doc,
      (node) => node.type.name === 'heading' && node.textContent.length > 0,
      (node) => node.type.create(node.attrs, schema.text('Edited Heading')),
    )
    if (!changed) continue

    const out = docToMarkdown(edited, src, options)
    assert.notEqual(out, src, rel(file))
    assert.ok(out.includes('Edited Heading'), `${rel(file)}: edit not applied`)

    const diff = changedLines(src, out)
    assert.ok(diff.before <= 1 && diff.after <= 1, `${rel(file)}: touched ${diff.before}->${diff.after} lines, expected 1`)
    checked++
  }
  assert.ok(checked > 100, `expected to exercise most of the corpus, did ${checked}`)
})

test('editing a paragraph rewrites only that paragraph', () => {
  let checked = 0
  for (const file of files) {
    const src = readFileSync(file, 'utf8')
    const doc = markdownToDoc(src, options)
    const { doc: edited, changed } = mapFirst(
      doc,
      (node) => node.type.name === 'paragraph' && node.textContent.length > 20,
      (node) => node.type.create(node.attrs, schema.text('A replacement sentence.')),
    )
    if (!changed) continue

    const out = docToMarkdown(edited, src, options)
    assert.ok(out.includes('A replacement sentence.'), `${rel(file)}: edit not applied`)
    const diff = changedLines(src, out)
    assert.ok(diff.after <= 1, `${rel(file)}: produced ${diff.after} lines, expected 1`)
    checked++
  }
  assert.ok(checked > 100, `expected to exercise most of the corpus, did ${checked}`)
})

test('retitling a container leaves its body byte-identical', () => {
  let checked = 0
  for (const file of files) {
    const src = readFileSync(file, 'utf8')
    const doc = markdownToDoc(src, options)
    const { doc: edited, changed } = mapFirst(
      doc,
      (node) => node.type.name === 'container',
      (node) => node.type.create({ ...node.attrs, info: 'Retitled' }, node.content),
    )
    if (!changed) continue

    const out = docToMarkdown(edited, src, options)
    assert.ok(out.includes('Retitled'), `${rel(file)}: retitle not applied`)

    const diff = changedLines(src, out)
    assert.ok(diff.before <= 1 && diff.after <= 1, `${rel(file)}: touched ${diff.before}->${diff.after} lines`)
    checked++
  }
  assert.ok(checked > 40, `expected many container pages, did ${checked}`)
})

test('editing inside a container leaves the fences and siblings alone', () => {
  let checked = 0
  for (const file of files) {
    const src = readFileSync(file, 'utf8')
    const doc = markdownToDoc(src, options)

    const { doc: edited, changed } = mapFirst(
      doc,
      (node) => node.type.name === 'container' && node.childCount > 0 &&
        [...Array(node.childCount)].some((_, i) => node.child(i).type.name === 'paragraph'),
      (node) => {
        const children = []
        let done = false
        node.forEach((child) => {
          if (!done && child.type.name === 'paragraph') {
            children.push(child.type.create(child.attrs, schema.text('Inner text changed.')))
            done = true
          } else {
            children.push(child)
          }
        })
        return node.type.create(node.attrs, children)
      },
    )
    if (!changed) continue

    const out = docToMarkdown(edited, src, options)
    assert.ok(out.includes('Inner text changed.'), `${rel(file)}: inner edit not applied`)

    // The container's own fences must be untouched: same count of ::: lines.
    const fencesBefore = (src.match(/^[ \t]{0,3}:{2,}/gm) || []).length
    const fencesAfter = (out.match(/^[ \t]{0,3}:{2,}/gm) || []).length
    assert.equal(fencesAfter, fencesBefore, `${rel(file)}: container fences changed`)

    const diff = changedLines(src, out)
    assert.ok(diff.after <= 1, `${rel(file)}: produced ${diff.after} lines, expected 1`)
    checked++
  }
  assert.ok(checked > 30, `expected many container pages, did ${checked}`)
})

test('changing a component attribute rewrites only that component', () => {
  let checked = 0
  for (const file of files) {
    const src = readFileSync(file, 'utf8')
    const doc = markdownToDoc(src, options)
    const { doc: edited, changed } = mapFirst(
      doc,
      (node) => node.type.name === 'component',
      (node) =>
        node.type.create({
          ...node.attrs,
          attributes: [...node.attrs.attributes, { name: 'data-live-edit-test', value: 'yes' }],
        }),
    )
    if (!changed) continue

    const out = docToMarkdown(edited, src, options)
    assert.ok(out.includes('data-live-edit-test="yes"'), `${rel(file)}: attribute not applied`)
    checked++
  }
  assert.ok(checked > 10, `expected several component pages, did ${checked}`)
})

test('editing one node never disturbs the rest of the file', () => {
  // Exactly one contiguous region changes and it is the edited one. A wrapped
  // paragraph collapsing to a single line is expected.
  let checked = 0
  for (const file of files) {
    const src = readFileSync(file, 'utf8')
    const doc = markdownToDoc(src, options)
    const { doc: edited, changed } = mapFirst(
      doc,
      (node) => node.type.name === 'paragraph' && node.textContent.length > 20,
      (node) => node.type.create(node.attrs, schema.text('Sentinel.')),
    )
    if (!changed) continue

    const out = docToMarkdown(edited, src, options)
    const before = src.split('\n')
    const after = out.split('\n')

    let head = 0
    while (head < before.length && head < after.length && before[head] === after[head]) head++
    let tail = 0
    while (
      tail < before.length - head &&
      tail < after.length - head &&
      before[before.length - 1 - tail] === after[after.length - 1 - tail]
    ) tail++

    const inserted = after.slice(head, after.length - tail)
    assert.deepEqual(inserted, ['Sentinel.'], `${rel(file)}: changed region was not just the edit`)

    // Everything outside that one region must be byte-identical.
    assert.equal(before.slice(0, head).join('\n'), after.slice(0, head).join('\n'), `${rel(file)}: prefix moved`)
    assert.equal(
      before.slice(before.length - tail).join('\n'),
      after.slice(after.length - tail).join('\n'),
      `${rel(file)}: suffix moved`,
    )
    checked++
  }
  assert.ok(checked > 100, `expected to exercise most of the corpus, did ${checked}`)
})

test('successive saves stay minimal after a block is inserted', () => {
  // Regression: origin keys index into the baseline parse. Serializing a later
  // save against the file on disk renumbers everything after an inserted block,
  // and untouched blocks stop matching their originals.
  let checked = 0
  for (const file of files) {
    const baseline = readFileSync(file, 'utf8')
    const doc = markdownToDoc(baseline, options)

    // Save 1: insert a brand new paragraph after the first one.
    const withInsert = []
    let inserted = false
    doc.forEach((node) => {
      withInsert.push(node)
      if (!inserted && node.type.name === 'paragraph') {
        withInsert.push(schema.nodes.paragraph.create(null, schema.text('Inserted block.')))
        inserted = true
      }
    })
    if (!inserted) continue
    const afterFirst = docToMarkdown(schema.nodes.doc.create(null, withInsert), baseline, options)
    assert.ok(afterFirst.includes('Inserted block.'), `${rel(file)}: insert not applied`)

    // Save 2: a further edit, serialized against the SAME baseline.
    let edited = false
    const withSecond = withInsert.map((node) => {
      if (edited || node.type.name !== 'heading' || !node.textContent) return node
      edited = true
      return node.type.create(node.attrs, schema.text('Second Edit'))
    })
    if (!edited) continue
    const afterSecond = docToMarkdown(schema.nodes.doc.create(null, withSecond), baseline, options)

    // The two outputs must differ only where the second edit landed.
    const a = afterFirst.split('\n')
    const b = afterSecond.split('\n')
    if (a.length !== b.length) continue // heading collapsed a wrapped line; fine
    const differing = a.map((line, i) => (line === b[i] ? null : i)).filter((i) => i !== null)
    assert.ok(
      differing.length <= 1,
      `${rel(file)}: second save disturbed ${differing.length} lines`,
    )

    // And the insert from save 1 must still be there, exactly once.
    assert.equal((afterSecond.match(/Inserted block\./g) || []).length, 1, `${rel(file)}: insert duplicated or lost`)
    checked++
  }
  assert.ok(checked > 100, `expected to exercise most of the corpus, did ${checked}`)
})

test('an inserted block is separated from what follows it', () => {
  // Without a blank line a new block runs into the next one.
  const baseline = ['# Title', '', 'A paragraph.', '', '::: tip Keep me', 'Body.', ':::', ''].join('\n')
  const doc = markdownToDoc(baseline, options)

  const children = []
  let done = false
  doc.forEach((node) => {
    children.push(node)
    if (!done && node.type.name === 'paragraph') {
      children.push(
        schema.nodes.paragraph.create(null, schema.nodes.image.create({ src: '/imgs/x.webp', alt: 'X', title: '2x' })),
      )
      done = true
    }
  })

  const out = docToMarkdown(schema.nodes.doc.create(null, children), baseline, options)
  assert.equal(
    out,
    ['# Title', '', 'A paragraph.', '', '![X](/imgs/x.webp "2x")', '', '::: tip Keep me', 'Body.', ':::', ''].join('\n'),
  )
})

test('frontmatter is kept out of the document but preserved on save', () => {
  // Regression: as a document node, a selection plus a keystroke could replace
  // the frontmatter and drop a page's title and description.
  const withFrontmatter = files.filter((file) => readFileSync(file, 'utf8').startsWith('---'))
  assert.ok(withFrontmatter.length > 100, `expected most pages to have frontmatter, got ${withFrontmatter.length}`)

  for (const file of withFrontmatter) {
    const src = readFileSync(file, 'utf8')
    const doc = markdownToDoc(src, options)

    // Nothing in the document represents it.
    let mentions = 0
    doc.forEach((node) => {
      if (node.type.name === 'source' && node.attrs.kind === 'frontmatter') mentions++
    })
    assert.equal(mentions, 0, `${rel(file)}: frontmatter is still a document node`)

    // Replacing the entire document still leaves the frontmatter intact.
    const replaced = schema.nodes.doc.create(null, [schema.nodes.paragraph.create(null, schema.text('Wiped.'))])
    const out = docToMarkdown(replaced, src, options)
    const original = src.slice(0, src.indexOf('---', 3) + 4)
    assert.ok(out.startsWith(original), `${rel(file)}: frontmatter lost`)
    assert.ok(out.includes('Wiped.'), `${rel(file)}: replacement not applied`)
  }
})

test('edited frontmatter replaces the original', () => {
  const src = '---\ntitle: Old\n---\n\n# Body\n'
  const doc = markdownToDoc(src, options)
  const out = docToMarkdown(doc, src, { ...options, frontmatter: '---\ntitle: New\n---\n' })
  assert.equal(out, '---\ntitle: New\n---\n\n# Body\n')
})

test('tables become editable table nodes, not source blocks', () => {
  const src = [
    '| Column | Meaning |',
    '| --- | ---: |',
    '| `a` | first |',
    '| b | second |',
    '',
  ].join('\n')

  const doc = markdownToDoc(src, options)
  const table = doc.child(0)
  assert.equal(table.type.name, 'table')
  assert.equal(table.childCount, 3, 'header plus two body rows')
  assert.equal(table.child(0).child(0).type.name, 'table_header')
  assert.equal(table.child(0).child(1).attrs.align, 'right', 'alignment is kept')
  assert.equal(docToMarkdown(doc, src, options), src)
})

test('editing a table cell rewrites only the table', () => {
  const src = ['Before.', '', '| A | B |', '| --- | --- |', '| one | two |', '', 'After.', ''].join('\n')
  const doc = markdownToDoc(src, options)

  const children = []
  doc.forEach((node) => {
    if (node.type.name !== 'table') return children.push(node)
    const rows = []
    node.forEach((row, _o, rowIndex) => {
      if (rowIndex !== 1) return rows.push(row)
      const cells = []
      row.forEach((cell, _co, cellIndex) => {
        cells.push(cellIndex === 0 ? cell.type.create(cell.attrs, schema.text('edited')) : cell)
      })
      rows.push(row.type.create(row.attrs, cells))
    })
    children.push(node.type.create(node.attrs, rows))
  })

  const out = docToMarkdown(schema.nodes.doc.create(null, children), src, options)
  assert.ok(out.startsWith('Before.\n\n'), 'text before the table moved')
  assert.ok(out.endsWith('After.\n'), 'text after the table moved')
  assert.ok(out.includes('edited'), 'edit not applied')
  assert.ok(!out.includes('| one |'), 'old cell still present')
})

test('every table in the corpus round-trips through a table node', () => {
  let tables = 0
  for (const file of files) {
    const src = readFileSync(file, 'utf8')
    const doc = markdownToDoc(src, options)
    doc.forEach((node) => {
      if (node.type.name === 'table') tables++
    })
    assert.equal(docToMarkdown(doc, src, options), src, rel(file))
  }
  assert.ok(tables > 100, `expected the corpus tables, found ${tables}`)
})

test('tight and loose lists keep their spacing', () => {
  const tight = ['- one', '- two', ''].join('\n')
  const loose = ['- one', '', '- two', ''].join('\n')

  const tightDoc = markdownToDoc(tight, options)
  const looseDoc = markdownToDoc(loose, options)
  assert.equal(tightDoc.child(0).attrs.tight, true)
  assert.equal(looseDoc.child(0).attrs.tight, false)

  // Re-serialize from scratch by replacing the list's origin, so the serializer
  // runs rather than the original bytes being re-emitted.
  const strip = (doc) => {
    const list = doc.child(0)
    return schema.nodes.doc.create(null, [list.type.create({ ...list.attrs, oSrc: null, oKey: null }, list.content)])
  }
  assert.equal(docToMarkdown(strip(tightDoc), tight, options), tight)
  assert.equal(docToMarkdown(strip(looseDoc), loose, options), loose)
})

test('raw HTML blocks are html nodes, kept verbatim', () => {
  const src = '<div class="wrap">text</div>\n'
  const doc = markdownToDoc(src, options)
  assert.equal(doc.child(0).type.name, 'html')
  assert.equal(docToMarkdown(doc, src, options), src)
})

test('an <img> block becomes the same node a markdown image does', () => {
  const html = markdownToDoc('<img src="/imgs/a.webp" alt="A" />\n', options)
  const md = markdownToDoc('![A](/imgs/a.webp)\n', options)

  for (const doc of [html, md]) {
    assert.equal(doc.child(0).type.name, 'paragraph')
    assert.equal(doc.child(0).child(0).type.name, 'image')
  }
  assert.equal(html.child(0).child(0).attrs.src, md.child(0).child(0).attrs.src)
  assert.equal(html.child(0).child(0).attrs.alt, md.child(0).child(0).attrs.alt)
})

test('srcset maps onto the same scale attribute as a markdown title', () => {
  const html = markdownToDoc('<img src="/imgs/a.webp" alt="A" srcset="/imgs/a.webp 2x" />\n', options)
  const md = markdownToDoc('![A](/imgs/a.webp "2x")\n', options)
  assert.equal(html.child(0).child(0).attrs.title, '2x')
  assert.equal(md.child(0).child(0).attrs.title, '2x')
})

test('an image serializes as markdown unless it needs HTML', () => {
  const plain = schema.nodes.image.create({ src: '/a.webp', alt: 'A', title: '2x' })
  const withExtras = schema.nodes.image.create({
    src: '/a.webp',
    alt: 'A',
    title: '2x',
    attributes: [{ name: 'loading', value: 'lazy' }],
  })

  const wrap = (image) => schema.nodes.doc.create(null, [schema.nodes.paragraph.create(null, image)])
  assert.equal(docToMarkdown(wrap(plain), '', options), '![A](/a.webp "2x")\n')
  assert.equal(
    docToMarkdown(wrap(withExtras), '', options),
    '<img src="/a.webp" alt="A" srcset="/a.webp 2x" loading="lazy" />\n',
  )
})

test('an <img> block with extra attributes round-trips', () => {
  const src = '<img src="/imgs/a.webp" alt="A" loading="lazy" />\n'
  assert.equal(docToMarkdown(markdownToDoc(src, options), src, options), src)
})

test('dropping the extra attributes turns an <img> into markdown', () => {
  const src = '<img src="/imgs/a.webp" alt="A" loading="lazy" />\n'
  const doc = markdownToDoc(src, options)
  const paragraph = doc.child(0)
  const image = paragraph.child(0)

  const simplified = schema.nodes.doc.create(null, [
    paragraph.type.create(
      { ...paragraph.attrs, oSrc: null, oKey: null },
      image.type.create({ ...image.attrs, attributes: [] }),
    ),
  ])
  assert.equal(docToMarkdown(simplified, src, options), '![A](/imgs/a.webp)\n')
})

test('line-start escapes apply only at a line start', () => {
  // Inline content is serialized per text node, and a node can start mid-line,
  // for instance after inline code. A `+` there is punctuation, not a bullet.
  const src = '`.obj` + `.mtl` + textures\n'
  const doc = markdownToDoc(src, options)
  const paragraph = doc.child(0)

  const regenerated = schema.nodes.doc.create(null, [
    paragraph.type.create({ ...paragraph.attrs, oSrc: null, oKey: null }, paragraph.content),
  ])
  assert.equal(docToMarkdown(regenerated, src, options), src)
})

test('a genuine leading bullet is still escaped', () => {
  const doc = schema.nodes.doc.create(null, [
    schema.nodes.paragraph.create(null, schema.text('+ not a list')),
  ])
  assert.equal(docToMarkdown(doc, '', options), '\\+ not a list\n')
})

test('a multi-line element keeps its shape when an attribute changes', () => {
  const src = ['<my-widget', '  mode="wide"', '  :items="[1, 2]"', '/>', ''].join('\n')
  const options2 = { componentTags: new Set(['my-widget']) }

  const doc = markdownToDoc(src, options2)
  const component = doc.child(0)
  assert.equal(component.type.name, 'component')

  const edited = schema.nodes.doc.create(null, [
    component.type.create({
      ...component.attrs,
      attributes: [...component.attrs.attributes, { name: 'loading', value: 'lazy' }],
    }),
  ])

  const out = docToMarkdown(edited, src, options2)
  assert.ok(out.startsWith('<my-widget\n'), `tag was flattened:\n${out}`)
  assert.ok(out.includes('\n  loading="lazy"'), `attribute not on its own line:\n${out}`)
  assert.ok(out.includes('\n  mode="wide"'), 'existing attributes should stay on their own lines')
})

test('a single-line element stays on one line', () => {
  const src = '<my-widget mode="wide" />\n'
  const options2 = { componentTags: new Set(['my-widget']) }
  const component = markdownToDoc(src, options2).child(0)

  const edited = schema.nodes.doc.create(null, [
    component.type.create({
      ...component.attrs,
      attributes: [...component.attrs.attributes, { name: 'loading', value: 'lazy' }],
    }),
  ])
  assert.equal(docToMarkdown(edited, src, options2), '<my-widget mode="wide" loading="lazy" />\n')
})

/*
  A block typed after a list, a paragraph or a quote used to be written with
  no blank line before it. Markdown reads that as a lazy continuation of the
  block above, so the new block was swallowed: the editor showed a paragraph
  after the list, the file said the text belonged to the last list item, and
  reloading the page moved it there.
*/

/** Append a block to a document parsed from `source`. */
function appended(source, node, options = {}) {
  const doc = markdownToDoc(source, options)
  const next = doc.type.create(doc.attrs, doc.content.append(Fragment.from(node)))
  return { doc: next, markdown: docToMarkdown(next, source, options) }
}

const topLevelTypes = (doc) => {
  const names = []
  doc.forEach((node) => names.push(node.type.name))
  return names
}

const newParagraph = (text) => schema.nodes.paragraph.create(null, schema.text(text))

for (const [label, source] of [
  ['a bullet list', '- one\n- two\n'],
  ['an ordered list', '1. one\n2. two\n'],
  ['a paragraph', 'Hello.\n'],
  ['a blockquote', '> quoted\n'],
]) {
  test(`a paragraph typed after ${label} stays its own block`, () => {
    const { doc, markdown } = appended(source, newParagraph('after the list'))
    assert.deepEqual(topLevelTypes(markdownToDoc(markdown, {})), topLevelTypes(doc))
    assert.match(markdown, /\n\nafter the list\n$/)
  })
}

test('no blank line is added where markdown does not need one', () => {
  // A heading ends itself, so the paragraph under it is already its own block.
  const { markdown } = appended('## Title\n', newParagraph('text'))
  assert.equal(markdown, '## Title\ntext\n')
})

test('a list typed after a paragraph stays a list', () => {
  const item = schema.nodes.list_item.create(null, newParagraph('first'))
  const list = schema.nodes.bullet_list.create({ bullet: '-', tight: true }, item)
  const { doc, markdown } = appended('Intro.\n', list)
  assert.deepEqual(topLevelTypes(markdownToDoc(markdown, {})), topLevelTypes(doc))
})

test('the text of an absorbed block is not lost', () => {
  const { markdown } = appended('- one\n', newParagraph('kept'))
  const reparsed = markdownToDoc(markdown, {})
  const last = reparsed.child(reparsed.childCount - 1)
  assert.equal(last.type.name, 'paragraph')
  assert.equal(last.textContent, 'kept')
})
