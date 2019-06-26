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
          // down to up
          flag = true
          swap(data, j, j + 1)
        } else if (!sort && data[j] < data[j + 1]) {
          // up to down
          flag = true
          swap(data, j, j + 1)
        }
        track.push({ step: [j, j + 1], flag })
      }
    }
    return track
  },
  // quick sort
  quick: function (data, sort = false) {
    let track = []
    function quickSort (arr, _left, _right) {
      let left = _left
      let right = _right
      let pivot = arr[_left]
      if (left > right) return

      while (left != right) {
        // down to up
        while (sort && arr[right] >= pivot && right > left) {
          right--
          track.push({ step: [_left, right], flag: false })
        }
        while (sort && arr[left] <= pivot && right > left) {
          left++
          track.push({ step: [_left, left], flag: false })
        }
        // up to down
        while (!sort && arr[right] <= pivot && right > left) {
          right--
          track.push({ step: [_left, right], flag: false })
        }
        while (!sort && arr[left] >= pivot && right > left) {
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
  },

  // select sort
  select: function (data, sort = true) {
    let track = []
    let tmp = 0

    for (let i = 0, len = data.length; i < len; i++) {
      tmp = i
      for (let j = i + 1; j < len; j++) {
        if (sort && data[tmp] > data[j]) {
          tmp = j
        }
        if (!sort && data[tmp] < data[j]) {
          tmp = j
        }
        track.push({ step: [i, j], flag: false })
      }
      if (tmp !== i) {
        swap(data, tmp, i)
        track.push({ step: [i, tmp], flag: true })
      }
    }
    return track;
  }
}

export default algorithmn
