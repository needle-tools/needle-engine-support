/**
 * Gutter handle and block insert menu. Contents come from the discovered
 * registry, ordered by usage. The handle inserts above the block it is drawn
 * beside, and is clamped below the site header.
 */

import { Plugin, PluginKey, NodeSelection, TextSelection } from 'prosemirror-state'
import { schema } from '../core/schema.mjs'
import { clampBelowHeader } from './viewport.js'

export const blockMenuKey = new PluginKey('live-edit-block-menu')

/** Gap below the site header when clamped. */
const HEADER_GAP = 12

/**
 * How far left of the content the handle stays live before it is drawn.
 *
 * The handle sits in this gutter, which is outside the editable element, so
 * the hover zone has to cover it or moving towards the handle counts as
 * leaving. Once the handle is on screen the zone grows to include its own box,
 * which is what actually makes the gutter safe to cross: a handle drawn
 * further out than this constant still stays reachable.
 */
const GUTTER = 64

/** Empty table: one header row, two body rows. */
function createTable() {
  const cell = (type) => type.create(null, null)
  const row = (type, count) => schema.nodes.table_row.create(null, Array.from({ length: count }, () => cell(type)))
  return schema.nodes.table.create(null, [
    row(schema.nodes.table_header, 2),
    row(schema.nodes.table_cell, 2),
    row(schema.nodes.table_cell, 2),
  ])
}

/** Build the insert options for the current registry. */
function buildOptions(registry) {
  /** @type {Array<{ label: string, hint?: string, create: () => import('prosemirror-model').Node }>} */
  const options = [
    { label: 'Text', create: () => schema.nodes.paragraph.create() },
    ...[1, 2, 3, 4].map((level) => ({
      label: `Heading ${level}`,
      create: () => schema.nodes.heading.create({ level }),
    })),
    {
      label: 'Bullet list',
      create: () =>
        schema.nodes.bullet_list.create(null, schema.nodes.list_item.create(null, schema.nodes.paragraph.create())),
    },
    { label: 'Code block', create: () => schema.nodes.code_block.create({ info: 'ts' }) },
    { label: 'Table', create: createTable },
    { label: 'Divider', create: () => schema.nodes.horizontal_rule.create() },
    { label: 'HTML', create: () => schema.nodes.html.create({ text: '<div></div>' }) },
  ]

  for (const container of registry?.containers ?? []) {
    if (container.usage === 0 && container.source === 'plugin-markdown-tab') continue
    options.push({
      label: `::: ${container.name}`,
      create: () =>
        schema.nodes.container.create(
          { name: container.name, info: '', colons: ':::' },
          schema.nodes.paragraph.create(),
        ),
    })
  }

  for (const component of registry?.components ?? []) {
    if (!component.usage) continue
    options.push({
      label: `<${component.tag}>`,
      create: () => {
        const required = (component.props ?? []).filter((prop) => prop.required)
        return schema.nodes.component.create({
          tag: component.tag,
          attributes: required.map((prop) => ({ name: prop.name, value: '' })),
          selfClosing: true,
        })
      },
    })
  }

  return options
}

/**
 * Plugin providing the gutter handle and insert menu.
 * @param {object} registry
 */
export function blockMenu(registry) {
  const options = buildOptions(registry)

  return new Plugin({
    key: blockMenuKey,

    view(editorView) {
      let hoveredPos = null
      let hoveredDom = null

      const handle = document.createElement('button')
      handle.type = 'button'
      handle.className = 'live-edit-handle'
      handle.title = 'Insert a block above this one'
      handle.textContent = '+'
      handle.contentEditable = 'false'
      handle.hidden = true

      const menu = document.createElement('div')
      menu.className = 'live-edit-menu'
      menu.hidden = true

      const heading = document.createElement('div')
      heading.className = 'live-edit-menu__heading'
      heading.textContent = 'Insert above'

      const filter = document.createElement('input')
      filter.type = 'text'
      filter.className = 'live-edit-menu__filter'
      filter.placeholder = 'Search blocks…'

      const list = document.createElement('div')
      list.className = 'live-edit-menu__list'
      menu.append(heading, filter, list)
      document.body.append(handle, menu)

      const closeMenu = () => {
        menu.hidden = true
        filter.value = ''
      }

      const hide = () => {
        if (menu.hidden) handle.hidden = true
      }

      /** Position the handle beside `hoveredDom`, clamped below the header. */
      const position = () => {
        if (!hoveredDom || !hoveredDom.getBoundingClientRect) return
        const rect = hoveredDom.getBoundingClientRect()
        const top = clampBelowHeader(rect.top, rect.bottom - 28, HEADER_GAP)
        // A table keeps its row controls in the same gutter, so the handle
        // steps further out to avoid sitting on top of them.
        const offset = hoveredDom.classList?.contains('live-edit-table') ? 74 : 34
        handle.style.top = `${window.scrollY + top}px`
        handle.style.left = `${window.scrollX + rect.left - offset}px`
      }

      const insert = (option) => {
        if (hoveredPos == null) return
        const { state } = editorView
        const tr = state.tr.insert(hoveredPos, option.create())
        const inserted = tr.doc.nodeAt(hoveredPos)
        if (inserted && inserted.isTextblock) {
          tr.setSelection(TextSelection.near(tr.doc.resolve(hoveredPos + 1)))
        } else if (inserted) {
          tr.setSelection(NodeSelection.near(tr.doc.resolve(hoveredPos)))
        }
        editorView.dispatch(tr.scrollIntoView())
        closeMenu()
        handle.hidden = true
        editorView.focus()
      }

      const renderList = () => {
        const query = filter.value.trim().toLowerCase()
        list.replaceChildren()
        for (const option of options) {
          if (query && !option.label.toLowerCase().includes(query)) continue
          const row = document.createElement('button')
          row.type = 'button'
          row.className = 'live-edit-menu__item'
          row.textContent = option.label
          row.addEventListener('mousedown', (event) => {
            event.preventDefault()
            insert(option)
          })
          list.append(row)
        }
      }

      handle.addEventListener('mousedown', (event) => {
        event.preventDefault()
        if (!menu.hidden) return closeMenu()
        const rect = handle.getBoundingClientRect()
        menu.hidden = false
        menu.style.top = `${window.scrollY + rect.bottom + 6}px`
        menu.style.left = `${window.scrollX + rect.left}px`
        renderList()
        filter.focus()
      })

      /** The top-level block element under a point, if any. */
      const blockAt = (x, y) => {
        const target = document.elementFromPoint(x, y)
        if (target && editorView.dom.contains(target)) {
          let el = target
          while (el && el.parentElement !== editorView.dom) el = el.parentElement
          if (el && el.parentElement === editorView.dom) return el
        }
        // Between blocks, or over the gutter: fall back to a vertical scan.
        for (const child of editorView.dom.children) {
          const rect = child.getBoundingClientRect()
          if (y >= rect.top && y <= rect.bottom) return child
        }
        return null
      }

      /** Document position just before a block element. */
      const positionBefore = (el) => {
        const inside = editorView.posAtDOM(el, 0)
        const $inside = editorView.state.doc.resolve(inside)
        return $inside.depth > 0 ? $inside.before(1) : inside
      }

      let frame = null
      const onMouseMove = (event) => {
        if (!menu.hidden) return
        if (frame) return
        frame = requestAnimationFrame(() => {
          frame = null

          /*
            The zone is the content plus the handle itself, so the strip
            between them is inside it and the pointer can cross at any speed.
            Taking the handle's real box rather than a fixed offset keeps this
            true for blocks whose handle is drawn further out, such as tables.
          */
          const rect = editorView.dom.getBoundingClientRect()
          const handleRect = handle.hidden ? null : handle.getBoundingClientRect()
          const left = handleRect ? Math.min(rect.left - GUTTER, handleRect.left) : rect.left - GUTTER
          const top = handleRect ? Math.min(rect.top, handleRect.top) : rect.top
          const bottom = handleRect ? Math.max(rect.bottom, handleRect.bottom) : rect.bottom

          const inZone =
            event.clientX >= left && event.clientX <= rect.right && event.clientY >= top && event.clientY <= bottom
          if (!inZone) {
            hide()
            return
          }

          // Over the gutter the pointer is on its way to the handle, so the
          // block it belongs to is left alone.
          if (event.clientX < rect.left) {
            if (hoveredDom) position()
            return
          }

          const block = blockAt(event.clientX, event.clientY)
          if (!block) return

          hoveredDom = block
          hoveredPos = positionBefore(block)
          handle.hidden = false
          position()
        })
      }

      const onDocumentMouseDown = (event) => {
        if (!menu.contains(event.target) && event.target !== handle) closeMenu()
      }

      const onScroll = () => {
        if (!handle.hidden) position()
        if (!menu.hidden) closeMenu()
      }

      // On the document, so the gutter counts as part of the zone.
      document.addEventListener('mousemove', onMouseMove)
      document.addEventListener('mousedown', onDocumentMouseDown)
      window.addEventListener('scroll', onScroll, { passive: true })
      window.addEventListener('resize', onScroll)

      return {
        destroy() {
          if (frame) cancelAnimationFrame(frame)
          document.removeEventListener('mousemove', onMouseMove)
          document.removeEventListener('mousedown', onDocumentMouseDown)
          window.removeEventListener('scroll', onScroll)
          window.removeEventListener('resize', onScroll)
          handle.remove()
          menu.remove()
        },
      }
    },
  })
}
