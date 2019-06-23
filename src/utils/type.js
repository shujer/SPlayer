const checkType = {
  function: function (fn) {
    return fn && Object.prototype.toString.call(fn) === '[object Function]'
  },
  array: function (arr) {
    return arr && Object.prototype.toString.call(arr) === '[object Array]'
  }
}

export default checkType;