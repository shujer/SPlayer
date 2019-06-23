export function getRange (data) {
    let count = data.length
    let maxHeight = data[0]
  
    let minHeight = data[0]
  
    while (--count >= 0) {
      if (data[count] > maxHeight) {
        maxHeight = data[count]
      }
      if (data[count] < minHeight) {
        minHeight = data[count]
      }
    }
    minHeight = minHeight - (minHeight % 10)
    maxHeight = maxHeight - (minHeight % 10)
    return {
      range: Math.abs(maxHeight - minHeight),
      minHeight
    }
  }