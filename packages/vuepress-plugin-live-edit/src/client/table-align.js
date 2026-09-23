/**
 * Column alignment for markdown tables. Alignment is per column, so the value
 * is written to every cell in the column.
 */

import { TableMap, cellAround } from 'prosemirror-tables'

/**
 * Set the alignment of the column holding the selection.
 *
 * @param {import('prosemirror-state').EditorState} state
 * @param {(tr: import('prosemirror-state').Transaction) => void} [dispatch]
 * @param {'left' | 'center' | 'right' | null} align
 * @returns {boolean}
 */
export function setColumnAlign(state, dispatch, align) {
  const $cell = cellAround(state.selection.$from)
  if (!$cell) return false

  const table = $cell.node(-1)
  const tableStart = $cell.start(-1)
  const map = TableMap.get(table)
  const column = map.colCount($cell.pos - tableStart)

  if (!dispatch) return true

  const tr = state.tr
  for (let row = 0; row < map.height; row++) {
    const cellPos = map.map[row * map.width + column]
    const cell = table.nodeAt(cellPos)
    if (!cell) continue
    tr.setNodeMarkup(tableStart + cellPos, undefined, { ...cell.attrs, align })
  }
  dispatch(tr)
  return true
}
