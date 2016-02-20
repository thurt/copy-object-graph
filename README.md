Copy Object Graphs
===============================
**Supports copying of**
 - nested objects
 - nested arrays
 - self-referencing objects
 - self-referencing arrays
 - numbers
 - strings
 - null
 - undefined

**Things to be aware of**
  - The copy gets references to functions (*not* copies of functions)
  - There is a dependency on WeakMap for storing self-reference identities
  - Object properties are copied into new objects using `Object.assign({}, original_obj)`. This operation has side effects ~
    - it will activate any getters on the original object
    - the new object will inherit Object prototype

Test Documentation
=============================
# TOC
   - [Single Primitives](#single-primitives)
   - [Single-Depth Copy](#single-depth-copy)
   - [Deep Copy](#deep-copy)
   - [Self-Referencing Copy](#self-referencing-copy)
   - [Deep/Self-Referencing Copy](#deepself-referencing-copy)
<a name=""></a>
 
<a name="single-primitives"></a>
# Single Primitives
returns the same boolean when given a boolean.

```js
assert.strictEqual(false, copyObjectGraph(false))
assert.strictEqual(true, copyObjectGraph(true))
```

returns the same number when given a number.

```js
assert.strictEqual(0, copyObjectGraph(0))
assert.strictEqual(1, copyObjectGraph(1))
assert.strictEqual(-1, copyObjectGraph(-1))
```

returns the same string when given a string.

```js
assert.strictEqual('', copyObjectGraph(''))
assert.strictEqual('hello', copyObjectGraph('hello'))
```

returns undefined when given undefined.

```js
assert.strictEqual(undefined, copyObjectGraph(undefined))
```

returns null when given null.

```js
assert.strictEqual(null, copyObjectGraph(null))
```

returns the same symbol when given a symbol.

```js
var sym = Symbol()
assert.strictEqual(sym, copyObjectGraph(sym))
```

<a name="single-depth-copy"></a>
# Single-Depth Copy
returns an array copy when given an array.

```js
var arr = []
assert.notStrictEqual(arr, copyObjectGraph(arr))
```

returns an object copy when given an object.

```js
var obj = {}
assert.notStrictEqual(obj, copyObjectGraph(obj))
```

<a name="deep-copy"></a>
# Deep Copy
returns a deep copy of nested array when given a nested array.

```js
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
```

returns a deep copy of nested object when given a nested object.

```js
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
```

<a name="self-referencing-copy"></a>
# Self-Referencing Copy
returns a copy of self-referencing array when given a self-referencing array.

```js
var arr = [1,2,3]
arr[0] = arr // self-reference
assert.strictEqual(arr, arr[0])
var res = copyObjectGraph(arr)
assert.strictEqual(res, res[0])
assert.notStrictEqual(arr, res)
assert.notStrictEqual(arr[0], res[0])
```

returns a copy of self-referencing object when given a self-referencing object.

```js
var obj = { a: {}, b: {}, c: {} }
obj.a = obj // self-reference
assert.strictEqual(obj, obj.a)
var res = copyObjectGraph(obj)
assert.strictEqual(res, res.a)
assert.notStrictEqual(obj, res)
assert.notStrictEqual(obj.a, res.a)
```

<a name="deepself-referencing-copy"></a>
# Deep/Self-Referencing Copy
returns a deep copy of nested/self-referencing array/object when given a nested/self-referencing array/object.

```js
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
```

