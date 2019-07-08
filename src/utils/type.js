const types = [
  'Function',
  'Array',
  'Object',
  'Boolean',
  'String',
  'Null',
  'Undefined',
  'Number',
  'Symbol'
]

function isType (type) {
  return function (obj) {
    return Object.prototype.toString.call(obj).includes(type)
  }
}

let checkType = {}

types.forEach(type => (checkType['is' + type] = isType(type)))

export default checkType
