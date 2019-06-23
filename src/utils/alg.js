function swap (arr, i, j) {
  let tmp = arr[i]
  arr[i] = arr[j]
  arr[j] = tmp
}

const algorithmn = {
  // bubble sort
  bubble: function (data, sort = true) {
    let track = [], flag = false
    for (let i = 0, len = data.length; i < len; i++) {
      for (let j = 0, stop = len - i - 1; j < stop; j++) {
        flag = false;
        if (sort && data[j] > data[j + 1]) {
          flag = true;
          swap(data, j, j + 1)
        } else if (!sort && data[j] < data[j + 1]) {
          flag = true;
          swap(data, j, j + 1)
        }
        track.push([j, j+1, flag])
      }
    }
    console.log(data)
    return track
  }
}

export default algorithmn
