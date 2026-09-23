/**
 * ProseMirror state, keymaps, input rules and image pasting. The document
 * arrives parsed from the dev server; nothing here touches markdown.
 */

import { EditorState } from 'prosemirror-state'
import { EditorView } from 'prosemirror-view'
import { history, undo, redo } from 'prosemirror-history'
import { keymap } from 'prosemirror-keymap'
import { baseKeymap, chainCommands, exitCode, setBlockType, toggleMark } from 'prosemirror-commands'
import { inputRules, textblockTypeInputRule, wrappingInputRule } from 'prosemirror-inputrules'
import { splitListItem, liftListItem, sinkListItem, wrapInList } from 'prosemirror-schema-list'
import { gapCursor } from 'prosemirror-gapcursor'
import { columnResizing, goToNextCell, tableEditing } from 'prosemirror-tables'
import { blockMenu } from './block-menu.js'
import { tableTools } from './table-tools.js'
import { selectionToolbar } from './selection-toolbar.js'
import { changeMarks, snapshotBaseline, changeMarksKey } from './change-marks.js'
import { headingIds } from './heading-ids.js'

import { schema } from '../core/schema.mjs'
import { createNodeViews } from './node-views.js'
import { blobToDataUrl, uploadAsset } from './api.js'

/** Markdown shortcuts: `# `, ```` ``` ````, `- `, `1. `, `> `. */
function buildInputRules() {
  return inputRules({
    rules: [
      // No smart quotes; they would rewrite quotes in the markdown.
      textblockTypeInputRule(/^(#{1,6})\s$/, schema.nodes.heading, (match) => ({ level: match[1].length })),
      textblockTypeInputRule(/^```([a-z]*)\s$/, schema.nodes.code_block, (match) => ({ info: match[1] || '' })),
      wrappingInputRule(/^\s*([-+*])\s$/, schema.nodes.bullet_list),
      wrappingInputRule(/^(\d+)\.\s$/, schema.nodes.ordered_list),
      wrappingInputRule(/^\s*>\s$/, schema.nodes.blockquote),
    ],
  })
}

function buildKeymap() {
  const mod = /Mac|iPhone|iPad/.test(navigator.platform) ? 'Meta' : 'Ctrl'
  const keys = {
    [`${mod}-z`]: undo,
    [`Shift-${mod}-z`]: redo,
    [`${mod}-y`]: redo,
    [`${mod}-b`]: toggleMark(schema.marks.strong),
    [`${mod}-i`]: toggleMark(schema.marks.em),
    [`${mod}-\``]: toggleMark(schema.marks.code),
    Enter: chainCommands(splitListItem(schema.nodes.list_item), baseKeymap.Enter),
    Tab: sinkListItem(schema.nodes.list_item),
    'Shift-Tab': liftListItem(schema.nodes.list_item),
    'Shift-Enter': chainCommands(exitCode, (state, dispatch) => {
      if (dispatch) dispatch(state.tr.replaceSelectionWith(schema.nodes.hard_break.create()).scrollIntoView())
      return true
    }),
  }
  for (let level = 1; level <= 6; level++) {
    keys[`Shift-${mod}-${level}`] = setBlockType(schema.nodes.heading, { level })
  }
  keys[`Shift-${mod}-0`] = setBlockType(schema.nodes.paragraph)
  keys[`Shift-${mod}-8`] = wrapInList(schema.nodes.bullet_list)
  return keymap(keys)
}

/** Pull image files out of a paste or drop event. */
function imageFilesFrom(dataTransfer) {
  if (!dataTransfer) return []
  const files = [...(dataTransfer.files ?? [])].filter((file) => file.type.startsWith('image/'))
  if (files.length) return files
  return [...(dataTransfer.items ?? [])]
    .filter((item) => item.kind === 'file' && item.type.startsWith('image/'))
    .map((item) => item.getAsFile())
    .filter(Boolean)
}

/**
 * Insert an uploaded image at the selection. Scale goes in the markdown
 * `title`, which this site's renderer turns into a `srcset`.
 */
function insertImage(view, { src, density, alt }) {
  const title = density === 2 ? '2x' : density === 1.5 ? '1.5x' : null
  const image = schema.nodes.image.create({ src, alt: alt || '', title })

  const { $from, empty } = view.state.selection
  const parent = $from.parent
  const inTextBlock = parent.isTextblock
  const atBoundary = $from.parentOffset === 0 || $from.parentOffset === parent.content.size

  // At a paragraph edge, insert as a sibling block rather than inline.
  if (inTextBlock && empty && atBoundary && parent.content.size > 0) {
    const after = $from.after($from.depth)
    const paragraph = schema.nodes.paragraph.create(null, image)
    view.dispatch(view.state.tr.insert(after, paragraph).scrollIntoView())
    return
  }

  view.dispatch(view.state.tr.replaceSelectionWith(image, false).scrollIntoView())
}

/**
 * Upload every image in a transfer and insert them.
 * @returns {boolean} whether anything was handled
 */
function handleImageTransfer(view, dataTransfer, context) {
  const files = imageFilesFrom(dataTransfer)
  if (files.length === 0) return false

  for (const file of files) {
    // Named files give usable alt text; clipboard bitmaps do not.
    const placeholderAlt = file.name && !/^image\.\w+$/i.test(file.name)
      ? file.name.replace(/\.[^.]+$/, '').replace(/[-_]+/g, ' ').trim()
      : ''
    ;(async () => {
      try {
        context.onStatus?.({ kind: 'busy', message: `uploading ${file.name || 'image'}…` })
        const data = await blobToDataUrl(file)
        const result = await uploadAsset({
          route: context.route,
          data,
          alt: placeholderAlt,
          // Unnamed: let the server name it after the page.
          name: placeholderAlt ? file.name.replace(/\.[^.]+$/, '') : '',
          devicePixelRatio: window.devicePixelRatio || 1,
        })
        insertImage(view, result)
        context.onStatus?.({
          kind: 'ok',
          message: `${result.file} · ${result.width}×${result.height} · ${result.density}x (${result.reason})`,
        })
      } catch (error) {
        context.onStatus?.({ kind: 'error', message: `image upload failed: ${error.message}` })
      }
    })()
  }
  return true
}

/**
 * Create the editor view.
 *
 * @param {object} options
 * @param {HTMLElement} options.mount element that becomes the editable content
 * @param {object} options.doc document JSON from the dev server
 * @param {object} options.registry discovered containers and components
 * @param {string} options.route the page being edited, for asset placement
 * @param {(doc: object) => void} options.onChange called on every document change
 * @param {(status: { kind: string, message: string }) => void} [options.onStatus]
 * @returns {EditorView}
 */
export function createEditor({ mount, doc, registry, route, onChange, onStatus }) {
  const context = { route, onStatus }

  const state = EditorState.create({
    doc: schema.nodeFromJSON(doc),
    plugins: [
      buildInputRules(),
      buildKeymap(),
      keymap({ Tab: goToNextCell(1), 'Shift-Tab': goToNextCell(-1) }),
      keymap(baseKeymap),
      history(),
      gapCursor(),
      columnResizing(),
      tableEditing(),
      blockMenu(registry),
      tableTools(),
      selectionToolbar(),
      changeMarks(),
      headingIds(),
    ],
  })

  // `{ mount }` makes this element the editable node itself, so blocks are
  // direct children of the page's content element and inherit its styling.
  const view = new EditorView({ mount }, {
    state,
    nodeViews: createNodeViews(registry, context),
    dispatchTransaction(transaction) {
      const next = view.state.apply(transaction)
      view.updateState(next)
      if (transaction.docChanged) onChange?.(next.doc.toJSON())
    },
    handlePaste(editorView, event) {
      return handleImageTransfer(editorView, event.clipboardData, context)
    },
    handleDrop(editorView, event) {
      return handleImageTransfer(editorView, event.dataTransfer, context)
    },
  })

  // The document as loaded is what "unsaved" is measured against.
  view.dispatch(view.state.tr.setMeta(changeMarksKey, { baseline: snapshotBaseline(view.state.doc) }))

  return view
}

export { schema }
