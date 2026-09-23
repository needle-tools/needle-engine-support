/**
 * The image panel hangs below the image. It used to be held open by a timer
 * because a margin sat between the two, so the pointer crossed ground
 * belonging to neither and the panel closed on the way down.
 */

import { afterEach, describe, expect, test } from 'vitest'
import { userEvent } from 'vitest/browser'
import { cleanup, imageBlock, mountEditor, paragraph, pointerAway, settle, settleTransition } from './helpers.js'

afterEach(cleanup)

describe('image panel', () => {
  test('the panel starts exactly where the image ends', async () => {
    const { host } = mountEditor([imageBlock(), paragraph('after')])
    await settle(host)

    const image = host.querySelector('.live-edit-image')
    const img = image.querySelector('img')
    const panel = image.querySelector('.live-edit-image__panel')
    const card = image.querySelector('.live-edit-image__card')

    const imgRect = img.getBoundingClientRect()
    const panelRect = panel.getBoundingClientRect()
    const cardRect = card.getBoundingClientRect()

    expect(panelRect.top).toBeCloseTo(imgRect.bottom, 0)
    // The visual gap is the panel's padding, so it is inside the hover area.
    expect(cardRect.top).toBeGreaterThan(panelRect.top)
  })

  test('hovering the image opens the panel', async () => {
    const { host } = mountEditor([imageBlock()])
    await settle(host)
    const image = host.querySelector('.live-edit-image')
    const panel = image.querySelector('.live-edit-image__panel')

    expect(getComputedStyle(panel).opacity).toBe('0')
    await userEvent.hover(image.querySelector('img'))
    await settleTransition()
    expect(getComputedStyle(panel).opacity).toBe('1')
    expect(getComputedStyle(panel).pointerEvents).toBe('auto')
  })

  test('no dead space between the image and the card', async () => {
    const { host } = mountEditor([imageBlock()])
    await settle(host)
    const image = host.querySelector('.live-edit-image')
    const img = image.querySelector('img')
    const card = image.querySelector('.live-edit-image__card')

    await userEvent.hover(img)
    await settleTransition()

    const imgRect = img.getBoundingClientRect()
    const cardRect = card.getBoundingClientRect()
    const x = imgRect.left + imgRect.width / 2

    const gaps = []
    for (let y = Math.floor(imgRect.bottom) - 2; y <= Math.ceil(cardRect.top) + 2; y++) {
      const element = document.elementFromPoint(x, y)
      if (!element || !image.contains(element)) gaps.push(y)
    }
    expect(gaps).toEqual([])
  })
})

/*
  The panel used to live entirely on :hover. Reaching a field means scrolling,
  scrolling moves the image out from under the pointer, and the panel closed
  mid-edit. Touching it now pins it until it is dismissed.
*/
describe('pinning', () => {
  const panelOf = (host) => host.querySelector('.live-edit-image__panel')

  test('is not pinned until the panel is used', async () => {
    const { host } = mountEditor([imageBlock()])
    await settle(host)
    const image = host.querySelector('.live-edit-image')

    await userEvent.hover(image.querySelector('img'))
    await settleTransition()
    expect(image.classList.contains('is-pinned')).toBe(false)
    expect(image.querySelector('.live-edit-image__close').hidden).toBe(true)
  })

  test('using the panel holds it open when the pointer leaves', async () => {
    const { host } = mountEditor([imageBlock(), paragraph('below')])
    await settle(host)
    const image = host.querySelector('.live-edit-image')

    await userEvent.hover(image.querySelector('img'))
    await userEvent.click(image.querySelector('.live-edit-image__more'))
    expect(image.classList.contains('is-pinned')).toBe(true)

    // Pointer away, focus away: what scrolling to a field amounts to.
    await pointerAway(userEvent)
    await settleTransition()

    expect(getComputedStyle(panelOf(host)).opacity).toBe('1')
    expect(image.querySelector('.live-edit-image__close').hidden).toBe(false)
  })

  test('the close control dismisses it', async () => {
    const { host } = mountEditor([imageBlock(), paragraph('below')])
    await settle(host)
    const image = host.querySelector('.live-edit-image')

    await userEvent.hover(image.querySelector('img'))
    await userEvent.click(image.querySelector('.live-edit-image__more'))
    await userEvent.click(image.querySelector('.live-edit-image__close'))
    expect(image.classList.contains('is-pinned')).toBe(false)

    await pointerAway(userEvent)
    await settleTransition()
    expect(getComputedStyle(panelOf(host)).opacity).toBe('0')
  })

  test('clicking elsewhere on the page dismisses it', async () => {
    const { host } = mountEditor([imageBlock(), paragraph('below')])
    await settle(host)
    const image = host.querySelector('.live-edit-image')

    await userEvent.hover(image.querySelector('img'))
    await userEvent.click(image.querySelector('.live-edit-image__more'))
    expect(image.classList.contains('is-pinned')).toBe(true)

    host.querySelector('p').dispatchEvent(new PointerEvent('pointerdown', { bubbles: true }))
    expect(image.classList.contains('is-pinned')).toBe(false)
  })

  test('Escape dismisses it', async () => {
    const { host } = mountEditor([imageBlock()])
    await settle(host)
    const image = host.querySelector('.live-edit-image')

    await userEvent.hover(image.querySelector('img'))
    await userEvent.click(image.querySelector('.live-edit-image__more'))
    expect(image.classList.contains('is-pinned')).toBe(true)

    image
      .querySelector('.live-edit-image__panel')
      .dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }))
    expect(image.classList.contains('is-pinned')).toBe(false)
  })
})
