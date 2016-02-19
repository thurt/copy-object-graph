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
  - Depends on WeakMap for storing self-reference identities
  - Object properties are copied into new objects using `Object.assign({}, original_obj)`. This operation has side effects ~
    - it will activate any getters on the original object
    - the new object will inherit Object prototype

Test Documentation
=============================
