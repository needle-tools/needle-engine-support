/**
 * The attribute editor. "+ Add attribute" did nothing, because the rows were
 * rebuilt from the node on every render and a new row has nothing in the node
 * to be rebuilt from.
 */

import { afterEach, describe, expect, test } from 'vitest'
import { cleanup, imageBlock, mountEditor, settle } from './helpers.js'

afterEach(cleanup)

const rowsIn = (image) => [...image.querySelectorAll('.live-edit-image__attr')]
const addButton = (image) =>
  [...image.querySelectorAll('button')].find((button) => button.textContent.includes('Add attribute'))

function type(input, value) {
  input.value = value
  input.dispatchEvent(new Event('input', { bubbles: true }))
}

describe('image attributes', () => {
  test('the html button toggles, and says so', async () => {
    const { host } = mountEditor([imageBlock()])
    await settle(host)
    const image = host.querySelector('.live-edit-image')
    const more = image.querySelector('.live-edit-image__more')
    const extras = image.querySelector('.live-edit-image__extras')

    expect(extras.hidden).toBe(true)
    more.click()
    expect(extras.hidden).toBe(false)
    expect(more.getAttribute('aria-pressed')).toBe('true')

    more.click()
    expect(extras.hidden).toBe(true)
    expect(more.getAttribute('aria-pressed')).toBe('false')
  })

  test('adding a row keeps it, even before it has a name', async () => {
    const { host } = mountEditor([imageBlock()])
    await settle(host)
    const image = host.querySelector('.live-edit-image')
    image.querySelector('.live-edit-image__more').click()

    expect(rowsIn(image)).toHaveLength(0)
    addButton(image).click()
    expect(rowsIn(image)).toHaveLength(1)
    addButton(image).click()
    expect(rowsIn(image)).toHaveLength(2)
  })

  test('a named attribute reaches the document and switches the output', async () => {
    const { view, host } = mountEditor([imageBlock()])
    await settle(host)
    const image = host.querySelector('.live-edit-image')
    const more = image.querySelector('.live-edit-image__more')
    more.click()
    addButton(image).click()

    const [name, value] = rowsIn(image)[0].querySelectorAll('input')
    type(name, 'loading')
    type(value, 'lazy')

    const imageNode = view.state.doc.firstChild.firstChild
    expect(imageNode.attrs.attributes).toEqual([{ name: 'loading', value: 'lazy' }])
    expect(more.textContent).toBe('html · 1')
    expect(image.querySelector('.live-edit-image__note').textContent).toBe('saved as an <img> tag')
  })

  test('removing the last attribute goes back to markdown', async () => {
    const { view, host } = mountEditor([imageBlock({ attributes: [{ name: 'loading', value: 'lazy' }] })])
    await settle(host)
    const image = host.querySelector('.live-edit-image')
    image.querySelector('.live-edit-image__more').click()

    expect(rowsIn(image)).toHaveLength(1)
    rowsIn(image)[0].querySelector('button').click()

    expect(view.state.doc.firstChild.firstChild.attrs.attributes).toEqual([])
    expect(image.querySelector('.live-edit-image__note').textContent).toBe('saved as markdown')
  })
})
