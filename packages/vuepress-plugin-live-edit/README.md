# @needle-tools/vuepress-plugin-live-edit

In-page WYSIWYG editing for the docs. Dev server only.

Run `npm run docs:dev`, open a page, press **Edit**. The rendered content is
replaced by an editor in the same element. Autosave writes the markdown and
VuePress hot-reloads. Pasted images are converted to webp, filed, named and
embedded with a detected scale.

`vuepress build` includes none of this. The Vite plugin is `apply: 'serve'` and
the client entry is registered only in dev.

## Setup

```ts
import { liveEditPlugin } from '@needle-tools/vuepress-plugin-live-edit'

export default defineUserConfig({
  plugins: [
    liveEditPlugin({
      componentsDir: path.resolve(__dirname, './components'),
      configFile: path.resolve(__dirname, './config.ts'),
    }),
  ],
})
```

| Option | Default | Meaning |
| --- | --- | --- |
| `docsDir` | VuePress source dir | Markdown root. Nothing outside it is read or written. |
| `publicDir` | `<source>/.vuepress/public` | Where pasted images are written. |
| `componentsDir` | `<source>/.vuepress/components` | Scanned for component props. |
| `configFile` | `<source>/.vuepress/config.ts` | Scanned for container registrations. |
| `contentWidth` | `740` | Rendered column width, used for scale detection. |
| `enabled` | dev only | Force on or off. |

`Cmd/Ctrl+Shift+E` toggles editing. `Cmd/Ctrl+S` saves immediately.

## Editing in the page

The theme styles `#content` and its direct children. The editor takes over that
element's id and ProseMirror uses it as its editable node, so document blocks
are direct children of the content element and inherit its styling.

- Prose, headings, lists and links are edited directly. Tight and loose lists
  keep their spacing.
- `:::` containers use the theme's `hint-container` classes. Type and title are
  editable. The body is ordinary content and nesting works.
- Components render themselves. A block's markup is compiled with Vue's own
  template compiler and mounted with the app context the site registered its
  components in, so directives, bindings and component resolution are Vue's.
  The attribute form opens from a control on the block, built from the
  component's declared props.
- A bound prop holding an array, such as `<image-slides :images="[…]" />`, is
  edited as a list: a field per key, drag to reorder, add and remove entries,
  or switch to the raw expression. Values are read from the mounted
  component's resolved props; the element shape comes from the value, since
  Vue declares a prop's type but not its entries.
- Tables are edited cell by cell. Tab moves between cells and columns resize.
  Column controls sit above the table, aligned to the selected column; row
  controls sit in a vertical strip to its left, aligned to the selected row.
  Both stay outside the table, so neither covers a cell.
- Images edit the same way whether they were written as `![alt](src "2x")` or
  as an `<img>` tag. Hovering one opens a panel with its alt text, its path,
  Replace (a file picker, or drop a file on the image), the scale, the
  attributes markdown cannot express, and a remove button. The output follows
  what is needed: markdown when markdown can express it, an `<img>` tag when it
  cannot. `srcset="<src> 2x"` is read as the same scale markdown spells `"2x"`.
  The preview is drawn at the size the page will use, so a 2x asset shows at
  half its pixel width.
- Other raw HTML blocks render as written, with a toggle for their source.
- Selecting text brings up a toolbar above it: paragraph and heading level,
  bold, italic, inline code, link, bullet and numbered list. Buttons show what
  is active at the selection.
- Hovering a block shows a `+` in the gutter. It inserts above that block and
  is clamped below the site header. The gutter is part of the hover zone and
  the block stops being recomputed there, so moving onto the button neither
  dismisses it nor switches blocks.

Frontmatter is not part of the document. The status bar opens it as a field
list: one row per `key: value`. Nested YAML such as `head:` is shown as-is and
re-emitted verbatim, and an unchanged field keeps its original quoting.

Toggling the editor preserves the scroll position. The block at the top of the
viewport is measured before the swap and scrolled back to afterwards, so the
page does not move under the reader.

## Saving

```
serializeBlocks(parseBlocks(src).blocks) === src     # byte for byte
```

Each block keeps the source it was parsed from. On save, a block equal to its
original is written back as those bytes and only changed blocks are
re-serialized. Editing one word rewrites one line. `:::` fences and multi-line
attributes are not renormalized.

Serialization is always against the source the editor was opened with, not the
current file, because origin keys are positions in that parse. A save is
refused if the file changed on disk.

Tested over every markdown file in the repo: round-trip, no-op save, single
node edits, repeated saves after an insert, frontmatter preservation.

## DOM contract

The editor renders through ProseMirror, the site through markdown-it. They
match by agreement, not by construction.

`src/core/dom-contract.mjs` defines the element and classes each construct
needs. Node views build from it. `test/dom-parity.test.mjs` renders the same
constructs with `@vuepress/plugin-markdown-hint`, the plugin the default theme
installs, and asserts the output matches. A VuePress or theme upgrade that
changes the markup fails the test.

Cases it pins:

- `::: danger` renders with the class `caution`.
- `::: details` renders as `<details>` with a `<summary>`, not a `<div>`.
- Code fences render as `div.language-<lang> > pre.vp-code`.
- An untitled container renders with its type as the title.

The test compares elements and classes, not computed styles. A theme change
that keeps the classes and restyles them still passes.

## Discovery

Containers and components are found from built-ins, declarations
(`markdownContainerPlugin({ type })` calls and `.vue` files) and usage across
the corpus. A component with no `.vue` file gets a form built from the
attributes it is used with. Usage counts order the menus.

The scan walks the parsed block tree, so a tag inside a code fence or code span
counts as content, not usage.

The registry is cached and rebuilt when the config or components directory
changes, and after each save.

## Pasting images

Paste or drop an image anywhere in the editor.

- **Format**: converted to webp. Animations are stored as pasted.
- **Location**: the folder this page's other images use, else a folder matching
  the page path, else `imgs/`.
- **Name**: from the dropped filename, or from the page name for a clipboard
  bitmap. Collisions get a numeric suffix.
- **Scale**: from dpi metadata, then `devicePixelRatio`, then width against the
  content column. A 2x result is written as `![alt](/imgs/x.webp "2x")`, which
  the site's renderer turns into a `srcset`.

The status bar shows the detected scale and which signal produced it. Each
image has an alt field and a 1x/1.5x/2x override.

## Tests

```bash
npm run test:live-edit     # from the repo root
npm test                   # from this package
```
