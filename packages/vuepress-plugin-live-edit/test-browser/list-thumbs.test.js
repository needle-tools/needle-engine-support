/**
 * Thumbnails in a component's list editor.
 *
 * They were a fixed square with `object-fit: cover`, so a wide picture was
 * shown as a cropped square, and the box was a fixed height that ignored how
 * tall the row's fields were.
 */

import { afterEach, beforeAll, describe, expect, test } from 'vitest'
import { createApp, h } from 'vue'
import { cleanup, mountEditor, PIXEL } from './helpers.js'
import { setAppContext } from '../src/client/vue-host.js'

/*
  The list editor builds its rows from the prop value Vue resolved, so the
  component has to actually exist. A stub with the same prop is enough.
*/
beforeAll(() => {
  const app = createApp({ render: () => null })
  app.component('image-slides', {
    name: 'image-slides',
    props: { images: { type: Array, default: () => [] } },
    // Renders something, so the node view is not styled as unrenderable.
    render(props) {
      return h('div', { class: 'stub-slides' }, `${this.images.length} slides`)
    },
  })
  app.mount(document.createElement('div'))
  setAppContext(app._context)
})

afterEach(cleanup)

/** A component whose array prop drives the list editor. */
function slides(images) {
  return {
    type: 'component',
    attrs: {
      tag: 'image-slides',
      attributes: [{ name: ':images', value: JSON.stringify(images).replace(/"/g, "'") }],
      selfClosing: true,
      inner: '',
    },
  }
}

const WIDE = `data:image/svg+xml;utf8,${encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="800" height="100"><rect width="800" height="100" fill="#888"/></svg>')}`

async function openPanel(host) {
  const component = host.querySelector('.live-edit-component')
  component.querySelector('.live-edit-component__toggle').click()
  // Let the thumbnails load so their intrinsic size is known.
  await new Promise((resolve) => setTimeout(resolve, 150))
  await new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)))
  return component
}

describe('list editor thumbnails', () => {
  test('are as tall as the row they belong to', async () => {
    const { host } = mountEditor([slides([{ src: WIDE, alt: 'wide', caption: 'A wide one.' }])])
    await openPanel(host)

    const row = host.querySelector('.live-edit-list__row')
    const thumb = row.querySelector('.live-edit-list__thumb')
    const fields = row.querySelector('.live-edit-list__fields')

    expect(thumb).not.toBeNull()
    expect(thumb.getBoundingClientRect().height).toBeCloseTo(fields.getBoundingClientRect().height, 0)
  })

  test('a tall picture does not stretch the row', async () => {
    const { host } = mountEditor([
      slides([
        { src: WIDE, alt: 'wide', caption: 'A wide one.' },
        { src: PIXEL, alt: 'tall', caption: 'A square one.' },
      ]),
    ])
    await openPanel(host)

    const rows = [...host.querySelectorAll('.live-edit-list__row')]
    expect(rows).toHaveLength(2)

    // Each thumbnail matches its own fields: a square picture must not make
    // the box taller than the three lines beside it.
    for (const row of rows) {
      const thumb = row.querySelector('.live-edit-list__thumb').getBoundingClientRect().height
      const fields = row.querySelector('.live-edit-list__fields').getBoundingClientRect().height
      expect(Math.round(thumb)).toBe(Math.round(fields))
    }
  })

  test('show the whole picture rather than a crop, with square corners', async () => {
    const { host } = mountEditor([slides([{ src: WIDE, alt: 'wide', caption: 'A wide one.' }])])
    await openPanel(host)

    const thumb = host.querySelector('.live-edit-list__thumb')
    const img = thumb.querySelector('img')
    expect(getComputedStyle(img).objectFit).toBe('contain')
    expect(getComputedStyle(thumb).borderRadius).toBe('0px')
  })
})

/*
  The panel is a box already. Entries used to be a box each inside it, and the
  thumbnail a box inside that, so a field sat at the bottom of three nested
  frames.
*/
test('entries are separated by a rule, not boxed', async () => {
  const { host } = mountEditor([
    slides([
      { src: WIDE, alt: 'one', caption: 'First.' },
      { src: WIDE, alt: 'two', caption: 'Second.' },
    ]),
  ])
  await openPanel(host)

  const rows = [...host.querySelectorAll('.live-edit-list__row')]
  for (const row of rows) {
    const style = getComputedStyle(row)
    expect(style.borderLeftWidth).toBe('0px')
    expect(style.borderRightWidth).toBe('0px')
    expect(style.borderBottomWidth).toBe('0px')
    expect(style.borderRadius).toBe('0px')
  }
  // The second one is divided from the first.
  expect(getComputedStyle(rows[1]).borderTopWidth).not.toBe('0px')
  expect(getComputedStyle(rows[0]).borderTopWidth).toBe('0px')
})

test('a field is not sitting inside three framed boxes', async () => {
  const { host } = mountEditor([
    slides([
      { src: WIDE, alt: 'one', caption: 'First.' },
      { src: WIDE, alt: 'two', caption: 'Second.' },
    ]),
  ])
  await openPanel(host)

  // The second entry: the first deliberately has no rule above it.
  const input = host.querySelectorAll('.live-edit-list__row')[1].querySelector('.live-edit-list__field input')
  const framed = []
  for (let el = input.parentElement; el && !el.classList.contains('live-edit-component__panel'); el = el.parentElement) {
    const style = getComputedStyle(el)
    if (style.borderTopWidth !== '0px' && style.borderLeftWidth !== '0px') framed.push(el.className)
  }
  // The panel is the box; nothing between it and the field adds another.
  expect(framed).toEqual([])
})
