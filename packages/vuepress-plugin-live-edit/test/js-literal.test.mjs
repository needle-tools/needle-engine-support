/**
 * Writing a bound prop's value back as source. The value is read from Vue's
 * resolved props; this is the other half, turning it into an expression again.
 */

import { test } from 'node:test'
import assert from 'node:assert/strict'

import { stringifyLiteral, isLiteral, shapeOf } from '../src/client/js-literal.js'

test('scalars are written as JavaScript', () => {
  assert.equal(stringifyLiteral('hi'), "'hi'")
  assert.equal(stringifyLiteral(12), '12')
  assert.equal(stringifyLiteral(true), 'true')
  assert.equal(stringifyLiteral(null), 'null')
})

test('quotes, backslashes and newlines are escaped', () => {
  assert.equal(stringifyLiteral("it's"), "'it\\'s'")
  assert.equal(stringifyLiteral('a\\b'), "'a\\\\b'")
  assert.equal(stringifyLiteral('a\nb'), "'a\\nb'")
})

test('an array of records is one record per line', () => {
  const value = [{ src: '/a.webp', alt: 'A' }, { src: '/b.webp', alt: 'B' }]
  assert.equal(
    stringifyLiteral(value),
    ["[", "  { src: '/a.webp', alt: 'A' },", "  { src: '/b.webp', alt: 'B' }", "]"].join('\n'),
  )
})

test('the result parses back to the same value', () => {
  const value = [
    { src: '/a.webp', alt: "it's fine", caption: 'One, two' },
    'plain-string-entry',
    { src: '/b.webp' },
  ]
  // eslint-disable-next-line no-new-func
  const parsed = new Function(`return (${stringifyLiteral(value)})`)()
  assert.deepEqual(parsed, value)
})

test('empty values stay compact', () => {
  assert.equal(stringifyLiteral([]), '[]')
  assert.equal(stringifyLiteral({}), '{}')
})

test('keys needing quotes get them', () => {
  assert.equal(stringifyLiteral({ 'data-x': 1 }), "{ 'data-x': 1 }")
  assert.equal(stringifyLiteral({ valid_key: 1 }), '{ valid_key: 1 }')
})

test('undefined entries are dropped from records', () => {
  assert.equal(stringifyLiteral({ a: 1, b: undefined }), '{ a: 1 }')
})

test('only data counts as a literal', () => {
  assert.equal(isLiteral([{ a: 1 }, 'x', null]), true)
  assert.equal(isLiteral([() => {}]), false)
  assert.equal(isLiteral({ fn: () => {} }), false)
})

test('the record shape comes from the values present', () => {
  assert.deepEqual(shapeOf([{ src: 'a', alt: 'b' }, { src: 'c', caption: 'd' }]), ['src', 'alt', 'caption'])
  // A plain string entry is a src.
  assert.deepEqual(shapeOf(['a', { alt: 'b' }]), ['src', 'alt'])
  assert.deepEqual(shapeOf([]), [])
})
