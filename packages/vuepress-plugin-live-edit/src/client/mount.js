/**
 * Swaps the rendered page content for the editor in place.
 *
 * The theme styles `#content` and its direct children, so the editor takes over
 * that element's id rather than nesting inside it.
 */

/** Selectors for the content column, most specific first. */
const CONTENT_SELECTORS = ['[vp-content] #content', '#content', '.theme-default-content', 'main']

/** @returns {HTMLElement | null} */
export function findContentElement(root = document) {
  for (const selector of CONTENT_SELECTORS) {
    const found = root.querySelector(selector)
    if (found) return found
  }
  return null
}

/** Chrome the editor adds, which is not part of the page's text. */
const CHROME = 'button, select, input, textarea, .live-edit-html__chip'

/**
 * Key identifying a block across the swap.
 *
 * Built from visible text only. The tag is not included because a node view
 * wraps its content, and the editor's own controls are skipped, so the same
 * block keys the same before and after.
 */
function blockKey(el) {
  const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      for (let parent = node.parentElement; parent && parent !== el; parent = parent.parentElement) {
        if (parent.matches(CHROME)) return NodeFilter.FILTER_REJECT
      }
      return NodeFilter.FILTER_ACCEPT
    },
  })

  let text = ''
  while (text.length < 80 && walker.nextNode()) text += walker.currentNode.nodeValue
  return text.replace(/\s+/g, ' ').trim().slice(0, 40)
}

/**
 * The block currently at the top of the viewport, and where it sits.
 *
 * Toggling the editor changes some block heights, which would move whatever
 * the reader is looking at. Recording an anchor allows scrolling back to it.
 */
function captureAnchor(root) {
  for (const el of root.children) {
    const rect = el.getBoundingClientRect()
    if (rect.bottom <= 0) continue
    const key = blockKey(el)
    if (key) return { key, top: rect.top }
  }
  return null
}

/** Scroll so `anchor`'s block sits where it did before the swap. */
function restoreAnchor(root, anchor) {
  if (!anchor) return
  for (const el of root.children) {
    if (blockKey(el) !== anchor.key) continue
    const delta = el.getBoundingClientRect().top - anchor.top
    if (Math.abs(delta) > 1) window.scrollBy({ top: delta, behavior: 'instant' })
    return
  }
}

/**
 * Hide the rendered content and put an editable stand-in in its place.
 *
 * @returns {{ host, capture, restore, settle } | null}
 */
export function takeOverContent() {
  const original = findContentElement()
  if (!original || !original.parentElement) return null

  const parent = original.parentElement
  const id = original.getAttribute('id')
  const contentClass = original.className

  const host = document.createElement(original.tagName)
  host.className = contentClass
  host.classList.add('live-edit-surface')
  if (id) {
    // The id is what the theme's CSS targets, and ids must be unique.
    original.removeAttribute('id')
    host.setAttribute('id', id)
  }

  const anchor = captureAnchor(original)

  /** Is this the page's rendered content, rather than the editor or chrome? */
  const isContent = (node) =>
    node !== host &&
    node.nodeType === 1 &&
    !node.classList.contains('live-edit-surface') &&
    (node.className === contentClass || node.matches('#content, .theme-default-content'))

  /*
    The content is hidden, not removed. Vue owns this element and goes on
    patching it as the file changes; taking it out of the document sends those
    updates to a node that is no longer in the page, and the rendered content
    is then frozen at the moment editing began, for good.

    It stays findable by anything that walks the page, so a reader of the DOM
    that wants the content once has to skip what is hidden. `checkVisibility`
    is the general test, and `data-live-edit-hidden` says who hid it.
  */
  const hide = (element) => {
    if (id && element.getAttribute('id') === id) element.removeAttribute('id')
    element.style.display = 'none'
    element.setAttribute('data-live-edit-hidden', '')
    hidden = element
  }

  /** The rendered content standing behind the editor. */
  let hidden = null
  parent.insertBefore(host, original)
  hide(original)

  /*
    Saving changes the file, which makes the dev server re-render the page.
    The re-render replaces the element that was hidden with a fresh, visible
    one, so the page appeared twice: once in the editor and once below it.
    Anything that takes the hidden element's place is hidden the same way.
  */
  const observer = new MutationObserver((records) => {
    for (const record of records) {
      for (const node of record.addedNodes) {
        if (isContent(node)) hide(node)
      }
    }
  })
  observer.observe(parent, { childList: true })

  let restored = false

  /**
   * Restore the page content, scrolling so `closing` sits where it did.
   *
   * The caller captures `closing` before destroying the editor view, which
   * empties the host element.
   */
  const restore = (closing) => {
    if (restored) return
    restored = true
    observer.disconnect()

    host.remove()

    // A re-render may have replaced the element hidden at the start; the most
    // recently hidden one is the one Vue is keeping up to date.
    const current = hidden
    if (!current) return
    if (id) current.setAttribute('id', id)
    current.style.display = ''
    current.removeAttribute('data-live-edit-hidden')
    restoreAnchor(current, closing)
  }

  return {
    host,
    capture: () => captureAnchor(host),
    restore,
    settle: () => restoreAnchor(host, anchor),
  }
}
