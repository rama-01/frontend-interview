const arr = [1, 2, 2, 2, 3, 4]

// 1. use filter
const res = arr.filter((item, index) => arr.indexOf(item) === index)  //获取数组元素第一次出现的索引

// 2. use new Set()
const res2 = [...new Set(arr)]
// console.log(res2);

// 3. use forEach
const uniArrForEach = arr => {
    const res = []
    arr.forEach(item => {
        if (!res.includes(item)) {
            res.push(item)
        }
    })
    return res
}
// console.log(uniArr(arr));

// 4. use reduce
const uniArrReduce = arr => arr.reduce((pre, cur) => {
    if (!pre.includes(cur)) {
        pre.push(cur)
    }
    return pre
}, [])
console.log(uniArrReduce(arr))

// 拓展，reduce工作原理
const res3 = arr.reduce((pre, cur) => pre + cur)
console.log(res3);