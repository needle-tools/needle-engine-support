/**
 * Node views for containers, components, images, code blocks and raw source.
 *
 * Each view writes through a transaction, so form fields and typed text behave
 * the same for undo and autosave.
 */

import { serializeElement } from '../core/markup.mjs'
import { renderMarkup, unmountMarkup, propsOf } from './vue-host.js'
import { blobToDataUrl, uploadAsset } from './api.js'
import { stringifyLiteral, isLiteral, shapeOf } from './js-literal.js'
import {
  containerShape,
  containerTitleFallback,
  codeBlockShape,
  classifyHtmlBlock,
} from '../core/dom-contract.mjs'

/* global __LIVE_EDIT_BASE__ */
const BASE = typeof __LIVE_EDIT_BASE__ === 'string' ? __LIVE_EDIT_BASE__ : '/'

/**
 * Resolve a root-relative markdown path against the site base, for display.
 * The markdown is not changed.
 */
function displaySrc(src) {
  if (!src || BASE === '/') return src
  if (/^(https?:)?\/\//.test(src) || src.startsWith('data:')) return src
  if (!src.startsWith('/')) return src
  if (src.startsWith(BASE)) return src
  return BASE.replace(/\/$/, '') + src
}

/** Replace a node's attributes in one undoable step. */
function setAttrs(view, getPos, attrs) {
  const pos = getPos()
  if (pos == null) return
  const node = view.state.doc.nodeAt(pos)
  if (!node) return

  const next = { ...node.attrs, ...attrs }
  // A node that still equals its original is written back from its original
  // bytes, so dispatching an identical change would reformat for nothing.
  const unchanged = Object.keys(next).every((key) => {
    const before = node.attrs[key]
    const after = next[key]
    if (before === after) return true
    return typeof before === 'object' && typeof after === 'object'
      ? JSON.stringify(before) === JSON.stringify(after)
      : false
  })
  if (unchanged) return

  view.dispatch(view.state.tr.setNodeMarkup(pos, undefined, next))
}

function el(tag, className, text) {
  const node = document.createElement(tag)
  if (className) node.className = className
  if (text != null) node.textContent = text
  return node
}


/**
 * Move a rendered child's vertical margins onto its wrapper.
 *
 * A node view needs one element ProseMirror owns, which puts a wrapper between
 * the content element and the page. The child's margins stay inside that
 * wrapper instead of collapsing out of it, so the block ends up taller than
 * the same content on the rendered page. Reading them off the child and
 * applying them to the wrapper reproduces the page's spacing.
 */
function adoptMargins(wrapper, child) {
  wrapper.style.marginTop = ''
  wrapper.style.marginBottom = ''
  if (!child || child.nodeType !== 1) return

  const style = getComputedStyle(child)
  const top = style.marginTop
  const bottom = style.marginBottom
  if (top === '0px' && bottom === '0px') return

  child.style.marginTop = '0px'
  child.style.marginBottom = '0px'
  wrapper.style.marginTop = top
  wrapper.style.marginBottom = bottom
}

/** A `:::` container, with editable type, title and body. */
export class ContainerView {
  constructor(node, view, getPos, registry) {
    this.node = node
    this.view = view
    this.getPos = getPos
    this.registry = registry

    const shape = containerShape(node.attrs.name)
    this.dom = document.createElement(shape.tag)
    this.dom.className = [...shape.classes, 'live-edit-container'].join(' ')
    // A details element defaults to closed, hiding its body.
    if (shape.tag === 'details') this.dom.open = true

    const header = el('div', 'live-edit-container__header')
    // Keeps the caret out of the chrome.
    header.contentEditable = 'false'

    this.select = document.createElement('select')
    this.select.className = 'live-edit-container__type'
    const known = registry?.containers ?? []
    const names = known.map((container) => container.name)
    if (!names.includes(node.attrs.name)) names.unshift(node.attrs.name)
    for (const name of names) {
      const option = document.createElement('option')
      option.value = name
      option.textContent = name
      this.select.append(option)
    }
    this.select.value = node.attrs.name
    this.select.addEventListener('change', () => setAttrs(view, getPos, { name: this.select.value }))
    header.append(this.select)

    /*
      A direct child, since the theme's icon and spacing rules select it as one.
      Non-editable with an editable span inside, making the span a separate
      editing host rather than part of the document.
    */
    this.title = document.createElement(shape.title.tag)
    this.title.className = [...shape.title.classes, 'live-edit-container__title'].join(' ')
    this.title.contentEditable = 'false'
    this.info = el('span', 'live-edit-container__info')
    this.info.contentEditable = 'true'
    this.info.textContent = node.attrs.info ?? ''
    this.info.dataset.placeholder = containerTitleFallback(node.attrs.name)
    this.info.addEventListener('input', () => setAttrs(view, getPos, { info: this.info.textContent }))
    this.title.append(this.info)

    this.contentDOM = el('div', 'live-edit-container__body')
    // Title first: `<summary>` only acts as the disclosure control as the first
    // child. The header generates no box, so its order does not matter.
    this.dom.append(this.title, header, this.contentDOM)
  }

  update(node) {
    if (node.type !== this.node.type) return false
    // A different tag needs a new element, so let ProseMirror rebuild.
    if (containerShape(node.attrs.name).tag !== containerShape(this.node.attrs.name).tag) return false

    this.node = node
    const shape = containerShape(node.attrs.name)
    this.dom.className = [...shape.classes, 'live-edit-container'].join(' ')
    this.info.dataset.placeholder = containerTitleFallback(node.attrs.name)
    if (this.select.value !== node.attrs.name) this.select.value = node.attrs.name
    if (this.info !== document.activeElement && this.info.textContent !== (node.attrs.info ?? '')) {
      this.info.textContent = node.attrs.info ?? ''
    }
    return true
  }

  stopEvent(event) {
    // Edited directly rather than through the document.
    return event.target === this.select || this.info.contains(event.target)
  }

  ignoreMutation(mutation) {
    // Only the body holds document content; everything else is chrome.
    return !this.contentDOM.contains(mutation.target)
  }
}

/**
 * A site component. Renders the component itself; the attribute form opens on
 * demand. Fields come from declared props, or from observed attributes when
 * there is no `.vue` file.
 */
export class ComponentView {
  constructor(node, view, getPos, registry) {
    this.node = node
    this.view = view
    this.getPos = getPos
    this.registry = registry
    this.editing = false

    this.dom = el('div', 'live-edit-component')
    this.dom.contentEditable = 'false'

    this.preview = el('div', 'live-edit-component__preview')
    this.panel = el('div', 'live-edit-component__panel')
    this.panel.hidden = true

    this.toggle = document.createElement('button')
    this.toggle.type = 'button'
    this.toggle.className = 'live-edit-component__toggle'
    this.toggle.addEventListener('click', () => {
      this.editing = !this.editing
      this.panel.hidden = !this.editing
      this.dom.classList.toggle('is-editing', this.editing)
      if (this.editing) this.renderPanel()
      this.updateToggleLabel()
    })

    this.dom.append(this.preview, this.toggle, this.panel)
    this.renderPreview()
    this.updateToggleLabel()
  }

  definition() {
    return this.registry?.components?.find((component) => component.tag === this.node.attrs.tag)
  }

  updateToggleLabel() {
    this.toggle.textContent = this.editing ? `close ${this.node.attrs.tag}` : `\u2699 ${this.node.attrs.tag}`
  }

  /** Render the component, falling back to a source summary if unresolvable. */
  renderPreview() {
    unmountMarkup(this.preview)
    this.preview.replaceChildren()

    // The markup rendered is the markup that will be written, so the preview
    // and the file cannot disagree.
    this.vnode = renderMarkup(this.preview, serializeElement(this.node.attrs))
    if (this.vnode) {
      this.dom.classList.remove('is-unrendered')
      adoptMargins(this.dom, this.preview.firstElementChild)
      return
    }

    this.dom.classList.add('is-unrendered')
    const summary = el('code', 'live-edit-component__summary')
    const attrs = (this.node.attrs.attributes ?? [])
      .map(({ name, value }) => (value === true ? name : `${name}="${value}"`))
      .join(' ')
    summary.textContent = `<${this.node.attrs.tag}${attrs ? ' ' + attrs : ''}>`
    this.preview.append(summary)
  }

  /** Declared props first, then observed attributes. */
  fields() {
    const definition = this.definition()
    const seen = new Map()
    for (const attribute of this.node.attrs.attributes ?? []) seen.set(attribute.name, attribute.value)

    /** @type {Array<{ name: string, value: string | true | undefined, hint?: string, known: boolean }>} */
    const fields = []
    const push = (name, hint, known) => {
      if (fields.some((field) => field.name === name)) return
      fields.push({ name, value: seen.get(name), hint, known })
    }

    for (const prop of definition?.props ?? []) {
      const hint = [prop.type, prop.required ? 'required' : null, prop.description].filter(Boolean).join(' \u00b7 ')
      // A bound prop replaces the plain one rather than sitting beside it.
      if (seen.has(`:${prop.name}`) && !seen.has(prop.name)) {
        push(`:${prop.name}`, `${hint} \u00b7 bound`, true)
        continue
      }
      push(prop.name, hint, true)
      if (seen.has(`:${prop.name}`)) push(`:${prop.name}`, `${hint} \u00b7 bound`, true)
    }
    for (const attribute of definition?.attrsSeen ?? []) push(attribute.name, undefined, false)
    for (const name of seen.keys()) push(name, undefined, false)

    return fields
  }

  /**
   * Collect the form back into the node's attribute list.
   *
   * Only the fields the form renders are taken from it. A field shown as a
   * list editor has no row here, and rebuilding from rows alone would drop it.
   * Attribute order is preserved.
   */
  commit() {
    const fromForm = new Map()
    for (const row of this.panel.querySelectorAll('[data-attr]')) {
      const input = row.querySelector('input[type="text"]')
      const toggle = row.querySelector('input[type="checkbox"]')
      const declared = this.definition()?.props?.find((prop) => prop.name === row.dataset.attr)
      const bare = input.disabled || (declared?.type === 'boolean' && input.value === '')
      fromForm.set(row.dataset.attr, toggle.checked ? { value: bare ? true : input.value } : null)
    }

    const attributes = []
    for (const attribute of this.node.attrs.attributes ?? []) {
      if (!fromForm.has(attribute.name)) {
        attributes.push(attribute)
        continue
      }
      const edited = fromForm.get(attribute.name)
      if (edited) attributes.push({ name: attribute.name, value: edited.value })
    }
    // Fields switched on that the element did not have yet.
    for (const [name, edited] of fromForm) {
      if (!edited) continue
      if (attributes.some((attribute) => attribute.name === name)) continue
      attributes.push({ name, value: edited.value })
    }

    this.applying = true
    setAttrs(this.view, this.getPos, { attributes })
    this.applying = false
  }

  /**
   * A bound prop holding a literal array, as an editable list.
   *
   * The element shape is taken from the current value: Vue declares the prop's
   * type but not what its entries look like. Entries that are plain strings
   * stay strings unless another field is filled in.
   *
   * @returns {HTMLElement | null} null when the value is not an editable list
   */
  listEditor(field) {
    if (!field.name.startsWith(':') || field.value === true || field.value === undefined) return null

    // Taken from the mounted component, so it is the value Vue resolved rather
    // than a second reading of the expression.
    const value = propsOf(this.vnode, this.node.attrs.tag)[field.name.slice(1)]
    if (!Array.isArray(value) || !isLiteral(value)) return null

    const keys = shapeOf(value)
    if (keys.length === 0) return null

    const entries = value.map((entry) => (typeof entry === 'string' ? { src: entry, $string: true } : { ...entry }))

    const original = JSON.stringify(value)
    const commit = () => {
      const next = entries.map((entry) => {
        const { $string, ...rest } = entry
        const filled = Object.fromEntries(Object.entries(rest).filter(([, v]) => v !== '' && v !== undefined))
        // A string entry only stays one while `src` is all it has.
        if ($string && Object.keys(filled).length <= 1) return filled.src ?? ''
        return filled
      })
      // Reserialising produces different whitespace, so an expression whose
      // data is unchanged is left exactly as it was written.
      if (JSON.stringify(next) === original) return

      const attributes = (this.node.attrs.attributes ?? []).map((attribute) =>
        attribute.name === field.name ? { ...attribute, value: stringifyLiteral(next) } : attribute,
      )
      setAttrs(this.view, this.getPos, { attributes })
    }

    const wrap = el('div', 'live-edit-list')
    const rows = el('div', 'live-edit-list__rows')

    let dragFrom = null
    const draw = () => {
      rows.replaceChildren()
      entries.forEach((entry, index) => {
        const row = el('div', 'live-edit-list__row')
        row.draggable = true

        row.addEventListener('dragstart', (event) => {
          dragFrom = index
          row.classList.add('is-dragging')
          event.dataTransfer.effectAllowed = 'move'
          // Firefox needs data set for a drag to start at all.
          event.dataTransfer.setData('text/plain', String(index))
        })
        row.addEventListener('dragend', () => row.classList.remove('is-dragging'))
        row.addEventListener('dragover', (event) => {
          event.preventDefault()
          row.classList.add('is-over')
        })
        row.addEventListener('dragleave', () => row.classList.remove('is-over'))
        row.addEventListener('drop', (event) => {
          event.preventDefault()
          row.classList.remove('is-over')
          if (dragFrom == null || dragFrom === index) return
          entries.splice(index, 0, entries.splice(dragFrom, 1)[0])
          dragFrom = null
          draw()
          commit()
        })

        row.append(el('span', 'live-edit-list__grip', '\u283f'))

        // A preview for whichever field holds an image path.
        const previewKey = keys.find((key) => /^(src|image|thumbnail|poster)$/i.test(key))
        let thumb = null
        if (previewKey) {
          thumb = el('span', 'live-edit-list__thumb')
          const preview = document.createElement('img')
          preview.alt = ''
          preview.loading = 'lazy'
          preview.addEventListener('error', () => thumb.classList.add('is-missing'))
          preview.addEventListener('load', () => thumb.classList.remove('is-missing'))
          preview.src = displaySrc(entry[previewKey] ?? '')
          thumb.append(preview)
          row.append(thumb)
        }

        const body = el('div', 'live-edit-list__fields')
        for (const key of keys) {
          const label = el('label', 'live-edit-list__field')
          label.append(el('span', 'live-edit-list__key', key))
          const input = document.createElement('input')
          input.type = 'text'
          input.value = entry[key] ?? ''
          input.addEventListener('input', () => {
            entry[key] = input.value
            if (thumb && key === previewKey) thumb.firstElementChild.src = displaySrc(input.value)
            commit()
          })
          label.append(input)
          body.append(label)
        }
        row.append(body)

        const remove = document.createElement('button')
        remove.type = 'button'
        remove.className = 'live-edit-list__remove'
        remove.title = 'Remove entry'
        remove.textContent = '\u2715'
        remove.addEventListener('click', () => {
          entries.splice(index, 1)
          draw()
          commit()
        })
        row.append(remove)

        rows.append(row)
      })
    }
    draw()

    const add = document.createElement('button')
    add.type = 'button'
    add.className = 'live-edit-list__add'
    add.textContent = '+ Add entry'
    add.addEventListener('click', () => {
      entries.push(Object.fromEntries(keys.map((key) => [key, ''])))
      draw()
      commit()
    })

    const source = document.createElement('button')
    source.type = 'button'
    source.className = 'live-edit-list__source'
    source.textContent = 'Edit source'
    const raw = document.createElement('textarea')
    raw.hidden = true
    raw.spellcheck = false
    raw.value = field.value
    raw.addEventListener('input', () => {
      const attributes = (this.node.attrs.attributes ?? []).map((attribute) =>
        attribute.name === field.name ? { ...attribute, value: raw.value } : attribute,
      )
      setAttrs(this.view, this.getPos, { attributes })
    })
    source.addEventListener('click', () => {
      raw.hidden = !raw.hidden
      rows.hidden = !raw.hidden
      add.hidden = !raw.hidden
    })

    const actions = el('div', 'live-edit-list__actions')
    actions.append(add, source)
    wrap.append(rows, raw, actions)
    return wrap
  }

  renderPanel() {
    this.panel.replaceChildren()

    const definition = this.definition()
    const header = el('div', 'live-edit-component__header')
    header.append(el('span', 'live-edit-component__tag', `<${this.node.attrs.tag}>`))
    header.append(
      el(
        'span',
        'live-edit-component__source',
        definition?.file ? definition.file : definition ? `discovered \u00b7 used ${definition.usage}\u00d7` : 'unknown component',
      ),
    )
    this.panel.append(header)

    const form = el('div', 'live-edit-component__form')
    for (const field of this.fields()) {
      const list = this.listEditor(field)
      if (list) {
        const block = el('div', 'live-edit-component__list')
        block.append(el('span', 'live-edit-component__name', field.name))
        if (field.hint) block.append(el('span', 'live-edit-component__hint', field.hint))
        block.append(list)
        form.append(block)
        continue
      }

      const row = el('label', 'live-edit-component__row')
      row.dataset.attr = field.name

      const toggle = document.createElement('input')
      toggle.type = 'checkbox'
      toggle.checked = field.value !== undefined
      toggle.addEventListener('change', () => {
        input.disabled = !toggle.checked || field.value === true
        this.commit()
      })

      const name = el('span', 'live-edit-component__name', field.name)
      if (!field.known) name.classList.add('is-extra')

      const input = document.createElement('input')
      input.type = 'text'
      input.value = field.value === true ? '' : (field.value ?? '')
      input.placeholder = field.value === true ? '(no value)' : ''
      input.disabled = field.value === true
      input.addEventListener('input', () => this.commit())

      row.append(toggle, name, input)
      if (field.hint) row.append(el('span', 'live-edit-component__hint', field.hint))
      form.append(row)
    }
    this.panel.append(form)

    if (this.node.attrs.inner) {
      const inner = el('div', 'live-edit-component__inner')
      const area = document.createElement('textarea')
      area.value = this.node.attrs.inner
      area.rows = Math.min(8, this.node.attrs.inner.split('\n').length + 1)
      area.addEventListener('input', () => setAttrs(this.view, this.getPos, { inner: area.value }))
      inner.append(el('span', 'live-edit-component__label', 'contents'), area)
      this.panel.append(inner)
    }
  }

  update(node) {
    if (node.type !== this.node.type) return false
    const changed =
      node.attrs.tag !== this.node.attrs.tag ||
      JSON.stringify(node.attrs.attributes) !== JSON.stringify(this.node.attrs.attributes) ||
      node.attrs.inner !== this.node.attrs.inner
    this.node = node
    if (!changed) return true

    this.renderPreview()
    this.updateToggleLabel()
    /*
      Rebuilding the form replaces its controls. Doing that in response to an
      edit made in the form leaves the caller holding detached elements, so it
      only happens for changes from elsewhere, such as undo.
    */
    const ours = this.applying || this.panel.contains(document.activeElement)
    if (this.editing && !ours) this.renderPanel()
    return true
  }

  stopEvent() {
    return true
  }

  ignoreMutation() {
    return true
  }

  destroy() {
    unmountMarkup(this.preview)
  }
}

/** Fallback for blocks with no richer form: edited as markdown source. */
export class SourceView {
  constructor(node, view, getPos) {
    this.node = node
    this.view = view
    this.getPos = getPos

    this.dom = el('div', `live-edit-source live-edit-source--${node.attrs.kind}`)
    this.dom.contentEditable = 'false'

    this.dom.append(el('span', 'live-edit-source__label', node.attrs.kind))

    this.area = document.createElement('textarea')
    this.area.value = node.attrs.text ?? ''
    this.area.spellcheck = false
    this.autosize()
    this.area.addEventListener('input', () => {
      this.autosize()
      setAttrs(view, getPos, { text: this.area.value })
    })
    this.dom.append(this.area)
  }

  autosize() {
    this.area.rows = Math.min(24, (this.area.value.match(/\n/g)?.length ?? 0) + 2)
  }

  update(node) {
    if (node.type !== this.node.type) return false
    this.node = node
    if (this.area !== document.activeElement && this.area.value !== (node.attrs.text ?? '')) {
      this.area.value = node.attrs.text ?? ''
      this.autosize()
    }
    return true
  }

  stopEvent() {
    return true
  }

  ignoreMutation() {
    return true
  }
}

/** A fenced code block, with its language info string editable. */
export class CodeBlockView {
  constructor(node, view, getPos) {
    this.node = node
    this.view = view
    this.getPos = getPos

    const shape = codeBlockShape(node.attrs.info)
    this.dom = document.createElement(shape.wrapper.tag)
    this.dom.className = [...shape.wrapper.classes, 'live-edit-code'].join(' ')

    const header = el('div', 'live-edit-code__header')
    header.contentEditable = 'false'
    this.info = document.createElement('input')
    this.info.type = 'text'
    this.info.className = 'live-edit-code__info'
    this.info.placeholder = 'language'
    this.info.value = node.attrs.info ?? ''
    this.info.addEventListener('input', () => setAttrs(view, getPos, { info: this.info.value }))
    header.append(this.info)

    this.pre = document.createElement(shape.pre.tag)
    this.pre.className = shape.pre.classes.join(' ')
    this.contentDOM = document.createElement(shape.code.tag)
    this.contentDOM.className = shape.code.classes.join(' ')
    this.pre.append(this.contentDOM)

    this.dom.append(header, this.pre)
  }

  update(node) {
    if (node.type !== this.node.type) return false
    this.node = node
    const shape = codeBlockShape(node.attrs.info)
    this.dom.className = [...shape.wrapper.classes, 'live-edit-code'].join(' ')
    this.contentDOM.className = shape.code.classes.join(' ')
    if (this.info !== document.activeElement && this.info.value !== (node.attrs.info ?? '')) {
      this.info.value = node.attrs.info ?? ''
    }
    return true
  }

  stopEvent(event) {
    return event.target === this.info
  }
}

/**
 * An image, with alt text and scale.
 *
 * Scale lives in the markdown `title`, this site's convention -
 * `"2x"` becomes a `srcset` at render time. Detection is a guess made from the
 * display and the bitmap, so it is shown rather than hidden, and overriding it
 * is one click.
 */
export class ImageView {
  constructor(node, view, getPos, context) {
    this.node = node
    this.view = view
    this.getPos = getPos
    this.context = context ?? {}

    this.dom = el('span', 'live-edit-image')
    this.dom.contentEditable = 'false'

    this.img = document.createElement('img')
    this.img.addEventListener('load', () => this.applyScale())

    /*
      Two elements: the panel is the hover area and starts at the image's
      bottom edge, the card is what you see. The gap between image and card is
      the panel's padding, so it is part of the hover area and the pointer
      never crosses dead space on its way down.
    */
    this.panel = el('span', 'live-edit-image__panel')
    this.card = el('span', 'live-edit-image__card')
    this.panel.append(this.card)

    this.alt = this.field('alt', 'describe this image\u2026', (value) =>
      setAttrs(this.view, this.getPos, { alt: value }),
    )

    this.src = this.field('src', '/imgs/example.webp', (value) =>
      setAttrs(this.view, this.getPos, { src: value }),
    )

    this.replace = this.button('Replace\u2026', 'Pick a file to put in its place', () => this.picker.click())
    this.src.row.append(this.replace)

    const controls = el('span', 'live-edit-image__controls')

    this.scale = document.createElement('select')
    this.scale.className = 'live-edit-image__scale'
    this.scale.title = 'How many image pixels per rendered pixel'
    for (const [value, label] of [['', '1x'], ['1.5x', '1.5x'], ['2x', '2x']]) {
      const option = document.createElement('option')
      option.value = value
      option.textContent = label
      this.scale.append(option)
    }
    this.scale.addEventListener('change', () => setAttrs(this.view, this.getPos, { title: this.scale.value || null }))

    this.more = this.button('html', 'Attributes markdown cannot express', () => this.toggleExtras())
    this.more.classList.add('live-edit-image__more')

    this.remove = this.button('\u2715', 'Remove this image', () => this.removeImage())
    this.remove.classList.add('is-danger')

    this.close = this.button('done', 'Close this panel (Esc)', () => this.setPinned(false))
    this.close.classList.add('live-edit-image__close')
    this.close.hidden = true

    this.size = el('span', 'live-edit-image__size')
    controls.append(this.scale, this.more, this.remove, this.close, this.size)

    this.extras = el('span', 'live-edit-image__extras')
    this.extras.hidden = true
    this.draft = null
    this.committed = null

    this.card.append(this.alt.row, this.src.row, controls, this.extras)

    this.picker = document.createElement('input')
    this.picker.type = 'file'
    this.picker.accept = 'image/*'
    this.picker.hidden = true
    this.picker.addEventListener('change', () => {
      const file = this.picker.files?.[0]
      this.picker.value = ''
      if (file) this.upload(file)
    })

    // Dropping a file on the image replaces it, the same as Replace does.
    this.dom.addEventListener('dragover', (event) => {
      if (!this.filesIn(event)) return
      event.preventDefault()
      this.dom.classList.add('is-drop-target')
    })
    this.dom.addEventListener('dragleave', () => this.dom.classList.remove('is-drop-target'))
    this.dom.addEventListener('drop', (event) => {
      const file = this.filesIn(event)
      if (!file) return
      event.preventDefault()
      event.stopPropagation()
      this.dom.classList.remove('is-drop-target')
      this.upload(file)
    })

    /*
      Hovering reveals the panel, but hover is no good for using it: reaching
      a field means scrolling, and scrolling moves the image out from under
      the pointer, which closed the panel mid-edit. Touching the panel pins it
      open, and it then stays until it is explicitly dismissed.
    */
    this.pinned = false
    const pin = () => this.setPinned(true)
    this.panel.addEventListener('pointerdown', pin)
    this.panel.addEventListener('focusin', pin)
    this.panel.addEventListener('keydown', (event) => {
      if (event.key !== 'Escape' || !this.pinned) return
      event.preventDefault()
      event.stopPropagation()
      this.setPinned(false)
      this.view.focus()
    })

    this.onDocumentPointerDown = (event) => {
      if (!this.pinned || this.dom.contains(event.target)) return
      this.setPinned(false)
    }
    document.addEventListener('pointerdown', this.onDocumentPointerDown, true)

    this.dom.append(this.img, this.panel, this.picker)
    this.sync()
  }

  /** Hold the panel open regardless of where the pointer is. */
  setPinned(pinned) {
    this.pinned = pinned
    this.dom.classList.toggle('is-pinned', pinned)
    this.close.hidden = !pinned
  }

  /** A labelled text row. */
  field(label, placeholder, onInput) {
    const row = el('span', 'live-edit-image__row')
    row.append(el('span', 'live-edit-image__label', label))
    const input = document.createElement('input')
    input.type = 'text'
    input.placeholder = placeholder
    input.addEventListener('input', () => onInput(input.value))
    row.append(input)
    return { row, input }
  }

  button(label, title, onClick) {
    const button = document.createElement('button')
    button.type = 'button'
    button.title = title
    button.textContent = label
    button.addEventListener('click', onClick)
    return button
  }

  /** The first image file in a drag event, if any. */
  filesIn(event) {
    const items = [...(event.dataTransfer?.items ?? [])]
    return items.find((item) => item.kind === 'file' && item.type.startsWith('image/'))?.getAsFile() ?? null
  }

  /**
   * Show the image at the size the page will show it.
   *
   * A 2x asset is twice the pixels of its rendered box, so without this the
   * scale control has no visible effect and looks broken.
   */
  applyScale() {
    const factor = parseFloat(this.node.attrs.title) || 1
    const width = this.img.naturalWidth
    this.img.style.width = width ? `${Math.round(width / factor)}px` : ''
    this.size.textContent = width ? `${width}\u00d7${this.img.naturalHeight}` : ''
  }

  /** Upload a replacement and point this image at it. */
  async upload(file) {
    const { route, onStatus } = this.context
    try {
      onStatus?.({ kind: 'busy', message: `uploading ${file.name || 'image'}\u2026` })
      const data = await blobToDataUrl(file)
      const result = await uploadAsset({
        route,
        data,
        alt: this.node.attrs.alt ?? '',
        name: file.name ? file.name.replace(/\.[^.]+$/, '') : '',
        devicePixelRatio: window.devicePixelRatio || 1,
      })
      const title = result.density === 2 ? '2x' : result.density === 1.5 ? '1.5x' : null
      setAttrs(this.view, this.getPos, { src: result.src, title })
      onStatus?.({ kind: 'ok', message: `${result.file} \u00b7 ${result.width}\u00d7${result.height} \u00b7 ${result.density}x (${result.reason})` })
    } catch (error) {
      onStatus?.({ kind: 'error', message: `replace failed: ${error.message}` })
    }
  }

  removeImage() {
    const pos = this.getPos()
    if (pos == null) return
    this.view.dispatch(this.view.state.tr.delete(pos, pos + this.node.nodeSize))
    this.view.focus()
  }

  /**
   * Open or close the attribute editor.
   *
   * Opening copies the node's attributes into `draft`. While the pane is open
   * the draft is what the rows are built from, so a row whose name is still
   * empty survives a re-render; only named attributes are written to the node.
   */
  toggleExtras(open = this.extras.hidden) {
    this.extras.hidden = !open
    this.more.classList.toggle('is-open', open)
    this.more.setAttribute('aria-pressed', String(open))
    if (!open) {
      this.draft = null
      this.committed = null
      return
    }
    this.draft = (this.node.attrs.attributes ?? []).map((attribute) => ({ ...attribute }))
    this.committed = this.draft.map((attribute) => ({ ...attribute }))
    this.renderExtras()
  }

  /** Name and value rows for attributes markdown cannot express. */
  renderExtras() {
    this.extras.replaceChildren()
    const attributes = this.draft ?? []

    const commit = () => {
      const named = attributes.filter((attribute) => attribute.name.trim() !== '')
      this.committed = named.map((attribute) => ({ ...attribute }))
      setAttrs(this.view, this.getPos, { attributes: named })
    }

    attributes.forEach((attribute, index) => {
      const row = el('span', 'live-edit-image__attr')

      const name = document.createElement('input')
      name.type = 'text'
      name.value = attribute.name
      name.placeholder = 'name'
      name.addEventListener('input', () => {
        attribute.name = name.value
        commit()
      })

      const value = document.createElement('input')
      value.type = 'text'
      value.value = attribute.value === true ? '' : attribute.value
      value.placeholder = 'value'
      value.addEventListener('input', () => {
        attribute.value = value.value
        commit()
      })

      const drop = this.button('\u2715', 'Remove attribute', () => {
        attributes.splice(index, 1)
        commit()
        this.renderExtras()
      })

      row.append(name, value, drop)
      this.extras.append(row)
    })

    const add = this.button('+ Add attribute', 'Add an HTML attribute', () => {
      attributes.push({ name: '', value: '' })
      this.renderExtras()
      // Put the caret in the new row, so it can be typed into right away.
      const rows = this.extras.querySelectorAll('.live-edit-image__attr input')
      rows[(attributes.length - 1) * 2]?.focus()
    })
    add.className = 'live-edit-image__add'

    this.note = el('span', 'live-edit-image__note', this.outputNote())
    this.extras.append(add, this.note)
  }

  outputNote() {
    return (this.node.attrs.attributes?.length ?? 0) > 0 ? 'saved as an <img> tag' : 'saved as markdown'
  }

  /** Push node state into the controls. */
  sync() {
    const { src, alt, title, attributes } = this.node.attrs

    const wanted = displaySrc(src)
    if (this.img.getAttribute('src') !== wanted) this.img.src = wanted
    this.img.alt = alt ?? ''

    if (this.alt.input !== document.activeElement) this.alt.input.value = alt ?? ''
    if (this.src.input !== document.activeElement) this.src.input.value = src ?? ''
    if (this.scale !== document.activeElement) this.scale.value = title ?? ''

    const count = attributes?.length ?? 0
    this.more.textContent = count ? `html \u00b7 ${count}` : 'html'
    this.dom.classList.toggle('is-html', count > 0)
    if (this.note) this.note.textContent = this.outputNote()
    this.applyScale()
  }

  update(node) {
    if (node.type !== this.node.type) return false
    this.node = node
    this.sync()
    /*
      The draft owns the rows while the pane is open, so it is only reseeded
      when the node's attributes changed somewhere else, such as an undo.
    */
    if (!this.extras.hidden && !this.extras.contains(document.activeElement)) {
      const current = JSON.stringify(node.attrs.attributes ?? [])
      if (current !== JSON.stringify(this.committed ?? [])) this.toggleExtras(true)
    }
    return true
  }

  stopEvent(event) {
    return this.dom.contains(event.target)
  }

  ignoreMutation() {
    return true
  }

  destroy() {
    document.removeEventListener('pointerdown', this.onDocumentPointerDown, true)
  }
}

export class HtmlView {
  constructor(node, view, getPos) {
    this.node = node
    this.view = view
    this.getPos = getPos
    this.editing = false

    this.dom = el('div', 'live-edit-html')
    this.dom.contentEditable = 'false'

    this.preview = el('div', 'live-edit-html__preview')

    this.toggle = document.createElement('button')
    this.toggle.type = 'button'
    this.toggle.className = 'live-edit-html__toggle'
    this.toggle.textContent = '\u2699 html'
    this.toggle.addEventListener('click', () => {
      this.editing = !this.editing
      this.area.hidden = !this.editing
      this.dom.classList.toggle('is-editing', this.editing)
      if (this.editing) this.area.focus()
    })

    this.area = document.createElement('textarea')
    this.area.hidden = true
    this.area.spellcheck = false
    this.area.value = node.attrs.text ?? ''
    this.autosize()
    this.area.addEventListener('input', () => {
      this.autosize()
      setAttrs(view, getPos, { text: this.area.value })
    })

    this.dom.append(this.preview, this.toggle, this.area)
    this.renderPreview()
  }

  autosize() {
    this.area.rows = Math.min(20, (this.area.value.match(/\n/g)?.length ?? 0) + 2)
  }

  /**
   * Blocks that render nothing on the page get a chip instead of a preview,
   * and are never written as innerHTML. Root-relative paths in real markup
   * need the site base to resolve, as with images.
   */
  renderPreview() {
    const kind = classifyHtmlBlock(this.node.attrs.text ?? '')
    this.dom.classList.toggle('is-invisible', kind !== 'markup')

    if (kind !== 'markup') {
      this.preview.replaceChildren(el('span', 'live-edit-html__chip', kind))
      return
    }

    const html = (this.node.attrs.text ?? '').replace(
      /(\s(?:src|href|poster)=")(\/[^"]*)"/g,
      (_, prefix, path) => `${prefix}${displaySrc(path)}"`,
    )
    this.preview.innerHTML = html
    adoptMargins(this.dom, this.preview.firstElementChild)
  }

  update(node) {
    if (node.type !== this.node.type) return false
    const changed = node.attrs.text !== this.node.attrs.text
    this.node = node
    if (!changed) return true
    this.renderPreview()
    if (this.area !== document.activeElement) {
      this.area.value = node.attrs.text ?? ''
      this.autosize()
    }
    return true
  }

  stopEvent() {
    return true
  }

  ignoreMutation() {
    return true
  }
}

/** Inline markup inside a paragraph, such as `<img class="inline-logo" …>`. */
export class HtmlInlineView {
  constructor(node) {
    this.node = node
    this.dom = el('span', 'live-edit-html-inline')
    this.dom.contentEditable = 'false'
    this.render()
  }

  render() {
    const html = (this.node.attrs.text ?? '').replace(
      /(\s(?:src|href|poster)=")(\/[^"]*)"/g,
      (_, prefix, path) => `${prefix}${displaySrc(path)}"`,
    )
    this.dom.innerHTML = html
    this.dom.title = this.node.attrs.text ?? ''
  }

  update(node) {
    if (node.type !== this.node.type) return false
    if (node.attrs.text !== this.node.attrs.text) {
      this.node = node
      this.render()
    }
    return true
  }

  ignoreMutation() {
    return true
  }
}

/** A table. Controls live in the table-tools plugin, near the selected cell. */
export class TableView {
  constructor(node) {
    this.node = node
    this.dom = document.createElement('div')
    this.dom.className = 'live-edit-table'
    this.table = document.createElement('table')
    this.contentDOM = document.createElement('tbody')
    this.table.append(this.contentDOM)
    this.dom.append(this.table)
  }

  update(node) {
    if (node.type !== this.node.type) return false
    this.node = node
    return true
  }
}

/**
 * Build the node view map for an editor.
 * @param {object} registry
 * @param {{ route?: string, onStatus?: Function }} [context]
 */
export function createNodeViews(registry, context) {
  return {
    container: (node, view, getPos) => new ContainerView(node, view, getPos, registry),
    component: (node, view, getPos) => new ComponentView(node, view, getPos, registry),
    source: (node, view, getPos) => new SourceView(node, view, getPos),
    html: (node, view, getPos) => new HtmlView(node, view, getPos),
    table: (node) => new TableView(node),
    code_block: (node, view, getPos) => new CodeBlockView(node, view, getPos),
    image: (node, view, getPos) => new ImageView(node, view, getPos, context),
    html_inline: (node) => new HtmlInlineView(node),
  }
}
