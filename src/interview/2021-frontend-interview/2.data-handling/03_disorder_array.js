const swap = (arr, a, b) => {
    const tmp = arr[a];
    arr[a] = arr[b];
    arr[b] = tmp;
}

const disorder = (arr) => {
    const n = arr.length
    for (let i = 0; i < n; i++) {
        const randomIndex = Math.floor(Math.random() * n)
        swap(arr, i, randomIndex)  //也可以直接使用数组交换两个变量的值
    }
    return arr
}

console.log(disorder([0, 1, 2, 3, 4]));