/**
 * Give the editor's headings the ids the rendered page uses.
 *
 * The sidebar and in-page links point at `#some-heading`. While editing, the
 * rendered content is hidden, so those ids have to be on the editor's own
 * headings or the links land on nothing and the page does not move.
 *
 * A site can configure how VuePress slugs a heading, and this one does, so the
 * ids are taken from the page the editor is standing in for. A heading that
 * has just been typed or retitled has no id there yet; those fall back to
 * VuePress's default slug, which is also what the table of contents reads back
 * off the editor, so in-page links stay consistent either way.
 */

import { Plugin, PluginKey } from 'prosemirror-state'
import { Decoration, DecorationSet } from 'prosemirror-view'
import { slugify } from '@mdit-vue/shared'

export const headingIdsKey = new PluginKey('live-edit-heading-ids')

function build(doc, known) {
  const decorations = []
  /** Repeated headings get a counter, as the rendered page does. */
  const seen = new Map()

  doc.descendants((node, pos) => {
    if (node.type.name !== 'heading') return
    const text = node.textContent.replace(/\s+/g, ' ').trim()
    const base = known?.get(text) ?? slugify(text)
    if (!base) return

    const count = seen.get(base) ?? 0
    seen.set(base, count + 1)
    decorations.push(Decoration.node(pos, pos + node.nodeSize, { id: count === 0 ? base : `${base}-${count}` }))
  })

  return DecorationSet.create(doc, decorations)
}

/**
 * @param {Map<string, string>} [known] heading text to the id the site gave it
 */
export function headingIds(known) {
  return new Plugin({
    key: headingIdsKey,
    state: {
      init: (_config, state) => build(state.doc, known),
      apply: (tr, value, _old, newState) => (tr.docChanged ? build(newState.doc, known) : value),
    },
    props: {
      decorations(state) {
        return headingIdsKey.getState(state)
      },
    },
  })
}
