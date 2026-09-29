/**
 * Headings need the ids the rendered page uses, or the sidebar and in-page
 * links land on nothing while the editor is open.
 */

import { afterEach, describe, expect, test } from 'vitest'
import { cleanup, mountEditor, paragraph } from './helpers.js'

afterEach(cleanup)

const heading = (text, level = 2) => ({ type: 'heading', attrs: { level }, content: [{ type: 'text', text }] })
const ids = (host) => [...host.querySelectorAll('h1,h2,h3')].map((h) => h.id)

describe('heading ids', () => {
  test('match the slug the page uses', () => {
    const { host } = mountEditor([heading('First section'), heading('Some Heading With CAPS')])
    expect(ids(host)).toEqual(['first-section', 'some-heading-with-caps'])
  })

  test('repeated headings are numbered rather than colliding', () => {
    const { host } = mountEditor([heading('Notes'), heading('Notes'), heading('Notes')])
    expect(ids(host)).toEqual(['notes', 'notes-1', 'notes-2'])
  })

  test('follow the text as it is edited', () => {
    const { view, host } = mountEditor([heading('Before')])
    expect(ids(host)).toEqual(['before'])

    // Replace the heading's text.
    view.dispatch(view.state.tr.insertText('After', 1, 7))
    expect(ids(host)).toEqual(['after'])
  })

  test('a heading with no usable text gets no id', () => {
    const { host } = mountEditor([heading('!!!'), paragraph('body')])
    expect(ids(host)).toEqual([''])
  })
})

/*
  A site can configure how VuePress slugs a heading, and this one does:
  `## 11 · Networking` is rendered with `id="11-networking"`, while the default
  slug would be `_11-·-networking`. Ids are therefore taken from the rendered
  page, not computed again.
*/
describe('ids the site already gave a heading', () => {
  const heading = (text, level = 2) => ({ type: 'heading', attrs: { level }, content: [{ type: 'text', text }] })

  test('are used in preference to the default slug', () => {
    const known = new Map([['11 · Networking', '11-networking']])
    const { host } = mountEditor([heading('11 · Networking')], { headingIds: known })
    expect(host.querySelector('h2').id).toBe('11-networking')
  })

  test('a heading with no id on the page falls back to a slug', () => {
    const known = new Map([['11 · Networking', '11-networking']])
    const { host } = mountEditor([heading('Something New')], { headingIds: known })
    expect(host.querySelector('h2').id).toBe('something-new')
  })

  test('retitling a heading moves it off the harvested id', () => {
    const known = new Map([['Before', 'before-from-page']])
    const { view, host } = mountEditor([heading('Before')], { headingIds: known })
    expect(host.querySelector('h2').id).toBe('before-from-page')

    view.dispatch(view.state.tr.insertText('After', 1, 7))
    expect(host.querySelector('h2').id).toBe('after')
  })
})
