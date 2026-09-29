/**
 * Formatting controls above a text selection.
 *
 * Shown only for a non-empty selection inside editable text, so it never
 * covers content while reading or typing. Buttons reflect what is active at
 * the selection.
 */

import { Plugin, PluginKey, TextSelection } from 'prosemirror-state'
import { setBlockType, toggleMark } from 'prosemirror-commands'
import { wrapInList, liftListItem } from 'prosemirror-schema-list'
import { schema } from '../core/schema.mjs'
import { clampBelowHeader } from './viewport.js'

export const selectionToolbarKey = new PluginKey('live-edit-selection-toolbar')

/** Is `mark` present across the selection? */
function markActive(state, type) {
  const { from, $from, to, empty } = state.selection
  return empty ? Boolean(type.isInSet(state.storedMarks || $from.marks())) : state.doc.rangeHasMark(from, to, type)
}

/** Is every selected block of this type with these attrs? */
function blockActive(state, type, attrs = {}) {
  const { $from, to } = state.selection
  const node = $from.node($from.depth)
  if ($from.end() < to) return false
  return node.hasMarkup(type, { ...node.attrs, ...attrs })
}

/** Is the selection inside a list of this type? */
function inList(state, type) {
  const { $from } = state.selection
  for (let depth = $from.depth; depth > 0; depth--) {
    if ($from.node(depth).type === type) return true
  }
  return false
}

/** Wrap in a list, or lift out of one when already in it. */
function toggleList(type) {
  return (state, dispatch) => {
    if (inList(state, type)) return liftListItem(schema.nodes.list_item)(state, dispatch)
    return wrapInList(type)(state, dispatch)
  }
}

/** Add, change or remove a link across the selection. */
function editLink(state, dispatch, view) {
  const type = schema.marks.link
  const { from, to } = state.selection
  let current = ''
  state.doc.nodesBetween(from, to, (node) => {
    const mark = node.marks?.find((candidate) => candidate.type === type)
    if (mark) current = mark.attrs.href
  })

  // eslint-disable-next-line no-alert
  const href = window.prompt('Link target (empty to remove)', current)
  if (href === null) return false
  view.focus()
  if (href === '') return toggleMark(type)(state, dispatch)
  return toggleMark(type, { href })(state, dispatch)
}

const BUTTONS = [
  { label: 'P', title: 'Paragraph', command: setBlockType(schema.nodes.paragraph), active: (s) => blockActive(s, schema.nodes.paragraph) },
  ...[1, 2, 3, 4].map((level) => ({
    label: `H${level}`,
    title: `Heading ${level}`,
    command: setBlockType(schema.nodes.heading, { level }),
    active: (state) => blockActive(state, schema.nodes.heading, { level }),
  })),
  { separator: true },
  { label: 'B', title: 'Bold', command: toggleMark(schema.marks.strong), active: (s) => markActive(s, schema.marks.strong), className: 'is-bold' },
  { label: 'I', title: 'Italic', command: toggleMark(schema.marks.em), active: (s) => markActive(s, schema.marks.em), className: 'is-italic' },
  { label: '<>', title: 'Inline code', command: toggleMark(schema.marks.code), active: (s) => markActive(s, schema.marks.code), className: 'is-code' },
  { label: '⚓', title: 'Link', command: editLink, active: (s) => markActive(s, schema.marks.link) },
  { separator: true },
  { label: '•', title: 'Bullet list', command: toggleList(schema.nodes.bullet_list), active: (s) => inList(s, schema.nodes.bullet_list) },
  { label: '1.', title: 'Numbered list', command: toggleList(schema.nodes.ordered_list), active: (s) => inList(s, schema.nodes.ordered_list) },
]

export function selectionToolbar() {
  return new Plugin({
    key: selectionToolbarKey,

    view(editorView) {
      const bar = document.createElement('div')
      bar.className = 'live-edit-format'
      bar.hidden = true

      const entries = []
      for (const spec of BUTTONS) {
        if (spec.separator) {
          bar.append(Object.assign(document.createElement('span'), { className: 'live-edit-format__sep' }))
          continue
        }
        const button = document.createElement('button')
        button.type = 'button'
        button.title = spec.title
        button.textContent = spec.label
        if (spec.className) button.classList.add(spec.className)
        button.addEventListener('mousedown', (event) => {
          event.preventDefault()
          spec.command(editorView.state, editorView.dispatch, editorView)
          editorView.focus()
        })
        bar.append(button)
        entries.push({ spec, button })
      }
      document.body.append(bar)

      const place = () => {
        const { state } = editorView
        const { selection } = state
        const usable =
          selection instanceof TextSelection &&
          !selection.empty &&
          editorView.hasFocus() &&
          selection.$from.parent.isTextblock &&
          !selection.$from.parent.type.spec.code

        if (!usable) {
          bar.hidden = true
          return
        }

        for (const { spec, button } of entries) {
          button.classList.toggle('is-active', Boolean(spec.active?.(state)))
        }

        let start
        let end
        try {
          start = editorView.coordsAtPos(selection.from)
          end = editorView.coordsAtPos(selection.to)
        } catch {
          bar.hidden = true
          return
        }

        bar.hidden = false
        const rect = bar.getBoundingClientRect()
        const centre = (Math.min(start.left, end.left) + Math.max(start.right, end.right)) / 2

        const top = clampBelowHeader(Math.min(start.top, end.top) - rect.height - 8, end.bottom + 8)
        const left = Math.min(Math.max(centre - rect.width / 2, 8), window.innerWidth - rect.width - 8)
        bar.style.top = `${window.scrollY + top}px`
        bar.style.left = `${window.scrollX + left}px`
      }

      /*
        Clicking outside the editor, or collapsing a selection with the mouse,
        does not always produce a state update, so the browser's own selection
        and focus events are watched too.
      */
      let frame = null
      const schedule = () => {
        if (frame) return
        frame = requestAnimationFrame(() => {
          frame = null
          place()
        })
      }
      document.addEventListener('selectionchange', schedule)
      editorView.dom.addEventListener('blur', schedule)
      editorView.dom.addEventListener('focus', schedule)

      const onScroll = () => {
        if (!bar.hidden) place()
      }
      window.addEventListener('scroll', onScroll, { passive: true })
      window.addEventListener('resize', onScroll)

      return {
        update: place,
        destroy() {
          if (frame) cancelAnimationFrame(frame)
          document.removeEventListener('selectionchange', schedule)
          editorView.dom.removeEventListener('blur', schedule)
          editorView.dom.removeEventListener('focus', schedule)
          window.removeEventListener('scroll', onScroll)
          window.removeEventListener('resize', onScroll)
          bar.remove()
        },
      }
    },
  })
}
