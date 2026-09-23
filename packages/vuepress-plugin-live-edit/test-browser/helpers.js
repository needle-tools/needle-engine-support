/**
 * Mount a real editor in the page.
 *
 * The same createEditor the plugin uses, with the stylesheet loaded, so
 * measurements here are the ones a reader would get.
 */

import { createEditor } from '../src/client/editor.js'
import '../src/client/live-edit.css'

/**
 * A 400x300 image, inline. Real dimensions matter: the node view sizes itself
 * from naturalWidth, and a 1px target cannot be hovered reliably.
 */
export const PIXEL =
  'data:image/svg+xml;utf8,' +
  encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300"><rect width="400" height="300" fill="#cccccc"/></svg>')

const REGISTRY = { containers: [], components: [] }

/** Tear down everything a test mounted. */
const mounted = []

export function mountEditor(content, { registry = REGISTRY } = {}) {
  const host = document.createElement('div')
  // takeOverContent adds this in production; the CSS selectors expect it.
  host.className = 'live-edit-surface'
  document.body.append(host)

  const view = createEditor({
    mount: host,
    doc: { type: 'doc', content },
    registry,
    route: '/test.html',
    onChange: () => {},
    onStatus: () => {},
  })

  mounted.push({ view, host })
  return { view, host }
}

export function cleanup() {
  parkingSpot?.remove()
  for (const { view, host } of mounted.splice(0)) {
    view.destroy()
    host.remove()
  }
  // Floating chrome is appended to body, not to the host.
  for (const selector of ['.live-edit-handle', '.live-edit-menu', '.live-edit-format', '.live-edit-table-tools']) {
    for (const element of document.querySelectorAll(selector)) element.remove()
  }
}

export const paragraph = (text) => ({ type: 'paragraph', content: text ? [{ type: 'text', text }] : [] })

export const imageBlock = (attrs = {}) => ({
  type: 'paragraph',
  content: [{ type: 'image', attrs: { src: PIXEL, alt: '', title: null, attributes: [], ...attrs } }],
})

/**
 * Move the pointer somewhere that is definitely not the editor.
 *
 * A panel is absolutely positioned and can overlay the block below it, so
 * hovering "the next paragraph" is not reliably away from it. This puts the
 * pointer on a fixed patch above everything instead.
 */
let parkingSpot = null

export async function pointerAway(userEvent) {
  if (!parkingSpot) {
    parkingSpot = document.createElement('div')
    parkingSpot.style.cssText = 'position:fixed;top:0;left:0;width:60px;height:60px;z-index:99999'
  }
  document.body.append(parkingSpot)
  document.activeElement?.blur()
  await userEvent.hover(parkingSpot)
  // Left in place: removing it hands hover straight back to whatever is under
  // the pointer, which is the editor.
}

/** Let a CSS transition finish before reading computed style. */
export const settleTransition = () => new Promise((r) => setTimeout(r, 200))

/** Wait until the image inside a node view has laid out. */
export async function settle(host) {
  const images = [...host.querySelectorAll('img')]
  await Promise.all(
    images.map((img) => (img.complete ? Promise.resolve() : new Promise((r) => img.addEventListener('load', r, { once: true })))),
  )
  await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)))
}
