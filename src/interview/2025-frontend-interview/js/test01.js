// const r = function () {} instanceof Function
// console.log(r)
// console.log(0.1 + 0.2 === 0.3)
// console.log(Number(null))

function randArr(arr) {
  return arr.sort((_) => Math.random() - 0.5)
}
console.log(randArr([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]))

// 洗牌算法
const shuffle = (arr) => {
  const n = arr.length
  for (let i = 0; i < n; i++) {
    const randomIndex = Math.floor(Math.random() * n)
    swap(arr, i, randomIndex)
  }
  return arr
}
const swap = (arr, i, j) => {
  const temp = arr[i]
  arr[i] = arr[j]
  arr[j] = temp
}

if (event.stopPropagation) {
  event.stopPropagation()
} else {
  event.cancelBubble = true
}


