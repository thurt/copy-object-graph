/*
 Copy Object Graphs
  Source: https://github.com/thurt/copy-object-graph
  Supports: nested/self-referencing objects, nested/self-referencing arrays, numbers, strings, null undefined
*/
function copyObjectGraph(obj) {
  if (typeof WeakMap !== 'function') throw new ReferenceError('copyObjectGraph requires WeakMap')

  var _pool = new WeakMap()
  return cpObj(obj)

  function cpObj(obj) {
    var cp
    if (typeof obj !== 'object') return obj
    if (obj === null) return null
    if (_pool.has(obj)) return _pool.get(obj) // for self-references

    if (Array.isArray(obj)) cp = obj.slice()
    else cp = Object.assign({}, obj)

    _pool.set(obj, cp)
    return cpProps(cp)
  }
  function cpProps(cp) {
    for (var prop in cp) cp[prop] = cpObj(cp[prop])
    return cp
  }
}

module.exports = copyObjectGraph