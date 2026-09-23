/**
 * Discovers which `:::` containers and which components a docs site uses.
 *
 * Three sources, merged:
 *
 *   1. Built-ins from VuePress and its first-party plugins.
 *   2. Declarations: `markdownContainerPlugin({ type })` calls in the host
 *      config, and `.vue` files in the components directory.
 *   3. Usage across the markdown corpus.
 *
 * Usage covers what the others miss, such as a web component with no `.vue`
 * file. Usage counts order the editor's menus.
 *
 * The scan walks the parsed block tree, so a tag inside a code fence or code
 * span counts as content rather than usage.
 */

import { readFileSync, readdirSync, statSync } from 'node:fs'
import path from 'node:path'
import { listMarkdownFiles } from './paths.mjs'
import { parseBlocks, walkBlocks, inlineHtmlFragments } from './blocks.mjs'
import { collectElements } from './vue-template.mjs'
import { parseComponentProps, componentHasSlots } from './component-props.mjs'

export { parseComponentProps, componentHasSlots }

/** Seed list; anything in use is found by the usage scan regardless. */
const BUILTIN_CONTAINERS = [
  { name: 'tip', source: 'builtin', takesInfo: 'title' },
  { name: 'info', source: 'builtin', takesInfo: 'title' },
  { name: 'note', source: 'builtin', takesInfo: 'title' },
  { name: 'warning', source: 'builtin', takesInfo: 'title' },
  { name: 'caution', source: 'builtin', takesInfo: 'title' },
  { name: 'danger', source: 'builtin', takesInfo: 'title' },
  { name: 'important', source: 'builtin', takesInfo: 'title' },
  { name: 'details', source: 'builtin', takesInfo: 'summary' },
  { name: 'tabs', source: 'plugin-markdown-tab', takesInfo: 'id' },
  { name: 'tab', source: 'plugin-markdown-tab', takesInfo: 'label' },
  { name: 'code-tabs', source: 'plugin-markdown-tab', takesInfo: 'id' },
  { name: 'code-group', source: 'builtin', takesInfo: 'id' },
  { name: 'code-group-item', source: 'builtin', takesInfo: 'label' },
]

/** Ordinary markup, not site components. */
const PLAIN_HTML = new Set([
  'a', 'abbr', 'b', 'br', 'code', 'div', 'em', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
  'hr', 'i', 'iframe', 'img', 'li', 'ol', 'p', 'pre', 'span', 's', 'small', 'strong',
  'sub', 'sup', 'table', 'tbody', 'td', 'th', 'thead', 'tr', 'ul', 'video', 'source',
  'picture', 'figure', 'figcaption', 'blockquote', 'details', 'summary', 'kbd', 'u',
  'center', 'style', 'script', 'template', 'main', 'section', 'aside', 'nav', 'header',
  'footer', 'label', 'input', 'button', 'select', 'option', 'form', 'canvas', 'svg',
  'path', 'g', 'circle', 'rect', 'line', 'text', 'dl', 'dt', 'dd',
])

/** kebab-case tag for a component file, matching VuePress registration. */
function tagNameFor(fileName) {
  return path
    .basename(fileName, '.vue')
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .toLowerCase()
}

/**
 * Components declared as `.vue` files in the registered directory.
 * @param {string} componentsDir
 */
function scanComponentFiles(componentsDir) {
  /** @type {Map<string, object>} */
  const out = new Map()
  let entries
  try {
    entries = readdirSync(componentsDir, { withFileTypes: true })
  } catch {
    return out
  }
  for (const entry of entries) {
    if (!entry.isFile() || !entry.name.endsWith('.vue')) continue
    let source = ''
    try {
      source = readFileSync(path.join(componentsDir, entry.name), 'utf8')
    } catch {
      continue
    }
    const tag = tagNameFor(entry.name)
    out.set(tag, {
      tag,
      source: 'component-file',
      file: entry.name,
      props: parseComponentProps(source),
      slots: componentHasSlots(source),
      usage: 0,
      attrsSeen: [],
      acceptsChildren: componentHasSlots(source),
    })
  }
  return out
}

/**
 * Container types registered explicitly in the host's VuePress config.
 * @param {string | null} configFile
 */
function scanConfigContainers(configFile) {
  /** @type {string[]} */
  const found = []
  if (!configFile) return found
  let source = ''
  try {
    source = readFileSync(configFile, 'utf8')
  } catch {
    return found
  }
  const re = /markdownContainerPlugin\s*\(\s*\{[^}]*?\btype\s*:\s*['"]([\w-]+)['"]/g
  let match
  while ((match = re.exec(source))) found.push(match[1])
  return found
}

/**
 * Scan the corpus for containers and component tags in use. Both come from the
 * block tree; `fence` blocks are skipped.
 *
 * @param {string[]} files
 */
function scanUsage(files) {
  /** @type {Map<string, { name: string, usage: number, infos: Set<string> }>} */
  const containers = new Map()
  /** @type {Map<string, { tag: string, usage: number, attrs: Map<string, number>, withChildren: number }>} */
  const tags = new Map()

  for (const file of files) {
    let source
    try {
      source = readFileSync(file, 'utf8')
    } catch {
      continue
    }

    let blocks
    try {
      blocks = parseBlocks(source).blocks
    } catch {
      continue
    }

    walkBlocks(blocks, (block) => {
      if (block.type === 'container') {
        const entry = containers.get(block.attrs.name) || { name: block.attrs.name, usage: 0, infos: new Set() }
        entry.usage++
        if (block.attrs.info && entry.infos.size < 5) entry.infos.add(block.attrs.info)
        containers.set(block.attrs.name, entry)
        return
      }

      if (block.type === 'fence' || block.type === 'codeImport' || block.type === 'blank') return

      /*
        An html block is markup. Elsewhere only markdown-it's inline-HTML
        fragments count; raw paragraph text would include code spans.
      */
      // One tag per fragment; joined in order they form balanced markup.
      const elements = block.type === 'html'
        ? collectElements(block.src)
        : collectElements(inlineHtmlFragments(block.src).join(''))

      for (const element of elements) {
        const tag = element.tag.toLowerCase()
        if (PLAIN_HTML.has(tag)) continue
        if (!tag.includes('-')) continue // a bare unknown tag is nearly always prose
        const entry = tags.get(tag) || { tag, usage: 0, attrs: new Map(), withChildren: 0 }
        entry.usage++
        if (element.hasChildren) entry.withChildren++
        for (const attribute of element.attributes) {
          entry.attrs.set(attribute.name, (entry.attrs.get(attribute.name) || 0) + 1)
        }
        tags.set(tag, entry)
      }
    })
  }

  return { containers, tags }
}

/**
 * Build the editor's vocabulary for a docs site.
 *
 * @param {object} options
 * @param {string} options.docsDir markdown root
 * @param {string} [options.componentsDir] directory registered with register-components
 * @param {string} [options.configFile] VuePress config, scanned for container registrations
 * @returns {{ containers: object[], components: object[], generatedAt: number, scanned: number }}
 */
export function buildRegistry({ docsDir, componentsDir, configFile }) {
  const files = listMarkdownFiles(docsDir)
  const { containers: usedContainers, tags: usedTags } = scanUsage(files)

  /** @type {Map<string, object>} */
  const containers = new Map()
  for (const builtin of BUILTIN_CONTAINERS) {
    containers.set(builtin.name, { ...builtin, usage: 0, examples: [] })
  }
  for (const name of scanConfigContainers(configFile)) {
    const existing = containers.get(name)
    containers.set(name, {
      name,
      source: 'site-config',
      takesInfo: existing?.takesInfo ?? 'title',
      usage: existing?.usage ?? 0,
      examples: existing?.examples ?? [],
    })
  }
  for (const [name, use] of usedContainers) {
    const existing = containers.get(name)
    containers.set(name, {
      name,
      source: existing?.source ?? 'discovered',
      takesInfo: existing?.takesInfo ?? 'title',
      usage: use.usage,
      examples: [...use.infos].filter(Boolean).slice(0, 3),
    })
  }

  const components = componentsDir ? scanComponentFiles(componentsDir) : new Map()
  for (const [tag, use] of usedTags) {
    const attrsSeen = [...use.attrs.entries()]
      .sort((a, b) => b[1] - a[1])
      .map(([name, count]) => ({ name, count }))
    const existing = components.get(tag)
    if (existing) {
      existing.usage = use.usage
      existing.attrsSeen = attrsSeen
      existing.acceptsChildren = existing.slots || use.withChildren > 0
    } else {
      components.set(tag, {
        tag,
        // No .vue file: observed attributes stand in for declared props.
        source: 'discovered',
        file: null,
        props: [],
        slots: use.withChildren > 0,
        usage: use.usage,
        attrsSeen,
        acceptsChildren: use.withChildren > 0,
      })
    }
  }

  const byUsage = (a, b) => b.usage - a.usage || String(a.name ?? a.tag).localeCompare(String(b.name ?? b.tag))
  return {
    containers: [...containers.values()].sort(byUsage),
    components: [...components.values()].sort(byUsage),
    generatedAt: Date.now(),
    scanned: files.length,
  }
}

/** Tags the editor should treat as components rather than raw markup. */
export function componentTagSet(registry) {
  return new Set(registry.components.map((component) => component.tag))
}

/**
 * Cache the registry, rebuilding when an input's mtime changes. A rebuild walks
 * the whole corpus.
 *
 * @param {Parameters<typeof buildRegistry>[0]} options
 */
export function createRegistryCache(options) {
  let cached = null
  let stamp = 0

  const newestMtime = () => {
    let newest = 0
    for (const file of [options.configFile, options.componentsDir].filter(Boolean)) {
      try {
        newest = Math.max(newest, statSync(file).mtimeMs)
      } catch {
        // missing input: ignore
      }
    }
    return newest
  }

  return {
    get(force = false) {
      const current = newestMtime()
      if (force || !cached || current !== stamp) {
        cached = buildRegistry(options)
        stamp = current
      }
      return cached
    },
    invalidate() {
      cached = null
    },
  }
}
