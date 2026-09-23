/**
 * Renders a block's markup through Vue.
 *
 * The markup is compiled with Vue's own template compiler and mounted with the
 * app context the site's components were registered in, so the editor runs the
 * same path the page does: directives, bindings and component resolution are
 * Vue's, not a reimplementation.
 *
 * Mounting also gives access to the component instance, whose `props` hold the
 * resolved values. Reading a bound prop means reading what the component
 * actually received rather than interpreting the expression separately.
 */

import * as VueRuntime from 'vue'
import { h, render as vueRender } from 'vue'
import { compile } from '@vue/compiler-dom'

let appContext = null

export function setAppContext(context) {
  appContext = context
}

/** Compiled render functions, keyed by markup. */
const compiled = new Map()

/**
 * Compile markup into a render function.
 *
 * `mode: 'function'` produces the same code Vue's full build generates at
 * runtime, which expects the runtime namespace as its only argument.
 *
 * @param {string} markup
 * @returns {Function | null} null when the markup does not compile
 */
function compileMarkup(markup) {
  if (compiled.has(markup)) return compiled.get(markup)

  let render = null
  try {
    const { code } = compile(markup, { mode: 'function', hoistStatic: false })
    render = new Function('Vue', code)(VueRuntime)
  } catch {
    render = null
  }
  compiled.set(markup, render)
  return render
}

/**
 * Render markup into `el`.
 *
 * @param {HTMLElement} el
 * @param {string} markup
 * @returns {object | null} the mounted vnode, or null when nothing rendered
 */
export function renderMarkup(el, markup) {
  const render = compileMarkup(markup)
  if (!render) return null

  const vnode = h({ render })
  vnode.appContext = appContext

  try {
    vueRender(vnode, el)
  } catch {
    // An expression that needs page scope, or a component that throws on
    // mount. The caller falls back to showing the source.
    unmountMarkup(el)
    return null
  }

  return el.childNodes.length ? vnode : null
}

/** `image-slides` and `ImageSlides` are the same component. */
function sameName(a, b) {
  return String(a).replace(/-/g, '').toLowerCase() === String(b).replace(/-/g, '').toLowerCase()
}

/**
 * The instance of the component the markup names.
 *
 * Several instances sit between the generated render function and the
 * component: the wrapper holding that render function, and the async wrapper
 * VuePress registers its components through. The chain is walked to the one
 * whose name matches the tag, falling back to the first named instance.
 *
 * @param {object | null} vnode
 * @param {string} [tag]
 * @returns {object | null}
 */
export function instanceOf(vnode, tag) {
  let instance = vnode?.component
  let fallback = null
  const seen = new Set()

  while (instance && !seen.has(instance)) {
    seen.add(instance)
    const name = instance.type?.name ?? instance.type?.__name
    if (name && name !== 'AsyncComponentWrapper') {
      if (tag && sameName(name, tag)) return instance
      if (!fallback) fallback = instance
    }
    instance = instance.subTree?.component
  }
  return fallback
}

/**
 * A component's resolved props, as Vue passed them.
 *
 * @param {object | null} vnode
 * @param {string} [tag]
 * @returns {Record<string, unknown>}
 */
export function propsOf(vnode, tag) {
  return instanceOf(vnode, tag)?.props ?? {}
}

/** Tear down anything rendered into `el`. */
export function unmountMarkup(el) {
  try {
    vueRender(null, el)
  } catch {
    // already gone
  }
}
