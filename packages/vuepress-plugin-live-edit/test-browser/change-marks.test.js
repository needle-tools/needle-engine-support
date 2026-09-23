/**
 * Marks in the left margin: what this session changed, and what the server
 * reports as different from the last commit.
 */

import { afterEach, describe, expect, test } from 'vitest'
import { cleanup, mountEditor, paragraph } from './helpers.js'
import { setBaseline, setGitChanges } from '../src/client/change-marks.js'

afterEach(cleanup)

const keyed = (text, oKey) => ({ type: 'paragraph', attrs: { oKey }, content: [{ type: 'text', text }] })
const marked = (host) => [...host.children].map((child) => child.classList.contains('live-edit-changed'))

describe('session marks', () => {
  test('a freshly loaded document has nothing marked', () => {
    const { host } = mountEditor([paragraph('one'), paragraph('two')])
    expect(marked(host)).toEqual([false, false])
  })

  test('only the edited block is marked', () => {
    const { view, host } = mountEditor([paragraph('one'), paragraph('two')])
    view.dispatch(view.state.tr.insertText('!', 2))
    expect(marked(host)).toEqual([true, false])
  })

  test('an inserted block is marked', () => {
    const { view, host } = mountEditor([paragraph('one')])
    view.dispatch(view.state.tr.insert(view.state.doc.content.size, view.state.schema.nodes.paragraph.create()))
    expect(marked(host)).toEqual([false, true])
  })

  test('retaking the reference clears the marks', () => {
    const { view, host } = mountEditor([paragraph('one'), paragraph('two')])
    view.dispatch(view.state.tr.insertText('!', 2))
    expect(marked(host)).toEqual([true, false])

    setBaseline(view)
    expect(marked(host)).toEqual([false, false])
  })

  test('typing and undoing leaves nothing marked', () => {
    const { view, host } = mountEditor([paragraph('one')])
    view.dispatch(view.state.tr.insertText('!', 2))
    expect(marked(host)).toEqual([true])

    view.dispatch(view.state.tr.delete(2, 3))
    expect(marked(host)).toEqual([false])
  })
})

describe('git marks', () => {
  const gitMarked = (host) => [...host.children].map((c) => c.classList.contains('live-edit-git-changed'))

  test('are off until asked for', () => {
    const { view, host } = mountEditor([keyed('one', '0'), keyed('two', '1')])
    setGitChanges(view, { keys: ['0'] })
    expect(gitMarked(host)).toEqual([false, false])
  })

  test('mark the blocks the server named, by origin key', () => {
    const { view, host } = mountEditor([keyed('one', '0'), keyed('two', '1'), keyed('three', '2')])
    setGitChanges(view, { keys: ['0', '2'], showGit: true })
    expect(gitMarked(host)).toEqual([true, false, true])
  })

  test('turning them off clears them', () => {
    const { view, host } = mountEditor([keyed('one', '0')])
    setGitChanges(view, { keys: ['0'], showGit: true })
    expect(gitMarked(host)).toEqual([true])

    setGitChanges(view, { showGit: false })
    expect(gitMarked(host)).toEqual([false])
  })
})
