console.log('同步代码1');

setTimeout(() => {
    console.log('setTimeout')
}, 0)

new Promise((resolve) => {
    console.log('同步代码2')
    resolve()
}).then(() => {
    console.log('promise.then')
})

console.log('同步代码3');

// 输出：
// 同步代码1
// 同步代码2
// 同步代码3
// promise.then
// setTimeout

// 解释：先执行主线程全部的同步代码之后，在按照事件循环机制执行异步任务，包括宏任务和微任务；
// 而事件循环机制处理宏任务和微任务的执行逻辑如下：
// 1.JS引擎先从宏任务中取出一个任务
// 2.执行完毕后，再将微任务中的所有任务取出并执行，如果在执行微任务过程中产生了新的微任务并不会推迟到下一个循环中执行，而是继续在当前循环中执行完毕
// 3.再从宏任务队列中取出下一个，执行完毕后再取出microtask所有的微任务并执行，如此循环往复，直到两个queue中的任务都执行完毕