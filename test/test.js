import { describe, it } from 'mocha'
import { strictEqual, notStrictEqual } from 'assert'
import copyObjectGraph from '../'

describe('Single Primitives', () => {
  it('returns the same boolean when given a boolean', () => {
    strictEqual(false, copyObjectGraph(false))
    strictEqual(true, copyObjectGraph(true))
  })

  it('returns the same number when given a number', () => {
    strictEqual(0, copyObjectGraph(0))
    strictEqual(1, copyObjectGraph(1))
    strictEqual(-1, copyObjectGraph(-1))
  })

  it('returns the same string when given a string', () => {
    strictEqual('', copyObjectGraph(''))
    strictEqual('hello', copyObjectGraph('hello'))
  })

  it('returns undefined when given undefined', () => {
    strictEqual(undefined, copyObjectGraph(undefined))
  })

  it('returns null when given null', () => {
    strictEqual(null, copyObjectGraph(null))
  })

  if (typeof Symbol === 'function') {
    it('returns the same symbol when given a symbol', () => {
      const sym = Symbol()
      strictEqual(sym, copyObjectGraph(sym))
    })
  }
})
describe('Single-Depth Copy', () => {
  it('returns an array copy when given an array', () => {
    const arr = []
    notStrictEqual(arr, copyObjectGraph(arr))
  })
  it('returns an object copy when given an object', () => {
    const obj = {}
    notStrictEqual(obj, copyObjectGraph(obj))
  })
})
describe('Deep Copy', () => {
  it('returns a deep copy of nested array when given a nested array', () => {
    const arr = [
      [1],
      [[2]],
      [[[3]]]
    ]
    const res = copyObjectGraph(arr)

    notStrictEqual(arr, res)

    notStrictEqual(arr[0], res[0])

    notStrictEqual(arr[1], res[1])
    notStrictEqual(arr[1][0], res[1][0])

    notStrictEqual(arr[2], res[2])
    notStrictEqual(arr[2][0], res[2][0])
    notStrictEqual(arr[2][0][0], res[2][0][0])
  })
  it('returns a deep copy of nested object when given a nested object', () => {
    const obj = {
      a: { a: 1 },
      b: { b: { b: 2 } },
      c: { c: { c: { c: 3 } } }
    }
    const res = copyObjectGraph(obj)

    notStrictEqual(obj, res)

    notStrictEqual(obj.a, res.a)

    notStrictEqual(obj.b, res.b)
    notStrictEqual(obj.b.b, res.b.b)

    notStrictEqual(obj.c, res.c)
    notStrictEqual(obj.c.c, res.c.c)
    notStrictEqual(obj.c.c.c, res.c.c.c)
  })
})
describe('Self-Referencing Copy', () => {
  it('returns a copy of self-referencing array when given a self-referencing array', () =>{
    const arr = [1,2,3]
    arr[0] = arr // self-reference

    strictEqual(arr, arr[0])

    const res = copyObjectGraph(arr)

    strictEqual(res, res[0])

    notStrictEqual(arr, res)
    notStrictEqual(arr[0], res[0])
  })
  it('returns a copy of self-referencing object when given a self-referencing object', () => {
    const obj = { a: {}, b: {}, c: {} }
    obj.a = obj // self-reference

    strictEqual(obj, obj.a)

    const res = copyObjectGraph(obj)

    strictEqual(res, res.a)

    notStrictEqual(obj, res)
    notStrictEqual(obj.a, res.a)
  })
})
describe('Deep/Self-Referencing Copy', () => {
  it('returns a deep copy of nested/self-referencing array/object when given a nested/self-referencing array/object', () => {
    const arr = [
      {a: [] },
      [{}]
    ]
    arr[0].a = arr[1]
    strictEqual(arr[0].a, arr[1])

    arr[1][0].b = 2
    strictEqual(arr[0].a[0].b, 2)

    const res = copyObjectGraph(arr)

    strictEqual(res[0].a, res[1])
    strictEqual(res[0].a[0].b, 2)

    notStrictEqual(arr, res)
    notStrictEqual(arr[0].a, res[0].a)
    notStrictEqual(arr[0].a[0], res[0].a[0])
    strictEqual(arr[0].a[0].b, res[0].a[0].b) // 2 === 2

  })
})