/**
 * DOM shapes the site's theme styles.
 *
 * The editor renders through ProseMirror, the site through markdown-it. Node
 * views build from these definitions; `dom-parity.test.mjs` asserts the site's
 * renderer still produces them.
 */

/** Container types the renderer emits under a different class. */
const CONTAINER_ALIASES = { danger: 'caution' }

/**
 * Shape of a rendered `:::` container. `details` renders as a disclosure
 * element rather than a div.
 *
 * @param {string} name container type, e.g. `tip`
 * @returns {{ tag: string, classes: string[], title: { tag: string, classes: string[] } }}
 */
export function containerShape(name) {
  name = CONTAINER_ALIASES[name] ?? name
  if (name === 'details') {
    return {
      tag: 'details',
      classes: ['hint-container', 'details'],
      title: { tag: 'summary', classes: [] },
    }
  }
  return {
    tag: 'div',
    classes: ['hint-container', name],
    title: { tag: 'p', classes: ['hint-container-title'] },
  }
}

/**
 * Title the renderer emits when a container has no info string. Used as
 * placeholder text in the editor.
 *
 * @param {string} name
 * @returns {string}
 */
export function containerTitleFallback(name) {
  return name
}

/**
 * Classes on a rendered code fence. These come from the syntax highlighting
 * plugin, not markdown-it, so they are pinned rather than derived. Highlighting
 * runs at build time and is not reproduced in the editor.
 *
 * @param {string} info the fence's info string, e.g. `ts`
 */
export function codeBlockShape(info) {
  const language = (info || 'text').trim().split(/\s+/)[0] || 'text'
  return {
    wrapper: { tag: 'div', classes: [`language-${language}`] },
    pre: { tag: 'pre', classes: ['vp-code'] },
    code: { tag: 'code', classes: [`language-${language}`] },
  }
}

/** Class names the theme selects on, used by the parity test. */
export const THEME_HOOKS = {
  containerClass: 'hint-container',
  containerTitleClass: 'hint-container-title',
  codeWrapperPrefix: 'language-',
  codePreClass: 'vp-code',
}

/**
 * What a raw HTML block produces on the page.
 *
 * `comment`, `style` and `script` render nothing: the page drops comments and
 * hoists styles out of the content. They still round-trip, so the editor shows
 * them as a chip and never as innerHTML.
 *
 * @param {string} src
 * @returns {'comment' | 'style' | 'script' | 'markup'}
 */
export function classifyHtmlBlock(src) {
  const trimmed = src.trim()
  if (trimmed.startsWith('<!--') && trimmed.endsWith('-->')) return 'comment'
  const tag = /^<\s*([a-zA-Z][\w-]*)/.exec(trimmed)?.[1]?.toLowerCase()
  if (tag === 'style' || tag === 'script') return tag
  return 'markup'
}
