/**
 * The ProseMirror schema.
 *
 * Beyond the usual prose set:
 *
 *   container   a `:::` block, with editable content and nesting.
 *   component   a site component, edited as a form built from the registry.
 *   html        a raw markup block, rendered as written.
 *   source      fallback for frontmatter and anything unrecognized.
 *
 * Tables come from prosemirror-tables, with per-column alignment.
 *
 * Block nodes carry origin attributes; the serializer uses them to re-emit an
 * unchanged block's original bytes.
 */

import { Schema } from 'prosemirror-model'
import { tableNodes } from 'prosemirror-tables'

/**
 * Markdown tables are a regular grid with per-column alignment and no spans,
 * so `align` is the only cell attribute carried.
 */
const TABLE_NODES = tableNodes({
  tableGroup: 'block',
  cellContent: 'inline*',
  cellAttributes: {
    align: {
      default: null,
      getFromDOM: (dom) => dom.style.textAlign || null,
      setDOMAttr: (value, attrs) => {
        if (value) attrs.style = `text-align: ${value}`
      },
    },
  },
})

/**
 * Origin bookkeeping on every block node. `oSrc` is the node's source, `oTrail`
 * the blank lines that followed it.
 */
const ORIGIN_ATTRS = {
  oSrc: { default: null },
  oTrail: { default: '' },
  oKey: { default: null },
}

/** Attrs spec helper: origin attrs plus whatever the node adds. */
function withOrigin(attrs = {}) {
  return { ...ORIGIN_ATTRS, ...attrs }
}

export const schema = new Schema({
  nodes: {
    doc: { content: 'block+' },

    paragraph: {
      content: 'inline*',
      group: 'block',
      attrs: withOrigin(),
      parseDOM: [{ tag: 'p' }],
      toDOM: () => ['p', 0],
    },

    heading: {
      content: 'inline*',
      group: 'block',
      defining: true,
      attrs: withOrigin({ level: { default: 1 } }),
      parseDOM: [1, 2, 3, 4, 5, 6].map((level) => ({ tag: `h${level}`, attrs: { level } })),
      toDOM: (node) => [`h${node.attrs.level}`, 0],
    },

    blockquote: {
      content: 'block+',
      group: 'block',
      defining: true,
      attrs: withOrigin(),
      parseDOM: [{ tag: 'blockquote' }],
      toDOM: () => ['blockquote', 0],
    },

    horizontal_rule: {
      group: 'block',
      attrs: withOrigin(),
      parseDOM: [{ tag: 'hr' }],
      toDOM: () => ['hr'],
    },

    code_block: {
      content: 'text*',
      marks: '',
      group: 'block',
      code: true,
      defining: true,
      attrs: withOrigin({ info: { default: '' }, marker: { default: '```' }, indent: { default: '' } }),
      parseDOM: [{ tag: 'pre', preserveWhitespace: 'full' }],
      toDOM: (node) => ['pre', { 'data-info': node.attrs.info }, ['code', 0]],
    },

    ordered_list: {
      content: 'list_item+',
      group: 'block',
      attrs: withOrigin({ order: { default: 1 }, tight: { default: true } }),
      parseDOM: [{ tag: 'ol' }],
      toDOM: (node) => [
        'ol',
        { start: node.attrs.order === 1 ? null : node.attrs.order, ...(node.attrs.tight ? { 'data-tight': '' } : {}) },
        0,
      ],
    },

    bullet_list: {
      content: 'list_item+',
      group: 'block',
      /**
       * `tight` mirrors markdown's tight/loose distinction. It drives both the
       * spacing between items and whether they are separated by blank lines
       * when serialized.
       */
      attrs: withOrigin({ bullet: { default: '-' }, tight: { default: true } }),
      parseDOM: [{ tag: 'ul' }],
      toDOM: (node) => ['ul', node.attrs.tight ? { 'data-tight': '' } : {}, 0],
    },

    list_item: {
      content: 'block+',
      defining: true,
      attrs: { checked: { default: null } },
      parseDOM: [{ tag: 'li' }],
      toDOM: () => ['li', 0],
    },

    container: {
      content: 'block+',
      group: 'block',
      defining: true,
      attrs: withOrigin({
        name: { default: 'tip' },
        info: { default: '' },
        indent: { default: '' },
        colons: { default: ':::' },
        /**
         * The opening fence as written. Both `::: tip` and `:::tip` are in use,
         * so a body edit must re-emit the header verbatim.
         */
        openFence: { default: null },
        /**
         * The closing fence as written, or `''` when unterminated. `null` means
         * the editor created this container and needs one generated.
         */
        closeFence: { default: null },
      }),
      parseDOM: [{ tag: 'div[data-container]' }],
      toDOM: (node) => ['div', { 'data-container': node.attrs.name, class: `custom-container ${node.attrs.name}` }, 0],
    },

    component: {
      group: 'block',
      atom: true,
      defining: true,
      attrs: withOrigin({
        tag: { default: 'div' },
        /**
         * Ordered `{ name, value }` pairs as written. `value === true` is a
         * bare attribute such as `camera-controls`.
         */
        attributes: { default: [] },
        selfClosing: { default: true },
        /** Raw inner markup for components used with children. */
        inner: { default: '' },
      }),
      parseDOM: [{ tag: 'div[data-component]' }],
      toDOM: (node) => ['div', { 'data-component': node.attrs.tag }],
    },

    html: {
      group: 'block',
      atom: true,
      defining: true,
      /** Raw markup, rendered as-is and edited as source on demand. */
      attrs: withOrigin({ text: { default: '' } }),
      parseDOM: [{ tag: 'div[data-html]' }],
      toDOM: () => ['div', { 'data-html': '' }],
    },

    source: {
      group: 'block',
      atom: true,
      defining: true,
      attrs: withOrigin({
        /** For labelling: table, html, raw. */
        kind: { default: 'raw' },
        text: { default: '' },
      }),
      parseDOM: [{ tag: 'div[data-source]' }],
      toDOM: (node) => ['div', { 'data-source': node.attrs.kind }],
    },

    image: {
      inline: true,
      group: 'inline',
      draggable: true,
      attrs: {
        src: {},
        alt: { default: null },
        /** Scale, as this site's `"2x"` convention. */
        title: { default: null },
        /**
         * Attributes markdown cannot express, such as `loading` or `width`.
         * Their presence is what makes the image serialize as an `<img>` tag
         * rather than as markdown.
         */
        attributes: { default: [] },
      },
      parseDOM: [
        {
          tag: 'img[src]',
          getAttrs: (dom) => ({
            src: dom.getAttribute('src'),
            alt: dom.getAttribute('alt'),
            title: dom.getAttribute('title'),
          }),
        },
      ],
      toDOM: (node) => ['img', node.attrs],
    },

    html_inline: {
      inline: true,
      group: 'inline',
      atom: true,
      /** A single tag as written, e.g. `<img class="inline-logo" …>`. */
      attrs: { text: { default: '' } },
      parseDOM: [{ tag: 'span[data-html-inline]' }],
      toDOM: () => ['span', { 'data-html-inline': '' }],
    },

    hard_break: {
      inline: true,
      group: 'inline',
      selectable: false,
      parseDOM: [{ tag: 'br' }],
      toDOM: () => ['br'],
    },

    text: { group: 'inline' },

    ...TABLE_NODES,
    // The table itself is a block, so it carries origin attributes like every
    // other block node; rows and cells do not.
    table: { ...TABLE_NODES.table, attrs: withOrigin(TABLE_NODES.table.attrs) },
  },

  /*
    Declaration order is mark rank, which decides DOM nesting: earlier marks
    render outside later ones. `**[x](y)**` renders as <strong><a>, matching
    markdown-it. That form outnumbers `[**x**](y)` here about five to one, and
    the two are indistinguishable once parsed.
  */
  marks: {
    strong: {
      parseDOM: [{ tag: 'strong' }, { tag: 'b' }],
      toDOM: () => ['strong', 0],
    },
    em: {
      parseDOM: [{ tag: 'i' }, { tag: 'em' }, { style: 'font-style=italic' }],
      toDOM: () => ['em', 0],
    },
    link: {
      attrs: { href: {}, title: { default: null } },
      inclusive: false,
      parseDOM: [
        {
          tag: 'a[href]',
          getAttrs: (dom) => ({ href: dom.getAttribute('href'), title: dom.getAttribute('title') }),
        },
      ],
      toDOM: (node) => ['a', node.attrs, 0],
    },
    code: {
      /*
        Verbatim in its own content, but it can still sit inside emphasis:
        `**Key alias: \`three/addons\`**` is bold code. Excluding other marks
        dropped the strong on load, and the bold was then written back as a
        closing `**` after a space, which CommonMark does not close - so the
        asterisks showed up as text in a paragraph nobody had edited.
      */
      parseDOM: [{ tag: 'code' }],
      toDOM: () => ['code', 0],
    },
  },
})
