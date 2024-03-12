/* 1. 递归实现 */
const flat = (arr) => {
    let res = [];
    for (let i = 0; i < arr.length; i++) {
        if (Array.isArray(arr[i])) {
            res = res.concat(flat(arr[i]));
        } else {
            res.push(arr[i]);
        }
    }
    return res
}

/* 2. 使用reduce迭代 */
const flat2 = (arr) => arr.reduce((acc, cur) => Array.isArray(cur) ? acc.concat(flat2(cur)) : acc.concat(cur), [])

console.log(flat([1, 2, [3, [4]]]));
console.log(flat2([1, 2, [3, [4]]]));