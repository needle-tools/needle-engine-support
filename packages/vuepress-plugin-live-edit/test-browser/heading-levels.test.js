/**
 * Which heading levels the editor offers. It had only H2 and H3.
 */

import { afterEach, describe, expect, test } from 'vitest'
import { userEvent } from 'vitest/browser'
import { cleanup, mountEditor, paragraph } from './helpers.js'

afterEach(cleanup)

describe('heading levels', () => {
  test('the selection toolbar offers H1 to H4', () => {
    mountEditor([paragraph('Some text')])
    const labels = [...document.querySelectorAll('.live-edit-format button')].map((b) => b.textContent)
    expect(labels).toEqual(expect.arrayContaining(['H1', 'H2', 'H3', 'H4']))
  })

  test('each toolbar heading button sets that level', () => {
    const { view } = mountEditor([paragraph('Some text')])

    for (const level of [1, 2, 3, 4]) {
      const button = [...document.querySelectorAll('.live-edit-format button')].find((b) => b.textContent === `H${level}`)
      // Select the block, then apply the button the way a click does.
      view.dispatch(view.state.tr.setSelection(view.state.selection.constructor.near(view.state.doc.resolve(1))))
      button.dispatchEvent(new MouseEvent('mousedown', { bubbles: true, cancelable: true }))
      expect(view.state.doc.firstChild.type.name).toBe('heading')
      expect(view.state.doc.firstChild.attrs.level).toBe(level)
    }
  })

  test('the insert menu offers H1 to H4', async () => {
    const { host } = mountEditor([paragraph('Some text'), paragraph('More text')])
    host.style.marginLeft = '260px'

    // The handle appears beside a hovered block; pressing it opens the menu.
    await userEvent.hover(host.children[0])
    const handle = document.querySelector('.live-edit-handle')
    expect(handle.hidden).toBe(false)
    handle.dispatchEvent(new MouseEvent('mousedown', { bubbles: true, cancelable: true }))

    const labels = [...document.querySelectorAll('.live-edit-menu__item')].map((b) => b.textContent)
    expect(labels.length).toBeGreaterThan(0)
    expect(labels).toEqual(expect.arrayContaining(['Heading 1', 'Heading 2', 'Heading 3', 'Heading 4']))
  })
})
