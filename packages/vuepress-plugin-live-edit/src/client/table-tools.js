/**
 * Table controls, split by axis.
 *
 * Column controls sit above the table, aligned to the selected column. Row
 * controls sit in a vertical strip left of the table, aligned to the selected
 * row. Both stay outside the table's box, so neither covers a cell.
 */

import { Plugin, PluginKey, TextSelection } from 'prosemirror-state'
import {
  addColumnAfter,
  addColumnBefore,
  addRowAfter,
  addRowBefore,
  cellAround,
  deleteColumn,
  deleteRow,
  deleteTable,
  TableMap,
} from 'prosemirror-tables'
import { setColumnAlign } from './table-align.js'
import { clampBelowHeader } from './viewport.js'

export const tableToolsKey = new PluginKey('live-edit-table-tools')

/** Distance from the table edge to a toolbar. */
const GAP = 8

/**
 * Run a table command, then put the caret in the cell the change produced.
 *
 * `target` maps the cell the caret was in to where it should end up, so
 * inserting a row above row 2 while in column 3 leaves the caret in the new
 * row, still in column 3. The toolbars follow the caret, so they move too.
 */
function withCaret(command, target) {
  return (state, dispatch) => {
    if (!dispatch) return command(state, null)

    const $cell = cellAround(state.selection.$from)
    if (!$cell) return command(state, dispatch)

    const start = $cell.start(-1)
    const before = TableMap.get($cell.node(-1)).findCell($cell.pos - start)

    let captured = null
    const ran = command(state, (tr) => {
      captured = tr
    })
    if (!ran || !captured) return ran

    // The table may be gone, or no longer a table, after a delete.
    const table = captured.doc.resolve(Math.min(start, captured.doc.content.size)).parent
    if (table?.type?.spec?.tableRole !== 'table') {
      dispatch(captured)
      return true
    }

    const map = TableMap.get(table)
    const wanted = target({ row: before.top, col: before.left })
    const row = Math.min(Math.max(wanted.row, 0), map.height - 1)
    const col = Math.min(Math.max(wanted.col, 0), map.width - 1)

    const cell = start + map.positionAt(row, col, table)
    captured.setSelection(TextSelection.near(captured.doc.resolve(cell + 1)))
    dispatch(captured.scrollIntoView())
    return true
  }
}

const COLUMN_BUTTONS = [
  { label: '←+', title: 'Insert column before', command: withCaret(addColumnBefore, (at) => at) },
  { label: '+→', title: 'Insert column after', command: withCaret(addColumnAfter, (at) => ({ ...at, col: at.col + 1 })) },
  { label: '✕', title: 'Delete column', command: withCaret(deleteColumn, (at) => at), danger: true },
  { separator: true },
  { label: '⇤', title: 'Align column left', command: (s, d) => setColumnAlign(s, d, 'left') },
  { label: '⇔', title: 'Align column center', command: (s, d) => setColumnAlign(s, d, 'center') },
  { label: '⇥', title: 'Align column right', command: (s, d) => setColumnAlign(s, d, 'right') },
  { separator: true },
  { label: '✖', title: 'Delete table', command: deleteTable, danger: true },
]

const ROW_BUTTONS = [
  { label: '↑+', title: 'Insert row above', command: withCaret(addRowBefore, (at) => at) },
  { label: '+↓', title: 'Insert row below', command: withCaret(addRowAfter, (at) => ({ ...at, row: at.row + 1 })) },
  { label: '✕', title: 'Delete row', command: withCaret(deleteRow, (at) => at), danger: true },
]

/** The cell, row and table elements around the selection. */
function selectionContext(view) {
  const $cell = cellAround(view.state.selection.$from)
  if (!$cell) return null

  const cell = view.nodeDOM($cell.pos)
  if (!cell || !cell.getBoundingClientRect) return null

  const row = cell.closest('tr')
  const table = cell.closest('table')
  if (!row || !table) return null
  return { cell, row, table }
}

function buildBar(className, specs, editorView) {
  const bar = document.createElement('div')
  bar.className = className
  bar.hidden = true

  for (const spec of specs) {
    if (spec.separator) {
      bar.append(Object.assign(document.createElement('span'), { className: 'live-edit-table-tools__sep' }))
      continue
    }
    const button = document.createElement('button')
    button.type = 'button'
    button.title = spec.title
    button.textContent = spec.label
    if (spec.danger) button.dataset.danger = ''
    button.addEventListener('mousedown', (event) => {
      event.preventDefault()
      spec.command(editorView.state, editorView.dispatch)
      editorView.focus()
    })
    bar.append(button)
  }

  document.body.append(bar)
  return bar
}

export function tableTools() {
  return new Plugin({
    key: tableToolsKey,

    view(editorView) {
      const columnBar = buildBar('live-edit-table-tools is-columns', COLUMN_BUTTONS, editorView)
      const rowBar = buildBar('live-edit-table-tools is-rows', ROW_BUTTONS, editorView)

      const place = () => {
        const context = selectionContext(editorView)
        if (!context || !editorView.hasFocus()) {
          columnBar.hidden = true
          rowBar.hidden = true
          return
        }

        const { cell, row, table } = context
        const cellRect = cell.getBoundingClientRect()
        const rowRect = row.getBoundingClientRect()
        const tableRect = table.getBoundingClientRect()

        columnBar.hidden = false
        const columnRect = columnBar.getBoundingClientRect()
        // Above the table rather than the cell, so an interior row is never
        // covered. Kept within the table's width, and on screen once the
        // table's top has scrolled past the header.
        const left = Math.min(cellRect.left, tableRect.right - columnRect.width)
        const columnTop = clampBelowHeader(
          tableRect.top - columnRect.height - GAP,
          tableRect.bottom - columnRect.height,
        )
        columnBar.style.top = `${window.scrollY + columnTop}px`
        columnBar.style.left = `${window.scrollX + Math.max(left, tableRect.left)}px`

        rowBar.hidden = false
        const rowBarRect = rowBar.getBoundingClientRect()
        const rowTop = clampBelowHeader(rowRect.top, tableRect.bottom - rowBarRect.height)
        rowBar.style.top = `${window.scrollY + rowTop}px`
        rowBar.style.left = `${window.scrollX + tableRect.left - rowBarRect.width - GAP}px`
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
        if (!columnBar.hidden || !rowBar.hidden) place()
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
          columnBar.remove()
          rowBar.remove()
        },
      }
    },
  })
}
