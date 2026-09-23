/**
 * Left-margin marks on blocks that differ from a reference.
 *
 * Two independent sources, answering different questions.
 *
 * Session marks compare the document against a snapshot taken when the page
 * was opened, so they show what this editing session changed. They are not
 * retaken on save: autosave writes a few hundred milliseconds after a
 * keystroke, so a "since the last save" mark would clear itself while it was
 * still being read.
 *
 * Git marks come from the server and show which blocks differ from the last
 * commit. They are off until asked for, and refresh on every write.
 */

import { Plugin, PluginKey } from 'prosemirror-state'
import { Decoration, DecorationSet } from 'prosemirror-view'

export const changeMarksKey = new PluginKey('live-edit-change-marks')

/** Identity of a block's content, for comparing against a snapshot. */
function fingerprint(node) {
  return JSON.stringify(node.toJSON())
}

/**
 * Count each top-level block's fingerprint.
 *
 * A multiset rather than a per-position list: a block that was retyped
 * identically, or moved, should not read as changed, and a block that is
 * genuinely new has a fingerprint nothing accounts for.
 *
 * @param {import('prosemirror-model').Node} doc
 * @returns {Map<string, number>}
 */
export function snapshotBaseline(doc) {
  const counts = new Map()
  doc.forEach((node) => {
    const key = fingerprint(node)
    counts.set(key, (counts.get(key) ?? 0) + 1)
  })
  return counts
}

function build(doc, { baseline, gitKeys, showGit }) {
  const decorations = []
  const remaining = new Map(baseline)

  doc.forEach((node, offset) => {
    const classes = []

    const key = fingerprint(node)
    const left = remaining.get(key) ?? 0
    if (left > 0) remaining.set(key, left - 1)
    else classes.push('live-edit-changed')

    const origin = node.attrs?.oKey
    if (showGit && gitKeys && origin != null && gitKeys.has(String(origin))) classes.push('live-edit-git-changed')

    if (classes.length) {
      decorations.push(Decoration.node(offset, offset + node.nodeSize, { class: classes.join(' ') }))
    }
  })

  return DecorationSet.create(doc, decorations)
}

export function changeMarks() {
  return new Plugin({
    key: changeMarksKey,

    state: {
      init(_config, state) {
        const value = { baseline: new Map(), gitKeys: null, showGit: false }
        return { ...value, decorations: build(state.doc, value) }
      },
      apply(tr, value, _old, newState) {
        const meta = tr.getMeta(changeMarksKey)
        // Rebuilding on every transaction would fingerprint the whole document
        // on each caret move.
        if (!meta && !tr.docChanged) return value
        const next = meta ? { ...value, ...meta } : value
        return { ...next, decorations: build(newState.doc, next) }
      },
    },

    props: {
      decorations(state) {
        return changeMarksKey.getState(state).decorations
      },
    },
  })
}

/** Retake the session reference, for a document loaded into an open editor. */
export function setBaseline(view, doc = view.state.doc) {
  view.dispatch(view.state.tr.setMeta(changeMarksKey, { baseline: snapshotBaseline(doc) }))
}

/** Supply the blocks git reports as changed, and whether to show them. */
export function setGitChanges(view, { keys, showGit }) {
  const meta = {}
  if (keys !== undefined) meta.gitKeys = keys ? new Set(keys.map(String)) : null
  if (showGit !== undefined) meta.showGit = showGit
  view.dispatch(view.state.tr.setMeta(changeMarksKey, meta))
}
