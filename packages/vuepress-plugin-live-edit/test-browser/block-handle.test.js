/**
 * The gutter handle. Its hover zone used to be a fixed distance left of the
 * content, but a table's handle is drawn further out than that, so it sat
 * outside the zone it depends on and only a timer kept it alive.
 */

import { afterEach, describe, expect, test } from 'vitest'
import { userEvent } from 'vitest/browser'
import { cleanup, mountEditor, paragraph } from './helpers.js'

afterEach(cleanup)

const cell = (type, text) => ({ type, content: [paragraph(text)] })

const table = {
  type: 'table',
  content: [
    { type: 'table_row', content: [cell('table_header', 'a'), cell('table_header', 'b')] },
    { type: 'table_row', content: [cell('table_cell', '1'), cell('table_cell', '2')] },
  ],
}

/** Room for the gutter, so the handle is not positioned off-screen. */
function indent(host) {
  host.style.marginLeft = '260px'
  host.style.marginTop = '40px'
}

const handle = () => document.querySelector('.live-edit-handle')

/**
 * Move the pointer to a point.
 *
 * userEvent.hover aims at an element's centre, which is not the question
 * here: the zone has to hold at the handle's outer edge, the furthest point
 * from the content the pointer can legitimately be at.
 */
async function pointAt(x, y) {
  document.dispatchEvent(new MouseEvent('mousemove', { clientX: x, clientY: y, bubbles: true }))
  // The plugin reads the pointer on an animation frame.
  await new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)))
}

describe('block handle', () => {
  test('appears beside a hovered paragraph', async () => {
    const { host } = mountEditor([paragraph('hello'), paragraph('world')])
    indent(host)

    await userEvent.hover(host.children[0])
    expect(handle().hidden).toBe(false)
  })

  test('a table handle stays reachable, though it is drawn further out', async () => {
    const { host } = mountEditor([table])
    indent(host)

    const tableDom = host.children[0]
    await userEvent.hover(tableDom)
    expect(handle().hidden).toBe(false)

    const handleRect = handle().getBoundingClientRect()
    const contentRect = host.getBoundingClientRect()

    // The regression: it is drawn outside the fixed 64px gutter.
    expect(handleRect.left).toBeLessThan(contentRect.left - 64)

    // Its outer edge must still count as being in the zone.
    await pointAt(handleRect.left + 1, handleRect.top + handleRect.height / 2)
    expect(handle().hidden).toBe(false)
  })

  test('leaving the editor entirely hides it', async () => {
    const { host } = mountEditor([paragraph('hello')])
    indent(host)

    await userEvent.hover(host.children[0])
    expect(handle().hidden).toBe(false)

    const away = document.createElement('div')
    away.style.cssText = 'height:80px;margin-top:400px'
    document.body.append(away)
    await userEvent.hover(away)
    expect(handle().hidden).toBe(true)
    away.remove()
  })
})
