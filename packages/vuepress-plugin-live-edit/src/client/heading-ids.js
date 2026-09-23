/**
 * Give the editor's headings the ids the rendered page uses.
 *
 * The sidebar and in-page links point at `#some-heading`. While editing, the
 * rendered content is hidden, so those ids have to be on the editor's own
 * headings or the links land on nothing and the page does not move.
 *
 * VuePress's own slugify is used rather than a copy of it, so the ids match
 * what the page ships with, and they follow the text as it is edited.
 */

import { Plugin, PluginKey } from 'prosemirror-state'
import { Decoration, DecorationSet } from 'prosemirror-view'
import { slugify } from '@mdit-vue/shared'

export const headingIdsKey = new PluginKey('live-edit-heading-ids')

function build(doc) {
  const decorations = []
  /** Repeated headings get a counter, as the rendered page does. */
  const seen = new Map()

  doc.descendants((node, pos) => {
    if (node.type.name !== 'heading') return
    const base = slugify(node.textContent)
    if (!base) return

    const count = seen.get(base) ?? 0
    seen.set(base, count + 1)
    decorations.push(Decoration.node(pos, pos + node.nodeSize, { id: count === 0 ? base : `${base}-${count}` }))
  })

  return DecorationSet.create(doc, decorations)
}

export function headingIds() {
  return new Plugin({
    key: headingIdsKey,
    state: {
      init: (_config, state) => build(state.doc),
      apply: (tr, value, _old, newState) => (tr.docChanged ? build(newState.doc) : value),
    },
    props: {
      decorations(state) {
        return headingIdsKey.getState(state)
      },
    },
  })
}
