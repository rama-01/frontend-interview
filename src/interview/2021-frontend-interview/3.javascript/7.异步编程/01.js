/* 异步编程的实现方式 */

// 1. 使用回调函数
const doSomethingAsync = (cb1, cb2) => {
    setTimeout(() => {
        res1 = cb1('res1')
        setTimeout(() => {
            cb2(res1 + 'res2')  //依赖于第一次回调执行的结果
        }, 2000);
    }, 2000);
}

// const callback = (res) => console.log(res)
const cb1 = v => v
const cb2 = k => console.log(k)
doSomethingAsync(cb1, cb2)

// 如果该回调也是一个异步函数，那么需要再嵌套一个回调

// doSomethingAsync(callback)

// 2. 使用Promise
const doSomethingAsync2 = () => new Promise((resolve, reject) => {
    setTimeout(() => resolve('hello world'), 2000)
})

// doSomethingAsync2().then((res) => console.log(res)).catch(err => console.log(err))

//3. 使用async/await
const doSomethingAsync3 = () => new Promise((resolve, reject) => {
    setTimeout(() => resolve('hello world'), 2000)
})

const handleAsync = async () => {
    try {
        const res = await doSomethingAsync3()
        console.log(res)
    } catch (error) {
        console.log(error)
    }
}

// handleAsync()