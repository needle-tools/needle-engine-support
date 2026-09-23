/**
 * Prop extraction from single-file components, via Vue's SFC parser and Babel.
 *
 * Handles Options API `props: {}`, `defineProps({})` and `defineProps<{}>()`.
 * Doc comments become help text in the attribute form.
 */

import { createRequire } from 'node:module'

const require = createRequire(import.meta.url)
const { parse: parseSfc } = require('@vue/compiler-sfc')
const { parse: parseJs } = require('@babel/parser')

const BABEL_OPTIONS = {
  sourceType: 'module',
  allowReturnOutsideFunction: true,
  errorRecovery: true,
  plugins: ['typescript', 'jsx', 'decorators-legacy', 'classProperties'],
}

/** Leading comment -> one line of help text. */
function commentText(node) {
  const comments = node.leadingComments || []
  if (comments.length === 0) return undefined
  const text = comments
    .map((comment) =>
      comment.value
        .split('\n')
        .map((line) => line.replace(/^\s*\*?\s?/, '').trim())
        .join(' '),
    )
    .join(' ')
    .replace(/\s+/g, ' ')
    .trim()
  return text || undefined
}

/** Babel node -> displayable default value. */
function literalValue(node) {
  if (!node) return undefined
  switch (node.type) {
    case 'StringLiteral':
    case 'NumericLiteral':
    case 'BooleanLiteral':
      return String(node.value)
    case 'NullLiteral':
      return 'null'
    case 'Identifier':
      return node.name === 'undefined' ? undefined : node.name
    case 'ArrayExpression':
      return '[]'
    case 'ObjectExpression':
      return '{}'
    case 'ArrowFunctionExpression':
    case 'FunctionExpression':
      return undefined
    default:
      return undefined
  }
}

/** Read `type:` out of a prop descriptor, which may be `String` or `[Number, String]`. */
function typeOf(node) {
  if (!node) return 'string'
  if (node.type === 'Identifier') return node.name.toLowerCase()
  if (node.type === 'ArrayExpression') {
    const first = node.elements.find((element) => element && element.type === 'Identifier')
    return first ? first.name.toLowerCase() : 'string'
  }
  return 'string'
}

/** One entry of a `props: { ... }` / `defineProps({ ... })` object. */
function propFromObjectProperty(property) {
  if (property.type !== 'ObjectProperty') return null
  const name = property.key.name ?? property.key.value
  if (!name) return null

  const description = commentText(property)
  const value = property.value

  // Shorthand: `src: String`
  if (value.type === 'Identifier' || value.type === 'ArrayExpression') {
    return { name, type: typeOf(value), required: false, description }
  }

  if (value.type === 'ObjectExpression') {
    let type = 'string'
    let required = false
    let defaultValue
    for (const entry of value.properties) {
      if (entry.type !== 'ObjectProperty') continue
      const key = entry.key.name ?? entry.key.value
      if (key === 'type') type = typeOf(entry.value)
      else if (key === 'required') required = entry.value.value === true
      else if (key === 'default') defaultValue = literalValue(entry.value)
    }
    return { name, type, required, default: defaultValue, description }
  }

  return { name, type: 'string', required: false, description }
}

/** `defineProps<{ src: string; count?: number }>()` */
function propsFromTypeLiteral(typeLiteral) {
  const out = []
  for (const member of typeLiteral.members || []) {
    if (member.type !== 'TSPropertySignature') continue
    const name = member.key.name ?? member.key.value
    if (!name) continue
    const annotation = member.typeAnnotation?.typeAnnotation
    const type =
      annotation?.type === 'TSStringKeyword' ? 'string'
        : annotation?.type === 'TSNumberKeyword' ? 'number'
          : annotation?.type === 'TSBooleanKeyword' ? 'boolean'
            : annotation?.type === 'TSArrayType' ? 'array'
              : 'string'
    out.push({ name, type, required: !member.optional, description: commentText(member) })
  }
  return out
}

/** Depth-first walk over a Babel AST. */
function walk(node, visit) {
  if (!node || typeof node.type !== 'string') return
  visit(node)
  for (const key of Object.keys(node)) {
    if (key === 'loc' || key === 'leadingComments' || key === 'trailingComments') continue
    const value = node[key]
    if (Array.isArray(value)) {
      for (const child of value) if (child && typeof child.type === 'string') walk(child, visit)
    } else if (value && typeof value.type === 'string') {
      walk(value, visit)
    }
  }
}

/** Pull props out of one script body. */
function propsFromScript(code) {
  let ast
  try {
    ast = parseJs(code, BABEL_OPTIONS)
  } catch {
    return []
  }

  /** @type {Map<string, object>} */
  const found = new Map()
  const add = (prop) => {
    if (prop && !found.has(prop.name)) found.set(prop.name, prop)
  }

  walk(ast.program, (node) => {
    // Options API, and `defineComponent({ props: {...} })`.
    if (
      node.type === 'ObjectProperty' &&
      (node.key.name === 'props' || node.key.value === 'props') &&
      node.value.type === 'ObjectExpression'
    ) {
      for (const property of node.value.properties) add(propFromObjectProperty(property))
    }

    if (node.type === 'CallExpression' && node.callee.type === 'Identifier' && node.callee.name === 'defineProps') {
      const typeArg = node.typeParameters?.params?.[0] ?? node.typeArguments?.params?.[0]
      if (typeArg?.type === 'TSTypeLiteral') {
        for (const prop of propsFromTypeLiteral(typeArg)) add(prop)
      }
      const objectArg = node.arguments?.[0]
      if (objectArg?.type === 'ObjectExpression') {
        for (const property of objectArg.properties) add(propFromObjectProperty(property))
      }
      if (objectArg?.type === 'ArrayExpression') {
        for (const element of objectArg.elements) {
          if (element?.type === 'StringLiteral') add({ name: element.value, type: 'string', required: false })
        }
      }
    }
  })

  return [...found.values()]
}

/**
 * Read the props a single-file component declares.
 *
 * @param {string} source contents of a `.vue` file
 * @returns {Array<{ name: string, type: string, required: boolean, default?: string, description?: string }>}
 */
export function parseComponentProps(source) {
  let descriptor
  try {
    descriptor = parseSfc(source).descriptor
  } catch {
    return []
  }

  /** @type {Map<string, object>} */
  const found = new Map()
  for (const block of [descriptor.script, descriptor.scriptSetup]) {
    if (!block?.content) continue
    for (const prop of propsFromScript(block.content)) {
      if (!found.has(prop.name)) found.set(prop.name, prop)
    }
  }
  return [...found.values()]
}

/**
 * Does the component render slots, so the editor should offer inner content?
 * @param {string} source
 */
export function componentHasSlots(source) {
  let descriptor
  try {
    descriptor = parseSfc(source).descriptor
  } catch {
    return false
  }
  const template = descriptor.template?.content ?? ''
  const script = `${descriptor.script?.content ?? ''}${descriptor.scriptSetup?.content ?? ''}`
  return /<slot\b/.test(template) || /\$slots|useSlots\s*\(/.test(script)
}
