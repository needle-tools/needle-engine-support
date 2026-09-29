/**
 * A `:::` container's title.
 *
 * It is editable, but as an inline span it was only as wide as the words in
 * it, so a click anywhere else on the title line did nothing and the title
 * looked like it could not be edited at all. A `details` container made it
 * worse: its title is a `<summary>`, so clicking folded the container away.
 */

import { afterEach, describe, expect, test } from 'vitest'
import { userEvent } from 'vitest/browser'
import { cleanup, mountEditor, paragraph } from './helpers.js'

afterEach(cleanup)

const container = (name, info) => ({
  type: 'container',
  attrs: { name, info, colons: ':::', openFence: `::: ${name}${info ? ' ' + info : ''}`, closeFence: ':::', indent: '' },
  content: [paragraph('Body text.')],
})

describe('container title', () => {
  test('fills the title line, so the whole line can be clicked', () => {
    const { host } = mountEditor([container('tip', 'A tip title')])
    const info = host.querySelector('.live-edit-container__info')
    const title = info.parentElement

    expect(info.isContentEditable).toBe(true)
    expect(getComputedStyle(info).cursor).toBe('text')
    // Most of the line, rather than just the glyphs.
    expect(info.getBoundingClientRect().width).toBeGreaterThan(title.getBoundingClientRect().width * 0.6)
  })

  test('the type picker does not swallow clicks while it is invisible', () => {
    const { host } = mountEditor([container('tip', 'A tip title')])
    const select = host.querySelector('.live-edit-container__type')

    expect(getComputedStyle(select).opacity).toBe('0')
    expect(getComputedStyle(select).pointerEvents).toBe('none')
  })

  test('typing in the title changes the node, not the document text', async () => {
    const { view, host } = mountEditor([container('tip', 'Start')])
    const info = host.querySelector('.live-edit-container__info')

    info.focus()
    info.textContent = 'Start edited'
    info.dispatchEvent(new Event('input', { bubbles: true }))

    expect(view.state.doc.firstChild.attrs.info).toBe('Start edited')
  })

  test('putting the caret in a details title does not fold it away', async () => {
    const { host } = mountEditor([container('details', 'A details title')])
    const details = host.querySelector('details')
    expect(details).not.toBeNull()
    expect(details.open).toBe(true)

    await userEvent.click(host.querySelector('.live-edit-container__info'))
    expect(details.open).toBe(true)
  })
})
