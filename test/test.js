var assert = require('assert')
var copyObjectGraph = require('../index')

describe('Single Primitives', () => {
  it('returns the same boolean when given a boolean', () => {
    assert.strictEqual(false, copyObjectGraph(false))
    assert.strictEqual(true, copyObjectGraph(true))
  })

  it('returns the same number when given a number', () => {
    assert.strictEqual(0, copyObjectGraph(0))
    assert.strictEqual(1, copyObjectGraph(1))
    assert.strictEqual(-1, copyObjectGraph(-1))
  })

  it('returns the same string when given a string', () => {
    assert.strictEqual('', copyObjectGraph(''))
    assert.strictEqual('hello', copyObjectGraph('hello'))
  })

  it('returns undefined when given undefined', () => {
    assert.strictEqual(undefined, copyObjectGraph(undefined))
  })

  it('returns null when given null', () => {
    assert.strictEqual(null, copyObjectGraph(null))
  })

  if (typeof Symbol === 'function') {
    it('returns the same symbol when given a symbol', () => {
      var sym = Symbol()
      assert.strictEqual(sym, copyObjectGraph(sym))
    })
  }
})
describe('Single-Depth Copy', () => {
  it('returns an array copy when given an array', () => {
    var arr = []
    assert.notStrictEqual(arr, copyObjectGraph(arr))
  })
  it('returns an object copy when given an object', () => {
    var obj = {}
    assert.notStrictEqual(obj, copyObjectGraph(obj))
  })
})
describe('Deep Copy', () => {
  it('returns a deep copy of nested array when given a nested array', () => {
    var arr = [
      [1],
      [[2]],
      [[[3]]]
    ]
    var res = copyObjectGraph(arr)

    assert.notStrictEqual(arr, res)

    assert.notStrictEqual(arr[0], res[0])

    assert.notStrictEqual(arr[1], res[1])
    assert.notStrictEqual(arr[1][0], res[1][0])

    assert.notStrictEqual(arr[2], res[2])
    assert.notStrictEqual(arr[2][0], res[2][0])
    assert.notStrictEqual(arr[2][0][0], res[2][0][0])
  })
  it('returns a deep copy of nested object when given a nested object', () => {
    var obj = {
      a: { a: 1 },
      b: { b: { b: 2 } },
      c: { c: { c: { c: 3 } } }
    }
    var res = copyObjectGraph(obj)

    assert.notStrictEqual(obj, res)

    assert.notStrictEqual(obj.a, res.a)

    assert.notStrictEqual(obj.b, res.b)
    assert.notStrictEqual(obj.b.b, res.b.b)

    assert.notStrictEqual(obj.c, res.c)
    assert.notStrictEqual(obj.c.c, res.c.c)
    assert.notStrictEqual(obj.c.c.c, res.c.c.c)
  })
})
describe('Self-Referencing Copy', () => {
  it('returns a copy of self-referencing array when given a self-referencing array', () =>{
    var arr = [1,2,3]
    arr[0] = arr // self-reference

    assert.strictEqual(arr, arr[0])

    var res = copyObjectGraph(arr)

    assert.strictEqual(res, res[0])

    assert.notStrictEqual(arr, res)
    assert.notStrictEqual(arr[0], res[0])
  })
  it('returns a copy of self-referencing object when given a self-referencing object', () => {
    var obj = { a: {}, b: {}, c: {} }
    obj.a = obj // self-reference

    assert.strictEqual(obj, obj.a)

    var res = copyObjectGraph(obj)

    assert.strictEqual(res, res.a)

    assert.notStrictEqual(obj, res)
    assert.notStrictEqual(obj.a, res.a)
  })
})
describe('Deep/Self-Referencing Copy', () => {
  it('returns a deep copy of nested/self-referencing array/object when given a nested/self-referencing array/object', () => {
    var arr = [
      {a: [] },
      [{}]
    ]
    arr[0].a = arr[1]
    assert.strictEqual(arr[0].a, arr[1])

    arr[1][0].b = 2
    assert.strictEqual(arr[0].a[0].b, 2)

    var res = copyObjectGraph(arr)

    assert.strictEqual(res[0].a, res[1])
    assert.strictEqual(res[0].a[0].b, 2)

    assert.notStrictEqual(arr, res)
    assert.notStrictEqual(arr[0].a, res[0].a)
    assert.notStrictEqual(arr[0].a[0], res[0].a[0])
    assert.strictEqual(arr[0].a[0].b, res[0].a[0].b) // 2 === 2

  })
})