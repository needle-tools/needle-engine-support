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
