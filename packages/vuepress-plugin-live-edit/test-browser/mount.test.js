/**
 * Taking over the page content.
 *
 * Saving changes the file, the dev server re-renders the page, and the
 * re-render replaces the element that was hidden with a fresh visible one.
 * The page then appeared twice: once in the editor, once below it.
 */

import { afterEach, describe, expect, test } from 'vitest'
import { takeOverContent } from '../src/client/mount.js'

let wrapper = null

afterEach(() => {
  wrapper?.remove()
  wrapper = null
})

/** The shape the theme renders: a content element inside a wrapper. */
function page() {
  wrapper = document.createElement('div')
  wrapper.innerHTML = '<div id="content" class="theme-default-content"><h2>One</h2><p>Body</p></div>'
  document.body.append(wrapper)
  return wrapper.querySelector('#content')
}

/**
 * What Vue does on a re-render: put a fresh content element into the page.
 *
 * It goes into the wrapper, not in place of the old element, because by then
 * the old one has been taken out of the document.
 */
function reRender() {
  const fresh = document.createElement('div')
  fresh.id = 'content'
  fresh.className = 'theme-default-content'
  fresh.innerHTML = '<h2>One</h2><p>Body</p>'
  wrapper.append(fresh)
  return fresh
}

const visibleContents = () =>
  [...wrapper.children].filter((el) => getComputedStyle(el).display !== 'none').length

describe('takeOverContent', () => {
  test('hides the rendered content and stands in for it', () => {
    const original = page()
    const surface = takeOverContent()

    expect(surface).not.toBeNull()
    // It stays in the document so the framework can go on updating it.
    expect(original.isConnected).toBe(true)
    expect(getComputedStyle(original).display).toBe('none')
    expect(surface.host.id).toBe('content')
    expect(original.hasAttribute('id')).toBe(false)
    expect(visibleContents()).toBe(1)
  })

  test('a re-render does not leave the page showing twice', async () => {
    page()
    const surface = takeOverContent()

    const fresh = reRender()
    // The observer runs on a microtask.
    await new Promise((resolve) => setTimeout(resolve, 0))

    expect(getComputedStyle(fresh).display).toBe('none')
    expect(fresh.hasAttribute('id')).toBe(false)
    expect(visibleContents()).toBe(1)
    surface.restore(null)
  })

  test('closing restores the element that is actually there now', async () => {
    page()
    const surface = takeOverContent()
    const fresh = reRender()
    await new Promise((resolve) => setTimeout(resolve, 0))

    surface.restore(null)

    expect(getComputedStyle(fresh).display).not.toBe('none')
    expect(fresh.id).toBe('content')
    expect(fresh.hasAttribute('data-live-edit-hidden')).toBe(false)
    expect(document.querySelectorAll('.live-edit-surface')).toHaveLength(0)
    expect(visibleContents()).toBe(1)
  })

  test('it stops watching once closed', async () => {
    page()
    const surface = takeOverContent()
    surface.restore(null)

    const fresh = reRender()
    await new Promise((resolve) => setTimeout(resolve, 0))
    expect(getComputedStyle(fresh).display).not.toBe('none')
  })
})

/*
  The rendered content has to stay in the document, or the framework's later
  updates land on a node that is no longer in the page and the view freezes at
  whatever it said when editing began. So it is still findable, and a reader
  that wants the page once must skip what is hidden - as the table of contents
  now does.
*/
test('the rendered content stays put, so it can keep being updated', () => {
  const original = page()
  takeOverContent()

  expect(original.isConnected).toBe(true)
  // Standing in for a framework writing a later update into its own element.
  original.innerHTML = '<h2>Updated</h2>'
  expect(original.querySelector('h2').textContent).toBe('Updated')
})

test('a later update is what closing puts back', () => {
  const original = page()
  const surface = takeOverContent()

  original.innerHTML = '<h2>Updated</h2>'
  surface.restore(null)

  expect(getComputedStyle(original).display).not.toBe('none')
  expect(wrapper.textContent).toContain('Updated')
})

test('skipping hidden content finds the page once', () => {
  page()
  const surface = takeOverContent()
  surface.host.innerHTML = '<h2>One</h2><p>Body</p>'

  const visible = [...wrapper.querySelectorAll('h2')].filter((el) => el.checkVisibility())
  expect(wrapper.querySelectorAll('h2')).toHaveLength(2)
  expect(visible).toHaveLength(1)

  surface.restore(null)
  expect([...wrapper.querySelectorAll('h2')].filter((el) => el.checkVisibility())).toHaveLength(1)
})
