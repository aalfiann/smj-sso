'use strict'

/* global describe it */
const assert = require('assert')
const helper = require('../lib/helper')

describe('function test', function () {
  it('randomString', async function () {
    const result1 = helper.randomString(43)
    const result2 = helper.randomString(43)
    assert.strictEqual(result1.length, 43)
    assert.notStrictEqual(result1, result2)
  })

  it('is empty string', function () {
    assert.strictEqual(helper.isEmptyString(undefined), true)
    assert.strictEqual(helper.isEmptyString(null), true)
    assert.strictEqual(helper.isEmptyString(''), true)
    assert.strictEqual(helper.isEmptyString('abc'), false)
    assert.strictEqual(helper.isEmptyString(1), false)
    assert.strictEqual(helper.isEmptyString([]), false)
    assert.strictEqual(helper.isEmptyString({}), false)
  })
})
