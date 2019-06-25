function swap (arr, i, j) {
  let tmp = arr[i]
  arr[i] = arr[j]
  arr[j] = tmp
}

const algorithmn = {
  // bubble sort
  bubble: function (data, sort = true) {
    let track = []

    let flag = false
    for (let i = 0, len = data.length; i < len; i++) {
      for (let j = 0, stop = len - i - 1; j < stop; j++) {
        flag = false
        if (sort && data[j] > data[j + 1]) {
          flag = true
          swap(data, j, j + 1)
        } else if (!sort && data[j] < data[j + 1]) {
          flag = true
          swap(data, j, j + 1)
        }
        track.push({ step: [j, j + 1], flag })
      }
    }
    return track
  },

  quick: function (data, sort = true) {
    let track = []
    function quickSort (arr, _left, _right) {
      let left = _left
      let right = _right
      let pivot = arr[_left]
      if (left > right) return

      while (left != right) {
        while (arr[right] >= pivot && right > left) {
          right--
          track.push({ step: [_left, right], flag: false })
        }
        while (arr[left] <= pivot && right > left) {
          left++
          track.push({ step: [_left, left], flag: false })
        }
        if (left < right) {
          ;[arr[left], arr[right]] = [arr[right], arr[left]]
          track.push({ step: [left, right], flag: true })
        }
      }
      // 基准元素归位
      arr[_left] = arr[right]
      arr[right] = pivot
      track.push({ step: [_left, right], flag: true })
      quickSort(arr, _left, left - 1)
      quickSort(arr, right + 1, _right)
      return arr
    }
    quickSort(data, 0, data.length - 1)
    return track
  }
}

export default algorithmn
