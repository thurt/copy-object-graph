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
(0, _assert.strictEqual)(false, (0, _2.default)(false));
(0, _assert.strictEqual)(true, (0, _2.default)(true));
```

returns the same number when given a number.

```js
(0, _assert.strictEqual)(0, (0, _2.default)(0));
(0, _assert.strictEqual)(1, (0, _2.default)(1));
(0, _assert.strictEqual)(-1, (0, _2.default)(-1));
```

returns the same string when given a string.

```js
(0, _assert.strictEqual)('', (0, _2.default)(''));
(0, _assert.strictEqual)('hello', (0, _2.default)('hello'));
```

returns undefined when given undefined.

```js
(0, _assert.strictEqual)(undefined, (0, _2.default)(undefined));
```

returns null when given null.

```js
(0, _assert.strictEqual)(null, (0, _2.default)(null));
```

returns the same symbol when given a symbol.

```js
const sym = Symbol();
(0, _assert.strictEqual)(sym, (0, _2.default)(sym));
```

<a name="single-depth-copy"></a>
# Single-Depth Copy
returns an array copy when given an array.

```js
const arr = [];
(0, _assert.notStrictEqual)(arr, (0, _2.default)(arr));
```

returns an object copy when given an object.

```js
const obj = {};
(0, _assert.notStrictEqual)(obj, (0, _2.default)(obj));
```

<a name="deep-copy"></a>
# Deep Copy
returns a deep copy of nested array when given a nested array.

```js
const arr = [[1], [[2]], [[[3]]]];
const res = (0, _2.default)(arr);
(0, _assert.notStrictEqual)(arr, res);
(0, _assert.notStrictEqual)(arr[0], res[0]);
(0, _assert.notStrictEqual)(arr[1], res[1]);
(0, _assert.notStrictEqual)(arr[1][0], res[1][0]);
(0, _assert.notStrictEqual)(arr[2], res[2]);
(0, _assert.notStrictEqual)(arr[2][0], res[2][0]);
(0, _assert.notStrictEqual)(arr[2][0][0], res[2][0][0]);
```

returns a deep copy of nested object when given a nested object.

```js
const obj = {
  a: { a: 1 },
  b: { b: { b: 2 } },
  c: { c: { c: { c: 3 } } }
};
const res = (0, _2.default)(obj);
(0, _assert.notStrictEqual)(obj, res);
(0, _assert.notStrictEqual)(obj.a, res.a);
(0, _assert.notStrictEqual)(obj.b, res.b);
(0, _assert.notStrictEqual)(obj.b.b, res.b.b);
(0, _assert.notStrictEqual)(obj.c, res.c);
(0, _assert.notStrictEqual)(obj.c.c, res.c.c);
(0, _assert.notStrictEqual)(obj.c.c.c, res.c.c.c);
```

<a name="self-referencing-copy"></a>
# Self-Referencing Copy
returns a copy of self-referencing array when given a self-referencing array.

```js
const arr = [1, 2, 3];
arr[0] = arr; // self-reference
(0, _assert.strictEqual)(arr, arr[0]);
const res = (0, _2.default)(arr);
(0, _assert.strictEqual)(res, res[0]);
(0, _assert.notStrictEqual)(arr, res);
(0, _assert.notStrictEqual)(arr[0], res[0]);
```

returns a copy of self-referencing object when given a self-referencing object.

```js
const obj = { a: {}, b: {}, c: {} };
obj.a = obj; // self-reference
(0, _assert.strictEqual)(obj, obj.a);
const res = (0, _2.default)(obj);
(0, _assert.strictEqual)(res, res.a);
(0, _assert.notStrictEqual)(obj, res);
(0, _assert.notStrictEqual)(obj.a, res.a);
```

<a name="deepself-referencing-copy"></a>
# Deep/Self-Referencing Copy
returns a deep copy of nested/self-referencing array/object when given a nested/self-referencing array/object.

```js
const arr = [{ a: [] }, [{}]];
arr[0].a = arr[1];
(0, _assert.strictEqual)(arr[0].a, arr[1]);
arr[1][0].b = 2;
(0, _assert.strictEqual)(arr[0].a[0].b, 2);
const res = (0, _2.default)(arr);
(0, _assert.strictEqual)(res[0].a, res[1]);
(0, _assert.strictEqual)(res[0].a[0].b, 2);
(0, _assert.notStrictEqual)(arr, res);
(0, _assert.notStrictEqual)(arr[0].a, res[0].a);
(0, _assert.notStrictEqual)(arr[0].a[0], res[0].a[0]);
(0, _assert.strictEqual)(arr[0].a[0].b, res[0].a[0].b); // 2 === 2
```

